import { motion } from 'framer-motion';
import { FiAward, FiPackage, FiGlobe, FiStar, FiHeart, FiCheckCircle } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import './Statistics.css';

const AnimatedCounter = ({ from, to, suffix = '' }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = from;
    const duration = 2000;
    const increment = (to - from) / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [from, to]);

  return <span>{count}{suffix}</span>;
};

const Statistics = () => {
  const stats = [
    { icon: <FiAward />, value: 25, suffix: '+', label: 'Years Experience' },
    { icon: <FiPackage />, value: 300, suffix: '+', label: 'Premium Products' },
    { icon: <FiStar />, value: 500, suffix: '+', label: 'Dealers & Partners' },
    { icon: <FiGlobe />, value: 20, suffix: '+', label: 'Countries Served' },
    { icon: <FiHeart />, value: 50000, suffix: '+', label: 'Happy Customers' }
  ];

  return (
    <section className="section statistics">
      <div className="stats-background">
        <img
          src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=1920&h=1080&fit=crop"
          alt="Factory Background"
        />
        <div className="stats-overlay"></div>
      </div>
      <div className="stats-container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">
                <AnimatedCounter from={0} to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
