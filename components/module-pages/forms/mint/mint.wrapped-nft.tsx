import { useModuleMetadataList } from "@3rdweb-sdk/react";
import {
  useAssetList,
  useWrapNFTMutation,
} from "@3rdweb-sdk/react/hooks/useCollection";
import { BundleModule, ModuleType } from "@3rdweb/sdk";
import {
  DrawerBody,
  DrawerFooter,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
  useModalContext,
  useToast,
} from "@chakra-ui/react";
import { LinkButton } from "components/shared/LinkButton";
import { MismatchButton } from "components/shared/MismatchButton";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { parseErrorToMessage } from "utils/errorParser";
import { NFT } from "./shared/nft";

interface IFormProps {
  module?: BundleModule;
}

export const WrappedNFTMintForm: React.FC<IFormProps> = ({ module }) => {
  const toast = useToast();
  const modalContext = useModalContext();
  const appAddress = useSingleQueryParam("app");
  const network = useSingleQueryParam("network");
  const { data: assets, isLoading } = useAssetList();
  const { mutate: wrap, isLoading: isWrapLoading } = useWrapNFTMutation(module);
  const { data: nfts, isLoading: isNFTsLoading } = useModuleMetadataList(
    appAddress,
    [ModuleType.NFT],
  );
  const [selected, setSelected] = useState<number>(-1);

  const wrapNFT = () => {
    if (assets?.length) {
      wrap(
        {
          tokenContract: assets[selected].token_address,
          tokenId: assets[selected].token_id,
          metadata: assets[selected].metadata,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "NFT wrapped successfully",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            modalContext.onClose();
          },
          onError: (error) => {
            toast({
              title: "Error wrapping NFT",
              description: parseErrorToMessage(error),
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          },
        },
      );
    }
  };

  return (
    <>
      <DrawerBody>
        <Stack spacing={6}>
          {isLoading ? (
            <Flex width="100%" height="100px" align="center" justify="center">
              <Spinner />
            </Flex>
          ) : assets?.length ? (
            <Stack>
              <Text size="label.lg">Select NFT</Text>
              <Text>
                Select the NFT that you want to wrap into your bundle.
              </Text>
              <Flex flexWrap="wrap">
                {assets?.map((asset: any, index: number) => (
                  <NFT
                    key={`${asset.token_address}-${asset.token_id}`}
                    selected={selected === index}
                    metadata={asset.metadata}
                    onClick={() => setSelected(index)}
                  />
                ))}
              </Flex>
            </Stack>
          ) : (
            <Stack spacing={6}>
              <Text>
                You have no wrappable NFTs in your wallet on this network. You
                can get NFTs on marketplaces like OpenSea or create them from
                your own NFT Collection module.
              </Text>
              <Stack direction="row">
                {nfts?.length && !isNFTsLoading ? (
                  <LinkButton
                    href={`/${network}/${appAddress}/nft-collection/${nfts[0].address}`}
                    colorScheme="primary"
                  >
                    Visit Collection Module
                  </LinkButton>
                ) : (
                  <LinkButton
                    href={`/${network}/${appAddress}/new`}
                    colorScheme="primary"
                  >
                    Create NFT Collection
                  </LinkButton>
                )}
                <LinkButton
                  href="https://opensea.io/"
                  colorScheme="primary"
                  isExternal
                >
                  Visit OpenSea
                </LinkButton>
              </Stack>
            </Stack>
          )}
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        <MismatchButton
          isLoading={isWrapLoading}
          isDisabled={
            !assets?.length || selected < 0 || selected > assets.length
          }
          leftIcon={<Icon as={FiPlus} />}
          type="submit"
          colorScheme="primary"
          onClick={wrapNFT}
        >
          Wrap
        </MismatchButton>
      </DrawerFooter>
    </>
  );
};
