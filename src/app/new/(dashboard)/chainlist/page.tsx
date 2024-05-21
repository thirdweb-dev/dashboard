import { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { ChainListModeSelect } from "./components/mode-select";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { ChainCard } from "./components/chain-card";
import { ChainMetadata } from "thirdweb/chains";
import { SearchInput } from "./components/search-input";
import { ChainGrid } from "./components/chain-grid";
import { ChainListStateProvider } from "./components/state-provider";

const ChainListPage: NextPage = async () => {
  const chains = await getChains();

  return (
    <ChainListStateProvider>
      <section className="container mx-auto py-10 px-4">
        <header className="flex flex-col gap-4">
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-semibold text-3xl">Chainlist</h1>
            <div className="flex flex-row gap-4">
              {/* <Button variant="ghost">Contact us</Button> */}
              <Button variant="outline">Add your chain</Button>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <SearchInput placeholder="Search by name or chain id" />
            <ChainListModeSelect />
          </div>
        </header>
        <div className="h-6"></div>
        <main>
          <ChainGrid chains={chains} />
        </main>
      </section>
    </ChainListStateProvider>
  );
};

export default ChainListPage;

async function getChains() {
  const response = await fetch("https://api.thirdweb.com/v1/chains/");

  if (!response.ok) {
    response.body?.cancel();
    throw new Error("Failed to fetch chains");
  }

  return (await response.json()).data as ChainMetadata[];
}
