import { Build } from "./key-features/Build";
import { Launch } from "./key-features/Launch";
import { Manage } from "./key-features/Manage";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import React from "react";

export const KeyFeatures = () => {
  return (
    <HomepageSection my={40}>
      <Build />
      <Launch />
      <Manage />
    </HomepageSection>
  );
};
