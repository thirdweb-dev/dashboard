import { Container } from "@chakra-ui/react";
import React from "react";
import { Heading, Text } from "tw-components";

const Reason = () => {
  return (
    <Container maxW={"container.page"}>
      <Heading as="h1" size="title.2xl" mb={6} textAlign="center">
        Why?
      </Heading>
      <Text textAlign="center" size="body.lg">
        We&apos;re partnering with Base to host a Consumer Crypto hackathon in
        San Francisco — with the goal of discovering the next billion dollar
        consumer web3 app. We&apos;ll provide expert support and resources to
        every builder who participates to accelerate their development. Winners
        of the hackathon will receive exclusive perks for building on thirdweb,
        and introductions to VCs and investors to fund your idea.
      </Text>
    </Container>
  );
};

export default Reason;
