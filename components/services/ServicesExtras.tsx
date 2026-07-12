export type PriceListItem = {
  label: string;
  price: number | null;
};

export default function ServicesExtras() {
  return (
    <>
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
