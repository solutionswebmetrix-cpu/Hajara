const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/products.json'), 'utf8'));

const containsKw = (t, ...kws) => kws.some(k => (t || '').toLowerCase().includes(k.toLowerCase()));
const mkCat = cats => p => cats.includes(p.category);

const map = {
  'herbal-syrups': {
    label: 'Herbal Syrups', filter: mkCat(['Sharbat'])
  },
  'liver-tonic-blood-purifier': {
    label: 'Liver Tonic & Blood Purifier', filter: p => {
      if (!['Sharbat'].includes(p.category)) return false;
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      return containsKw(n, 'liv', 'liver', 'careliv', 'blood', 'purifier', 'puspanjali');
    }
  },
  'ayurvedic-oils': {
    label: 'Ayurvedic Oils', filter: mkCat(['Medicated Taila'])
  },
  'ayurvedic-capsules-tablets': {
    label: 'Ayurvedic Capsules & Tablets', filter: mkCat(['Capsule', 'Vati & Gutika', 'Guggul Formulations', 'Loh & Mandur'])
  },
  'womens-health-products': {
    label: "Women's Health Products", filter: p => {
      const fromCat = ['Vati & Gutika', 'Sharbat', 'Churna'].includes(p.category);
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      const kw = containsKw(n, 'women', 'female', 'uterus', 'amber sundari', 'puspanjali', 'pradaran', 'raj pravartak', 'garbha', 'pushyanug');
      return fromCat && kw;
    }
  },
  'herbal-toothpaste-oral-care': {
    label: 'Herbal Toothpaste & Oral Care', filter: p => {
      if (['Ayurvedic Tooth Powders'].includes(p.category)) return true;
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      return containsKw(n, 'tooth', 'toothpaste', 'oral', 'manjan', 'dant', 'vajrika');
    }
  },
  'herbal-powders-churna': {
    label: 'Herbal Powders (Churna)', filter: mkCat(['Churna', 'Single Herb Powders'])
  },
  'mens-health-products': {
    label: "Men's Health Products", filter: p => {
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      return containsKw(n, 'grower', 'shilajit', 'musali', 'virya', 'dhatu', 'ortho', 'edno', 'pilock', 'vajrika', 'kamaxi', 'kama', 'men');
    }
  },
  'skin-care-products': {
    label: 'Skin Care Products', filter: p => {
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      return containsKw(n, 'face', 'skin', 'cream', 'wash', 'rosy', 'multicare face', 'charmolin');
    }
  },
  'health-tonic-immunity-boosters': {
    label: 'Health Tonic & Immunity Boosters', filter: p => {
      const fromCat = ['Advanced Brain Tonics & Mineral Rasayanas', 'Pak, Avaleha & Murabba'].includes(p.category);
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      const kw = containsKw(n, 'tonic', 'health', 'immunity', 'booster', 'brain', 'rasayan', 'chyawan', 'memorikind', 'memory kind', 'avaleha');
      return fromCat || kw;
    }
  },
  'herbal-cosmetics-personal-care': {
    label: 'Herbal Cosmetics & Personal Care', filter: p => {
      if (['Topical Application Powders'].includes(p.category)) return true;
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      return containsKw(n, 'face', 'cream', 'wash', 'hair', 'rosy', 'multicare', 'cosmetic', 'charmolin', 'shampoo');
    }
  },
  'hair-care-products': {
    label: 'Hair Care Products', filter: p => {
      const tm = ['Medicated Taila'].includes(p.category);
      const n = (p.name + ' ' + (p.shortDescription || '')).toLowerCase();
      const kw = containsKw(n, 'hair', 'shampoo', 'grower', 'bhringraj', 'brahmi', 'bringraj', 'mahabhringraj', 'reetha', 'shikakai', 'amla', 'maka');
      return (tm && kw) || kw;
    }
  }
};

let ok = 0, bad = 0;
console.log('=== MARKETING BUCKET COUNTS ===');
console.log('');
Object.entries(map).forEach(([slug, { label, filter }]) => {
  const matches = products.filter(filter);
  const flag = matches.length === 0 ? '❌ EMPTY' : '✓';
  if (matches.length === 0) bad++; else ok++;
  const sample = matches.slice(0, 4).map(m => m.name).join(' | ');
  console.log(flag + ' /products/' + slug + '  (' + label + ')');
  console.log('     Count: ' + matches.length + (sample ? ('     Samples: ' + sample) : ''));
});
console.log('');
console.log('Result: ' + ok + '/' + (ok + bad) + ' non-empty');
