import { ButtonGroup, Flex } from "@chakra-ui/react";
import { Card, Heading, LinkButton, Text, TrackedLink } from "tw-components";

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
      <Heading size="title.xl">Get your protocol featured here</Heading>
      <Text size="body.lg">
        Releasing your contract is the best way to get your protocol in front of
        our network of web3 builders.
      </Text>

      <ButtonGroup size="size">
        <TrackedLink
          as={LinkButton}
          category="release_upsell"
          label="contact_us"
          bg="accent.900"
          color="accent.100"
          borderColor="accent.900"
          borderWidth="1px"
          href="https://form.typeform.com/to/FAwehBFl"
          isExternal
          noIcon
          _hover={{
            bg: "transparent",
            color: "accent.900",
          }}
        >
          Contact us
        </TrackedLink>
        <TrackedLink
          as={LinkButton}
          category="release_upsell"
          label="learn_more"
          variant="ghost"
          href="https://portal.thirdweb.com/release"
          isExternal
          noIcon
        >
          Learn More
        </TrackedLink>
      </ButtonGroup>
    </Card>
  );
};
