import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Select,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseUnits, formatUnits } from "@ethersproject/units";
import { useActiveCurrencyModule } from "context/sdk/modules/currency-context";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useId } from "react-id-generator";
import { CurrencyTokenSchema, CurrencyTokenInput } from "schema/tokens";
import { useEthers } from "@usedapp/core";
import { Role } from "@nftlabs/sdk";

interface IMintModal {
  isOpen: boolean;
  onClose: () => void;
  role: string;
}
export const AddRoleModal: React.FC<IMintModal> = ({
  isOpen,
  onClose,
  role,
}) => {
  const [currentBalance, setCurrentBalance] = useState<string>();

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [isSaving, setIsSaving] = useState(false);
  const [formId] = useId(1, "currency-mint-form");

  const { module, items, refresh } = useActiveCurrencyModule((c) => c);
  const item = items.length > 0 ? items[0] : null;

  const onSubmit: (data: { role: Role; address: string }) => Promise<void> =
    useCallback(
      async (data) => {
        console.log("onSubmit", data);
        if (!module || !item) {
          console.log("!module or !item");
          return;
        }

        setIsSaving(true);

        try {
          await module?.grantRole(data.role, data.address);
          await refresh();
        } catch (err) {
          console.error("minting failed!", err);
        } finally {
          setIsSaving(false);

          onClose();
        }
      },
      [module, item, onClose, refresh],
    );

  React.useEffect(() => {
    if (!module) {
      return;
    }
    module.balance().then((bal) => setCurrentBalance(bal.displayValue));
  }, [module]);

  return (
    <Modal isCentered size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={Heading}>Add {role} Role</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack width="100%">
            <form id={formId} onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired isInvalid={!!errors.address}>
                <FormLabel>Address</FormLabel>
                <Input step="any" type="string" {...register("address")} />
                <FormErrorMessage>{errors?.amount?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.role}>
                <FormLabel>Role</FormLabel>
                <Select placeholder="Select Role" {...register("role")}>
                  <option value="admin">Admin</option>
                  <option value="minter">Minter</option>
                  <option value="pauser">Pauser</option>
                  <option value="transfer">Transfer</option>
                </Select>
                <FormErrorMessage>{errors?.amount?.message}</FormErrorMessage>
              </FormControl>
            </form>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isSaving}
            type="submit"
            form={formId}
            colorScheme="teal"
            mr={3}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
