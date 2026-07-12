import { formatPriceDisplay, parseServiceLabel } from "@/lib/bookable-services";
import {
  BARBER_PRICE_CATALOG,
  SALON_PRICE_CATALOG,
  type PriceCatalogEntry,
} from "@/lib/bookable-services-catalog";

export type PriceListItem = {
  label: string;
  price: number | null;
  group?: string | null;
};

function catalogToItems(entries: PriceCatalogEntry[]): PriceListItem[] {
  return entries.map((entry) => ({
    group: entry.group,
    price: entry.price,
    label:
      entry.price != null
        ? `${entry.name} — K${entry.price}`
        : `${entry.name} — ${entry.priceText ?? ""}`.trim(),
  }));
}

function groupPriceItems(items: PriceListItem[]) {
  const map = new Map<string, PriceListItem[]>();
  for (const item of items) {
    const key = item.group?.trim() || "Services";
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }
  return Array.from(map.entries());
}

function DynamicPriceCards({ items }: { items: PriceListItem[] }) {
  const groups = groupPriceItems(items);

  return (
    <>
      {groups.map(([heading, groupItems]) => (
        <div className="price-card" key={heading}>
          <h3 className="price-card__heading">{heading}</h3>
          <ul className="price-list">
            {groupItems.map((item) => {
              const { name } = parseServiceLabel(item.label);
              return (
                <li key={`${heading}-${item.label}-${item.price ?? "x"}`}>
                  <span>{name}</span>
                  <strong>{formatPriceDisplay(item.price, item.label)}</strong>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}

export default function ServicesExtras({
  barberItems,
  salonItems,
}: {
  barberItems?: PriceListItem[];
  salonItems?: PriceListItem[];
}) {
  const useDynamicBarber = Boolean(barberItems && barberItems.length > 0);
  const useDynamicSalon = Boolean(salonItems && salonItems.length > 0);
  const barberDisplay = useDynamicBarber ? barberItems! : catalogToItems(BARBER_PRICE_CATALOG);
  const salonDisplay = useDynamicSalon ? salonItems! : catalogToItems(SALON_PRICE_CATALOG);

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
              <DynamicPriceCards items={barberDisplay} />
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
              <DynamicPriceCards items={salonDisplay} />
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
