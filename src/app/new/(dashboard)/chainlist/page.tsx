import { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { ChainListModeSelect } from "./components/mode-select";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { ChainCard } from "./components/chain-card";
import { ChainMetadata } from "thirdweb/chains";
import { SearchInput } from "./components/search-input";

const ChainListPage: NextPage = async () => {
  const chains = await getChains();
  return (
    <section className="flex flex-col container mx-auto py-10 gap-4">
      <header className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-semibold text-3xl">Chainlist</h1>
          <div className="flex flex-row gap-4">
            {/* <Button variant="ghost">Contact us</Button> */}
            <Button variant="outline">Add your chain</Button>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <SearchInput placeholder="Search" />
          <Suspense>
            <ChainListModeSelect />
          </Suspense>
        </div>
      </header>
      <Separator />
      <main>
        <div className="grid gap-5 items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {chains.map((chain) => (
            <ChainCard
              key={chain.chainId}
              chain={chain}
              isPreferred={chain.chainId === 1}
              isVerified={chain.chainId === 1}
            />
          ))}
        </div>
      </main>
    </section>
  );
};

export default ChainListPage;

async function getChains() {
  const response = await fetch("https://api.thirdweb.com/v1/chains?limit=25");

  if (!response.ok) {
    response.body?.cancel();
    throw new Error("Failed to fetch chains");
  }

  return (await response.json()).data as ChainMetadata[];
}
