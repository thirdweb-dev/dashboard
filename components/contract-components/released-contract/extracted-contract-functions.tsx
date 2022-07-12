import { Flex, Icon } from "@chakra-ui/react";
import { useSDK } from "@thirdweb-dev/react";
import { AbiFunction, PublishedContract } from "@thirdweb-dev/sdk";
import { BiPencil } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { useQuery } from "react-query";
import invariant from "tiny-invariant";
import { Badge, Heading, Text } from "tw-components";

interface ExtractedContractFunctionsProps {
  contractRelease: PublishedContract;
}

interface ContractFunctionProps {
  fn: AbiFunction;
}
// TODO figure out why this doesnt work??
function useReleasedContractFunctions(contractRelease: PublishedContract) {
  const sdk = useSDK();
  return useQuery(
    ["contract-functions", contractRelease.metadataUri],
    async () => {
      invariant(contractRelease, "contract is not defined");
      invariant(sdk, "sdk not provided");
      const fn = await sdk
        ?.getPublisher()
        .extractFunctions(contractRelease.metadataUri);
      console.log({ fn });
      return fn;
    },
    {
      enabled: !!contractRelease && !!sdk,
    },
  );
}

const ContractFunction: React.FC<ContractFunctionProps> = ({ fn }) => {
  return (
    <Flex flexDir="column" gap={1}>
      <Flex alignItems="center" gap={2}>
        <Heading size="label.md">{fn.name}</Heading>
        {fn.stateMutability === "payable" && (
          <Badge
            size="label.sm"
            variant="subtle"
            rounded={6}
            px={2}
            backgroundColor="green.600"
          >
            Payable
          </Badge>
        )}
      </Flex>
      {fn.comment && (
        <Text fontSize="12px" noOfLines={2}>
          {fn.comment} This is a comment
        </Text>
      )}
    </Flex>
  );
};

export const ExtractedContractFunctions: React.FC<
  ExtractedContractFunctionsProps
> = ({ contractRelease }) => {
  const { data: contractFunctions } =
    useReleasedContractFunctions(contractRelease);
  return (
    <Flex gap={4} px={6} pt={2} pb={5}>
      <Flex flexDir="column" flex="1" gap={3}>
        <Badge size="label.sm" variant="subtle" rounded={6} p={2}>
          <Icon as={BiPencil} mr={2} />
          Actions
        </Badge>
        {(contractFunctions || [])
          .filter(
            (f) => f.stateMutability !== "view" && f.stateMutability !== "pure",
          )
          .map((fn) => (
            <ContractFunction key={fn.name} fn={fn} />
          ))}
      </Flex>
      <Flex flexDir="column" flex="1" gap={3}>
        <Badge size="label.sm" variant="subtle" rounded={6} p={2}>
          <Icon as={BsEye} mr={2} />
          State
        </Badge>
        {(contractFunctions || [])
          .filter(
            (f) => f.stateMutability === "view" || f.stateMutability === "pure",
          )
          .map((fn) => (
            <ContractFunction key={fn.name} fn={fn} />
          ))}
      </Flex>
    </Flex>
  );
};
