import { FiStar, FiUser } from 'react-icons/fi';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { reviews } from '../data/reviews';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section className="section testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="section-header">
          <span className="section-subhead">Customer Reviews</span>
          <h2 className="section-title" id="testimonials-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Trusted by clients and business partners for quality Ayurvedic products and reliable service.
          </p>
        </div>

        <Swiper
          className="testimonials-slider"
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          speed={650}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 }
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <article className="testimonial-card">
                <div className="testimonial-stars" role="img" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }, (_, index) => <FiStar key={index} aria-hidden="true" />)}
                </div>
                <p className={`testimonial-text${review.verifiedPurchase ? ' testimonial-text-verified' : ''}`}>
                  {review.reviewText}
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar" aria-hidden="true"><FiUser /></div>
                  <div>
                    <h3 className="author-name">{review.name}</h3>
                    {review.detail && <p className="author-detail">{review.detail}</p>}
                  </div>
                </div>
                {review.verifiedPurchase && (
                  <div className="testimonial-review-meta">
                    <span className="verified-purchase">Verified Purchase</span>
                    <time dateTime={review.date}>21 November 2025</time>
                  </div>
                )}
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
