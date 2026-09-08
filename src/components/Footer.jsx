import { Link } from 'react-router-dom';
import { 
  FiFacebook, 
  FiInstagram, 
  FiLinkedin, 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiGlobe 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './Footer.css';
import logoImg from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1 */}
          <div className="footer-column footer-about">
            <Link to="/" className="footer-logo-link">
              <img src={logoImg} alt="HAJARA MULTICARE" className="footer-logo-img" />
            </Link>
            <h2 className="footer-logo-text">HAJARA MULTICARE</h2>
            <p className="footer-desc">
              Hajara Multi Care is a trusted manufacturer and exporter of premium Ayurvedic, Herbal, and Natural Healthcare products. Since 2005, we have been delivering high-quality formulations to domestic and international markets with a commitment to quality, innovation, and customer satisfaction.
            </p>
            <div className="footer-social">
              <a 
                href="https://www.facebook.com/share/1Bw1CR8wwn/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>
              <a 
                href="https://www.instagram.com/hajaramulticare?igsh=NTd4eml4MmFicTFs&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>
              <a 
                href="https://www.linkedin.com/in/hajaramulti-care-741270188/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
              <a 
                href="https://wa.me/919897023005" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/export">Export</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-column">
            <h3 className="footer-heading">Our Products</h3>
            <ul className="footer-links footer-products">
              <li><Link to="/products">Herbal Syrups</Link></li>
              <li><Link to="/products">Ayurvedic Capsules & Tablets</Link></li>
              <li><Link to="/products">Herbal Powders (Churna)</Link></li>
              <li><Link to="/products">Health Tonic & Immunity Boosters</Link></li>
              <li><Link to="/products">Liver Tonic & Blood Purifier</Link></li>
              <li><Link to="/products">Women's Health Products</Link></li>
              <li><Link to="/products">Men's Health Products</Link></li>
              <li><Link to="/products">Herbal Cosmetics & Personal Care</Link></li>
              <li><Link to="/products">Ayurvedic Oils</Link></li>
              <li><Link to="/products">Herbal Toothpaste & Oral Care</Link></li>
              <li><Link to="/products">Skin Care Products</Link></li>
              <li><Link to="/products">Hair Care Products</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-column">
            <h3 className="footer-heading">Contact Information</h3>
            <ul className="footer-contact">
              <li>
                <div className="contact-icon">
                  <FiMapPin />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Address</span>
                  <span className="contact-value">F-231, Sec-1, Tala Nagari, Ramghat Road, UPSIDC, Aligarh-202001, Uttar Pradesh, India</span>
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <FiPhone />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+91 98970 23005</span>
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <FiMail />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">hajaramulticare17@gmail.com</span>
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <FiGlobe />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Business Type</span>
                  <div className="business-types">
                    <span className="business-type-tag">Manufacturer</span>
                    <span className="business-type-tag">Exporter</span>
                    <span className="business-type-tag">Private Label Manufacturer</span>
                    <span className="business-type-tag">Third Party Manufacturer</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} HAJARA MULTICARE. All Rights Reserved.
          </p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
