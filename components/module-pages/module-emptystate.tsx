import { useIsAccountRole } from "@3rdweb-sdk/react";
import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { useWeb3 } from "@3rdweb/hooks";
import { Role } from "@3rdweb/sdk";
import Icon from "@chakra-ui/icon";
import { Container, Heading, Stack } from "@chakra-ui/layout";
import { ChakraNextImage } from "components/Image";
import { MismatchButton } from "components/shared/MismatchButton";
import React from "react";
import { IconType } from "react-icons";
import { removeNull } from "utils/removeNull";

export interface IModuleEmptyState {
  title: string;
  action: {
    label: string;
    icon: IconType;
    onClick: () => void;
    requiredRole?: Role;
  };

  module?: EitherBaseModuleType;
}

export const ModuleEmptyState: React.FC<IModuleEmptyState> = ({
  title,
  action,
  module,
}) => {
  const { address } = useWeb3();

  const showButton = useIsAccountRole(
    (action.requiredRole || "") as Role,
    module,
    removeNull(address),
  );

  return (
    <Container maxW="lg" py={14}>
      <Stack spacing={7} align="center">
        <ChakraNextImage
          src={require("public/assets/illustrations/empty-state.png")}
          alt="Empty state illustration"
          w="130px"
        />
        <Heading size="label.lg" fontSize="label.2xl" textAlign="center">
          {title}
        </Heading>
        {showButton ? (
          <MismatchButton
            size="lg"
            colorScheme="primary"
            onClick={action.onClick}
            leftIcon={<Icon as={action.icon} />}
          >
            {action.label}
          </MismatchButton>
        ) : null}
      </Stack>
    </Container>
  );
};
