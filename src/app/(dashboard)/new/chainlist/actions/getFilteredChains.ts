"use server";

import Fuse from "fuse.js";
import { getChains, type ChainSupportedService } from "../getChain";
import { THIRDWEB_API_HOST } from "../../../../../constants/urls";

async function getAllFavoriteChainIds(): Promise<number[]> {
  const res = await fetch(`${THIRDWEB_API_HOST}/v1/chains/favorites`, {
    method: "GET",
    credentials: "include",
  });
  const json = await res.json();
  const data: string[] = json.data;

  return data.map(Number);
}

export async function getFilteredChains(filters: {
  page: number;
  pageSize: number;
  searchTerm?: string;
  chainType: "all" | "mainnet" | "testnet";
  services: ChainSupportedService[];
  showDeprecated: boolean;
}) {
  let chains = await getChains();

  let favChainIds: number[] = [];
  try {
    favChainIds = await getAllFavoriteChainIds();
  } catch (e) {
    console.error(e);
    // ignore
  }

  const favChainIdSet: Set<number> = new Set(favChainIds || []);

  const fuse = new Fuse(chains, {
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

  if (filters.searchTerm) {
    chains = fuse
      .search(filters.searchTerm, {
        limit: 10,
      })
      .map((e) => e.item);
  }

  if (favChainIdSet.size) {
    // sort by favorite first
    chains = chains.sort((a, b) => {
      if (favChainIdSet.has(a.chainId) && !favChainIdSet.has(b.chainId)) {
        return -1;
      }
      if (!favChainIdSet.has(a.chainId) && favChainIdSet.has(b.chainId)) {
        return 1;
      }
      return 0;
    });
  }

  if (filters.chainType !== "all") {
    chains = chains.filter((chain) => {
      if (filters.chainType === "testnet") {
        return chain.testnet;
      }

      if (filters.chainType === "mainnet") {
        return !chain.testnet;
      }
    });
  }

  if (filters.services.length > 0) {
    chains = chains.filter((chain) => {
      // all products must be enabled
      return filters.services.every(
        (service) => chain.services.find((s) => s.service === service)?.enabled,
      );
    });
  }

  if (!filters.showDeprecated) {
    chains = chains.filter((chain) => chain.status !== "deprecated");
  }

  chains = chains.slice(
    filters.pageSize * (filters.page - 1),
    filters.pageSize * filters.page,
  );

  return chains.map((c) => {
    return {
      ...c,
      isPreferred: favChainIdSet.has(c.chainId),
    };
  });
}
