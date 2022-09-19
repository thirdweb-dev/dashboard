import { TokenSupplyLayout } from "./supply-layout";
import {
  getErcs,
  useAddress,
  useContract,
  useTokenBalance,
  useTokenSupply,
} from "@thirdweb-dev/react";

interface TokenBalancesProps {
  contractQuery: ReturnType<typeof useContract>;
}

export const TokenSupply: React.FC<TokenBalancesProps> = ({
  contractQuery,
}) => {
  const address = useAddress();
  const { erc20 } = getErcs(contractQuery.contract);
  const { data: tokenSupply, isSuccess: isTokenSupplySuccess } =
    useTokenSupply(erc20);
  const { data: ownedBalance, isSuccess: isOwnedBalanceSuccess } =
    useTokenBalance(erc20, address);

  return (
    <TokenSupplyLayout
      isTokenSupplySuccess={isTokenSupplySuccess}
      tokenSupply={tokenSupply}
      isOwnedBalanceSuccess={isOwnedBalanceSuccess}
      address={address}
      ownedBalance={ownedBalance}
    />
  );
};
