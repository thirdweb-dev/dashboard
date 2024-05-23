import { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { ChainMetadata } from "thirdweb/chains";
import { ChainListFilters } from "./components/ChainListFilters";
import { ChainList } from "./components/chain-list";
import { ChainListStateProvider } from "./components/state-provider";
import { Suspense } from "react";
import { Spinner } from "../../../../@/components/ui/Spinner/Spinner";

const ChainListPage: NextPage = async () => {
  const chains = await getChains();

  return (
    <section className="container mx-auto py-10 px-4 h-full flex flex-col">
      <header className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-semibold text-6xl tracking-tighter">Chainlist</h1>
          <div className="flex flex-row gap-4">
            <Button variant="outline">Add your chain</Button>
          </div>
        </div>
      </header>

      <Suspense
        fallback={
          <div className="flex justify-center items-center flex-1">
            <Spinner className="size-20" />
          </div>
        }
      >
        <div className="h-10"></div>

        <ChainListStateProvider>
          <div className="flex flex-row justify-between items-center">
            <ChainListFilters />
          </div>
          <div className="h-4"></div>
          <main>
            <ChainList chains={chains} />
          </main>
        </ChainListStateProvider>
      </Suspense>
    </section>
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
