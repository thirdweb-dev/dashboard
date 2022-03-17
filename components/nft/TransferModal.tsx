import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { NFTMetadata } from "@nftlabs/sdk";
import { useActiveNFTModule } from "context/sdk/modules/nft-context";
import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useId } from "react-id-generator";

interface IMintModal {
  isOpen: boolean;
  onClose: () => void;
  nft: NFTMetadata;
}
export const TransferModal: React.FC<IMintModal> = ({
  isOpen,
  onClose,
  nft,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [isMinting, setIsMinting] = useState(false);
  const [formId] = useId(1, "nft-mint-form");

  const { module, refresh } = useActiveNFTModule((c) => c);

  const onSubmit: (data: { to: string }) => Promise<void> = useCallback(
    async (data) => {
      console.log("*** nft form data", { data });
      if (!module) {
        return;
      }

      setIsMinting(true);
      console.log({ data });

      try {
        const newNft = await module?.transfer(data.to, nft.id);

        console.log("*** new nft minted", newNft);
        await refresh();
      } catch (err) {
        console.error("minting failed!", err);
      } finally {
        setIsMinting(false);

        onClose();
      }
    },
    [module, onClose, refresh, nft],
  );

  return (
    <Modal isCentered size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={Heading}>Transfer NFT</ModalHeader>
        <ModalCloseButton />
        <ModalHeader as={Heading} size="sm" fontWeight="thin">
          Send nft to another wallet
        </ModalHeader>
        <ModalBody>
          <Stack>
            <form id={formId} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl isRequired isInvalid={!!errors.to}>
                  <FormLabel>To Address</FormLabel>
                  <InputGroup>
                    <Input {...register("to")} />
                  </InputGroup>
                  <FormErrorMessage>{errors?.to?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.image}>
                  <FormErrorMessage>
                    {errors?.description?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </form>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isMinting}
            type="submit"
            form={formId}
            colorScheme="teal"
            mr={3}
          >
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
