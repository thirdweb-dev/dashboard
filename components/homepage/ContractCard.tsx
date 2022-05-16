import { Flex, LinkBox, LinkOverlay, Stack } from "@chakra-ui/react";
import { ContractType } from "@thirdweb-dev/sdk";
import { ChakraNextImage } from "components/Image";
import { BuiltinContractDetails, UrlMap } from "constants/mappings";
import { useTrack } from "hooks/analytics/useTrack";
import React from "react";
import { Heading, Text } from "tw-components";

interface ContractCardProps {
  contract: BuiltinContractDetails;
  contractType: ContractType;
}

export const ContractCard: React.FC<ContractCardProps> = ({
  contract,
  contractType,
}) => {
  const { title, description, icon } = contract;
  const { trackEvent } = useTrack();
  return (
    <Flex
      as={LinkBox}
      border="1px solid"
      borderColor="#ffffff26"
      py={3}
      px={4}
      borderRadius="lg"
      backgroundColor="#0000004d"
      flexDir="column"
      gap={2}
      _hover={{ borderColor: "primary.600", textDecoration: "none" }}
    >
      <Flex align="center" gap={2}>
        <ChakraNextImage src={icon} alt={title} boxSize={7} />
        <LinkOverlay
          href={`https://portal.thirdweb.com/pre-built-contracts/${UrlMap[contractType]}`}
          isExternal
          onClick={() =>
            trackEvent({
              category: "pre-built-contract",
              action: "click",
              label: contractType,
            })
          }
        >
          <Heading as="h4" size="subtitle.sm" fontWeight="600" color="gray.50">
            {title}
          </Heading>
        </LinkOverlay>
      </Flex>

      <Stack spacing={3}>
        <Text size="body.md">{description}</Text>
      </Stack>
    </Flex>
  );
};
