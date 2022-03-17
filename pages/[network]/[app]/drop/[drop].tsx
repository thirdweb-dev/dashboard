import {
  MinterOnly,
  useBatchesToReveal,
  useCanCreateBatch,
  useDropActiveClaimCondition,
  useDropList,
  useDropModule,
  useDropModuleMetadata,
  useDropSupply,
} from "@3rdweb-sdk/react";
import { BatchToReveal } from "@3rdweb/sdk";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Icon,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { NftDropBatchUpload } from "components/batch-upload/NftDropBatchUpload";
import { Card } from "components/layout/Card";
import { MintButton } from "components/module-pages/action-buttons/mint-button";
import { ModuleLayout } from "components/module-pages/module-layout";
import { ModuleItemsTable } from "components/module-pages/table";
import { ModulePageNotice } from "components/notices/ModulePageNotice";
import { RevealNftsModal } from "components/reveal-nfts/RevealNfts";
import { MintDrawer } from "components/shared/MintDrawer";
import { MismatchButton } from "components/shared/MismatchButton";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";

const LazyNFTListPage: ConsolePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isBatchOpen,
    onOpen: onBatchOpen,
    onClose: onBatchClose,
  } = useDisclosure();
  const {
    isOpen: isRevealOpen,
    onOpen: onRevealOpen,
    onClose: onRevealClose,
  } = useDisclosure();
  const [activeTab, setActiveTab] = useState<number | undefined>(0);
  const [selectedBatch, setSelectedBatch] = useState<BatchToReveal>();
  const dropAddress = useSingleQueryParam("drop");
  const activeClaimCondition = useDropActiveClaimCondition(dropAddress);
  const module = useDropModule(dropAddress);
  const metadata = useDropModuleMetadata(dropAddress);
  const data = useDropList(dropAddress);
  const { data: supplyData } = useDropSupply(dropAddress);
  const { Track } = useTrack({
    page: "drop",
    drop: dropAddress,
  });
  const canCreateBatch = useCanCreateBatch(dropAddress);
  const batchesToReveal = useBatchesToReveal(dropAddress);

  const hasActiveClaimCondition =
    !activeClaimCondition.isLoading && activeClaimCondition.data;

  return (
    <Track>
      <MintDrawer isOpen={isOpen} onClose={onClose} module={module} />
      <NftDropBatchUpload
        isOpen={isBatchOpen}
        onClose={onBatchClose}
        module={module}
      />
      <RevealNftsModal
        isOpen={isRevealOpen}
        onClose={onRevealClose}
        module={module}
        batch={selectedBatch as BatchToReveal}
      />
      <ModuleLayout
        module={module}
        metadata={metadata}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data={data}
        primaryAction={MintButton}
        secondaryAction={
          <MinterOnly module={module}>
            <MismatchButton
              isDisabled={!canCreateBatch.data}
              isLoading={canCreateBatch.isLoading}
              leftIcon={<Icon as={RiCheckboxMultipleBlankLine} />}
              onClick={onBatchOpen}
              colorScheme="purple"
            >
              {canCreateBatch.data ? "Batch Upload" : "Batch Unavailable"}
            </MismatchButton>
          </MinterOnly>
        }
        tertiaryAction={
          batchesToReveal.data && batchesToReveal.data.length > 0 ? (
            <MinterOnly module={module}>
              {batchesToReveal.data && batchesToReveal.data.length === 1 ? (
                <MismatchButton
                  isDisabled={!batchesToReveal.data}
                  isLoading={batchesToReveal.isLoading}
                  onClick={() => {
                    const batch =
                      batchesToReveal.data && batchesToReveal.data[0];
                    if (batch) {
                      setSelectedBatch(batch);
                      onRevealOpen();
                    }
                  }}
                  colorScheme="blue"
                >
                  Reveal NFTs
                </MismatchButton>
              ) : (
                <Menu>
                  <MismatchButton
                    as={MenuButton}
                    isDisabled={!batchesToReveal.data}
                    isLoading={batchesToReveal.isLoading}
                    colorScheme="blue"
                  >
                    Reveal NFTs
                  </MismatchButton>
                  <MenuList>
                    {batchesToReveal.data.map((batch) => (
                      <MenuItemOption
                        key={batch.batchUri}
                        value={batch.batchId.toString()}
                        onClick={() => {
                          setSelectedBatch(batch);
                          onRevealOpen();
                        }}
                      >
                        {batch.placeholderMetadata.name}
                      </MenuItemOption>
                    ))}
                  </MenuList>
                </Menu>
              )}
            </MinterOnly>
          ) : undefined
        }
        emptyState={{
          title:
            "You have not added any drops yet, let's add your first one to get started!",
          action: {
            icon: FiPlus,
            onClick: onOpen,
            label: "Add your first drop",
            requiredRole: "minter",
          },
        }}
      >
        <Stack spacing={6}>
          {!hasActiveClaimCondition && (
            <ModulePageNotice
              color="orange"
              onClick={() => setActiveTab(4)}
              action="Set Claim Condition"
              message={`
                You need to create a claim condition in order for users to claim your NFTs.
              `}
            />
          )}
          <Stack direction="row" spacing={6}>
            <Card as={Stat}>
              <StatLabel>Total Supply</StatLabel>
              <StatNumber>{supplyData?.totalSupply}</StatNumber>
            </Card>
            <Card as={Stat}>
              <StatLabel>Claimed Supply</StatLabel>
              <StatNumber>{supplyData?.totalClaimedSupply}</StatNumber>
            </Card>
            <Card as={Stat}>
              <StatLabel>Unclaimed Supply</StatLabel>
              <StatNumber>{supplyData?.totalUnclaimedSupply}</StatNumber>
            </Card>
          </Stack>
          {data.data && <ModuleItemsTable module={module} items={data.data} />}
        </Stack>
      </ModuleLayout>
    </Track>
  );
};

export default LazyNFTListPage;

LazyNFTListPage.Layout = AppLayout;
