import { NFTGetAllTable } from "./components/table";
import { Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { useLazyMint } from "@thirdweb-dev/react/solana";
import type { NFTDrop } from "@thirdweb-dev/sdk/solana";
import { NFTMintForm } from "contract-ui/tabs/nfts/components/mint-form";
import { FiPlus } from "react-icons/fi";
import { Button, Drawer, Heading } from "tw-components";

export const NFTDropPanel: React.FC<{
  program: NFTDrop;
}> = ({ program }) => {
  return (
    <Flex direction="column" gap={6}>
      <Flex direction="row" justify="space-between" align="center">
        <Heading size="title.sm">Program NFTs</Heading>
        <Flex gap={2} flexDir={{ base: "column", md: "row" }}>
          <NFTLazyMintButton program={program} />
        </Flex>
      </Flex>
      <NFTGetAllTable program={program} />
    </Flex>
  );
};

export const NFTLazyMintButton: React.FC<{ program: NFTDrop }> = ({
  program,
  ...restButtonProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useLazyMint(program);

  return (
    <>
      <Drawer
        allowPinchZoom
        preserveScrollBarGap
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
      >
        {/* TODO (sol) not cast as any here */}
        <NFTMintForm lazyMintMutation={mutation as any} ecosystem={"solana"} />
      </Drawer>
      <Button
        colorScheme="primary"
        leftIcon={<Icon as={FiPlus} />}
        {...restButtonProps}
        onClick={onOpen}
      >
        Single Upload
      </Button>
    </>
  );
};
