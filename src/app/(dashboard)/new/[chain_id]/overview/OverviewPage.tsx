import type { ChainMetadata } from "thirdweb/chains";
import Link from "next/link";
import { CheckIcon, ExternalLinkIcon, XIcon } from "lucide-react";
import { getChain } from "../../chainlist/getChain";
import { ChainLiveStats } from "./components/ChainLiveStats";
import { PrimaryInfoItem } from "./components/PrimaryInfoItem";
import { Separator } from "@/components/ui/separator";
import { products } from "../../chainlist/products";
import { Button } from "@/components/ui/button";
import { cn } from "../../../../../@/lib/utils";

export async function ChainOverviewPage(props: {
  params: { chain_id: string };
}) {
  const chain = await getChain(props.params.chain_id);

  return (
    <div className="py-3">
      <div className="flex flex-col gap-6">
        <PrimaryInfoGrid chain={chain} />
        <EnabledServices />
      </div>

      <Separator className="my-8" />

      {(chain.faucets || chain.explorers) && (
        <div className="flex flex-col gap-6">
          {chain.faucets && chain.faucets.length > 0 && (
            <Faucets faucets={[...chain.faucets]} />
          )}

          {chain.explorers && chain.explorers.length > 0 && (
            <Explorers explorers={chain.explorers} />
          )}
        </div>
      )}
    </div>
  );
}

function PrimaryInfoGrid(props: { chain: ChainMetadata }) {
  const { chain } = props;
  return (
    <div className="grid grid-cols-1 gap-5 lg:gap-7 md:grid-cols-2 lg:grid-cols-3">
      {/* Info */}
      {chain.infoURL && (
        <PrimaryInfoItem title="Info">
          <div className="flex items-center gap-1.5 hover:text-primary">
            <Link href={chain.infoURL} target="_blank" className="text-lg">
              {new URL(chain.infoURL).hostname}
            </Link>
            <ExternalLinkIcon className="size-4" />
          </div>
        </PrimaryInfoItem>
      )}

      {/* Chain Id */}
      <PrimaryInfoItem title="Chain ID">
        <div className="text-lg">{chain.chainId}</div>
      </PrimaryInfoItem>

      {/* Native token */}
      <PrimaryInfoItem title="Native Token">
        <div className="text-lg">
          {chain.nativeCurrency.name} ({chain.nativeCurrency.symbol})
        </div>
      </PrimaryInfoItem>

      {/* Live Stats */}
      {chain.rpc[0] && <ChainLiveStats rpc={chain.rpc[0]} />}
    </div>
  );
}

function EnabledServices() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-md text-muted-foreground font-medium">
          Enabled Services
        </h2>
        <span className="text-md"> 5/6 </span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {products.map((p, i) => {
          // TODO
          const isSupported = i !== 5;
          return (
            <Button
              key={p.name}
              variant="outline"
              asChild
              className={cn(
                "rounded-xl px-3 py-0.5 hover:bg-transparent hover:border-primary",
              )}
            >
              <Link
                href={p.href}
                target="_blank"
                className="text-sm flex gap-1.5 items-center "
              >
                {isSupported ? (
                  <CheckIcon className="size-5 text-success-foreground" />
                ) : (
                  <XIcon className="size-5 text-destructive-foreground" />
                )}
                {p.name}
              </Link>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

function Faucets(props: { faucets: string[] }) {
  return (
    <div>
      <h2 className="text-md text-muted-foreground mb-2 font-medium">
        Faucets
      </h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {props.faucets.map((faucet) => {
          const url = new URL(faucet);
          const hostnameSplit = url.hostname.split(".");
          const tld = hostnameSplit.pop();
          const domain = hostnameSplit.pop();
          const displayTitle = `${domain}.${tld}`;

          return (
            <div
              key={faucet}
              className="p-4 border rounded-lg relative hover:border-ring"
            >
              <h3 className="mb-1 text-md font-semibold">{displayTitle}</h3>
              <Link
                href={faucet}
                target="_blank"
                className="text-sm flex gap-1.5 items-center before:absolute before:inset-0 before:z-0 text-muted-foreground"
              >
                {faucet.endsWith("/") ? faucet.slice(0, -1) : faucet}
              </Link>
              <ExternalLinkIcon className="size-4 absolute top-4 right-4 text-muted-foreground" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Explorers(props: {
  explorers: NonNullable<ChainMetadata["explorers"]>;
}) {
  return (
    <div>
      <h2 className="text-md text-muted-foreground mb-2 font-medium">
        Explorers
      </h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {props.explorers.map((explorer) => {
          return (
            <div
              key={explorer.url}
              className="p-4 border rounded-lg relative hover:border-ring"
            >
              <h3 className="mb-1 text-md font-semibold">{explorer.name}</h3>
              <Link
                href={explorer.url}
                target="_blank"
                className="text-sm flex gap-1.5 items-center before:absolute before:inset-0 before:z-0 text-muted-foreground"
              >
                {explorer.url.endsWith("/")
                  ? explorer.url.slice(0, -1)
                  : explorer.url}
              </Link>
              <ExternalLinkIcon className="size-4 absolute top-4 right-4 text-muted-foreground" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
