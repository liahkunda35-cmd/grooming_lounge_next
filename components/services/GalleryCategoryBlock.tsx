import type { GalleryItem } from "@prisma/client";
import { OptimizedPicture } from "@/components/OptimizedImage";

const GALLERY_IMAGE_SIZES =
  "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px";

function BrandLogoBadge() {
  return (
    <span className="gallery__brand-logo" aria-hidden="true">
      <OptimizedPicture
        src="/logo.jpg"
        alt=""
        width={28}
        height={28}
        sizes="28px"
        loading="lazy"
      />
    </span>
  );
}

function GalleryBadge({ type }: { type: string | null }) {
  if (type === "logo") {
    return <BrandLogoBadge />;
  }
  if (type === "inspo") {
    return (
      <span className="gallery__inspo-badge" aria-hidden="true">
        INSPO
      </span>
    );
  }
  return null;
}

export function GalleryMediaItem({ item }: { item: GalleryItem }) {
  const caption = item.caption || item.overlayText || "";
  const overlayVisible = item.mediaType === "video";

  if (item.mediaType === "video") {
    return (
      <div className="gallery__item gallery__item--video gallery__item--video-quality">
        <video src={item.mediaUrl} muted loop playsInline autoPlay preload="metadata" aria-label={item.altText || caption} />
        <GalleryBadge type={item.badgeType} />
        <span className={`gallery__overlay${overlayVisible ? " gallery__overlay--visible" : ""}`}>
          <span className="gallery__caption">{item.overlayText || caption}</span>
        </span>
      </div>
    );
  }

  return (
    <button
      className="gallery__item"
      type="button"
      data-lightbox={item.mediaUrl}
      data-caption={caption}
    >
      <OptimizedPicture
        src={item.mediaUrl}
        alt={item.altText || caption}
        fill
        sizes={GALLERY_IMAGE_SIZES}
        className="gallery__media-image"
        loading="lazy"
      />
      <GalleryBadge type={item.badgeType} />
      {item.overlayText ? (
        <span className="gallery__overlay">
          <span className="gallery__caption">{item.overlayText}</span>
        </span>
      ) : null}
    </button>
  );
}

export function GalleryCategoryBlock({
  title,
  layout,
  items,
}: {
  title: string;
  layout: string;
  items: GalleryItem[];
}) {
  if (!items.length) return null;

  const layoutClass =
    layout === "static"
      ? "category-gallery category-gallery--static"
      : layout === "single"
        ? "category-gallery category-gallery--single"
        : layout === "media"
          ? "category-gallery category-gallery--single category-gallery--media"
          : "category-gallery";

  return (
    <div className="service-category reveal reveal--fade-up">
      <h3 className="service-category__title">{title}</h3>
      <div className={layoutClass}>
        {items.map((item) => (
          <GalleryMediaItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
