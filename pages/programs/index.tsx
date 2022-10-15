import { Box, Flex } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ReleasedContractTable } from "components/contract-components/contract-table-v2";
// import { GettingStartedBox } from "components/getting-started/box";
// import { GettingStartedCard } from "components/getting-started/card";
import { PREBUILT_SOLANA_CONTRACTS_MAP } from "constants/mappings";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";
import { ReactElement } from "react";
// import { FiArrowRight } from "react-icons/fi";
import { Heading, Text } from "tw-components";

const Programs: ThirdwebNextPage = () => {
  const prebuiltSolContracts = Object.values(PREBUILT_SOLANA_CONTRACTS_MAP);

  return (
    <Flex gap={6} direction="column">
      {/* <GettingStartedBox
        title="Begin your journey with building programs"
        description="Which best describes your contract needs?"
        storageId="program"
      >
        <GettingStartedCard
          title="I want to get started with a prebuilt program"
          description={
            <>
              Browse our selection of programs that are ready to be deployed
              with 1-click.
            </>
          }
          icon={require("public/assets/product-icons/contracts.png")}
          linkProps={{
            category: "getting-started",
            label: "browse-contracts",
            href: "#release-contract-table",
            children: (
              <>
                Get Started <Icon as={FiArrowRight} />
              </>
            ),
          }}
        />
        <GettingStartedCard
          title="I want to build my own customized program"
          description={
            <>
              Get started with <b>ContractKit</b> to create custom contracts
              that is specific to your use case.
            </>
          }
          icon={require("public/assets/product-icons/extensions.png")}
          linkProps={{
            category: "getting-started",
            label: "custom-contracts",
            href: "https://portal.thirdweb.com/contractkit",
            isExternal: true,
            children: (
              <>
                View Docs <Icon as={FiArrowRight} />
              </>
            ),
          }}
        />
      </GettingStartedBox> */}

      <Heading>Programs</Heading>
      <Text fontStyle="italic">Prebuilt solana progams for you to deploy.</Text>
      <Box id="program-table">
        <ReleasedContractTable
          contractDetails={prebuiltSolContracts}
          isFetching={false}
          hideReleasedBy
        />
      </Box>
    </Flex>
  );
};

Programs.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

Programs.pageId = PageId.Programs;

export default Programs;
