import { ClaimAirdrop } from "./ClaimAirdrop";
import { ContractsDeployed } from "./ContractsDeployed";
import { OpenPack } from "./OpenPack";
import { Supply } from "./Supply";
import { Unboxed } from "./Unboxed";
import { Box, Flex, SimpleGrid, Spinner, useToast } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useOwnedNFTs,
  useSDK,
  useTotalCirculatingSupply,
} from "@thirdweb-dev/react";
import {
  SnapshotEntryWithProof,
  TransactionResult,
  fetchSnapshotEntryForAddress,
} from "@thirdweb-dev/sdk";
import { ChakraNextImage } from "components/Image";
import { useTrack } from "hooks/analytics/useTrack";
import { getSearchQuery } from "lib/search";
import { useCallback, useEffect, useState } from "react";
import { Heading } from "tw-components";

type HeroProps = {
  desiredChain: Chain;
};

export type ContractSearchResult = {
  address: string;
  chainId: number;
  metadata: { name: string; image?: string; symbol?: string };
  needsImport: boolean;
};

const typesenseApiKey =
  process.env.NEXT_PUBLIC_TYPESENSE_CONTRACT_API_KEY || "";
const EDITION_ADDRESS = "0xfEae55deA0781BBE5E967Ddfa29e7C01918ad6cb";
const PACK_ADDRESS = "0xD21fE9b1bC8901525288A29fa08175a27070755f";
const AIRDROP_ADDRESS = "0x8C3972ED94c789B0c3721Fe05078FC4918129d37";
const merkleURI = "ipfs://QmSfGFUaVUx4M7ZMuSSbqeTLXb9CsSQfWPFauHE7j9r4NZ/0";
export const BEAR_MARKET_AIRDROP_CATEGORY = "bear-market-airdrop";

export const Hero: React.FC<HeroProps> = () => {
  const address = useAddress();
  const toast = useToast();
  const sdk = useSDK();
  const trackEvent = useTrack();

  const [contracts, setContracts] = useState<ContractSearchResult[]>([]);
  const [checkingClaimed, setCheckingClaimed] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [snapshot, setSnapshot] = useState<SnapshotEntryWithProof | null>(null);
  const [unboxing, setUnboxing] = useState(false);
  const [packTx, setPackTx] = useState<TransactionResult | null>(null);

  const canClaim = !!snapshot?.proof?.length;

  const { contract: airdrop, isLoading: airdropContractLoading } =
    useContract(AIRDROP_ADDRESS);
  const { contract: pack, isLoading: packContractLoading } =
    useContract(PACK_ADDRESS);
  const { contract: edition, isLoading: editionContractLoading } =
    useContract(EDITION_ADDRESS);

  const {
    data: ownsReward,
    isLoading: loadingOwnedRewards,
    refetch: refetchReward,
  } = useOwnedNFTs(edition, address);
  const {
    data: ownsPack,
    isLoading: loadingPacksOwned,
    refetch: refetchPack,
  } = useOwnedNFTs(pack, address);

  const { data: supply } = useTotalCirculatingSupply(pack, 0);

  const hasPack = (ownsPack && ownsPack?.length > 0) || false;
  const unboxed = ownsReward?.length || 0;

  const isAnythingLoading =
    (loadingPacksOwned && address) ||
    (loadingOwnedRewards && address) ||
    airdropContractLoading ||
    packContractLoading ||
    editionContractLoading ||
    checkingClaimed;

  const handleEmailSubmit = useCallback(
    async (email: string, fromClaim = false) => {
      if (!email) {
        return;
      }
      try {
        const res = await fetch("/api/bear-market-airdrop/airtable", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            address,
            optIn: !canClaim ? true : false,
          }),
        });
        switch (res.status) {
          case 200:
            if (!fromClaim) {
              toast({
                title: "Email submitted!",
                position: "top",
                variant: "left-accent",
                status: "success",
                containerStyle: {
                  bg: "black",
                  rounded: "lg",
                },
              });
            }
            trackEvent({
              category: BEAR_MARKET_AIRDROP_CATEGORY,
              action: "submit_email",
              label: "success",
              walletAddress: address,
              email,
            });
            break;
          case 401:
            toast({
              title: "Email already registered",
              position: "top",
              variant: "left-accent",
              status: "info",
              containerStyle: {
                bg: "black",
                rounded: "lg",
              },
            });
            trackEvent({
              category: BEAR_MARKET_AIRDROP_CATEGORY,
              action: "submit_email",
              label: "already_registered",
              walletAddress: address,
              email,
            });
            break;
          case 500:
            trackEvent({
              category: BEAR_MARKET_AIRDROP_CATEGORY,
              action: "submit_email",
              label: "error",
              walletAddress: address,
              email,
            });
            toast({
              title: "Error submitting email",
              position: "top",
              variant: "left-accent",
              status: "error",
              containerStyle: {
                bg: "black",
                rounded: "lg",
              },
            });
            break;
        }
      } catch (err) {
        trackEvent({
          category: BEAR_MARKET_AIRDROP_CATEGORY,
          action: "submit_email",
          label: "error",
          walletAddress: address,
          email,
          error: err,
        });
        toast({
          title: "Error submitting email",
          position: "top",
          variant: "left-accent",
          status: "error",
          containerStyle: {
            bg: "black",
            rounded: "lg",
          },
        });
      }
    },
    [address, canClaim, toast, trackEvent],
  );

  const claim = useCallback(
    async (email: string) => {
      if (!canClaim || !airdrop || !address || !snapshot || !email) {
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
        trackEvent({
          category: BEAR_MARKET_AIRDROP_CATEGORY,
          action: "claim",
          label: "success",
          walletAddress: address,
          email,
        });
        await handleEmailSubmit(email, true);

        toast({
          title: "Pack claimed!",
          position: "top",
          variant: "left-accent",
          status: "success",
        });
      } catch (err) {
        trackEvent({
          category: BEAR_MARKET_AIRDROP_CATEGORY,
          action: "claim",
          label: "error",
          walletAddress: address,
          email,
        });
      } finally {
        await refetchPack();
        setClaiming(false);
      }
    },
    [
      address,
      airdrop,
      canClaim,
      handleEmailSubmit,
      refetchPack,
      snapshot,
      toast,
      trackEvent,
    ],
  );

  const openPack = useCallback(async () => {
    if (!hasPack || !address || !pack) {
      return;
    }
    setUnboxing(true);
    try {
      const tx = await pack.call("openPack", [0, 1]);
      trackEvent({
        category: BEAR_MARKET_AIRDROP_CATEGORY,
        action: "unbox",
        label: "success",
        walletAddress: address,
      });
      setPackTx(tx);
    } catch (err) {
      trackEvent({
        category: BEAR_MARKET_AIRDROP_CATEGORY,
        action: "unbox",
        label: "error",
        walletAddress: address,
      });
    } finally {
      await refetchReward();
      setUnboxing(false);
    }
  }, [address, hasPack, pack, refetchReward, trackEvent]);

  const checkClaimed = useCallback(async () => {
    if (!sdk || !address || !merkleURI) {
      return;
    }
    setCheckingClaimed(true);
    try {
      const _merkleUri = merkleURI;
      const merkleMetadata = await sdk.storage.downloadJSON(_merkleUri);
      const snapshotEntry = await fetchSnapshotEntryForAddress(
        address as string,
        merkleMetadata.merkleRoot,
        { [merkleMetadata.merkleRoot]: _merkleUri },
        sdk.getProvider(),
        sdk.storage,
        2,
      );

      setSnapshot(snapshotEntry);
    } catch (err) {
      console.error(err);
    }
    setCheckingClaimed(false);
  }, [address, sdk]);

  const getContracts = useCallback(async (walletAddress: string) => {
    if (!walletAddress || !typesenseApiKey) {
      return;
    }
    const res = await fetch(
      getSearchQuery({
        query: "",
        walletAddress,
        searchMode: "all",
        getAllOwnedByWallet: true,
      }),
      {
        headers: {
          "x-typesense-api-key": typesenseApiKey,
        },
      },
    );
    const result = await res.json();
    const data = result.hits.map((hit: any) => {
      const document = hit.document;
      return {
        address: document.contract_address,
        chainId: document.chain_id,
        metadata: {
          name: document.name,
        },
      } as ContractSearchResult;
    }) as ContractSearchResult[];

    setContracts(data);
  }, []);

  useEffect(() => {
    checkClaimed();
  }, [checkClaimed]);

  useEffect(() => {
    if (!address) {
      setContracts([]);
    } else {
      getContracts(address);
    }
  }, [address, getContracts]);

  if (isAnythingLoading) {
    return (
      <Flex h="60vh" justifyContent="center" mt={64}>
        <Spinner w={24} h={24} />
      </Flex>
    );
  }

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      px={12}
      justifyContent={{
        base: "center",
        lg: "space-between",
      }}
      pt={{ base: 16, md: 24 }}
      gap={{ base: 8, md: 36 }}
    >
      {!unboxed ? (
        <Flex gap={8} flexDir="column" justifyContent="center" h="full">
          {!unboxed && (
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
            {!unboxed && supply && <Supply supply={supply.toString()} />}
            {!address ? (
              <Box
                mx={{
                  base: "auto",
                  lg: 0,
                }}
              >
                <ConnectWallet />
              </Box>
            ) : hasPack ? (
              <OpenPack openPack={openPack} unboxing={unboxing} />
            ) : (
              <ClaimAirdrop
                canClaim={canClaim}
                isClaiming={claiming}
                claim={claim}
                handleEmailSubmit={handleEmailSubmit}
              />
            )}
          </>
        </Flex>
      ) : (
        <Unboxed
          tx={packTx}
          reward={ownsReward && ownsReward[0]}
          editionAddress={EDITION_ADDRESS}
        />
      )}
      <Flex direction="row">
        {!address ? (
          <ChakraNextImage
            src={require("public/assets/bear-market-airdrop/bear-pack-with-bg.png")}
            alt={"bear-market-pack"}
            priority
          />
        ) : (
          <Flex maxW="100%" w="full" justifyContent="center">
            <ContractsDeployed contracts={contracts} />
          </Flex>
        )}
      </Flex>
    </SimpleGrid>
  );
};
