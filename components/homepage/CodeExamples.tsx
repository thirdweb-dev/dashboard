import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { LinkButton } from "components/shared/LinkButton";
import { useTrack } from "hooks/analytics/useTrack";
import { useState } from "react";

export const CodeExamples: React.FC = () => {
  const { trackEvent } = useTrack();
  const [tab, setTab] = useState("nft");

  return (
    <Flex id="developers" direction="column" bg="backgroundDark" pb="-100px">
      <Container
        maxW="container.page"
        position="relative"
        pt={["75px", "75px", "150px"]}
      >
        <Flex w="100%" align="center" direction="column" position="relative">
          <Flex
            maxW="container.lg"
            px={0}
            alignItems="center"
            direction="column"
          >
            <Heading
              w="100%"
              as="h2"
              mb="16px"
              variant="light"
              textAlign="center"
              size="display.md"
            >
              Powerful SDKs for all your needs
            </Heading>
            <Heading
              textAlign="center"
              size="subtitle.lg"
              color="paragraphLight"
            >
              Use our robust SDKs to take things into your own hands
              <Box display={{ base: "none", md: "block" }} /> and easily
              implement web3 features directly into your projects.
            </Heading>
            <Flex width="100%" mt="72px" justify="center" mb={7}>
              <Tab
                steps={3}
                title="Mint an NFT"
                selected={tab === "nft"}
                onClick={() => setTab("nft")}
              />
              <Tab
                steps={3}
                title="Make a collection"
                selected={tab === "collection"}
                onClick={() => setTab("collection")}
              />
              <Tab
                title="Create a currency"
                steps={3}
                selected={tab === "currency"}
                onClick={() => setTab("currency")}
              />
            </Flex>
            <ChakraNextImage
              alt=""
              maxW={{ lg: "calc(100% + 310px)" }}
              w={{ base: "100%", lg: "calc(100% + 310px)" }}
              placeholder="empty"
              src={
                tab === "nft"
                  ? require("/public/assets/landingpage/nft.png")
                  : tab === "collection"
                  ? require("/public/assets/landingpage/collection.png")
                  : require("/public/assets/landingpage/currency.png")
              }
            />
            <LinkButton
              noIcon
              bgColor="twurple.500"
              colorScheme="twurple"
              _hover={{ bgColor: "twurple.600" }}
              borderRadius="full"
              href="https://portal.thirdweb.com/learn"
              isExternal
              px={8}
              position="absolute"
              bottom={70}
              size="lg"
              fontSize={{ base: "md", md: "lg" }}
              onClick={() =>
                trackEvent({
                  category: "home",
                  action: "click",
                  label: "explore-docs",
                })
              }
            >
              Explore documentation & guides
            </LinkButton>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

const Tab: React.FC<{
  steps: number;
  title: string;
  selected: boolean;
  onClick: () => void;
}> = ({ steps, title, selected, onClick }) => {
  return (
    <Flex
      cursor="pointer"
      onClick={onClick}
      align="center"
      direction="column"
      width={{ base: "30%", lg: "320px" }}
      m={2.5}
      mb={0}
      justify="flex-end"
      role="group"
    >
      <Text
        size="subtitle.sm"
        fontWeight="500"
        color={selected ? "white" : "gray.400"}
        _groupHover={{ color: "white" }}
      >
        {steps} steps to
      </Text>
      <Heading
        mt={1}
        size="title.md"
        fontWeight="bold"
        color={selected ? "white" : "gray.400"}
        _groupHover={{ color: "white" }}
        textAlign="center"
      >
        {title}
      </Heading>
      <Flex
        width="100%"
        height="4px"
        mt="14px"
        bg={selected ? "twurple.500" : "rgba(255, 255, 255, 0.5)"}
        _groupHover={{ bgColor: selected ? "twurple.500" : "white" }}
      />
    </Flex>
  );
};
