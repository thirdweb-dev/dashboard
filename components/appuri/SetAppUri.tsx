import { useContract, useSetAppURI } from "@thirdweb-dev/react";
import { ContractWithMetadata } from "@thirdweb-dev/sdk";
import { TransactionButton } from "components/buttons/TransactionButton";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";

export interface SetAppUriProps {
  contractWithMetadata: ContractWithMetadata;
}

const SetAppUriWrapped: React.FC<SetAppUriProps> = ({
  contractWithMetadata,
}) => {
  const { contract } = useContract(contractWithMetadata.address);
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
                `/${contractWithMetadata.chainId}/${contractWithMetadata.address}/appuri`,
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

export const SetAppUri: React.FC<SetAppUriProps> = ({
  contractWithMetadata,
}) => {
  return (
    <CustomSDKContext desiredChainId={contractWithMetadata.chainId}>
      <SetAppUriWrapped contractWithMetadata={contractWithMetadata} />
    </CustomSDKContext>
  );
};
