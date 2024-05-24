import { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { ChainMetadata } from "thirdweb/chains";
import { ChainListFilters } from "./components/ChainListFilters";
import { ChainList } from "./components/chain-list";
import { ChainListStateProvider } from "./components/state-provider";
import { Suspense } from "react";
import { Spinner } from "../../../../@/components/ui/Spinner/Spinner";
import Link from "next/link";
import { cn } from "../../../../@/lib/utils";
import { PlusIcon } from "lucide-react";

const ChainListPage: NextPage = async () => {
  const chains = await getChains();

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full">
          <Spinner className="size-20" />
        </div>
      }
    >
      <ChainListStateProvider>
        <section className="container mx-auto py-10 px-4 h-full flex flex-col">
          <header className="flex flex-col gap-4">
            <div className="flex gap-4 flex-col lg:flex-row lg:justify-between lg:items-center">
              <div className="flex items-center justify-between lg:justify-start">
                <h1 className="font-semibold text-4xl lg:text-5xl tracking-tighter">
                  Chainlist
                </h1>
                <AddYourChainButton className="flex lg:hidden items-center" />
              </div>
              <div className="flex flex-row gap-4">
                <ChainListFilters />
                <AddYourChainButton className="hidden lg:flex items-center" />
              </div>
            </div>
          </header>

          <div className="h-10"></div>

          <main>
            <ChainList chains={chains} />
          </main>

          <div className="h-10"></div>
        </section>
      </ChainListStateProvider>
    </Suspense>
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

function AddYourChainButton(props: { className?: string }) {
  return (
    <Button
      asChild
      variant="outline"
      className={cn("lg:py-3 h-auto", props.className)}
    >
      <Link
        href="https://support.thirdweb.com/how-to/vGcHXQ7tHXuSJf7jaL2y5Q/how-to-add-your-evm-chain-to-thirdweb%E2%80%99s-chainlist-/3HMqrwyxXUFxQYaudDJffT"
        target="_blank"
        className="flex items-center gap-2"
      >
        <PlusIcon className="size-4" />
        Add your chain
      </Link>
    </Button>
  );
}
