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
      <div className="overflow-x-auto pb-[4px]">
        <div className="flex pb-[4px] relative">
          {tabs.map((tab) => {
            const isActive = layoutSegment === tab.segment;

            return (
              <Button asChild key={tab.name} variant="ghost">
                <Link
                  href={`/new/${props.chainSlug}/${tab.segment}`}
                  className={cn(
                    "rounded-lg hover:bg-secondary px-3 font-medium text-sm lg:text-md relative h-auto",
                    !isActive && "opacity-50 hover:opacity-100",
                  )}
                >
                  {tab.name}
                  {isActive && (
                    <div className="absolute bottom-[-8px] z-10  w-full h-[2px] bg-foreground rounded-lg"></div>
                  )}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
      <div className="h-[1px] bg-border bottom-[4px] left-0 right-0"></div>
    </div>
  );
}
