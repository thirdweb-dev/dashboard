import {
  Button,
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import { useActivePackModule } from "context/sdk/modules/pack-context";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { FiFilePlus } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { LinkModal } from "components/pack/LinkModal";
import { CreatePackModal } from "components/pack/CreatePackModal";

const PackPage: NextPage = () => {
  const { metadata, isLoading, address, items, module, refresh } =
    useActivePackModule((c) => c);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isLinkModalOpen,
    onOpen: onLinkModalOpen,
    onClose: onLinkModalClose,
  } = useDisclosure();

  const [linkBal, setLinkBal] = useState<any>();

  useEffect(() => {
    if (module) {
      (async () => {
        const lb = await module?.getLinkBalance();
        console.log({ lb });
        setLinkBal(lb);
      })();
    }
  }, [module, setLinkBal, metadata]);

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

  const renderName = metadata?.name || address || "Pack Module";

  return (
    <>
      <CreatePackModal
        isOpen={isOpen}
        onClose={() => {
          refresh();
          onClose();
        }}
      />

      <LinkModal
        isOpen={isLinkModalOpen}
        onClose={() => {
          refresh();
          onLinkModalClose();
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
          <Heading size="2xl">{renderName}</Heading>
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
              Create Pack
            </Button>
          </HStack>
        </Flex>
        <Wrap>
          <Box p={8} rounded="xl" bg="white">
            <Heading size="sm">$Link Balance:</Heading>
            <Text>{linkBal?.displayValue}</Text>
            <HStack
              width="100%"
              as={Flex}
              justifyContent="flex-start"
              onClick={onLinkModalOpen}
            >
              <Icon
                h={4}
                w={4}
                as={AiOutlineMinus}
                _hover={{ cursor: "pointer" }}
              />

              <Icon
                h={4}
                w={4}
                as={AiOutlinePlus}
                _hover={{ cursor: "pointer" }}
              />
            </HStack>
          </Box>
        </Wrap>

        <Wrap>
          {items.map((item) => (
            <div key={item.id}>
              Pack #{item.id} - ${item.metadata?.name}
            </div>
          ))}
        </Wrap>
      </Stack>
    </>
  );
};

export default PackPage;
