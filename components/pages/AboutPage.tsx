import type { AboutImagesState } from "@/lib/about-images";
import { getAboutImageUrl } from "@/lib/about-images";
import { OptimizedPicture } from "@/components/OptimizedImage";

const ABOUT_IMAGE_SIZES = "(max-width: 768px) 100vw, 50vw";
const BRANCH_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px";

export default function AboutPage({ images }: { images: AboutImagesState }) {
  return (
    <>
      <main>
        <section className="page-hero page-hero--animated">
              <div className="about-hero-deco" aria-hidden="true">
                <span className="about-float about-float--scissors">✂</span>
                <span className="about-float about-float--comb">🪮</span>
                <span className="about-float about-float--dryer">💨</span>
                <span className="about-float about-float--sparkle">✨</span>
                <span className="about-pole"></span>
              </div>
              <div className="container">
                <span className="section__label reveal reveal--fade-up">Our Story</span>
                <h1 className="page-hero__title reveal reveal--fade-up">About Grooming Lounge</h1>
                <p className="page-hero__desc reveal reveal--fade-up">Where classic barbering meets modern luxury in the heart of Lusaka.</p>
              </div>
            </section>
        
            <section className="section section--luxury-gradient about-section">
              <div className="container about__inner">
                <div className="about__image reveal reveal--fade-left">
                  <div className="about__image-stack">
                    <div className="about__image-frame">
                      <OptimizedPicture
                        src={getAboutImageUrl(images, "story_primary")}
                        alt="Grooming Lounge barbershop and salon interior"
                        width={800}
                        height={600}
                        sizes={ABOUT_IMAGE_SIZES}
                        className="about__story-image"
                        loading="lazy"
                      />
                      <span className="about__image-accent" aria-hidden="true">✂</span>
                    </div>
                    <div className="about__image-frame about__image-frame--secondary">
                      <OptimizedPicture
                        src={getAboutImageUrl(images, "story_secondary")}
                        alt="Grooming Lounge premium atmosphere"
                        width={800}
                        height={500}
                        sizes={ABOUT_IMAGE_SIZES}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="about__float-icons" aria-hidden="true">
                    <span className="about-mini-icon about-mini-icon--1">✂</span>
                    <span className="about-mini-icon about-mini-icon--2">💅</span>
                    <span className="about-mini-icon about-mini-icon--3">✨</span>
                  </div>
                </div>
                <div className="about__content reveal reveal--fade-right">
                  <h2 className="about__heading section__title--luxury">Redefining the Grooming Experience</h2>
                  <p className="about__text">Grooming Lounge was founded with a simple vision: every client deserves a grooming experience that feels as good as it looks. With two convenient locations in Lusaka — Munaro Plaza and Ibex Hub — we have built bright, welcoming spaces that are unmistakably premium.</p>
                  <p className="about__text">Our team of skilled barbers and salon stylists brings years of experience and a passion for precision. From classic cuts to intricate braids, we take the time to understand your preferences and deliver results that exceed expectations.</p>
                  <p className="about__text">We believe grooming is more than a service — it is a ritual of self-care and confidence. Every visit is designed to leave you looking sharp and feeling refreshed.</p>
        
                  <div className="about__icons reveal reveal--fade-up">
                    <span className="about-icon" title="Barbering">✂</span>
                    <span className="about-icon" title="Styling">🪮</span>
                    <span className="about-icon" title="Beauty">💅</span>
                    <span className="about-icon" title="Grooming">🪒</span>
                    <span className="about-icon" title="Luxury">✨</span>
                  </div>
        
                  <ul className="about__stats">
                    <li>
                      <strong className="counter" data-target="5">0</strong>
                      <span>Years Experience</span>
                    </li>
                    <li>
                      <strong className="counter" data-target="2000">0</strong>
                      <span>Happy Clients</span>
                    </li>
                    <li>
                      <strong className="counter" data-target="4">0</strong>
                      <span>Expert Barbers</span>
                    </li>
                  </ul>
        
                  <a href="/book" className="btn btn--primary btn--glow">Book Your Visit</a>
                </div>
              </div>
            </section>
        
            <section className="section section--white branches-section">
              <div className="container">
                <header className="branches__header reveal reveal--fade-up">
                  <span className="section__label">Our Branches</span>
                  <h2 className="section__title section__title--luxury">Visit Our Locations</h2>
                  <p className="branches__tagline">Two Locations. One Premium Grooming Experience.</p>
                </header>
        
                <div className="branches__grid">
                  <article className="branch-card reveal reveal--fade-up">
                    <div className="branch-card__image">
                      <OptimizedPicture
                        src={getAboutImageUrl(images, "branch_munaro")}
                        alt="Grooming Lounge Munaro branch exterior"
                        width={800}
                        height={520}
                        sizes={BRANCH_IMAGE_SIZES}
                        loading="lazy"
                      />
                    </div>
                    <div className="branch-card__body">
                      <h3 className="branch-card__title">Munaro Branch</h3>
                      <p className="branch-card__address">Munaro Plaza, Lusaka, Zambia</p>
                      <h4 className="branch-card__subtitle">Services Available</h4>
                      <ul className="branch-card__list">
                        <li>Barbershop Only</li>
                        <li>Haircuts</li>
                        <li>Beard Grooming</li>
                        <li>Hair Styling</li>
                        <li>Professional Men's Grooming</li>
                      </ul>
                      <div className="branch-card__map contact__map-frame">
                        <iframe
                          title="Grooming Lounge on Google Maps"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.537077318991!2d28.39199927488939!3d-15.401537285185254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19408fda2f84e069%3A0x1be1c395c17ab40c!2sGrooming%20Lounge!5e0!3m2!1sen!2szm!4v1783462743184!5m2!1sen!2szm"
                          width="100%"
                          height="320"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin">
                        </iframe>
                      </div>
                    </div>
                  </article>
        
                  <article className="branch-card branch-card--ibex reveal reveal--fade-up">
                    <div className="branch-card__image">
                      <OptimizedPicture
                        src={getAboutImageUrl(images, "branch_ibex")}
                        alt="Grooming Lounge Ibex Hub branch exterior"
                        width={800}
                        height={520}
                        sizes={BRANCH_IMAGE_SIZES}
                        loading="lazy"
                      />
                    </div>
                    <div className="branch-card__body">
                      <p className="branch-card__brand">Grooming Lounge Barbershop &amp; Salon</p>
                      <h3 className="branch-card__title">Ibex Hub Branch</h3>
                      <p className="branch-card__address">Lusaka, Zambia</p>
                      <p className="branch-card__highlight">Conveniently located next to Choppies Supermarket, making it easy for customers to find.</p>
                      <h4 className="branch-card__subtitle">Services Available</h4>
                      <ul className="branch-card__list branch-card__list--grid">
                        <li>Hair Cutting</li>
                        <li>Caucasian Haircuts</li>
                        <li>Hair Treatment</li>
                        <li>Hairdressing</li>
                        <li>Eye Lash Installation</li>
                        <li>Makeup</li>
                        <li>Nails</li>
                        <li>Pedicure / Manicure</li>
                      </ul>
                      <div className="branch-card__map contact__map-frame">
                        <iframe
                          title="Grooming Lounge Ibex Hub branch on Google Maps"
                          src="https://maps.google.com/maps?q=Ibex+Hub,+Ibex+Hill,+Lusaka,+Zambia&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                          width="100%"
                          height="320"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>
      </main>

    </>
  );
}
