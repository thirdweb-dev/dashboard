import { ButtonGroup, Flex } from "@chakra-ui/react";
import { Button, Card, Heading, Text } from "tw-components";

export const ReleaseUpsellCard: React.FC = () => {
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
      gap={3}
      flexDirection="column"
    >
      <Heading size="title.xl">Get your contract featured</Heading>
      <Text size="body.lg">
        Releasing your contract is the best way to get your contract in front of
        our network of web3 builders.
      </Text>

      <ButtonGroup size="size">
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
