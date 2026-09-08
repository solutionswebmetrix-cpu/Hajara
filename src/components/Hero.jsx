import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGlobe, FiAward, FiStar, FiCheckCircle } from 'react-icons/fi';
import './Hero.css';
import manufacturingFacilityImg from '../assets/about-us/Manufacturing.jpg';
import herbalIngredientsImg from '../assets/about-us/herbal-ingredients.png';
import heroMainImg from '../assets/hero.png';
import heroBgImg from '../assets/about-us/about-us-banner.png';

const Hero = () => {
  const handleImageError = (e, fallbackSrc) => {
    e.target.src = fallbackSrc;
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-banner-container">
          <img 
            src={heroBgImg} 
            alt="Hero Background"
            className="hero-banner-image"
            onError={(e) => handleImageError(e, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=700&fit=crop')}
          />
        </div>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="hero-badge">
              <FiGlobe />
              <span>Premium Ayurvedic Manufacturer & Exporter</span>
            </div>

            <h1 className="hero-title">
              Crafting <span className="highlight">Ayurvedic Excellence</span> for Global Wellness
            </h1>

            <p className="hero-description">
              Since 2005, HAJARA MULTICARE has been a trusted name in Ayurvedic healthcare, delivering premium quality products to 20+ countries. Experience the perfect blend of ancient wisdom and modern manufacturing.
            </p>

            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">
                Explore Products
                <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-gold">
                Get Quote
              </Link>
            </div>

            <div className="hero-trust">
            <div className="trust-item">
              <FiCheckCircle />
              <span>Well Certified</span>
            </div>
            <div className="trust-item">
              <FiCheckCircle />
              <span>ISO Certified</span>
            </div>
            <div className="trust-item">
              <FiCheckCircle />
              <span>25+ Years Experience</span>
            </div>
          </div>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="hero-visual">
              <div className="hero-images-grid">
                {/* <div className="hero-image-main">
                  <img 
                    src={heroMainImg} 
                    alt="Ayurvedic Products"
                    className="product-img"
                    onError={(e) => handleImageError(e, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=700&fit=crop')}
                  />
                </div> */}
                {/* <div className="hero-image-secondary hero-image-secondary-1">
                  <img 
                    src={manufacturingFacilityImg} 
                    alt="Manufacturing Facility"
                    className="product-img"
                    onError={(e) => handleImageError(e, 'https://images.unsplash.com/photo-1598439216761-09625547348b?w=400&h=300&fit=crop')}
                  />
                </div> */}
                <div className="hero-image-secondary hero-image-secondary-2">
                  <img 
                    src={herbalIngredientsImg} 
                    alt="Herbal Ingredients"
                    className="product-img"
                    onError={(e) => handleImageError(e, 'https://images.unsplash.com/photo-1595425908973-9c982585c451?w=400&h=300&fit=crop')}
                  />
                </div>
              </div>

              {/* <motion.div
                className="floating-badge badge-gmp"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <FiAward />
                <span>GMP Certified</span>
              </motion.div>

              <motion.div
                className="floating-badge badge-export"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <FiGlobe />
                <span>20+ Countries</span>
              </motion.div>

              <motion.div
                className="floating-badge badge-experience"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <FiStar />
                <span>15+ Years</span>
              </motion.div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
