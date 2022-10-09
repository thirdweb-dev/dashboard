import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Heading, Link } from "tw-components";

const FAQs = [
  {
    question: "What are devnet funds?",
    answer:
      "Solana Devnet is a test network where developers can test out their applications before deploying them to mainnet. Devnet transactions use test SOL tokens, so that developers do not need to spend money to test their applications.",
  },
  {
    question: "How much will I get?",
    answer: "You will receive 1 SOL ",
  },
  {
    question: "How long will it take to get my devnet tokens?",
    answer:
      "You should receive your testnet funds immediately. If not, please click the “View on Solana Explorer” link and see if your transaction has been confirmed.",
  },
];

export const FaqSection: React.FC = () => {
  return (
    <Flex flexDir="column">
      <Heading>FAQs</Heading>
      <Accordion
        mt="4"
        allowMultiple
        border="1px solid #E5E7EB1F !important"
        rounded="lg !important"
      >
        {FAQs.map(({ question, answer }, i) => (
          <AccordionItem
            key={question}
            roundedTop={i === 0 ? "lg !important" : "none"}
          >
            <AccordionButton
              bg="#161A21"
              roundedTop={i === 0 ? "lg !important" : "none"}
            >
              <Box
                flex="1"
                textAlign="left"
                color="white"
                fontSize="18px"
                fontWeight="semibold"
                py={1}
              >
                {question}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} bg="#1B2129">
              {answer}
            </AccordionPanel>
          </AccordionItem>
        ))}
        <AccordionItem roundedBottom="lg">
          <AccordionButton bg="#161A21" roundedBottom="lg">
            <Box
              flex="1"
              textAlign="left"
              color="white"
              fontSize="18px"
              fontWeight="semibold"
              py={1}
            >
              Why am I not able to get funds?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4} bg="#1B2129">
            Please try again after a few minutes. If the issue persists, please
            contact us on{" "}
            <Link href="https://discord.gg/thirdweb" textDecor="underline">
              Discord{" "}
            </Link>
            or{" "}
            <Link href="https://twitter.com/thirdweb_" textDecor="underline">
              Twitter
            </Link>
            .
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};
