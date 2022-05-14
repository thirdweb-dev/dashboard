import { Box, Icon } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { BsLightningCharge } from "react-icons/bs";
import { ButtonProps, LinkButton } from "tw-components";

interface GeneralCtaProps extends ButtonProps {
  size?: ButtonProps["size"];
  title?: string;
  subtitle?: string;
}

export const GeneralCta: React.FC<GeneralCtaProps> = ({
  size = "md",
  title = "Start building",
  ...props
}) => {
  const { trackEvent } = useTrack();

  return (
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
          title,
        })
      }
      textAlign="center"
      variant="gradient"
      fromcolor="#1D64EF"
      tocolor="#E0507A"
      size={size}
      borderRadius="md"
      href="/dashboard"
      {...props}
    >
      <Box as="span" py={0.5}>
        {title}
      </Box>
    </LinkButton>
  );
};
