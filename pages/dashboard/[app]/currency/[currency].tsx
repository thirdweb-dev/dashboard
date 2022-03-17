import {
  Box,
  Button,
  Center,
  VStack,
  Wrap,
  Flex,
  Heading,
  HStack,
  Icon,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import { useActiveCurrencyModule } from "context/sdk/modules/currency-context";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { FiFilePlus, FiSend } from "react-icons/fi";
import { MintModal } from "components/currency/MintModal";
import { AddRoleModal } from "components/currency/AddRoleModal";
import { formatUnits } from "@ethersproject/units";
import { AddIcon } from "@chakra-ui/icons";
import { GiCancel } from "react-icons/gi";
import { TransferModal } from "components/currency/TransferModal";

const RoleMembers: React.FC<{ roleMembers: any }> = ({ roleMembers }) => {
  const { isLoading, module, refresh } = useActiveCurrencyModule((c) => c);

  const revokeRole = useCallback(
    async (role, address) => {
      await module?.revokeRole(role, address);
      await refresh();
    },
    [module, refresh],
  );
  return (
    <>
      {roleMembers
        ? Object.keys(roleMembers).map((key) => {
            return (
              <Box key={key} m={2} mb={4}>
                <Heading size="sm">{key}: </Heading>
                {roleMembers[key].map((m: string) => (
                  <VStack key={m}>
                    <HStack>
                      <Text>{m}</Text>
                      <Icon
                        as={GiCancel}
                        onClick={() => revokeRole(key, m)}
                        _hover={{ cursor: "pointer" }}
                      />
                    </HStack>
                  </VStack>
                ))}
              </Box>
            );
          })
        : ""}
    </>
  );
};

const CurrencyPage: NextPage = () => {
  const { metadata, isLoading, address, items, module, refresh } =
    useActiveCurrencyModule((c) => c);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAddRoleOpen,
    onOpen: onAddRoleOpen,
    onClose: onAddRoleClose,
  } = useDisclosure();

  const {
    isOpen: isTransferModalOpen,
    onOpen: onTransferModalOpen,
    onClose: onTransferModalClose,
  } = useDisclosure();

  const [contractBalance, setContractBalance] = useState<string>();
  const [roleMembers, setRoleMembers] = useState<any>();
  const [activeRole, setActiveRole] = useState<string>("");

  const addModal = useCallback(() => {
    onAddRoleOpen();
  }, [onAddRoleOpen]);

  useEffect(() => {
    (async () => {
      try {
        const rm = await module?.getAllRoleMembers();
        setRoleMembers(rm);
        console.log({ rm });
      } catch (err) {
        console.error("failed to getAllRoleMembers", err);
      }

      try {
        const bal = await module?.balance();
        if (bal?.displayValue) {
          setContractBalance(bal?.displayValue);
        }
        console.log({ bal });
      } catch (err) {
        console.error("failed to get balance");
      }
    })();
  }, [module]);

  if (isLoading || !address) {
    return (
      <Center p={16}>
        <HStack>
          <Spinner size="sm" />
          <Text>Loading Module</Text>
        </HStack>
      </Center>
    );
  }

  const item = items.length > 0 ? items[0] : null;
  const renderName = `${metadata?.name} ($${item?.symbol})`;

  return (
    <>
      <MintModal isOpen={isOpen} onClose={onClose} />
      <AddRoleModal
        isOpen={isAddRoleOpen}
        onClose={() => {
          refresh();
          onAddRoleClose();
        }}
        role={activeRole}
      />

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => {
          refresh();
          onTransferModalClose();
        }}
      />

      <Head>
        <title>{renderName} | Console</title>
      </Head>
      <Stack spacing={16} my={8}>
        <Flex
          flexDirection={["column", "column", "row"]}
          justify="space-between"
          align="center"
        >
          <Flex flexDirection="column">
            <Heading size="2xl">{renderName}</Heading>
            <Text>{metadata?.description}</Text>
          </Flex>
          <HStack>
            {address && (
              <AddressCopyButton
                my={2}
                colorScheme="blackAlpha"
                variant="outline"
                address={address}
              />
            )}
            <Button
              onClick={onOpen}
              colorScheme="teal"
              rightIcon={<Icon as={FiFilePlus} />}
            >
              Mint
            </Button>
          </HStack>
        </Flex>

        <Center as={Wrap}>
          <Box bg="white" maxW="xl" rounded="xl" p={8} m={4}>
            <Heading size="sm">Total Supply: </Heading>
            <Text>
              {item ? formatUnits(item.totalSupply, item.decimals) : ""}
            </Text>
          </Box>
          <Box bg="white" maxW="xl" rounded="xl" p={8} m={4}>
            <Heading size="sm">Contract Balance: </Heading>
            <Text>{contractBalance}</Text>
            <Flex
              width="100%"
              alignItems="flex-end"
              justifyContent="flex-end"
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                onTransferModalOpen();
              }}
            >
              <FiSend />
            </Flex>
          </Box>
          <Box bg="white" maxW="xl" rounded="xl" p={8} m={4}>
            <Heading size="sm">Decimals: </Heading>
            <Text>{item?.decimals}</Text>
          </Box>
        </Center>

        <Center as={Wrap}>
          <Box bg="white" w="xl" rounded="xl" p={8} m={4}>
            <HStack>
              <Heading size="md" flexGrow={1}>
                Roles:{" "}
              </Heading>
              <Button size="sm" rightIcon={<AddIcon />} onClick={addModal}>
                Add
              </Button>
            </HStack>
            <Box p={2}>
              <RoleMembers roleMembers={roleMembers} />
            </Box>
          </Box>
        </Center>
      </Stack>
    </>
  );
};

export default CurrencyPage;
