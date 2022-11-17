import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
} from "@chakra-ui/react";
import { Card, Heading, Text } from "tw-components";

interface IFAQSection {
  FAQs: {
    answer: string | JSX.Element;
    question: string;
  }[];
}

export const FaqSection: React.FC<IFAQSection> = ({ FAQs }) => {
  return (
    <Flex flexDir="column" mt={8} gap={6}>
      <Heading>FAQs</Heading>
      <Card p={0} overflow="hidden">
        <Accordion borderColor="borderColor" allowMultiple overflow="hidden">
          {FAQs.map(({ question, answer }) => (
            <AccordionItem
              key={question}
              _first={{ borderTop: "none" }}
              _last={{ borderBottom: "none" }}
            >
              <AccordionButton py={4}>
                <Heading mr="auto" size="label.lg" textAlign="left">
                  {question}
                </Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text size="body.md">{answer}</Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </Flex>
  );
};
