import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Text } from "tw-components";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export const PaymentsSettingsKyc: React.FC = () => {
  /*   const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  }; */

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
        <Button>Verify Personal Information</Button>
      </Box>
    </Flex>
  );
};
