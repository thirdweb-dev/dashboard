/* eslint-disable react/forbid-dom-props */
"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { TabLinks } from "../../../../@/components/ui/tabs";
import { chainPageTabs } from "./chainPageTabs";
import Link from "next/link";
import { cn } from "../../../../@/lib/utils";

export function ChainPageTabs(props: { chainSlug: string }) {
  const layoutSegment = useSelectedLayoutSegment() || "";
  return (
    <TabLinks
      links={chainPageTabs.map((tab) => ({
        name: tab.name,
        href: `/new/${props.chainSlug}/${tab.segment}`,
        isActive: layoutSegment === tab.segment,
      }))}
    />
  );
}

export function ChainPageSidebar(props: { chainSlug: string }) {
  const layoutSegment = useSelectedLayoutSegment() || "";
  return (
    <nav>
      <ul className={"w-[250px] flex flex-col gap-1"}>
        {/* <div className="h-6 md:h-8"></div> */}
        {/* <ChainPageTabs chainSlug={params.chain_id} /> */}
        {chainPageTabs.map((t) => {
          const isActive = layoutSegment === t.segment;
          return (
            <Link
              key={t.segment}
              href={`/new/${props.chainSlug}/${t.segment}`}
              className={cn(
                "px-3 py-2 hover:bg-muted rounded-lg text-secondary-foreground transitino-colors text-base",
                isActive && "!bg-accent text-foreground",
              )}
            >
              {t.name}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
