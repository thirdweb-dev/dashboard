import { Aurora } from "../components/homepage/Aurora";
import {
  Box,
  DarkMode,
  Flex,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { PageId } from "page-id";
import { Heading, Text, TrackedLink } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

interface TemplateCardProps {
  id: string;
  title: string;
  description: React.ReactNode;
  img: string;
  hoverBorderColor: string;
}

export const templates: TemplateCardProps[] = [
  {
    id: "nft-drop",
    title: "NFT Drop",
    description:
      "Allow users to claim tokens under the criteria of claim conditions to receive ERC721 NFT(s).",
    img: "/assets/landingpage/GamingKit.png",
    hoverBorderColor: "hsl(248deg 89% 79% / 15%)",
  },
  {
    id: "pack",
    title: "Pack",
    description:
      "Release pack NFTs containing various NFTs and tokens and allow users to open random rewards.",
    img: "/assets/landingpage/GamingKit.png",
    hoverBorderColor: "hsl(309deg 54% 81% / 15%)",
  },
  {
    id: "marketplace",
    title: "Marketplace",
    description:
      "Allow holders of your NFTs to trade in a marketplace with a built-in escrow system.",
    img: "/assets/landingpage/GamingKit.png",
    hoverBorderColor: "hsl(309deg 54% 81% / 15%)",
  },
];

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  title,
  description,
  img,
  hoverBorderColor,
}) => {
  return (
    <Flex
      as={LinkBox}
      overflow="hidden"
      direction="column"
      zIndex={10}
      background="rgba(0,0,0,0.4)"
      boxShadow={`0 0 0 1px ${hoverBorderColor}`}
      borderRadius="8px"
      transition="box-shadow 300ms ease"
      _hover={{
        boxShadow: `0 0 80px ${hoverBorderColor}`,
      }}
    >
      <Image
        src={img}
        alt=""
        width="100%"
        height={{ lg: 250, base: 180 }}
        objectFit="cover"
      />
      <Flex
        direction="column"
        justifyContent="space-between"
        p={{ base: 6, lg: 8 }}
        py={{ base: 10 }}
        flexGrow={1}
      >
        <Box>
          <Heading as="h3" fontSize="24px" mb={3} bgClip="text">
            <TrackedLink
              as={LinkOverlay}
              href={`/template/${id}`}
              isExternal
              category="templates"
              label={title.toLowerCase()}
              color="white"
              _hover={{
                textDecoration: "none",
              }}
            >
              {title}
            </TrackedLink>
          </Heading>
          <Text size="body.lg" lineHeight={1.7} color="whiteAlpha.700">
            {description}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

const Templates: ThirdwebNextPage = () => {
  return (
    <DarkMode>
      <Flex
        sx={{
          // overwrite the theme colors because the home page is *always* in "dark mode"
          "--chakra-colors-heading": "#F2F2F7",
          "--chakra-colors-paragraph": "#AEAEB2",
          "--chakra-colors-borderColor": "rgba(255,255,255,0.1)",
        }}
        justify="center"
        flexDir="column"
        as="main"
        bg="#000"
      >
        <HomepageTopNav />
        <HomepageSection py={24} ml="auto" mr="auto">
          <Aurora
            pos={{ left: "10%", top: "60%" }}
            size={{ width: "2400px", height: "1800px" }}
            color="hsl(219deg 78% 30% / 25%)"
          />

          <Aurora
            pos={{ left: "90%", top: "60%" }}
            size={{ width: "2400px", height: "1800px" }}
            color="hsl(289deg 78% 30% / 25%)"
          />

          <Heading
            as="h3"
            fontSize={{ base: "32px", md: "48px" }}
            fontWeight={700}
            letterSpacing="-0.04em"
            mb={4}
            textAlign="center"
          >
            Explore templates.
          </Heading>
          <Text fontSize="20px" textAlign="center" size="body.lg" mb={14}>
            Kickstart your development process with ready-to-ship repositories.
          </Text>
          <SimpleGrid columns={{ lg: 3, base: 1 }} gap={6} margin="0 auto">
            {templates.map((template, idx) => (
              <TemplateCard key={template.title + idx} {...template} />
            ))}
          </SimpleGrid>
        </HomepageSection>
      </Flex>
    </DarkMode>
  );
};

Templates.pageId = PageId.Templates;

export default Templates;
