import { NFTList } from "./nft-list";
import { Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { NFTCollection } from "@thirdweb-dev/solana";
import { NFTMintForm } from "contract-ui/tabs/nfts/components/mint-form";
import { useSolMintNFT } from "program-ui/hooks/program";
import { FiPlus } from "react-icons/fi";
import { Button, Drawer, Heading } from "tw-components";

export const NFTCollectionPanel: React.FC<{
  account: NFTCollection;
}> = ({ account }) => {
  return (
    <Flex direction="column" gap={6}>
      <Flex direction="row" justify="space-between" align="center">
        <Heading size="title.sm">Program NFTs</Heading>
        <Flex gap={2} flexDir={{ base: "column", md: "row" }}>
          <NFTMintButton account={account} />
        </Flex>
      </Flex>
      <NFTList account={account} />
    </Flex>
  );
};

export const NFTMintButton: React.FC<{ account: NFTCollection }> = ({
  account,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useSolMintNFT(account);
  return (
    <>
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
      >
        <NFTMintForm mintMutation={mutation} ecosystem={"solana"} />
      </Drawer>
      <Button
        colorScheme="primary"
        leftIcon={<Icon as={FiPlus} />}
        {...restButtonProps}
        onClick={onOpen}
      >
        Mint
      </Button>
    </>
  );
};
