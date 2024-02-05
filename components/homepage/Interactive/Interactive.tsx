import React from "react";
import { Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import CustomIcon from "./CustomIcon";
import { Heading, LinkButton } from "tw-components";
import { BsLightningCharge } from "react-icons/bs";

const Interactive = () => {
  return (
    <Flex w="full" justifyContent="center" mt="90px">
      <Flex w="full" maxW="892px" alignItems="center" flexDir="column">
        <Heading
          as="h2"
          letterSpacing="-0.04em"
          lineHeight={1.1}
          fontWeight={700}
          fontSize={{ base: "36px", md: "52px", lg: "64px" }}
          textAlign="center"
        >
          Build scalable web3 apps,
          <br />
          on any EVM chain.
        </Heading>
        <Heading
          as="h3"
          size="subtitle.md"
          textAlign="center"
          maxW="487px"
          mt="24px"
        >
          Onboard users with wallets, build & deploy smart contracts, accept
          fiat with payments, and scale apps with infrastructure — on any EVM
          chain.
        </Heading>

        <LinkButton
          href="/dashboard"
          onClick={() => /*   trackEvent({
              category: "cta-button",
              action: "click",
              label: "start",
              title: "Start building",
              experiment: "open_dashboard",
            }) */ {}}
          px={4}
          py={7}
          w="full"
          maxW="215px"
          mt="40px"
          // h={{ base: "48px", md: "68px" }}
          fontSize="20px"
          leftIcon={<Icon as={BsLightningCharge} color="black" />}
          color="black"
          flexShrink={0}
          background="rgba(255,255,255,1)"
          _hover={{
            background: "rgba(255,255,255,0.9)!important",
          }}
        >
          Get Started
        </LinkButton>

        <SimpleGrid gap="16px" columns={6} mt="120px">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <CustomIcon
              key={n}
              isActive={n === 3}
              title="Gaming"
              onClick={() => {}}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Interactive;
