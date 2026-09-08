import { motion } from 'framer-motion';
import { 
  FiPackage, 
  FiTruck, 
  FiBox, 
  FiGift, 
  FiFileText, 
  FiCheckSquare, 
  FiFile, 
  FiClipboard 
} from 'react-icons/fi';
import './ExportCapabilities.css';

const capabilities = [
  {
    icon: <FiPackage />,
    title: 'Private Label Manufacturing',
    description: 'Customize products with your brand name and packaging'
  },
  {
    icon: <FiTruck />,
    title: 'Third Party Manufacturing',
    description: 'Contract manufacturing for your brand requirements'
  },
  {
    icon: <FiBox />,
    title: 'Bulk Supply',
    description: 'Large quantity orders for distributors and wholesalers'
  },
  {
    icon: <FiGift />,
    title: 'Custom Packaging',
    description: 'Premium and customized packaging solutions'
  },
  {
    icon: <FiFileText />,
    title: 'Export Documentation Support',
    description: 'Complete assistance with export-related documentation'
  },
  {
    icon: <FiCheckSquare />,
    title: 'COA Available',
    description: 'Certificate of Analysis provided for all products'
  },
  {
    icon: <FiFile />,
    title: 'MSDS Available',
    description: 'Material Safety Data Sheet for all products'
  },
  {
    icon: <FiClipboard />,
    title: 'Specification Sheet Available',
    description: 'Detailed product specification sheets'
  }
];

const ExportCapabilities = () => {
  return (
    <section className="section export-capabilities">
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">Export Capabilities</span>
          <h2 className="section-title">Our Manufacturing & Export Services</h2>
        </div>

        <div className="capabilities-grid">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              className="capability-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="capability-icon">{capability.icon}</div>
              <h3 className="capability-title">{capability.title}</h3>
              <p className="capability-desc">{capability.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExportCapabilities;
