import React, { memo, useCallback, useEffect, useState } from "react";

import styles from "./Carousel.module.scss";
import { unstable_getImgProps as getImageProps } from "next/image";
import { Icon } from "@faststore/ui";
import { useSnapCarousel } from "react-snap-carousel";
import Link from "next/link";

export interface CarouselProps {
  interval?: number;
  images: {
    image: string;
    imageMobile?: string;
    link: string;
    alt: string;
  }[];
}

const Slider = memo(function Slider({
  interval = 5000,
  children,
}: {
  interval?: number;
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const { pages, activePageIndex, scrollRef, next, prev, goTo } =
    useSnapCarousel();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (pages.length <= 1 || !isMounted) {
      return;
    }

    const timer = setInterval(() => {
      if (activePageIndex === pages.length - 1) {
        goTo(0);

        return;
      }

      next();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [activePageIndex, goTo, , pages.length, isMounted]);

  const handleNext = useCallback(() => {
    if (activePageIndex === pages.length - 1) {
      goTo(0);

      return;
    }

    next();
  }, [activePageIndex, goTo, next, pages.length]);

  const handlePrev = useCallback(() => {
    if (activePageIndex === 0) {
      goTo(pages.length - 1);
      return;
    }

    prev();
  }, [activePageIndex, goTo, pages.length, prev]);

  return (
    <>
      <ul ref={scrollRef} data-casita-slider>
        {children}
      </ul>
      <CarouselDots activePageIndex={activePageIndex} pages={pages} />
      <CarouselControls handleNext={handleNext} handlePrev={handlePrev} />
    </>
  );
});

function CarouselControls({
  handleNext,
  handlePrev,
}: {
  handleNext: () => void;
  handlePrev: () => void;
}) {
  return (
    <>
      <button
        data-casita-slider-control
        data-casita-slider-control--prev
        onClick={handlePrev}
      >
        <Icon name="CaretLeft" height={48} width={48} />
      </button>
      <button
        data-casita-slider-control
        data-casita-slider-control--next
        onClick={handleNext}
      >
        <Icon name="CaretRight" height={48} width={48} />
      </button>
    </>
  );
}

function CarouselDots({
  activePageIndex,
  pages,
}: {
  activePageIndex: number;
  pages: unknown[];
}) {
  return (
    <div data-casita-slider-dots-wrapper>
      {pages.map((_, index) => (
        <span key={index} data-active={activePageIndex === index} />
      ))}
    </div>
  );
}

const CarouselImage = memo(function CarouselImage({
  loading,
  priority,
  image,
}: {
  loading: "eager" | "lazy";
  priority: boolean;
  image: CarouselProps["images"][number];
}) {
  const common = {
    alt: image.alt,
    loading,
    priority,
    sizes: "100vw",
    fill: true,
  };

  const {
    props: { srcSet: mobile },
  } = image.imageMobile
    ? getImageProps({
        ...common,
        quality: 70,
        src: image.imageMobile,
      })
    : { props: { srcSet: undefined } };

  const {
    props: { src: desktop, ...rest },
  } = getImageProps({
    ...common,
    quality: 90,
    src: image.image,
  });

  return (
    <li data-casita-slide>
      <Link href={image.link}>
        <picture>
          <source media="(max-width: 768px)" srcSet={mobile} />
          <img {...rest} src={desktop} data-casita-slide-image />
        </picture>
      </Link>
    </li>
  );
});

export default function Carousel({ interval, images = [] }: CarouselProps) {
  return (
    <section className={`section ${styles.Carousel}`}>
      <div data-casita-carousel-wrapper>
        <Slider interval={interval}>
          {images.map((image, index) => (
            <CarouselImage
              key={index}
              loading={index === 0 ? "eager" : "lazy"}
              priority={index === 0}
              image={image}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
}
