import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Categories.css';

const categories = [
  { 
    name: 'Herbal Powders', 
    description: 'Pure and natural herbal powders for wellness and daily health', 
    image: 'https://images.unsplash.com/photo-1598387993919-fdaa94a3b901?w=500&h=400&fit=crop'
  },
  { 
    name: 'Ayurvedic Tablets', 
    description: 'Convenient and potent Ayurvedic tablets for modern lifestyle', 
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=500&h=400&fit=crop'
  },
  { 
    name: 'Herbal Oils', 
    description: 'Therapeutic herbal oils for massage and external application', 
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&h=400&fit=crop'
  },
  { 
    name: 'Syrups & Tonics', 
    description: 'Nourishing syrups and tonics for overall health and vitality', 
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=400&fit=crop'
  },
  { 
    name: 'Herbal Capsules', 
    description: 'Easy-to-swallow herbal capsules with standardized extracts', 
    image: 'https://images.unsplash.com/photo-1587854692910-95636f5e3c66?w=500&h=400&fit=crop'
  },
  { 
    name: 'Herbal Teas', 
    description: 'Delicious and healthy herbal teas for daily wellness ritual', 
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&h=400&fit=crop'
  }
];

const Categories = () => {
  return (
    <section className="section categories">
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">Product Categories</span>
          <h2 className="section-title">Explore Our Premium Range</h2>
          <p className="section-subtitle">
            Comprehensive Ayurvedic solutions for every health need
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="category-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="category-image">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay" />
              </div>
              <div className="category-content">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-desc">{category.description}</p>
                <Link to="/products" className="category-link">
                  Explore Products
                  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 14L14 6M14 6H8M14 6V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
