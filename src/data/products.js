// Import from products.json and categories.json instead!
import productsJson from './products.json';
import categoriesJson from './categories.json';

export const categories = categoriesJson;
export const products = productsJson;

// -------- Marketing categories for the Navbar Mega Menu --------
// These are the 12 human-friendly names shown to users in the dropdown.
// Order, display names, and slugs are fixed per requirements.

const containsKw = (text, ...kws) => {
  const t = (text || '').toLowerCase();
  return kws.some(k => t.includes(k.toLowerCase()));
};

export const marketingCategories = [
  { name: 'Herbal Syrups', slug: 'herbal-syrups' },
  { name: 'Ayurvedic Capsules & Tablets', slug: 'ayurvedic-capsules-tablets' },
  { name: 'Herbal Powders (Churna)', slug: 'herbal-powders-churna' },
  { name: 'Health Tonic & Immunity Boosters', slug: 'health-tonic-immunity-boosters' },
  { name: 'Liver Tonic & Blood Purifier', slug: 'liver-tonic-blood-purifier' },
  { name: "Women's Health Products", slug: 'womens-health-products' },
  { name: "Men's Health Products", slug: 'mens-health-products' },
  { name: 'Herbal Cosmetics & Personal Care', slug: 'herbal-cosmetics-personal-care' },
  { name: 'Ayurvedic Oils', slug: 'ayurvedic-oils' },
  { name: 'Herbal Toothpaste & Oral Care', slug: 'herbal-toothpaste-oral-care' },
  { name: 'Skin Care Products', slug: 'skin-care-products' },
  { name: 'Hair Care Products', slug: 'hair-care-products' }
];

// -------- Slugify / deslugify (technical categories, still used on Products page) --------
export const slugifyCategory = (categoryName) => {
  if (!categoryName) return '';
  return categoryName
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const deslugifyCategory = (slug) => {
  if (!slug) return null;
  const exactMatch = categories.find(c => slugifyCategory(c) === slug);
  if (exactMatch) return exactMatch;
  const slugNorm = slug.toLowerCase().replace(/-+/g, ' ').trim();
  const looseMatch = categories.find(c => {
    const cNorm = c
      .toLowerCase()
      .replace(/&/g, ' ')
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, ' ');
    return cNorm === slugNorm;
  });
  return looseMatch || null;
};

// -------- Marketing category resolver --------
// Returns a { label, filter } tuple for a given marketing slug.
// filter(product) => true if the product belongs to that marketing bucket.
// Also works for technical category slugs so we keep backwards compatibility.

const mkCategoryFilter = (categoryNames) => (p) => categoryNames.includes(p.category);
const mkKeywordFilter = (categoryNames, keywords, requireAnyKeyword = false) => (p) => {
  const catOk = !categoryNames.length || categoryNames.includes(p.category);
  if (!catOk) return false;
  if (!keywords.length) return true;
  const haystack = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
  const anyKw = keywords.some(k => haystack.includes(k.toLowerCase()));
  return requireAnyKeyword ? anyKw : (!requireAnyKeyword ? (keywords.length ? anyKw : true) : true);
};

const mkComboFilter = (categoryNames, keywords = []) => (p) => {
  const catOk = categoryNames.length === 0 || categoryNames.includes(p.category);
  const kwOk = keywords.length === 0 || keywords.some(k =>
    (p.name + ' ' + (p.shortDescription || '')).toLowerCase().includes(k.toLowerCase())
  );
  if (categoryNames.length === 0) return kwOk;
  if (keywords.length === 0) return catOk;
  return catOk || kwOk;
};

// Marketing slug → { label, filter }  (strict 1-to-1 mapping of required URLs)
export const marketingCategoryMap = {
  'herbal-syrups': {
    label: 'Herbal Syrups',
    filter: mkCategoryFilter(['Syrup'])
  },
  'liver-tonic-blood-purifier': {
    label: 'Liver Tonic & Blood Purifier',
    filter: (p) => {
      if (!['Syrup'].includes(p.category)) return false;
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      return containsKw(n, 'liv', 'liver', 'careliv', 'blood', 'purifier', 'puspanjali');
    }
  },
  'ayurvedic-oils': {
    label: 'Ayurvedic Oils',
    filter: mkCategoryFilter(['Oil', 'Hair Care Products'])
  },
  'ayurvedic-capsules-tablets': {
    label: 'Ayurvedic Capsules & Tablets',
    filter: mkCategoryFilter(['Capsule', 'Vati & Gutika', 'Guggul Formulations', 'Loh & Mandur'])
  },
  'womens-health-products': {
    label: "Women's Health Products",
    filter: (p) => {
      const fromCategory = ['Vati & Gutika', 'Syrup', 'Churna', 'Capsule'].includes(p.category);
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      const keywordsMatch = containsKw(n, 'women', 'female', 'uterus', 'amber sundari', 'puspanjali', 'pradaran', 'raj pravartak', 'garbha', 'pushyanug', 'kamarxi');
      return fromCategory && keywordsMatch;
    }
  },
  'herbal-toothpaste-oral-care': {
    label: 'Herbal Toothpaste & Oral Care',
    filter: (p) => {
      if (['Ayurvedic Tooth Powders', 'Herbal Toothpaste & Oral Care'].includes(p.category)) return true;
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      return containsKw(n, 'tooth', 'toothpaste', 'oral', 'manjan', 'dant', 'vajrika', 'vajsikta');
    }
  },
  'herbal-powders-churna': {
    label: 'Herbal Powders (Churna)',
    filter: mkCategoryFilter(['Churna', 'Single Herb Powders'])
  },
  'mens-health-products': {
    label: "Men's Health Products",
    filter: (p) => {
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      return containsKw(n, 'grower', 'shilajit', 'musali', 'virya', 'dhatu', 'ortho', 'edno', 'pilock', 'vajrika', 'kamaxi', 'kama', 'men');
    }
  },
  'skin-care-products': {
    label: 'Skin Care Products',
    filter: (p) => {
      if (['Skin Care Products'].includes(p.category)) return true;
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      return containsKw(n, 'face', 'skin', 'cream', 'wash', 'rosy', 'multicare face', 'charmolin');
    }
  },
  'health-tonic-immunity-boosters': {
    label: 'Health Tonic & Immunity Boosters',
    filter: (p) => {
      const fromCategory = ['Advanced Brain Tonics & Mineral Rasayanas', 'Pak, Avaleha & Murabba'].includes(p.category);
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      const kwMatch = containsKw(n, 'tonic', 'health', 'immunity', 'booster', 'brain', 'rasayan', 'chyawan', 'memorikind', 'memory kind', 'avaleha');
      return fromCategory || kwMatch;
    }
  },
  'herbal-cosmetics-personal-care': {
    label: 'Herbal Cosmetics & Personal Care',
    filter: (p) => {
      if (['Topical Application Powders', 'Skin Care Products', 'Hair Care Products', 'Herbal Shampoo'].includes(p.category)) return true;
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      return containsKw(n, 'face', 'cream', 'wash', 'hair', 'rosy', 'multicare', 'cosmetic', 'charmolin', 'shampoo');
    }
  },
  'hair-care-products': {
    label: 'Hair Care Products',
    filter: (p) => {
      const categoryMatch = ['Oil', 'Hair Care Products', 'Herbal Shampoo'].includes(p.category);
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      const kwMatch = containsKw(n, 'hair', 'shampoo', 'grower', 'bhringraj', 'brahmi', 'bringraj', 'mahabhringraj', 'reetha', 'shikakai', 'amla', 'maka', 'blackzena', 'surt');
      if (categoryMatch) return true;
      if (kwMatch) return true;
      return false;
    }
  }
};

// Given a URL slug segment, return:
//   { type: 'marketing' | 'technical' | null, label, filter, filterText, filterType }
export const resolveCategorySlug = (slug) => {
  if (!slug) return null;
  if (marketingCategoryMap[slug]) {
    return {
      type: 'marketing',
      slug,
      label: marketingCategoryMap[slug].label,
      filter: marketingCategoryMap[slug].filter
    };
  }
  const technicalName = deslugifyCategory(slug);
  if (technicalName) {
    return {
      type: 'technical',
      slug,
      label: technicalName,
      filter: (p) => p.category === technicalName
    };
  }
  return null;
};

// Helper functions
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

export const getRelatedProducts = (product) => {
  return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
};

export const COMING_SOON_CATEGORY = "Pak, Avaleha & Murabba";

export const isComingSoonProduct = (product) => {
  if (!product) return false;
  return product.category === COMING_SOON_CATEGORY;
};
