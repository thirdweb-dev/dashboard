"use client";

import { ChainCard } from "./chain-card";
import { useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../../../../@/components/ui/Spinner/Spinner";
import { getFilteredChains } from "../actions/getFilteredChains";

export function ChainList() {
  const { searchTerm, chainType, showDeprecated, products, page, setPage } =
    useChainListState();
  const isDesktop = useIsDesktop();
  const itemsToShowPerPage = isDesktop ? 25 : 5;

  const chainsQuery = useQuery({
    queryKey: [
      "filtered-chainlist",
      page,
      searchTerm,
      chainType,
      products,
      showDeprecated,
      itemsToShowPerPage,
    ],
    queryFn: () =>
      getFilteredChains({
        page,
        pageSize: itemsToShowPerPage,
        searchTerm,
        chainType,
        services: products,
        showDeprecated,
      }),
  });

  if (chainsQuery.isLoading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        {" "}
        <Spinner className="size-10" />{" "}
      </main>
    );
  }

  if (!chainsQuery.data) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-4xl">No Results found</p>
      </main>
    );
  }

  if (chainsQuery.data.length === 0) {
    return (
      <div className="border p-8 h-[300px] lg:h-[500px] flex justify-center items-center rounded-lg">
        <p className="text-4xl">No Results found</p>
      </div>
    );
  }

  const lastPage = Math.ceil(chainsQuery.data.length / itemsToShowPerPage);
  const showNext = page + 1 <= lastPage;
  const showPrev = page - 1 > 0;
  const showPagePlusOne = page + 1 <= lastPage;
  const showPagePlusTwo = page + 2 <= lastPage;
  const showPagination = lastPage > 1;

  let content = null;

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
            {chainsQuery.data.map((chain) => (
              <ChainRowContent
                key={chain.chainId}
                chain={chain}
                isPreferred={chain.isPreferred}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    content = (
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {chainsQuery.data.map((chain) => (
          <li key={chain.chainId} className="h-full">
            <ChainCard
              key={chain.chainId}
              chain={chain}
              isPreferred={chain.isPreferred}
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
