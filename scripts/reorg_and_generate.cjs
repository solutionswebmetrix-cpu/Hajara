const fs = require('fs');
const path = require('path');

const assetsRoot = path.join(__dirname, '..', 'src', 'assets', 'product');
const productsJsonPath = path.join(__dirname, '..', 'src', 'data', 'products.json');
const productDetailsDir = path.join(__dirname, '..', 'src', 'data', 'productDetails');

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(walkDir(full));
    else files.push(full);
  }
  return files;
}

function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/%20/g, ' ')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

function sanitizeFolderName(name) {
  // Keep characters safe for folder names but readable
  return name.replace(/[\\/:*?"<>|]/g, '').trim();
}

// Mapping from existing source folder names to desired category folders
const folderToCategory = {
  'guggul': 'Guggul Formulations',
  'oil': 'Medicated Taila',
  'powder': 'Single Herb Powders',
  'syrup': 'Sharbat',
  'toothpaste powders': 'Ayurvedic Tooth Powders',
  'capsule': 'Capsule',
  'capsules': 'Capsule'
};

// Load existing products.json (may be large)
let existingProducts = [];
try {
  existingProducts = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
} catch (err) {
  console.error('Failed to read products.json:', err.message);
  process.exit(1);
}

// Build filename -> product mapping using product.image and existing productDetails galleries
const filenameToProduct = new Map();
existingProducts.forEach(p => {
  if (p.image) {
    const base = decodeURIComponent(path.basename(p.image));
    filenameToProduct.set(normalizeName(base), p);
  }
});

// Also scan existing productDetails galleries
if (fs.existsSync(productDetailsDir)) {
  const detailFiles = fs.readdirSync(productDetailsDir).filter(f => f.endsWith('.json'));
  detailFiles.forEach(f => {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(productDetailsDir, f), 'utf8'));
      const gallery = content.gallery || [];
      gallery.forEach(img => {
        if (!img) return;
        const base = decodeURIComponent(path.basename(img));
        if (!filenameToProduct.has(normalizeName(base))) {
          // try to link by slug name
          const slug = path.basename(f, '.json');
          const product = existingProducts.find(pp => pp.slug === slug);
          if (product) filenameToProduct.set(normalizeName(base), product);
        }
      });
    } catch (e) { /* ignore */ }
  });
}

// Gather all image files under assetsRoot
const allFiles = walkDir(assetsRoot).filter(f => {
  const ext = path.extname(f).toLowerCase();
  return ['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext);
});

const moved = [];
const orphans = [];
const productImages = {}; // slug -> array of public paths

allFiles.forEach(file => {
  const rel = path.relative(assetsRoot, file);
  const parts = rel.split(path.sep);
  const filename = path.basename(file);
  const normalized = normalizeName(filename);

  // Determine target category
  let targetCategory = null;
  if (parts.length > 1) {
    // file is inside a subfolder; use the first-level folder as hint
    const sourceFolder = parts[0].toLowerCase();
    if (folderToCategory[sourceFolder]) targetCategory = folderToCategory[sourceFolder];
  }

  // If still unknown, try to find a product that references this filename
  if (!targetCategory) {
    const mappedProduct = filenameToProduct.get(normalized);
    if (mappedProduct) targetCategory = mappedProduct.category;
  }

  if (!targetCategory) {
    orphans.push(rel);
    targetCategory = 'Uncategorized';
  }

  const safeCategoryFolder = sanitizeFolderName(targetCategory);
  const targetDir = path.join(assetsRoot, safeCategoryFolder);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  const targetPath = path.join(targetDir, filename);

  // Move file if not already at target
  const alreadyAtTarget = path.normalize(file) === path.normalize(targetPath);
  if (!alreadyAtTarget) {
    fs.renameSync(file, targetPath);
  }

  moved.push({ from: rel, to: path.relative(assetsRoot, targetPath), category: targetCategory });

  // Register for product mapping
  const prod = filenameToProduct.get(normalized);
  if (prod) {
    const pubPath = `/products/${encodeURIComponent(safeCategoryFolder)}/${encodeURIComponent(filename)}`;
    productImages[prod.slug] = productImages[prod.slug] || new Set();
    productImages[prod.slug].add(pubPath);
  }
});

// Now update products.json entries to point to new paths and build productDetails galleries
const newProducts = existingProducts.map(p => {
  const slug = p.slug;
  const imagesSet = productImages[slug];
  let image = null;
  let gallery = [];
  if (imagesSet && imagesSet.size > 0) {
    gallery = Array.from(imagesSet);
    image = gallery[0];
  }
  return {
    ...p,
    image,
  };
});

fs.writeFileSync(productsJsonPath, JSON.stringify(newProducts, null, 2));

// Update or create productDetails files: reuse existing details where possible but replace gallery
if (!fs.existsSync(productDetailsDir)) fs.mkdirSync(productDetailsDir, { recursive: true });
existingProducts.forEach(p => {
  const slug = p.slug;
  const detailsPath = path.join(productDetailsDir, `${slug}.json`);
  let details = null;
  if (fs.existsSync(detailsPath)) {
    try { details = JSON.parse(fs.readFileSync(detailsPath, 'utf8')); } catch (e) { details = null; }
  }
  const imagesSet = productImages[slug];
  const gallery = imagesSet ? Array.from(imagesSet) : (details && details.gallery ? details.gallery.filter(Boolean) : []);
  const out = {
    title: details?.title || p.name,
    description: details?.description || p.shortDescription || p.name,
    seoTitle: details?.seoTitle || `${p.name} - Hajara Multicare`,
    seoDescription: details?.seoDescription || p.shortDescription || p.name,
    benefits: details?.benefits || ['Supports overall health', 'Traditional formulation', 'Natural ingredients'],
    uses: details?.uses || ['Supports overall health', 'Traditional formulation', 'Natural ingredients'],
    dosage: details?.dosage || ['Take as directed by Ayurvedic physician', 'Follow recommended dosage'],
    gallery: Array.from(new Set(gallery)),
    meta: details?.meta || { keywords: [p.name, p.category, 'Ayurvedic'] },
    extra: details?.extra || {}
  };
  fs.writeFileSync(detailsPath, JSON.stringify(out, null, 2));
});

// Final report
const categories = {};
const finalProducts = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
finalProducts.forEach(p => {
  categories[p.category] = categories[p.category] || 0;
  categories[p.category]++;
});

console.log('\n=== Reorganization Report ===');
console.log('- Total files processed:', allFiles.length);
console.log('- Files moved:', moved.length);
console.log('- Orphan files (require manual categorization):', orphans.length);
if (orphans.length) {
  orphans.forEach(o => console.log('  -', o));
}
console.log('\n- Category counts:');
Object.keys(categories).sort().forEach(cat => console.log(`  - ${cat}: ${categories[cat]}`));
console.log('\n✅ Reorganization complete. Updated products.json and productDetails/');

// Write a JSON report to scripts/reorg_report.json
const report = { moved, orphans, categoryCounts: categories, totalProducts: finalProducts.length };
fs.writeFileSync(path.join(__dirname, 'reorg_report.json'), JSON.stringify(report, null, 2));

process.exit(0);
