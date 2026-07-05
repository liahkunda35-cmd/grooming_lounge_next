import Image, { type ImageProps } from "next/image";
import type { CSSProperties } from "react";

/** High quality preset — sharp output without visible compression artifacts. */
export const PREMIUM_IMAGE_QUALITY = 90;

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i;

export function isVideoSrc(src: string) {
  return VIDEO_EXTENSIONS.test(src.split("?")[0]);
}

export function isOptimizableImageSrc(src: string) {
  const clean = src.split("?")[0];
  return clean.startsWith("/") && !isVideoSrc(clean);
}

type OptimizedImageProps = Omit<ImageProps, "alt" | "quality"> & {
  alt: string;
  quality?: number;
};

/**
 * Next.js Image wrapper tuned for Grooming Lounge — AVIF/WebP delivery,
 * responsive sizing, and premium visual quality (not low-quality compression).
 */
export default function OptimizedImage({
  quality = PREMIUM_IMAGE_QUALITY,
  alt,
  ...props
}: OptimizedImageProps) {
  return <Image alt={alt} quality={quality} {...props} />;
}

type OptimizedPictureProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  style?: CSSProperties;
};

/** Uses next/image when possible; falls back to native img for videos or remote URLs. */
export function OptimizedPicture({
  src,
  alt,
  className,
  width,
  height,
  fill,
  sizes,
  priority,
  loading,
  fetchPriority,
  style,
}: OptimizedPictureProps) {
  if (!isOptimizableImageSrc(src)) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? "eager" : loading ?? "lazy"}
        decoding="async"
        fetchPriority={fetchPriority}
        style={style}
      />
    );
  }

  if (fill) {
    return (
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes ?? "100vw"}
        priority={priority}
        style={style}
      />
    );
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      width={width ?? 800}
      height={height ?? 600}
      sizes={sizes}
      priority={priority}
      loading={loading}
      fetchPriority={fetchPriority}
      style={style}
    />
  );
}
