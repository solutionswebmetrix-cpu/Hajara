import { motion } from 'framer-motion';
import { FiAward, FiPackage, FiGlobe, FiStar, FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import './HomeContact.css';

const HomeContact = () => {
  return (
    <section className="section home-contact">
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">Get In Touch</span>
          <h2 className="section-title">Let's Start a Conversation</h2>
          <p className="section-subtitle">
            Reach out to us for inquiries, partnership opportunities, or product information
          </p>
        </div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >


            <div className="contact-cards-grid">
              <div className="contact-card glass-card">
                <div className="contact-icon-wrapper">
                  <FiMapPin />
                </div>
                <h3>Visit Us</h3>
                <p>F-231, Sec-1, Tala Nagari, Ramghat Road [UPSIDC]</p>
                <p>Aligarh 202001 (U.P.), India</p>
              </div>

              <div className="contact-card glass-card">
                <div className="contact-icon-wrapper">
                  <FiPhone />
                </div>
                <h3>Call Us</h3>
                <p>+91 98970 23005</p>
              </div>

              <div className="contact-card glass-card">
                <div className="contact-icon-wrapper">
                  <FiMail />
                </div>
                <h3>Email Us</h3>
                <p>hajaramulticare17@gmail.com</p>
              </div>

              <div className="contact-card glass-card">
                <div className="contact-icon-wrapper">
                  <FiClock />
                </div>
                <h3>Business Hours</h3>
                <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form className="contact-form glass-card">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" placeholder="Enter your email" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="What's this about?" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Tell us about your requirements..."></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
