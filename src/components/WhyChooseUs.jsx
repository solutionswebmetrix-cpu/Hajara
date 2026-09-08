import { motion } from 'framer-motion';
import { FiAward, FiGlobe, FiHeart, FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';
import './WhyChooseUs.css';

const features = [
  {
    icon: <FiAward />,
    title: 'Trusted Ayurvedic Manufacturer',
    description: 'Reliable and reputable Ayurvedic products manufacturer with 25+ years of experience'
  },
  {
    icon: <FiGlobe />,
    title: '25 Years Experience',
    description: 'Over two and a half decades of expertise in Ayurvedic healthcare and wellness'
  },
  {
    icon: <FiHeart />,
    title: 'Export Quality Products',
    description: 'Products meet international standards and are exported globally'
  },
  {
    icon: <FiPackage />,
    title: 'Flexible MOQ',
    description: 'Minimum order quantity options tailored to your business needs'
  },
  {
    icon: <FiTruck />,
    title: 'Fast Production',
    description: 'Quick turnaround times for orders without compromising on quality'
  },
  {
    icon: <FiPackage />,
    title: 'Attractive Packaging',
    description: 'Premium, eye-catching packaging that enhances product appeal'
  },
  {
    icon: <FiHeart />,
    title: 'Customer Satisfaction',
    description: 'Committed to delivering exceptional products and customer service'
  },
  {
    icon: <FiCheckCircle />,
    title: 'Easy to Reach',
    description: 'Accessible and responsive support team ready to assist you'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="section why-choose-us" id="why-us">
      <div className="why-container">
        <div className="section-header">
          <span className="section-subhead">Why Choose Us</span>
          <h2 className="section-title">Excellence in Every Product</h2>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
