import { ChainPageTabs } from "./tabs";
import { cn } from "../../../../@/lib/utils";
import type { Chain } from "@thirdweb-dev/chains";
import { StarButton } from "../chainlist/components/star-button";
import { FuelIcon, Verified } from "lucide-react";
import { ToolTipLabel } from "../../../../@/components/ui/tooltip";

// this is the dashboard layout file
export default async function ChainPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { chain_id: string };
}) {
  const chain = await getChain(params.chain_id);

  // TODO
  const isVerified = true;
  const isGasSponsored = true;

  return (
    <section className="flex flex-col">
      <header className="pt-8 lg:pt-20 pb-4">
        <div className="container px-4">
          <div className="flex gap-3 lg:gap-5 items-center">
            <h1
              className={cn(
                "font-semibold tracking-tighter text-3xl lg:text-6xl",
              )}
            >
              {chain.name}
            </h1>

            {/* Desktop tags */}
            <div className="hidden lg:flex text-md items-center gap-3">
              {isGasSponsored && (
                <ToolTipLabel label="Gas Sponsored">
                  <FuelIcon className="text-primary size-[36px] block z-10" />
                </ToolTipLabel>
              )}

              {isVerified && (
                <ToolTipLabel label="Verified">
                  <Verified className="text-primary size-[36px] text-md z-10" />
                </ToolTipLabel>
              )}

              <StarButton
                chainId={chain.chainId}
                initialPreferred={false}
                iconClassName="size-[36px]"
              />
            </div>

            {/* Mobile star */}
            <div className="lg:hidden flex items-center">
              <StarButton
                chainId={chain.chainId}
                initialPreferred={false}
                iconClassName="size-5"
              />
            </div>
          </div>

          {/* Mobile tags */}
          <div className="lg:hidden ">
            <div className="h-6"></div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <FuelIcon className="text-primary size-6" />
                <p> Gas Sponsored </p>
              </div>

              <div className="flex gap-3">
                <Verified className="text-primary size-6" />
                <p> Verified </p>
              </div>
            </div>
          </div>

          <div className="h-6 lg:h-8"></div>
          <ChainPageTabs chainSlug={params.chain_id} />
        </div>
      </header>
      <main className="container px-4">
        <div className="flex justify-center items-center h-[300px] text-3xl uppercase">
          {children}
        </div>
      </main>
    </section>
  );
}

async function getChain(chainIdOrSlug: string): Promise<Chain> {
  const res = await fetch(
    `https://api.thirdweb.com/v1/chains/${chainIdOrSlug}`,
  );
  const result = await res.json();
  if (!result.data) {
    throw new Error("Chain not found");
  }
  return result.data as Chain;
}
