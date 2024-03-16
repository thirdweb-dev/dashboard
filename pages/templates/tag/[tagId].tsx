import { GetStaticPaths, GetStaticProps } from "next";
import { TemplateTagId, TemplateTags } from "../data/_tags";
import { TEMPLATE_DATA, TemplateCardProps } from "../data/_templates";
import { ThirdwebNextPage } from "utils/types";
import { PageId } from "page-id";
import TemplateWrapper from "../Wrapper";
import { Heading, Text } from "tw-components";

type TagPageProps = {
  tag: (typeof TemplateTags)[number];
  templates: TemplateCardProps[];
};

const TemplateTagPage: ThirdwebNextPage = (props: TagPageProps) => {
  return (
    <TemplateWrapper
      title={`${props.tag.displayValue} templates`}
      description=""
      data={props.templates}
    >
      <Heading
        as="h1"
        fontSize={{ base: "64px", md: "64px" }}
        fontWeight={700}
        letterSpacing="-0.04em"
        mb={4}
        textAlign="center"
      >
        {props.tag.displayValue}{" "}
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
    </TemplateWrapper>
  );
};

export default TemplateTagPage;
TemplateTagPage.pageId = PageId.TemplateTagPage;

export const getStaticProps: GetStaticProps<TagPageProps> = async (ctx) => {
  try {
    const { tagId } = ctx.params as { tagId: TemplateTagId };
    const tag = TemplateTags.find((t) => t.id === tagId);
    if (!tag) {
      return {
        notFound: true,
      };
    }
    const templates = TEMPLATE_DATA.filter((item) =>
      item.tags.includes(tag.id),
    );
    return {
      props: {
        tag,
        templates,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: false,
    paths: TemplateTags.map((tag) => ({
      params: {
        tagId: tag.id,
      },
    })),
  };
};
