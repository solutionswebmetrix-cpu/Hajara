import { motion } from 'framer-motion';
import { FiAward, FiPackage, FiHeart, FiStar } from 'react-icons/fi';
import './Manufacturing.css';
import manufacturingImage from '../assets/manufacturing-facility/Manufacturing.jpg';

const facilities = [
  { 
    icon: <FiAward />, 
    title: 'State-of-the-Art Plant', 
    description: 'Modern manufacturing facility with advanced machinery' 
  },
  { 
    icon: <FiPackage />, 
    title: 'Quality Control Lab', 
    description: 'Rigorous testing at every stage of production' 
  },
  { 
    icon: <FiHeart />, 
    title: 'Clean Production', 
    description: 'Hygienic and sterile production environment' 
  },
  { 
    icon: <FiStar />, 
    title: 'Natural Ingredients', 
    description: 'Sourced from trusted organic farms' 
  }
];

const Manufacturing = () => {
  return (
    <section className="section manufacturing">
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">Manufacturing Facility</span>
          <h2 className="section-title">Where Tradition Meets Technology</h2>
          <p className="section-subtitle">
            Our world-class manufacturing plant ensures the highest quality standards
          </p>
        </div>

        <div className="manufacturing-grid">
          <motion.div
            className="manufacturing-visual"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={manufacturingImage}
              alt="Manufacturing Plant"
              className="facility-main-image"
            />
            <div className="facility-overlay">
              <div className="facility-stats">
                <div className="stat">
                  <span className="stat-number">50,000+</span>
                  <span className="stat-label">Sq. Ft. Area</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Quality Monitoring</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="manufacturing-content"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="facility-features">
              {facilities.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-item"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-text">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Manufacturing;
