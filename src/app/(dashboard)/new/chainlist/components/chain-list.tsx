"use client";

import type { ChainMetadata } from "thirdweb/chains";
import { ChainCard } from "./chain-card";
import { useShowMore } from "../../../../../hooks/useShowMore";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../../../hooks/common/useDebounce";
import { useChainListState } from "./state-provider";
import { ChainRowContent } from "./chain-row";

export function ChainList(props: { chains: ChainMetadata[] }) {
  const { itemsToShow, lastItemRef } = useShowMore<HTMLElement | null>(15, 9);
  const { searchTerm, chainType, showDeprecated, mode } = useChainListState();
  const isDesktop = useIsDesktop();

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

  if (isDesktop) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            <tr className="rounded-lg border-b">
              <TableHeading> Name </TableHeading>
              <TableHeading> Chain ID </TableHeading>
              <TableHeading> Native Token </TableHeading>
              <TableHeading> Enabled Services </TableHeading>
            </tr>
            {resultsToShow.map((chain, i) => (
              <tr
                key={chain.chainId}
                ref={i === resultsToShow.length - 1 ? lastItemRef : undefined}
                className="border-b"
              >
                <ChainRowContent
                  key={chain.chainId}
                  chain={chain}
                  // TODO - use real data
                  isPreferred={chain.chainId === 1}
                  // TODO - use real data
                  isVerified={chain.chainId === 1}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <ul className="grid gap-5 grid-cols-1 md:grid-cols-2">
      {resultsToShow.map((chain, i) => (
        <li
          key={chain.chainId}
          ref={i === resultsToShow.length - 1 ? lastItemRef : undefined}
          className="h-full"
        >
          <ChainCard
            key={chain.chainId}
            chain={chain}
            // TODO - use real data
            isPreferred={chain.chainId === 1}
            // TODO - use real data
            isVerified={chain.chainId === 1}
          />
        </li>
      ))}
    </ul>
  );
}

function TableHeading(props: { children: React.ReactNode }) {
  return (
    <th className="text-left p-4 font-semibold text-muted-foreground tracking-wider min-w-[150px]">
      {props.children}
    </th>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 1200px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1200px)");
    const listener = () => setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  });

  return isDesktop;
}
