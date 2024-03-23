import { PageId } from "page-id";
import { Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";
import { TEMPLATE_DATA } from "./data/_templates";
import TemplateWrapper from "./components/Wrapper";
import { useRouter } from "next/router";
import { TemplateTagId, TemplateTags } from "./data/_tags";
import { useState } from "react";

const title = "Web3 Templates for Websites & Apps";
const description =
  "Start building with a library of quick-start templates for web3 apps and websites — for NFTs, marketplaces, and more. Get started.";

const Templates: ThirdwebNextPage = () => {
  const router = useRouter();
  const query = router.query as { tags: string };
  const queriedTags: string[] = query.tags
    ? query.tags
        .split(",")
        // Remove any strings that are not valid tag ids
        .filter((tag) => TemplateTags.find((o) => o.id === tag))
    : [];
  const templates = queriedTags.length
    ? TEMPLATE_DATA.filter((item) =>
        queriedTags.every((_tag) => item.tags.includes(_tag as TemplateTagId)),
      )
    : TEMPLATE_DATA;
  return (
    <>
      <TemplateWrapper
        title={title}
        description={description}
        data={templates}
        showFilterMenu={true}
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
    </>
  );
};

Templates.pageId = PageId.Templates;

export default Templates;
