import { motion } from 'framer-motion';
import { 
  FiAward, 
  FiGlobe, 
  FiPackage, 
  FiTruck, 
  FiGift, 
  FiDollarSign, 
  FiCode, 
  FiMapPin 
} from 'react-icons/fi';
import './OurStrengths.css';

const strengths = [
  {
    icon: <FiAward />,
    title: '25+ Years Manufacturing Experience',
    description: 'Over two decades of expertise in Ayurvedic product manufacturing'
  },
  {
    icon: <FiGlobe />,
    title: 'Export Quality Formulations',
    description: 'Products that meet international quality and safety standards'
  },
  {
    icon: <FiPackage />,
    title: 'Private Label Manufacturing',
    description: 'Build your own brand with our private labeling services'
  },
  {
    icon: <FiTruck />,
    title: 'Bulk Production Capacity',
    description: 'Large-scale manufacturing to meet your volume requirements'
  },
  {
    icon: <FiGift />,
    title: 'Premium Packaging Options',
    description: 'Attractive and premium packaging for your products'
  },
  {
    icon: <FiDollarSign />,
    title: 'Competitive Pricing',
    description: 'Affordable prices without compromising on quality'
  },
  {
    icon: <FiCode />,
    title: 'Custom Formula Development',
    description: 'Develop custom formulations tailored to your needs'
  },
  {
    icon: <FiMapPin />,
    title: 'Global Supply Capability',
    description: 'Supply products to customers worldwide'
  }
];

const OurStrengths = () => {
  return (
    <section className="section our-strengths">
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">Our Strengths</span>
          <h2 className="section-title">Why Partner With Us</h2>
        </div>

        <div className="strengths-grid">
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              className="strength-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="strength-icon">{strength.icon}</div>
              <h3 className="strength-title">{strength.title}</h3>
              <p className="strength-desc">{strength.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStrengths;
