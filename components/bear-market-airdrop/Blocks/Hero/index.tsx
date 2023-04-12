import { ClaimAirdrop } from "./ClaimAirdrop";
import { ContractsDeployed } from "./ContractsDeployed";
import { OpenPack } from "./OpenPack";
import { Supply } from "./Supply";
import { Unboxed } from "./Unboxed";
import { Box, Flex, Spinner, useToast } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useOwnedNFTs,
  useSDK,
} from "@thirdweb-dev/react";
import {
  SnapshotEntryWithProof,
  TransactionResult,
  fetchSnapshotEntryForAddress,
} from "@thirdweb-dev/sdk";
import { ChakraNextImage } from "components/Image";
import { getSearchQuery } from "lib/search";
import { BearkMarketBuilderSDK } from "pages/bear-market-airdrop";
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
const EDITION_ADDRESS = "0x941d8799eDc8424357DD86Bea762D35439976Cfc";
const PACK_ADDRESS = "0xd7E960c6627B700Cf3551E772F0DD362dc087eF9";
const AIRDROP_ADDRESS = "0x3cc3CF3c4bfd05b5F9e589c6345586e4180b96A9";
const merkleURI = "ipfs://QmSfGFUaVUx4M7ZMuSSbqeTLXb9CsSQfWPFauHE7j9r4NZ/0";

export const Hero: React.FC<HeroProps> = () => {
  const address = useAddress();
  const toast = useToast();
  const sdk = useSDK();
  const walletAddress = useAddress();

  const [contracts, setContracts] = useState<ContractSearchResult[]>([]);
  const [checkingClaimed, setCheckingClaimed] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [snapshot, setSnapshot] = useState<SnapshotEntryWithProof | null>(null);
  const [unboxing, setUnboxing] = useState(false);
  const [supply, setSupplyLeft] = useState(0);
  const [packTx, setPackTx] = useState<TransactionResult | null>(null);

  const canClaim = !!snapshot?.proof?.length || false;

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

  const hasPack = (ownsPack && ownsPack?.length > 0) || false;
  const unboxed = ownsReward?.length || 0;
  const [submittingEmail, setSubmittingEmail] = useState(false);

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
      setSubmittingEmail(true);
      await fetch("/api/bear-market-airdrop/airtable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          address,
          optIn: !canClaim ? true : false,
        }),
      })
        .then((res) => {
          if (res.status === 500) {
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
          } else if (!fromClaim) {
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
        })
        .catch((err) => {
          toast({
            title: err.response.data.message,
            position: "top",
            variant: "left-accent",
            status: "error",
          });
        })
        .finally(() => {
          setSubmittingEmail(false);
        });
    },
    [address, canClaim, toast],
  );

  const claim = useCallback(
    async (email: string) => {
      if (!canClaim || !airdrop || !address || !snapshot || !pack || !email) {
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
        await handleEmailSubmit(email, true);

        toast({
          title: "Pack claimed!",
          position: "top",
          variant: "left-accent",
          status: "success",
        });
      } catch (err) {
        console.error(err);
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
      pack,
      refetchPack,
      snapshot,
      toast,
    ],
  );

  const openPack = useCallback(async () => {
    if (!hasPack || !address || !pack) {
      return;
    }
    setUnboxing(true);
    try {
      const tx = await pack.call("openPack", [0, 1]);
      setPackTx(tx);
    } catch (err) {
      console.error(err);
    } finally {
      await refetchReward();
      setUnboxing(false);
    }
  }, [address, hasPack, pack, refetchReward]);

  const getSupply = useCallback(async () => {
    if (!pack) {
      return;
    }

    const quantity = await pack.erc1155.totalSupply(0);
    setSupplyLeft(quantity.toNumber());
  }, [pack]);

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

  const getContracts = useCallback(async () => {
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
  }, [walletAddress]);

  useEffect(() => {
    checkClaimed();
  }, [checkClaimed]);

  useEffect(() => {
    if (!pack || !edition) {
      return;
    }
    getSupply();
  }, [pack, edition, getSupply]);

  useEffect(() => {
    getContracts();
  }, [getContracts, address]);

  if (isAnythingLoading) {
    return (
      <Flex h="60vh" justifyContent="center" mt={64}>
        <Spinner w={24} h={24} />
      </Flex>
    );
  }

  return (
    <Flex
      justifyContent={{
        base: "center",
        lg: "space-between",
      }}
      // alignItems={{
      //   base: "center",
      //   lg: "",
      // }}
      w="full"
      direction={{
        base: "column",
        lg: "row",
      }}
      gap={{
        base: 16,
        lg: 0,
      }}
    >
      {!unboxed ? (
        <Flex
          gap={8}
          direction="column"
          w={{
            base: "full",
            lg: "50%",
          }}
          mt={52}
        >
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
            {!unboxed && <Supply supply={supply} />}
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
              <BearkMarketBuilderSDK isPack>
                <OpenPack openPack={openPack} unboxing={unboxing} />
              </BearkMarketBuilderSDK>
            ) : (
              <ClaimAirdrop
                canClaim={canClaim}
                isClaiming={claiming}
                claim={claim}
                handleEmailSubmit={handleEmailSubmit}
                submittingEmail={submittingEmail}
              />
            )}
          </>
        </Flex>
      ) : (
        <Box mt={52}>
          <Unboxed
            tx={packTx}
            reward={ownsReward && ownsReward[0]}
            editionAddress={EDITION_ADDRESS}
          />
        </Box>
      )}
      <Flex
        direction="row"
        w={{
          base: "full",
          lg: "50%",
        }}
      >
        {!address ? (
          <ChakraNextImage
            src={require("public/assets/bear-market-airdrop/bear-pack-with-bg.png")}
            alt={"bear-market-pack"}
            priority
          />
        ) : (
          <Flex
            ml={{
              base: "auto",
            }}
            mr={{
              base: "auto",
              lg: 0,
            }}
            maxW="100%"
            mt={36}
          >
            <ContractsDeployed contracts={contracts} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
