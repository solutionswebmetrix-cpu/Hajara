import { motion } from 'framer-motion';
import { FiGlobe, FiHeart, FiPackage, FiStar } from 'react-icons/fi';
import './Export.css';

const countries = [
  'United States (US)', 'United Kingdom (UK)', 'United Arab Emirates (UAE)',
  'Germany', 'Italy', 'China', 'France', 'Nepal', 'Australia', 'Japan', 'Canada'
];

const Export = () => {
  return (
    <section className="section export">
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">Global Export</span>
          <h2 className="section-title">Serving 20+ Countries Worldwide</h2>
          <p className="section-subtitle">
            Our products reach customers across continents with reliable shipping
          </p>
        </div>

        <div className="export-grid">
          <motion.div
            className="export-map"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop"
              alt="Global Map"
              className="world-map-image"
            />
            <div className="map-overlay">
              <div className="map-stat">
                <div className="map-stat-icon"><FiGlobe /></div>
                <div>
                  <div className="map-stat-number">20+</div>
                  <div className="map-stat-label">Countries</div>
                </div>
              </div>
              <div className="map-stat">
                <div className="map-stat-icon"><FiPackage /></div>
                <div>
                  <div className="map-stat-number">100K+</div>
                  <div className="map-stat-label">Exports / Year</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="export-info"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="export-features">
              <div className="export-feature">
                <div className="export-icon"><FiStar /></div>
                <div>
                  <h3 className="export-feature-title">Fast Shipping</h3>
                  <p className="export-feature-text">Door-to-door delivery worldwide</p>
                </div>
              </div>
              <div className="export-feature">
                <div className="export-icon"><FiHeart /></div>
                <div>
                  <h3 className="export-feature-title">Global Network</h3>
                  <p className="export-feature-text">Distributors in 20+ countries</p>
                </div>
              </div>
            </div>

            <div className="countries-list">
              <h4 className="countries-title">We Export To</h4>
              <div className="countries-grid">
                {countries.map((country, index) => (
                  <motion.div
                    key={index}
                    className="country-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  >
                    {country}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Export;
