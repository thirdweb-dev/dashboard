import { IAppModule } from "@3rdweb/sdk";
import { Heading, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/react";
import { useProjectUrl } from "hooks/useHref";
import NextLink from "next/link";
import React from "react";
import { SupportedChainId, SupportedChainIdToNetworkMap } from "utils/network";
import { Card } from "./layout/Card";

interface IAppDetailCard {
  contract: IAppModule;
  chainId?: SupportedChainId;
}

export const AppDetailCard: React.FC<IAppDetailCard> = ({
  contract,
  chainId,
}) => {
  const href = useProjectUrl(contract.address);
  return (
    <LinkBox>
      <Card h={28} _hover={{ backgroundColor: "gray.50" }}>
        <Stack>
          <NextLink
            href={
              chainId
                ? `${SupportedChainIdToNetworkMap[chainId]}/${contract.address}`
                : href
            }
            passHref
          >
            <LinkOverlay>
              <Heading size="sm" noOfLines={1}>
                {contract.metadata?.name}
              </Heading>
            </LinkOverlay>
          </NextLink>
          <Text noOfLines={2}>{contract.metadata?.description}</Text>
        </Stack>
      </Card>
    </LinkBox>
  );
};
