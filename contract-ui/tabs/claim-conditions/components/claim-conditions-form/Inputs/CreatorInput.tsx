import { CustomFormControl } from "../common";
import { useClaimConditionsFormContext } from "../index";
import { Input } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";

/**
 * Display the creator address
 */
export const CreatorInput: React.FC = () => {
  const { formDisabled, claimConditionType } =
    useClaimConditionsFormContext();
  const walletAddress = useAddress();

  if (claimConditionType !== "creator") {
    return null;
  }

  return (
    <CustomFormControl
      disabled={formDisabled}
      label="Creator address"
      helperText="This wallet address will be able to indefinitely claim. To use a different address, please connect a different wallet."
    >
      <Input disabled readOnly value={walletAddress} />
    </CustomFormControl>
  );
};
