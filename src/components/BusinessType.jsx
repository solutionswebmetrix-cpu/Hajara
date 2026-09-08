import { motion } from 'framer-motion';
import './BusinessType.css';

const businessTypes = [
  'Manufacturer',
  'Exporter',
  'Private Label Manufacturer',
  'Third Party Manufacturer',
  'Brand Owner'
];

const BusinessType = () => {
  return (
    <section className="section business-type">
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">Focused Business Type</span>
          <h2 className="section-title">What We Do</h2>
        </div>

        <div className="business-grid">
          {businessTypes.map((type, index) => (
            <motion.div
              key={index}
              className="business-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {type}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessType;
