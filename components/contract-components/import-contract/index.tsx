import { useImportContract } from "@3rdweb-sdk/react/hooks/useImportContract";
import { Flex } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { Button, Heading } from "tw-components";

interface ImportContractProps {
  contractAddress: string;
}

export const ImportContract: React.FC<ImportContractProps> = ({
  contractAddress,
}) => {
  const trackEvent = useTrack();
  const importContract = useImportContract();

  const { onSuccess, onError } = useTxNotifications(
    "Contract imported successfully",
    "Failed to import contract",
  );

  return (
    <Flex direction="column" gap={8}>
      <Flex direction="column" gap={6}>
        <Heading size="title.sm">Import Contract</Heading>
        <Button
          onClick={() => {
            trackEvent({
              category: "import-contract",
              action: "click",
              label: "attempt",
            });
            importContract.mutate(contractAddress, {
              onSuccess: () => {
                trackEvent({
                  category: "import-contract",
                  action: "click",
                  label: "success",
                });
                onSuccess();
                window.location.reload();
              },
              onError: (error) => {
                trackEvent({
                  category: "import-contract",
                  action: "click",
                  label: "error",
                  error,
                });
                onError(error);
              },
            });
          }}
          isLoading={importContract.isLoading}
        >
          Import Contract
        </Button>
      </Flex>
    </Flex>
  );
};
