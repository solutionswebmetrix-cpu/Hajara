import { motion } from 'framer-motion'
import { FiAward, FiGlobe, FiStar, FiPackage, FiCheckCircle, FiDroplet, FiCheck, FiHeart } from 'react-icons/fi'
import './About.css'
import aboutBannerImage from '../assets/about-us/about-us-banner.png'

const About = () => {
  const achievements = [
    { icon: <FiAward />, title: 'Well Certified', desc: 'Quality manufacturing standards' },
    { icon: <FiGlobe />, title: 'Global Exporter', desc: '20+ countries served' },
    { icon: <FiStar />, title: '500+ Dealers', desc: 'Strong distribution network' },
    { icon: <FiPackage />, title: '300+ Products', desc: 'Comprehensive product range' }
  ];

  const values = [
    { icon: <FiDroplet />, title: '100% Natural', desc: 'Pure herbal ingredients sourced directly from nature' },
    { icon: <FiCheck />, title: 'Quality Assured', desc: 'Rigorous testing at every stage of production' },
    { icon: <FiHeart />, title: 'Customer First', desc: 'Dedicated to your wellness and satisfaction' },
    { icon: <FiCheckCircle />, title: 'Authentic Ayurveda', desc: 'Following traditional Ayurvedic principles' }
  ];

  return (
    <div className="about-page">
      <section className="page-header" style={{ backgroundImage: `url(${aboutBannerImage})` }}>
        <div className="page-header-overlay"></div>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="page-title">About Us</motion.h1>
        </div>
      </section>
      
      <section className="section about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2 className="section-title" style={{ textAlign: 'left' }}>Our Story</h2>
              <p className="about-desc">
                Hajara Multi Care was established in 2005 as a cottage industry and now extended for the global market. 
                With a vision to bring authentic Ayurvedic healthcare products to the world, we have grown from a small 
                manufacturing unit to a trusted name in the Ayurvedic industry, known for quality, innovation, and 
                commitment to wellness.
              </p>
              <p className="about-desc">
                Our state-of-the-art manufacturing facility follows strict GMP guidelines, ensuring every product meets international quality standards. 
                We use pure, natural herbs sourced from trusted suppliers, and our formulations are backed by both traditional Ayurvedic knowledge 
                and modern scientific research.
              </p>
              <p className="about-desc">
                Today, we proudly serve customers in over 20 countries, offering a comprehensive range of more than 300 Ayurvedic products. 
                Our mission is to make natural healthcare accessible to everyone, promoting holistic wellness and a healthier lifestyle.
              </p>
            </div>
            <div className="about-image">
              <img src={aboutBannerImage} alt="About Us" />
            </div>
          </div>
        </div>
      </section>

      <section className="section values-section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subhead">Our Core Values</span>
            <h2 className="section-title">What Drives Us</h2>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h4>{value.title}</h4>
                <p>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section achievements-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subhead">Our Achievements</span>
            <h2 className="section-title">Milestones of Excellence</h2>
          </div>
          <div className="achievements-grid">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                className="achievement-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="achievement-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
