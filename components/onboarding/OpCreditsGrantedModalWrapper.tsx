import { useAccount, useAccountCredits } from "@3rdweb-sdk/react/hooks/useApi";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { useTrack } from "hooks/analytics/useTrack";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useEffect, useMemo } from "react";
import { Text, Card, Heading, LinkButton } from "tw-components";
import { OpCreditsGrantedModal } from "./OpCreditsGrantedModal";

export const OpCreditsGrantedModalWrapper = () => {
  const trackEvent = useTrack();
  const { data: credits } = useAccountCredits();
  const { data: account } = useAccount();

  const opCredit = credits?.find((credit) => credit.name.startsWith("OP -"));
  const [sawYouGotCredits, setSawYouGotCredits] = useLocalStorage(
    `sawYouGotCredits-${account?.id}`,
    false,
  );

  const redeemedAtTimestamp = useMemo(() => {
    return opCredit ? new Date(opCredit.redeemedAt).getTime() : 0;
  }, [opCredit]);
  const oneWeekAgoTimestamp = Date.now() - 7 * 24 * 60 * 60 * 1000;

  if (!opCredit || sawYouGotCredits || redeemedAtTimestamp < oneWeekAgoTimestamp) {
    return null;
  }

  trackEvent({
    category: "op-sponsorship",
    action: "modal",
    label: "you-got-credits",
  });

  return (
    <OpCreditsGrantedModal setSawYouGotCredits={setSawYouGotCredits} creditValue={30000} />
  );
};