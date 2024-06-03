import Link from "next/link";
import { CheckIcon, ExternalLinkIcon, XIcon } from "lucide-react";
import {
  getChain,
  type ChainMetadataWithServices,
} from "../../chainlist/getChain";
import { ChainLiveStats } from "./components/ChainLiveStats";
import { PrimaryInfoItem } from "./components/PrimaryInfoItem";
import { products } from "../../chainlist/products";
import { Button } from "@/components/ui/button";
import { cn } from "../../../../../@/lib/utils";

export async function ChainOverviewPage(props: {
  params: { chain_id: string };
}) {
  const chain = await getChain(props.params.chain_id);

  return (
    <div className="flex flex-col gap-10 pt-2">
      <PrimaryInfoGrid chain={chain} />
      <EnabledServices chain={chain} />
      {chain.faucets && chain.faucets.length > 0 && (
        <Faucets faucets={[...chain.faucets]} />
      )}

      {chain.explorers && chain.explorers.length > 0 && (
        <Explorers explorers={chain.explorers} />
      )}
    </div>
  );
}

function PrimaryInfoGrid(props: { chain: ChainMetadataWithServices }) {
  const { chain } = props;
  const isDeprecated = chain.status === "deprecated";

  return (
    <div className="grid grid-cols-1 gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      {chain.rpc[0] && !isDeprecated && <ChainLiveStats rpc={chain.rpc[0]} />}
    </div>
  );
}

function EnabledServices(props: { chain: ChainMetadataWithServices }) {
  return (
    <div className="pb-10 border-b">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-base text-muted-foreground font-medium">
          Enabled Services
        </h2>
        <span className="text-base"> 5/6 </span>
      </div>
      <div className="flex-col md:flex-row flex gap-2 flex-wrap">
        {products.map((p) => {
          const isSupported = props.chain.services.find(
            (s) => s.service === p.id,
          )?.enabled;

          return (
            <Button
              key={p.name}
              variant="outline"
              asChild
              className={cn(
                "rounded-xl px-3 py-0.5 hover:bg-muted bg-secondary",
              )}
            >
              <Link
                href={p.href}
                target="_blank"
                className="text-sm flex gap-1.5 items-center !justify-start"
              >
                {isSupported ? (
                  <CheckIcon className="size-4 text-success-foreground" />
                ) : (
                  <XIcon className="size-4 text-destructive-foreground" />
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
      <h2 className="text-base text-muted-foreground mb-2 font-medium">
        Faucets
      </h2>
      <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {props.faucets.map((faucet) => {
          const url = new URL(faucet);
          const hostnameSplit = url.hostname.split(".");
          const tld = hostnameSplit.pop();
          const domain = hostnameSplit.pop();
          const displayTitle = `${domain}.${tld}`;
          let displayUrl = url.port + url.hostname + url.pathname;
          displayUrl = displayUrl.endsWith("/")
            ? displayUrl.slice(0, -1)
            : displayUrl;

          return (
            <div
              key={faucet}
              className="p-4 border rounded-xl relative bg-secondary hover:bg-muted"
            >
              <h3 className="mb-1 text-base font-semibold capitalize">
                {displayTitle}
              </h3>
              <Link
                href={faucet}
                target="_blank"
                className="text-sm flex gap-1.5 items-center before:absolute before:inset-0 before:z-0 text-muted-foreground"
              >
                {displayUrl}
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
  explorers: NonNullable<ChainMetadataWithServices["explorers"]>;
}) {
  return (
    <div>
      <h2 className="text-base text-muted-foreground mb-2 font-medium">
        Explorers
      </h2>
      <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {props.explorers.map((explorer) => {
          return (
            <div
              key={explorer.url}
              className="p-4 border rounded-xl relative bg-secondary hover:bg-muted"
            >
              <h3 className="mb-1 text-base font-semibold capitalize">
                {explorer.name}
              </h3>
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
