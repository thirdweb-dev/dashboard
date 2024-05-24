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
    <div className="relative">
      <div className="overflow-x-auto">
        <div className="flex">
          {tabs.map((tab) => {
            return (
              <Button asChild key={tab.name} variant="ghost">
                <Link
                  href={`/new/${props.chainSlug}/${tab.segment}`}
                  className={cn(
                    "border-b-2 rounded-none hover:bg-transparent px-3 lg:px-4 font-medium text-sm lg:text-md",
                    layoutSegment === tab.segment
                      ? "border-primary "
                      : "border-transparent opacity-50 hover:opacity-100",
                  )}
                >
                  {tab.name}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
      <div className="h-[2px] bg-foreground bottom-0 left-0 right-0 opacity-10 absolute"></div>
    </div>
  );
}
