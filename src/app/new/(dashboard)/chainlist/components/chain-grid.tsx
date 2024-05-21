"use client";

import type { ChainMetadata } from "thirdweb/chains";
import { ChainCard } from "./chain-card";
import { useShowMore } from "../../../../../hooks/useShowMore";

export function ChainGrid(props: { chains: ChainMetadata[] }) {
  const { itemsToShow, lastItemRef } = useShowMore<HTMLLIElement>(15, 9);
  const resultsToShow = props.chains.slice(0, itemsToShow);

  return (
    <ul className="grid gap-5 items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {resultsToShow.map((chain, i) => (
        <li
          key={chain.chainId}
          ref={i === resultsToShow.length - 1 ? lastItemRef : undefined}
        >
          <ChainCard
            key={chain.chainId}
            chain={chain}
            isPreferred={chain.chainId === 1}
            isVerified={chain.chainId === 1}
          />
        </li>
      ))}
    </ul>
  );
}
