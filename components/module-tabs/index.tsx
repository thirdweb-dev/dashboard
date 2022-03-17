import { useIsAdmin, useModuleTypeOfModule } from "@3rdweb-sdk/react";
import {
  BundleDropModule,
  BundleModule,
  DropModule,
  MarketplaceModule,
  ModuleType,
  NFTModule,
  PackModule,
  TokenModule,
  VoteModule,
} from "@3rdweb/sdk";
import { SupportedModule } from "constants/modules";
import React, { useMemo } from "react";
import { ModuleCode } from "./code/ModuleCode";
import { WidgetSetup } from "./embeds";
import { ModulePermissions } from "./permissions/ModulePermissions";
import { BundleDropSettings } from "./settings/modules/BundleDropSettings";
import { BundleSettings } from "./settings/modules/BundleSettings";
import { DropSettings } from "./settings/modules/DropSettings";
import { MarketplaceSettings } from "./settings/modules/MarketplaceSettings";
import { NFTSettings } from "./settings/modules/NFTSettings";
import { PackSettings } from "./settings/modules/PackSettings";
import { TokenSettings } from "./settings/modules/TokenSettings";
import { VoteSettings } from "./settings/modules/VoteSettings";
import { ModuleSettings } from "./settings/shared/ModuleSettings";

export interface ModuleTab {
  title: string;
  content: JSX.Element;
}

export function useModuleTabs(module?: SupportedModule): ModuleTab[] {
  const isAdmin = useIsAdmin(module);
  const type = useModuleTypeOfModule(module);

  const permissions: Partial<Record<ModuleType, boolean>> = useMemo(
    () => ({
      [ModuleType.NFT]: true,
      [ModuleType.BUNDLE]: true,
      [ModuleType.TOKEN]: true,
      [ModuleType.DROP]: true,
      [ModuleType.BUNDLE_DROP]: true,
      [ModuleType.BUNDLE_SIGNATURE]: true,
      [ModuleType.MARKET]: true,
      [ModuleType.MARKETPLACE]: true,
      [ModuleType.SPLITS]: false,
      [ModuleType.PACK]: true,
      [ModuleType.VOTE]: false,
    }),
    [],
  );

  const embeds: Partial<Record<ModuleType, JSX.Element | undefined>> = useMemo(
    () => ({
      [ModuleType.NFT]: undefined,
      [ModuleType.BUNDLE]: undefined,
      [ModuleType.TOKEN]: undefined,
      [ModuleType.DROP]: <WidgetSetup module={module as DropModule} />,
      [ModuleType.BUNDLE_DROP]: (
        <WidgetSetup module={module as BundleDropModule} />
      ),
      [ModuleType.BUNDLE_SIGNATURE]: undefined,
      [ModuleType.MARKET]: undefined,
      [ModuleType.MARKETPLACE]: (
        <WidgetSetup module={module as MarketplaceModule} />
      ),
      [ModuleType.SPLITS]: undefined,
      [ModuleType.PACK]: undefined,
      [ModuleType.VOTE]: undefined,
    }),
    [module],
  );

  const settings: Partial<Record<ModuleType, JSX.Element | undefined>> =
    useMemo(
      () => ({
        [ModuleType.NFT]: <NFTSettings module={module as NFTModule} />,
        [ModuleType.BUNDLE]: <BundleSettings module={module as BundleModule} />,
        [ModuleType.TOKEN]: <TokenSettings module={module as TokenModule} />,
        [ModuleType.DROP]: <DropSettings module={module as DropModule} />,
        [ModuleType.BUNDLE_DROP]: (
          <BundleDropSettings module={module as BundleDropModule} />
        ),
        [ModuleType.BUNDLE_SIGNATURE]: undefined,
        [ModuleType.MARKET]: undefined,
        [ModuleType.MARKETPLACE]: (
          <MarketplaceSettings module={module as MarketplaceModule} />
        ),
        [ModuleType.SPLITS]: undefined,
        [ModuleType.PACK]: <PackSettings module={module as PackModule} />,
        [ModuleType.VOTE]: <VoteSettings module={module as VoteModule} />,
      }),
      [module],
    );

  const code: Partial<Record<ModuleType, JSX.Element | undefined>> = useMemo(
    () => ({
      [ModuleType.NFT]: <ModuleCode module={module} />,
      [ModuleType.BUNDLE]: <ModuleCode module={module} />,
      [ModuleType.TOKEN]: <ModuleCode module={module} />,
      [ModuleType.DROP]: <ModuleCode module={module} />,
      [ModuleType.BUNDLE_DROP]: <ModuleCode module={module} />,
      [ModuleType.BUNDLE_SIGNATURE]: <ModuleCode module={module} />,
      [ModuleType.MARKET]: <ModuleCode module={module} />,
      [ModuleType.MARKETPLACE]: <ModuleCode module={module} />,
      [ModuleType.SPLITS]: <ModuleCode module={module} />,
      [ModuleType.PACK]: <ModuleCode module={module} />,
      [ModuleType.VOTE]: <ModuleCode module={module} />,
    }),
    [module],
  );

  return useMemo(() => {
    const tabs: ModuleTab[] = [];

    if (permissions[type as ModuleType]) {
      tabs.push({
        title: "Permissions",
        content: <ModulePermissions module={module as any} />,
      });
    }

    if (embeds[type as ModuleType]) {
      tabs.push({
        title: "Embed",
        content: embeds[type as ModuleType] as JSX.Element,
      });
    }

    if (code[type as ModuleType]) {
      tabs.push({
        title: "Code",
        content: code[type as ModuleType] || <></>,
      });
    }

    // Hide module settings if user isn't admin unless its a vote module (where settings are decentralized)
    if (isAdmin || type === ModuleType.VOTE) {
      tabs.push({
        title: "Settings",
        content: settings[type as ModuleType] || (
          <ModuleSettings module={module} />
        ),
      });
    }

    return tabs;
  }, [type, isAdmin, module, permissions, settings, embeds, code]);
}
