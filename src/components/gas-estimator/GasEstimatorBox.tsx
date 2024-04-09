import { GasEstimate } from "@3rdweb-sdk/react/hooks/useGas";
import { Box, BoxProps, Flex, Icon, Tooltip } from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "@react-icons/all-files/ai/AiOutlineInfoCircle";
import { utils } from "ethers";
import { useTrack } from "hooks/analytics/useTrack";
import { FiExternalLink } from "react-icons/fi";
import { Heading, Link, Text } from "tw-components";

interface GasEstimatorBoxProps extends BoxProps {
  ethOrUsd: "eth" | "usd";
  data: BenchmarkItem;
  gasEstimate?: GasEstimate;
}

export type BenchmarkItem = {
  contractName: string;
  benchmarks: Array<{
    functionName: string;
    gasCost: string;
  }>;
};

export const GasEstimatorBox: React.FC<GasEstimatorBoxProps> = ({
  data,
  ethOrUsd,
  gasEstimate,
  ...props
}) => {
  const formatPrice = (price: number | undefined) => {
    if (price && ethOrUsd === "eth") {
      return `~${Number(
        utils.formatUnits(
          `${((gasEstimate?.gasPrice as number) || 30) * price}`,
          "gwei",
        ),
      ).toFixed(4)} ETH`;
    } else if (price && ethOrUsd === "usd") {
      return `~$${(
        Number(
          utils.formatUnits(
            `${((gasEstimate?.gasPrice as number) || 30) * price}`,
            "gwei",
          ),
        ) * (gasEstimate?.ethPrice || 3400)
      ).toFixed(2)}`;
    }
  };
  const trackEvent = useTrack();
  return (
    <Box p={6} border="1px solid" borderColor="borderColor" {...props}>
      <Link
        href={`https://portal.thirdweb.com/contracts/explore/pre-built-contracts//${mapContractType(data.contractName)}`}
        onClick={() =>
          trackEvent({
            category: "gas-estimator",
            action: "click",
            label: "portal-link",
            contractType: data.contractName,
          })
        }
        isExternal
      >
        <Heading size="title.sm" mb={1} mr={1} as={Flex} alignItems="center">
          {beautifyContractName(data.contractName)}
          <Icon as={FiExternalLink} ml={1} boxSize={4} />
        </Heading>
      </Link>
      {data.benchmarks.map((item) => (
        <Flex justifyContent="space-between" key={item.functionName}>
          <Tooltip label={parseFunctionMeaning(item.functionName)}>
            <Flex justifyContent="center" alignItems="center">
              <Text noOfLines={1} maxW={"150px"} mr={1}>
                {item.functionName}:
              </Text>
              <Icon as={AiOutlineInfoCircle} boxSize={4} />
            </Flex>
          </Tooltip>
          <Text>{formatPrice(Number(item.gasCost))}</Text>
        </Flex>
      ))}
    </Box>
  );
};

const beautifyContractName = (contractName: string): string => {
  return contractName.charAt(0).toUpperCase() + contractName.slice(1);
};

const mapContractType = (contractName: string): string => {
  return contractName;
};

/**
 * Some items are benchmarked with very large sets of toke which causes the gas price to be high
 * So we need to properly display the details to avoid misunderstandings
 * @param functionName Name of the benchmarked function
 * @param contractName Name of the contract (contract type)
 * @returns
 */
const parseFunctionMeaning = (
  functionName: string,
  // contractName: string,
): string => {
  return functionName;
};
