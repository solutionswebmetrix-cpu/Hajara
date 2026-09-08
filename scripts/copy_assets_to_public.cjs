const fs = require('fs');
const path = require('path');

const srcRoot = path.join(__dirname, '..', 'src', 'assets', 'product');
const destRoot = path.join(__dirname, '..', 'public', 'products');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function walkAndCopy(src, destBase) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  entries.forEach(e => {
    const srcPath = path.join(src, e.name);
    if (e.isDirectory()) {
      const destDir = path.join(destBase, e.name);
      ensureDir(destDir);
      walkAndCopy(srcPath, destDir);
    } else {
      const destPath = path.join(destBase, e.name);
      // copy file (overwrite)
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

ensureDir(destRoot);
walkAndCopy(srcRoot, destRoot);

// Count files
function countFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let count = 0;
  entries.forEach(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) count += countFiles(p);
    else count++;
  });
  return count;
}

const total = countFiles(destRoot);
console.log('Copied assets to public/products. Total files:', total);
process.exit(0);
