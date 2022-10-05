import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  Stack,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFillEye } from "@react-icons/all-files/ai/AiFillEye";
import { AiFillEyeInvisible } from "@react-icons/all-files/ai/AiFillEyeInvisible";
import type { NFTMetadataInput } from "@thirdweb-dev/sdk";
import { TransactionButton } from "components/buttons/TransactionButton";
import { FileInput } from "components/shared/FileInput";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import { MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  Checkbox,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Text,
} from "tw-components";
import { ComponentWithChildren } from "types/component-with-children";
import z from "zod";

interface SelectOptionProps {
  name: string;
  description: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
  disabledText?: string;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  name,
  description,
  isActive,
  onClick,
  disabled,
  disabledText,
}) => {
  return (
    <Tooltip
      label={
        disabled && (
          <Card bgColor="backgroundHighlight">
            <Text>{disabledText}</Text>
          </Card>
        )
      }
      bg="transparent"
      boxShadow="none"
      p={0}
      shouldWrapChildren
    >
      <Stack
        as={Card}
        padding={5}
        width={{ base: "inherit", md: "350px" }}
        borderRadius="md"
        borderColor={isActive ? "primary.500" : undefined}
        onClick={onClick}
        cursor={disabled ? "not-allowed" : "pointer"}
        pointerEvents={disabled ? "none" : undefined}
        bgColor={disabled ? "backgroundHighlight" : undefined}
      >
        <Stack flexDirection="row" alignItems="start" spacing={0} cursor="">
          <Radio
            cursor="pointer"
            size="lg"
            colorScheme="blue"
            mt={0.5}
            mr={2.5}
            isChecked={isActive}
            isDisabled={disabled}
          />
          <Stack ml={4} flexDirection="column" alignSelf="start">
            <Heading size="subtitle.sm" fontWeight="700" mb={0}>
              {name}
            </Heading>
            <Text size="body.sm" mt="4px">
              {description}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Tooltip>
  );
};

const DelayedRevealSchema = z
  .object({
    name: z.string().min(1, "A name is required").optional(),
    image: z.any().optional(),
    description: z.string().or(z.string().length(0)).optional(),
    password: z.string().min(1, "A password is required.").optional(),
    shuffle: z.boolean().default(false),
    selectedReveal: z.string(),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password.")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type DelayedRevealInput = z.infer<typeof DelayedRevealSchema>;
interface SelectRevealProps {
  nftData: NFTMetadataInput[];
  ecosystem?: "evm" | "solana";
  isRevealable: boolean;
  onSubmit: (formData: {
    name?: string | undefined;
    image?: any;
    description?: string | undefined;
    password?: string | undefined;
    confirmPassword?: string | undefined;
    shuffle: boolean;
    selectedReveal: string;
  }) => void;
}

export const SelectReveal: ComponentWithChildren<SelectRevealProps> = ({
  nftData,
  ecosystem = "evm",
  isRevealable,
  onSubmit,
  children,
}) => {
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DelayedRevealInput>({
    resolver: zodResolver(DelayedRevealSchema),
  });

  const imageUrl = useImageFileOrUrl(watch("image"));
  return (
    <Flex flexDir="column">
      <Flex
        gap={{ base: 3, md: 6 }}
        mb={6}
        flexDir={{ base: "column", md: "row" }}
      >
        <SelectOption
          name="Reveal upon mint"
          description="Collectors will immediately see the final NFT when they complete the minting"
          isActive={watch("selectedReveal") === "instant"}
          onClick={() => setValue("selectedReveal", "instant")}
        />
        <SelectOption
          name="Delayed Reveal"
          description="Collectors will mint your placeholder image, then you reveal at a later time"
          isActive={watch("selectedReveal") === "delayed"}
          onClick={() => setValue("selectedReveal", "delayed")}
          disabled={!isRevealable}
          disabledText="Your contract doesn't implement Delayed Reveal"
        />
      </Flex>
      <Flex>
        {watch("selectedReveal") === "instant" ? (
          <Flex
            flexDir="column"
            gap={2}
            as="form"
            onSubmit={handleSubmit((data) => onSubmit(data))}
          >
            <Text size="body.md" color="gray.600">
              You&apos;re ready to go! Now you can upload the files, we will be
              uploading each file to IPFS so it might take a while.
            </Text>
            <Flex alignItems="center" gap={3}>
              <Checkbox {...register("shuffle")} />
              <Flex gap={1}>
                <Text>Shuffle the order of the NFTs before uploading.</Text>
                <Text fontStyle="italic">
                  This is an off-chain operation and is not provable.
                </Text>
              </Flex>
            </Flex>
            <TransactionButton
              ecosystem={ecosystem}
              mt={4}
              size="lg"
              colorScheme="primary"
              transactionCount={1}
              isDisabled={!nftData.length}
              type="submit"
              isLoading={isSubmitting}
              loadingText={`Uploading ${nftData.length} NFTs...`}
            >
              Upload {nftData.length} NFTs
            </TransactionButton>
            {children}
          </Flex>
        ) : watch("selectedReveal") === "delayed" ? (
          <Stack spacing={6} as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Heading size="title.sm">Let&apos;s set a password</Heading>
              <Alert status="warning" borderRadius="lg">
                <AlertIcon />
                You&apos;ll need this password to reveal your NFTs. Please save
                it somewhere safe.
              </Alert>
              <Flex
                flexDir={{ base: "column", md: "row" }}
                gap={{ base: 4, md: 0 }}
              >
                <FormControl isInvalid={!!errors.password} mr={4}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      {...register("password", {
                        required: watch("selectedReveal") === "delayed",
                      })}
                      placeholder="Choose password"
                      type={show ? "text" : "password"}
                    />
                    <InputRightElement
                      cursor="pointer"
                      children={
                        <Icon
                          as={show ? AiFillEye : AiFillEyeInvisible}
                          onClick={() => setShow(!show)}
                        />
                      }
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {errors?.password?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.confirmPassword}>
                  <FormLabel>Confirm password</FormLabel>
                  <Input
                    {...register("confirmPassword", {
                      required: watch("selectedReveal") === "delayed",
                    })}
                    placeholder="Confirm password"
                    type="password"
                  />
                  <FormErrorMessage>
                    {errors?.confirmPassword?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
            </Stack>
            <Stack spacing={5}>
              <Heading size="title.sm">Placeholder</Heading>
              <FormControl isInvalid={!!errors.image}>
                <FormLabel>Image</FormLabel>
                <Box width={{ base: "auto", md: "350px" }}>
                  <FileInput
                    accept={{ "image/*": [] }}
                    value={imageUrl}
                    showUploadButton
                    setValue={(file) => setValue("image", file)}
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    transition="all 200ms ease"
                    _hover={{ shadow: "sm" }}
                  />
                </Box>
                <FormHelperText>
                  You can optionally upload an image as the placeholder.
                </FormHelperText>
                <FormErrorMessage>
                  {errors?.image?.message as unknown as string}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register("name", {
                    required: watch("selectedReveal") === "delayed",
                  })}
                  placeholder="eg. My NFT (Coming soon)"
                />
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("description")}
                  placeholder="eg. Reveal on July 15th!"
                />
                <FormErrorMessage>
                  {errors?.description?.message}
                </FormErrorMessage>
              </FormControl>
              <Flex alignItems="center" gap={3}>
                <Checkbox {...register("shuffle")} />
                <Flex gap={1}>
                  <Text>Shuffle the order of the NFTs before uploading.</Text>
                  <Text fontStyle="italic">
                    This is an off-chain operation and is not provable.
                  </Text>
                </Flex>
              </Flex>
              <TransactionButton
                mt={4}
                size="lg"
                colorScheme="primary"
                transactionCount={1}
                isDisabled={!nftData.length}
                type="submit"
                isLoading={isSubmitting}
                loadingText={`Uploading ${nftData.length} NFTs...`}
              >
                Upload {nftData.length} NFTs
              </TransactionButton>
              {children}
            </Stack>
          </Stack>
        ) : null}
      </Flex>
    </Flex>
  );
};
