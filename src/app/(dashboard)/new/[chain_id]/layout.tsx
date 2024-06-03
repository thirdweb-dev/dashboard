/* eslint-disable react/forbid-dom-props */
import { cn } from "../../../../@/lib/utils";
import { StarButton } from "../chainlist/components/star-button";
import { CircleAlertIcon, FuelIcon, Verified } from "lucide-react";
import { ToolTipLabel } from "../../../../@/components/ui/tooltip";
import { getChain } from "../chainlist/getChain";
import { ReactQueryClientProvider } from "./QueryClientProvider";
import { Separator } from "@/components/ui/separator";
import { ChainPageSidebar, ChainPageTabs } from "./tabs";
import { ChainIcon } from "./ChainIcon";

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

  // TODO
  const isVerified = true;
  const isGasSponsored = true;

  return (
    <ReactQueryClientProvider>
      <section className="flex flex-col h-full gap-8">
        {/* Header */}
        <header
          className="py-10 md:py-16 border-b relative bg-black overflow-hidden"
          style={{
            background: `hsl(var(--secondary))`,
          }}
        >
          <div className="container px-4">
            <div className="flex gap-3 md:gap-5 items-center">
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
                {isVerified && (
                  <ToolTipLabel label="Verified">
                    <Verified className="text-primary-foreground size-[36px]" />
                  </ToolTipLabel>
                )}

                {isGasSponsored && (
                  <ToolTipLabel label="Gas Sponsored">
                    <FuelIcon className="text-primary-foreground size-[36px] " />
                  </ToolTipLabel>
                )}

                {isDeprecated && (
                  <ToolTipLabel label="Deprecated">
                    <CircleAlertIcon className="text-destructive-foreground size-[36px]" />
                  </ToolTipLabel>
                )}

                <StarButton
                  chainId={chain.chainId}
                  initialPreferred={false}
                  iconClassName="size-[36px]"
                />
              </div>

              {/* Mobile star */}
              <div className="md:hidden flex items-center">
                <StarButton
                  chainId={chain.chainId}
                  initialPreferred={false}
                  iconClassName="size-6"
                />
              </div>

              {chain.icon?.url && (
                <ChainIcon
                  chain={chain}
                  className="hidden md:block size-[84px] ml-auto bg-secondary p-2 border-2 rounded-full"
                />
              )}
            </div>

            {/* Mobile tags */}
            <div className="md:hidden ">
              <Separator className="my-5" />
              <div className="flex flex-col gap-3">
                {isGasSponsored && (
                  <div className="flex gap-3">
                    <FuelIcon className="text-primary-foreground size-6" />
                    <p> Gas Sponsored </p>
                  </div>
                )}

                {isVerified && (
                  <div className="flex gap-3">
                    <Verified className="text-primary-foreground size-6" />
                    <p> Verified </p>
                  </div>
                )}

                {isDeprecated && (
                  <div className="flex gap-3">
                    <CircleAlertIcon className="text-destructive-foreground size-6" />
                    <p> Deprecated </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="container px-4 pb-20 flex-1">
          <div className="flex flex-col xl:flex-row gap-6 h-full">
            <div className="hidden xl:block h-full">
              <ChainPageSidebar chainSlug={params.chain_id} />
            </div>
            <div className="xl:hidden">
              <ChainPageTabs chainSlug={params.chain_id} />
            </div>
            <div className="flex-1">{children}</div>
          </div>
        </main>
      </section>
    </ReactQueryClientProvider>
  );
}
