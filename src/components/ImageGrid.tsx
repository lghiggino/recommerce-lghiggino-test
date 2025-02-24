import Link from "next/link";
import Image from "next/image";
import React from "react";

import styles from "./ImageGrid.module.scss";

export interface ImageGridProps {
  title: string;
  images: {
    image: string;
    title: string;
    link: string;
  }[];
}

export default function ImageGrid({ title, images }: ImageGridProps) {
  return (
    <section
      className={`section section-image-grid layout__section ${styles.ImageGrid}`}
    >
      <h2 className="text__title-section layout__content">{title}</h2>
      <ul role="list" data-fs-content data-casita-image-grid-list>
        {(images ?? []).map(({ image, title, link }) => (
          <li key={title} data-casita-image-grid-item>
            <div data-casita-image-grid-item-image-wrapper>
              <Image
                width={420}
                height={294}
                src={image}
                alt={title}
                loading="lazy"
                quality={60}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                data-casita-image-grid-item-image
              />
              <Link href={link} data-casita-image-grid-link />
            </div>
            <p data-casita-image-grid-item-title>{title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
