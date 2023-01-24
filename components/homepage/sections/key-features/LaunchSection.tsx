import { Aurora } from "../../Aurora";
import { KeyFeatureLayout } from "./KeyFeatureLayout";
import { Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage as Image } from "components/Image";
import React from "react";
import { Heading, Link, Text } from "tw-components";

export const LaunchSection = () => {
  return (
    <KeyFeatureLayout
      title="Launch"
      titleGradient="linear-gradient(65deg, #C77FBE, #D19FD4)"
      headline="Simplified workflow to launch contracts on-chain."
      description="Deploy your contracts on-chain easily with a single command or through our Dashboard without requiring private keys."
    >
      <SimpleGrid columns={{ md: 2 }} gap={6}>
        <GridItem
          bg="#070707"
          rounded="lg"
          position="relative"
          overflow="hidden"
        >
          <Aurora
            zIndex="auto"
            size={{ width: "200%", height: "300%" }}
            pos={{ top: "-50%", left: "50%" }}
            color="#E8A7D960"
          />
          <Flex
            h="full"
            position="relative"
            flexDir="column"
            justify="space-between"
            py={12}
            px={14}
            gap={6}
          >
            <Heading size="label.xl" lineHeight="1.2">
              Ship your contracts on-chain effortlessly with{" "}
              <Link
                href="/deploy"
                bgGradient="linear-gradient(65deg, #C77FBE, #D19FD4, #C77FBE)"
                bgClip="text"
                bgSize="200%"
                transition="background 0.5s ease"
                _hover={{ bgPos: "100%" }}
              >
                Deploy
              </Link>
            </Heading>
            <Text
              color="whiteAlpha.700"
              textAlign={{ base: "center", md: "left" }}
            >
              A deployment workflow designed for you to collaborate easily with
              your dev team.
            </Text>
            <Image
              w="full"
              src={require("/public/assets/landingpage/launch-deploy.png")}
              alt=""
            />
          </Flex>
        </GridItem>
        <GridItem
          bg="#070707"
          rounded="lg"
          position="relative"
          overflow="hidden"
        >
          <Aurora
            zIndex="auto"
            size={{ width: "200%", height: "300%" }}
            pos={{ top: "-50%", left: "50%" }}
            color="#E8A7D960"
          />
          <Flex
            h="full"
            position="relative"
            flexDir="column"
            justify="space-between"
            py={12}
            px={14}
            gap={6}
          >
            <Heading size="label.xl" lineHeight="1.2">
              Publish your contracts with{" "}
              <Link
                href="/release"
                bgGradient="linear-gradient(65deg, #C77FBE, #D19FD4, #C77FBE)"
                bgClip="text"
                bgSize="200%"
                transition="background 0.5s ease"
                _hover={{ bgPos: "100%" }}
              >
                Release
              </Link>
            </Heading>
            <Text
              color="whiteAlpha.700"
              textAlign={{ base: "center", md: "left" }}
            >
              Be discovered by our community of over 70k+ world-class web3
              developers.
            </Text>
            <Image
              w="full"
              src={require("/public/assets/landingpage/launch-release.png")}
              alt=""
            />
          </Flex>
        </GridItem>
      </SimpleGrid>
    </KeyFeatureLayout>
  );
};
