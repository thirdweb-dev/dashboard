"use client";

import { ChainCard } from "./chain-card";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../../../hooks/common/useDebounce";
import { useChainListState } from "./state-provider";
import { ChainRowContent } from "./chain-row";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { ChainMetadataWithServices } from "../getChain";
import { useQuery } from "@tanstack/react-query";
import { getAllFavoriteChainIds } from "./favorites";
import { Spinner } from "../../../../../@/components/ui/Spinner/Spinner";

export function ChainList(props: { chains: ChainMetadataWithServices[] }) {
  const { searchTerm, chainType, showDeprecated, products, gasSponsored } =
    useChainListState();
  const isDesktop = useIsDesktop();
  const favChainIdsQuery = useQuery({
    queryKey: ["favChainIds"],
    queryFn: getAllFavoriteChainIds,
    refetchOnWindowFocus: false,
  });

  const favChainIdSet = useMemo(
    () => new Set(favChainIdsQuery.data || []),
    [favChainIdsQuery.data],
  );

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

    if (favChainIdSet.size) {
      // sort by favorite first
      result = result.sort((a, b) => {
        if (favChainIdSet.has(a.chainId) && !favChainIdSet.has(b.chainId)) {
          return -1;
        }
        if (!favChainIdSet.has(a.chainId) && favChainIdSet.has(b.chainId)) {
          return 1;
        }
        return 0;
      });
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

    if (products.length > 0) {
      result = result.filter((chain) => {
        // all products must be enabled
        return products.every(
          (product) =>
            chain.services.find((s) => s.service === product)?.enabled,
        );
      });
    }

    if (!showDeprecated) {
      result = result.filter((chain) => chain.status !== "deprecated");
    }

    return result;
  }, [
    props.chains,
    deferredSearchTerm,
    fuse,
    chainType,
    showDeprecated,
    products,
    favChainIdSet,
  ]);

  const itemsToShowPerPage = isDesktop ? 25 : 5;
  const [page, setPage] = useState(1);

  const resultsToShow = filteredChains.slice(
    itemsToShowPerPage * (page - 1),
    itemsToShowPerPage * page,
  );

  const lastPage = Math.ceil(filteredChains.length / itemsToShowPerPage);
  const showNext = page + 1 <= lastPage;
  const showPrev = page - 1 > 0;
  const showPagePlusOne = page + 1 <= lastPage;
  const showPagePlusTwo = page + 2 <= lastPage;
  const showPagination = lastPage > 1;

  // when filters change, reset to first page
  useEffect(() => {
    setPage(1);
  }, [searchTerm, chainType, showDeprecated, products, gasSponsored]);

  if (resultsToShow.length === 0) {
    return (
      <div className="border p-8 h-[300px] lg:h-[500px] flex justify-center items-center rounded-lg">
        <p className="text-4xl">No Results found</p>
      </div>
    );
  }

  let content = null;

  if (favChainIdsQuery.isLoading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        {" "}
        <Spinner className="size-10" />{" "}
      </main>
    );
  }

  if (isDesktop) {
    content = (
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            <tr className="rounded-lg border-b">
              <TableHeading> Name </TableHeading>
              <TableHeading> Chain ID </TableHeading>
              <TableHeading> Native Token </TableHeading>
              <TableHeading> Enabled Services </TableHeading>
            </tr>
            {resultsToShow.map((chain) => (
              <ChainRowContent
                key={chain.chainId}
                chain={chain}
                isPreferred={favChainIdSet.has(chain.chainId)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    content = (
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {resultsToShow.map((chain) => (
          <li key={chain.chainId} className="h-full">
            <ChainCard
              key={chain.chainId}
              chain={chain}
              isPreferred={favChainIdSet.has(chain.chainId)}
            />
          </li>
        ))}
      </ul>
    );
  }

  function scrollToTop() {
    // smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main>
      {content}

      <div className="h-10"></div>

      {showPagination && (
        <Pagination>
          <PaginationContent>
            {/* Prev */}
            <PaginationItem>
              <PaginationPrevious
                disabled={!showPrev}
                onClick={() => {
                  setPage(page - 1);
                  scrollToTop();
                }}
              />
            </PaginationItem>

            {/* Current Page */}
            <PaginationItem>
              <PaginationLink isActive>{page}</PaginationLink>
            </PaginationItem>

            {/* Current Page + 1 */}
            {showPagePlusOne && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    setPage(page + 1);
                    scrollToTop();
                  }}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Current Page + 2 */}
            {showPagePlusTwo && (
              <>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => {
                      setPage(page + 2);
                      scrollToTop();
                    }}
                  >
                    {page + 2}
                  </PaginationLink>
                </PaginationItem>

                {/* ... */}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}
            {/* Next */}
            <PaginationItem>
              <PaginationNext
                disabled={!showNext}
                onClick={() => {
                  setPage(page + 1);
                  scrollToTop();
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
}

function TableHeading(props: { children: React.ReactNode }) {
  return (
    <th className="text-left p-4 font-medium text-muted-foreground min-w-[150px]">
      {props.children}
    </th>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }
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
