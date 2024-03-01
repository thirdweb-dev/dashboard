import { GridItem, SimpleGrid } from "@chakra-ui/react";
import { defaultChains } from "@thirdweb-dev/chains";
import { useContract } from "@thirdweb-dev/react";
import { Abi, AbiFunction } from "@thirdweb-dev/sdk";
import {
  useContractEvents,
  useContractFunctions,
} from "components/contract-components/hooks";
import { CodeSegment } from "components/contract-tabs/code/CodeSegment";
import { CodeEnvironment } from "components/contract-tabs/code/types";
import { DASHBOARD_THIRDWEB_CLIENT_ID } from "constants/rpc";
import React, { useEffect, useMemo, useState } from "react";
import { Card } from "tw-components";

const contractAddress = "0x6fb2A6C41B44076bc491cC285BA629c0715a6a1b";

const COMMANDS = {
  install: {
    javascript: "npm install @thirdweb-dev/sdk ethers@5",
    react: "npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers@5",
    "react-native": "React Native",
    web3button: "",
    python: "pip install thirdweb-sdk",
    go: "go get github.com/thirdweb-dev/go-sdk/thirdweb",
    unity: `// Download the .unitypackage from the latest release:
// https://github.com/thirdweb-dev/unity-sdk/releases
// and drag it into your project`,
  },
  setup: {
    javascript: `import {{chainName}} from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// If used on the FRONTEND pass your 'clientId'
const sdk = new ThirdwebSDK({{chainName}}, {
  clientId: "YOUR_CLIENT_ID",
});
// --- OR ---
// If used on the BACKEND pass your 'secretKey'
const sdk = new ThirdwebSDK({{chainName}}, {
  secretKey: "YOUR_SECRET_KEY",
});

const contract = await sdk.getContract("{{contract_address}}");`,
    react: `import {{chainName}} from "@thirdweb-dev/chains";
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";

function App() {
  return (
    <ThirdwebProvider
      activeChain={{chainName}}
      clientId="YOUR_CLIENT_ID" // You can get a client id from dashboard settings
    >
      <Component />
    </ThirdwebProvider>
  )
}

function Component() {
  const { contract, isLoading } = useContract("{{contract_address}}");
}`,
    "react-native": `import {{chainName}} from "@thirdweb-dev/chains";
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react-native";

function App() {
  return (
    <ThirdwebProvider
      activeChain={{chainName}}
      clientId="YOUR_CLIENT_ID" // You can get a client id from dashboard settings
    >
      <Component />
    </ThirdwebProvider>
  )
}

function Component() {
  const { contract, isLoading } = useContract("{{contract_address}}");
}`,
    web3button: ``,
    python: `from thirdweb import ThirdwebSDK

sdk = ThirdwebSDK("{{chainNameOrRpc}}", options=SDKOptions(secret_key="YOUR_SECRET_KEY"))
contract = sdk.get_contract("{{contract_address}}")`,
    go: `import "github.com/thirdweb-dev/go-sdk/thirdweb"

sdk, err := thirdweb.NewThirdwebSDK("{{chainNameOrRpc}}", &thirdweb.SDKOptions{
  SecretKey: "YOUR_SECRET_KEY",
})
contract, err := sdk.GetContract("{{contract_address}}")
`,
    unity: `using Thirdweb;

// Reference the SDK
var sdk = ThirdwebManager.Instance.SDK;

// Get your contract
var contract = sdk.GetContract("{{contract_address}}");`,
  },
  read: {
    javascript: `const data = await contract.call("{{function}}", [{{args}}])`,
    react: `import { useContract, useContractRead } from "@thirdweb-dev/react";

export default function Component() {
  const { contract } = useContract("{{contract_address}}");
  const { data, isLoading } = useContractRead(contract, "{{function}}", [{{args}}])
}`,
    "react-native": `import { useContract, useContractRead } from "@thirdweb-dev/react-native";

export default function Component() {
  const { contract } = useContract("{{contract_address}}");
  const { data, isLoading } = useContractRead(contract, "{{function}}", [{{args}}])
}`,
    python: `data = contract.call("{{function}}", {{args}})`,
    go: `data, err := contract.Call("{{function}}", {{args}})`,
  },
  write: {
    javascript: `const data = await contract.call("{{function}}", [{{args}}])`,
    react: `import { useContract, useContractWrite } from "@thirdweb-dev/react";

export default function Component() {
  const { contract } = useContract("{{contract_address}}");
  const { mutateAsync: {{function}}, isLoading } = useContractWrite(contract, "{{function}}")

  const call = async () => {
    try {
      const data = await {{function}}({ args: [{{args}}] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }
}`,
    "react-native": `import { useContract, useContractWrite } from "@thirdweb-dev/react-native";

export default function Component() {
  const { contract } = useContract("{{contract_address}}");
  const { mutateAsync: {{function}}, isLoading } = useContractWrite(contract, "{{function}}")

  const call = async () => {
    try {
      const data = await {{function}}({ args: [{{args}}] });
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
        contract.call("{{function}}", [{{args}}])
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
    javascript: `// You can get a specific event
const events = await contract.events.getEvents("{{function}}")
// All events
const allEvents = await contract.events.getAllEvents();
// Or set up a listener for all events
const listener = await contract.events.listenToAllEvents();`,
    react: `import { useContract, useContractEvents } from "@thirdweb-dev/react";

export default function Component() {
  const { contract } = useContract("{{contract_address}}");
  // You can get a specific event
  const { data: event } = useContractEvents(contract, "{{function}}")
  // All events
  const { data: allEvents } = useContractEvents(contract)
  // By default, you set up a listener for all events, but you can disable it
  const { data: eventWithoutListener } = useContractEvents(contract, undefined, { subscribe: false })
}`,
    "react-native": `import { useContract, useContractEvents } from "@thirdweb-dev/react-native";

export default function Component() {
  const { contract } = useContract("{{contract_address}}");
  // You can get a specific event
  const { data: event } = useContractEvents(contract, "{{function}}")
  // All events
  const { data: allEvents } = useContractEvents(contract)
  // By default, you set up a listener for all events, but you can disable it
  const { data: eventWithoutListener } = useContractEvents(contract, undefined, { subscribe: false })
}`,
    python: `events = contract.get_events("{{function}}", {{args}})`,
    go: `events, err := contract.GetEvents("{{function}}", {{args}})`,
  },
};

const WALLETS_SNIPPETS = [
  {
    id: "smart-wallet",
    name: "Smart Wallet",
    description: "Deploy smart contract wallets for your users",
    iconUrl:
      "ipfs://QmeAJVqn17aDNQhjEU3kcWVZCFBrfta8LzaDGkS8Egdiyk/smart-wallet.svg",
    link: "https://portal.thirdweb.com/references/wallets/latest/SmartWallet",
    supportedLanguages: {
      javascript: `import {{chainName}} from "@thirdweb-dev/chains";
import { LocalWallet, SmartWallet } from "@thirdweb-dev/wallets";

// First, connect the personal wallet, which can be any wallet (metamask, walletconnect, etc.)
// Here we're just generating a new local wallet which can be saved later
const personalWallet = new LocalWallet();
await personalWallet.generate();

// Setup the Smart Wallet configuration
const config = {
  chain: {{chainName}}, // the chain where your smart wallet will be or is deployed
  factoryAddress: "{{factory_address}}", // your own deployed account factory address
  clientId: "YOUR_CLIENT_ID", // or use secretKey for backend/node scripts
  gasless: true, // enable or disable gasless transactions
};

// Then, connect the Smart wallet
const wallet = new SmartWallet(config);
await wallet.connect({
  personalWallet,
});`,
      react: `import {{chainName}} from "@thirdweb-dev/chains";
import { ThirdwebProvider, ConnectWallet, smartWallet } from "@thirdweb-dev/react";

export default function App() {
return (
    <ThirdwebProvider
      clientId="YOUR_CLIENT_ID"
      activeChain={{chainName}}
      supportedWallets={[
        smartWallet({
          factoryAddress: "{{factory_address}}",
          gasless: true,
          personalWallets={[...]}
        })
      ]}
    >
      <ConnectWallet />
    </ThirdwebProvider>
  );
}`,
      "react-native": `import {{chainName}} from "@thirdweb-dev/chains";
import { ThirdwebProvider, ConnectWallet, smartWallet } from "@thirdweb-dev/react-native";

export default function App() {
return (
    <ThirdwebProvider
      clientId="YOUR_CLIENT_ID"
      activeChain={{chainName}}
      supportedWallets={[
        smartWallet({
          factoryAddress: "{{factory_address}}",
          gasless: true,
          personalWallets={[...]}
        })
      ]}
    >
      <ConnectWallet />
    </ThirdwebProvider>
  );
}`,
      unity: `using Thirdweb;

public async void ConnectWallet()
{
    // Reference to your Thirdweb SDK
    var sdk = ThirdwebManager.Instance.SDK;

    // Configure the connection
    var connection = new WalletConnection(
      provider: WalletProvider.SmartWallet,        // The wallet provider you want to connect to (Required)
      chainId: 1,                                  // The chain you want to connect to (Required)
      password: "myEpicPassword",                  // If using a local wallet as personal wallet (Optional)
      email: "email@email.com",                    // If using an email wallet as personal wallet (Optional)
      personalWallet: WalletProvider.LocalWallet   // The personal wallet you want to use with your Smart Wallet (Optional)
    );

    // Connect the wallet
    string address = await sdk.wallet.Connect(connection);
}`,
    },
  },
];

function getExportName(slug: string) {
  let exportName = slug
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("");

  // if chainName starts with a number, prepend an underscore
  if (exportName.match(/^[0-9]/)) {
    exportName = `_${exportName}`;
  }
  return exportName;
}

interface SnippetOptions {
  contractAddress?: string;
  fn?: string;
  args?: string[];
  chainName?: string;
  rpcUrl?: string;
  address?: string;
  clientId?: string;
}

function formatSnippet(
  snippet: Record<CodeEnvironment, any>,
  {
    contractAddress,
    fn,
    args,
    chainName,
    rpcUrl,
    address,
    clientId,
  }: SnippetOptions,
) {
  const code = { ...snippet };
  const preSupportedSlugs = defaultChains.map((chain) => chain.slug);
  for (const key of Object.keys(code)) {
    const env = key as CodeEnvironment;

    code[env] = code[env]
      ?.replace(/{{contract_address}}/gm, contractAddress || "0x...")
      ?.replace(/{{factory_address}}/gm, contractAddress || "0x...")
      ?.replace(/{{wallet_address}}/gm, address)
      ?.replace("YOUR_CLIENT_ID", clientId || "YOUR_CLIENT_ID")

      ?.replace(
        'import {{chainName}} from "@thirdweb-dev/chains";',
        preSupportedSlugs.includes(chainName as any)
          ? ""
          : `import ${
              env === "javascript" ? "{ {{chainName}} }" : "{{chainName}}"
            } from "@thirdweb-dev/chains";`,
      )
      ?.replace(
        /{{chainName}}/gm,
        !chainName || chainName?.startsWith("0x") || chainName?.endsWith(".eth")
          ? '"ethereum"'
          : preSupportedSlugs.includes(chainName as any)
            ? `"${chainName}"`
            : env === "javascript"
              ? getExportName(chainName)
              : `{ ${getExportName(chainName)} }`,
      )
      ?.replace(/{{function}}/gm, fn || "")
      ?.replace(
        /{{chainNameOrRpc}}/gm,
        preSupportedSlugs.includes(chainName as any)
          ? chainName
          : rpcUrl?.replace(
              // eslint-disable-next-line no-template-curly-in-string
              "${THIRDWEB_API_KEY}",
              DASHBOARD_THIRDWEB_CLIENT_ID,
            ) || "",
      );

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

const CodePlayground = () => {
  const { contract } = useContract(contractAddress);
  const [tab, setTab] = useState("write");

  const functions = useContractFunctions(contract?.abi as Abi);
  const events = useContractEvents(contract?.abi as Abi);

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

  const [event, setEvent] = useState(
    events && events.length > 0 ? events[0] : undefined,
  );

  const [read, setRead] = useState<AbiFunction>();

  const [write, setWrite] = useState<AbiFunction>();

  useEffect(() => {
    if (!read && readFunctions?.length) setRead(readFunctions[0]);
  }, [readFunctions?.length]);

  useEffect(() => {
    if (!write && writeFunctions?.length) setWrite(writeFunctions[0]);
  }, [writeFunctions?.length]);
  const [environment, setEnvironment] = useState<CodeEnvironment>("javascript");
  console.log(
    write?.name,
    writeFunctions,
    writeFunctions
      ?.find((f) => f.name === write?.name)
      ?.inputs?.map((i) => i.name),
  );
  return (
    <SimpleGrid columns={2} gap="18px">
      <GridItem as={Card}>
        <h1>hey</h1>
      </GridItem>
      <GridItem as={Card}>
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
              args: (tab === "read"
                ? readFunctions
                : tab === "write"
                  ? writeFunctions
                  : events
              )
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
            },
          )}
        />
      </GridItem>
    </SimpleGrid>
  );
};

export default CodePlayground;
