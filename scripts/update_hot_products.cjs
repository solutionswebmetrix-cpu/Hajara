const fs = require('fs');
const path = 'src/data/products.json';
const products = JSON.parse(fs.readFileSync(path, 'utf8'));
const updates = {
  'grower-sat':{name:'Grower Herbal Soap',category:'Herbal Shampoo',desc:'Proprietary Medicine: For hair & scalp support'},
  'dev-black-care-shampoo':{name:'Dev Blackcroma Shampoo',category:'Herbal Shampoo',desc:'Proprietary Medicine: For scalp and hair blackening support'},
  'grower-hair-oil':{name:'Grower Hair Oil',category:'Herbal Regrowth Hair Oil',desc:'Proprietary Medicine: For hair regrowth and scalp support'},
  'hajara-multicare-face-wash':{name:'Hajam Multicare Facewash',category:'Herbal Facewash',desc:'Proprietary Medicine: For deep cleansing and skin support'},
  'rosy-face-cream':{name:'Rosy Face Cream',category:'Herbal Face Cream',desc:'Proprietary Medicine: For acne, pimples & fairness support'},
  'vajrika-ayurvedic-toothpaste':{name:'Vajikaran Toothpowder',category:'Ayurvedic Toothpowder',desc:'Proprietary Medicine: For teeth, gums and oral support'},
  'mr-ortho-pain-oil':{name:'Mr. Ortho Pain Oil',category:'Pain Relief Oil',desc:'Proprietary Medicine: For painful and swelling conditions'},
  'kabjvida-powder':{name:'Kabj Vida Churna',category:'Constipation Churna',desc:'Proprietary Medicine: For constipation and digestive support'},
  'kamaxi-capsule':{name:'Kamesi Capsule',category:'Female Vital & Wellness',desc:'Proprietary Medicine: For female vitality and wellness support'},
  'edno-capsule':{name:'EDN6 Capsule',category:'Male Vital & Vitality',desc:'Proprietary Medicine: For male vitality & wellness support'},
  'pilock-h-capsule':{name:'Piloek-H Capsule',category:'Herbal Haemorrhoids',desc:'Proprietary Medicine: Helpful in relief from haemorrhoids (piles), burning, anal fissure & discomfort'},
  'activa-syrup':{name:'Activ Syrup',category:'Herbal Generality Syrup',desc:'Proprietary Medicine: For energy support'},
  'careliv-liver-disorder-syrup':{name:'Careliv Syrup',category:'Herbal Liver Syrup',desc:'Proprietary Medicine: For detox and liver wellness support'},
  'puspanjali-ayurvedic-medicine-syrup':{name:'Pushpangali Syrup',category:'Herbal Female Syrup',desc:'Proprietary Medicine: For uterus and female wellness'},
  'charmolin-syrup':{name:'Charmolin Syrup',category:'Herbal Bloodpurify & Skin Syrup',desc:'Proprietary Medicine: For healthy skin and blood-purification support'}
};
let changed=0;
products.forEach(p=>{
  const u = updates[p.slug];
  if(u){
    if(p.name !== u.name) p.name = u.name;
    if(p.category !== u.category) p.category = u.category;
    p.shortDescription = u.desc;
    p.description = u.desc;
    changed++;
  }
});
fs.writeFileSync(path, JSON.stringify(products, null, 2) + '\n', 'utf8');
console.log('updated', changed);
const verify = products.filter(p => Object.keys(updates).includes(p.slug)).map(p => ({slug:p.slug,id:p.id,name:p.name,category:p.category,shortDescription:p.shortDescription}));
console.log(JSON.stringify(verify, null, 2));
