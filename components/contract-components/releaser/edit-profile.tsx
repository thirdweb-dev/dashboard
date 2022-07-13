import { useEditProfileMutation } from "../hooks";
import {
  Flex,
  FormControl,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { ProfileMetadata } from "@thirdweb-dev/sdk";
import { TransactionButton } from "components/buttons/TransactionButton";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiGlobe } from "react-icons/fi";
import { HiPencilAlt } from "react-icons/hi";
import { SiDiscord, SiTwitter } from "react-icons/si";
import { Button, FormErrorMessage, FormLabel } from "tw-components";

interface EditProfileProps {
  releaserProfile: ProfileMetadata;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  releaserProfile,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileMetadata>();

  const editProfile = useEditProfileMutation();

  const { onSuccess, onError } = useTxNotifications(
    "Profile update successfully",
    "Error updating profile",
  );

  console.log(releaserProfile);

  useEffect(() => {
    if (!isDirty) {
      reset({
        ...releaserProfile,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releaserProfile]);

  return (
    <>
      <Button onClick={onOpen}>Edit Profile</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          mx={{ base: 4, md: 0 }}
          as="form"
          onSubmit={handleSubmit((d) =>
            editProfile.mutate(d, {
              onSuccess: () => {
                onSuccess();
                onClose();
              },
              onError,
            }),
          )}
        >
          <ModalHeader>Edit your profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody as={Flex} flexDir="column" gap={6}>
            <FormControl isInvalid={!!errors.bio} mr={4}>
              <FormLabel>
                <Flex gap={2}>
                  <Icon as={HiPencilAlt} boxSize={4} />
                  Bio
                </Flex>
              </FormLabel>
              <Textarea
                {...register("bio")}
                autoFocus
                placeholder="Tell us about yourself"
              />
              <FormErrorMessage>{errors?.bio?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.twitter} mr={4}>
              <FormLabel>
                <Flex gap={2}>
                  <Icon as={SiTwitter} boxSize={4} />
                  Twitter
                </Flex>
              </FormLabel>
              <Input
                {...register("twitter")}
                placeholder="https://twitter.com/yourname"
              />
              <FormErrorMessage>{errors?.twitter?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.website} mr={4}>
              <FormLabel>
                <Flex gap={2}>
                  <Icon as={FiGlobe} boxSize={4} />
                  Website
                </Flex>
              </FormLabel>
              <Input
                {...register("website")}
                placeholder="https://yourwebsite.com"
              />
              <FormErrorMessage>{errors?.website?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.discord} mr={4}>
              <FormLabel>
                <Flex gap={2}>
                  <Icon as={SiDiscord} boxSize={4} />
                  Discord
                </Flex>
              </FormLabel>
              <Input
                {...register("discord")}
                placeholder="https://discord.gg/yourserver"
              />
              <FormErrorMessage>{errors?.discord?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <TransactionButton
              transactionCount={1}
              colorScheme="blue"
              type="submit"
              isLoading={editProfile.isLoading}
            >
              Save
            </TransactionButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
