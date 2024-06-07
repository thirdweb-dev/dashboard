/* eslint-disable react/forbid-dom-props */
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, CircleAlertIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ChainPageTabs } from "./tabs";
import { ChainOverview } from "./overview/OverviewPage";
import Link from "next/link";
import { StarButton } from "../components/client/star-button";
import { getChain } from "./utils";
import { Metadata } from "next";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { redirect } from "next/navigation";
import { ChainIcon } from "./components/server/chain-icon";

export async function generateMetadata(
  { params }: { params: { chain_id: string } },
  // parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const chain = await getChain(params.chain_id);

  const sanitizedChainName = chain.name.replace("Mainnet", "").trim();

  const title = `${sanitizedChainName}: RPC and Chain Settings`;

  const description = `Use the best ${sanitizedChainName} RPC and add to your wallet. Discover the chain ID, native token, explorers, and ${
    chain.testnet && chain.faucets?.length ? "faucet options" : "more"
  }.`;

  return {
    title,
    description,
    openGraph: {
      images: [
        {
          url: `${getAbsoluteUrl()}/api/og/chain/${chain.chainId}`,
          width: 1200,
          height: 630,
          alt: `${sanitizedChainName} (${chain.nativeCurrency.symbol}) on thirdweb`,
        },
      ],
    },
  };
}

// this is the dashboard layout file
export default async function ChainPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { chain_id: string };
}) {
  const chain = await getChain(params.chain_id);
  if (params.chain_id !== chain.slug) {
    redirect(chain.slug);
  }
  const isDeprecated = chain.status === "deprecated";

  return (
    <>
      {isDeprecated && (
        <>
          <div className="bg-destructive">
            <div className="container px-4 py-4 flex flex-row items-center gap-4 text-white">
              <CircleAlertIcon className="size-6 flex-shrink-0" />
              <h3 className="font-semibold">
                This chain has been marked as deprecated. Some or all services
                may no longer function.
              </h3>
            </div>
          </div>
          <Separator />
        </>
      )}
      <section className="flex flex-col h-full gap-8">
        {/* Header */}
        <header className="py-10 md:pt-10 md:pb-16 border-b relative overflow-hidden bg-secondary">
          <div className="container px-4">
            <Link
              href="/chainlist"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeftIcon className="size-5" />
              Chainlist
            </Link>
            <div className="h-4" />

            <div className="flex gap-3 md:gap-5 items-center">
              {chain.icon?.url && (
                <ChainIcon
                  iconUrl={chain.icon.url}
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

                <StarButton
                  chainId={chain.chainId}
                  iconClassName="size-[36px]"
                />
              </div>

              {/* Mobile star */}
              <div className="md:hidden flex items-center">
                <StarButton chainId={chain.chainId} iconClassName="size-6" />
              </div>
            </div>

            {/* Mobile tags */}
          </div>
        </header>
        <main className="container px-4 pb-20 flex-1">
          <ChainOverview chain={chain} />
          <div className="h-14" />
          <ChainPageTabs chainSlug={params.chain_id} chain={chain} />
          <div className="pt-8">{children}</div>
        </main>
      </section>
    </>
  );
}
