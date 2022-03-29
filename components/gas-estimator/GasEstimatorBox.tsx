import { Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";
import { ContractType } from "@thirdweb-dev/sdk";
import {
  CONTRACT_TYPE_NAME_MAP,
  GasEstimatorMap,
  GasPrice,
} from "constants/mappings";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

interface PriceLineProps {
  gasPrice: number;
}

const PriceLine: React.FC<PriceLineProps> = ({ gasPrice, children }) => {
  return (
    <>
      {gasPrice ? <Flex justifyContent="space-between">{children}</Flex> : null}
    </>
  );
};

interface GasEstimatorBoxProps extends BoxProps {
  contractType: ContractType;
  ethOrUsd: "eth" | "usd";
}

export const GasEstimatorBox: React.FC<GasEstimatorBoxProps> = ({
  contractType,
  ethOrUsd,
  ...props
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
    <Box p={6} border="1px solid" borderColor="gray.100" {...props}>
      <Heading size="title.sm" mb={1}>
        {CONTRACT_TYPE_NAME_MAP[contractType]}
      </Heading>
      <PriceLine gasPrice={deployContract as number}>
        <Text>Deploy Contract:</Text>
        <Text>{formatPrice(deployContract as number)}</Text>
      </PriceLine>
      <PriceLine gasPrice={setClaimPhase as number}>
        <Text>Set Claim Phase:</Text>
        <Text>{formatPrice(setClaimPhase as number)}</Text>
      </PriceLine>
      <PriceLine gasPrice={batchUpload as number}>
        <Text>Batch Upload:</Text>
        <Text>{formatPrice(batchUpload as number)}</Text>
      </PriceLine>
      <PriceLine gasPrice={mint as number}>
        <Text>Mint:</Text>
        <Text>{formatPrice(mint as number)}</Text>
      </PriceLine>
      <PriceLine gasPrice={claim as number}>
        <Text>Claim:</Text>
        <Text>{formatPrice(claim as number)}</Text>
      </PriceLine>
      <PriceLine gasPrice={distributeFunds as number}>
        <Text>Distribute funds:</Text>
        <Text>{formatPrice(distributeFunds as number)}</Text>
      </PriceLine>
    </Box>
  );
};
