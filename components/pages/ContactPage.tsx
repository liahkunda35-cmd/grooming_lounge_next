const CONTACT_HERO_IMAGE = "/Screenshot_20260613_150540_Lite.jpg";

export default function ContactPage() {
  return (
    <>
      <main>
        <section className="page-hero page-hero--animated">
              <div className="about-hero-deco" aria-hidden="true">
                <span className="about-float about-float--scissors">✂</span>
                <span className="about-float about-float--sparkle">✨</span>
              </div>
              <div className="container">
                <span className="section__label reveal reveal--fade-up">Get in Touch</span>
                <h1 className="page-hero__title reveal reveal--fade-up">Contact Us</h1>
                <p className="page-hero__desc reveal reveal--fade-up">Visit us at Munaro Plaza or Ibex Hub — we are always happy to help.</p>
              </div>
            </section>
        
            <section className="section section--luxury-gradient">
              <div className="container">
                <div className="contact__grid">
                  <div className="contact__cards">
                    <article className="contact-card contact-card--accent reveal reveal--fade-left">
                      <div className="contact-card__icon contact-card__icon--pin" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                      </div>
                      <h3>Locations</h3>
                      <p><strong>Branch 1</strong><br />Grooming Lounge Barbershop<br />Munaro Plaza<br />Lusaka, Zambia</p>
                      <p><strong>Branch 2</strong><br />Grooming Lounge Barbershop &amp; Salon<br />Ibex Hub<br />Lusaka, Zambia</p>
                    </article>
        
                    <article className="contact-card contact-card--accent reveal reveal--fade-up">
                      <div className="contact-card__icon">📞</div>
                      <h3>Phone</h3>
                      <p><a href="tel:+260761000376">0761000376</a></p>
                    </article>
        
                    <article className="contact-card contact-card--accent reveal reveal--fade-up">
                      <div className="contact-card__icon">✉</div>
                      <h3>Email</h3>
                      <p><a href="mailto:groominglounge44@gmail.com">groominglounge44@gmail.com</a></p>
                    </article>
        
                    <article className="contact-card contact-card--accent reveal reveal--fade-right">
                      <div className="contact-card__icon">🕐</div>
                      <h3>Opening Hours</h3>
                      <p>Open 7 days a week<br /><strong className="contact-card__highlight">08:00 — 19:30</strong></p>
                    </article>
                  </div>
        
                  <div className="contact__map reveal reveal--fade-right">
                    <div className="contact__map-card">
                      <div
                        className="contact__hero-image"
                        style={{ backgroundImage: `url("${CONTACT_HERO_IMAGE}")` }}
                      >
                        <img
                          className="contact__hero-photo"
                          src={CONTACT_HERO_IMAGE}
                          alt="Grooming Lounge modern salon and barbershop interior"
                          decoding="async"
                          loading="lazy"
                        />
                        <div className="contact__hero-overlay">
                          <span className="contact__hero-label">Premium Grooming Space</span>
                        </div>
                      </div>
                      <div className="contact__map-info">
                        <h3>Connect With Us</h3>
                        <p>Feel free to contact us on WhatsApp or through our social media platforms. We're always happy to answer your questions, assist with bookings, and help you plan your next visit to Grooming Lounge.</p>
                        <a href="https://wa.me/260761000376" className="btn btn--primary btn--glow" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
      </main>

    </>
  );
}
