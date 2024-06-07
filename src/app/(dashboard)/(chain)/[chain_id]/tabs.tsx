/* eslint-disable react/forbid-dom-props */
"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { TabLinks } from "@/components/ui/tabs";
import { getEnabledTabs } from "./chainPageTabs";
import { ChainMetadataWithServices } from "../types/chain";

export function ChainPageTabs(props: {
  chainSlug: string;
  chain: ChainMetadataWithServices;
}) {
  const layoutSegment = useSelectedLayoutSegment() || "";
  return (
    <TabLinks
      links={getEnabledTabs(props.chain).map((tab) => ({
        name: tab.name,
        href: `/${props.chainSlug}/${tab.segment}`,
        isActive: layoutSegment === tab.segment,
        isEnabled: tab.isEnabled,
        icon: tab.icon,
      }))}
    />
  );
}
