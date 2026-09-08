import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiStar, FiGlobe, FiArrowRight } from 'react-icons/fi';
import { products, isComingSoonProduct } from '../data/products';
import './FeaturedProducts.css';

const hotProductOrder = [
  341,
  342,
  35,
  286,
  343,
  93,
  6,
  63,
  18,
  344,
  345,
  346,
  19,
  92,
  21,
  60,
  54,
  222
];

const FeaturedProducts = () => {
  const featuredProducts = hotProductOrder
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <section className="section featured-products">
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">Hot Products</span>
          <h2 className="section-title">Our Premium Ayurvedic Products</h2>
          <p className="section-subtitle">
            Loved by thousands of customers worldwide for their effectiveness and quality
          </p>
        </div>
        
        <div className="products-grid">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="product-image-wrapper">
                <div className="product-badge">Best Seller</div>
                {product.image && !isComingSoonProduct(product) && (
                  <img src={product.image} alt={product.name} className="product-image" />
                )}
                {isComingSoonProduct(product) && (
                  <div className="coming-soon-overlay">
                    <span className="coming-soon-badge">New</span>
                    <h3 className="coming-soon-title">Coming Soon</h3>
                    <p className="coming-soon-subtitle">Launching Shortly</p>
                  </div>
                )}
                <div className="product-actions">
                  <button className="action-btn" aria-label="Add to wishlist">
                    <FiHeart />
                  </button>
                  <button className="action-btn" aria-label="Quick view">
                    <FiStar />
                  </button>
                  <button className="action-btn" aria-label="Add to cart">
                    <FiGlobe />
                  </button>
                </div>
              </div>
              <div className="product-info">
                <span className="product-category-tag">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.shortDescription}</p>
                <div className="product-footer">
                  <Link to={`/product/${product.id}`} className="view-product-btn">
                    View Details
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="view-all-wrapper">
          <Link to="/products" className="view-all-btn">
            View All Products
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
