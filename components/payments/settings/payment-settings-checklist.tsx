import { StepsCard } from "components/dashboard/StepsCard";
import { PaymentsSettingsKyc } from "./payment-settings-kyc";
import { PaymentsSettingsKyb } from "./payment-settings-kyb";
import { usePaymentsSellerByAccountId } from "@3rdweb-sdk/react/hooks/usePayments";
import { Flex } from "@chakra-ui/react";

interface PaymentsSettingsChecklistProps {
  accountId: string;
}

export const PaymentsSettingsChecklist: React.FC<
  PaymentsSettingsChecklistProps
> = ({ accountId }) => {
  const { data: sellerData } = usePaymentsSellerByAccountId(accountId);
  const steps = [
    {
      title: "Personal Identity Verification",
      description: "",
      completed: !!sellerData?.date_personal_documents_verified,
      children: <PaymentsSettingsKyc />,
    },
    {
      title: "Business Information",
      description: "Connect your wallet to see your eligibility.",
      completed: false,
      children: <PaymentsSettingsKyb />,
    },
  ];

  return (
    <Flex w={{ base: "full", xl: "70%" }}>
      <StepsCard
        title="Complete and verify your seller profile"
        steps={steps}
        delay={0}
      />
    </Flex>
  );
};
