import { Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";
import { ContractType } from "@thirdweb-dev/sdk";
import {
  CONTRACT_TYPE_NAME_MAP,
  GasEstimatorMap,
  GasPrice,
} from "constants/mappings";
import { ethers } from "ethers";

interface PriceLineProps {
  gasPrice?: number;
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
  data: { gasPrice: number; ethPrice: number };
}

export const GasEstimatorBox: React.FC<GasEstimatorBoxProps> = ({
  contractType,
  ethOrUsd,
  data,
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

  const formatPrice = (price: number | undefined) => {
    if (price && ethOrUsd === "eth") {
      return `~${Number(
        ethers.utils.formatUnits(
          `${((data?.gasPrice as number) || 30) * price}`,
          "gwei",
        ),
      ).toFixed(4)} ETH`;
    } else if (price && ethOrUsd === "usd") {
      return `~$${(
        Number(
          ethers.utils.formatUnits(
            `${((data?.gasPrice as number) || 30) * price}`,
            "gwei",
          ),
        ) * (data?.ethPrice || 3400)
      ).toFixed(2)}`;
    }
  };

  return (
    <Box p={6} border="1px solid" borderColor="gray.50" {...props}>
      <Heading size="title.sm" mb={1}>
        {CONTRACT_TYPE_NAME_MAP[contractType]}
      </Heading>
      <PriceLine gasPrice={deployContract}>
        <Text>Deploy Contract:</Text>
        <Text>{formatPrice(deployContract)}</Text>
      </PriceLine>
      <PriceLine gasPrice={setClaimPhase}>
        <Text>Set Claim Phase:</Text>
        <Text>{formatPrice(setClaimPhase)}</Text>
      </PriceLine>
      <PriceLine gasPrice={batchUpload}>
        <Text>Batch Upload:</Text>
        <Text>{formatPrice(batchUpload)}</Text>
      </PriceLine>
      <PriceLine gasPrice={mint}>
        <Text>Mint:</Text>
        <Text>{formatPrice(mint)}</Text>
      </PriceLine>
      <PriceLine gasPrice={claim}>
        <Text>Claim:</Text>
        <Text>{formatPrice(claim)}</Text>
      </PriceLine>
      <PriceLine gasPrice={distributeFunds}>
        <Text>Distribute funds:</Text>
        <Text>{formatPrice(distributeFunds)}</Text>
      </PriceLine>
    </Box>
  );
};
