import { useDashboardNetwork } from "@3rdweb-sdk/react";
import { useWalletNFTs } from "@3rdweb-sdk/react/hooks/useWalletNFTs";
import {
  Center,
  Flex,
  FormControl,
  Icon,
  Image,
  Input,
  List,
  ListItem,
  Select,
  Spinner,
  Stack,
  Tooltip,
  useModalContext,
} from "@chakra-ui/react";
import {
  UseContractResult,
  useContractType,
  useCreateAuctionListing,
  useCreateDirectListing,
} from "@thirdweb-dev/react";
import {
  Marketplace,
  MarketplaceV3,
  NATIVE_TOKEN_ADDRESS,
  NewAuctionListing,
  NewDirectListing,
} from "@thirdweb-dev/sdk/evm";
import { detectFeatures } from "components/contract-components/utils";
import { CurrencySelector } from "components/shared/CurrencySelector";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { WalletNFT } from "lib/wallet/nfts/types";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { FormHelperText, FormLabel, Heading, Text } from "tw-components";
import { shortenIfAddress } from "utils/usedapp-external";

interface ListForm
  extends Omit<NewDirectListing, "type">,
    Omit<NewAuctionListing, "type"> {
  selected?: WalletNFT;
  listingType: "direct" | "auction";
  listingDurationInSeconds: string;
  quantity: string;
}

type NFTMintForm = {
  contractQuery:
    | UseContractResult<Marketplace>
    | UseContractResult<MarketplaceV3>;
  directList: ReturnType<typeof useCreateDirectListing>;
  auctionList: ReturnType<typeof useCreateAuctionListing>;
  formId: string;
  type?: "direct-listings" | "auction-listings";
};

export const CreateListingsForm: React.FC<NFTMintForm> = ({
  contractQuery,
  directList,
  auctionList,
  formId,
  type,
}) => {
  const trackEvent = useTrack();
  const network = useDashboardNetwork();

  const { data: contractType } = useContractType(
    contractQuery?.contract?.getAddress(),
  );

  const detectDirectListings = detectFeatures(contractQuery?.contract, [
    "DirectListings",
  ]);
  const detectEnglishAuctions = detectFeatures(contractQuery?.contract, [
    "EnglishAuctions",
  ]);

  const { data: nfts, isLoading: nftsLoading } = useWalletNFTs();

  const { watch, register, setValue, handleSubmit } = useForm<ListForm>({
    defaultValues: {
      selected: undefined,
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      quantity: "1",
      buyoutPricePerToken: "0",
      listingType:
        type === "direct-listings" || contractType === "marketplace"
          ? "direct"
          : "auction",
      reservePricePerToken: "0",
      startTimestamp: new Date(),
      listingDurationInSeconds: (60 * 60 * 24).toString(),
    },
  });

  const isSelected = (nft: WalletNFT) => {
    return (
      watch("selected")?.tokenId === nft.tokenId &&
      watch("selected")?.contractAddress === nft.contractAddress
    );
  };

  const noNfts = !nfts?.result?.length;

  const modalContext = useModalContext();

  const { onSuccess, onError } = useTxNotifications(
    "NFT listed successfully",
    "Failed to list NFT",
  );
  return (
    <Stack
      spacing={6}
      as="form"
      id={formId}
      onSubmit={handleSubmit((formData) => {
        if (!formData.selected) {
          return;
        }
        if (formData.listingType === "direct") {
          directList.mutate(
            {
              assetContractAddress: formData.selected.contractAddress,
              tokenId: formData.selected.tokenId,
              currencyContractAddress: formData.currencyContractAddress,
              quantity: formData.quantity,
              startTimestamp: formData.startTimestamp,
              // Hard code to year 2100 for now
              pricePerToken: formData.buyoutPricePerToken,
              endTimestamp: new Date(4102444800000),

              // Marketplace v1 params
              buyoutPricePerToken: formData.buyoutPricePerToken,
              // Hard code to 100 years for now
              listingDurationInSeconds: (60 * 60 * 24 * 365 * 100).toString(),
            },
            {
              onSuccess: () => {
                onSuccess();
                modalContext.onClose();
              },
              onError,
            },
          );
        } else if (formData.listingType === "auction") {
          auctionList.mutate(
            {
              assetContractAddress: formData.selected.contractAddress,
              tokenId: formData.selected.tokenId,
              quantity: formData.quantity,
              startTimestamp: formData.startTimestamp,
              currencyContractAddress: formData.currencyContractAddress,

              reservePricePerToken: formData.reservePricePerToken,
              // All tokens in the listing (not multipled by quantity)
              minimumBidAmount: (
                Number(formData.reservePricePerToken) *
                Number(formData.quantity)
              ).toString(),

              buyoutPricePerToken: formData.buyoutPricePerToken,
              // All tokens in the listing (not multipled by quantity)
              buyoutBidAmount: (
                Number(formData.buyoutPricePerToken) * Number(formData.quantity)
              ).toString(),

              listingDurationInSeconds: formData.listingDurationInSeconds,
              // Create endTimestamp with the current date + listingDurationInSeconds
              endTimestamp: new Date(
                new Date().getTime() +
                  parseInt(formData.listingDurationInSeconds) * 1000,
              ),

              // new ones (they were global before)
              /*               bidBufferBps: "0",
              timeBufferInSeconds: "0", */
            },
            {
              onSuccess: () => {
                onSuccess();
                trackEvent({
                  category: "marketplace",
                  action: "add-listing",
                  label: "success",
                  network,
                });
                modalContext.onClose();
              },
              onError: (error) => {
                trackEvent({
                  category: "marketplace",
                  action: "add-listing",
                  label: "error",
                  network,
                  error,
                });
                onError(error);
              },
            },
          );
        }
      })}
    >
      <FormControl>
        <Heading as={FormLabel} size="label.lg">
          Select NFT
        </Heading>
        <FormHelperText mb="8px">
          Select the NFTs you want to list for sale
        </FormHelperText>
        {nftsLoading ? (
          <Center height="60px">
            <Spinner />
          </Center>
        ) : nfts?.result?.length ? (
          <Flex gap={2} flexWrap="wrap">
            {nfts.result.map((nft, id) => {
              if (nft.metadata.image) {
                return (
                  <Tooltip key={id} label={<ListLabel nft={nft} />}>
                    <Image
                      src={nft.metadata.image || undefined}
                      width="140px"
                      height="140px"
                      alt={`${nft.metadata.name || ""}`}
                      borderRadius="md"
                      cursor="pointer"
                      onClick={() =>
                        isSelected(nft)
                          ? setValue("selected", undefined)
                          : setValue("selected", nft)
                      }
                      border={isSelected(nft) ? "5px solid" : undefined}
                      borderColor={isSelected(nft) ? "purple.500" : undefined}
                    />
                  </Tooltip>
                );
              }

              if (nft.metadata && nft.metadata.name) {
                return (
                  <Tooltip key={id} label={<ListLabel nft={nft} />}>
                    <Center
                      flexDirection="column"
                      width="140px"
                      height="140px"
                      borderRadius="md"
                      cursor="pointer"
                      onClick={() =>
                        isSelected(nft)
                          ? setValue("selected", undefined)
                          : setValue("selected", nft)
                      }
                      border={isSelected(nft) ? "5px solid" : undefined}
                      borderColor={isSelected(nft) ? "purple.500" : undefined}
                      bg="gray.200"
                    >
                      <Text>{nft.metadata?.name}</Text>
                    </Center>
                  </Tooltip>
                );
              }

              return (
                <Tooltip key={id} label={<ListLabel nft={nft} />}>
                  <Center
                    flexDirection="column"
                    width="140px"
                    height="140px"
                    borderRadius="md"
                    cursor="pointer"
                    onClick={() =>
                      isSelected(nft)
                        ? setValue("selected", undefined)
                        : setValue("selected", nft)
                    }
                    border={isSelected(nft) ? "5px solid" : undefined}
                    borderColor={isSelected(nft) ? "purple.500" : undefined}
                    bg="gray.200"
                  >
                    <Icon as={FaImage} boxSize={3} />
                  </Center>
                </Tooltip>
              );
            })}
          </Flex>
        ) : (
          <Stack
            direction="row"
            bg="orange.50"
            borderRadius="md"
            borderWidth="1px"
            borderColor="orange.100"
            align="center"
            padding="10px"
            spacing={3}
            _dark={{
              bg: "orange.800",
              borderColor: "orange.800",
            }}
          >
            <Icon
              as={FiInfo}
              color="orange.400"
              _dark={{ color: "orange.100" }}
              boxSize={6}
            />
            <Text color="orange.800" _dark={{ color: "orange.100" }}>
              There are no NFTs owned by this wallet. You need NFTs to create a
              listing.
            </Text>
          </Stack>
        )}
      </FormControl>
      <FormControl isDisabled={noNfts}>
        <Heading as={FormLabel} size="label.lg">
          Listing Type
        </Heading>
        <Select {...register("listingType")}>
          {contractType === "marketplace" ||
          (contractType === "marketplace-v3" && detectDirectListings) ? (
            <option value="direct">Direct</option>
          ) : null}
          {contractType === "marketplace" ||
          (contractType === "marketplace-v3" && detectEnglishAuctions) ? (
            <option value="auction">Auction</option>
          ) : null}
        </Select>
        <FormHelperText>
          The type of listing you want to create, either an auction or direct
          listing.
        </FormHelperText>
      </FormControl>
      <FormControl isRequired isDisabled={noNfts}>
        <Heading as={FormLabel} size="label.lg">
          Listing Currency
        </Heading>
        <CurrencySelector
          value={watch("currencyContractAddress")}
          onChange={(e) => setValue("currencyContractAddress", e.target.value)}
        />
        <FormHelperText>
          The currency you want to sell your tokens for.
        </FormHelperText>
      </FormControl>
      <FormControl isRequired isDisabled={noNfts}>
        <Heading as={FormLabel} size="label.lg">
          {watch("listingType") === "auction"
            ? "Buyout Price Per Token"
            : "Listing Price"}
        </Heading>
        <Input {...register("buyoutPricePerToken")} />
        <FormHelperText>
          {watch("listingType") === "auction"
            ? "The price per token a buyer can pay to instantly buyout the auction."
            : "The price of each token you are listing for sale."}
        </FormHelperText>
      </FormControl>
      {watch("selected")?.type?.toLowerCase() !== "erc721" && (
        <FormControl isRequired isDisabled={noNfts}>
          <Stack justify="space-between" direction="row">
            <Heading as={FormLabel} size="label.lg">
              Quantity
            </Heading>
            {/* {watch("selected") && (
                  <Text
                    color="primary.400"
                    cursor="pointer"
                    _hover={{ textDecor: "underline" }}
                  >
                    Max
                  </Text>
                )} */}
          </Stack>
          <Input {...register("quantity")} />
          <FormHelperText>
            The number of tokens to list for sale.
          </FormHelperText>
        </FormControl>
      )}
      {watch("listingType") === "auction" && (
        <>
          <FormControl isRequired isDisabled={noNfts}>
            <Heading as={FormLabel} size="label.lg">
              Reserve Price Per Token
            </Heading>
            <Input {...register("reservePricePerToken")} />
            <FormHelperText>
              The minimum price per token necessary to bid on this auction
            </FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <Heading as={FormLabel} size="label.lg">
              Auction Duration (Seconds)
            </Heading>
            <Input {...register("listingDurationInSeconds")} />
            <FormHelperText>
              The duration of this auction in seconds (86400 is one day)
            </FormHelperText>
          </FormControl>
        </>
      )}
    </Stack>
  );
};

interface ListLabelProps {
  nft: WalletNFT;
}

const ListLabel: React.FC<ListLabelProps> = ({ nft }) => {
  return (
    <List>
      <ListItem>
        <strong>Name:</strong> {nft.metadata?.name || "N/A"}
      </ListItem>
      <ListItem>
        <strong>Contract Address:</strong>{" "}
        {shortenIfAddress(nft.contractAddress)}
      </ListItem>
      <ListItem>
        <strong>Token ID: </strong> {nft.tokenId}
      </ListItem>
      <ListItem>
        <>
          <strong>Token Standard: </strong> {nft.type}
        </>
      </ListItem>
    </List>
  );
};
