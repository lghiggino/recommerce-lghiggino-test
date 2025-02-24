import React from "react";

import { ProductTitle, type ProductTitleProps } from "@faststore/ui";

import styles from "./CustomProductTitle.module.scss";
import { usePDP } from "@faststore/core";

export default function CustomProductTitle(props: ProductTitleProps) {
  const context = usePDP();

  const sellerName = context?.data?.product?.seller;

  return (
    <div className={styles.CustomProductTitle}>
      <ProductTitle {...props} />
      {sellerName && (
        <div data-casita-seller-info-wrapper>
          Vendido e entregue por{" "}
          <span data-casita-seller-info-name>{sellerName}</span>
        </div>
      )}
    </div>
  );
}
