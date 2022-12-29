import { CodeOptionButton, CodeOptions } from "../common/CodeOptionButton";
import { Flex } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useState } from "react";
import { Card, CodeBlock, Link } from "tw-components";

export const colors = {
  bg: "hsl(243deg 57% 58% / 4%)",
  border: "hsl(243deg 57% 58% / 20%)",
  glow: "hsl(243deg 57% 58% / 8%)",
};

const landingSnippets = {
  javascript: `import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// initialize the SDK
const sdk = new ThirdwebSDK("mumbai");

// connect to your smart contract
const contract = await sdk.getContract("0xe68904F3018fF980b6b64D06d7f7fBCeFF4cB06c");

// get all NFTs
const nfts = await contract.erc721.getAll();

console.log(nfts);`,
  react: `import { ThirdwebNftMedia, useContract, useNFTs } from "@thirdweb-dev/react";

export default function App() {
  // Connect to your smart contract
  const contract = useContract("0xe68904F3018fF980b6b64D06d7f7fBCeFF4cB06c");

  // Get all NFTs
  const nfts = useNFTs(contract);

  // Render NFTs
  return (nfts.data || []).map((nft) => (
    <ThirdwebNftMedia key={nft.metadata.id.toString()} metadata={nft.metadata} />
  ));
}`,
  python: `from thirdweb import ThirdwebSDK
from pprint import pprint

sdk = ThirdwebSDK("mumbai")

nftCollection = sdk.get_nft_drop("0xe68904F3018fF980b6b64D06d7f7fBCeFF4cB06c")

nfts = nftCollection.get_all()
pprint(nfts)`,
  go: `package main

import (
  "context"
  "encoding/json"
  "fmt"
  "github.com/thirdweb-dev/go-sdk/v2/thirdweb"
)

func main() {
  sdk, _ := thirdweb.NewThirdwebSDK("mumbai", nil)

  // Add your NFT Drop contract address here
  address := "0xe68904F3018fF980b6b64D06d7f7fBCeFF4cB06c"
  nft, _ := sdk.GetNFTDrop(address)

  // Now you can use any of the read-only SDK contract functions
  nfts, _ := nft.GetAll(context.Background())

  b, _ := json.MarshalIndent(nfts, "", "  ")
  fmt.Printf(string(b))
}`,
  unity: `using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Thirdweb;

public class Example : MonoBehaviour {
  void Start() {
    ThirdwebSDK sdk = new ThirdwebSDK("goerli");
    string address = "0xb1c42E0C4289E68f1C337Eb0Da6a38C4c9F3f58e";
    NFTCollection nft = sdk.GetContract(address);
    List<NFT> nfts = await contract.ERC721.GetAll()
  }
}`,
};

const authSnippets = {
  javascript: `import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

const sdk = new ThirdwebSDK("goerli");

// Login with a single line of code
const payload = await sdk.auth.login();

// And verify the address of the logged in wallet
const address = await sdk.auth.verify(payload);`,
  react: `import { useSDK } from "@thirdweb-dev/react";

export default function App() {
 const sdk = useSDK();

 async function login() {
  // Login with a single line of code
  const payload = await sdk.auth.login();

  // And verify the address of the logged in wallet
  const address = await sdk.auth.verify(payload);
 }
}`,
  python: `from thirdweb import ThirdwebSDK

sdk = ThirdwebSDK("goerli")

# Login with a single line of code
payload = sdk.auth.login();

# And verify the address of the logged in wallet
address = sdk.auth.verify(payload);`,
  go: `import "github.com/thirdweb-dev/go-sdk/thirdweb"

func main() {
  sdk, err := thirdweb.NewThirdwebSDK("goerli", nil)

  // Login with a single line of code
  payload, err := sdk.Auth.Login()

  // And verify the address of the logged in wallet
  address, err := sdk.Auth.Verify(payload)
}`,
  unity: ``,
};

export interface CodeSelectorProps {
  defaultLanguage?: CodeOptions;
  snippets?: "landing" | "auth";
  docs?: string;
}

export const CodeSelector: React.FC<CodeSelectorProps> = ({
  defaultLanguage = "javascript",
  snippets = "landing",
  docs = "https://portal.thirdweb.com/",
}) => {
  const [activeLanguage, setActiveLanguage] =
    useState<CodeOptions>(defaultLanguage);
  const trackEvent = useTrack();

  const actualSnippets =
    snippets === "landing" ? landingSnippets : authSnippets;

  return (
    <>
      <Flex
        border={`2px solid ${colors.border}`}
        justify={"center"}
        margin="0 auto"
        background={colors.bg}
        transform="translateY(30%)"
        zIndex={100}
        backdropFilter={"blur(10px)"}
        borderRadius={"8px"}
        overflow="hidden"
        boxShadow={`0 0 14px ${colors.glow}`}
        maxW="calc(100% - 60px)"
        flexWrap="wrap"
      >
        {Object.keys(actualSnippets).map((key) =>
          key === "unity" && snippets === "auth" ? null : (
            <CodeOptionButton
              key={key}
              setActiveLanguage={setActiveLanguage}
              activeLanguage={activeLanguage}
              language={key as CodeOptions}
              textTransform="capitalize"
            >
              {key === "javascript" ? "JavaScript" : key}
            </CodeOptionButton>
          ),
        )}
      </Flex>

      <Card
        w={{ base: "full", md: "69%" }}
        // borderWidth={0}
        p={0}
        backgroundColor={colors.bg}
        border={`2px solid ${colors.border}`}
        boxShadow={`0 0 14px ${colors.glow}`}
        mb={4}
        position="relative"
      >
        <CodeBlock
          color="white"
          fontSize={{ base: "12px", md: "14px" }}
          borderWidth={0}
          w="full"
          py={4}
          code={actualSnippets[activeLanguage]}
          language={
            activeLanguage === "react"
              ? "jsx"
              : activeLanguage === "unity"
              ? "cpp"
              : activeLanguage
          }
          backgroundColor={"transparent"}
          mb={4}
          mt={4}
        />

        {snippets === "landing" && (
          <Link
            isExternal
            fontSize="14px"
            position="absolute"
            bottom="12px"
            right="16px"
            fontFamily="mono"
            color="white"
            href={`https://replit.com/@thirdweb/${activeLanguage}-sdk`}
            _hover={{
              color: "white",
              textDecoration: "none",
            }}
            onClick={() =>
              trackEvent({
                category: "code-selector",
                action: "click",
                label: "try-it",
              })
            }
          >
            Open in Replit
          </Link>
        )}
      </Card>

      <Flex justify="center" w="100%" maxW="container.sm">
        <Link
          href={docs}
          isExternal
          fontSize="16px"
          color={"white"}
          _hover={{
            textDecoration: "none",
          }}
          onClick={() =>
            trackEvent({
              category: "code-selector",
              action: "click",
              label: "documentation",
            })
          }
        >
          Explore Documentation
        </Link>
      </Flex>
    </>
  );
};
