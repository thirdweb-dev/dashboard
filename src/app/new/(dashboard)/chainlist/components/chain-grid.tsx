"use client";

import type { ChainMetadata } from "thirdweb/chains";
import { ChainCard } from "./chain-card";
import { useShowMore } from "../../../../../hooks/useShowMore";
import Fuse from "fuse.js";
import { useMemo } from "react";
import { useDebounce } from "../../../../../hooks/common/useDebounce";
import { useChainListState } from "./state-provider";

export function ChainGrid(props: { chains: ChainMetadata[] }) {
  const { itemsToShow, lastItemRef } = useShowMore<HTMLLIElement>(15, 9);
  const { searchTerm, chainType, showDeprecated } = useChainListState();

  const fuse = useMemo(() => {
    return new Fuse(props.chains, {
      keys: [
        {
          name: "name",
          weight: 2,
        },
        {
          name: "chainId",
          weight: 1,
        },
      ],
      threshold: 0.2,
    });
  }, [props.chains]);

  const deferredSearchTerm = useDebounce(searchTerm, 200);

  const filteredChains = useMemo(() => {
    let result = props.chains;

    if (deferredSearchTerm) {
      result = fuse
        .search(deferredSearchTerm, {
          limit: 10,
        })
        .map((e) => e.item);
    }

    if (chainType !== "all") {
      result = result.filter((chain) => {
        if (chainType === "testnet") {
          return chain.testnet;
        }

        if (chainType === "mainnet") {
          return !chain.testnet;
        }
      });
    }

    if (!showDeprecated) {
      result = result.filter((chain) => chain.status !== "deprecated");
    }

    return result;
  }, [props.chains, deferredSearchTerm, fuse, chainType, showDeprecated]);

  const resultsToShow = filteredChains.slice(0, itemsToShow);

  if (resultsToShow.length === 0) {
    return (
      <div className="border p-8 h-[300px] lg:h-[500px] flex justify-center items-center rounded-lg">
        <p className="text-4xl">No Results found</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-5 items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {resultsToShow.map((chain, i) => (
        <li
          key={chain.chainId}
          ref={i === resultsToShow.length - 1 ? lastItemRef : undefined}
          className="h-full"
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
