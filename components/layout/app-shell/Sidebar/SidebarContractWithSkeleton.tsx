import { Heading, HStack, Link, Stack, Box } from "@chakra-ui/layout";
import { Skeleton, Text } from "@chakra-ui/react";
import { shortenIfAddress } from "@usedapp/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { BaseContractOutput } from "schema/contracts";

interface Contract {
  address: string;
  metadata?: BaseContractOutput;
}

interface ISidebarContractWithSkeleton {
  contract: Contract;
  isLoading?: boolean;
  isActive?: boolean;
}

export const SidebarContractWithSkeleton: React.FC<ISidebarContractWithSkeleton> =
  ({ contract, isLoading, isActive }) => {
    // case of not loading and no active app
    const router = useRouter();

    const hasContent = !!contract || !isLoading;

    const address = shortenIfAddress(contract.address);
    const name = contract.metadata?.name || address;

    const switchApp = useCallback(
      (contractAddress) => {
        router.push(`/dashboard/${contractAddress}`);
      },
      [router],
    );

    return (
      <Box onClick={() => switchApp(contract.address)}>
        <HStack
          as={Link}
          spacing={4}
          style={{
            marginLeft: "calc(var(--chakra-space-3) * -1)",
            marginRight: "calc(var(--chakra-space-3) * -1)",
          }}
          p={3}
          borderRadius="md"
          _hover={{ opacity: 1, bg: "rgba(255,255,255,.1)" }}
          textDecor="none!important"
          {...(isActive
            ? {
                opacity: 0.9,
                bg: "rgba(255,255,255,.1)",
              }
            : {
                opacity: 0.8,
              })}
        >
          <Stack spacing={1} overflow="hidden" align="start">
            <Skeleton isLoaded={hasContent}>
              <Heading
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                lineHeight={1}
                size="xs"
              >
                {name || "Skeleton App"}
              </Heading>
            </Skeleton>

            <Skeleton isLoaded={hasContent}>
              <Text
                lineHeight={1}
                opacity={0.8}
                fontSize="xs"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {address || "0xtest...test"}
              </Text>
            </Skeleton>
          </Stack>
        </HStack>
      </Box>
    );
  };
