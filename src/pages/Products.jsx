import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { products, categories, slugifyCategory, deslugifyCategory, isComingSoonProduct } from '../data/products';
import './Products.css';

const Products = () => {
  const { category: categorySlug } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(() => deslugifyCategory(categorySlug));
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 36;
  const productsSectionRef = useRef(null);

  useEffect(() => {
    setSelectedCategory(deslugifyCategory(categorySlug));
  }, [categorySlug]);

  // Filter products
  let filteredProducts = products;
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );
  }

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (categoryName) => {
    if (categoryName) {
      navigate(`/products/${slugifyCategory(categoryName)}`, { replace: false });
    } else {
      navigate('/products', { replace: false });
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Scroll to top of products section when page changes
  useEffect(() => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  // Generate pagination page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const pageTitle = selectedCategory ? `${selectedCategory}` : 'Our Products';

  return (
    <div className="products-page">
      <section className="page-header" style={{ background: 'var(--gradient-green-light)' }}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} key={pageTitle} className="page-title">{pageTitle}</motion.h1>
        </div>
      </section>

      {/* Search */}
      <section className="section search-section">
        <div className="container">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section categories-filter-section">
        <div className="container">
          <div className="categories-filter">
            <motion.button
              key="all"
              className={`category-btn ${!selectedCategory ? 'active' : ''}`}
              onClick={() => handleCategorySelect(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              All Products
            </motion.button>
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategorySelect(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: index * 0.02 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section ref={productsSectionRef} className="section products-display-section">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              {selectedCategory && !searchQuery ? (
                <>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text)' }}>
                    No products available
                  </h3>
                  <p>This product category is currently being updated. Please check back soon or explore our other categories.</p>
                  <div style={{ marginTop: '1.5rem' }}>
                    <Link to="/products" className="category-btn active" style={{ display: 'inline-block', textDecoration: 'none' }}>
                      View All Products
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text)' }}>
                    No products found
                  </h3>
                  <p>No products match your current search criteria. Please try a different search term or category.</p>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="products-grid-page">
                {currentProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="product-card-page"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="product-image-wrapper-page">
                      {product.image && !isComingSoonProduct(product) && (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="product-image-page" 
                          loading="lazy" 
                          decoding="async"
                        />
                      )}
                      {isComingSoonProduct(product) && (
                        <div className="coming-soon-overlay">
                          <span className="coming-soon-badge">New</span>
                          <h3 className="coming-soon-title">Coming Soon</h3>
                          <p className="coming-soon-subtitle">Launching Shortly</p>
                        </div>
                      )}
                    </div>
                    <div className="product-info-page">
                      <span className="product-category-tag-page">{product.category}</span>
                      <h3 className="product-name-page">{product.name}</h3>
                      <p className="product-desc-page">{product.shortDescription}</p>
                      <div className="product-footer-page">
                        <Link to={`/product/${product.id}`} className="view-product-btn-page">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination-wrapper">
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>

                    {pageNumbers[0] > 1 && (
                      <>
                        <button
                          className="pagination-number"
                          onClick={() => setCurrentPage(1)}
                        >
                          1
                        </button>
                        {pageNumbers[0] > 2 && <span className="pagination-dots">...</span>}
                      </>
                    )}

                    {pageNumbers.map(pageNum => (
                      <button
                        key={pageNum}
                        className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {pageNumbers[pageNumbers.length - 1] < totalPages && (
                      <>
                        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className="pagination-dots">...</span>}
                        <button
                          className="pagination-number"
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
