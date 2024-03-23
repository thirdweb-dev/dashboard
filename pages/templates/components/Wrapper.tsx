import {
  DarkMode,
  Flex,
  LinkBox,
  SimpleGrid,
  Image,
  Box,
  LinkOverlay,
} from "@chakra-ui/react";
import { HomepageFooter } from "components/footer/Footer";
import { GetStartedSection } from "components/homepage/sections/GetStartedSection";
import { NewsletterSection } from "components/homepage/sections/NewsletterSection";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { NextSeo } from "next-seo";
import { Heading, Text, TrackedLink } from "tw-components";
import { TEMPLATE_DATA, TemplateCardProps } from "../data/_templates";
import { TemplateTagId, TemplateTags } from "../data/_tags";
import { ReactNode, useState } from "react";
import FilterMenu from "./FilterMenu";
import { FiSearch } from "react-icons/fi";

type TemplateWrapperProps = {
  title: string;
  description: string;
  data: TemplateCardProps[];
  children: ReactNode;
  showFilterMenu?: boolean;
  _defaultTagIds: TemplateTagId[];
};

export default function TemplateWrapper(props: TemplateWrapperProps) {
  const { title, description, data, children, showFilterMenu, _defaultTagIds } =
    props;
  const [selectedTags, setSelectedTags] =
    useState<TemplateTagId[]>(_defaultTagIds);
  const templates = showFilterMenu
    ? selectedTags.length
      ? TEMPLATE_DATA.filter((item) =>
          selectedTags.every((tagId) => item.tags.includes(tagId)),
        )
      : TEMPLATE_DATA
    : data;

  return (
    <DarkMode>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
        }}
      />
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
          {children}
          {showFilterMenu && (
            <Box display={{ base: "block", lg: "none" }}>
              <FilterMenu
                queriedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </Box>
          )}
          <Flex direction={{ base: "column", lg: "row" }} gap={4}>
            {showFilterMenu && (
              <Box
                display={{ base: "none", lg: "block" }}
                // position="sticky"
                // top="40"
              >
                <FilterMenu
                  queriedTags={selectedTags}
                  expandAll={true}
                  setSelectedTags={setSelectedTags}
                />
              </Box>
            )}
            {templates.length > 0 ? (
              <SimpleGrid
                columns={{ lg: 3, md: 2, base: 1 }}
                gap={6}
                margin="0 auto"
              >
                {templates.map((template, idx) => (
                  <TemplateCard key={template.title + idx} {...template} />
                ))}
              </SimpleGrid>
            ) : (
              <Flex flexDir="column" justifyItems={"center"} width={"full"}>
                <Box marginX={"auto"}>
                  <FiSearch size={50} />
                </Box>
                <Text align={"center"} mt={"20px"}>
                  No results found. Try adjusting your filters.
                </Text>
              </Flex>
            )}
          </Flex>
        </HomepageSection>
      </Flex>
      <GetStartedSection />
      <NewsletterSection />
      <HomepageFooter />
    </DarkMode>
  );
}

export const getDisplayTagFromTagId = (tagId: TemplateTagId) => {
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
              href={`/templates/${id}`}
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
              if (!tagValue) {
                return null;
              }
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
                  href={`/templates/tag/${tag}`}
                  _hover={{ borderColor: "white", "& > *": { opacity: 1 } }}
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
