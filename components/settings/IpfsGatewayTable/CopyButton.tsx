import { Flex, Icon, Tooltip, useClipboard, useToast } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { FiCopy } from "react-icons/fi";
import { Button, Card, Text } from "tw-components";

interface CopyIpfsGatewayButtonProps {
  ipfsGateway: string;
}

export const CopyIpfsGatewayButton: React.FC<CopyIpfsGatewayButtonProps> = ({
  ipfsGateway,
}) => {
  const { onCopy } = useClipboard(ipfsGateway);
  const trackEvent = useTrack();
  const toast = useToast();

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    onCopy();

    toast({
      variant: "solid",
      position: "bottom",
      title: `IPFS gateway copied.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    trackEvent({
      category: "ipfs_gateway_button",
      action: "copy",
      ipfsGateway,
    });
  };

  return (
    <Flex gap={2} align="center">
      <Text fontFamily="mono">
        {ipfsGateway.length > 24
          ? `${ipfsGateway.substring(0, 12)}...
        ${ipfsGateway.substring(ipfsGateway.length - 12)}`
          : ipfsGateway}
      </Text>
      <Tooltip
        p={0}
        bg="transparent"
        boxShadow={"none"}
        label={
          <Card py={2} px={4} bgColor="backgroundHighlight">
            <Text size="label.sm">Copy IPFS gateway to clipboard</Text>
          </Card>
        }
      >
        <Button size="sm" p={0} variant="ghost" onClick={handleCopy}>
          <Icon boxSize={3} as={FiCopy} color="blue.500" />
        </Button>
      </Tooltip>
    </Flex>
  );
};
