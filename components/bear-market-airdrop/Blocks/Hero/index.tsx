/* eslint-disable no-restricted-imports */

/* eslint-disable no-console */

/* eslint-disable line-comment-position */

/* eslint-disable react/jsx-key */
import ClaimAirdrop from "./ClaimAirdrop";
import Email from "./Email";
import OpenPack from "./OpenPack";
import Supply from "./Supply";
import Unboxed from "./Unboxed";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Chain, Fantom, Polygon } from "@thirdweb-dev/chains";
import {
  ConnectWallet,
  MediaRenderer,
  useAddress,
  useContract,
  useNetworkMismatch,
  useOwnedNFTs,
  useSDK,
  useSwitchChain,
} from "@thirdweb-dev/react";
import {
  SnapshotEntryWithProof,
  TransactionResult,
  fetchSnapshotEntryForAddress,
} from "@thirdweb-dev/sdk";
import { FC, useCallback, useEffect, useState } from "react";

type HeroProps = {
  desiredChain: Chain;
};

const EDITION_ADDRESS = "0xF56ed23b139E351B8507e91e7486fe5a1C305D30";
const PACK_ADDRESS = "0x08cefAC85De8671dA2CA491396e662Db03C8F448";
const AIRDROP_ADDRESS = "0x20b40b3486f7c39E46bD598F5b35e6be5AB311c9";

const Hero: FC<HeroProps> = ({ desiredChain }) => {
  const address = useAddress();
  const toast = useToast();
  const sdk = useSDK();

  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [checkingClaimed, setCheckingClaimed] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [snapshot, setSnapshot] = useState<SnapshotEntryWithProof | null>(null);
  const [unboxing, setUnboxing] = useState(false);
  const [supply, setSupplyLeft] = useState(0);
  const [packTx, setPackTx] = useState<TransactionResult | null>(null);
  const switchNetwork = useSwitchChain();
  const [initialSupply, setInitialSupply] = useState(0);

  const canClaim = !!snapshot?.proof?.length || false;
  const isMismatched = useNetworkMismatch();
  const merkleURI = process.env.NEXT_PUBLIC_MERKLE_URI;

  const { contract: airdrop, isLoading: airdropContractLoading } =
    useContract(AIRDROP_ADDRESS);
  const { contract: pack, isLoading: packContractLoading } = useContract(
    PACK_ADDRESS,
    "pack",
  );
  const { contract: edition, isLoading: editionContractLoading } = useContract(
    EDITION_ADDRESS,
    "edition",
  );
  const { data: ownsReward, isLoading: loadingOwnedRewards } = useOwnedNFTs(
    edition,
    address,
  );
  const { data: ownsPack, isLoading: loadingPacksOwned } = useOwnedNFTs(
    pack,
    address,
  );

  const hasPack = ownsPack?.length || 0;
  const unboxed = ownsReward?.length || 0;

  const isAnythingLoading =
    (loadingPacksOwned && address) ||
    (loadingOwnedRewards && address) ||
    airdropContractLoading ||
    packContractLoading ||
    editionContractLoading ||
    checkingClaimed;

  const claim = useCallback(async () => {
    if (!canClaim || !airdrop || !address || !snapshot || !pack) {
      return;
    }
    setClaiming(true);
    try {
      await airdrop.call("claim", [
        address,
        1,
        0,
        snapshot.proof,
        Number(snapshot.maxClaimable),
      ]);

      toast({
        title: "Pack claimed!",
        position: "top",
        variant: "left-accent",
        status: "success",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setClaiming(false);
    }
  }, [address, airdrop, canClaim, pack, snapshot, toast]);

  const openPack = useCallback(async () => {
    if (!hasPack || !address || !pack) {
      return;
    }
    setUnboxing(true);
    try {
      const tx = await pack.call("openPack", [0, 1]);
      setPackTx(tx);
    } catch (err) {
      console.log(err);
    } finally {
      setUnboxing(false);
    }
  }, [address, hasPack, pack]);

  const handleEmailSubmit = useCallback(
    async (email: string) => {
      if (!email) {
        return;
      }
      await fetch("/api/bear-market-airdrop/airtable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, address }),
      })
        .then(() => {
          setEmailSubmitted(true);
          toast({
            title: "Email submitted!",
            position: "top",
            variant: "left-accent",
            status: "success",
          });
        })
        .catch((err) => {
          setEmailSubmitted(true);
          toast({
            title: err.response.data.message,
            position: "top",
            variant: "left-accent",
            status: "error",
          });
        });
    },
    [address, toast],
  );

  const getSupply = useCallback(async () => {
    if (!pack) {
      return;
    }

    const quantity = await pack.erc1155.totalSupply(0);
    setSupplyLeft(quantity.toNumber());

    if (edition) {
      let _supply = 0;
      // Fetching each prize and adding up the supply.
      const prizes = await edition?.erc1155.getAll();

      prizes?.forEach((prize) => {
        _supply += Number(prize.supply);
      });

      setInitialSupply(_supply);
    }
  }, [edition, pack]);

  const checkClaimed = useCallback(async () => {
    if (!sdk || !address || !merkleURI) {
      return;
    }
    setCheckingClaimed(true);
    try {
      const _merkleUri = merkleURI;
      const merkleMetadata = await sdk.storage.downloadJSON(_merkleUri);
      const snapshotEntry = await fetchSnapshotEntryForAddress(
        address as string, // address
        merkleMetadata.merkleRoot, // merkle root
        { [merkleMetadata.merkleRoot]: _merkleUri }, // merkle metadata
        sdk.getProvider(), // provider
        sdk.storage, // storage
        2, // snapshot format version
      );

      setSnapshot(snapshotEntry);
    } catch (err) {
      console.log(err);
    }
    setCheckingClaimed(false);
  }, [address, merkleURI, sdk]);

  useEffect(() => {
    checkClaimed();
  }, [checkClaimed]);

  useEffect(() => {
    if (!pack || !edition) {
      return;
    }
    getSupply();
  }, [pack, edition, getSupply]);

  if (isAnythingLoading) {
    return (
      <Flex h="60vh" justifyContent="center" mt={64}>
        <Spinner w={24} h={24} />
      </Flex>
    );
  }

  return (
    <Flex
      direction={{
        base: "column",
        lg: "row",
      }}
      overflow="hidden"
      mx={!hasPack ? "auto" : 0}
      gap={!hasPack ? 40 : 10}
      justifyContent="center"
    >
      {!unboxed ? (
        <Flex direction="column" pb={16} mt={24} alignItems="center" gap={8}>
          <Flex
            gap={8}
            direction="column"
            alignItems={{
              base: "center",
              lg: "flex-start",
            }}
            mt={{
              base: 0,
              lg: 0,
            }}
          >
            {!hasPack && (
              <Box
                textAlign={{
                  base: "center",
                  lg: "left",
                }}
              >
                <Heading fontSize="3.5rem">Bear Market</Heading>
                <Heading
                  bgGradient="linear(to-r, #743F9E, #BFA3DA)"
                  bgClip="text"
                  fontSize="3.5rem"
                  display="inline-block"
                >
                  Builders Airdrop.
                </Heading>
              </Box>
            )}
            <>
              {!hasPack && (
                <Supply supply={supply} initialSupply={initialSupply} />
              )}
              {!address ? (
                <Box w="min-content">
                  <ConnectWallet />
                </Box>
              ) : isMismatched ? (
                <Button
                  bg="white"
                  color="black"
                  w="min-content"
                  onClick={async () => {
                    if (!switchNetwork) {
                      return null;
                    }
                    try {
                      await switchNetwork(desiredChain.chainId);
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  Switch Network
                </Button>
              ) : hasPack ? (
                <OpenPack openPack={openPack} unboxing={unboxing} />
              ) : !emailSubmitted ? (
                <Email handleEmailSubmit={handleEmailSubmit} />
              ) : (
                <ClaimAirdrop
                  canClaim={canClaim}
                  isClaiming={claiming}
                  claim={claim}
                />
              )}
            </>
          </Flex>
        </Flex>
      ) : (
        <Unboxed tx={packTx} reward={ownsReward && ownsReward[0]} />
      )}
      {!unboxed && (
        <Flex direction="row" mt={20}>
          <Box
            bg="#121018"
            h="587px"
            w="464px"
            border="1px solid"
            borderColor="#A07CED"
            rounded="xl"
            mx="auto"
            px={8}
          >
            <Heading textAlign="center" mt={28} fontSize="20px">
              Contracts you&apos;ve deployed:
            </Heading>
            <Flex direction="column" mt={8}>
              {/*
                This list is temporary, once I get the list from Adam I'll replace it.
              */}
              {[
                {
                  address: "0x23...341",
                  name: "test",
                  chainName: "Polygon Mainnet",
                  icon: Polygon.icon.url,
                },
                {
                  address: "0x45...678",
                  name: "test",
                  chainName: "Fantom Opera",
                  icon: Fantom.icon.url,
                },
              ].map((contract) => (
                <Flex
                  key={contract.address}
                  rounded="xl"
                  gap={2}
                  mt={6}
                  alignItems="end"
                >
                  <Box mr={4} alignSelf="center">
                    <MediaRenderer
                      src={contract.icon}
                      height="32px"
                      width="32px"
                    />
                  </Box>
                  <Box w="60%">
                    <Text color="white" fontSize="16px">
                      {contract.name}
                    </Text>
                    <Text fontSize="14px">
                      {contract.chainName} * {contract.address}
                    </Text>
                  </Box>
                  <Flex alignItems="center">
                    <Image
                      src="/assets/bear-market-airdrop/tiny-logo-white.png"
                      h={4}
                      alt=""
                    />
                    <Text color="white" ml={4}>
                      &rarr;
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Hero;
