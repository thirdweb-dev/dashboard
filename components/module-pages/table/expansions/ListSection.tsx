import {
  useMarketListMutation,
  useModuleMetadataList,
  useModuleTypeOfModule,
} from "@3rdweb-sdk/react";
import {
  useMarketplaceListAuctionMutation,
  useMarketplaceListDirectMutation,
} from "@3rdweb-sdk/react/hooks/useMarketplace";
import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { ModuleType } from "@3rdweb/sdk";
import { Flex, Heading, Stack } from "@chakra-ui/layout";
import {
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Link,
  Select,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Card } from "components/layout/Card";
import { CurrencySelector } from "components/shared/CurrencySelector";
import { MismatchButton } from "components/shared/MismatchButton";
import { useNetworkUrl } from "hooks/useHref";
import { useSingleQueryParam } from "hooks/useQueryParam";
import NextLink from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IoAlertCircleOutline,
  IoChevronForwardCircleSharp,
} from "react-icons/io5";
import { MdOutlineSell } from "react-icons/md";
import {
  ListingInput,
  ListingSchema,
  MarketListingInput,
  MarketplaceAuctionInput,
  MarketplaceListingInput,
} from "schema/marketplaces";
import { zodResolver } from "schema/zodResolver";
import { parseErrorToMessage } from "utils/errorParser";
import { useTableContext } from "../table-context";

interface IListSection {
  tokenId: string;
  module?: EitherBaseModuleType;
}

export const ListSection: React.FC<IListSection> = ({ tokenId, module }) => {
  const toast = useToast();
  const network = useNetworkUrl();
  const moduleType = useModuleTypeOfModule(module);
  const appAddress = useSingleQueryParam("app");
  const { closeAllRows } = useTableContext();
  const { data: marketModules, isLoading: marketLoading } =
    useModuleMetadataList(appAddress, [ModuleType.MARKET]);
  const { data: marketplaceModules, isLoading: marketplaceLoading } =
    useModuleMetadataList(appAddress, [ModuleType.MARKETPLACE]);
  const { data: currencies, isLoading: currencyLoading } =
    useModuleMetadataList(appAddress, [ModuleType.CURRENCY]);
  const { mutate: directList, isLoading: isListing } =
    useMarketplaceListDirectMutation();
  const { mutate: auctionList, isLoading: isListingAuction } =
    useMarketplaceListAuctionMutation();
  const list = useMarketListMutation();

  const [listingType, setListingType] = useState<"direct" | "auction">(
    "direct",
  );
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ListingSchema),
    defaultValues: {
      currencyContractAddress: "",
      startTimeInSeconds: parseInt((Date.now() / 1000).toString()),
      listingDurationInSeconds: 86400,
      reservePricePerToken: "0",
      currency: "",
      price: "0",
      marketplace: "",
      quantity: 1,
    },
  });

  const validMarkets = useMemo(() => {
    if (marketModules && marketplaceModules) {
      return [...marketModules, ...marketplaceModules];
    }
  }, [marketModules, marketplaceModules]);

  const marketplace = watch("marketplace");
  const isAuctionDisabled = useMemo(() => {
    const marketModule = validMarkets?.find(
      (m) => marketplace.toLowerCase() === m.address.toLowerCase(),
    );

    if (marketModule?.type === ModuleType.MARKET) {
      return true;
    }
  }, [marketplace, validMarkets]);

  const isMarketplace = useMemo(() => {
    const marketModule = validMarkets?.find(
      (m) => marketplace.toLowerCase() === m.address.toLowerCase(),
    );

    if (marketModule?.type === ModuleType.MARKETPLACE) {
      return true;
    }

    return false;
  }, [validMarkets, marketplace]);

  const canSetQuantity = useMemo(() => {
    if (moduleType === ModuleType.BUNDLE || moduleType === ModuleType.PACK) {
      return true;
    }

    return false;
  }, [moduleType]);

  useEffect(() => {
    if (isAuctionDisabled) {
      setListingType("direct");
    }
  }, [isAuctionDisabled]);

  const onSubmit = useCallback(
    async (data: ListingInput) => {
      if (!isMarketplace) {
        list.mutate(
          {
            ...data,
            tokenId,
            assetContractAddress: module?.address,
            listingDurationInSeconds: Number.MAX_SAFE_INTEGER - 1,
          } as MarketListingInput,
          {
            onSuccess: () => {
              toast({
                title: "Success",
                description: "Listing created successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              closeAllRows();
            },
            onError: (error) => {
              toast({
                title: "Error creating listing",
                description: parseErrorToMessage(error),
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            },
          },
        );
      } else {
        if (listingType === "auction") {
          auctionList(
            {
              ...data,
              tokenId: parseInt(tokenId),
              assetContractAddress: module?.address,
            } as MarketplaceAuctionInput,
            {
              onSuccess: () => {
                toast({
                  title: "Success",
                  description: "Auction created successfully",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                closeAllRows();
              },
              onError: (error) => {
                toast({
                  title: "Error creating auction",
                  description: parseErrorToMessage(error),
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              },
            },
          );
        } else {
          directList(
            {
              ...data,
              tokenId: parseInt(tokenId),
              assetContractAddress: module?.address,
              listingDurationInSeconds: Number.MAX_SAFE_INTEGER - 1,
            } as MarketplaceListingInput,
            {
              onSuccess: () => {
                toast({
                  title: "Success",
                  description: "Listing created successfully",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                closeAllRows();
              },
              onError: (error) => {
                toast({
                  title: "Error creating listing",
                  description: parseErrorToMessage(error),
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              },
            },
          );
        }
      }
    },
    [
      closeAllRows,
      list,
      module?.address,
      toast,
      tokenId,
      directList,
      auctionList,
      isMarketplace,
      listingType,
    ],
  );

  return (
    <Stack spacing={6} maxW="80vw">
      <Heading size="md">List NFT on Marketplace</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <Flex
            flexGrow={1}
            align="center"
            justify="space-between"
            direction={["column", "column", "row"]}
          >
            <Stack as={Card} w={["100%", "100%", "33%"]}>
              <Heading size="sm">Choose Marketplace</Heading>
              {marketLoading || marketplaceLoading ? (
                <Spinner />
              ) : validMarkets?.length === 0 ? (
                <Stack spacing={1}>
                  <Stack direction="row" color="red.500">
                    <Icon as={IoAlertCircleOutline} />
                    <Heading size="sm">You have no marketplaces</Heading>
                  </Stack>
                  <Text fontSize="sm">
                    <NextLink href={`${network}/${appAddress}/new`} passHref>
                      <Link color="teal">Add a Market module</Link>
                    </NextLink>{" "}
                    to your application to get started.
                  </Text>
                </Stack>
              ) : (
                <Stack spacing={6}>
                  {validMarkets?.length === 0 ? (
                    <Stack spacing={1}>
                      <Stack direction="row" color="red.500">
                        <Icon as={IoAlertCircleOutline} />
                        <Heading size="sm">
                          You need a new marketplace to create an auction
                        </Heading>
                      </Stack>
                      <Text fontSize="sm">
                        <NextLink
                          href={`${network}/${appAddress}/new`}
                          passHref
                        >
                          <Link color="teal">Add a new marketplace module</Link>
                        </NextLink>{" "}
                        to your application to get started.
                      </Text>
                    </Stack>
                  ) : (
                    <FormControl
                      isDisabled={list.isLoading}
                      isRequired
                      isInvalid={!!errors.marketplace}
                    >
                      <Select {...register("marketplace")}>
                        <option value="">Select a Marketplace</option>
                        {validMarkets?.map((market) => (
                          <option key={market.address} value={market.address}>
                            {market.metadata?.name || market.address}
                          </option>
                        ))}
                      </Select>
                      <FormHelperText>
                        Pick the marketplace you would like to list on.
                      </FormHelperText>
                      <FormErrorMessage>
                        {errors.marketplace?.message}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Stack>
              )}
              <FormControl isDisabled={list.isLoading || isAuctionDisabled}>
                <Select
                  value={listingType}
                  onChange={(e) =>
                    setListingType(e.target.value as "direct" | "auction")
                  }
                >
                  <option value="direct">Direct Listing</option>
                  <option value="auction">Auction</option>
                </Select>
                <FormHelperText>
                  {isAuctionDisabled
                    ? "You need to use a new marketplace module to create an auction."
                    : "Pick the type of listing you would like to use."}
                </FormHelperText>
                <FormErrorMessage>
                  {errors.marketplace?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Icon
              flexShrink={0}
              m={4}
              color="gray.200"
              boxSize={[8, 8, 8]}
              as={IoChevronForwardCircleSharp}
              transform={["rotate(90deg)", "rotate(90deg)", "none"]}
            />

            <Stack
              height="100%"
              flexGrow={1}
              as={Card}
              w={["100%", "100%", "33%"]}
              opacity={watch("marketplace") ? 1 : 0.6}
            >
              <Heading size="sm">Choose ERC20 Token</Heading>
              <Stack>
                {currencyLoading ? (
                  <Spinner />
                ) : currencies?.length === 0 && !isMarketplace ? (
                  <Stack spacing={1}>
                    <Stack direction="row" color="red.500">
                      <Icon as={IoAlertCircleOutline} />
                      <Heading size="sm">You have no own currencies</Heading>
                    </Stack>
                    <Text fontSize="sm">
                      <NextLink href={`${network}/${appAddress}/new`} passHref>
                        <Link color="teal">Add a Token module</Link>
                      </NextLink>{" "}
                      to your application to use your own token.
                    </Text>
                  </Stack>
                ) : (
                  <FormControl
                    isRequired
                    isInvalid={!!errors.currency}
                    isDisabled={!watch("marketplace") || list.isLoading}
                  >
                    <CurrencySelector
                      onChange={(e) => {
                        setValue(
                          isMarketplace
                            ? "currencyContractAddress"
                            : "currency",
                          e.target.value,
                          {
                            shouldDirty: true,
                          },
                        );
                      }}
                      value={watch(
                        isMarketplace ? "currencyContractAddress" : "currency",
                      )}
                      small
                      hideDefaultCurrencies={!isMarketplace}
                    />
                    <FormHelperText>
                      Select the currency to list your token for.
                    </FormHelperText>
                    <FormErrorMessage>
                      {errors.currency?.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Stack>
            </Stack>
            <Icon
              flexShrink={0}
              m={4}
              color="gray.200"
              boxSize={[8, 8, 8]}
              as={IoChevronForwardCircleSharp}
              transform={["rotate(90deg)", "rotate(90deg)", "none"]}
            />
            <Stack
              as={Card}
              w={["100%", "100%", "33%"]}
              opacity={
                watch("currency") || watch("currencyContractAddress") ? 1 : 0.6
              }
            >
              <Stack>
                <Heading size="sm">Listing Details</Heading>
                <FormControl
                  isRequired
                  isInvalid={!!errors.price}
                  isDisabled={
                    (!watch("currency") && !watch("currencyContractAddress")) ||
                    list.isLoading
                  }
                >
                  <FormLabel>
                    {listingType === "auction" && "Buyout "}Price
                  </FormLabel>
                  <Input type="number" step="any" {...register("price")} />
                  <FormHelperText>
                    {listingType === "auction"
                      ? "If this isn't set to 0, it will be the price for someone to instantly purchase the listing and bypass the auction."
                      : "Set the price of your listing."}
                  </FormHelperText>
                  <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                </FormControl>
              </Stack>
              {canSetQuantity && (
                <Stack>
                  <FormControl
                    isRequired
                    isInvalid={!!errors.quantity}
                    isDisabled={
                      (!watch("currency") &&
                        !watch("currencyContractAddress")) ||
                      list.isLoading
                    }
                  >
                    <FormLabel>Quantity</FormLabel>
                    <Input type="number" {...register("quantity")} />
                    <FormHelperText>
                      How many would you like to list?
                    </FormHelperText>
                    <FormErrorMessage>
                      {errors.quantity?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              )}
              {listingType === "auction" && (
                <>
                  <Stack>
                    <FormControl
                      isRequired
                      isInvalid={!!errors.reservePricePerToken}
                    >
                      <FormLabel>Floor Price</FormLabel>
                      <Input
                        type="number"
                        step="any"
                        {...register("reservePricePerToken")}
                      />
                      <FormHelperText>
                        The minimum bid needed for the auction to go through.
                      </FormHelperText>
                      <FormErrorMessage>
                        {errors.reservePricePerToken?.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isRequired
                      isInvalid={!!errors.listingDurationInSeconds}
                    >
                      <FormLabel>Auction Duration</FormLabel>
                      <Input
                        type="number"
                        step="any"
                        value={watch("listingDurationInSeconds")}
                        onChange={(e) =>
                          setValue(
                            "listingDurationInSeconds",
                            parseInt(e.target.value || "0"),
                          )
                        }
                        onFocus={(e) => e.target.select()}
                      />
                      <FormHelperText>
                        How long do you want the auction to last (in seconds)?
                      </FormHelperText>
                      <FormErrorMessage>
                        {errors.listingDurationInSeconds?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                </>
              )}
            </Stack>
          </Flex>
          <Divider />
          <Center>
            <MismatchButton
              leftIcon={<Icon as={MdOutlineSell} />}
              isLoading={list.isLoading || isListing || isListingAuction}
              isDisabled={
                !watch("marketplace") ||
                (!watch("currency") && !watch("currencyContractAddress")) ||
                watch("quantity") === undefined
              }
              type="submit"
              colorScheme="primary"
            >
              List Now
            </MismatchButton>
          </Center>
        </Stack>
      </form>
    </Stack>
  );
};
