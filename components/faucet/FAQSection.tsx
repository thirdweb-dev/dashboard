import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Heading } from "tw-components";

const FAQs = [
  {
    question: "What is the Solana faucet?",
    answer:
      "The Solana faucet is a tool that allows you to get free Solana tokens for testing and development purposes. You can use the tokens to build your web3 app on the Solana blockchain.",
  },
  {
    question: "How do I get free Solana tokens?",
    answer:
      "To get free Solana tokens, you need to enter your Solana address and click on the Get tokens button. You will receive 1 SOL token in your wallet.",
  },
];

export const FaqSection: React.FC = () => {
  return (
    <Flex mt={12} flexDir="column">
      <Heading>FAQ</Heading>
      <Accordion mt="2" allowMultiple>
        {FAQs.map(({ question, answer }) => (
          <AccordionItem key={question}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
};
