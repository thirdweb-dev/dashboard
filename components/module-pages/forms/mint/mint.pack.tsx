import { PropertiesFormControl } from "../properties.shared";
import { NFT } from "./shared/nft";
import { IMintFormProps } from "./types";
import {
  useModuleMetadataList,
  usePackCreateMutation,
  useSDK,
} from "@3rdweb-sdk/react";
import { useWeb3 } from "@3rdweb/hooks";
import {
  BundleMetadata,
  ModuleType,
  NFTMetadata,
  PackModule,
} from "@3rdweb/sdk";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
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
  Image,
  Input,
  Link,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
  useModalContext,
  useToast,
} from "@chakra-ui/react";
import { OpenSeaPropertyBadge } from "components/badges/opensea";
import { FileInput } from "components/shared/FileInput";
import { LinkButton } from "components/shared/LinkButton";
import { MismatchButton } from "components/shared/MismatchButton";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import { useSingleQueryParam } from "hooks/useQueryParam";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiChevronRight, FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import { PackTokenInput, PackTokenSchema } from "schema/tokens";
import { zodResolver } from "schema/zodResolver";
import { parseErrorToMessage } from "utils/errorParser";

const MINT_FORM_ID = "pack-mint-form";
interface IPackMintForm extends IMintFormProps {
  module: PackModule;
}

export const PackMintForm: React.FC<IPackMintForm> = ({ module }) => {
  const sdk = useSDK();
  const toast = useToast();
  const create = usePackCreateMutation(module);
  const modalContext = useModalContext();
  const network = useSingleQueryParam("network");
  const appAddress = useSingleQueryParam("app");
  const {
    setValue,
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PackTokenInput>({
    resolver: zodResolver(PackTokenSchema),
    defaultValues: {
      assets: [],
    },
  });

  const { address } = useWeb3();
  const { data: bundles } = useModuleMetadataList(appAddress, [
    ModuleType.BUNDLE,
  ]);

  const [step, setStep] = useState(0);
  const [nfts, setNfts] = useState<BundleMetadata[]>([]);
  const [bundlesLoading, setBundlesLoading] = useState(false);

  const assetContract = watch("assetContract");
  useEffect(() => {
    const getAssets = async () => {
      setBundlesLoading(true);
      const bundle = sdk?.getBundleModule(assetContract);
      const assets = await bundle?.getAll(address);
      setNfts(assets || []);
      setBundlesLoading(false);
    };

    if (assetContract) {
      getAssets();
    }
  }, [assetContract, sdk, address]);

  const onSuccess = () => {
    toast({
      title: "Success",
      description: "Pack created succesfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    modalContext.onClose();
  };

  const onError = (error: unknown) => {
    toast({
      title: "Error creating pack",
      description: parseErrorToMessage(error),
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const onSubmit = (data: PackTokenInput) => {
    create.mutate(data, { onSuccess, onError });
  };

  const editAsset = (tokenId: string, amount: string) => {
    const assets = watch("assets").map((asset) => {
      if (asset.tokenId === tokenId) {
        return { tokenId, amount };
      } else {
        return asset;
      }
    });

    setValue("assets", assets);
  };

  const removeAsset = (tokenId: string) => {
    const assets = watch("assets").filter((asset) => asset.tokenId !== tokenId);
    setValue("assets", assets);
  };

  const toggleAsset = (tokenId: string, amount: string) => {
    const token = watch("assets").find((asset) => asset.tokenId === tokenId);
    if (token) {
      removeAsset(tokenId);
    } else {
      const assets = [...watch("assets"), { tokenId, amount }];
      setValue("assets", assets);
    }
  };

  const setFile = (file: File) => {
    if (file.type.includes("image")) {
      // image files
      setValue("metadata.image", file);
      if (watch("metadata.external_url") instanceof File) {
        setValue("metadata.external_url", undefined);
      }
      if (watch("metadata.animation_url") instanceof File) {
        setValue("metadata.animation_url", undefined);
      }
    } else if (
      ["audio", "video", "text/html", "model/*"].some((type: string) =>
        file.type.includes(type),
      ) ||
      file.name.endsWith(".glb")
    ) {
      // audio, video, html, and glb (3d) files
      setValue("metadata.animation_url", file);
      if (watch("metadata.external_url") instanceof File) {
        setValue("metadata.external_url", undefined);
      }
    } else if (
      ["text", "application/pdf"].some((type: string) =>
        file.type.includes(type),
      )
    ) {
      // text and pdf files
      setValue("metadata.external_url", file);
      if (watch("metadata.animation_url") instanceof File) {
        setValue("metadata.animation_url", undefined);
      }
    }
  };

  const imageUrl = useImageFileOrUrl(watch("metadata.image"));
  const mediaFileUrl =
    watch("metadata.animation_url") instanceof File
      ? watch("metadata.animation_url")
      : watch("metadata.external_url") instanceof File
      ? watch("metadata.external_url")
      : watch("metadata.image") instanceof File
      ? imageUrl
      : undefined;

  const mediaFileError =
    watch("metadata.animation_url") instanceof File
      ? errors?.metadata?.animation_url
      : watch("metadata.external_url") instanceof File
      ? errors?.metadata?.external_url
      : watch("metadata.image") instanceof File
      ? errors?.metadata?.image
      : undefined;

  const externalUrl = watch("metadata.external_url");
  const externalIsTextFile =
    externalUrl instanceof File &&
    (externalUrl.type.includes("text") || externalUrl.type.includes("pdf"));

  const showCoverImageUpload =
    watch("metadata.animation_url") instanceof File ||
    watch("metadata.external_url") instanceof File;

  const noBundles = !bundles?.length;

  if (["mainnet", "polygon", "mumbai"].indexOf(network as string) < 0) {
    return (
      <DrawerBody>
        <Flex height="80vh" align="center" justify="center" direction="column">
          <Text size="label.lg" width="60%" mb="24px">
            Creating packs is currently not supported on this chain!
          </Text>
          <Button isDisabled colorScheme="primary">
            Coming soon
          </Button>
        </Flex>
      </DrawerBody>
    );
  }

  if (noBundles) {
    return (
      <DrawerBody>
        <Flex height="80vh" align="center" justify="center" direction="column">
          <Text size="label.lg" width="60%" mb="24px">
            You need to create a bundle module before you can create a pack!
          </Text>
          <LinkButton
            href={`/${network}/${appAddress}/new`}
            rightIcon={<Icon as={FiPlus} />}
            colorScheme="primary"
          >
            Add bundle module
          </LinkButton>
        </Flex>
      </DrawerBody>
    );
  }

  return (
    <>
      <DrawerBody>
        <Stack
          spacing={6}
          as="form"
          id={MINT_FORM_ID}
          onSubmit={handleSubmit(onSubmit)}
        >
          {step === 0 ? (
            <>
              <Stack>
                <Heading size="subtitle.md">Select Rewards</Heading>
                <Divider />
              </Stack>
              <FormControl>
                <FormLabel>Bundle Module</FormLabel>
                <Select
                  value={watch("assetContract")}
                  onChange={(e) => setValue("assetContract", e.target.value)}
                  placeholder="Select Bundle"
                >
                  {bundles?.map((bundle) => (
                    <option key={bundle.address} value={bundle.address}>
                      {bundle.metadata?.name} ({bundle.address.slice(0, 8)}...)
                    </option>
                  ))}
                </Select>
                <FormHelperText>
                  Select the bundle module to choose your pack&apos;s rewards
                  from.
                </FormHelperText>
                <FormErrorMessage>{errors?.assetContract}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <Flex>
                  <FormLabel>Available NFTs</FormLabel>
                  {watch("assetContract") && (
                    <Link
                      href={`/${network}/${appAddress}/bundle/${watch(
                        "assetContract",
                      )}/`}
                      target="_blank"
                    >
                      <Icon
                        as={FiEdit}
                        boxSize={4}
                        mt="3px"
                        color="gray.400"
                        cursor="pointer"
                        _hover={{ color: "blue.400" }}
                      />
                    </Link>
                  )}
                </Flex>
                {bundlesLoading ? (
                  <Flex
                    width="100%"
                    height="100px"
                    align="center"
                    justify="center"
                  >
                    <Spinner />
                  </Flex>
                ) : nfts.length ? (
                  <Flex flexWrap="wrap">
                    {nfts.map((nft) => (
                      <NFT
                        key={nft.metadata.id}
                        selected={
                          !!watch("assets").find(
                            (asset) => asset.tokenId === nft.metadata.id,
                          )
                        }
                        metadata={nft.metadata}
                        onClick={() =>
                          toggleAsset(
                            nft.metadata.id,
                            nft.ownedByAddress.toString(),
                          )
                        }
                      />
                    ))}
                  </Flex>
                ) : watch("assetContract") ? (
                  <Flex direction="column">
                    <FormHelperText mb="12px">
                      This bundle module has no NFTs. Add some NFTs to the
                      module first.
                    </FormHelperText>
                    <LinkButton
                      href={`/${network}/${appAddress}/bundle/${watch(
                        "assetContract",
                      )}`}
                      width="220px"
                      rightIcon={<Icon as={FiPlus} />}
                      colorScheme="primary"
                    >
                      Add NFTs to Bundle
                    </LinkButton>
                  </Flex>
                ) : (
                  <FormHelperText>
                    You have to select a bundle module to view available NFTs.
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Selected Rewards</FormLabel>
                {watch("assets").length ? (
                  <>
                    <FormHelperText mb="12px">
                      These are the rewards that will be wrapped in your pack.
                    </FormHelperText>
                    <Flex flexWrap="wrap">
                      {watch("assets").map((asset) => (
                        <Asset
                          key={asset.tokenId}
                          amount={asset.amount}
                          metadata={
                            nfts.find(
                              (nft) => nft.metadata.id === asset.tokenId,
                            )?.metadata as NFTMetadata
                          }
                          remove={() => removeAsset(asset.tokenId)}
                          onChange={(e) =>
                            editAsset(asset.tokenId, e.target.value)
                          }
                        />
                      ))}
                    </Flex>
                  </>
                ) : (
                  <FormHelperText>
                    You have no selected NFTs in this pack
                  </FormHelperText>
                )}
              </FormControl>
            </>
          ) : (
            <>
              <Stack>
                <Heading size="subtitle.md">
                  Pack Metadata &amp; Settings
                </Heading>
                <Divider />
              </Stack>
              <FormControl isRequired isInvalid={!!errors.metadata?.name}>
                <FormLabel>Name</FormLabel>
                <Input autoFocus {...register("metadata.name")} />
                <FormErrorMessage>
                  {errors?.metadata?.name?.message}
                </FormErrorMessage>
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
                <FormControl isInvalid={!!errors.metadata?.image}>
                  <FormLabel>Cover Image</FormLabel>
                  <FileInput
                    accept="image/*"
                    value={imageUrl}
                    showUploadButton
                    setValue={(file) => setValue("metadata.image", file)}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    transition="all 200ms ease"
                    _hover={{ shadow: "sm" }}
                  />
                  <FormHelperText>
                    You can optionally upload an image as the cover of your NFT.
                  </FormHelperText>
                  <FormErrorMessage>
                    {errors?.metadata?.image?.message}
                  </FormErrorMessage>
                </FormControl>
              )}
              <FormControl isInvalid={!!errors.metadata?.description}>
                <FormLabel>Description</FormLabel>
                <Textarea {...register("metadata.description")} />
                <FormErrorMessage>
                  {errors?.metadata?.description?.message}
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
                allowToggle={
                  !(
                    errors.metadata?.background_color ||
                    errors.metadata?.external_url
                  )
                }
                index={
                  errors.metadata?.background_color ||
                  errors.metadata?.external_url
                    ? [0]
                    : undefined
                }
              >
                <AccordionItem>
                  <AccordionButton px={0} justifyContent="space-between">
                    <Heading size="subtitle.md">
                      Advanced Metadata &amp; Settings
                    </Heading>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel px={0} as={Stack} spacing={6}>
                    <FormControl isInvalid={!!errors.rewardsPerOpen}>
                      <FormLabel>Rewards Per Open</FormLabel>
                      <Input {...register("rewardsPerOpen")} />
                      <FormHelperText>
                        Optionally set the number of rewards that each pack
                        contains (defaults to 1).
                      </FormHelperText>
                      <FormErrorMessage>
                        {errors?.rewardsPerOpen?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.metadata?.background_color}
                    >
                      <FormLabel>
                        Background Color <OpenSeaPropertyBadge />
                      </FormLabel>
                      <Input
                        max="6"
                        {...register("metadata.background_color")}
                      />
                      <FormHelperText>
                        Must be a six-character hexadecimal without a pre-pended
                        #.
                      </FormHelperText>
                      <FormErrorMessage>
                        {errors?.metadata?.background_color?.message}
                      </FormErrorMessage>
                    </FormControl>
                    {!externalIsTextFile && (
                      <FormControl isInvalid={!!errors.metadata?.external_url}>
                        <FormLabel>
                          External URL <OpenSeaPropertyBadge />
                        </FormLabel>
                        <Input {...register("metadata.external_url")} />
                        <FormHelperText>
                          This is the URL that will appear below the
                          asset&apos;s image on OpenSea and will allow users to
                          leave OpenSea and view the item on your site.
                        </FormHelperText>
                        <FormErrorMessage>
                          {errors?.metadata?.external_url?.message}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        {step === 0 ? (
          <Button
            isDisabled={create.isLoading}
            variant="outline"
            mr={3}
            onClick={modalContext.onClose}
          >
            Cancel
          </Button>
        ) : (
          <Button
            isDisabled={create.isLoading}
            variant="outline"
            mr={3}
            onClick={() => setStep(0)}
          >
            Back
          </Button>
        )}
        {step === 0 ? (
          <MismatchButton
            onClick={() => setStep(1)}
            isDisabled={!watch("assets").length}
            rightIcon={<Icon as={FiChevronRight} />}
            colorScheme="primary"
          >
            Next
          </MismatchButton>
        ) : (
          <MismatchButton
            isLoading={create.isLoading}
            leftIcon={<Icon as={FiPlus} />}
            form={MINT_FORM_ID}
            type="submit"
            colorScheme="primary"
          >
            Create Pack
          </MismatchButton>
        )}
      </DrawerFooter>
    </>
  );
};

interface IAsset {
  amount: string;
  metadata: NFTMetadata;
  remove: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Asset: React.FC<IAsset> = ({ metadata, amount, remove, onChange }) => {
  return (
    <Flex
      align="center"
      borderRadius="8px"
      padding="10px"
      width="100%"
      border="1px solid #EAEAEA"
      marginY="5px"
    >
      <Image
        alt=""
        w="100px"
        borderRadius="md"
        src={metadata?.image as string}
      />
      <Flex
        direction="column"
        justify="space-between"
        marginX="12px"
        height="100%"
        flexGrow={1}
      >
        <Text size="label.lg">{metadata.name}</Text>
        <Flex direction="column">
          <Text size="label.md" mb="4px">
            Quantity
          </Text>
          <Input value={amount} onChange={onChange} />
        </Flex>
      </Flex>

      <Flex height="100%" align="center" ml="20px">
        <Icon
          onClick={remove}
          as={FiTrash}
          color="gray.400"
          boxSize={5}
          cursor="pointer"
          _hover={{ color: "red.400" }}
        />
      </Flex>
    </Flex>
  );
};
