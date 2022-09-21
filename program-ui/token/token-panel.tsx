import { Flex } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { CurrencyValue } from "@thirdweb-dev/sdk";
import { Token } from "@thirdweb-dev/solana/dist/declarations/src/contracts/token";
import { TokenMetadata } from "@thirdweb-dev/solana/dist/declarations/src/types/nft";
import { TokenSupplyLayout } from "contract-ui/tabs/tokens/components/supply-layout";
import { BigNumber } from "ethers";
import {
  useProgramMetadata,
  useSolOwnedTokenSupply,
} from "program-ui/hooks/program";
import { Heading } from "tw-components";

export const TokenPanel: React.FC<{
  account: Token;
}> = ({ account }) => {
  return (
    <Flex direction="column" gap={6}>
      <Flex direction="row" justify="space-between" align="center">
        <Heading size="title.sm">Contract Tokens</Heading>
      </Flex>
      <TokenSupply account={account} />
    </Flex>
  );
};

export const TokenSupply: React.FC<{
  account: Token;
}> = ({ account }) => {
  const wallet = useWallet();
  const address = wallet?.publicKey?.toBase58();
  const metadataQuery = useProgramMetadata(account);
  const ownedTokensQuery = useSolOwnedTokenSupply(account, address);
  return (
    <TokenSupplyLayout
      isTokenSupplySuccess={metadataQuery.isSuccess}
      tokenSupply={toDashboardSupply(metadataQuery)}
      isOwnedBalanceSuccess={ownedTokensQuery.isSuccess}
      address={address}
      ownedBalance={toDashboardSupply(metadataQuery, ownedTokensQuery)}
    />
  );
};

// TODO (SOL) - consolidate schema types between sol and sdk
const toDashboardSupply = (
  query: ReturnType<typeof useProgramMetadata>,
  ownedTokensQuery?: ReturnType<typeof useSolOwnedTokenSupply>,
): CurrencyValue | undefined => {
  const data = query.data as TokenMetadata;
  if (!data) {
    return undefined;
  }
  return {
    name: data.name?.toString() || "",
    symbol: data?.symbol || "",
    value: BigNumber.from(0),
    decimals: data?.decimals || 0,
    displayValue: ownedTokensQuery?.data
      ? ownedTokensQuery?.data?.displayValue
      : // eslint-disable-next-line line-comment-position
        (data as any).supply.displayValue, // TODO (SOL) remove this cast once its exported properly
  };
};
