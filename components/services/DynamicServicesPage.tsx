import Link from "next/link";
import type { GalleryCategory, GalleryItem } from "@prisma/client";
import { GalleryCategoryBlock } from "./GalleryCategoryBlock";
import ServicesExtras from "./ServicesExtras";

type CategoryWithItems = GalleryCategory & { items: GalleryItem[] };

export default function DynamicServicesPage({
  barbershopCategories,
  salonCategories,
}: {
  barbershopCategories: CategoryWithItems[];
  salonCategories: CategoryWithItems[];
}) {
  return (
    <>
      <main>
        <section className="page-hero">
          <div className="container">
            <span className="section__label reveal reveal--fade-up">What We Offer</span>
            <h1 className="page-hero__title reveal reveal--fade-up">Our Services</h1>
            <p className="page-hero__desc reveal reveal--fade-up">
              Two distinct experiences under one roof — premium barbershop grooming and luxury salon beauty.
            </p>
          </div>
        </section>

        <section className="section section--white services-page">
          <div className="container">
            <div className="service-tabs reveal reveal--fade-up">
              <button className="service-tabs__btn service-tabs__btn--active" type="button" data-service-tab="barbershop">
                Barbershop
              </button>
              <button className="service-tabs__btn" type="button" data-service-tab="salon">
                Salon
              </button>
            </div>

            <div className="service-panel service-panel--active" id="barbershop-panel" data-service-panel="barbershop">
              <div className="price-list-actions price-list-actions--barber">
                <button className="price-list-btn price-list-btn--barber" type="button" data-price-open="barber" aria-label="View barbershop price list">
                  <span className="price-list-btn__icon">✂</span> View Price List
                </button>
                <button className="price-list-switch-btn" type="button" data-service-tab="salon">
                  Salon
                </button>
              </div>

              <header className="service-panel__header reveal reveal--fade-up">
                <span className="section__label">The Barbershop</span>
                <h2 className="section__title section__title--luxury">Precision Grooming for Him &amp; Her</h2>
                <p className="section__desc">Expert cuts, shaves, and styling in a refined barbershop atmosphere.</p>
              </header>

              {barbershopCategories.map((category) => (
                <GalleryCategoryBlock
                  key={category.id}
                  title={category.name}
                  layout={category.layout}
                  items={category.items}
                />
              ))}

              <div className="service-category reveal reveal--fade-up">
                <h3 className="service-category__title">Other Barber Services</h3>
                <div className="service-info-grid">
                  <div className="service-info-card">
                    <h4 className="service-info-card__title">Lining &amp; Finishing</h4>
                    <ul className="service-info-list">
                      <li><span>Lining Only</span><strong>K40</strong></li>
                      <li><span>Lining and Dye</span><strong>K70</strong></li>
                    </ul>
                  </div>
                  <div className="service-info-card">
                    <h4 className="service-info-card__title">Treatments &amp; Styling</h4>
                    <ul className="service-info-list">
                      <li><span>S Curl</span><strong>K200</strong></li>
                      <li><span>Magic Powder</span><strong>K150</strong></li>
                      <li><span>Facial Scrub</span><strong>K150</strong></li>
                      <li><span>Neck Massage</span><strong>K150</strong></li>
                    </ul>
                  </div>
                  <div className="service-info-card">
                    <h4 className="service-info-card__title">Colour Combos</h4>
                    <ul className="service-info-list">
                      <li><span>Haircut + Magic Powder</span><strong>K230</strong></li>
                      <li><span>Haircut + Black Dye</span><strong>K180</strong></li>
                      <li><span>Haircut + Blonde Dye</span><strong>K300</strong></li>
                      <li><span>Children Haircut + Black Dye</span><strong>K150</strong></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="section__cta reveal reveal--fade-up">
                <Link href="/book" className="btn btn--primary btn--glow">Book Barbershop</Link>
              </div>
            </div>

            <div className="service-panel" id="salon-panel" data-service-panel="salon" hidden>
              <div className="price-list-actions price-list-actions--salon">
                <button className="price-list-btn price-list-btn--salon" type="button" data-price-open="salon" aria-label="View salon price list">
                  <span className="price-list-btn__icon">✨</span> View Price List
                </button>
                <button className="price-list-switch-btn" type="button" data-service-tab="barbershop">
                  Barbershop
                </button>
              </div>

              <header className="service-panel__header reveal reveal--fade-up">
                <span className="section__label">The Salon</span>
                <h2 className="section__title section__title--luxury">Beauty, Braids &amp; Beyond</h2>
                <p className="section__desc">From intricate braids to flawless nails — your complete beauty destination.</p>
              </header>

              {salonCategories.map((category) => (
                <GalleryCategoryBlock
                  key={category.id}
                  title={category.name}
                  layout={category.layout}
                  items={category.items}
                />
              ))}

              <div className="section__cta reveal reveal--fade-up">
                <Link href="/book" className="btn btn--primary btn--glow">Book Salon</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ServicesExtras />
    </>
  );
}
