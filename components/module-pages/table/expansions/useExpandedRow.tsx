import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { BundleDropModule, PackModule } from "@3rdweb/sdk";
import { useCallback } from "react";
import { useTableContext } from "../table-context";
import { BundleDropTokenSettingsSection } from "./BundleDropTokenSettings";
import { ListSection } from "./ListSection";
import { RewardsSection } from "./RewardsSection";
import { TransferSection } from "./TransferSection";

export function useExpandedRow<TModule extends EitherBaseModuleType>(
  module?: TModule,
) {
  const { expanded } = useTableContext();
  const renderExpandedRow = useCallback(
    (tokenId: string) => {
      if (tokenId === expanded?.tokenId) {
        if (expanded.type === "list") {
          return <ListSection module={module} tokenId={expanded.tokenId} />;
        } else if (expanded.type === "transfer") {
          return <TransferSection module={module} tokenId={expanded.tokenId} />;
        } else if (
          expanded.type === "settings" &&
          module instanceof BundleDropModule
        ) {
          return (
            <BundleDropTokenSettingsSection
              module={module}
              tokenId={expanded.tokenId}
            />
          );
        } else if (
          expanded.type === "rewards" &&
          module instanceof PackModule
        ) {
          return <RewardsSection module={module} tokenId={expanded.tokenId} />;
        }
      }

      return null;
    },
    [expanded, module],
  );

  return { renderExpandedRow, title: expanded?.type || "" };
}
