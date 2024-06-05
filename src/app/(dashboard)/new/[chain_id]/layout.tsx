/* eslint-disable react/forbid-dom-props */
import { cn } from "../../../../@/lib/utils";
import { ArrowLeftIcon, CircleAlertIcon } from "lucide-react";
import { ToolTipLabel } from "../../../../@/components/ui/tooltip";
import { getChain } from "../chainlist/getChain";
import { ReactQueryClientProvider } from "../QueryClientProvider";
import { Separator } from "@/components/ui/separator";
import { ChainPageTabs } from "./tabs";
import { ChainIcon } from "./ChainIcon";
import { ChainOverview } from "./overview/OverviewPage";
import { ChainPageStarButton } from "./ChainPageStarButton";
import Link from "next/link";

// this is the dashboard layout file
export default async function ChainPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { chain_id: string };
}) {
  const chain = await getChain(params.chain_id);
  const isDeprecated = chain.status === "deprecated";

  return (
    <ReactQueryClientProvider>
      <section className="flex flex-col h-full gap-8">
        {/* Header */}
        <header
          className="py-10 md:pt-10 md:pb-16 border-b relative bg-black overflow-hidden"
          style={{
            background: `hsl(var(--secondary))`,
          }}
        >
          <div className="container px-4">
            <Link
              href={`/new/chainlist`}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeftIcon className="size-5" />
              Chainlist
            </Link>
            <div className="h-4" />

            <div className="flex gap-3 md:gap-5 items-center">
              {chain.icon?.url && (
                <ChainIcon
                  chain={chain}
                  className="hidden md:block size-[84px] bg-secondary p-2 border-2 rounded-full"
                />
              )}

              {/* Chain Name */}

              <h1
                className={cn(
                  "font-semibold tracking-tighter text-4xl md:text-6xl",
                )}
              >
                {chain.name}
              </h1>

              {/* Desktop tags */}
              <div className="hidden md:flex text-base items-center gap-3">
                {/* {isVerified && (
                  <ToolTipLabel label="Verified">
                    <Verified className="text-primary-foreground size-[36px]" />
                  </ToolTipLabel>
                )}

                {isGasSponsored && (
                  <ToolTipLabel label="Gas Sponsored">
                    <FuelIcon className="text-primary-foreground size-[36px] " />
                  </ToolTipLabel>
                )} */}

                {isDeprecated && (
                  <ToolTipLabel label="Deprecated">
                    <CircleAlertIcon className="text-destructive-foreground size-[36px]" />
                  </ToolTipLabel>
                )}

                <ChainPageStarButton
                  chainId={chain.chainId}
                  iconClassName="size-[36px]"
                />
              </div>

              {/* Mobile star */}
              <div className="md:hidden flex items-center">
                <ChainPageStarButton
                  chainId={chain.chainId}
                  iconClassName="size-6"
                />
              </div>
            </div>

            {/* Mobile tags */}
            {isDeprecated && (
              <div className="md:hidden ">
                <Separator className="my-5" />
                <div className="flex flex-col gap-3">
                  {isDeprecated && (
                    <div className="flex gap-3">
                      <CircleAlertIcon className="text-destructive-foreground size-6" />
                      <p> Deprecated </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="container px-4 pb-20 flex-1">
          <ChainOverview chain={chain} />
          <div className="h-14" />
          <ChainPageTabs chainSlug={params.chain_id} chain={chain} />
          <div className="pt-8">{children}</div>
        </main>
      </section>
    </ReactQueryClientProvider>
  );
}
