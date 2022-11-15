import { ButtonGroup, Flex } from "@chakra-ui/react";
import { Button, Card, CodeBlock, Heading, Text } from "tw-components";

export const DeployUpsellCard: React.FC = () => {
  return (
    <Card
      my={3}
      bg="black"
      borderColor="transparent"
      _light={{
        bg: "white",
        borderColor: "borderColor",
      }}
      p={8}
      borderRadius="lg"
      as={Flex}
      gap={6}
      flexDirection="column"
    >
      <Heading size="title.xl">Need something more custom?</Heading>

      <Flex direction="column" gap={1}>
        <Text size="body.lg">Create your contract using our CLI</Text>

        <CodeBlock
          code="npx thirdweb@latest create --contract"
          language="bash"
          prefix=">"
        />
      </Flex>
      <Flex direction="column" gap={1}>
        <Text size="body.lg">
          Deploy effortlessly and get access to all the same benefits as
          released contracts.
        </Text>

        <CodeBlock
          code="npx thirdweb@latest deploy"
          language="bash"
          prefix=">"
        />
      </Flex>

      <ButtonGroup size="size" mt={2}>
        <Button
          bg="accent.900"
          color="accent.100"
          borderColor="accent.900"
          borderWidth="1px"
          _hover={{
            bg: "accent.100",
            color: "accent.900",
          }}
        >
          Contact us
        </Button>
        <Button
          variant="ghost"
          _hover={{
            bg: "accent.200",
          }}
        >
          Learn More
        </Button>
      </ButtonGroup>
    </Card>
  );
};
