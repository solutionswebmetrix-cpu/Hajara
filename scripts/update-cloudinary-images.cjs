const fs = require('fs');
const path = require('path');

// Configuration
const CLOUDINARY_CLOUD_NAME = 'nxb1cweo';
const CLOUDINARY_BASE_FOLDER = 'product';

// Paths
const SRC_ASSETS_PRODUCT = path.join(__dirname, '..', 'src', 'assets', 'product');
const PRODUCTS_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'products.json');
const PRODUCT_DETAILS_DIR = path.join(__dirname, '..', 'src', 'data', 'productDetails');

// Category mapping from product category to Cloudinary folder
const CATEGORY_MAPPING = {
  'Vati & Gutika': 'Vati',
  'Capsule': 'capsule',
  'Single Herb Powders': 'powder',
  'Sharbat': 'syrup',
  'Guggul Formulations': 'Guggul Formulations',
  'Medicated Taila': 'Medicated Taila',
  'Loh': 'Loh',
  'Ayurvedic Tooth Powders': 'Ayurvedic Tooth Powders',
  'Churna': 'powder',
  'Topical Application Powders': 'powder',
  'Advanced Brain Tonics & Mineral Rasayanas': 'powder'
};

// Function to normalize string for matching
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Step 1: Scan local assets to build image map
function buildLocalImageMap() {
  const imageMap = {};
  const categoryDirs = fs.readdirSync(SRC_ASSETS_PRODUCT).filter(f => fs.statSync(path.join(SRC_ASSETS_PRODUCT, f)).isDirectory());

  categoryDirs.forEach(categoryDir => {
    const categoryPath = path.join(SRC_ASSETS_PRODUCT, categoryDir);
    const files = fs.readdirSync(categoryPath).filter(f => !fs.statSync(path.join(categoryPath, f)).isDirectory());
    
    files.forEach(file => {
      const key = normalize(path.basename(file, path.extname(file)));
      if (!imageMap[key]) {
        imageMap[key] = [];
      }
      imageMap[key].push({
        categoryFolder: categoryDir,
        filename: file,
        cloudinaryPath: `${CLOUDINARY_BASE_FOLDER}/${categoryDir}/${file}`
      });
    });
  });

  return imageMap;
}

// Function to find best matching image for a product
function findMatchingImage(product, imageMap) {
  const productKey = normalize(product.name);
  const cloudinaryFolder = CATEGORY_MAPPING[product.category] || product.category;

  // First check for exact key match
  if (imageMap[productKey]) {
    // Prefer matching category folder
    const categoryMatch = imageMap[productKey].find(img => img.categoryFolder === cloudinaryFolder);
    if (categoryMatch) return categoryMatch;
    // Otherwise return first match
    return imageMap[productKey][0];
  }

  // Check for partial matches
  for (const key in imageMap) {
    if (key.includes(productKey) || productKey.includes(key)) {
      const categoryMatch = imageMap[key].find(img => img.categoryFolder === cloudinaryFolder);
      if (categoryMatch) return categoryMatch;
      return imageMap[key][0];
    }
  }

  return null;
}

// Function to create Cloudinary URL
function getCloudinaryUrl(cloudinaryPath, isGallery = false) {
  const width = isGallery ? 1000 : 600;
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${cloudinaryPath}`;
}

// Process products.json
function processProductsJson(imageMap) {
  const productsData = JSON.parse(fs.readFileSync(PRODUCTS_JSON_PATH, 'utf8'));
  let updatedCount = 0;
  let notFoundCount = 0;

  const updatedProducts = productsData.map(product => {
    const match = findMatchingImage(product, imageMap);
    if (match) {
      updatedCount++;
      return {
        ...product,
        image: getCloudinaryUrl(match.cloudinaryPath, false)
      };
    } else {
      notFoundCount++;
      return product;
    }
  });

  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(updatedProducts, null, 2), 'utf8');
  console.log(`✅ products.json: ${updatedCount} images updated, ${notFoundCount} not found`);
  return { updated: updatedCount, notFound: notFoundCount };
}

// Process productDetails
function processProductDetails(imageMap) {
  const files = fs.readdirSync(PRODUCT_DETAILS_DIR).filter(f => f.endsWith('.json'));
  let processedGalleries = 0;
  let updatedImages = 0;

  files.forEach(filename => {
    const filePath = path.join(PRODUCT_DETAILS_DIR, filename);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (data.gallery && Array.isArray(data.gallery)) {
      processedGalleries++;
      const productName = data.title || path.basename(filename, '.json').replace(/-/g, ' ');
      const productKey = normalize(productName);
      
      let newGallery = [];
      
      // First check if we have local images for this product
      if (imageMap[productKey]) {
        newGallery = imageMap[productKey].map(img => getCloudinaryUrl(img.cloudinaryPath, true));
      } else {
        // Keep existing gallery if no new images, but ensure they're Cloudinary URLs
        newGallery = data.gallery.map(img => {
          if (!img.startsWith('http')) {
            return getCloudinaryUrl(img, true);
          }
          return img;
        }).filter(Boolean);
      }

      if (newGallery.length > 0) {
        data.gallery = newGallery;
        updatedImages += newGallery.length;
      }
      
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    }
  });

  console.log(`✅ productDetails: ${processedGalleries} galleries, ${updatedImages} images updated`);
}

// Main function
async function main() {
  console.log('🚀 Starting image update...');
  const imageMap = buildLocalImageMap();
  console.log(`📷 Found ${Object.keys(imageMap).length} unique image sets locally`);
  
  const productsStats = processProductsJson(imageMap);
  processProductDetails(imageMap);
  
  console.log('\n✨ Update complete!');
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
