import {
  AdminOrSelfOnly,
  useIsAdmin,
  useRemoveRoleMemberMutation,
} from "@3rdweb-sdk/react";
import { ModuleWithRoles, Role } from "@3rdweb/sdk";
import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Tooltip,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { AddressZero } from "@ethersproject/constants";
import { isAddress } from "ethers/lib/utils";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import { IoCopyOutline } from "react-icons/io5";

interface IPermissionEditor {
  role: Role;
  module?: ModuleWithRoles;
}

export const PermissionEditor: React.FC<IPermissionEditor> = ({
  role,
  module,
}) => {
  const isAdmin = useIsAdmin(module);
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: role });
  const [address, setAddress] = useState("");

  const members = watch(role);
  const isDisabled = !isAddress(address) || members.includes(address);

  const addAddress = () => {
    if (isDisabled) {
      return;
    }

    append(address);
    setAddress("");
  };

  return (
    <Stack spacing={2}>
      {fields?.map((field, index) => (
        <PermissionAddress
          key={field.id}
          module={module}
          role={role}
          member={watch(`${role}.${index}`)}
          removeAddress={() => remove(index)}
        />
      ))}
      {isAdmin && (
        <InputGroup>
          <Input
            fontFamily="mono"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={AddressZero}
          />
          <InputRightElement width="120px">
            <Button
              size="sm"
              width="120px"
              colorScheme="blue"
              borderRadius="md"
              isDisabled={isDisabled}
              onClick={addAddress}
              mr="3px"
            >
              Add Address
            </Button>
          </InputRightElement>
        </InputGroup>
      )}
    </Stack>
  );
};

interface IPermissionAddress {
  module?: ModuleWithRoles;
  role: Role;
  member: string;
  removeAddress: () => void;
}

const PermissionAddress: React.FC<IPermissionAddress> = ({
  module,
  role,
  member,
  removeAddress,
}) => {
  const toast = useToast();
  const isAdmin = useIsAdmin(module);
  const mutation = useRemoveRoleMemberMutation(module);
  const { onCopy } = useClipboard(member);

  const handleCopy = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    onCopy();
    toast({
      title: "Address copied.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const removeRole = () => {
    if (isAdmin) {
      removeAddress();
      return;
    }

    mutation.mutate({ role, address: member });
  };

  return (
    <Flex gap={0} align="center">
      <Tooltip label="Copy address to clipboard">
        <Flex
          onClick={(e) => handleCopy(e)}
          height="40px"
          px="10px"
          borderLeftRadius="md"
          bg="gray.50"
          borderColor="gray.100"
          borderWidth="1px"
          borderRightWidth="0px"
          align="center"
          justify="center"
          cursor="pointer"
          _hover={{ bg: "gray.100" }}
        >
          <Icon as={IoCopyOutline} color="gray.600" />
        </Flex>
      </Tooltip>
      <Flex
        height="40px"
        justify="space-between"
        flexGrow={1}
        borderColor="gray.100"
        borderWidth="1px"
        align="center"
        borderRightRadius="md"
      >
        <Text fontFamily="mono" size="body.lg" ml="10px">
          {member}
        </Text>
        <AdminOrSelfOnly module={module} self={member}>
          <Button
            onClick={removeRole}
            leftIcon={<Icon as={FiTrash} boxSize={3} />}
            colorScheme="red"
            variant="ghost"
            size="sm"
            borderRadius="md"
            mr="3px"
            isLoading={mutation.isLoading}
          >
            Remove
          </Button>
        </AdminOrSelfOnly>
      </Flex>
    </Flex>
  );
};
