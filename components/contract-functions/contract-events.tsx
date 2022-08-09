import { InteractiveAbiFunction } from "./interactive-abi-function";
import {
  Divider,
  Flex,
  GridItem,
  List,
  ListItem,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AbiEvent, SmartContract } from "@thirdweb-dev/sdk";
import { MarkdownRenderer } from "components/contract-components/released-contract/markdown-renderer";
import { useState } from "react";
import { Button, Card, Heading, Text } from "tw-components";

interface ContractEventProps {
  event?: AbiEvent;
  contract?: SmartContract;
}

export const ContractEvent: React.FC<ContractEventProps> = ({
  event,
  contract,
}) => {
  if (!event) {
    return null;
  }

  return (
    <Flex direction="column" gap={1.5}>
      <Flex alignItems="center" gap={2}>
        <Heading size="subtitle.md">{event.name}</Heading>
      </Flex>
      {event.comment && (
        <MarkdownRenderer
          markdownText={event.comment
            .replaceAll(/See \{(.+)\}(\.)?/gm, "")
            .replaceAll("{", '"')
            .replaceAll("}", '"')
            .replaceAll("'", '"')}
        />
      )}
      {event.inputs && event.inputs.length && !contract ? (
        <>
          <Divider my={2} />
          <Flex flexDir="column" gap={3}>
            <Heading size="label.lg">Inputs</Heading>
            <Card borderRadius="md" p={0} overflowX="auto" position="relative">
              <Table size="sm">
                <Thead bg="blackAlpha.50" _dark={{ bg: "whiteAlpha.50" }}>
                  <Tr>
                    <Th py={2} borderBottomColor="borderColor">
                      <Heading as="label" size="label.sm">
                        Name
                      </Heading>
                    </Th>
                    <Th py={2} borderBottomColor="borderColor">
                      <Heading as="label" size="label.sm">
                        Type
                      </Heading>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {event.inputs.map((input) => (
                    <Tr
                      borderBottomWidth={1}
                      _last={{ borderBottomWidth: 0 }}
                      key={input.name}
                    >
                      <Td
                        borderBottomWidth="inherit"
                        borderBottomColor="borderColor"
                      >
                        <Text fontFamily="mono">{input.name}</Text>
                      </Td>
                      <Td
                        borderBottomWidth="inherit"
                        borderBottomColor="borderColor"
                      >
                        <Text fontFamily="mono">{input.type}</Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Card>
          </Flex>
        </>
      ) : null}

      {/*       {contract && (
        <InteractiveAbiFunction
          key={JSON.stringify(event)}
          contract={contract}
          abiFunction={event}
        />
      )} */}
    </Flex>
  );
};

interface ContractEventsPanelProps {
  events: AbiEvent[];
  contract?: SmartContract;
}

export const ContractEventsPanel: React.FC<ContractEventsPanelProps> = ({
  events,
  contract,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<AbiEvent>(events[0]);

  return (
    <SimpleGrid columns={12}>
      <GridItem
        colSpan={{ base: 12, md: 3 }}
        borderRightWidth={{ base: "0px", md: "1px" }}
        borderBottomWidth={{ base: "1px", md: "0px" }}
        borderColor="borderColor"
      >
        <List
          overflow="auto"
          h={{ base: "300px", md: "500px" }}
          pr={{ base: 0, md: 3 }}
          mb={{ base: 3, md: 0 }}
        >
          {events.map((event) => (
            <ListItem key={event.name} my={0.5}>
              <Button
                size="sm"
                fontWeight={selectedEvent.name === event.name ? 600 : 400}
                /*                 leftIcon={
                  <Icon
                    boxSize={3}
                    as={
                      event.stateMutability === "view" ||
                      event.stateMutability === "pure"
                        ? FiEye
                        : FiEdit2
                    }
                  />
                } */
                opacity={selectedEvent.name === event.name ? 1 : 0.65}
                onClick={() => setSelectedEvent(event)}
                color="heading"
                _hover={{ opacity: 1, textDecor: "underline" }}
                variant="link"
                fontFamily="mono"
              >
                {event.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 9 }}>
        <Card ml={{ base: 0, md: 3 }} mt={{ base: 3, md: 0 }} flexGrow={1}>
          <ContractEvent event={selectedEvent} contract={contract} />
        </Card>
      </GridItem>
    </SimpleGrid>
  );
};
