import {
  AspectRatio,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileInput } from "components/forms/FileInput";
import { Card } from "components/layout/Card";
import { useActiveCollectionModule } from "context/sdk/modules/collection-context";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import usePropertiesBuilder from "hooks/usePropertiesBuilder";
import React, { useCallback, useState } from "react";
import { FieldValues, useForm, UseFormWatch } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { useId } from "react-id-generator";
import { CollectionTokenInput, CollectionTokenSchema } from "schema/tokens";
import { safeyfyMetadata } from "utils/ipfs";

interface IMintModal {
  isOpen: boolean;
  onClose: () => void;
}
export const MintModal: React.FC<IMintModal> = ({ isOpen, onClose }) => {
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CollectionTokenSchema),
    defaultValues: {
      amount: "1",
      image: "",
      name: "",
      description: "",
    },
  });

  const [isMinting, setIsMinting] = useState(false);
  const [formId] = useId(1, "collection-mint-form");

  const imageUrl = useImageFileOrUrl(watch("image"));
  const { module, refresh } = useActiveCollectionModule((c) => c);

  const { Builder: PropertiesBuilder, properties } = usePropertiesBuilder();

  const onSubmit: (data: CollectionTokenInput) => Promise<void> = useCallback(
    async (data) => {
      data.properties = properties;
      console.log("*** nft form data", { data });
      if (!module) {
        return;
      }

      setIsMinting(true);

      try {
        const metadata = await safeyfyMetadata(data);
        delete metadata["amount"];

        const newNft = await module?.createAndMint({
          metadata,
          supply: data.amount,
        });

        console.log("*** new nft minted", newNft);
        await refresh();
      } catch (err) {
        console.error("minting failed!", err);
      } finally {
        setIsMinting(false);

        onClose();
      }
    },
    [module, onClose, refresh, properties],
  );

  return (
    <Modal isCentered size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={Heading}>Mint New Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing={8}>
            <Center flexGrow={1} maxW="md">
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
                    <Heading size="sm">{watch("name")}</Heading>
                    <Text>Initial Supply: {watch("amount")}</Text>
                    <Text>{watch("description")}</Text>
                  </Stack>
                </Card>
              </Stack>
            </Center>

            <Stack>
              <Heading size="sm">Properties</Heading>

              <form id={formId} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <FormControl isRequired isInvalid={!!errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input {...register("name")} />
                    <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.image}>
                    <FormLabel>Image</FormLabel>
                    <AspectRatio ratio={1} maxW="150px">
                      <FileInput
                        boxProps={
                          imageUrl
                            ? {
                                borderRadius: "md",
                                backgroundImage: `url(${imageUrl})`,
                                backgroundPosition: "center",
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                              }
                            : { border: "1px dashed", borderRadius: "md" }
                        }
                        name="image"
                        setValue={setValue}
                        watch={watch as unknown as UseFormWatch<FieldValues>}
                      >
                        {!imageUrl && <Icon boxSize={6} as={FiUpload} />}
                      </FileInput>
                    </AspectRatio>
                    <FormHelperText>
                      For best results should be square and a minimum of 350px
                      by 350px.
                    </FormHelperText>
                    <FormErrorMessage>
                      {errors?.image?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.description}>
                    <FormLabel>Description</FormLabel>
                    <Textarea {...register("description")} />
                    <FormErrorMessage>
                      {errors?.description?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.amount}>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      type="number"
                      step="1"
                      pattern="[0-9]"
                      {...register("amount")}
                    />
                    <FormErrorMessage>
                      {errors?.amount?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Custom Properties</FormLabel>
                    {PropertiesBuilder}
                  </FormControl>
                </Stack>
              </form>
            </Stack>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isMinting}
            type="submit"
            form={formId}
            colorScheme="teal"
            mr={3}
          >
            Mint
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
