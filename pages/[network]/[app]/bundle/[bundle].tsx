import {
  useCollectionList,
  useCollectionModule,
  useCollectionModuleMetadata,
} from "@3rdweb-sdk/react/hooks/useCollection";
import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { useWeb3 } from "@3rdweb/hooks";
import { useDisclosure } from "@chakra-ui/hooks";
import { AppLayout } from "components/app-layouts/app";
import { MintButton } from "components/module-pages/action-buttons/mint-button";
import { WrapButton } from "components/module-pages/action-buttons/WrapButton";
import { ModuleLayout } from "components/module-pages/module-layout";
import { ModuleItemsTable } from "components/module-pages/table";
import { MintDrawer } from "components/shared/MintDrawer";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { removeNull } from "utils/removeNull";

const BundleListPage: ConsolePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useWeb3();
  const bundleAddress = useSingleQueryParam("bundle");
  const module = useCollectionModule(bundleAddress);
  const metadata = useCollectionModuleMetadata(bundleAddress);
  const data = useCollectionList(bundleAddress, removeNull(address));

  const { Track } = useTrack({
    page: "bundle",
    bundle: bundleAddress,
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
        secondaryAction={<WrapButton module={module} type="NFT" />}
        tertiaryAction={<WrapButton module={module} type="Token" />}
        emptyState={{
          title:
            "You have not minted any NFTs yet, let's mint one to get you started!",
          action: {
            icon: FiPlus,
            onClick: onOpen,
            label: "Create first NFT",
            requiredRole: "minter",
          },
        }}
      >
        {data.data && <ModuleItemsTable module={module} items={data.data} />}
      </ModuleLayout>
    </Track>
  );
};

BundleListPage.Layout = AppLayout;

export default BundleListPage;
