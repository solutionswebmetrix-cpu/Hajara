import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Hero.css';
import bannerOne from '../assets/banner/banner 1.png';
import bannerTwo from '../assets/banner/banner 2.png';
import bannerThree from '../assets/banner/banner 3.png';
import bannerFour from '../assets/banner/banner.png';

const Hero = () => {
  const slides = [
    {
      image: bannerOne,
      alt: 'Ayurvedic wellness products from Hajara Multicare',
      eyebrow: 'Quality you can trust',
      title: 'Made with care. Ready for the world.',
      description: 'Our quality-led manufacturing and export experience brings dependable Ayurvedic products to partners worldwide.'
    },
    {
      image: bannerTwo,
      alt: 'Hajara Multicare Ayurvedic product range',
      eyebrow: 'A range for modern wellness',
      title: 'Tradition behind every formulation',
      description: 'Explore a wide portfolio shaped by Ayurvedic knowledge and produced for the needs of today.'
    },
    {
      image: bannerThree,
      alt: 'Hajara Multicare Ayurvedic wellness formulations',
      eyebrow: 'Ayurvedic wellness',
      title: 'Nature-inspired formulations',
      description: 'Thoughtfully developed products combining traditional knowledge with modern manufacturing standards.'
    },
    {
      image: bannerFour,
      alt: 'Hajara Multicare export-ready Ayurvedic products',
      eyebrow: 'Global quality',
      title: 'Ayurvedic products for a global market',
      description: 'Reliable formulations, premium packaging and export-ready products for international partners.'
    }
  ];

  return (
    <section className="hero" aria-label="Hajara Multicare highlights">
      <Swiper
        className="hero-viewport"
        modules={[Autoplay, EffectFade]}
        initialSlide={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        spaceBetween={0}
        loop
        speed={800}
        autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
      >
        {slides.map((slide, index) => {
          const Title = index === 0 ? 'h1' : 'h2';

          return (
            <SwiperSlide
              className={`hero-slide hero-slide-${index + 1}${index === 1 ? ' hero-slide-2' : ''}`}
              key={slide.image}
              style={{ '--hero-banner-image': `url("${slide.image}")` }}
            >
              <div className={`hero-slide-inner${index === 1 ? ' hero-content' : ''}`}>
                <div className="hero-slide-copy">
                  <span className="hero-slide-eyebrow">{slide.eyebrow}</span>
                  <Title className="hero-title">{slide.title}</Title>
                  <p className="hero-description">{slide.description}</p>
                  <div className="hero-buttons">
                    <Link to="/products" className="btn btn-primary">
                      Explore Products
                      <FiArrowRight aria-hidden="true" />
                    </Link>
                    <Link to="/contact" className="btn btn-gold">
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Hero;
