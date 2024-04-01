import { GetStaticPaths, GetStaticProps } from "next";
import { ThirdwebNextPage } from "utils/types";
import { PageId } from "page-id";
import TemplateWrapper from "../../../components/templates/Wrapper";
import { useRouter } from "next/router";
import { TEMPLATE_TAGS, TemplateTagId } from "data/templates/tags";
import { TEMPLATE_DATA, TemplateCardProps } from "data/templates/templates";

type TagPageProps = {
  tag: (typeof TEMPLATE_TAGS)[number];
  templates: TemplateCardProps[];
};

const TemplateTagPage: ThirdwebNextPage = (props: TagPageProps) => {
  const router = useRouter();
  const keyword = (router?.query?.keyword as string) || "";
  return (
    <TemplateWrapper
      key={String(router.isReady)}
      title={`${props.tag.displayValue} templates`}
      description={`Explore ${props.tag.displayValue} templates`}
      data={props.templates}
      _defaultKeyword={keyword}
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
    const tag = TEMPLATE_TAGS.find((t) => t.id === tagId);
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
    paths: TEMPLATE_TAGS.map((tag) => ({
      params: {
        tagId: tag.id,
      },
    })),
  };
};
