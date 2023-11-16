import {
  usePaymentsCreateVerificationSession,
  usePaymentsKycStatus,
} from "@3rdweb-sdk/react/hooks/usePayments";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Flex,
  ListItem,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Text } from "tw-components";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export const SellerVerificationStatusRecord: Record<
  string,
  { message: string; type: "error" | "success" }
> = {
  document_expired: {
    message:
      "Your document is expired. Please provide an non-expired document.",
    type: "error",
  },
  document_failure: {
    message: "Your document verification failed. Please try again.",
    type: "error",
  },
  sanctions_failure: {
    message:
      "Your verification failed. Contact support@thirdweb.com for more details.",
    type: "error",
  },
  success: { message: "Verification successful.", type: "success" },
};

interface PaymentsSettingsKycProps {
  sellerId: string;
}

export const PaymentsSettingsKyc: React.FC<PaymentsSettingsKycProps> = ({
  sellerId,
}) => {
  const { data } = usePaymentsKycStatus();
  const { mutate: createVerificationSession } =
    usePaymentsCreateVerificationSession();

  console.log({ data });

  const handleSubmit = () => {
    createVerificationSession(
      {
        sellerId,
      },
      {
        onSuccess: async (session: { id: string; clientSecret: string }) => {
          const stripe = await stripePromise;
          if (stripe) {
            const result = await stripe.verifyIdentity(session.clientSecret);
            if (result.error) {
              console.error(result.error.message);
            }
          }
        },
      },
    );
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
        <Button colorScheme="primary" onClick={handleSubmit}>
          Verify Personal Information
        </Button>
      </Box>
      {data?.status && (
        <Alert
          status={SellerVerificationStatusRecord[data.status].type}
          variant="left-accent"
          borderRadius="lg"
          mt={2}
        >
          <AlertIcon />
          <Text as={AlertDescription}>
            {SellerVerificationStatusRecord[data.status].message}
          </Text>
        </Alert>
      )}
    </Flex>
  );
};
