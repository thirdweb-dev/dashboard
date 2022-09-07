import { useActiveChainId } from "@3rdweb-sdk/react";
import { useMutation } from "@tanstack/react-query";
import { ChainId, RequiredParam, useSDK } from "@thirdweb-dev/react";
import invariant from "tiny-invariant";
import { Button, ButtonProps } from "tw-components";

export const PAPER_CHAIN_ID_MAP = {
  [ChainId.Mainnet]: "Ethereum",
  [ChainId.Rinkeby]: "Rinkeby",
  [ChainId.Goerli]: "Goerli",
  [ChainId.Polygon]: "Polygon",
  [ChainId.Mumbai]: "Mumbai",
  [ChainId.Avalanche]: "Avalanche",
} as const;

function usePaperRegisterContractMutation(
  jwt: string,
  contractAddress?: string,
) {
  const sdk = useSDK();
  const chainId = useActiveChainId();
  const paperChain =
    PAPER_CHAIN_ID_MAP[chainId as keyof typeof PAPER_CHAIN_ID_MAP];
  return useMutation(async () => {
    invariant(sdk?.auth, "SDK not initialized");
    invariant(paperChain, "unsupported chain id");
    invariant(contractAddress, "contract address required");
    const loginPayload = await sdk?.auth.login("thirdweb.paper.xyz");

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractAddress,
        chain: paperChain,
        loginPayload,
      }),
    };

    const response = await fetch(
      "https://paper.xyz/api/2022-08-12/register-contract-via-thirdweb",
      options,
    );

    return await response.json();
  });
}

interface PaperRegisterContractButtonProps
  extends Omit<ButtonProps, "onClick"> {
  contractAddress: RequiredParam<string>;
  jwt: string;
}

export const PaperRegisterContractButton: React.FC<
  PaperRegisterContractButtonProps
> = ({ jwt, contractAddress, ...restButtonProps }) => {
  const mutation = usePaperRegisterContractMutation(jwt, contractAddress);

  console.log("*** mutation", mutation);

  return (
    <>
      <Button {...restButtonProps} onClick={() => mutation.mutate()}>
        Register contract for paper checkout
      </Button>
    </>
  );
};
