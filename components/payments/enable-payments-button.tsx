import { usePaymentsRegisterContract } from "@3rdweb-sdk/react/hooks/usePayments";
import { Flex } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useRouter } from "next/router";
import { Button } from "tw-components";

interface EnablePaymentsButtonProps {
  contractAddress: string;
  chainId: number;
}

export const EnablePaymentsButton: React.FC<EnablePaymentsButtonProps> = ({
  contractAddress,
  chainId,
}) => {
  const { mutate: registerContract } = usePaymentsRegisterContract();
  const router = useRouter();
  const trackEvent = useTrack();

  const { onSuccess, onError } = useTxNotifications(
    "Successfully enabled payments",
    "Failed to enable payments",
  );

  return (
    <Flex justifyContent="end">
      <Button
        colorScheme="blackAlpha"
        size="sm"
        onClick={() => {
          trackEvent({
            category: "payments",
            action: "enable-payments",
            label: "attempt",
          });
          registerContract(
            {
              chain: `${chainId}`,
              contractAddress,
            },
            {
              onSuccess: () => {
                trackEvent({
                  category: "payments",
                  action: "enable-payments",
                  label: "success",
                });
                router.push(
                  `/${chainId}/${contractAddress}/payments`,
                  undefined,
                  { scroll: true },
                );
                onSuccess();
              },
              onError: (error) => {
                trackEvent({
                  category: "payments",
                  action: "enable-payments",
                  label: "error",
                  error,
                });
                onError(error);
              },
            },
          );
        }}
        px={6}
      >
        Enable Payments
      </Button>
    </Flex>
  );
};
