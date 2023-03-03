import { useContract, useSetAppURI } from "@thirdweb-dev/react";
import { ContractWithMetadata } from "@thirdweb-dev/sdk";
import { TransactionButton } from "components/buttons/TransactionButton";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";

export interface SetAppUriProps {
  selectedContract: ContractWithMetadata;
}

const SetAppUriWrapped: React.FC<SetAppUriProps> = ({ selectedContract }) => {
  const { contract } = useContract(selectedContract.address);
  const { mutate: setAppURI, isLoading } = useSetAppURI(contract);
  const uri = useSingleQueryParam("uri");
  const router = useRouter();

  return (
    <TransactionButton
      m={2}
      colorScheme="blue"
      onClick={() =>
        setAppURI(
          { uri: `ipfs://${uri}` },
          {
            onSuccess: () =>
              router.push(
                `/${selectedContract.chainId}/${selectedContract.address}/appuri`,
              ),
          },
        )
      }
      isLoading={isLoading}
      transactionCount={1}
    >
      Set AppURI
    </TransactionButton>
  );
};

export const SetAppUri: React.FC<SetAppUriProps> = ({ selectedContract }) => {
  return (
    <CustomSDKContext desiredChainId={selectedContract.chainId}>
      <SetAppUriWrapped selectedContract={selectedContract} />
    </CustomSDKContext>
  );
};
