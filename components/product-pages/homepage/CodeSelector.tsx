import { CodeOptionButton, CodeOptions } from "../common/CodeOptionButton";
import { Box, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import { SiReplDotIt } from "@react-icons/all-files/si/SiReplDotIt";
import { useTrack } from "hooks/analytics/useTrack";
import { useState } from "react";
import { Card, CodeBlock, LinkButton } from "tw-components";

const codeSnippets = {
  javascript: `import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

const sdk = new ThirdwebSDK("goerli");
const nftCollection = sdk.getNFTCollection("0xb1c42E0C4289E68f1C337Eb0Da6a38C4c9F3f58e");

const nfts = await nftCollection.getAll();`,
  react: `import {
  ThirdwebNftMedia,
  useNFTCollection,
  useNFTs,
} from "@thirdweb-dev/react";

export default function App() {
  const nftCollection = useNFTCollection(
    "0xb1c42E0C4289E68f1C337Eb0Da6a38C4c9F3f58e",
  );
  const { data: nfts } = useNFTs(nftCollection);

  return (nfts || []).map((nft) => (
    <div key={nft.metadata.id.toString()}>
      <ThirdwebNftMedia metadata={nft.metadata} />
      <h3>{nft.metadata.name}</h3>
    </div>
  ));
}`,
  python: `from thirdweb import ThirdwebSDK
from pprint import pprint

sdk = ThirdwebSDK("goerli")

nftCollection = sdk.get_nft_collection(
    "0xb1c42E0C4289E68f1C337Eb0Da6a38C4c9F3f58e")

nfts = nftCollection.get_all()
pprint(nfts)
  `,
  go: `package main

import (
  "encoding/json"
  "fmt"
  "github.com/thirdweb-dev/go-sdk/thirdweb"
)

func main() {
  sdk, _ := thirdweb.NewThirdwebSDK("goerli", nil)

  // Add your NFT Collection contract address here
  address := "0xb1c42E0C4289E68f1C337Eb0Da6a38C4c9F3f58e"
  nft, _ := sdk.GetNFTCollection(address)

  // Now you can use any of the read-only SDK contract functions
  nfts, _ := nft.GetAll()

  b, _ := json.MarshalIndent(nfts, "", "  ")
  fmt.Printf(string(b))
}`,
  unity: `using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Thirdweb;

public class Example : MonoBehaviour
{
  void Start()
  {
    ThirdwebSDK sdk = new ThirdwebSDK("goerli");

    // Add your NFT Collection contract address here
    string address = "0xb1c42E0C4289E68f1C337Eb0Da6a38C4c9F3f58e";
    NFTCollection nft = sdk.GetNFTCollection(address);

    // Now you can use any of the read-only SDK contract functions
    NFT[] nfts = nft.GetAll();
  }
}`,
};

interface CodeSelector {
  defaultLanguage?: CodeOptions;
}

export const CodeSelector: React.FC<CodeSelector> = ({
  defaultLanguage = "javascript",
}) => {
  const [activeLanguage, setActiveLanguage] =
    useState<CodeOptions>(defaultLanguage);
  const trackEvent = useTrack();
  return (
    <>
      <SimpleGrid
        gap={{ base: 2, md: 3 }}
        columns={{ base: 2, md: 5 }}
        justifyContent={{ base: "space-between", md: "center" }}
      >
        {Object.keys(codeSnippets).map((key) => (
          <CodeOptionButton
            key={key}
            setActiveLanguage={setActiveLanguage}
            activeLanguage={activeLanguage}
            language={key as CodeOptions}
            textTransform="capitalize"
          >
            {key === "javascript" ? "JavaScript" : key}
          </CodeOptionButton>
        ))}
      </SimpleGrid>

      <Card
        w={{ base: "full", md: "69%" }}
        borderWidth={0}
        p={0}
        outlineBorder={{
          gradient: "linear(147.15deg, #1D64EF 30.17%, #E0507A 100%)",
          width: "5px",
        }}
      >
        <CodeBlock
          borderWidth={0}
          w="full"
          py={4}
          code={codeSnippets[activeLanguage]}
          language={
            activeLanguage === "react"
              ? "jsx"
              : activeLanguage === "unity"
              ? "cpp"
              : activeLanguage
          }
          backgroundColor="#0d0e10"
        />
      </Card>

      <Flex
        gap={{ base: 4, md: 6 }}
        align="center"
        direction={{ base: "column", md: "row" }}
        w="100%"
        maxW="container.sm"
      >
        <LinkButton
          role="group"
          borderRadius="md"
          p={6}
          variant="gradient"
          fromcolor="#1D64EF"
          tocolor="#E0507A"
          isExternal
          colorScheme="primary"
          w="full"
          href={`https://replit.com/@thirdweb/${activeLanguage}-sdk`}
          rightIcon={
            <Icon
              color="#E0507A"
              _groupHover={{ color: "#1D64EF" }}
              as={SiReplDotIt}
            />
          }
        >
          <Box as="span">Try it on Replit</Box>
        </LinkButton>
        <LinkButton
          variant="outline"
          borderRadius="md"
          bg="#fff"
          color="#000"
          w="full"
          maxW="container.sm"
          _hover={{
            bg: "whiteAlpha.800",
          }}
          href="https://portal.thirdweb.com/"
          isExternal
          p={6}
          onClick={() =>
            trackEvent({
              category: "code-selector",
              action: "click",
              label: "documentation",
            })
          }
        >
          Explore documentation
        </LinkButton>
      </Flex>
    </>
  );
};
