import HomeHero from "@/components/HomeHero";

export default function HomePage() {
  return (
    <>
      <main>
        <HomeHero />
        
            <section className="section section--luxury-gradient">
              <div className="container">
                <header className="section__header reveal reveal--fade-up">
                  <span className="section__label">Welcome</span>
                  <h2 className="section__title">Your Premium Grooming Destination</h2>
                  <p className="section__desc">At Grooming Lounge, expert barbers and salon stylists deliver flawless cuts, intricate braids, and a relaxing atmosphere designed for the modern client.</p>
                </header>
        
                <div className="features__grid">
                  <article className="feature-card reveal reveal--fade-left">
                    <div className="feature-card__icon">✂</div>
                    <h3>Expert Barbers</h3>
                    <p>Master craftsmen with an eye for detail and international standards.</p>
                  </article>
                  <article className="feature-card reveal reveal--fade-up">
                    <div className="feature-card__icon">💅</div>
                    <h3>Luxury Salon</h3>
                    <p>Braids, nails, makeup, and beauty services in a serene premium space.</p>
                  </article>
                  <article className="feature-card reveal reveal--fade-right">
                    <div className="feature-card__icon">◆</div>
                    <h3>Instant Booking</h3>
                    <p>Reserve online and confirm your appointment via WhatsApp in seconds.</p>
                  </article>
                </div>
        
                <div className="stats-bar reveal reveal--zoom">
                  <div className="stats-bar__item">
                    <strong className="counter" data-target="5">0</strong><span>Years Experience</span>
                  </div>
                  <div className="stats-bar__item">
                    <strong className="counter" data-target="2000">0</strong><span>Happy Clients</span>
                  </div>
                  <div className="stats-bar__item">
                    <strong className="counter" data-target="4">0</strong><span>Expert Barbers</span>
                  </div>
                </div>
              </div>
            </section>
        
            <section className="section section--luxury-gradient section--cta">
              <div className="container cta-banner reveal reveal--fade-up">
                <div className="cta-banner__inner">
                  <div className="cta-banner__text">
                    <h2>Ready for a fresh look?</h2>
                    <p>Reserve your spot today and experience world-class grooming in Lusaka.</p>
                  </div>
                  <div className="cta-banner__actions">
                    <a href="/book" className="btn btn--primary btn--glow">Book Now</a>
                    <a href="/contact" className="btn btn--outline">Contact Us</a>
                  </div>
                </div>
              </div>
            </section>
      </main>

    </>
  );
}
