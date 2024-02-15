import {
  Alert,
  AlertIcon,
  Flex,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

interface DeprecatedAlertProps {
  chainName: string;
}

export const DeprecatedAlert: React.FC<DeprecatedAlertProps> = ({
  chainName,
}) => {
  return (
    <Alert
      status="error"
      borderRadius="lg"
      backgroundColor="backgroundCardHighlight"
      borderLeftColor="red.500"
      borderLeftWidth={4}
    >
      <AlertIcon />
      <Flex flexDir="column">
        <AlertTitle>{chainName} is deprecated</AlertTitle>
        <AlertDescription>
          thirdweb services are not available on this network.
        </AlertDescription>
      </Flex>
    </Alert>
  );
};
