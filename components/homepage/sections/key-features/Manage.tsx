import { Aurora } from "../../Aurora";
import { Layout } from "./Layout";
import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage as Image } from "components/Image";
import React from "react";
import { Heading, Link } from "tw-components";

export const Manage = () => {
  return (
    <Layout
      title="Manage"
      titleGradient="linear-gradient(60deg, #C45AB1 -30%, #E9A8D9 65%)"
      headline="Manage and interact with your web3 apps."
      description="Receive insights and interact with all your contracts that are deployed on thirdweb from a single place."
    >
      <SimpleGrid columns={{ md: 9 }} gap={6}>
        <GridItem
          colSpan={{ md: 5 }}
          bg="#070707"
          rounded="lg"
          position="relative"
          overflow="hidden"
        >
          <Aurora
            hasBackground
            size={{ width: "150%", height: "150%" }}
            pos={{ top: "50%", left: "50%" }}
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
                href="/deploy"
                bgGradient="linear-gradient(70deg, #4830A4 15%, #9786DF 50%)"
                bgClip="text"
                bgSize="150%"
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
          colSpan={{ md: 4 }}
          bg="#070707"
          rounded="lg"
          position="relative"
          overflow="hidden"
        >
          <Aurora
            hasBackground
            size={{ width: "300%", height: "200%" }}
            pos={{ top: "80%", left: "100%" }}
            color="#9786DF60"
          />
          <Flex h="full" position="relative" flexDir="column" px={14}>
            <Heading size="label.xl" lineHeight="1.2" py={12}>
              Collaborate with your team and{" "}
              <Link
                href="/deploy"
                bgGradient="linear-gradient(70deg, #4830A4 0%, #9786DF 65%)"
                bgClip="text"
                bgSize="150%"
                transition="background 0.5s ease"
                _hover={{ backgroundPosition: "100%" }}
              >
                manage permissions
              </Link>
            </Heading>
            <Image
              my="auto"
              w="full"
              src={require("/public/assets/landingpage/manage-permissions.png")}
              alt=""
            />
          </Flex>
        </GridItem>
        <GridItem
          colSpan={{ md: 9 }}
          bg="#070707"
          rounded="lg"
          position="relative"
          overflow="hidden"
        >
          <Aurora
            hasBackground
            size={{ width: "100%", height: "200%" }}
            pos={{ top: "50%", left: "50%" }}
            color="#9786DF60"
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
                <Link
                  href="/explore"
                  bgGradient="linear-gradient(70deg, #4830A4 5%, #9786DF 65%)"
                  bgClip="text"
                  bgSize="150%"
                  transition="background 0.5s ease"
                  _hover={{
                    backgroundPosition: "100%",
                  }}
                >
                  Automatic pre-built reports
                </Link>
                <br />
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
    </Layout>
  );
};
