import "react-responsive-carousel/lib/styles/carousel.min.css";

import React, { useState, useEffect } from "react";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { Carousel as ReactResponsiveCarousel } from "react-responsive-carousel";
import { PlaygroundMenu } from "./PlaygroundMenu";
import { ChakraNextImage } from "components/Image";
import { useTrack } from "hooks/analytics/useTrack";

const showcaseMenus = [
  {
    id: "pay-icon",
    title: "Pay",
    description:
      "[Short desc - onboard users with fiat or crypto at any web3 point of sale]",
    image: require("public/assets/product-pages/connect/icon-pay.png"),
  },
  {
    id: "connect-icon",
    title: "Connect",
    description:
      "[Short desc - onboard users with fiat or crypto at any web3 point of sale]",
    image: require("public/assets/product-pages/connect/icon-connect.png"),
  },
  {
    id: "account-abstraction-icon",
    title: "Account Abstraction",
    description:
      "[Short desc - onboard users with fiat or crypto at any web3 point of sale]",
    image: require("public/assets/product-pages/connect/icon-aa.png"),
  },
];

const showcaseImages = [
  require("public/assets/product-pages/connect/pay.png"),
  require("public/assets/product-pages/connect/connect.png"),
  require("public/assets/product-pages/connect/account-abstraction.png"),
];

const Carousel = ({ TRACKING_CATEGORY }: { TRACKING_CATEGORY: string }) => {
  const [selectedShowCaseIdx, setSelectedShowCaseIdx] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(false);
  const trackEvent = useTrack();

  const increment = () => {
    setSelectedShowCaseIdx((idx) => (idx === 2 ? 0 : idx + 1));
  };

  useEffect(() => {
    if (!hoveredCard) {
      const timer = setInterval(increment, 3500);

      return () => clearInterval(timer);
    }
  }, [hoveredCard]);

  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      gap={{ base: "24px", md: 0 }}
      alignItems="stretch"
      w="full"
    >
      <Box
        w="full"
        display={{ base: "flex", md: "none" }}
        className="sliderWrapper"
      >
        <ReactResponsiveCarousel
          swipeable
          centerMode
          infiniteLoop={false}
          showThumbs={false}
          autoPlay={false}
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          selectedItem={selectedShowCaseIdx}
          onSwipeMove={() => {
            if (!hoveredCard) {
              setHoveredCard(true);
            }
            return true;
          }}
        >
          {showcaseMenus.map(({ id, title, description, image }, idx) => (
            <PlaygroundMenu
              key={id}
              isSelected={idx === selectedShowCaseIdx}
              title={title}
              description={description}
              image={image}
              onClick={() => {
                setSelectedShowCaseIdx(idx);
                setHoveredCard(true);
              }}
            />
          ))}
        </ReactResponsiveCarousel>
      </Box>

      <SimpleGrid
        columns={1}
        marginRight={{ base: "0", md: "24px" }}
        width="full"
        maxW={{ base: "full", md: "330px" }}
        gap="24px"
        display={{ base: "none", md: "grid" }}
      >
        {showcaseMenus.map(({ id, title, description, image }, idx) => (
          <PlaygroundMenu
            key={id}
            isSelected={idx === selectedShowCaseIdx}
            title={title}
            description={description}
            image={image}
            onMouseOver={() => {
              setSelectedShowCaseIdx(idx);
              setHoveredCard(true);
            }}
            onMouseOut={() => {
              setHoveredCard(false);
            }}
            onClick={() => {
              setSelectedShowCaseIdx(idx);
              setHoveredCard(true);
              trackEvent({
                category: TRACKING_CATEGORY,
                action: "click",
                label: id,
              });
            }}
          />
        ))}
      </SimpleGrid>
      <Flex width="full" maxW="686px">
        <ChakraNextImage
          width="full"
          src={showcaseImages[selectedShowCaseIdx]}
          alt=""
        />
      </Flex>
    </Flex>
  );
};

export default Carousel;
