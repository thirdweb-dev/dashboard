import { SourcesAccordion } from "../shared/sources-accordion";
import { SourceFile } from "../types";
import { Flex, Icon } from "@chakra-ui/react";
import { AbiSchema } from "@thirdweb-dev/sdk";
import { ABICopyButton } from "components/contract-tabs/code/ABICopyButton";
import { FiXCircle } from "react-icons/fi";
import { Card, Heading, Link, Text } from "tw-components";
import { z } from "zod";

interface SourcesPanelProps {
  sources?: SourceFile[];
  abi?: z.infer<typeof AbiSchema>;
}

export const SourcesPanel: React.FC<SourcesPanelProps> = ({ sources, abi }) => {
  return (
    <Flex flexDir="column" gap={8}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={2}
        justify="space-between"
      >
        <Flex direction="column" gap={2} mb={{ base: 2, md: 0 }}>
          <Heading size="title.sm">Contract ABI</Heading>
          <Text>
            If you need the underlying contract ABI for this contract you can
            copy it from here.
          </Text>
        </Flex>
        {abi && <ABICopyButton colorScheme="purple" abi={abi} />}
      </Flex>

      {sources && sources.length > 0 ? (
        <Flex flexDir="column" gap={4}>
          <Heading size="title.sm">Contract Sources</Heading>
          <SourcesAccordion sources={sources} />
        </Flex>
      ) : (
        <Card>
          <Flex direction="column" align="left" gap={2}>
            <Flex direction="row" align="center" gap={2}>
              <Icon as={FiXCircle} color="red.500" />
              <Heading size="title.sm">
                Contract source code not available
              </Heading>
            </Flex>
            <Heading size="subtitle.sm">
              Try deploying with{" "}
              <Link href="https://portal.thirdweb.com/cli" isExternal>
                thirdweb CLI v0.5+
              </Link>
            </Heading>
          </Flex>
        </Card>
      )}
    </Flex>
  );
};
