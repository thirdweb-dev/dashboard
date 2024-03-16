import {
  Box,
  DarkMode,
  Flex,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import { HomepageFooter } from "components/footer/Footer";
import { GetStartedSection } from "components/homepage/sections/GetStartedSection";
import { NewsletterSection } from "components/homepage/sections/NewsletterSection";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { Heading, Text, TrackedLink } from "tw-components";
import { ThirdwebNextPage } from "utils/types";
import { TEMPLATE_DATA, TemplateCardProps } from "./data/_templates";
import { TemplateTagId, TemplateTags } from "./data/_tags";
import TemplateWrapper from "./Wrapper";

const getDisplayTagFromTagId = (tagId: TemplateTagId) => {
  // "loyalty-card" -> "Loyalty Card"
  return TemplateTags.find((item) => item.id === tagId)?.displayValue || "";
};

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  title,
  description,
  img,
  hoverBorderColor,
  tags,
  authorENS,
  authorIcon,
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
            {tags.map((tag, idx) => {
              const tagValue = getDisplayTagFromTagId(tag);
              if (!tagValue) return null;
              return (
                <Box
                  as="a"
                  key={idx}
                  color="whiteAlpha.700"
                  border="1px solid #383838"
                  borderRadius="8px"
                  height="26px"
                  padding="6px 12px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
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
                    {tagValue}
                  </Text>
                </Box>
              );
            })}
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
        <Flex
          direction="row"
          alignItems="center"
          w="fit-content"
          ml="auto"
          mt={6}
        >
          <Image
            src={authorIcon}
            alt={`Icon of ${authorENS}`}
            width="16px"
            height="16px"
            mr={1}
          />
          <Text
            as="span"
            color="whiteAlpha.900"
            lineHeight={1.5}
            fontSize="12px"
            fontWeight={500}
            letterSpacing="-0.02em"
            opacity={0.75}
          >
            {authorENS}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
const title = "Web3 Templates for Websites & Apps";
const description =
  "Start building with a library of quick-start templates for web3 apps and websites — for NFTs, marketplaces, and more. Get started.";

const Templates: ThirdwebNextPage = () => {
  return (
    <TemplateWrapper
      title={title}
      description={description}
      data={TEMPLATE_DATA}
    >
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
          bgClip="text"
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
    </TemplateWrapper>
  );
};

Templates.pageId = PageId.Templates;

export default Templates;
