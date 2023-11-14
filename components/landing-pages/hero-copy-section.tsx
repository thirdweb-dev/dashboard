import { Box, Flex, Icon, IconButton, useClipboard } from "@chakra-ui/react";
import React from "react";
import { FiCopy } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { Heading, Link, Text, TrackedLinkButton } from "tw-components";

export const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const { onCopy, hasCopied } = useClipboard(text);
  return (
    <IconButton
      ml="auto"
      borderRadius="md"
      variant="ghost"
      colorScheme="whiteAlpha"
      aria-label="Copy npx command"
      onClick={() => {
        onCopy();
      }}
      icon={
        <Icon
          as={hasCopied ? IoMdCheckmark : FiCopy}
          fill={hasCopied ? "green.500" : undefined}
          boxSize="24px"
        />
      }
    />
  );
};

interface HeroCopySectionProps {
  category: string;
  href: string;
  label: string;
  text: string;
}

export const HeroCopySection = ({
  category,
  label,
  href,
  text,
}: HeroCopySectionProps) => {
  return (
    <Flex flexDir={"column"} alignItems="center">
      <Heading
        as="h1"
        color="white"
        fontWeight={700}
        fontSize={"xxx-large"}
        textAlign="center"
      >
        Get started in a single command
      </Heading>
      <Text
        color="white"
        fontWeight={500}
        fontSize={"large"}
        opacity={0.7}
        textAlign="center"
        marginTop={"32px"}
      >
        Create an app with a customizable Connect Wallet component, built-in —
        fast and easy via the{" "}
        <Link
          href="https://portal.thirdweb.com/cli/create"
          textDecor={"underline"}
        >
          thirdweb CLI.
        </Link>
      </Text>

      <Flex
        display="flex"
        alignItems="center"
        w={"100%"}
        maxW={"508px"}
        background="rgba(255, 255, 255, 0.20)"
        borderRadius="7px"
        border="1px solid rgba(255, 255, 255, 0.40)"
        padding="14px"
        minH="74px"
        marginTop={"45px"}
      >
        <Text fontSize="20px" color="white">
          $ npx thirdweb create app
        </Text>
        <CopyButton text="npx thirdweb create app" />
      </Flex>

      <TrackedLinkButton
        bgColor="white"
        _hover={{
          bgColor: "white",
          opacity: 0.8,
        }}
        size="sm"
        color="black"
        href={href}
        category={category}
        label={label}
        marginTop={"40px"}
        fontSize={"large"}
        padding={"26px 40px"}
      >
        {text}
      </TrackedLinkButton>
    </Flex>
  );
};
