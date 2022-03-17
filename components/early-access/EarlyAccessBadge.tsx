import {
  Button,
  ButtonProps,
  Icon,
  IconButton,
  Tooltip,
  useBoolean,
  useBreakpointValue,
} from "@chakra-ui/react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { EarlyAccessCard } from "./EarlyAccessCard";
import { useEarlyAccessToken } from "./hook";

export const EarlyAccessBadge: React.FC<ButtonProps> = (buttonProps) => {
  const earlyAccessToken = useEarlyAccessToken();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [flag, setFlag] = useBoolean();

  if (earlyAccessToken === undefined) {
    return null;
  }

  return (
    <Tooltip
      boxShadow="none"
      bg="transparent"
      pointerEvents={"all"}
      label={
        <EarlyAccessCard
          zIndex={9999}
          w={{ base: undefined, md: "450px", lg: "600px" }}
        />
      }
      isOpen={flag}
      width="auto"
      hasArrow
      placement="auto"
    >
      <Button
        variant={"solid"}
        borderRadius="md"
        onClick={setFlag.toggle}
        _focus={isMobile ? undefined : { boxShadow: "none" }}
        as={isMobile ? IconButton : undefined}
        leftIcon={
          isMobile ? undefined : (
            <Icon as={IoShieldCheckmarkSharp} boxSize={6} />
          )
        }
        icon={
          isMobile ? (
            <Icon as={IoShieldCheckmarkSharp} boxSize={5} />
          ) : undefined
        }
        size="sm"
        color="gray.600"
        {...buttonProps}
      >
        Early Access
      </Button>
    </Tooltip>
  );
};
