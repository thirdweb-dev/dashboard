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
import { useCallback, useEffect, useState } from "react";
import { Heading } from "tw-components";

type HeroProps = {
  desiredChain: Chain;
};

const EDITION_ADDRESS = "0x8BF11976EA6c23a5e69622ea5e32fE241767e0A8";
const PACK_ADDRESS = "0x799b84a01f311bE9Cff8D49E9a37521931224b53";
const AIRDROP_ADDRESS = "0x20b40b3486f7c39E46bD598F5b35e6be5AB311c9";

export const Hero: React.FC<HeroProps> = () => {
  const address = useAddress();
  const toast = useToast();
  const sdk = useSDK();

  const [checkingClaimed, setCheckingClaimed] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [snapshot, setSnapshot] = useState<SnapshotEntryWithProof | null>(null);
  const [unboxing, setUnboxing] = useState(false);
  const [supply, setSupplyLeft] = useState(0);
  const [packTx, setPackTx] = useState<TransactionResult | null>(null);
  const [initialSupply, setInitialSupply] = useState(0);

  const canClaim = !!snapshot?.proof?.length || false;
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
          toast({
            title: "Email submitted!",
            position: "top",
            variant: "left-accent",
            status: "success",
          });
        })
        .catch((err) => {
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
        await handleEmailSubmit(email);

        toast({
          title: "Pack claimed!",
          position: "top",
          variant: "left-accent",
          status: "success",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setClaiming(false);
      }
    },
    [address, airdrop, canClaim, handleEmailSubmit, pack, snapshot, toast],
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
      setUnboxing(false);
    }
  }, [address, hasPack, pack]);

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
              <Box>
                <ConnectWallet />
              </Box>
            ) : hasPack ? (
              <OpenPack openPack={openPack} unboxing={unboxing} />
            ) : (
              <ClaimAirdrop
                canClaim={canClaim}
                isClaiming={claiming}
                claim={claim}
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
            <ContractsDeployed />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
