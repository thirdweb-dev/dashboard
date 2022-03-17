import {
  AspectRatio,
  Button,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Currency, CurrencyModule, NFTMetadata } from "@nftlabs/sdk";
import { Card } from "components/layout/Card";
import { useActiveCollectionModule } from "context/sdk/modules/collection-context";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useId } from "react-id-generator";
import { NFTTokenOutput } from "schema/tokens";
import { NFTListingSchema, NFTListingInput } from "schema/markets";
import { AddressZero } from "@ethersproject/constants";
import { useMarketContext } from "context/sdk/modules/market-context";
import { useSDK } from "context/sdk/sdk-context";
import { parseUnits } from "@ethersproject/units";
import { BigNumber, ethers } from "ethers";

interface IListModal {
  metadata?: NFTMetadata & NFTTokenOutput;

  isOpen: boolean;
  onClose: () => void;
}
export const ListModal: React.FC<IListModal> = ({
  metadata,
  isOpen,
  onClose,
}) => {
  const sdk = useSDK();
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NFTListingSchema),
    defaultValues: {
      currency: AddressZero,
      price: "0",
      marketplace: "",
    },
  });

  const { markets, isLoading } = useMarketContext((c) => c);

  const [currency, setCurrency] = useState<Currency | null>(null);
  const [currencyAddress, setCurrencyAddress] = useState<string>(AddressZero);
  const [isMinting, setIsMinting] = useState(false);
  const [formId] = useId(1, "nft-list-form");

  const imageUrl = useImageFileOrUrl(metadata?.image);
  // const bgColor = useSafeColorHex(watch("background_color"));
  const { module, refresh } = useActiveCollectionModule((c) => c);

  const onSubmit: (data: NFTListingInput) => Promise<void> = useCallback(
    async (data) => {
      console.log("*** nft form data", { data });
      if (!module || !sdk) {
        return;
      }

      const market = markets.find(
        (m) => m.address.toLowerCase() === data.marketplace.toLowerCase(),
      );
      console.log("market", market);
      if (!market) {
        return;
      }

      setIsMinting(true);

      try {
        const marketModule = sdk.getMarketModule(market.address);
        const list = await marketModule.list(
          module.address,
          metadata?.id as string,
          currencyAddress,
          parseUnits(data.price, currency?.decimals ?? 18),
          1,
        );

        // const newNft = await module?.mint(await safeyfyMetadata(data));
        console.log(list);

        // console.log("*** new nft minted", newNft);
        await refresh();
      } catch (err) {
        console.error("minting failed!", err);
      } finally {
        setIsMinting(false);

        onClose();
      }
    },
    [
      sdk,
      currency,
      currencyAddress,
      markets,
      module,
      onClose,
      refresh,
      metadata,
    ],
  );

  useEffect(() => {
    if (!module) {
      return;
    }

    const subscription = watch(async (value, { name, type }) => {
      if (name === "currency") {
        if (
          value.currency &&
          value.currency !== AddressZero &&
          ethers.utils.isAddress(value.currency)
        ) {
          const cm = sdk?.getCurrencyModule(value.currency) || null;
          if (cm) {
            setCurrencyAddress(cm.address);
            setCurrency(await cm.get());
          } else {
            setCurrencyAddress(AddressZero);
            setCurrency(null);
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [sdk, module, watch]);

  return (
    <Modal isCentered size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={Heading}>List NFT on Marketplace</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing={8}>
            <Center flexGrow={1}>
              <Stack>
                <Heading size="sm">Preview</Heading>
                <Card _hover={{ boxShadow: "md" }}>
                  <Stack spacing={2}>
                    <AspectRatio ratio={1} w="350px">
                      <Center
                        // backgroundColor={bgColor}
                        borderRadius="md"
                        overflow="hidden"
                      >
                        {imageUrl && (
                          <Image
                            backgroundRepeat="no-repeat"
                            objectFit="contain"
                            w="100%"
                            h="100%"
                            src={imageUrl}
                          />
                        )}
                      </Center>
                    </AspectRatio>
                    <Heading size="sm">{metadata?.name}</Heading>
                    <Text>{metadata?.description}</Text>
                    <Divider />
                    {(watch("price") ?? "0") === "0" ? (
                      <Text>Free</Text>
                    ) : (
                      <Text>
                        {watch("price") ?? "0"} {currency?.symbol}{" "}
                        {currency?.name ? `(${currency?.name})` : null}
                      </Text>
                    )}
                  </Stack>
                </Card>
              </Stack>
            </Center>

            <Stack minWidth="sm">
              {isLoading ? (
                <Spinner />
              ) : markets.length === 0 ? (
                <>
                  <Heading size="md">No marketplace found</Heading>
                  <Text>
                    Add a Market module in your application to get started!
                  </Text>
                </>
              ) : (
                <>
                  <Heading size="sm">Listing</Heading>
                  <form id={formId} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={4}>
                      <FormControl isRequired isInvalid={!!errors.marketplace}>
                        <FormLabel>Select your Marketplace</FormLabel>
                        <RadioGroup defaultValue={markets[0].address}>
                          <Stack {...register("marketplace")}>
                            {markets.map((m) => (
                              <Radio key={m.address} value={m.address}>
                                {m.metadata?.name ?? m.address}
                              </Radio>
                            ))}
                          </Stack>
                        </RadioGroup>
                        <FormErrorMessage>
                          {errors?.marketplace?.message}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isRequired isInvalid={!!errors.currency}>
                        <FormLabel>Currency Address</FormLabel>
                        <Input {...register("currency")} />
                        <FormErrorMessage>
                          {errors?.currency?.message}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isRequired isInvalid={!!errors.price}>
                        <FormLabel>Price</FormLabel>
                        <Input
                          type="number"
                          step="any"
                          {...register("price")}
                        />
                        <FormErrorMessage>
                          {errors?.price?.message}
                        </FormErrorMessage>
                      </FormControl>
                    </Stack>
                  </form>
                </>
              )}
            </Stack>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isMinting}
            hidden={markets && markets.length > 0 ? false : true}
            type="submit"
            form={formId}
            colorScheme="teal"
            mr={3}
          >
            List
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
// price
// token
// marketplace
