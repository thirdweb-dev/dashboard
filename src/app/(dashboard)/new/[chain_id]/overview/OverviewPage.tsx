import type { ChainMetadata } from "thirdweb/chains";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import { getChain } from "../../../utils/getChain";
import { ChainLiveStats } from "./components/ChainLiveStats";
import { PrimaryInfoItem } from "./components/PrimaryInfoItem";

export async function ChainOverviewPage(props: {
  params: { chain_id: string };
}) {
  const chain = await getChain(props.params.chain_id);
  return (
    <div className="py-3">
      <div className="max-w-[1200px]">
        <PrimaryInfoGrid chain={chain} />
      </div>
    </div>
  );
}

function PrimaryInfoGrid(props: { chain: ChainMetadata }) {
  const { chain } = props;
  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
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
