import React from "react";
import Image from "next/image";

import styles from "./Header.module.scss";

export interface HeaderProps {
  title: string;
  text: string;
  image: string;
}

export default function ProductListPageHeader({
  title,
  text,
  image,
}: HeaderProps) {
  return (
    <section className={`section  layout__section ${styles.Header}`}>
      <div data-casita-header-wrapper>
        <Image
          width={2830}
          height={1500}
          src={image}
          alt={title}
          loading="eager"
          sizes="100vw"
          data-casita-header-image
        />
        <div data-casita-header-content>
          <h1 data-casita-header-title>{title}</h1>
          <p data-casita-header-text>{text}</p>
        </div>
      </div>
    </section>
  );
}
