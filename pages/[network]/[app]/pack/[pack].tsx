import {
  useIsAdmin,
  usePackLink,
  usePackList,
  usePackModule,
  usePackModuleMetadata,
} from "@3rdweb-sdk/react";
import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { Stack, useDisclosure } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { MintButton } from "components/module-pages/action-buttons/mint-button";
import { ModuleLayout } from "components/module-pages/module-layout";
import { ModuleItemsTable } from "components/module-pages/table";
import { ModulePageNotice } from "components/notices/ModulePageNotice";
import { MintDrawer } from "components/shared/MintDrawer";
import { BigNumber } from "ethers";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import React, { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";

const PackPage: ConsolePage = () => {
  const packAddress = useSingleQueryParam("pack");
  const data = usePackList(packAddress);
  const module = usePackModule(packAddress);
  const metadata = usePackModuleMetadata(packAddress);
  const isAdmin = useIsAdmin(module);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState<number | undefined>();
  const { data: balance, isLoading } = usePackLink(packAddress);

  const { Track } = useTrack({
    page: "pack",
    pack: packAddress,
  });

  const noLink = useMemo(() => {
    return BigNumber.from(balance?.value || 0).isZero();
  }, [balance]);

  return (
    <Track>
      <MintDrawer
        isOpen={isOpen}
        onClose={onClose}
        module={module as EitherBaseModuleType}
      />
      <ModuleLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        module={module}
        metadata={metadata}
        data={data}
        primaryAction={MintButton}
        emptyState={{
          title:
            "You have not created any packs yet, let's create one to get started!",
          action: {
            icon: FiPlus,
            onClick: onOpen,
            label: "Create first pack",
            requiredRole: "minter",
          },
        }}
      >
        <Stack spacing={5}>
          {noLink && !isLoading && isAdmin && (
            <ModulePageNotice
              color="orange"
              onClick={() => setActiveTab(3)}
              action="Deposit LINK"
              message={`
                You need to deposit LINK to enable pack opening. LINK is used to
                ensure that pack opens are genuinely random.
              `}
            />
          )}
          {data.data && <ModuleItemsTable module={module} items={data.data} />}
        </Stack>
      </ModuleLayout>
    </Track>
  );
};

PackPage.Layout = AppLayout;

export default PackPage;
