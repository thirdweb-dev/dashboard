import { usePaymentsGetVerificationSession } from "@3rdweb-sdk/react/hooks/usePayments";
import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Text } from "tw-components";
import { KycStatus } from "./kyc-status";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

interface PaymentsSettingsKycProps {
  sellerId: string;
}

export const PaymentsSettingsKyc: React.FC<PaymentsSettingsKycProps> = ({
  sellerId,
}) => {
  const { data: verificationSession, isLoading: isVerificationSessionLoading } =
    usePaymentsGetVerificationSession(sellerId);

  const handleSubmit = async () => {
    const stripe = await stripePromise;
    if (!verificationSession?.clientSecret) {
      console.error("Missing client secret.");
      return;
    }

    if (stripe) {
      const result = await stripe.verifyIdentity(
        verificationSession.clientSecret,
      );
      if (result.error) {
        console.error(result.error.message);
      }
    }
  };

  return (
    <Flex flexDir="column" gap={3}>
      <Text>
        A personal identity check is required to create mainnet checkouts. If
        your company is not publicly traded, the individual that performs this
        check must
      </Text>
      <UnorderedList>
        <Text as={ListItem}>
          directly or indirectly own 25% or more of the business; and
        </Text>
        <Text as={ListItem}>
          be a single individual with significant responsibility to control,
          manage, or direct the business (e.g., an executive officer, director,
          partner, manager, etc.)
        </Text>
      </UnorderedList>
      <Text>Please have the following information ready:</Text>
      <UnorderedList>
        <Text as={ListItem}>Full Name</Text>
        <Text as={ListItem}>Date of Birth</Text>
        <Text as={ListItem}>Country</Text>
        <Text as={ListItem}>A Piece of ID</Text>
      </UnorderedList>
      <Box>
        <Button
          colorScheme="primary"
          isLoading={isVerificationSessionLoading}
          onClick={handleSubmit}
        >
          Verify Personal Information
        </Button>
      </Box>
      {verificationSession?.id && (
        <KycStatus sessionId={verificationSession.id} />
      )}
    </Flex>
  );
};
