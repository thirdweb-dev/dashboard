import { gradientMapping } from "../Prizes/Prize";
import { Box, ButtonGroup, Flex } from "@chakra-ui/react";
import { Polygon } from "@thirdweb-dev/chains";
import { ThirdwebNftMedia, useAddress } from "@thirdweb-dev/react";
import { NFT, NFTMetadata, TransactionResult } from "@thirdweb-dev/sdk";
import { ChakraNextImage } from "components/Image";
import { BsEyeFill } from "react-icons/bs";
import { Button, Card, Heading, Text } from "tw-components";

interface UnboxedProps {
  reward: NFT | undefined;
  tx: TransactionResult | null;
  editionAddress: string;
}

type Metadata = NFTMetadata & {
  attributes: {
    trait_type: string;
    value: string;
  }[];
};

const deliveryMethodMapping: {
  [key: string]: string;
} = {
  "Bear Market Builder NFT": "pack",
  "thirdweb pro early access NFT": "pack",
  "5 Testnet MATIC": "airdrop",
  "1 MATIC": "pack",
  "10 MATIC": "pack",
  "1k AWS Credits": "email",
  "Lexica AI Art Pass": "email",
  "Quicknode Credits: $300": "email",
  "Quicknode Credits: $900": "email",
  "Quicknode Credits: $5000": "email",
  "Quicknode Credits: $25000": "email",
  "Club IRL NFT": "In Pack",
  "Consensus 2023 Two-Day Pass": "email",
  "Checks NFT (VV Edition)": "airdrop",
};

export const Unboxed: React.FC<UnboxedProps> = ({
  reward,
  tx,
  editionAddress,
}) => {
  const nft = reward?.metadata as unknown as Metadata;
  const rarity = nft?.attributes[0]?.value;
  const address = useAddress();
  const image = nft.image?.replaceAll(/ /g, "%20");
  const twitterUrl = `https://twitter.com/intent/tweet?text=I%20just%20unboxed%20a%20${rarity}%20prize%20on%20%40thirdweb%20and%20it%20is%20a%20${nft?.name}%20${image}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${image}`;
  const instagramUrl = `https://www.instagram.com/sharer/sharer.php?u=${image}`;

  if (!nft) {
    return null;
  }
  const method = deliveryMethodMapping[nft?.name ?? ""] || "pack";

  return (
    <Flex direction="column" w="full" pb={16} alignItems="center" color="white">
      <Box
        fontSize={{
          base: "2.5rem",
          xl: "3.5rem",
        }}
        position="relative"
        mt="74px"
        mb={5}
      >
        <ChakraNextImage
          src="/assets/bear-market-airdrop/confetti1.png"
          alt="confetti1"
          position="absolute"
          top={{
            base: -16,
            xl: -40,
          }}
          left={{
            base: -16,
            xl: -40,
          }}
          w={{
            base: "50%",
            xl: "auto",
          }}
        />
        <ChakraNextImage
          src="/assets/bear-market-airdrop/confetti2.png"
          alt="confetti1"
          position="absolute"
          top={{
            base: -12,
            xl: -40,
          }}
          left={{
            base: 80,
            xl: 60,
          }}
          w={{
            base: "50%",
            xl: "auto",
          }}
        />
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          textAlign={{
            base: "center",
            xl: "left",
          }}
        >
          <Heading
            bgGradient={gradientMapping[rarity as string]}
            bgClip="text"
            w="min-content"
            fontWeight="bold"
            fontSize={56}
          >
            Congratulations
          </Heading>
          <Heading fontSize={56}>you’ve unpacked</Heading>
        </Flex>
      </Box>
      <Flex justifyContent="center" alignItems="center" direction="column">
        <Card bg="transparent" maxW="450px" p={0} mb={1} border="none">
          <ThirdwebNftMedia metadata={nft} width="100%" />
          <Flex
            direction="column"
            alignItems="center"
            borderBottom="1px solid #151515"
            borderX="1px solid #151515"
            pt={6}
            pb={2}
            px={4}
            roundedBottom="xl"
          >
            <Text
              textTransform="uppercase"
              bgGradient={gradientMapping[rarity as string]}
              bgClip="text"
              fontSize="12px"
              fontWeight="bold"
              letterSpacing="1px"
              lineHeight="120%"
              mb={3}
            >
              {rarity} Prize
            </Text>
            <Text textAlign="center" fontSize="21px" color="white">
              {nft?.name}
            </Text>
            <Text fontSize="12px" lineHeight="150%" as="i" textAlign="center">
              {method === "email" && (
                <>
                  An email has been sent to{" "}
                  <Box as="span" color="white" fontWeight="bold">
                    mariano@thirdweb.com
                  </Box>
                </>
              )}
              {method === "pack" && (
                <>
                  has been sent to <br />{" "}
                  <Box as="span" color="white" textDecoration="italic">
                    {`${address?.slice(0, 5)}...${address?.slice(
                      address.length - 4,
                    )}`}
                  </Box>
                </>
              )}
            </Text>
          </Flex>
        </Card>
        <ButtonGroup fontSize="12px" mb={10}>
          {tx && (
            <Button
              leftIcon={<BsEyeFill />}
              bg="transparent"
              outline="1px solid #151515"
              size="xs"
              fontWeight="400"
              as="a"
              href={`https://blockscan.com/tx/${tx?.receipt.transactionHash}`}
              target="_blank"
            >
              View transaction
            </Button>
          )}
          <Button
            fontWeight="400"
            bg="transparent"
            outline="1px solid #151515"
            size="xs"
            as="a"
            href={`https://opensea.io/assets/${Polygon.nativeCurrency.name}/${editionAddress}/${nft.id}`}
            target="_blank"
            leftIcon={
              <ChakraNextImage
                src="/assets/bear-market-airdrop/socials/opensea.svg"
                alt="openseaicon"
              />
            }
          >
            View on Opensea
          </Button>
        </ButtonGroup>
        <Button
          bg="white"
          color="black"
          as="a"
          href="https://thirdweb.com"
          target="_blank"
          _hover={{
            bg: "white",
            opacity: 0.8,
          }}
          py={3}
          px={6}
          mb={6}
        >
          Discover thirdweb
        </Button>
        <Box textAlign="center">
          <Text color="white" mb={3}>
            Share your win
          </Text>
          <ButtonGroup>
            <Button
              as="a"
              href={twitterUrl}
              target="_blank"
              bg="transparent"
              outline="1px solid #9D2889"
              p={0}
            >
              <ChakraNextImage
                src="/assets/bear-market-airdrop/socials/twitter.svg"
                alt="twitter"
              />
            </Button>
            <Button
              as="a"
              href={facebookUrl}
              target="_blank"
              bg="transparent"
              outline="1px solid #9D2889"
              p={0}
            >
              <ChakraNextImage
                src="/assets/bear-market-airdrop/socials/facebook.svg"
                alt="twitter"
              />
            </Button>
            <Button
              as="a"
              href={instagramUrl}
              target="_blank"
              bg="transparent"
              outline="1px solid #9D2889"
              p={0}
            >
              <ChakraNextImage
                src="/assets/bear-market-airdrop/socials/instagram.svg"
                alt="twitter"
              />
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </Flex>
  );
};
