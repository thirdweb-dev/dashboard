import { useDashboardEVMChainId } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import { usePaymentsContractByAddressAndChain } from "@3rdweb-sdk/react/hooks/usePayments";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { PaymentsAnalytics } from "./components/payments-analytics";
import { PaymentCheckouts } from "./components/payments-checkouts";

interface ContractPaymentsPageProps {
  contractAddress?: string;
}

export const ContractPaymentsPage: React.FC<ContractPaymentsPageProps> = ({
  contractAddress,
}) => {
  const chainId = useDashboardEVMChainId();
  const { data: paymentContract } = usePaymentsContractByAddressAndChain(
    contractAddress,
    chainId,
  );
  useEffect(() => {
    window?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!contractAddress) {
    // TODO build a skeleton for this
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" gap={6}>
      payments page yay
      {paymentContract?.id && (
        <PaymentCheckouts
          contractId={paymentContract?.id}
          contractAddress={contractAddress}
        />
      )}
      {paymentContract?.id && (
        <PaymentsAnalytics contractId={paymentContract?.id} />
      )}
    </Flex>
  );
};
