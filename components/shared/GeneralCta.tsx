import { LinkButton } from "./LinkButton";
import { useWeb3 } from "@3rdweb-sdk/react";
import { Box, Flex, Icon, Stack } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { BsLightningCharge } from "react-icons/bs";
import { IoRocketOutline } from "react-icons/io5";
import { VscDashboard } from "react-icons/vsc";

interface GeneralCtaProps {
  size?: string;
}

export const GeneralCta: React.FC<GeneralCtaProps> = ({ size = "md" }) => {
  const { address } = useWeb3();
  const { trackEvent } = useTrack();

  return (
    <Flex w="100%">
      {address ? (
        <LinkButton
          leftIcon={<Icon as={VscDashboard} color="#1D64EF" />}
          color="black"
          _hover={{ opacity: 0.8 }}
          _focus={{ bgColor: "purple.600" }}
          _active={{ bgColor: "purple.600" }}
          px={20}
          py={6}
          onClick={() =>
            trackEvent({
              category: "cta-button",
              action: "click",
              label: "go-to-dashboard",
            })
          }
          textAlign="center"
          variant="gradient"
          fromColor="#1D64EF"
          toColor="#E0507A"
          size={size}
          href="/dashboard"
          borderRadius="md"
        >
          <Box>Go to dashboard</Box>
        </LinkButton>
      ) : (
        <LinkButton
          leftIcon={<Icon as={BsLightningCharge} color="#1D64EF" />}
          color="black"
          _hover={{ opacity: 0.8 }}
          _focus={{ bgColor: "purple.600" }}
          _active={{ bgColor: "purple.600" }}
          px={20}
          py={6}
          onClick={() =>
            trackEvent({
              category: "cta-button",
              action: "click",
              label: "start",
            })
          }
          textAlign="center"
          variant="gradient"
          fromColor="#1D64EF"
          toColor="#E0507A"
          size={size}
          href="/dashboard"
          borderRadius="md"
        >
          <Box>Start building</Box>
        </LinkButton>
      )}
    </Flex>
  );
};
