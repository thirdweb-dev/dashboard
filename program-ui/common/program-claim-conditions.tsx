import { Divider, Flex, Spacer, Spinner, Stack } from "@chakra-ui/react";
import { useClaimConditions, useProgram } from "@thirdweb-dev/react/solana";
import { Card, Heading, Text } from "tw-components";

export const ProgramClaimConditionsTab: React.FC<{ address: string }> = ({
  address,
}) => {
  const program = useProgram(address, "nft-drop");
  const claimConditionsQuery = useClaimConditions(program.data);

  console.log("claimConditions", claimConditionsQuery.data);
  return (
    <Stack spacing={8}>
      <Card p={0} position="relative">
        <Flex pt={{ base: 6, md: 10 }} direction="column" gap={8}>
          <Flex
            px={{ base: 6, md: 10 }}
            as="section"
            direction="column"
            gap={4}
          >
            <Flex direction="column">
              <Heading size="title.md">Set Claim Conditions</Heading>
              <Text size="body.md" fontStyle="italic">
                Control when the NFTs get dropped, how much they cost, and more.
              </Text>
            </Flex>
          </Flex>
          <Divider />
          form
        </Flex>
      </Card>
    </Stack>
  );
};
