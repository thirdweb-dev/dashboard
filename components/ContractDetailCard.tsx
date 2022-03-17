import {
  Badge,
  Flex,
  Heading,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ModuleMetadata, IAppModule, ModuleType } from "@nftlabs/sdk";
import NextLink from "next/link";
import React from "react";
import { IconType } from "react-icons/lib";
import { AddressCopyButton } from "./web3/AddressCopyButton";

interface IContractDetailCard {
  contract: ModuleMetadata | IAppModule;
  path: string;
  icon?: IconType;
  badge?: ModuleType;
}

const ColorSchemeMap: Partial<Record<ModuleType, string>> = {
  [ModuleType.CURRENCY]: "yellow",
  [ModuleType.NFT]: "blue",
  [ModuleType.COLLECTION]: "teal",
  [ModuleType.PACK]: "purple",
  [ModuleType.MARKET]: "green",
};

const TitleMap: Partial<Record<ModuleType, string>> = {
  [ModuleType.CURRENCY]: "Currency",
  [ModuleType.NFT]: "NFT",
  [ModuleType.COLLECTION]: "Collection",
  [ModuleType.PACK]: "Pack",
  [ModuleType.MARKET]: "Market",
};

export const ContractDetailCard: React.FC<IContractDetailCard> = ({
  contract,
  path,
  icon,
  badge,
}) => {
  return (
    <LinkBox
      as={HStack}
      spacing={4}
      align="center"
      _hover={{ bg: "gray.100", shadow: "sm" }}
      borderRadius="md"
      p={2}
    >
      <Flex align="center" justify="space-between" flexGrow={1}>
        <Stack>
          <HStack>
            {icon ? <Icon as={icon} /> : ""}
            <NextLink href={`${path}/${contract.address}`} passHref>
              <LinkOverlay>
                <Heading size="sm">{contract.metadata?.name}</Heading>
              </LinkOverlay>
            </NextLink>
          </HStack>
          <Text>{contract.metadata?.description}</Text>
        </Stack>
        <HStack>
          {typeof badge === "number" && (
            <Badge
              variant="solid"
              w={24}
              textAlign="center"
              colorScheme={ColorSchemeMap[badge]}
            >
              {TitleMap[badge]}
            </Badge>
          )}
          <AddressCopyButton
            fontFamily="monospace"
            variant="outline"
            address={contract.address}
          />
        </HStack>
      </Flex>
    </LinkBox>
  );
};
