import { HomePageCodeBlock } from "../CodeBox";
import { KeyFeatureLayout } from "./key-features/KeyFeatureLayout";
import { AspectRatio, Flex } from "@chakra-ui/react";
import darkTheme from "prism-react-renderer/themes/dracula";
import { InView } from "react-intersection-observer";

const withThirdwebCode = `import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const sdk = new ThirdwebSDK("polygon");
const contract = await sdk.getContract("0x..");
const nfts = await contract.erc721.getAll();`;

const withoutThirdwebCode = `import { ethers, BigNumberish, BigNumber } from "ethers";

const provider = ethers.providers.getDefaultProvider(
  "https://rpc-mumbai.maticvigil.com/"
);
const contractAddress = "0x...";
const contractAbi = [ ... ]; // copy pasted from etherscan or contract project

const contract = new ethers.Contract(contractAddress, contractAbi, provider);

async function ownerOf(tokenId: BigNumberish): Promise<string> {
  return await contract.ownerOf(tokenId);
}

async function fetchTokenMetadata(tokenId: BigNumberish, tokenUri: string) {
  const parsedUri = tokenUri.replace(
    "{id}",
    ethers.utils.hexZeroPad(BigNumber.from(tokenId).toHexString(), 32).slice(2)
  );
  let jsonMetadata;
  try {
    const res = await fetch(
      \`https://ipfs.io/ipfs/\${parsedUri.replace("ipfs://", "")}\`
    );
    jsonMetadata = await res.json();
  } catch (err) {
    const unparsedTokenIdUri = tokenUri.replace(
      "{id}",
      BigNumber.from(tokenId).toString()
    );
    try {
      const res = await fetch(
        \`https://ipfs.io/ipfs/\${unparsedTokenIdUri.replace("ipfs://", "")}\`
      );
      jsonMetadata = await res.json();
    } catch (e: any) {
      console.warn(
        \`failed to get token metadata: \${JSON.stringify({
          tokenId: tokenId.toString(),
          tokenUri,
        })} -- falling back to default metadata\`
      );
      jsonMetadata = {};
    }
  }

  return {
    ...jsonMetadata,
    id: BigNumber.from(tokenId).toString(),
    uri: tokenUri,
  };
}

async function getTokenMetadata(tokenId: BigNumberish) {
  const tokenUri = await contract.tokenURI(tokenId);
  if (!tokenUri) {
    throw new Error("no token URI");
  }
  return fetchTokenMetadata(tokenId, tokenUri);
}

async function get(tokenId: BigNumberish) {
  const [owner, metadata] = await Promise.all([
    ownerOf(tokenId).catch(() => ethers.constants.AddressZero),
    getTokenMetadata(tokenId).catch(() => ({
      id: tokenId.toString(),
      uri: "",
    })),
  ]);
  return { owner, metadata, type: "ERC721", supply: 1 };
}

async function getAll(paginationStart?: number, pageCount?: number) {
  const start = BigNumber.from(paginationStart || 0).toNumber();
  const count = BigNumber.from(pageCount || 1000).toNumber();

  const maxSupply = await contract.totalSupply();
  const maxId = Math.min(maxSupply.toNumber(), start + count);
  return await Promise.all(
    [...Array(maxId - start).keys()].map((i) => get((start + i).toString()))
  );
}

const nfts = await getAll();`;

export const WithoutThirdwebSection: React.FC = () => {
  return (
    <>
      <KeyFeatureLayout
        title=""
        titleGradient="linear-gradient(246.04deg, #3385FF 9.81%, #91B7F0 76.17%, #95BBF2 93.64%)"
        headline="Streamlined workflow for lightning-fast web3 development."
        description="Fully managed infrastructure services that enables you to build for scale. Any contract, any chain, any platform."
      >
        <AspectRatio ratio={915 / 589} w="full">
          <Flex
            w="full"
            h="50%"
            direction={{
              base: "column",
              md: "row",
            }}
          >
            <InView threshold={0.1} triggerOnce>
              {({ inView, ref }) => (
                <>
                  {inView && (
                    <Flex w="full" h="50%" gap={12}>
                      <HomePageCodeBlock
                        darkTheme={darkTheme}
                        color="white"
                        fontSize={{ base: "12px", md: "14px" }}
                        borderWidth={0}
                        w="full"
                        pb={{ base: 12, md: 6 }}
                        code={withoutThirdwebCode}
                        language="javascript"
                        backgroundColor="transparent"
                        overflow="auto"
                        autoType
                        typingSpeed={50}
                        title="without_thirdweb.js"
                      />
                      <HomePageCodeBlock
                        darkTheme={darkTheme}
                        color="white"
                        fontSize={{ base: "12px", md: "14px" }}
                        borderWidth={0}
                        w="full"
                        pb={{ base: 12, md: 6 }}
                        code={withThirdwebCode}
                        language="javascript"
                        backgroundColor="transparent"
                        overflow="auto"
                        autoType
                        typingSpeed={50}
                        title="with_thirdweb.js"
                      />
                    </Flex>
                  )}
                  <div ref={ref} />
                </>
              )}
            </InView>
          </Flex>
        </AspectRatio>
      </KeyFeatureLayout>
    </>
  );
};
