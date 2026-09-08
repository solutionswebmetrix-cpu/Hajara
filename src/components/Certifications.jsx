import { motion } from 'framer-motion';
import './Certifications.css';
import wellCert from '../assets/Certifications/Well Certified.png';
import isoCert from '../assets/Certifications/ISO Certified.png';
import ayushCert from '../assets/Certifications/AYUSH Licensed.png';

const certifications = [
  { 
    name: 'Well Certified', 
    description: 'Well Manufacturing Practices certification',
    image: wellCert
  },
  { 
    name: 'ISO Certified', 
    description: 'International Organization for Standardization',
    image: isoCert
  },
  { 
    name: 'AYUSH Licensed', 
    description: 'Ayurveda, Yoga & Naturopathy, Unani, Siddha, Homoeopathy',
    image: ayushCert
  }
];

const Certifications = () => {
  return (
    <section className="section certifications">
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">Certifications</span>
          <h2 className="section-title">Trusted Quality Standards</h2>
          <p className="section-subtitle">
            Our products meet the highest international quality and safety standards
          </p>
        </div>

        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="cert-card"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -12, scale: 1.02 }}
            >
              <div className="cert-image">
                <img src={cert.image} alt={cert.name} />
              </div>
              <h3 className="cert-name">{cert.name}</h3>
              <p className="cert-desc">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </section>
  );
};

export default Certifications;
