import {
  useNftList,
  useNftModule,
  useNFTModuleMetadata,
} from "@3rdweb-sdk/react";
import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { useDisclosure } from "@chakra-ui/hooks";
import { AppLayout } from "components/app-layouts/app";
import { MintButton } from "components/module-pages/action-buttons/mint-button";
import { ModuleLayout } from "components/module-pages/module-layout";
import { ModuleItemsTable } from "components/module-pages/table";
import { MintDrawer } from "components/shared/MintDrawer";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import React from "react";
import { FiPlus } from "react-icons/fi";

const NFTCollectionPage: ConsolePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nftCollectionAddress = useSingleQueryParam("nft-collection");
  const module = useNftModule(nftCollectionAddress);
  const metadata = useNFTModuleMetadata(nftCollectionAddress);
  const data = useNftList(nftCollectionAddress);

  const { Track } = useTrack({
    page: "nft-collection",
    nftCollection: nftCollectionAddress,
  });

  return (
    <Track>
      <MintDrawer
        isOpen={isOpen}
        onClose={onClose}
        module={module as EitherBaseModuleType}
      />
      <ModuleLayout
        module={module}
        metadata={metadata}
        data={data}
        primaryAction={MintButton}
        emptyState={{
          title:
            "You have not minted any NFTs yet, let's mint one to get you started!",
          action: {
            icon: FiPlus,
            onClick: onOpen,
            label: "Mint first NFT",
            requiredRole: "minter",
          },
        }}
      >
        {data.data && <ModuleItemsTable module={module} items={data.data} />}
      </ModuleLayout>
    </Track>
  );
};

NFTCollectionPage.Layout = AppLayout;

export default NFTCollectionPage;
