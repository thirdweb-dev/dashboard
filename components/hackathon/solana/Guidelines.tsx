import { Flex } from "@chakra-ui/react";
import { Heading, Text } from "tw-components";

export const Guidelines: React.FC = () => {
  return (
    <Flex w="full" flexDir="column" align="center" justify="center" my={20}>
      <Heading fontSize="48px">Guidelines</Heading>
      <Text color="white" mt={4} px={40} fontSize="16px">
        Join a community of the most hype builders in web3 for thirdweb’s first
        official hack event – Solanathon - a 7 day hackathon with more than
        $10,000 in rewards for innovative and inspiring builds on the Solana
        blockchain, powered by thirdweb. <br /> <br />
        We’re splitting the bounty across several tracks to enable access for
        both technical and non-technical builders. Additionally, we’re stoked to
        welcome support from both our ecosystem and community partners, both IRL
        at our NYC kickoff event on 10/19 in addition to providing invaluable
        thought leadership and. <br />
        <br />
        Participants can register in teams of 2+ and will need to follow
        respective track submission requirements in order to qualify for the
        prize pool. If you have any questions don’t hesitate to reach out to us
        in Discord or on social. Kindly be sure to reference the Hackathon T&C
        before submitting your participation. We couldn’t be more thrilled to
        see what y’all will build. WAGMI.
      </Text>
    </Flex>
  );
};
