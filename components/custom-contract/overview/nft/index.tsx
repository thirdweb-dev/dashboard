import { ButtonGroup, Flex, Icon } from "@chakra-ui/react";
import { useNFTMint } from "@thirdweb-dev/react";
import type { Erc721 } from "@thirdweb-dev/sdk";
import { MismatchButton } from "components/buttons/MismatchButton";
import { useTxNotifications } from "hooks/useTxNotifications";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { FiPlus } from "react-icons/fi";
import { Heading } from "tw-components";

const QueryAllTable = dynamic(() => import("./query-all-table"));

interface NftOverviewPageProps {
  contract: Erc721<any>;
}

const NftOverviewPage: React.VFC<NftOverviewPageProps> = ({ contract }) => {
  const { onSuccess, onError } = useTxNotifications(
    "Successfully minted",
    "Failed to mint",
  );
  const { mutate, isLoading } = useNFTMint(contract);

  const contractSupportsMinting = useMemo(() => {
    return !!contract.mint?.toSelf;
  }, [contract]);

  return (
    <Flex direction="column" gap={6}>
      <Flex direction="row" justify="space-between" align="center">
        <Heading size="title.sm">Contract Tokens</Heading>
        <ButtonGroup>
          <MismatchButton
            isDisabled={!contractSupportsMinting}
            isLoading={isLoading}
            loadingText="Minting..."
            leftIcon={<Icon as={FiPlus} />}
            colorScheme="primary"
            onClick={() => {
              mutate(
                {
                  name: "test mint!",
                  image:
                    "ipfs://QmfCbqqDLJqH1YncGP4Ci4Mm6s4Pf1qwTBWYSTGvM6PBeL/0.png",
                },
                { onSuccess, onError },
              );
            }}
          >
            {contractSupportsMinting ? "Mint" : "Minting not supported"}
          </MismatchButton>
        </ButtonGroup>
      </Flex>
      {contract.query?.all ? <QueryAllTable contract={contract} /> : null}
    </Flex>
  );
};

export default NftOverviewPage;
