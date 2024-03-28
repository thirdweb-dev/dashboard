import { PageId } from "page-id";
import { Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";
import { TEMPLATE_DATA } from "./data/_templates";
import TemplateWrapper, { filterTemplates } from "./components/Wrapper";
import { TemplateTagId, TemplateTags } from "./data/_tags";
import { GetServerSidePropsContext } from "next";

const title = "Web3 Templates for Websites & Apps";
const description =
  "Start building with a library of quick-start templates for web3 apps and websites — for NFTs, marketplaces, and more. Get started.";

const Templates: ThirdwebNextPage = (props: TemplatePageProps) => {
  const { _defaultTagIds, _defaultTemplates, _defaultKeyword } = props;
  return (
    <>
      <TemplateWrapper
        title={title}
        description={description}
        data={_defaultTemplates}
        showFilterMenu={true}
        _defaultTagIds={_defaultTagIds}
        _defaultKeyword={_defaultKeyword}
      >
        <></>
      </TemplateWrapper>
    </>
  );
};

Templates.pageId = PageId.Templates;

export default Templates;

type TemplatePageProps = {
  _defaultTagIds: TemplateTagId[];
  _defaultTemplates: (typeof TEMPLATE_DATA)[number][];
  _defaultKeyword?: string;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { tags, keyword } = context.query;
  let _defaultTagIds: TemplateTagId[] = [];
  if (tags) {
    _defaultTagIds = tags
      ? ((tags as string)
          .split(",")
          // Remove invalid tags
          .filter((tag) =>
            TemplateTags.find((o) => o.id === tag),
          ) as TemplateTagId[])
      : [];
  }
  const _defaultTemplates = filterTemplates(_defaultTagIds, keyword as string);
  const data: TemplatePageProps = {
    _defaultTagIds,
    _defaultTemplates,
    _defaultKeyword: (keyword as string) || "",
  };
  return {
    props: data,
  };
}
