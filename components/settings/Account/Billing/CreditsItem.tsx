import { BillingCredit } from "@3rdweb-sdk/react/hooks/useApi";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { Optimism } from "@thirdweb-dev/chains";
import { ChainIcon } from "components/icons/ChainIcon";
import { ApplyForOpCreditsModal } from "components/onboarding/ApplyForOpCreditsModal";
import { formatDistance } from "date-fns";
import { Text, Button } from "tw-components";
import { formatToDollars } from "./CreditsButton";

interface CreditsItemProps {
  credit?: BillingCredit;
}

export const CreditsItem: React.FC<CreditsItemProps> = ({ credit }) => {
  const {
    isOpen: isMoreCreditsOpen,
    onOpen: onMoreCreditsOpen,
    onClose: onMoreCreditsClose,
  } = useDisclosure();
  return (
    <>
      <Flex gap={2}>
        <ChainIcon ipfsSrc={Optimism.icon.url} size={24} />
        <Text color="bgBlack">Sponsorship credit balance</Text>{" "}
        <Button size="xs" variant="outline" onClick={onMoreCreditsOpen}>
          Apply now
        </Button>
      </Flex>
      <Flex gap={6}>
        <Flex flexDir="column" gap={1}>
          <Text>Remaining Credits</Text>
          <Text color="bgBlack">
            {formatToDollars(credit?.remainingValueUsdCents || 0)}
          </Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text>Claimed Credits (All-Time)</Text>
          <Text color="bgBlack">
            {formatToDollars(credit?.originalGrantUsdCents || 0)}
          </Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text>Expires</Text>
          <Text color="bgBlack" textTransform="capitalize">
            {credit?.expiresAt
              ? formatDistance(new Date(credit.expiresAt), Date.now(), {
                addSuffix: true,
              })
              : "N/A"}
          </Text>
        </Flex>
      </Flex>
      <ApplyForOpCreditsModal
        isOpen={isMoreCreditsOpen}
        onClose={onMoreCreditsClose}
      />
    </>
  );
};
