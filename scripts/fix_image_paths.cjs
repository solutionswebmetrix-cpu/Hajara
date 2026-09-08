const fs = require('fs');
const path = require('path');

const publicRoot = path.join(__dirname, '..', 'public', 'products');
const productsJson = path.join(__dirname, '..', 'src', 'data', 'products.json');
const detailsDir = path.join(__dirname, '..', 'src', 'data', 'productDetails');

function listAllPublicFiles() {
  const files = [];
  function walk(dir, rel) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      const r = rel ? path.join(rel, e.name) : e.name;
      if (e.isDirectory()) walk(full, r);
      else files.push(r);
    }
  }
  if (fs.existsSync(publicRoot)) walk(publicRoot, '');
  return files;
}

const publicFiles = listAllPublicFiles();
function normalize(s) { return s.toLowerCase().replace(/[-_\s]+/g, ' ').replace(/[^a-z0-9 ]/g, ''); }

const publicIndex = {};
publicFiles.forEach(p => {
  publicIndex[normalize(p)] = p; // map normalized rel path to actual rel path
  // also map filename-only
  const filename = path.basename(p);
  publicIndex[normalize(filename)] = p;
});

function findBestMatch(inputPath) {
  if (!inputPath) return null;
  // inputPath like /products/Category/foo%20bar.png or /products/foo.png
  const decoded = decodeURIComponent(inputPath.replace(/^\/+/, ''));
  const rel = decoded.replace(/^products\//i, '');
  const candidate = rel.replace(/\\/g, '/');
  // direct existence
  const full = path.join(publicRoot, candidate);
  if (fs.existsSync(full)) return '/products/' + candidate.split(path.sep).map(encodeURIComponent).join('/');

  // try normalized match on full rel
  const norm = normalize(candidate);
  if (publicIndex[norm]) return '/products/' + publicIndex[norm].split(path.sep).map(encodeURIComponent).join('/');
  // try filename-only
  const fname = path.basename(candidate);
  const fnorm = normalize(fname);
  if (publicIndex[fnorm]) return '/products/' + publicIndex[fnorm].split(path.sep).map(encodeURIComponent).join('/');

  // try partial token match: find publicIndex entry containing all tokens
  const tokens = norm.split(' ').filter(Boolean);
  for (const key in publicIndex) {
    const hasAll = tokens.every(t => key.includes(t));
    if (hasAll) return '/products/' + publicIndex[key].split(path.sep).map(encodeURIComponent).join('/');
  }
  return null;
}

// Fix products.json
let changed = false;
let products = JSON.parse(fs.readFileSync(productsJson, 'utf8'));
products = products.map(p => {
  if (!p.image) return p;
  const fixed = findBestMatch(p.image);
  if (fixed && fixed !== p.image) {
    console.log('Fix product image:', p.slug, p.image, '->', fixed);
    p.image = fixed;
    changed = true;
  }
  return p;
});
if (changed) fs.writeFileSync(productsJson, JSON.stringify(products, null, 2));

// Fix productDetails
const detailFiles = fs.readdirSync(detailsDir).filter(f => f.endsWith('.json'));
let detailsChanged = false;
detailFiles.forEach(f => {
  const pth = path.join(detailsDir, f);
  let content = JSON.parse(fs.readFileSync(pth, 'utf8'));
  let updated = false;
  if (content.gallery && Array.isArray(content.gallery)) {
    const newGallery = content.gallery.map(img => {
      const fixed = findBestMatch(img);
      if (fixed && fixed !== img) {
        updated = true;
        console.log('Fix gallery image in', f, img, '->', fixed);
        return fixed;
      }
      // if no fixed and image exists as-is, keep
      const full = path.join(publicRoot, decodeURIComponent(img.replace(/^\/+/, '').replace(/^products\//i, '')));
      if (fs.existsSync(full)) return img;
      // last resort: try findBestMatch without folder
      const fallback = findBestMatch(img);
      if (fallback) { updated = true; console.log('Fallback fix', f, img, '->', fallback); return fallback; }
      return img;
    });
    if (updated) {
      content.gallery = Array.from(new Set(newGallery));
      fs.writeFileSync(pth, JSON.stringify(content, null, 2));
      detailsChanged = true;
    }
  }
});

console.log('\nFix complete. Products changed:', changed, 'Details changed:', detailsChanged);
process.exit(0);
