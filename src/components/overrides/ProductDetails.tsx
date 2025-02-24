import { SectionOverride } from "@faststore/core";
import CustomProductTitle from "../CustomProductTitle";
import CustomProductPrice from "../CustomProductPrice";
import CustomShippingSimulation from "../CustomShippingSimulation";

const SECTION = "ProductDetails" as const;

const override: SectionOverride = {
  section: SECTION,
  components: {
    ProductTitle: { Component: CustomProductTitle },
    ProductPrice: { Component: CustomProductPrice },
    ShippingSimulation: {
      Component: CustomShippingSimulation,
    },
  },
};

export { override };
