import { useModuleMetadataList } from "@3rdweb-sdk/react";
import {
  useTokenList,
  useWrapTokenMutation,
} from "@3rdweb-sdk/react/hooks/useCollection";
import { BundleModule, ModuleType } from "@3rdweb/sdk";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  DrawerBody,
  DrawerFooter,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
  useModalContext,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { OpenSeaPropertyBadge } from "components/badges/opensea";
import { FileInput } from "components/shared/FileInput";
import { LinkButton } from "components/shared/LinkButton";
import { MismatchButton } from "components/shared/MismatchButton";
import { BigNumber, ethers } from "ethers";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { WrappedTokenInput, WrappedTokenSchema } from "schema/tokens";
import { parseErrorToMessage } from "utils/errorParser";
import { PropertiesFormControl } from "../properties.shared";

const MINT_FORM_ID = "wrapped-token-mint-form";

interface IFormProps {
  module?: BundleModule;
}

export const WrappedTokenMintForm: React.FC<IFormProps> = ({ module }) => {
  const toast = useToast();
  const modalContext = useModalContext();
  const appAddress = useSingleQueryParam("app");
  const network = useSingleQueryParam("network");
  const { data: tokens, isLoading } = useTokenList();
  const { mutate: wrap, isLoading: isWrapLoading } =
    useWrapTokenMutation(module);
  const { data: tokenModules, isLoading: isTokenModulesLoading } =
    useModuleMetadataList(appAddress, [ModuleType.TOKEN]);
  const [selected, setSelected] = useState<number>(-1);

  const {
    setValue,
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<WrappedTokenInput>({
    resolver: zodResolver(WrappedTokenSchema),
    defaultValues: {
      tokenAmount: "1",
      supply: "1",
    },
  });

  const isDisabled =
    !parseFloat(watch("tokenAmount")) ||
    !parseFloat(watch("supply")) ||
    !watch("name") ||
    !tokens?.length ||
    selected < 0 ||
    selected > tokens.length;

  useEffect(() => {
    if (selected >= 0 && selected < tokens?.length) {
      setValue(
        "tokenAmount",
        ethers.utils.formatUnits(
          tokens[selected].balance,
          tokens[selected].decimals,
        ),
      );
    }
  }, [selected, tokens, setValue]);

  const onSubmit = (data: WrappedTokenInput) => {
    if (isDisabled) {
      return;
    }

    const { tokenAmount: amount, supply: tokenSupply, ...metadata } = data;
    const tokenAmount = ethers.utils.parseUnits(
      amount,
      tokens[selected].decimals,
    );
    const supply = BigNumber.from(tokenSupply);

    wrap(
      {
        tokenContract: tokens[selected].token_address,
        tokenAmount,
        args: {
          metadata,
          supply,
        },
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Token wrapped successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          modalContext.onClose();
        },
        onError: (error) => {
          toast({
            title: "Error wrapping token",
            description: parseErrorToMessage(error),
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      },
    );
  };

  const setFile = (file: File) => {
    if (file.type.includes("image")) {
      // image files
      setValue("image", file);
      if (watch("external_url") instanceof File) {
        setValue("external_url", undefined);
      }
      if (watch("animation_url") instanceof File) {
        setValue("animation_url", undefined);
      }
    } else if (
      ["audio", "video", "text/html", "model/*"].some((type: string) =>
        file.type.includes(type),
      ) ||
      file.name.endsWith(".glb")
    ) {
      // audio, video, html, and glb (3d) files
      setValue("animation_url", file);
      if (watch("external_url") instanceof File) {
        setValue("external_url", undefined);
      }
    } else if (
      ["text", "application/pdf"].some((type: string) =>
        file.type.includes(type),
      )
    ) {
      // text and pdf files
      setValue("external_url", file);
      if (watch("animation_url") instanceof File) {
        setValue("animation_url", undefined);
      }
    }
  };

  const imageUrl = useImageFileOrUrl(watch("image"));
  const mediaFileUrl =
    watch("animation_url") instanceof File
      ? watch("animation_url")
      : watch("external_url") instanceof File
      ? watch("external_url")
      : watch("image") instanceof File
      ? imageUrl
      : undefined;

  const mediaFileError =
    watch("animation_url") instanceof File
      ? errors?.animation_url
      : watch("external_url") instanceof File
      ? errors?.external_url
      : watch("image") instanceof File
      ? errors?.image
      : undefined;

  const externalUrl = watch("external_url");
  const externalIsTextFile =
    externalUrl instanceof File &&
    (externalUrl.type.includes("text") || externalUrl.type.includes("pdf"));

  const showCoverImageUpload =
    watch("animation_url") instanceof File ||
    watch("external_url") instanceof File;

  return (
    <>
      <DrawerBody>
        <Stack spacing={6}>
          {isLoading ? (
            <Flex width="100%" height="100px" align="center" justify="center">
              <Spinner />
            </Flex>
          ) : tokens?.length ? (
            <Stack
              spacing={6}
              as="form"
              id={MINT_FORM_ID}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack>
                <Heading size="subtitle.md">Token Wrapping</Heading>
                <Divider />
              </Stack>
              <FormControl isRequired>
                <FormLabel size="label.lg">Select Token</FormLabel>
                <Select
                  placeholder="Select token..."
                  onChange={(e) => setSelected(parseInt(e.target.value))}
                >
                  {tokens?.map((token: any, index: number) => (
                    <option key={token.token_address} value={index}>
                      {token.symbol
                        ? `${token.symbol} ${token.name && `(${token.name})`}`
                        : token.name}
                    </option>
                  ))}
                </Select>
                <FormHelperText>
                  The token that you want to wrap into your bundle.
                </FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <Flex justify="space-between" align="center">
                  <FormLabel size="label.lg">Token Amount</FormLabel>
                  {selected >= 0 && selected < tokens?.length && (
                    <Text
                      color="blue.400"
                      cursor="pointer"
                      _hover={{
                        textDecoration: "underline",
                      }}
                      onClick={() =>
                        setValue(
                          "tokenAmount",
                          ethers.utils.formatUnits(
                            tokens[selected].balance,
                            tokens[selected].decimals,
                          ),
                        )
                      }
                    >
                      Max
                    </Text>
                  )}
                </Flex>
                <Input {...register("tokenAmount")} type="number" />
                <FormHelperText>
                  The amount of the selected token that you want to wrap.
                </FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <FormLabel size="label.lg">NFT Supply</FormLabel>
                <Input
                  value={watch("supply")}
                  onChange={(e) =>
                    setValue(
                      "supply",
                      parseInt(e.target.value || "0").toString(),
                    )
                  }
                  onFocus={(e) => e.target.select()}
                />
                <FormHelperText>
                  Choose the number of NFTs that you want to create from the
                  wrapped tokens (the wrapped tokens will be divided among your
                  NFTs).
                </FormHelperText>
              </FormControl>
              <Stack>
                <Heading size="subtitle.md">NFT Metadata</Heading>
                <Divider />
              </Stack>
              <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input autoFocus {...register("name")} />
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!mediaFileError}>
                <FormLabel>Media</FormLabel>
                <FileInput
                  value={mediaFileUrl}
                  showUploadButton
                  setValue={setFile}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  transition="all 200ms ease"
                  _hover={{ shadow: "sm" }}
                />
                <FormHelperText>
                  You can upload image, audio, video, html, text, pdf, and 3d
                  model files here.
                </FormHelperText>
                <FormErrorMessage>{mediaFileError?.message}</FormErrorMessage>
              </FormControl>
              {showCoverImageUpload && (
                <FormControl isInvalid={!!errors.image}>
                  <FormLabel>Cover Image</FormLabel>
                  <FileInput
                    accept="image/*"
                    value={imageUrl}
                    showUploadButton
                    setValue={(file) => setValue("image", file)}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    transition="all 200ms ease"
                    _hover={{ shadow: "sm" }}
                  />
                  <FormHelperText>
                    You can optionally upload an image as the cover of your NFT.
                  </FormHelperText>
                  <FormErrorMessage>{errors?.image?.message}</FormErrorMessage>
                </FormControl>
              )}
              <FormControl isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea {...register("description")} />
                <FormErrorMessage>
                  {errors?.description?.message}
                </FormErrorMessage>
              </FormControl>
              <PropertiesFormControl
                watch={watch}
                errors={errors}
                control={control}
                register={register}
                setValue={setValue}
              />
              <Accordion
                allowToggle={!(errors.background_color || errors.external_url)}
                index={
                  errors.background_color || errors.external_url
                    ? [0]
                    : undefined
                }
              >
                <AccordionItem>
                  <AccordionButton px={0} justifyContent="space-between">
                    <Heading size="subtitle.md">Advanced Metadata</Heading>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel px={0} as={Stack} spacing={6}>
                    <FormControl isInvalid={!!errors.background_color}>
                      <FormLabel>
                        Background Color <OpenSeaPropertyBadge />
                      </FormLabel>
                      <Input max="6" {...register("background_color")} />
                      <FormHelperText>
                        Must be a six-character hexadecimal without a pre-pended
                        #.
                      </FormHelperText>
                      <FormErrorMessage>
                        {errors?.background_color?.message}
                      </FormErrorMessage>
                    </FormControl>
                    {!externalIsTextFile && (
                      <FormControl isInvalid={!!errors.external_url}>
                        <FormLabel>
                          External URL <OpenSeaPropertyBadge />
                        </FormLabel>
                        <Input {...register("external_url")} />
                        <FormHelperText>
                          This is the URL that will appear below the
                          asset&apos;s image on OpenSea and will allow users to
                          leave OpenSea and view the item on your site.
                        </FormHelperText>
                        <FormErrorMessage>
                          {errors?.external_url?.message}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>
          ) : (
            <Stack spacing={6}>
              <Text>
                You have no wrappable tokens in your wallet on this network. You
                can get tokens on DEXs like SushiSwap or mint them from your own
                Token module.
              </Text>
              <Stack direction="row">
                {tokenModules?.length && !isTokenModulesLoading ? (
                  <LinkButton
                    href={`/${network}/${appAddress}/token/${tokenModules[0].address}`}
                    colorScheme="primary"
                  >
                    Visit Token Module
                  </LinkButton>
                ) : (
                  <LinkButton
                    href={`/${network}/${appAddress}/new`}
                    colorScheme="primary"
                  >
                    Create Token
                  </LinkButton>
                )}
                <LinkButton
                  href="https://app.sushi.com/en/swap"
                  colorScheme="primary"
                  isExternal
                >
                  Visit SushiSwap
                </LinkButton>
              </Stack>
            </Stack>
          )}
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        <MismatchButton
          isLoading={isWrapLoading}
          isDisabled={isDisabled}
          leftIcon={<Icon as={FiPlus} />}
          type="submit"
          colorScheme="primary"
          form={MINT_FORM_ID}
        >
          Wrap
        </MismatchButton>
      </DrawerFooter>
    </>
  );
};
