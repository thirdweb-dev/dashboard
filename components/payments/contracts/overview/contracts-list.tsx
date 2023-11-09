import { Box, ButtonGroup, Divider, Flex } from "@chakra-ui/react";
import { PaymentContracts } from "../payment-contracts";
import { EnabledContracts } from "../enabled-contracts";
import { useState } from "react";
import { Button, Heading, Text } from "tw-components";

export const ContractsList: React.FC = () => {
  const [tab, setTab] = useState<"enabled" | "all">("enabled");

  return (
    <Flex flexDir="column" gap={4} w="full">
      <Flex flexDir="column" gap={6} mt={4}>
        <Flex flexDir="column" gap={2}>
          <Heading size="title.md">Contracts</Heading>
          <Text>
            Select an already enabled contract to view in checkout links and
            analytics, or enable payments for a new contract.
          </Text>
        </Flex>
        <Box
          w="full"
          overflow={{ base: "auto", md: "hidden" }}
          pb={{ base: 4, md: 0 }}
        >
          <ButtonGroup size="sm" variant="ghost" spacing={4}>
            <Button
              type="button"
              isActive={tab === "enabled"}
              _active={{
                bg: "bgBlack",
                color: "bgWhite",
              }}
              rounded="lg"
              onClick={() => setTab("enabled")}
            >
              Payments-Enabled
            </Button>
            <Button
              type="button"
              isActive={tab === "all"}
              _active={{
                bg: "bgBlack",
                color: "bgWhite",
              }}
              rounded="lg"
              onClick={() => setTab("all")}
            >
              All Contracts
            </Button>
          </ButtonGroup>
        </Box>
        <Divider />
      </Flex>

      {tab === "enabled" && <EnabledContracts />}
      {tab === "all" && <PaymentContracts />}
    </Flex>
  );
};
