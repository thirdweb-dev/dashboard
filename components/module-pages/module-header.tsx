import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { ModuleMetadata } from "@3rdweb/sdk";
import { ButtonGroup, Flex, Heading, Stack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { AddressCopyButton } from "components/web3/AddressCopyButton";
import React from "react";
import { FeatureIconMap } from "utils/feature-icons";

interface IModuleHeaderProps {
  contractMetadata?: ModuleMetadata;
  primaryAction?: JSX.Element;
  secondaryAction?: JSX.Element;
  tertiaryAction?: JSX.Element;
  module?: EitherBaseModuleType;
}

export const ModuleHeader: React.FC<IModuleHeaderProps> = ({
  contractMetadata,
  primaryAction,
  secondaryAction,
  tertiaryAction,
}) => {
  const renderName =
    contractMetadata?.metadata?.name || contractMetadata?.address || "";
  const image =
    contractMetadata?.type !== undefined
      ? FeatureIconMap[contractMetadata.type]
      : undefined;
  return (
    <Flex flexDirection={"row"} justify="space-between" align="center">
      <Stack direction="row" align="center">
        {image && (
          <ChakraNextImage boxSize="64px" src={image} alt={renderName} />
        )}
        <Stack>
          <Heading>{renderName}</Heading>
          {contractMetadata?.address && (
            <AddressCopyButton
              my={2}
              address={contractMetadata.address}
              variant="outline"
            />
          )}
        </Stack>
      </Stack>
      <Stack direction={{ base: "column", md: "row" }} as={ButtonGroup}>
        {tertiaryAction}
        {secondaryAction}
        {primaryAction}
      </Stack>
    </Flex>
  );
};
