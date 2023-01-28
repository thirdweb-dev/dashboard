import { useDashboardNetwork } from "@3rdweb-sdk/react";
import { Stack } from "@chakra-ui/react";
import { useCancelDirectListing } from "@thirdweb-dev/react";
import type { ListingType, MarketplaceV3 } from "@thirdweb-dev/sdk/evm";
import { TransactionButton } from "components/buttons/TransactionButton";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";

interface CancelTabProps {
  contract: MarketplaceV3;
  listingId: string;
  listingType: ListingType;
}

export const CancelTab: React.FC<CancelTabProps> = ({
  contract,
  listingId,
  listingType,
}) => {
  const trackEvent = useTrack();
  const network = useDashboardNetwork();

  const cancelListing = useCancelDirectListing(contract);

  const { onSuccess, onError } = useTxNotifications(
    "Listing cancelled",
    "Error cancelling listing",
  );
  return (
    <Stack pt={3} gap={3}>
      {/* maybe some text? */}
      <TransactionButton
        transactionCount={1}
        isLoading={cancelListing.isLoading}
        onClick={() => {
          trackEvent({
            category: "marketplace",
            action: "cancel-listing",
            label: "attempt",
          });
          cancelListing.mutate(listingId, {
            onSuccess: () => {
              trackEvent({
                category: "marketplace",
                action: "cancel-listing",
                label: "success",
                network,
              });
              onSuccess();
            },
            onError: (error) => {
              trackEvent({
                category: "marketplace",
                action: "cancel-listing",
                label: "error",
                network,
                error,
              });
              onError(error);
            },
          });
        }}
        colorScheme="primary"
        alignSelf="flex-end"
      >
        Cancel Listing
      </TransactionButton>
    </Stack>
  );
};
