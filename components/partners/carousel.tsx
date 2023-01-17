import { PartnerLogo } from "./partner-logo";
import styles from "./partner-logo.module.css";
import { Box } from "@chakra-ui/react";

const gap = { base: "40px", lg: "60px" };

const MarqueeGroup: React.FC<{ ariaHidden: boolean }> = ({ ariaHidden }) => {
  return (
    <Box
      display="flex"
      gap={gap}
      overflow="hidden"
      flexShrink={0}
      aria-hidden={ariaHidden}
      className={styles.marqueeGroup}
    >
      <PartnerLogo partner="rarible" />
      <PartnerLogo partner="fractal" />
      <PartnerLogo partner="buildspace" />
      <PartnerLogo partner="shopify" />
      <PartnerLogo partner="paradigm" />
      <PartnerLogo partner="unlock" />
      <PartnerLogo partner="minted" />
      <PartnerLogo partner="nyfw" />
      <PartnerLogo partner="gala_games" />
      <PartnerLogo partner="mirror" />
      <PartnerLogo partner="heroic_story" />
      <PartnerLogo partner="layer3" />
    </Box>
  );
};

export const PartnerCarousel: React.FC = () => {
  return (
    <Box
      zIndex={10}
      position="relative"
      pointerEvents="none"
      userSelect="none"
      pt={10}
      mb={{ base: 20, md: 24 }}
    >
      <Box display="flex" gap={gap} overflow="hidden" py={4}>
        <MarqueeGroup ariaHidden={false} />
        <MarqueeGroup ariaHidden={true} />
      </Box>

      {/* Add extra row for mobile */}
      <Box
        gap={gap}
        py={4}
        overflow="hidden"
        display={{ base: "flex", md: "none" }}
        className={styles.marqueeReverse}
      >
        <MarqueeGroup ariaHidden={false} />
        <MarqueeGroup ariaHidden={true} />
      </Box>
    </Box>
  );
};
