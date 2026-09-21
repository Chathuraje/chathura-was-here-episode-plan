"use client";

import { useState } from "react";
import styles from "./ImageCarousel.module.css";

export type CarouselImage = { caption: string; url: string; source: string; licence_note?: string };

/**
 * Reference stills for a proposed location. These are remote archive images, so a dead or
 * moved URL is expected eventually and is shown as a message rather than a broken icon.
 */
export default function ImageCarousel({ images }: { images: CarouselImage[] }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  if (!images.length) return null;

  const current = images[Math.min(index, images.length - 1)];
  const go = (next: number) => setIndex((next + images.length) % images.length);

  return (
    <div className={styles.carousel}>
      <div
        className={styles.frame}
        role="group"
        aria-roledescription="carousel"
        aria-label="Reference images for the proposed location"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); go(index - 1); }
          if (event.key === "ArrowRight") { event.preventDefault(); go(index + 1); }
        }}
      >
        {failed[current.url] ? (
          <p className={styles.failed}>This image could not be loaded. Open the source link below.</p>
        ) : (
          // Remote archive images, deliberately not routed through next/image.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current.url}
            alt={current.caption}
            loading="lazy"
            onError={() => setFailed((state) => ({ ...state, [current.url]: true }))}
          />
        )}

        {images.length > 1 && (
          <>
            <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={() => go(index - 1)} aria-label="Previous image">←</button>
            <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => go(index + 1)} aria-label="Next image">→</button>
            <span className={styles.counter}>{index + 1}/{images.length}</span>
          </>
        )}
      </div>

      <p className={styles.caption}>
        {current.caption} <a href={current.source} target="_blank" rel="noreferrer">source ↗</a>
      </p>

      {images.length > 1 && (
        <div className={styles.dots}>
          {images.map((image, dot) => (
            <button
              key={image.url}
              type="button"
              className={`${styles.dot} ${dot === index ? styles.dotOn : ""}`}
              onClick={() => go(dot)}
              aria-label={`Go to image ${dot + 1}`}
              aria-current={dot === index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
