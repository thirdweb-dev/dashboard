import { ChainPageTabs } from "./tabs";
import { cn } from "../../../../@/lib/utils";
import type { Chain } from "@thirdweb-dev/chains";

// this is the dashboard layout file
export default async function ChainPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { chain_id: string };
}) {
  const chain = await getChain(params.chain_id);

  return (
    <section className="flex flex-col">
      <header className="bg-gradient-to-b from-zinc-900 to-transparent pt-12 lg:pt-24 pb-14">
        <div className="container px-4">
          <h1
            className={cn(
              "font-semibold tracking-tighter",
              chain.name.length > 15
                ? "text-3xl lg:text-7xl"
                : "text-4xl lg:text-8xl ",
            )}
          >
            {chain.name}
          </h1>

          <div className="h-6 lg:h-10"></div>
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
