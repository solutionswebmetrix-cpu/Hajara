import { motion } from 'framer-motion';
import { FiStar, FiAward, FiHeart, FiGlobe } from 'react-icons/fi';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Dr. Rajesh Kumar',
    company: 'HealthCare Global',
    country: 'India',
    rating: 5,
    text: 'Exceptional quality products! Our patients have shown remarkable improvement using HAJARA\'s Ayurvedic medicines.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop'
  },
  {
    name: 'Sarah Johnson',
    company: 'NaturalWellness Inc.',
    country: 'USA',
    rating: 5,
    text: 'The best Ayurvedic products we\'ve sourced. Consistent quality and reliable delivery every time.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  },
  {
    name: 'Ahmed Al-Mansoori',
    company: 'Dubai Herbals',
    country: 'UAE',
    rating: 5,
    text: 'Premium quality products that our customers love. HAJARA has been our trusted partner for 5 years.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
  }
];

const Testimonials = () => {
  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Trusted by healthcare professionals and businesses worldwide
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
            >
              <div className="testimonial-quote"><FiAward /></div>
              <div className="testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} />
                ))}
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-company">{testimonial.company}</p>
                  <div className="author-location">
                    <FiGlobe /> {testimonial.country}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
