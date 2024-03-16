import { GetStaticPaths, GetStaticProps } from "next";
import { TemplateTagId, TemplateTags } from "../data/_tags";
import { TEMPLATE_DATA, TemplateCardProps } from "../data/_templates";
import { ThirdwebNextPage } from "utils/types";
import { PageId } from "page-id";
import TemplateWrapper from "../Wrapper";

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
      <></>
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
