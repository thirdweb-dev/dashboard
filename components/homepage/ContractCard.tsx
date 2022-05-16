import { Flex, Stack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { BuiltinContractDetails } from "constants/mappings";
import React from "react";
import { Heading, Text } from "tw-components";

export const ContractCard: React.FC<{ contract: BuiltinContractDetails }> = ({
  contract,
}) => {
  const { title, description, icon } = contract;
  return (
    <Flex
      border="1px solid"
      borderColor="#ffffff26"
      p={6}
      borderRadius="lg"
      backgroundColor="#0000004d"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex alignItems="center" gap={1.5}>
        <ChakraNextImage src={icon} alt="" w={7} />
        <Heading as="h4" size="subtitle.sm" fontWeight="600" color="gray.50">
          {title}
        </Heading>
      </Flex>

      <Stack spacing={3} mt={4}>
        <Text size="body.lg">{description}</Text>
      </Stack>
    </Flex>
  );
};
