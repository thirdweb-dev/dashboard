import {
  Flex,
  GridItem,
  List,
  ListItem,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Abi, AbiEvent, AbiFunction } from "@thirdweb-dev/sdk";
import {
  useContractEvents,
  useContractFunctions,
} from "components/contract-components/hooks";
import { CodeSegment } from "components/contract-tabs/code/CodeSegment";
import { CodeEnvironment } from "components/contract-tabs/code/types";
import { constants } from "ethers";
import { useMemo, useState } from "react";
import { Button, Card, Heading, Text } from "tw-components";

interface CodeOverviewProps {
  abi: Abi;
  contractAddress?: string;
}

const COMMANDS = {
  install: {
    javascript: "npm install @thirdweb-dev/sdk ethers@5",
    react: "npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers@5",
    web3button: "npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers@5",
    python: "pip install thirdweb-sdk",
    go: "go get github.com/thirdweb-dev/go-sdk/thirdweb",
  },
  setup: {
    javascript: `import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

const sdk = new ThirdwebSDK("{{chainName}}");
const contract = await sdk.getContract("{{contract_address}}");`,
    react: `import { useContract } from "@thirdweb-dev/react";

export default function Component() {
  // While isLoading is true, contract is undefined.
  const { contract, isLoading, error } = useContract("{{contract_address}}");
  // Now you can use the contract in the rest of the component
}`,
    web3button: `import { Web3Button } from "@thirdweb-dev/react";

export default function Component() {
  return (
    <Web3Button
      contractAddress="{{contract_address}}"
      action={(contract) => {
        // Any action with your contract
      }}
    >
      Do something
    </Web3Button>
  )
}`,
    python: `from thirdweb import ThirdwebSDK

sdk = ThirdwebSDK("{{chainName}}")
contract = sdk.get_contract("{{contract_address}}")`,
    go: `import "github.com/thirdweb-dev/go-sdk/thirdweb"

sdk, err := thirdweb.NewThirdwebSDK("{{chainName}}")
contract, err := sdk.GetContract("{{contract_address}}")
`,
  },
  read: {
    javascript: `const data = await contract.call("{{function}}", {{args}})`,
    react: `import { useContract, useContractRead } from "@thirdweb-dev/react";

export default function Component() {
  const { contract } = useContract("{{contract_address}}");
  const { data, isLoading } = useContractRead(contract, "{{function}}", {{args}})
}`,
    python: `data = contract.call("{{function}}", {{args}})`,
    go: `data, err := contract.Call("{{function}}", {{args}})`,
  },
  write: {
    javascript: `const data = await contract.call("{{function}}", {{args}})`,
    react: `import { useContract, useContractWrite } from "@thirdweb-dev/react";

export default function Component() {
  const { contract } = useContract("{{contract_address}}");
  const { mutateAsync: {{function}}, isLoading } = useContractWrite(contract, "{{function}}")

  const call = async () => {
    try {
      const data = await {{function}}([ {{args}} ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }
}`,
    web3button: `import { Web3Button } from "@thirdweb-dev/react";

export default function Component() {
  return (
    <Web3Button
      contractAddress="{{contract_address}}"
      action={(contract) => {
        contract.call("{{function}}", {{args}})
      }}
    >
      {{function}}
    </Web3Button>
  )
}`,
    python: `data = contract.call("{{function}}", {{args}})`,
    go: `data, err := contract.Call("{{function}}", {{args}})`,
  },
  events: {
    javascript: `const events = await contract.getEvents("{{function}}", {{args}})`,
    react: `import { useContract, useContractEvents } from "@thirdweb-dev/react";

export default function Component() {
  const { contract } = useContract("{{contract_address}}");
  const { data, isLoading } = useContractEvents(contract, "{{function}}", {{args}})
}`,
    python: `events = contract.get_events("{{function}}", {{args}})`,
    go: `events, err := contract.GetEvents("{{function}}", {{args}})`,
  },
};

interface SnippetOptions {
  contractAddress?: string;
  fn?: string;
  args?: string[];
  chainName?: string;
}

function formatSnippet(
  snippet: Record<CodeEnvironment, any>,
  { contractAddress, fn, args, chainName }: SnippetOptions,
) {
  const code = { ...snippet };
  for (const key of Object.keys(code)) {
    const env = key as CodeEnvironment;

    code[env] = code[env]
      ?.replace(/{{contract_address}}/gm, contractAddress)
      ?.replace(
        /{{chainName}}/gm,
        !chainName || chainName?.startsWith("0x") || chainName?.endsWith(".eth")
          ? "goerli"
          : chainName,
      )
      ?.replace(/{{function}}/gm, fn || "");

    if (args && args?.some((arg) => arg)) {
      code[env] = code[env]?.replace(/{{args}}/gm, args?.join(", ") || "");
    } else {
      code[env] = code[env]
        ?.replace(", {{args}}", "")
        ?.replace("{{args}}, ", "");
    }
  }

  return code;
}

export const CodeOverview: React.FC<CodeOverviewProps> = ({
  abi,
  contractAddress = constants.AddressZero,
}) => {
  // TODO jonas - bring this back once we figure out how we'll instantiate SDK etc
  const chainName = "";
  const [environment, setEnvironment] = useState<CodeEnvironment>("react");
  const [tab, setTab] = useState("write");

  const functions = useContractFunctions(abi);
  const events = useContractEvents(abi);
  const { readFunctions, writeFunctions } = useMemo(() => {
    return {
      readFunctions: functions?.filter(
        (f) => f.stateMutability === "view" || f.stateMutability === "pure",
      ),
      writeFunctions: functions?.filter(
        (f) => f.stateMutability !== "view" && f.stateMutability !== "pure",
      ),
    };
  }, [functions]);

  const [read, setRead] = useState(
    readFunctions && readFunctions.length > 0 ? readFunctions[0] : undefined,
  );
  const [write, setWrite] = useState(
    writeFunctions && writeFunctions.length > 0 ? writeFunctions[0] : undefined,
  );
  const [event, setEvent] = useState(
    events && events.length > 0 ? events[0] : undefined,
  );

  return (
    <>
      <Card as={Flex} flexDirection="column" gap={3}>
        <Heading size="title.sm">Getting Started</Heading>
        <Text>First, install the latest version of the SDK.</Text>
        <CodeSegment
          environment={environment}
          setEnvironment={setEnvironment}
          snippet={COMMANDS.install}
          isInstallCommand
        />
        <Text>
          Follow along below to get started using this contract in your code.
        </Text>
        <CodeSegment
          environment={environment}
          setEnvironment={setEnvironment}
          snippet={formatSnippet(COMMANDS.setup as any, {
            contractAddress,
            chainName,
          })}
          hideTabs
        />
      </Card>
      <SimpleGrid height="100%" columns={12} gap={3}>
        <GridItem
          as={Card}
          px={0}
          pt={0}
          height="100%"
          overflow="auto"
          colSpan={{ base: 12, md: 4 }}
          overflowY="auto"
        >
          <List height="100%" overflowX="hidden">
            {((writeFunctions || []).length > 0 ||
              (readFunctions || []).length > 0) && (
              <Tabs
                h="100%"
                position="relative"
                display="flex"
                flexDir="column"
              >
                <TabList as={Flex}>
                  {(writeFunctions || []).length > 0 && (
                    <Tab gap={2} flex={"1 1 0"}>
                      <Heading color="inherit" my={1} size="label.md">
                        Write
                      </Heading>
                    </Tab>
                  )}
                  {(readFunctions || []).length > 0 && (
                    <Tab gap={2} flex={"1 1 0"}>
                      <Heading color="inherit" my={1} size="label.md">
                        Read
                      </Heading>
                    </Tab>
                  )}
                  {(events || []).length > 0 && (
                    <Tab gap={2} flex={"1 1 0"}>
                      <Heading color="inherit" my={1} size="label.md">
                        Events
                      </Heading>
                    </Tab>
                  )}
                </TabList>
                <TabPanels h="auto" overflow="auto">
                  <TabPanel>
                    {writeFunctions?.map((fn) => (
                      <ListItem my={0.5} key={fn.name}>
                        <Button
                          size="sm"
                          fontWeight={
                            tab === "write" &&
                            (write as AbiFunction).signature ===
                              (fn as AbiFunction).signature
                              ? 600
                              : 400
                          }
                          opacity={
                            tab === "write" &&
                            (write as AbiFunction).signature ===
                              (fn as AbiFunction).signature
                              ? 1
                              : 0.65
                          }
                          onClick={() => {
                            setTab("write");
                            setWrite(fn);
                          }}
                          color="heading"
                          _hover={{ opacity: 1, textDecor: "underline" }}
                          variant="link"
                          fontFamily="mono"
                        >
                          {fn.name}
                        </Button>
                      </ListItem>
                    ))}
                  </TabPanel>
                  <TabPanel>
                    {readFunctions?.map((fn) => (
                      <ListItem my={0.5} key={fn.name}>
                        <Button
                          size="sm"
                          fontWeight={
                            tab === "read" &&
                            (read as AbiFunction).signature ===
                              (fn as AbiFunction).signature
                              ? 600
                              : 400
                          }
                          opacity={
                            tab === "read" &&
                            (read as AbiFunction).signature ===
                              (fn as AbiFunction).signature
                              ? 1
                              : 0.65
                          }
                          onClick={() => {
                            setTab("read");
                            setRead(fn);
                          }}
                          color="heading"
                          _hover={{ opacity: 1, textDecor: "underline" }}
                          variant="link"
                          fontFamily="mono"
                        >
                          {fn.name}
                        </Button>
                      </ListItem>
                    ))}
                  </TabPanel>
                  <TabPanel>
                    {events?.map((ev) => (
                      <ListItem my={0.5} key={ev.name}>
                        <Button
                          size="sm"
                          fontWeight={
                            tab === "events" &&
                            (event as AbiEvent).name === (ev as AbiEvent).name
                              ? 600
                              : 400
                          }
                          opacity={
                            tab === "events" &&
                            (event as AbiEvent).name === (ev as AbiEvent).name
                              ? 1
                              : 0.65
                          }
                          onClick={() => {
                            setTab("events");
                            setEvent(ev);
                          }}
                          color="heading"
                          _hover={{ opacity: 1, textDecor: "underline" }}
                          variant="link"
                          fontFamily="mono"
                        >
                          {ev.name}
                        </Button>
                      </ListItem>
                    ))}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </List>
        </GridItem>
        <GridItem
          as={Card}
          height="100%"
          overflow="auto"
          colSpan={{ base: 12, md: 8 }}
        >
          <CodeSegment
            environment={environment}
            setEnvironment={setEnvironment}
            snippet={formatSnippet(
              COMMANDS[tab as keyof typeof COMMANDS] as any,
              {
                contractAddress,
                fn:
                  tab === "read"
                    ? read?.name
                    : tab === "write"
                    ? write?.name
                    : event?.name,
                args: readFunctions
                  ?.find(
                    (f) =>
                      f.name ===
                      (tab === "read"
                        ? read?.name
                        : tab === "write"
                        ? write?.name
                        : event?.name),
                  )
                  ?.inputs?.map((i) => i.name),
                chainName,
              },
            )}
          />
        </GridItem>
      </SimpleGrid>
    </>
  );
};
