import {
  Box,
  ButtonGroup,
  Code,
  Divider,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import {
  useActiveChainId,
  useContract,
  useContractFunctions,
} from "@thirdweb-dev/react";
import { AbiFunction } from "@thirdweb-dev/sdk/dist/src/schema/contracts/custom";
import { TransactionButton } from "components/buttons/TransactionButton";
import { CodeSegment } from "components/contract-tabs/code/CodeSegment";
import { Environment } from "components/contract-tabs/code/types";
import { BigNumber, utils } from "ethers";
import { useId, useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FiCode, FiEdit2, FiEye, FiPlay, FiSearch } from "react-icons/fi";
import {
  Badge,
  Button,
  Card,
  CodeBlock,
  FormHelperText,
  FormLabel,
  Heading,
  Text,
} from "tw-components";
import { SupportedChainIdToNetworkMap } from "utils/network";

interface ContentOverviewProps {
  contractAddress?: string;
}

export const CustomContractCode: React.FC<ContentOverviewProps> = ({
  contractAddress,
}) => {
  const functionsQuery = useContractFunctions(contractAddress);

  const [functionFilter, setFunctionFilter] = useState("");

  const { readFunctions, writeFunctions } = useMemo(() => {
    const filteredFns = (functionsQuery.data || []).filter(
      (f) => f.name.toLowerCase().indexOf(functionFilter.toLowerCase()) > -1,
    );

    return {
      readFunctions: filteredFns.filter(
        (f) => f.stateMutability === "view" || f.stateMutability === "pure",
      ),
      writeFunctions: filteredFns.filter(
        (f) => f.stateMutability !== "view" && f.stateMutability !== "pure",
      ),
    };
  }, [functionFilter, functionsQuery.data]);

  const [selectedSig, setSelectedSig] = useState<string>(() =>
    writeFunctions[0] ? writeFunctions[0].name : "",
  );

  const selectedFn = useMemo(() => {
    return functionsQuery.data?.find((fn) => fn.signature === selectedSig);
  }, [functionsQuery.data, selectedSig]);

  if (functionsQuery.isError) {
    return <Box>Contract does not support generated functions</Box>;
  }

  return (
    <Flex gap={3} flexDirection="column" w="100%">
      <Heading size="subtitle.md">Contract Explorer</Heading>
      {functionsQuery.data && contractAddress && (
        <Card overflow="hidden" p={0} minH="400px">
          <SimpleGrid columns={12}>
            <Card
              gridColumn={{ base: "span 12", md: "span 3" }}
              borderWidth="0px"
              borderRightWidth="1px"
              as={Flex}
              flexShrink={0}
              gap={2}
              flexDirection="column"
              borderRightRadius={{ base: undefined, md: "none" }}
              borderBottomRadius={{ base: "none", md: undefined }}
              boxShadow="none"
            >
              <InputGroup>
                <InputLeftAddon>
                  <Icon as={FiSearch} />
                </InputLeftAddon>
                <Input
                  value={functionFilter}
                  onChange={(e) => setFunctionFilter(e.currentTarget.value)}
                  placeholder="Type to filter"
                />
              </InputGroup>
              <Divider />
              <List
                gap={0.5}
                as={Flex}
                flexDir="column"
                overflow="auto"
                h={{ base: "300px", md: "600px" }}
                flexGrow={1}
              >
                {writeFunctions.map((abiFn) => (
                  <ListItem key={abiFn.signature}>
                    <Button
                      borderRadius="sm"
                      size="sm"
                      onClick={() => setSelectedSig(abiFn.signature)}
                      colorScheme={
                        selectedFn && selectedFn.signature === abiFn.signature
                          ? "purple"
                          : undefined
                      }
                      variant={
                        selectedFn && selectedFn.signature === abiFn.signature
                          ? "solid"
                          : "ghost"
                      }
                      w="full"
                      justifyContent="start"
                      leftIcon={<FiEdit2 />}
                    >
                      {abiFn.name}
                    </Button>
                  </ListItem>
                ))}

                {readFunctions.map((abiFn) => (
                  <ListItem key={abiFn.signature}>
                    <Button
                      borderRadius="sm"
                      size="sm"
                      onClick={() => setSelectedSig(abiFn.signature)}
                      colorScheme={
                        selectedFn && selectedFn.signature === abiFn.signature
                          ? "purple"
                          : undefined
                      }
                      variant={
                        selectedFn && selectedFn.signature === abiFn.signature
                          ? "solid"
                          : "ghost"
                      }
                      w="full"
                      justifyContent="start"
                      leftIcon={<FiEye />}
                    >
                      {abiFn.name}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Card>
            <InteractiveAbiFunction
              key={selectedFn?.name || "nonexsitent"}
              contractAddress={contractAddress}
              abiFunction={selectedFn}
            />
          </SimpleGrid>
        </Card>
      )}
    </Flex>
  );
};

function formatResponseData(data: unknown): string {
  if (BigNumber.isBigNumber(data)) {
    data = data.toString();
  }

  if (typeof data === "object") {
    const receipt: any = (data as any).receipt;
    if (receipt) {
      data = {
        to: receipt.to,
        from: receipt.from,
        transactionHash: receipt.transactionHash,
        events: receipt.events,
      };
    }
  }

  return JSON.stringify(data, null, 2);
}

function displayString(str: string) {
  // Only add quotes around string if they aren't already there
  return str[0] === '"' && str.slice(-1) === '"' ? `${str}` : `"${str}"`;
}

function parseParameter(param: any, language: Environment): string {
  if (!param.value) {
    return param.key;
  }

  // Different syntax for go maps and arrays
  if (language === "go") {
    try {
      const parsed = JSON.parse(param.value);
      if (Array.isArray(parsed)) {
        return `[]interface{}{${parsed
          .map((p) => parseParameter({ value: JSON.stringify(p) }, "go"))
          .join(", ")}}`;
      } else if (typeof parsed === "object") {
        return `map[string]interface{}{${Object.keys(parsed)
          .map(
            (k) => `"${k}": ${parseParameter({ value: `${parsed[k]}` }, "go")}`,
          )
          .join(", ")}}`;
      }
      {
        return displayString(param.value);
      }
    } catch {
      return displayString(param.value);
    }
  }

  try {
    const parsed = JSON.parse(param.value);
    if (Array.isArray(parsed) || typeof parsed === "object") {
      return param.value;
    }
  } catch {
    return displayString(param.value);
  }

  return displayString(param.value);
}

type FunctionComponents = {
  name: string;
  type: string;
  [key: string]: any;
}[];

function formatInputType(type: string, components?: FunctionComponents): any {
  if (type.includes("[]")) {
    const obj = [];
    obj.push(formatInputType(type.replace("[]", ""), components));
    return obj;
  } else if (type.includes("tuple")) {
    const obj: any = {};
    components?.forEach((component) => {
      obj[component.name] = formatInputType(
        component.type,
        component.components,
      );
    });
    return obj;
  } else if (type.includes("string")) {
    return "...";
  } else if (type.includes("int")) {
    return 0;
  } else if (type.includes("bool")) {
    return true;
  } else if (type.includes("address")) {
    return "0x...";
  } else {
    return "0";
  }
}

function formatHint(type: string, components?: FunctionComponents): string {
  const placeholder = formatInputType(type, components);
  return JSON.stringify(placeholder)
    .replaceAll(",", ", ")
    .replaceAll(":", ": ")
    .replaceAll("{", "{ ")
    .replaceAll("}", " }");
}

function formatError(error: Error): string {
  if (error.message) {
    return error.message.split("| Raw error |\n")[0].trim();
  }

  try {
    return JSON.stringify(error);
  } catch {
    return error.toString();
  }
}

interface InteractiveAbiFunctionProps {
  abiFunction?: AbiFunction;
  contractAddress: string;
}

const InteractiveAbiFunction: React.FC<InteractiveAbiFunctionProps> = ({
  abiFunction,
  contractAddress,
}) => {
  const formId = useId();
  const { contract, isLoading: contractLoading } = useContract(contractAddress);

  const initialFocusRef = useRef<HTMLButtonElement>(null);

  const { register, control, getValues, handleSubmit, watch } = useForm({
    defaultValues: {
      params:
        abiFunction?.inputs.map((i) => ({
          key: i.name || "key",
          value: "",
          type: i.type,
          components: i.components,
        })) || [],
      value: "0",
    },
  });
  const { fields } = useFieldArray({
    control,
    name: "params",
  });

  const isView = useMemo(() => {
    return (
      !abiFunction ||
      abiFunction.stateMutability === "view" ||
      abiFunction.stateMutability === "pure"
    );
  }, [abiFunction]);

  const chainId = useActiveChainId();
  const chainName =
    SupportedChainIdToNetworkMap[
      chainId as keyof typeof SupportedChainIdToNetworkMap
    ];
  const [codeEnv, setCodeEnv] = useState<Environment>("react");

  async function contractCall(params: unknown[], value?: BigNumber) {
    if (!abiFunction) {
      return undefined;
    }

    const parsedParams = params.map((p) => {
      try {
        const parsed = JSON.parse(p as string);
        if (Array.isArray(parsed) || typeof parsed === "object") {
          return parsed;
        } else {
          // Return original value if its not an array or object
          return p;
        }
      } catch {
        // JSON.parse on string will throw an error
        return p;
      }
    });

    if (value) {
      parsedParams.push({
        value,
      });
    }

    return await contract?.call(abiFunction.name as string, ...parsedParams);
  }

  const {
    mutate,
    data,
    error,
    isLoading: mutationLoading,
  } = useMutation(
    async ({ params, value }: { params: unknown[]; value: BigNumber }) =>
      contractCall(params || [], value),
  );

  return (
    <Card
      gridColumn={{ base: "span 12", md: "span 9" }}
      borderRadius="none"
      bg="transparent"
      border="none"
      as={Flex}
      flexDirection="column"
      gap={4}
      boxShadow="none"
      flexGrow={1}
      w="100%"
    >
      <Flex gap={2} direction="column">
        <Flex gap={2} align="center">
          <Heading size="title.sm">
            {abiFunction?.name || "No function selected"}
          </Heading>
          {abiFunction?.stateMutability && (
            <Badge size="label.sm" variant="subtle">
              {abiFunction?.stateMutability}
            </Badge>
          )}
        </Flex>
        {!abiFunction ? (
          <Text>Please select a function on the left to get started</Text>
        ) : (
          <>
            {abiFunction?.comment && (
              <Text fontSize="12px" noOfLines={2}>
                {abiFunction.comment}
              </Text>
            )}
          </>
        )}
      </Flex>
      <Flex
        position="relative"
        w="100%"
        direction="column"
        gap={2}
        as="form"
        id={formId}
        onSubmit={handleSubmit((d) => {
          if (d.params) {
            mutate({
              params: d.params.map((p) => p.value),
              value: utils.parseEther(d.value),
            });
          }
        })}
      >
        {fields.length > 0 && (
          <>
            <Divider mb="8px" />
            {fields.map((item, index) => (
              <FormControl key={item.id} mb="8px">
                <Flex justify="space-between">
                  <FormLabel>{item.key}</FormLabel>
                  <Text fontSize="12px">{item.type}</Text>
                </Flex>
                {item.type.includes("tuple") || item.type.includes("[]") ? (
                  <Textarea
                    defaultValue={getValues(`params.${index}.value`)}
                    {...register(`params.${index}.value`)}
                  />
                ) : (
                  <Input
                    defaultValue={getValues(`params.${index}.value`)}
                    {...register(`params.${index}.value`)}
                  />
                )}
                {(item.type.includes("tuple") || item.type.includes("[]")) && (
                  <FormHelperText>
                    Input should be passed in JSON format - Ex:{" "}
                    {formatHint(item.type, item.components)}
                  </FormHelperText>
                )}
              </FormControl>
            ))}
          </>
        )}

        {abiFunction?.stateMutability === "payable" && (
          <>
            <Divider mb="8px" />
            <FormControl gap={0.5}>
              <FormLabel>Native Token Value</FormLabel>
              <Input {...register(`value`)} />
              <FormHelperText>
                The native currency value to send with this transaction (ex:
                0.01 to send 0.01 native currency).
              </FormHelperText>
            </FormControl>
          </>
        )}

        {error ? (
          <>
            <Divider />
            <Heading size="label.sm">Error</Heading>
            <Text
              borderColor="borderColor"
              as={Code}
              px={4}
              py={2}
              w="full"
              borderRadius="md"
              color="red.500"
              whiteSpace="pre-wrap"
              borderWidth="1px"
              position="relative"
            >
              {formatError(error as any)}
            </Text>
          </>
        ) : data !== undefined ? (
          <>
            <Divider />
            <Heading size="label.sm">Output</Heading>
            <CodeBlock
              w="full"
              position="relative"
              language="json"
              code={formatResponseData(data)}
            />
          </>
        ) : null}
      </Flex>

      <Divider mt="auto" />
      <ButtonGroup ml="auto">
        <Popover initialFocusRef={initialFocusRef} isLazy>
          <PopoverTrigger>
            <Button isDisabled={!abiFunction} leftIcon={<Icon as={FiCode} />}>
              Code
            </Button>
          </PopoverTrigger>
          <Card
            w="auto"
            as={PopoverContent}
            bg="backgroundCardHighlight"
            boxShadow="0px 0px 2px 0px var(--popper-arrow-shadow-color)"
            mx={4}
            maxW="2xl"
          >
            <PopoverArrow bg="backgroundCardHighlight" />
            <PopoverBody>
              <Flex gap={6} direction="column">
                <Flex gap={3} direction="column">
                  <Heading size="label.lg">Installation</Heading>
                  <CodeSegment
                    setEnvironment={setCodeEnv}
                    environment={codeEnv}
                    isInstallCommand
                    snippet={{
                      javascript: `npm install @thirdweb-dev/sdk ethers`,
                      react: `npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers`,
                      python: `pip install thirdweb-sdk`,
                      go: `go get github.com/thirdweb-dev/go-sdk/thirdweb`,
                    }}
                  />
                </Flex>
                <Flex gap={3} direction="column">
                  <Heading size="label.lg">Code</Heading>
                  <CodeSegment
                    setEnvironment={setCodeEnv}
                    environment={codeEnv}
                    snippet={{
                      javascript: `import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const sdk = new ThirdwebSDK("${chainName}");
const contract = await sdk.getContract("${contractAddress}");
const result = await contract.call("${abiFunction?.name}"${watch("params")
                        .map((f) => `, ${parseParameter(f, "javascript")}`)
                        .join("")});
`,
                      react: `import { useContract } from "@thirdweb-dev/react";

const { contract, isLoading } = useContract("${contractAddress}");
const result = await contract.call("${abiFunction?.name}"${watch("params")
                        .map((f) => `, ${parseParameter(f, "react")}`)
                        .join("")});`,
                      python: `from thirdweb import ThirdwebSDK

sdk = ThirdwebSDK("${chainName}")
contract = sdk.get_contract("${contractAddress}")
result = contract.call("${abiFunction?.name}"${watch("params")
                        .map((f) => `, ${parseParameter(f, "python")}`)
                        .join("")});`,
                      go: `import (
  "github.com/thirdweb-dev/go-sdk/thirdweb"
)
            
sdk, err := thirdweb.NewThirdwebSDK("${chainName}", nil)
contract, err := sdk.GetContract("${contractAddress}")
result, err = contract.Call("${abiFunction?.name}"${watch("params")
                        .map((f) => `, ${parseParameter(f, "go")}`)
                        .join("")});`,
                    }}
                  />
                </Flex>
              </Flex>
            </PopoverBody>
          </Card>
        </Popover>
        {isView ? (
          <Button
            isDisabled={!abiFunction}
            rightIcon={<Icon as={FiPlay} />}
            colorScheme="primary"
            isLoading={contractLoading || mutationLoading}
            type="submit"
            form={formId}
          >
            Run
          </Button>
        ) : (
          <TransactionButton
            isDisabled={!abiFunction}
            colorScheme="primary"
            transactionCount={1}
            isLoading={contractLoading || mutationLoading}
            type="submit"
            form={formId}
          >
            Execute
          </TransactionButton>
        )}
      </ButtonGroup>
    </Card>
  );
};
