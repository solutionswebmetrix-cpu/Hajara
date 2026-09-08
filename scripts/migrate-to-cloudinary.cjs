const fs = require('fs');
const path = require('path');

// Configuration
const CLOUDINARY_CLOUD_NAME = 'nxb1cweo';
const CLOUDINARY_FOLDER = 'product';

// Paths
const PRODUCTS_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'products.json');
const PRODUCT_DETAILS_DIR = path.join(__dirname, '..', 'src', 'data', 'productDetails');

// Function to convert local path to Cloudinary URL
function localPathToCloudinaryUrl(localPath, isGallery = false) {
  if (!localPath || localPath === null) {
    return null;
  }

  // Remove leading slash and decode URI components
  let cleanPath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
  cleanPath = decodeURIComponent(cleanPath);

  // Replace "products/" with "product/" in the path
  const cloudinaryPath = cleanPath.replace(/^products\//, 'product/');

  const width = isGallery ? 1000 : 600;
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${cloudinaryPath}`;
}

// Process products.json
async function processProductsJson() {
  const productsData = JSON.parse(fs.readFileSync(PRODUCTS_JSON_PATH, 'utf8'));
  let processedCount = 0;
  let missingCount = 0;

  const updatedProducts = productsData.map(product => {
    const newImage = localPathToCloudinaryUrl(product.image);
    if (newImage) {
      processedCount++;
    } else {
      missingCount++;
    }
    return {
      ...product,
      image: newImage
    };
  });

  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(updatedProducts, null, 2), 'utf8');
  console.log(`✅ Processed products.json: ${processedCount} images updated, ${missingCount} missing`);
  return { total: productsData.length, processed: processedCount, missing: missingCount };
}

// Process productDetails JSON files
async function processProductDetails() {
  const files = fs.readdirSync(PRODUCT_DETAILS_DIR).filter(f => f.endsWith('.json'));
  let totalGalleries = 0;
  let processedImages = 0;

  files.forEach(filename => {
    const filePath = path.join(PRODUCT_DETAILS_DIR, filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (data.gallery && Array.isArray(data.gallery)) {
      totalGalleries++;
      const updatedGallery = data.gallery.map(imgPath => {
        const cloudUrl = localPathToCloudinaryUrl(imgPath, true);
        if (cloudUrl) {
          processedImages++;
        }
        return cloudUrl;
      }).filter(Boolean);

      data.gallery = updatedGallery;
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    }
  });

  console.log(`✅ Processed productDetails: ${totalGalleries} galleries, ${processedImages} images updated`);
}

// Run the migration
(async () => {
  console.log('🚀 Starting Cloudinary migration...');
  const stats = await processProductsJson();
  await processProductDetails();
  console.log('\n📊 Migration Summary:');
  console.log(`   Total products: ${stats.total}`);
  console.log(`   Products with images: ${stats.processed}`);
  console.log(`   Products without images: ${stats.missing}`);
  console.log('✨ Migration complete!');
})();
