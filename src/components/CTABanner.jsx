import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import './CTABanner.css';
import bannerImage from '../assets/about-us/about-us-banner.png';

const CTABanner = () => {
  return (
    <section className="section cta">
      <div className="cta-background-image" style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="cta-background" />
      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="cta-badge">Partner With Us</span>
          <h2 className="cta-title">Ready to Experience Ayurvedic Excellence?</h2>
          <p className="cta-description">
            Join thousands of satisfied partners and customers worldwide. Let's build a healthier future together.
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">
              Get In Touch <FiArrowRight />
            </Link>
            <Link to="/products" className="btn btn-secondary">
              Explore Products
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="cta-pattern" />
    </section>
  );
};

export default CTABanner;
