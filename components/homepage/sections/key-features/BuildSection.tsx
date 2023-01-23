import { Aurora } from "../../Aurora";
import { KeyFeatureLayout } from "./KeyFeatureLayout";
import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage as Image } from "components/Image";
import React from "react";
import { Heading, Link } from "tw-components";

export const BuildSection = () => {
  return (
    <KeyFeatureLayout
      title="Build"
      titleGradient="linear-gradient(70deg, #805AA8, #BAA2D4)"
      headline="Accelerate your web3 development."
      description="Leverage our easy-to-use SDKs, developer tools, and integrations with best-in-class partner providers."
    >
      <SimpleGrid columns={{ md: 5 }} gap={6}>
        <GridItem
          colSpan={{ md: 2 }}
          bg="#070707"
          rounded="lg"
          position="relative"
          overflow="hidden"
        >
          <Aurora
            zIndex="auto"
            size={{ width: "200%", height: "150%" }}
            pos={{ top: "80%", left: "0%" }}
            color="#380D3F60"
          />
          <Flex
            h="full"
            position="relative"
            flexDir="column"
            justify="space-between"
          >
            <Heading size="label.xl" lineHeight="1.2" py={12} px={14}>
              Create your own contracts with our{" "}
              <Link
                href="/contractkit"
                bgGradient="linear-gradient(70deg, #805AA8, #BAA2D4, #805AA8)"
                bgClip="text"
                bgSize="200%"
                transition="background 0.5s ease"
                _hover={{ bgPos: "100%" }}
              >
                ContractKit
              </Link>
            </Heading>
            <Image
              pl="14"
              w="full"
              src={require("/public/assets/landingpage/build-contractkit.png")}
              alt=""
            />
          </Flex>
        </GridItem>
        <GridItem
          colSpan={{ md: 3 }}
          bg="#070707"
          rounded="lg"
          position="relative"
          overflow="hidden"
        >
          <Aurora
            zIndex="auto"
            size={{ width: "200%", height: "150%" }}
            pos={{ top: "20%", left: "100%" }}
            color="#380D3F60"
          />
          <Flex
            h="full"
            position="relative"
            flexDir="column"
            align="center"
            justify="space-between"
          >
            <Heading
              lineHeight="1.2"
              textAlign="center"
              size="label.xl"
              px={14}
              py={12}
            >
              Discover ready-to-deploy <br />
              contracts in{" "}
              <Link
                href="/explore"
                bgGradient="linear-gradient(70deg, #BFA3DA, #BAA2D4, #BFA3DA)"
                bgClip="text"
                bgSize="200%"
                transition="background 0.5s ease"
                _hover={{ bgPos: "100%" }}
              >
                Explore
              </Link>
            </Heading>
            <Image
              w="full"
              src={require("/public/assets/landingpage/build-explore.png")}
              alt=""
            />
          </Flex>
        </GridItem>
        <GridItem
          colSpan={{ md: 5 }}
          bg="#070707"
          rounded="lg"
          position="relative"
          overflow="hidden"
        >
          <Aurora
            zIndex="auto"
            size={{ width: "300%", height: "150%" }}
            pos={{ top: "70%", left: "150%" }}
            color="#380D3F60"
          />
          <SimpleGrid columns={{ md: 2 }} h="full" position="relative">
            <Flex
              h="full"
              flexDir="column"
              justify="center"
              px={14}
              py={12}
              w="full"
              gap={6}
            >
              <Heading
                lineHeight="1.2"
                size="label.xl"
                textAlign={{ base: "center", md: "left" }}
              >
                Integrate web3 technology into your apps and games with our{" "}
                <Link
                  href="/sdk"
                  bgGradient="linear-gradient(70deg, #805AA8, #BAA2D4, #805AA8)"
                  bgClip="text"
                  bgSize="200%"
                  transition="background 0.5s ease"
                  _hover={{
                    bgPos: "100%",
                  }}
                >
                  easy-to-use SDKs
                </Link>
              </Heading>
              <Heading
                lineHeight="1.2"
                size="subtitle.sm"
                color="whiteAlpha.700"
                textAlign={{ base: "center", md: "left" }}
              >
                Supports Javascript. Python. Go. Unity. C#.
              </Heading>
            </Flex>
            <Box px={14} py={6}>
              <Image
                h="full"
                src={require("/public/assets/landingpage/build-sdk.png")}
                alt=""
              />
            </Box>
          </SimpleGrid>
        </GridItem>
        <GridItem
          colSpan={{ md: 5 }}
          bg="#070707"
          rounded="lg"
          position="relative"
          overflow="hidden"
        >
          <Aurora
            zIndex="auto"
            size={{ width: "150%", height: "150%" }}
            pos={{ top: "50%", left: "100%" }}
            color="#380D3F60"
          />
          <SimpleGrid columns={{ md: 2 }} h="full" position="relative">
            <Flex
              h="full"
              flexDir="column"
              justify="center"
              px={14}
              py={12}
              w="full"
              gap={6}
            >
              <Heading
                lineHeight="1.2"
                size="label.xl"
                textAlign={{ base: "center", md: "left" }}
              >
                <Box
                  as="span"
                  bgGradient="linear-gradient(70deg, #805AA8, #BAA2D4, #805AA8)"
                  bgClip="text"
                  bgSize="200%"
                >
                  Fully managed infrastructure services
                </Box>{" "}
                in a single toolkit to enable developers to build for scale
              </Heading>
              <Heading
                lineHeight="1.2"
                size="subtitle.sm"
                color="whiteAlpha.700"
                textAlign={{ base: "center", md: "left" }}
              >
                Deploy across any EVM chain.
              </Heading>
            </Flex>
            <Box px={14} py={8}>
              <Image
                h="full"
                src={require("/public/assets/landingpage/build-infrastructure.png")}
                alt=""
              />
            </Box>
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
    </KeyFeatureLayout>
  );
};
