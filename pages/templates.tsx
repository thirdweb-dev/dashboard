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
  tags: string[];
}

export const templates: TemplateCardProps[] = [
  {
    id: "nft-drop",
    title: "NFT Drop",
    description:
      "Allow users to claim tokens under the criteria of claim conditions to receive ERC721 NFT(s).",
    img: "/assets/landingpage/GamingKit.png",
    hoverBorderColor: "hsl(248deg 89% 79% / 15%)",
    tags: ["ERC721", "Custom Claim Conditions"],
  },
  {
    id: "marketplace-v3",
    title: "Marketplace",
    description:
      "Allow holders of your NFTs to trade in a marketplace with a built-in escrow and auctioning system.",
    img: "/assets/landingpage/GamingKit.png",
    hoverBorderColor: "hsl(309deg 54% 81% / 15%)",
    tags: ["Multi-currency", "Buy & Sell"],
  },
  {
    id: "packs",
    title: "Pack",
    description:
      "Release pack NFTs containing various NFTs and tokens and allow users to open random rewards.",
    img: "/assets/landingpage/GamingKit.png",
    hoverBorderColor: "hsl(309deg 54% 81% / 15%)",
    tags: ["Randomized Rewards", "Lootbox Drop"],
  },
];

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  title,
  description,
  img,
  hoverBorderColor,
  tags,
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
        height={{ lg: 196, base: 196 }}
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
          <Heading as="h2" fontSize="20px" mb={3}>
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

          <Flex direction="row" alignItems="center" gap={1} mb={3}>
            {tags.map((tag, idx) => (
              <Box
                as="div"
                key={idx}
                color="whiteAlpha.700"
                border="1px solid #383838"
                borderRadius="8px"
                height="26px"
                padding="6px 12px"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Text
                  as="span"
                  fontSize="12px"
                  fontWeight={500}
                  lineHeight={1.2}
                  letterSpacing="-0.015em"
                  opacity={0.7}
                  color="whiteAlpha.900"
                >
                  {tag}
                </Text>
              </Box>
            ))}
          </Flex>

          <Text
            size="body.md"
            lineHeight={1.7}
            color="whiteAlpha.700"
            opacity={0.7}
          >
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
      >
        <HomepageTopNav />
        <HomepageSection py={24} ml="auto" mr="auto">
          <Heading
            as="h1"
            fontSize={{ base: "64px", md: "64px" }}
            fontWeight={700}
            letterSpacing="-0.04em"
            mb={4}
            textAlign="center"
          >
            Explore{" "}
            <Text
              fontSize={{ base: "64px", md: "64px" }}
              fontWeight={700}
              letterSpacing="-0.04em"
              as="span"
              bgGradient="linear-gradient(243.9deg, #BFA3DA 21.81%, #84309C 48.81%, #C735B0 86.61%);"
              bgClip={"text"}
            >
              templates
            </Text>
            .
          </Heading>
          <Text
            fontSize="20px"
            textAlign="center"
            size="body.lg"
            mb={14}
            fontWeight={500}
          >
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
