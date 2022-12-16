import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
} from "@chakra-ui/react";
import { Heading, Text } from "tw-components";

const FAQs = [
  {
    question: "Who can participate?",
    answer:
      "Everyone from all development levels are encouraged to participate. ",
  },
  {
    question: "Where will this event take place?",
    answer: (
      <>
        Our hackathons run a hybrid model where each participants can attend
        virtually & async. For attendees who want to hack alongside a team in
        person we provide week-long access to our offices in San Francisco and
        New York City. <br />
        <br /> There are limited spots, register on our events forum.
      </>
    ),
  },
  {
    question: "I don’t have a team. Is there any way I can find one?",
    answer:
      "You can use DevPost to find other individuals looking to team up! Additionally, feel free to post in our #team-up channel in the discord if you need additional ",
  },
  {
    question:
      "I need to modify my submission but I already submitted my project. Is it too late to change it?",
    answer:
      "As long as it is not past the submission date, send us a message and we will note to review your most recent submission. ",
  },
  {
    question: "Do I need to host the project live or can it be on localhost?",
    answer: "It can be on localhost. Just don’t tell Furqan. 🤫",
  },
  {
    question: "When can I start working on my project?",
    answer:
      "To keep it fair, we ask participants to start their project on or after the start date. Any submissions with a repository created prior to the start date will be automatically disqualified. ",
  },
];

export const FaqSection: React.FC = () => {
  return (
    <Flex
      flexDir="column"
      mt={{ base: 4, md: 12 }}
      px={{ base: 0, md: 20 }}
      alignItems="center"
    >
      <Heading size="title.2xl">FAQs</Heading>
      <Flex
        w={{ base: "full", md: "3xl" }}
        justify={{ base: "center", md: "space-between" }}
        flexDir="column"
        align="center"
        mt={8}
        borderRadius="lg"
        overflow="hidden"
      >
        <Accordion borderColor="borderColor" allowMultiple overflow="hidden">
          {FAQs.map(({ question, answer }) => (
            <AccordionItem
              key={question}
              _first={{ borderTop: "none" }}
              _last={{ borderBottom: "none" }}
              role="group"
              w="full"
              px={{ base: 4, md: 8 }}
              bg="whiteAlpha.100"
              _hover={{ bg: "whiteAlpha.200" }}
              py={2}
              gap={4}
            >
              <AccordionButton py={4} _hover={{ bg: "transparent" }}>
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
      </Flex>
    </Flex>
  );
};
