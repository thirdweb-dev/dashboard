import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import React from "react";

const MajorSection = () => {
  return (
    <LandingGridSection>
      <LandingIconSectionItem
        icon={require("public/assets/product-pages-icons/contracts/icon-ship.svg")}
        title="Ship onchain faster"
        description="Reduce development time with pre-built contracts which work out-of-the box, or use our SDK to build custom contracts with advanced functionality from scratch."
      />

      <LandingIconSectionItem
        icon={require("public/assets/product-pages-icons/contracts/icon-ship.svg")}
        title="Ship onchain faster"
        description="Reduce development time with pre-built contracts which work out-of-the box, or use our SDK to build custom contracts with advanced functionality from scratch."
      />
    </LandingGridSection>
  );
};

export default MajorSection;
