import { Text } from "@chakra-ui/react";
import { ContractType } from "@thirdweb-dev/sdk";
import { CONTRACT_TYPE_NAME_MAP, GasEstimatorMap, GasPrice } from "constants/mappings";
import { ethers } from "ethers";
import { useEffect, useState } from "react";


interface GasEstimatorBoxProps {
  contractType: ContractType;
}

export const GasEstimatorBox: React.FC<GasEstimatorBoxProps> = ({
  contractType,
}) => {
  const {
    deployContract,
    setClaimPhase,
    batchUpload,
    mint,
    claim,
    distributeFunds,
  }: GasPrice = GasEstimatorMap[contractType];

  const [gasPrice, setGasPrice] = useState<number>(30);
  const [ethPrice, setEthPrice] = useState<number>(3000);
  const [ethOrUsd, setEthOrUsd] = useState<"eth" | "usd">("usd");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/gas`);
      const data = await res.json();
      const gasNumber = Number(data.gas);
      const ethNumber = Number(data.ethPrice);
      setGasPrice(gasNumber);
      setEthPrice(ethNumber);
    };
    fetchData();
  }, []);

  const formatPrice = (price: number) => {
    if (price && ethOrUsd === "eth") {
      return `${Number(
        ethers.utils.formatUnits(`${(gasPrice as number) * price}`, "gwei"),
      ).toFixed(4)} ETH`;
    } else if (price && ethOrUsd === "usd") {
      return `$${(
        Number(
          ethers.utils.formatUnits(`${(gasPrice as number) * price}`, "gwei"),
        ) * ethPrice
      ).toFixed(2)}`;
    }
  };

  return (
    <div>
      {CONTRACT_TYPE_NAME_MAP[contractType]}
      {deployContract && (
        <Text>Deploy Contract: {formatPrice(deployContract)}</Text>
      )}
      {setClaimPhase && (
        <Text>Set Claim Phase: {formatPrice(setClaimPhase)}</Text>
      )}
      {batchUpload && <Text>Batch Upload: {formatPrice(batchUpload)}</Text>}
      {mint && <Text>Mint: {formatPrice(mint)}</Text>}
      {claim && <Text>Claim: {formatPrice(claim)}</Text>}
      {distributeFunds && (
        <Text>Distribute funds: {formatPrice(distributeFunds)}</Text>
      )}
    </div>
  );
};