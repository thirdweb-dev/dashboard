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
      <PrimaryInfoGrid chain={chain} />
      <Separator className="my-8" />
      <EnabledServices />
      <Separator className="my-8" />
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
        <h2 className="text-lg text-muted-foreground">Enabled Services</h2>
        <span className="text-lg"> 5/6 </span>
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
