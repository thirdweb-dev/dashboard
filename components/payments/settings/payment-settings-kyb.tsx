import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { Text, Link, Heading } from "tw-components";
import { KybFileUploader } from "./kyb-file-uploader";
import { usePaymentsKybStatus } from "@3rdweb-sdk/react/hooks/usePayments";

export const PaymentsSettingsKyb: React.FC = () => {
  const { data } = usePaymentsKybStatus();

  return (
    <Flex flexDir="column" gap={3}>
      <Text>
        {data?.count === 0
          ? "Please upload one or more documents with the following information:"
          : "If you have submitted all the necessary information, there is no action required. Otherwise, please upload one or more documents with the following information:"}
      </Text>
      <UnorderedList>
        <Text as={ListItem}>Tax ID</Text>
        <Text as={ListItem}>Company Name</Text>
        <Text as={ListItem}>Proof of Address</Text>
      </UnorderedList>
      <Text>
        Insufficient documents may cause loss of production access. Keep an eye
        on your email for the status of your verification.
      </Text>
      <Accordion allowToggle>
        <AccordionItem border="none">
          <AccordionButton pl={0}>
            <AccordionIcon />
            <Text ml={2}>Why is my data collected?</Text>
          </AccordionButton>
          <AccordionPanel>
            <Text>
              thirdweb operates in the United States and is required to adhere
              to regulations including Anti-Money Laundering (AML), Combating
              the Financing of Terrorism (CFT), and Office of Foreign Assets
              Control (OFAC). We will never share your data to third parties.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem border="none">
          <AccordionButton pl={0}>
            <AccordionIcon />
            <Text ml={2}>How is my data secured?</Text>
          </AccordionButton>
          <AccordionPanel>
            <Text>
              The upload button generates a short-lived, presigned upload URL.
              This bucket is encrypted via{" "}
              <Link
                href="https://aws.amazon.com/kms/"
                isExternal
                color="primary.500"
              >
                AWS Key Management Service
              </Link>{" "}
              and is never exposed publicly. Your data does not pass through
              thirdweb&lsquo;s servers. Employees at thirdweb with critical
              business need will read this data to verify your business entity.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <KybFileUploader />
      {data?.fileNames && (
        <Flex flexDir="column" gap={2} mt={4}>
          <Heading size="title.sm">Submitted files:</Heading>
          <UnorderedList>
            {data.fileNames.map((fileName: string, idx: number) => (
              <Text key={idx} as={ListItem}>
                {fileName}
              </Text>
            ))}
          </UnorderedList>
        </Flex>
      )}
    </Flex>
  );
};
