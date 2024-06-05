/* eslint-disable react/forbid-dom-props */
"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { TabLinks } from "../../../../@/components/ui/tabs";
import { getEnabledTabs } from "./chainPageTabs";
import type { ChainMetadataWithServices } from "../chainlist/getChain";

export function ChainPageTabs(props: {
  chainSlug: string;
  chain: ChainMetadataWithServices;
}) {
  const layoutSegment = useSelectedLayoutSegment() || "";
  return (
    <TabLinks
      links={getEnabledTabs(props.chain).map((tab) => ({
        name: tab.name,
        href: `/new/${props.chainSlug}/${tab.segment}`,
        isActive: layoutSegment === tab.segment,
        isEnabled: tab.isEnabled,
        icon: tab.icon,
      }))}
    />
  );
}
