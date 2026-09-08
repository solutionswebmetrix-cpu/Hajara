const fs = require('fs');
const path = require('path');

const detailsDir = path.join(__dirname, '..', 'src', 'data', 'productDetails');
const files = fs.readdirSync(detailsDir).filter(f => f.endsWith('.json'));

let problems = [];
files.forEach(file => {
  const slug = path.basename(file, '.json');
  const content = JSON.parse(fs.readFileSync(path.join(detailsDir, file), 'utf8'));
  const gallery = content.gallery || [];
  const bad = gallery.filter(imgPath => {
    if (!imgPath) return false;
    const name = path.basename(imgPath).toLowerCase();
    const slugTokens = slug.split(/[-_ ]+/).filter(Boolean);
    const nameTokens = name.split(/[^a-z0-9]+/i).filter(Boolean);
    // pass if any slug token appears in filename OR any filename token appears in slug
    const ok = slugTokens.some(st => nameTokens.some(nt => nt && (name.includes(st) || st.includes(nt) || nt.includes(st))))
      || nameTokens.some(nt => slugTokens.some(st => st && (st.includes(nt) || nt.includes(st) || slug.includes(nt))));
    return !ok;
  });
  if (bad.length > 0) {
    problems.push({ file, slug, bad, gallery });
  }
});

if (problems.length === 0) {
  console.log('All product detail galleries look OK (gallery filenames match their slug tokens).');
  process.exit(0);
}

console.log('Found gallery issues for the following product detail files:');
problems.forEach(p => {
  console.log('\nFile:', p.file);
  console.log('Slug:', p.slug);
  console.log('Gallery:', p.gallery);
  console.log('Bad images (do not contain slug tokens):');
  p.bad.forEach(b => console.log('  -', b));
});
process.exit(1);
