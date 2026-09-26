import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiSearch, FiMenu, FiX, FiMessageSquare } from 'react-icons/fi'
import { categories, products, resolveProductImage, slugifyCategory } from '../data/products'
import './Navbar.css'
import logoImg from '../assets/logo.png'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const closeTimeoutRef = useRef(null)
  const normalizedSearchQuery = searchQuery.trim().toLowerCase()
  const searchResults = normalizedSearchQuery
    ? products
        .filter(product => product.name.toLowerCase().includes(normalizedSearchQuery))
        .slice(0, 6)
    : []

  const closeSearch = () => {
    setSearchOpen(false)
    setSearchQuery('')
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const query = searchQuery.trim()
    if (!query) return
    navigate(`/products?search=${encodeURIComponent(query)}`)
    closeSearch()
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const handleMegaEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setMegaMenuOpen(true)
  }

  const handleMegaLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false)
    }, 150)
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products', hasMegaMenu: true },
    { name: 'Export', path: '/export' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]

  const getCategoriesColumns = () => {
    const columns = [[], [], [], []];
    // Sort categories alphabetically A-Z (case-insensitive) before distributing
    const sortedCats = [...categories].sort((a, b) =>
      a.localeCompare(b, undefined, {
        sensitivity: "base",
        numeric: true
      })
    );
    sortedCats.forEach((cat, idx) => {
      columns[idx % 4].push({ name: cat, slug: slugifyCategory(cat) });
    });
    return columns;
  }

  const categoriesColumns = getCategoriesColumns();

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            <img src={logoImg} alt="HAJARA MULTICARE" className="logo-img" />
          </Link>

          <div className="nav-links">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className={`nav-link-wrapper ${location.pathname === link.path ? 'active' : ''}`}
                onMouseEnter={() => link.hasMegaMenu && handleMegaEnter()}
                onMouseLeave={() => link.hasMegaMenu && handleMegaLeave()}
              >
                <Link to={link.path} className="nav-link">
                  {link.name}
                  {link.hasMegaMenu && <span className="mega-arrow">▼</span>}
                </Link>

                {link.hasMegaMenu && megaMenuOpen && (
                  <div className="mega-menu">
                    <div className="mega-menu-container">
                      <div className="mega-columns">
                        {categoriesColumns.map((column, colIdx) => (
                          <div key={colIdx} className="mega-column">
                            {column.map((cat) => (
                              <Link to={`/products/${cat.slug}`} key={cat.slug} className="mega-link">
                                {cat.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="mega-footer">
                        <Link to="/products" className="view-all-link">
                          View All Products →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="nav-actions">
            <div className="header-search">
              <button
                type="button"
                className="nav-action-btn"
                aria-label="Search products"
                aria-expanded={searchOpen}
                aria-controls="product-search-panel"
                onClick={() => {
                  setSearchOpen(open => !open)
                  setMobileMenuOpen(false)
                }}
              >
                <FiSearch aria-hidden="true" />
              </button>
              {searchOpen && (
                <div className="header-search-panel" id="product-search-panel" role="search">
                  <div className="header-search-controls">
                    <form className="header-search-form" onSubmit={handleSearchSubmit}>
                      <input
                        type="search"
                        className="header-search-input"
                        value={searchQuery}
                        onChange={event => setSearchQuery(event.target.value)}
                        onKeyDown={event => event.key === 'Escape' && closeSearch()}
                        placeholder="Search products by name"
                        aria-label="Search products by name"
                        autoFocus
                      />
                      <button type="submit" className="header-search-submit" aria-label="Show search results">
                        <FiSearch aria-hidden="true" />
                      </button>
                    </form>
                    <button type="button" className="header-search-close" onClick={closeSearch} aria-label="Close search">
                      <FiX aria-hidden="true" />
                    </button>
                  </div>
                  {normalizedSearchQuery ? (
                    searchResults.length ? (
                      <ul className="header-search-results">
                        {searchResults.map(product => {
                          const image = resolveProductImage(product)
                          return (
                            <li key={product.id}>
                              <Link to={`/product/${product.id}`} className="header-search-result" onClick={closeSearch}>
                                {image && <img src={image} alt="" loading="lazy" />}
                                <span>{product.name}</span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    ) : (
                      <p className="header-search-empty">No products match that name.</p>
                    )
                  ) : null}
                </div>
              )}
            </div>
            <a href="https://wa.me/919897023005" className="btn-whatsapp" target="_blank" rel="noopener noreferrer">
              <FiMessageSquare />
              WhatsApp
            </a>
            <Link to="/contact" className="btn-get-quote">
              Get Quote
            </Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-container">
          <div className="mobile-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="mobile-menu-buttons">
            <a href="https://wa.me/919897023005" className="btn-whatsapp-mobile" target="_blank" rel="noopener noreferrer">
              <FiMessageSquare /> WhatsApp
            </a>
            <Link to="/contact" className="btn-get-quote-mobile" onClick={() => setMobileMenuOpen(false)}>
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
