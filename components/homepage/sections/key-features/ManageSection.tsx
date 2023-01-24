import { Aurora } from "../../Aurora";
import { KeyFeatureLayout } from "./KeyFeatureLayout";
import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage as Image } from "components/Image";
import React from "react";
import { Heading, Link } from "tw-components";

export const ManageSection = () => {
  return (
    <KeyFeatureLayout
      title="Manage"
      titleGradient="linear-gradient(70deg, #4F3DA5, #8E81D0)"
      headline="Manage and interact with your web3 apps."
      description="Get insights and interact with all your contracts that are deployed on thirdweb from a single place."
    >
      <SimpleGrid columns={{ md: 11 }} gap={6}>
        <GridItem
          colSpan={{ md: 6 }}
          bg="#070707"
          rounded="lg"
          position="relative"
          overflow="hidden"
        >
          <Aurora
            zIndex="auto"
            size={{ width: "150%", height: "150%" }}
            pos={{ top: "60%", left: "50%" }}
            color="#9786DF60"
          />
          <Flex
            h="full"
            position="relative"
            flexDir="column"
            justify="space-between"
            px={14}
          >
            <Heading size="label.xl" lineHeight="1.2" py={12}>
              Monitor and configure your contracts from your{" "}
              <Link
                href="/dashboards"
                bgGradient="linear-gradient(70deg, #4F3DA5, #8E81D0, #4F3DA5)"
                bgClip="text"
                bgSize="200%"
                transition="background 0.5s ease"
                _hover={{ backgroundPosition: "100%" }}
              >
                Dashboard
              </Link>
            </Heading>
            <Image
              w="full"
              src={require("/public/assets/landingpage/manage-dashboard.png")}
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
            size={{ width: "300%", height: "200%" }}
            pos={{ top: "80%", left: "100%" }}
            color="#9786DF60"
          />
          <Flex h="full" position="relative" flexDir="column" px={14}>
            <Heading size="label.xl" lineHeight="1.2" py={12}>
              Collaborate with your team and{" "}
              <Box
                as="span"
                bgGradient="linear-gradient(70deg, #4F3DA5, #8E81D0)"
                bgClip="text"
              >
                manage permissions
              </Box>
            </Heading>
            <Box py={6} my="auto">
              <Image
                w="full"
                src={require("/public/assets/landingpage/manage-permissions.png")}
                alt=""
              />
            </Box>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={{ md: 11 }}
          bg="#070707"
          rounded="lg"
          position="relative"
          overflow="hidden"
        >
          <Aurora
            zIndex="auto"
            size={{ width: "120%", height: "180%" }}
            pos={{ top: "50%", left: "70%" }}
            color="#9786DF40"
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
                maxW={320}
                textAlign={{ base: "center", md: "left" }}
              >
                <Box
                  as="span"
                  bgGradient="linear-gradient(70deg, #4F3DA5, #8E81D0)"
                  bgClip="text"
                >
                  Automatic pre-built reports
                </Box>{" "}
                with on-chain analytics.
              </Heading>
            </Flex>
            <Box pt={6} px={8}>
              <Image
                h="full"
                src={require("/public/assets/landingpage/manage-reports.png")}
                alt=""
              />
            </Box>
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
    </KeyFeatureLayout>
  );
};
