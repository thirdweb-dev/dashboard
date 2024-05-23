"use client";

import Link from "next/link";
import { Button } from "../../../../@/components/ui/button";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "../../../../@/lib/utils";

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
    <div>
      <div className="flex">
        {tabs.map((tab) => {
          return (
            <Button
              asChild
              key={tab.name}
              variant="ghost"
              className={cn(
                "border-b-2 rounded-none text-md hover:bg-transparent",
                layoutSegment === tab.segment
                  ? "border-primary"
                  : "border-transparent opacity-50 hover:opacity-100 hover:border-primary",
              )}
            >
              <Link
                href={`/new/${props.chainSlug}/${tab.segment}`}
                className="font-medium text-md"
              >
                {tab.name}
              </Link>
            </Button>
          );
        })}
      </div>
      <div className="h-[2px] bg-foreground relative -translate-y-[1px] opacity-10"></div>
    </div>
  );
}
