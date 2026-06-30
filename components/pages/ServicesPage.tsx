export default function ServicesPage() {
  return (
    <>
      <main>
        <section className="page-hero">
              <div className="container">
                <span className="section__label reveal reveal--fade-up">What We Offer</span>
                <h1 className="page-hero__title reveal reveal--fade-up">Our Services</h1>
                <p className="page-hero__desc reveal reveal--fade-up">Two distinct experiences under one roof — premium barbershop grooming and luxury salon beauty.</p>
              </div>
            </section>
        
            <section className="section section--white services-page">
              <div className="container">
        
                <div className="service-tabs reveal reveal--fade-up">
                  <button className="service-tabs__btn service-tabs__btn--active" type="button" data-service-tab="barbershop">Barbershop</button>
                  <button className="service-tabs__btn" type="button" data-service-tab="salon">Salon</button>
                </div>
        
                
                <div className="service-panel service-panel--active" id="barbershop-panel" data-service-panel="barbershop">
                  <div className="price-list-actions price-list-actions--barber">
                    <button className="price-list-btn price-list-btn--barber" type="button" data-price-open="barber" aria-label="View barbershop price list">
                      <span className="price-list-btn__icon">✂</span> View Price List
                    </button>
                    <button className="price-list-switch-btn" type="button" data-service-tab="salon">Salon</button>
                  </div>
        
                  <header className="service-panel__header reveal reveal--fade-up">
                    <span className="section__label">The Barbershop</span>
                    <h2 className="section__title section__title--luxury">Precision Grooming for Him &amp; Her</h2>
                    <p className="section__desc">Expert cuts, shaves, and styling in a refined barbershop atmosphere.</p>
                  </header>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Adult Haircuts</h3>
                    <div className="category-gallery">
                      <button className="gallery__item" type="button" data-lightbox="/haircut.jpeg" data-caption="Adult Haircut">
                        <img src="/haircut.jpeg" alt="Adult haircut" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span>
                        <span className="gallery__overlay"><span className="gallery__caption">Classic Cut</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/haircut2.jpeg" data-caption="Adult Haircut">
                        <img src="/haircut2.jpeg" alt="Adult haircut style" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span>
                        <span className="gallery__overlay"><span className="gallery__caption">Styled Cut</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/haircut.png" data-caption="Adult Haircut">
                        <img src="/haircut.png" alt="Premium adult haircut" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span>
                        <span className="gallery__overlay"><span className="gallery__caption">Premium Cut</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/haircut7.jpg" data-caption="Adult Haircut">
                        <img src="/haircut7.jpg" alt="Adult haircut fade" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__inspo-badge" aria-hidden="true">INSPO</span>
                        <span className="gallery__overlay"><span className="gallery__caption">Clean Fade</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/haircut10.jpg" data-caption="Adult Haircut">
                        <img src="/haircut10.jpg" alt="Adult haircut style" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__inspo-badge" aria-hidden="true">INSPO</span>
                        <span className="gallery__overlay"><span className="gallery__caption">Sharp Look</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/haircut25.jpg" data-caption="Adult Haircut">
                        <img src="/haircut25.jpg" alt="Adult haircut" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__inspo-badge" aria-hidden="true">INSPO</span>
                        <span className="gallery__overlay"><span className="gallery__caption">Modern Cut</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/caucasian.jpg" data-caption="Caucasian Haircut">
                        <img src="/caucasian.jpg" alt="Caucasian haircut" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__overlay"><span className="gallery__caption">Caucasian Cut</span></span>
                      </button>
                    </div>
                  </div>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Kids Haircuts</h3>
                    <div className="category-gallery">
                      <button className="gallery__item" type="button" data-lightbox="/kidcut.jpeg" data-caption="Kids Haircut">
                        <img src="/kidcut.jpeg" alt="Kids haircut" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span>
                        <span className="gallery__overlay"><span className="gallery__caption">Kids Cut</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/kidcut11.jpg" data-caption="Kids Haircut">
                        <img src="/kidcut11.jpg" alt="Kids haircut style" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__inspo-badge" aria-hidden="true">INSPO</span>
                        <span className="gallery__overlay"><span className="gallery__caption">Young Gentleman</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/kidcut12.jpg" data-caption="Kids Haircut">
                        <img src="/kidcut12.jpg" alt="Kids haircut" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__overlay"><span className="gallery__caption">Kids Style</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/kidcut13.jpg" data-caption="Kids Haircut">
                        <img src="/kidcut13.jpg" alt="Kids haircut fade" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span>
                        <span className="gallery__overlay"><span className="gallery__caption">Kids Fade</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/kidcut20.jpeg" data-caption="Kids Haircut">
                        <img src="/kidcut20.jpeg" alt="Kids haircut" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span>
                        <span className="gallery__overlay"><span className="gallery__caption">Fresh Cut</span></span>
                      </button>
                    </div>
                  </div>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Women's Cuts</h3>
                    <div className="category-gallery">
                      <button className="gallery__item" type="button" data-lightbox="/womancut1.jpg" data-caption="Women's Cut">
                        <img src="/womancut1.jpg" alt="Women's haircut" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__inspo-badge" aria-hidden="true">INSPO</span>
                        <span className="gallery__overlay"><span className="gallery__caption">Women's Style</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/womancut2.jpg" data-caption="Women's Cut">
                        <img src="/womancut2.jpg" alt="Women's haircut" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__inspo-badge" aria-hidden="true">INSPO</span>
                        <span className="gallery__overlay"><span className="gallery__caption">Elegant Cut</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/womancut4.jpg" data-caption="Women's Cut">
                        <img src="/womancut4.jpg" alt="Women's haircut" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__inspo-badge" aria-hidden="true">INSPO</span>
                        <span className="gallery__overlay"><span className="gallery__caption">Chic Style</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/womancut5.jpg" data-caption="Women's Cut">
                        <img src="/womancut5.jpg" alt="Women's haircut" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__inspo-badge" aria-hidden="true">INSPO</span>
                        <span className="gallery__overlay"><span className="gallery__caption">Precision Cut</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/womancut22.jpg" data-caption="Women's Cut">
                        <img src="/womancut22.jpg" alt="Women's haircut" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__inspo-badge" aria-hidden="true">INSPO</span>
                        <span className="gallery__overlay"><span className="gallery__caption">Women's Cut</span></span>
                      </button>
                    </div>
                  </div>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Beard Trims &amp; Shaving</h3>
                    <div className="category-gallery category-gallery--static">
                      <button className="gallery__item" type="button" data-lightbox="/bearedtrim.jpg" data-caption="Beard Trim &amp; Shape">
                        <img src="/bearedtrim.jpg" alt="Beard trim and shape" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__inspo-badge" aria-hidden="true">INSPO</span>
                        <span className="gallery__overlay"><span className="gallery__caption">Beard Trim</span></span>
                      </button>
                      <button className="gallery__item" type="button" data-lightbox="/cutandbeardtrim.jpg" data-caption="Cut &amp; Beard Trim">
                        <img src="/cutandbeardtrim.jpg" alt="Haircut and beard trim" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__inspo-badge" aria-hidden="true">INSPO</span>
                        <span className="gallery__overlay"><span className="gallery__caption">Cut &amp; Beard</span></span>
                      </button>
                    </div>
                  </div>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Hair Coloring</h3>
                    <div className="category-gallery category-gallery--single">
                      <button className="gallery__item" type="button" data-lightbox="/1781356260197.jpg" data-caption="Hair Coloring">
                        <img src="/1781356260197.jpg" alt="Hair coloring style" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__overlay"><span className="gallery__caption">Colour Style</span></span>
                      </button>
                    </div>
                  </div>
        
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
                    <a href="/book" className="btn btn--primary btn--glow">Book Barbershop</a>
                  </div>
                </div>
        
                
                <div className="service-panel" id="salon-panel" data-service-panel="salon" hidden={true}>
                  <div className="price-list-actions price-list-actions--salon">
                    <button className="price-list-btn price-list-btn--salon" type="button" data-price-open="salon" aria-label="View salon price list">
                      <span className="price-list-btn__icon">✨</span> View Price List
                    </button>
                    <button className="price-list-switch-btn" type="button" data-service-tab="barbershop">Barbershop</button>
                  </div>
        
                  <header className="service-panel__header reveal reveal--fade-up">
                    <span className="section__label">The Salon</span>
                    <h2 className="section__title section__title--luxury">Beauty, Braids &amp; Beyond</h2>
                    <p className="section__desc">From intricate braids to flawless nails — your complete beauty destination.</p>
                  </header>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Braids</h3>
                    <div className="category-gallery">
                      <button className="gallery__item" type="button" data-lightbox="/braids2.jpeg" data-caption="Boho Braids"><img src="/braids2.jpeg" alt="Boho braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Boho Braids</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/braids.jpeg" data-caption="Fulani Braids"><img src="/braids.jpeg" alt="Fulani braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Fulani Braids</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/braids3.jpeg" data-caption="Cornrow Braids"><img src="/braids3.jpeg" alt="Cornrow braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Cornrows</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/mukule.jpeg" data-caption="Cornrows with Natural Hair"><img src="/mukule.jpeg" alt="Cornrows with natural hair" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Mukule</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/braids4.jpeg" data-caption="Copper Boho Braids"><img src="/braids4.jpeg" alt="Copper boho braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Copper Boho</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/braids5.jpeg" data-caption="Short Boho Braids"><img src="/braids5.jpeg" alt="Short boho braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Short Boho</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/braids7.jpeg" data-caption="Knotless Curly Ends"><img src="/braids7.jpeg" alt="Knotless curly ends" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Knotless</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/braids9.jpeg" data-caption="Feed-in Braids"><img src="/braids9.jpeg" alt="Feed-in braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Feed-in</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/braids10.jpeg" data-caption="Classic Box Braids"><img src="/braids10.jpeg" alt="Classic box braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Box Braids</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/fulani2.jpeg" data-caption="Fulani Braids"><img src="/fulani2.jpeg" alt="Fulani braids style" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Fulani</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/fulani.jpeg" data-caption="Fulani Braids"><img src="/fulani.jpeg" alt="Fulani braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Fulani Style</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/stich4.jpeg" data-caption="Stitch Braids"><img src="/stich4.jpeg" alt="Stitch braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Stitch Braids</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/stitchbraids2.jpeg" data-caption="Stitch Braids"><img src="/stitchbraids2.jpeg" alt="Stitch braids style" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Stitch Style</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/stitchbraids.jpeg" data-caption="Stitch Braids"><img src="/stitchbraids.jpeg" alt="Stitch braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Stitch</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/knotless.jpeg" data-caption="Knotless Braids"><img src="/knotless.jpeg" alt="Knotless braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Knotless</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/hairpeace.jpeg" data-caption="Braids with Hair Piece"><img src="/hairpeace.jpeg" alt="Braids with hair piece" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Hair Piece</span></span></button>
                    </div>
                  </div>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Natural Hairstyles</h3>
                    <div className="category-gallery">
                      <button className="gallery__item" type="button" data-lightbox="/twist.jpeg" data-caption="Natural Twist"><img src="/twist.jpeg" alt="Natural twist" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Natural Twist</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/naturaltwist.jpeg" data-caption="Natural Twist"><img src="/naturaltwist.jpeg" alt="Natural twist style" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Twist Out</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/gelponytail.jpeg" data-caption="Gel Ponytail"><img src="/gelponytail.jpeg" alt="Gel ponytail" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Gel Ponytail</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/ponytailx.jpg" data-caption="Ponytail"><img src="/ponytailx.jpg" alt="Ponytail hairstyle" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__overlay"><span className="gallery__caption">Ponytail</span></span></button>
                    </div>
                  </div>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Kids Hairstyles</h3>
                    <div className="category-gallery">
                      <button className="gallery__item" type="button" data-lightbox="/kidhairstyle.jpeg" data-caption="Kids Braids"><img src="/kidhairstyle.jpeg" alt="Kids braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Kids Braids</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/kidhairstyle2.jpeg" data-caption="Kids Braids"><img src="/kidhairstyle2.jpeg" alt="Kids braided style" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Kids Style</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/kidbraids.jpeg" data-caption="Kids Braids"><img src="/kidbraids.jpeg" alt="Kids braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Kids Braids</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/kidbraids1.jpeg" data-caption="Kids Braids"><img src="/kidbraids1.jpeg" alt="Kids braids style" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Kids Braids</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/kidstyle3.jpeg" data-caption="Kids Braids"><img src="/kidstyle3.jpeg" alt="Kids hairstyle" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Kids Style</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/kidstyle5.jpeg" data-caption="Kids Braids"><img src="/kidstyle5.jpeg" alt="Kids braided hairstyle" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Kids Braids</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/kidstyle.jpeg" data-caption="Kids Braids"><img src="/kidstyle.jpeg" alt="Kids hairstyle" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Kids Look</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/kidstyle10.jpeg" data-caption="Kids Braids"><img src="/kidstyle10.jpeg" alt="Kids braids" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Kids Braids</span></span></button>
                    </div>
                  </div>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Nails &amp; Manicure</h3>
                    <div className="category-gallery">
                      <button className="gallery__item" type="button" data-lightbox="/goldennails.jpeg" data-caption="Chrome Nails"><img src="/goldennails.jpeg" alt="Chrome gold nails" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Chrome Nails</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/nails.jpeg" data-caption="Chrome Nails"><img src="/nails.jpeg" alt="Nail art" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Nail Art</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/nails5.jpeg" data-caption="Chrome Nails"><img src="/nails5.jpeg" alt="Chrome nails" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Chrome</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/nails3.jpeg" data-caption="Chrome Nails"><img src="/nails3.jpeg" alt="Nail design" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Nail Design</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/nails11.png" data-caption="Acrylic Nails"><img src="/nails11.png" alt="Acrylic nails" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Acrylic</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/nails12.png" data-caption="Gel Nails"><img src="/nails12.png" alt="Gel nails" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Gel Nails</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/nails13.png" data-caption="Nail Art"><img src="/nails13.png" alt="Nail art design" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Nail Art</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/nails14.png" data-caption="Nail Design"><img src="/nails14.png" alt="Nail design" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Design</span></span></button>
                    </div>
                  </div>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Pedicure &amp; Manicure</h3>
                    <div className="category-gallery category-gallery--static">
                      <button className="gallery__item" type="button" data-lightbox="/pedicurepic.jpeg" data-caption="Pedicure">
                        <img src="/pedicurepic.jpeg" alt="Pedicure service" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span>
                        <span className="gallery__overlay"><span className="gallery__caption">Pedicure</span></span>
                      </button>
                      <div className="gallery__item gallery__item--video">
                        <video src="/pedicure.mp4" muted loop playsInline autoPlay aria-label="Pedicure service video"></video>
                        <span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span>
                        <span className="gallery__overlay gallery__overlay--visible"><span className="gallery__caption">Pedicure Session</span></span>
                      </div>
                    </div>
                  </div>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Makeup</h3>
                    <div className="category-gallery">
                      <button className="gallery__item" type="button" data-lightbox="/makeup.jpeg" data-caption="Makeup"><img src="/makeup.jpeg" alt="Makeup application" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Makeup</span></span></button>
                    </div>
                  </div>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Hair Treatment</h3>
                    <div className="category-gallery">
                      <button className="gallery__item" type="button" data-lightbox="/steampod.jpeg" data-caption="Steampod Treatment"><img src="/steampod.jpeg" alt="Steampod hair treatment" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Steampod</span></span></button>
                      <button className="gallery__item" type="button" data-lightbox="/hairtreatment.jpg" data-caption="Hair Treatment"><img src="/hairtreatment.jpg" alt="Hair treatment" loading="lazy" decoding="async" width="400" height="500" /><span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span><span className="gallery__overlay"><span className="gallery__caption">Hairwash and Massage</span></span></button>
                    </div>
                  </div>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Facial Treatment</h3>
                    <div className="category-gallery category-gallery--single category-gallery--media">
                      <div className="gallery__item gallery__item--video gallery__item--video-quality">
                        <video src="/facial.mp4" muted loop playsInline autoPlay preload="metadata" aria-label="Facial treatment"></video>
                        <span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span>
                        <span className="gallery__overlay gallery__overlay--visible"><span className="gallery__caption">Facial Treatment</span></span>
                      </div>
                    </div>
                  </div>
        
                  <div className="service-category reveal reveal--fade-up">
                    <h3 className="service-category__title">Wig Installation</h3>
                    <div className="category-gallery category-gallery--static">
                      <button className="gallery__item" type="button" data-lightbox="/installation.jpeg" data-caption="Wig Installation">
                        <img src="/installation.jpeg" alt="Wig installation" loading="lazy" decoding="async" width="400" height="500" />
                        <span className="gallery__brand-logo" aria-hidden="true"><img src="/logo.jpg" alt="" /></span>
                        <span className="gallery__overlay"><span className="gallery__caption">Installation</span></span>
                      </button>
                    </div>
                  </div>
        
                  <div className="section__cta reveal reveal--fade-up">
                    <a href="/book" className="btn btn--primary btn--glow">Book Salon</a>
                  </div>
                </div>
        
              </div>
            </section>
      </main>
      <div className="price-modal price-modal--barber" id="barber-price-modal" role="dialog" aria-modal="true" aria-label="Barbershop price list" hidden={true}>
          <div className="price-modal__backdrop" data-price-close></div>
          <div className="price-modal__dialog">
            <div className="price-modal__deco" aria-hidden="true">
              <span className="price-deco price-deco--scissors">✂</span>
              <span className="price-deco price-deco--clipper">⚡</span>
              <span className="price-deco price-deco--comb">🪮</span>
              <span className="price-deco price-deco--razor">🪒</span>
            </div>
            <button className="price-modal__close" type="button" data-price-close aria-label="Close">&times;</button>
            <div className="price-modal__content">
            <header className="price-modal__header">
              <span className="section__label">Barbershop</span>
              <h2 className="price-modal__title price-modal__title--barber">BARBERSHOP PRICE LIST</h2>
              <p className="price-modal__tagline">Your look gives you confidence.</p>
            </header>
            <div className="price-cards price-cards--elegant">
              <div className="price-card">
                <h3 className="price-card__heading">Haircuts</h3>
                <ul className="price-list">
                  <li><span>Haircut (Adults)</span><strong>K130</strong></li>
                  <li><span>Children (Under 13)</span><strong>K80</strong></li>
                  <li><span>Caucasian Haircut</span><strong>K250</strong></li>
                  <li><span>Children Haircut + Black Dye</span><strong>K150</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Shaving &amp; Lining</h3>
                <ul className="price-list">
                  <li><span>Shave</span><strong>K60</strong></li>
                  <li><span>Lining Only</span><strong>K40</strong></li>
                  <li><span>Lining and Dye</span><strong>K70</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Colour &amp; Dye</h3>
                <ul className="price-list">
                  <li><span>Haircut + Blonde Dye</span><strong>K300</strong></li>
                  <li><span>Haircut + Black Dye</span><strong>K180</strong></li>
                  <li><span>Haircut + Magic Powder</span><strong>K230</strong></li>
                  <li><span>Magic Powder</span><strong>K150</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Treatments &amp; Extras</h3>
                <ul className="price-list">
                  <li><span>S Curl</span><strong>K200</strong></li>
                  <li><span>Facial Scrub</span><strong>K150</strong></li>
                  <li><span>Neck Massage</span><strong>K150</strong></li>
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
      
        
        <div className="price-modal price-modal--salon" id="salon-price-modal" role="dialog" aria-modal="true" aria-label="Salon price list" hidden={true}>
          <div className="price-modal__backdrop" data-price-close></div>
          <div className="price-modal__dialog">
            <div className="price-modal__deco price-modal__deco--salon" aria-hidden="true">
              <span className="price-deco price-deco--sparkle">✨</span>
              <span className="price-deco price-deco--flower">🌸</span>
              <span className="price-deco price-deco--nail">💅</span>
              <span className="price-deco price-deco--star">★</span>
            </div>
            <button className="price-modal__close" type="button" data-price-close aria-label="Close">&times;</button>
            <div className="price-modal__content">
            <header className="price-modal__header">
              <span className="section__label">Salon</span>
              <h2 className="price-modal__title price-modal__title--salon">SALON PRICE LIST</h2>
              <p className="price-modal__tagline">Your look gives you confidence.</p>
            </header>
            <div className="price-cards price-cards--salon price-cards--elegant">
              <div className="price-card">
                <h3 className="price-card__heading">Goddess Braids</h3>
                <ul className="price-list">
                  <li><span>Small</span><strong>K450</strong></li>
                  <li><span>Medium</span><strong>K380</strong></li>
                  <li><span>Big</span><strong>K300</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Knotless Braids</h3>
                <ul className="price-list">
                  <li><span>Small</span><strong>K400</strong></li>
                  <li><span>Medium</span><strong>K350</strong></li>
                  <li><span>Big</span><strong>K300</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Fox Locks</h3>
                <ul className="price-list">
                  <li><span>Fox Locks</span><strong>K400 &amp; K450</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Twist Knotless</h3>
                <ul className="price-list">
                  <li><span>Small</span><strong>K400</strong></li>
                  <li><span>Medium</span><strong>K350</strong></li>
                  <li><span>Big</span><strong>K300</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Box Braids</h3>
                <ul className="price-list">
                  <li><span>Small</span><strong>K350</strong></li>
                  <li><span>Medium</span><strong>K300</strong></li>
                  <li><span>Big</span><strong>K250</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Cornrows — Fishtail Mukule</h3>
                <ul className="price-list">
                  <li><span>Small</span><strong>K350</strong></li>
                  <li><span>Medium</span><strong>K300</strong></li>
                  <li><span>Big</span><strong>K250</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Butterfly Braids</h3>
                <ul className="price-list">
                  <li><span>Small</span><strong>K450</strong></li>
                  <li><span>Medium</span><strong>K400</strong></li>
                  <li><span>Big</span><strong>K350</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Crochet</h3>
                <ul className="price-list">
                  <li><span>Crochet</span><strong>K350 &amp; K300</strong></li>
                  <li><span>Pick and Drop</span><strong>K400</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Passion Twist</h3>
                <ul className="price-list">
                  <li><span>Small</span><strong>K450</strong></li>
                  <li><span>Medium</span><strong>K350</strong></li>
                  <li><span>Big</span><strong>K300</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Fishtail with Braids</h3>
                <ul className="price-list">
                  <li><span>Small</span><strong>K380</strong></li>
                  <li><span>Medium</span><strong>K300</strong></li>
                  <li><span>Big</span><strong>K250</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Plain Mukule &amp; More</h3>
                <ul className="price-list">
                  <li><span>Plain Mukule — Small</span><strong>K180</strong></li>
                  <li><span>Plain Mukule — Medium</span><strong>K150</strong></li>
                  <li><span>Cornrows with Wig</span><strong>K200</strong></li>
                  <li><span>Twin Braids</span><strong>K200</strong></li>
                  <li><span>Natural Twist</span><strong>K250</strong></li>
                  <li><span>Retouch</span><strong>K300</strong></li>
                  <li><span>Bone Straight</span><strong>K600</strong></li>
                  <li><span>Draids Start</span><strong>K250</strong></li>
                  <li><span>Retouch (Alt)</span><strong>K200</strong></li>
                  <li><span>Children Knotless</span><strong>K300</strong></li>
                  <li><span>Mukule</span><strong>K150 &amp; K180</strong></li>
                  <li><span>Mukule with Wig</span><strong>K250 &amp; K300</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Hair Relaxer</h3>
                <ul className="price-list">
                  <li><span>Dark and Lovely</span><strong>K350</strong></li>
                  <li><span>Olive Oil</span><strong>K350</strong></li>
                  <li><span>Beautiful Beginning</span><strong>K350</strong></li>
                  <li><span>Easy Wave</span><strong>K250</strong></li>
                  <li><span>Labour</span><strong>K200</strong></li>
                  <li><span>Wash and Set</span><strong>K150</strong></li>
                  <li><span>Wash and Blow</span><strong>K100</strong></li>
                  <li><span>Dye</span><strong>K150, K250 &amp; K300</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Hair Treatment</h3>
                <ul className="price-list">
                  <li><span>Collateral</span><strong>K250</strong></li>
                  <li><span>Hair Mayonnaise</span><strong>K250</strong></li>
                  <li><span>Silk Press</span><strong>K300</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Weaving &amp; Styling</h3>
                <ul className="price-list">
                  <li><span>Open Weave</span><strong>K300</strong></li>
                  <li><span>Closed Weave</span><strong>K300</strong></li>
                  <li><span>Weave with Closure</span><strong>K350</strong></li>
                  <li><span>Razor Cut with Closure</span><strong>K350</strong></li>
                  <li><span>Wig Making</span><strong>K350</strong></li>
                  <li><span>Wig Blowing</span><strong>K130</strong></li>
                  <li><span>Wig Wash &amp; Steampod</span><strong>K250</strong></li>
                  <li><span>Steampod Only</span><strong>K200 &amp; K150</strong></li>
                  <li><span>Gel Puff</span><strong>K250 &amp; K200</strong></li>
                  <li><span>Razor Cut</span><strong>K300</strong></li>
                  <li><span>Installation</span><strong>K350 &amp; K300</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Makeup &amp; Lashes</h3>
                <ul className="price-list">
                  <li><span>Makeup with Lash Extension</span><strong>K350</strong></li>
                  <li><span>Makeup without Lash Extension</span><strong>K300</strong></li>
                  <li><span>Classic Lashes</span><strong>K300</strong></li>
                  <li><span>Hybrid Lashes</span><strong>K350</strong></li>
                  <li><span>Mega Volume Lashes</span><strong>K400</strong></li>
                  <li><span>Eyebrows Threading</span><strong>K100</strong></li>
                  <li><span>Eyebrow Tweezing</span><strong>K40</strong></li>
                </ul>
              </div>
              <div className="price-card">
                <h3 className="price-card__heading">Nails &amp; Pedicure</h3>
                <ul className="price-list">
                  <li><span>Stick-on</span><strong>K300</strong></li>
                  <li><span>Acrylic</span><strong>K400</strong></li>
                  <li><span>Rubber Gel</span><strong>K380</strong></li>
                  <li><span>Polly Gel</span><strong>K380</strong></li>
                  <li><span>Gel Paint</span><strong>K200</strong></li>
                  <li><span>Rubber Gel on Natural Nails</span><strong>K300</strong></li>
                  <li><span>Polly Gel on Natural Nails</span><strong>K300</strong></li>
                  <li><span>Toe Nails</span><strong>K250</strong></li>
                  <li><span>Pedicure &amp; Manicure</span><strong>K450</strong></li>
                  <li><span>Pedicure Only</span><strong>K400</strong></li>
                  <li><span>Sock Off</span><strong>K80</strong></li>
                  <li><span>Nail Refill</span><strong>K300</strong></li>
                  <li><span>Manicure</span><strong>K100</strong></li>
                  <li><span>Stick-on's</span><strong>K250</strong></li>
                  <li><span>Rubber Gel (Alt)</span><strong>K280</strong></li>
                  <li><span>Polly Gel (Alt)</span><strong>K280</strong></li>
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
      
        <div className="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Image preview" hidden={true}>
          <button className="lightbox__close" id="lightbox-close" type="button" aria-label="Close">&times;</button>
          <button className="lightbox__nav lightbox__nav--prev" id="lightbox-prev" type="button" aria-label="Previous image">&#8249;</button>
          <button className="lightbox__nav lightbox__nav--next" id="lightbox-next" type="button" aria-label="Next image">&#8250;</button>
          <figure className="lightbox__figure">
            <div className="lightbox__media">
              <img className="lightbox__img" id="lightbox-img" alt="" />
              <span className="lightbox__brand-logo" id="lightbox-brand-logo" hidden={true} aria-hidden="true"><img src="/logo.jpg" alt="" /></span>
              <span className="lightbox__inspo-badge" id="lightbox-inspo-badge" hidden={true} aria-hidden="true">INSPO</span>
            </div>
            <figcaption className="lightbox__caption" id="lightbox-caption"></figcaption>
          </figure>
        </div>
    </>
  );
}
