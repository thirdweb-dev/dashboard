import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import { type ChainMetadataWithServices } from "../../chainlist/getChain";
import { PrimaryInfoItem } from "./components/PrimaryInfoItem";

export async function ChainOverview(props: {
  chain: ChainMetadataWithServices;
}) {
  const { chain } = props;
  return (
    <div className="flex flex-col gap-10 pt-2">
      <PrimaryInfoGrid chain={chain} />
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
