/* eslint-disable react/forbid-dom-props */
"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { TabLinks } from "../../../../@/components/ui/tabs";

const tabs = [
  {
    name: "Overview",
    segment: "",
  },
  {
    name: "Contracts",
    segment: "contracts",
  },
  {
    name: "Connect SDK",
    segment: "connect",
  },
  {
    name: "Engine",
    segment: "engine",
  },
  {
    name: "Account Abstraction",
    segment: "aa",
  },
  {
    name: "Pay",
    segment: "pay",
  },
  {
    name: "RPC Edge",
    segment: "rpc",
  },
];

export function ChainPageTabs(props: { chainSlug: string }) {
  const layoutSegment = useSelectedLayoutSegment() || "";
  return (
    <TabLinks
      links={tabs.map((tab) => ({
        name: tab.name,
        href: `/new/${props.chainSlug}/${tab.segment}`,
        isActive: layoutSegment === tab.segment,
      }))}
    />
  );
}
