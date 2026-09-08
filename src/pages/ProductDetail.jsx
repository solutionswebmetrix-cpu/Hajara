import { useParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone } from 'react-icons/fi';
import { getProductById, getRelatedProducts, isComingSoonProduct } from '../data/products';
import './ProductDetail.css';

const normalizeList = (value, defaults) => {
  let list = [];
  if (value) {
    if (Array.isArray(value)) {
      list = value;
    } else if (typeof value === 'string') {
      list = [value];
    }
  }
  if (list.length === 0) {
    list = defaults;
  }
  return list;
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const relatedProducts = product ? getRelatedProducts(product) : [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [id]);

  const fullProduct = useMemo(() => {
    if (!product) return null;
    const dosageArray = normalizeList(product.dosage, [
      'Take as directed by Ayurvedic physician',
      'Follow recommended dosage'
    ]);
    const usesArray = normalizeList(product.uses, [
      'Supports overall health',
      'Traditional formulation',
      'Natural ingredients'
    ]);
    return {
      ...product,
      uses: usesArray,
      dosage: dosageArray,
      gallery: product.gallery || (product.image ? [product.image] : [])
    };
  }, [product]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!fullProduct?.gallery || fullProduct.gallery.length <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setSelectedImageIndex((prev) => (prev + 1) % fullProduct.gallery.length);
      } else {
        setSelectedImageIndex((prev) => (prev - 1 + fullProduct.gallery.length) % fullProduct.gallery.length);
      }
    }
  };

  const handleInquiry = () => {
    const subject = encodeURIComponent(`Inquiry about ${fullProduct.name}`);
    const body = encodeURIComponent(`Hello,\n\nI am interested in ${fullProduct.name}.\n\nPlease provide more details.\n\nThank you!`);
    window.location.href = `mailto:hajaramulticare17@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello! I'm interested in ${fullProduct.name}.`);
    window.open(`https://wa.me/919897023005?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  if (!product || !fullProduct) {
    return (
      <div className="product-detail-page">
        <section className="page-header">
          <div className="container">
            <h1 className="page-title">Product Not Found</h1>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Link to="/products" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                View All Products
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const galleryImages = fullProduct.gallery || (fullProduct.image ? [fullProduct.image] : []);
  const hasMultipleImages = galleryImages.length > 1;

  return (
    <div className="product-detail-page">
      <section className="page-header" style={{ background: 'var(--gradient-green-light)' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="page-title"
          >
            Product Details
          </motion.h1>
        </div>
      </section>

      <section className="section product-hero">
        <div className="container">
          <div className="product-detail">
            {/* Product Gallery */}
            <div className="product-gallery-wrapper">
              <div 
                className="product-main-image"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {isComingSoonProduct(fullProduct) ? (
                  <div className="coming-soon-overlay">
                    <span className="coming-soon-badge">New</span>
                    <h3 className="coming-soon-title">Coming Soon</h3>
                    <p className="coming-soon-subtitle">Launching Shortly</p>
                  </div>
                ) : galleryImages.length > 0 ? (
                  <img 
                    src={galleryImages[selectedImageIndex]} 
                    alt={fullProduct.name}
                  />
                ) : null}
              </div>
              {hasMultipleImages && !isComingSoonProduct(fullProduct) && (
                <div className="product-thumbnails">
                  {galleryImages.map((img, index) => (
                    <motion.button
                      key={index}
                      className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                      onClick={() => setSelectedImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={img} alt={`${fullProduct.name} ${index + 1}`} />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            <div className="product-detail-info">
              <span className="product-category">{fullProduct.category}</span>
              <h2>{fullProduct.name}</h2>
              <p className="description">{fullProduct.shortDescription}</p>

              <div className="action-buttons">
                <motion.button
                  className="btn inquiry-btn"
                  onClick={handleInquiry}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiMail />
                  Send Inquiry
                </motion.button>
                <motion.button
                  className="btn whatsapp-btn"
                  onClick={handleWhatsApp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiPhone />
                  WhatsApp
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section product-details-section">
        <div className="container">
          <div className="product-details-grid">
            <div className="product-details-content">
              <div className="product-section">
                <h3 className="section-heading">Description</h3>
                <p>{fullProduct.description || fullProduct.longDescription}</p>
              </div>

              <div className="product-section">
                <h3 className="section-heading">Uses & Benefits</h3>
                <ul className="uses-list">
                  {fullProduct.uses.map((use, index) => (
                    <li key={index}>{use}</li>
                  ))}
                </ul>
              </div>

              <div className="product-section">
                <h3 className="section-heading">Dosage & Directions</h3>
                <ul className="dosage-list">
                  {fullProduct.dosage.map((dose, index) => (
                    <li key={index}>{dose}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section related-products-section">
          <div className="container">
            <h2 className="related-products-title">Related Products</h2>
            <div className="related-products-grid">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  className="related-product-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link to={`/product/${relatedProduct.id}`} className="related-product-link">
                    <div className="related-product-image">
                      {relatedProduct.image && !isComingSoonProduct(relatedProduct) && (
                        <img src={relatedProduct.image} alt={relatedProduct.name} />
                      )}
                      {isComingSoonProduct(relatedProduct) && (
                        <div className="coming-soon-overlay">
                          <span className="coming-soon-badge">New</span>
                          <h3 className="coming-soon-title">Coming Soon</h3>
                          <p className="coming-soon-subtitle">Launching Shortly</p>
                        </div>
                      )}
                    </div>
                    <div className="related-product-info">
                      <h3 className="related-product-name">{relatedProduct.name}</h3>
                      <p className="related-product-category">{relatedProduct.category}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
