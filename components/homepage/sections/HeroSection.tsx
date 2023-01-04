import { Aurora } from "../Aurora";
import { CLICommand } from "../CLICommand";
import { Flex, Icon, LightMode, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { useTrack } from "hooks/analytics/useTrack";
import Hero from "public/assets/landingpage/hero.png";
import { BsLightningCharge } from "react-icons/bs";
import { Heading, Link, LinkButton, Text } from "tw-components";

export const HeroSection = () => {
  const trackEvent = useTrack();
  return (
    <HomepageSection id="home" bottomPattern>
      <Aurora
        pos={{ left: "70%", top: "30%" }}
        size={{ width: "2200px", height: "1600px" }}
        color="hsl(289deg 78% 30% / 35%)"
      />

      <Aurora
        pos={{ left: "10%", top: "30%" }}
        size={{ width: "1800px", height: "1600px" }}
        color="hsl(340deg 78% 30% / 40%)"
      />
      <SimpleGrid
        pt={{
          base: 0,
          md: 16,
          lg: 24,
        }}
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 6, lg: 8 }}
      >
        <Flex
          flexDir="column"
          gap={{ base: 6, md: 8 }}
          align={{ base: "initial", md: "start" }}
        >
          <Heading
            as="h2"
            letterSpacing="-0.04em"
            lineHeight={1.125}
            fontWeight={700}
            fontSize={{ base: "36px", md: "56px" }}
            textAlign={{ base: "center", md: "left" }}
          >
            The complete <br /> web3 development framework.
          </Heading>
          <Heading
            as="h3"
            size="subtitle.md"
            textAlign={{ base: "center", md: "left" }}
          >
            Everything you need to connect your apps or games to decentralized
            networks. Powerful tools that simplify web3 development.
          </Heading>

          <LightMode>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={4}
              w="100%"
              justify="space-between"
            >
              <Flex flexDir="column" gap={3} flexGrow={1} minW={300}>
                <LinkButton
                  href="/dashboard"
                  onClick={() =>
                    trackEvent({
                      category: "cta-button",
                      action: "click",
                      label: "start",
                      title: "Start building",
                    })
                  }
                  px={4}
                  py={7}
                  // h={{ base: "48px", md: "68px" }}
                  fontSize="20px"
                  leftIcon={<Icon as={BsLightningCharge} color="black" />}
                  color="black"
                  flexShrink={0}
                  background="rgba(255,255,255,1)"
                  _hover={{
                    background: "rgba(255,255,255,0.9)!important",
                  }}
                >
                  Start Building
                </LinkButton>
                <Link
                  href="#pricing"
                  onClick={(e) => {
                    const el = document.getElementById("pricing");
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView();
                    }
                  }}
                >
                  <Text
                    color="gray.600"
                    size="label.sm"
                    fontStyle="italic"
                    textAlign="center"
                    whiteSpace={"nowrap"}
                  >
                    Completely free to use. No hidden fees.
                  </Text>
                </Link>
              </Flex>
              <CLICommand text="npx thirdweb@latest" />
            </Flex>
          </LightMode>
        </Flex>

        <ChakraNextImage
          display={{ base: "none", lg: "flex" }}
          alt=""
          maxW={96}
          w={96}
          mt={8}
          src={Hero}
          mr={12}
          priority
          quality={95}
          justifySelf="flex-end"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 30vw"
        />
      </SimpleGrid>
    </HomepageSection>
  );
};
