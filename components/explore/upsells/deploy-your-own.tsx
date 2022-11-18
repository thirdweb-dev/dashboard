import { Flex } from "@chakra-ui/react";
import {
  Card,
  CodeBlock,
  Heading,
  LinkButton,
  TrackedLink,
} from "tw-components";

export const DeployUpsellCard: React.FC = () => {
  return (
    <Card
      as="section"
      my={3}
      display="flex"
      bg="black"
      borderColor="transparent"
      _light={{
        bg: "white",
        borderColor: "borderColor",
      }}
      p={8}
      borderRadius="lg"
      gap={6}
      flexDirection="column"
    >
      <Heading as="h2" size="title.xl">
        Need something more custom?
      </Heading>

      <Flex direction="column" gap={4}>
        <Flex gap={1} align="center" direction={{ base: "column", md: "row" }}>
          <Heading size="label.lg" as="h3">
            Create your contract using our CLI.
          </Heading>
          <LinkButton
            as={TrackedLink}
            {...{
              category: "deploy_upsell",
              label: "contract_kit",
            }}
            size="sm"
            colorScheme="blue"
            href="https://portal.thirdweb.com/contractkit"
            isExternal
            variant="ghost"
          >
            Learn about ContractKit
          </LinkButton>
        </Flex>

        <CodeBlock
          code="npx thirdweb@latest create --contract"
          language="bash"
          prefix="$"
        />
      </Flex>
      <Flex direction="column" gap={4}>
        <Flex gap={1} align="center" direction={{ base: "column", md: "row" }}>
          <Heading size="label.lg" as="h3">
            Deploy effortlessly and get access to all the same benefits as
            released contracts.
          </Heading>
          <LinkButton
            as={TrackedLink}
            {...{
              category: "deploy_upsell",
              label: "portal_deploy",
            }}
            size="sm"
            colorScheme="blue"
            href="https://portal.thirdweb.com/deploy"
            isExternal
            variant="ghost"
          >
            Learn about Deploy
          </LinkButton>
        </Flex>

        <CodeBlock
          code="npx thirdweb@latest deploy"
          language="bash"
          prefix="$"
        />
      </Flex>
    </Card>
  );
};
