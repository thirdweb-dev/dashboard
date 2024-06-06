"use client";

import {
  useQueryState,
  parseAsStringEnum,
  parseAsBoolean,
  parseAsArrayOf,
  parseAsInteger,
} from "nuqs";
import { createContext, useCallback, useContext } from "react";
import type { ChainSupportedService } from "../getChain";

type ChainType = "all" | "mainnet" | "testnet";

type ChainListState = {
  chainType: ChainType;
  setChainType: (chainType: ChainType) => void;
  gasSponsored: boolean;
  setGasSponsored: (gasSponsored: boolean) => void;
  showDeprecated: boolean;
  setShowDeprecated: (showDeprecated: boolean) => void;
  products: ChainSupportedService[];
  setProducts: (products: ChainSupportedService[]) => void;
  showAllProducts: boolean;
  selectAllProducts: () => void;
  toggleProduct: (product: ChainSupportedService) => void;
  reset: () => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  page: number;
  setPage: (page: number) => void;
};

export const ChainListStateCtx = createContext<ChainListState | null>(null);

const allProductNames: ChainSupportedService[] = [
  "contracts",
  "connect-sdk",
  "engine",
  "account-abstraction",
  "pay",
  "rpc-edge",
];

export function ChainListStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defaults
  const defaultChainType = "all" as ChainType;
  const defaultGasSponsored = false;
  const defaultShowDeprecated = true;
  const defaultProducts: ChainSupportedService[] = [];

  const [chainType, _setChainType] = useQueryState(
    "chainType",
    parseAsStringEnum(["all", "mainnet", "testnet"]).withDefault(
      defaultChainType,
    ),
  );

  function setChainType(value: ChainType | null) {
    if (value === defaultChainType) {
      _setChainType(null);
    } else {
      _setChainType(value);
    }
  }

  const [_gasSponsored, _setGasSponsored] = useQueryState(
    "gasSponsored",
    parseAsBoolean,
  );

  function setGasSponsored(value: boolean | null) {
    if (value === defaultGasSponsored) {
      _setGasSponsored(null);
    } else {
      _setGasSponsored(value);
    }
  }

  const [searchTerm, setSearchTerm] = useQueryState("search");

  const [_showDeprecated, _setShowDeprecated] = useQueryState(
    "showDeprecated",
    parseAsBoolean,
  );

  const [page, _setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const setPage = useCallback(
    (value: number | null) => {
      if (value === 1) {
        _setPage(null);
      } else {
        _setPage(value);
      }
    },
    [_setPage],
  );

  function setShowDeprecated(value: boolean | null) {
    if (value === defaultShowDeprecated) {
      _setShowDeprecated(null);
    } else {
      _setShowDeprecated(value);
    }
  }

  const [products, setProducts] = useQueryState(
    "products",
    parseAsArrayOf(
      parseAsStringEnum<ChainSupportedService>(allProductNames),
    ).withDefault(defaultProducts),
  );

  function toggleProduct(product: ChainSupportedService) {
    if (products.includes(product)) {
      setProducts(products.filter((p) => p !== product));
    } else {
      const newProducts = [...products, product];
      setProducts(newProducts);
      if (newProducts.length === allProductNames.length) {
        setProducts(null);
      }
    }
  }

  const showAllProducts = products.length === allProductNames.length;

  function selectAllProducts() {
    setProducts(allProductNames);
  }

  const gasSponsored =
    _gasSponsored === null ? defaultGasSponsored : _gasSponsored;
  const showDeprecated =
    _showDeprecated === null ? defaultShowDeprecated : _showDeprecated;

  function reset() {
    setChainType(null);
    setGasSponsored(null);
    setShowDeprecated(null);
    setProducts(null);
    setPage(null);
  }

  return (
    <ChainListStateCtx.Provider
      value={{
        chainType,
        setChainType,
        gasSponsored,
        setGasSponsored,
        showDeprecated,
        setShowDeprecated,
        products,
        setProducts,
        showAllProducts,
        selectAllProducts,
        toggleProduct,
        reset,
        searchTerm: searchTerm ?? "",
        setSearchTerm,
        page,
        setPage,
      }}
    >
      {children}
    </ChainListStateCtx.Provider>
  );
}

export function useChainListState() {
  const ctx = useContext(ChainListStateCtx);

  if (!ctx) {
    throw new Error(
      "useChainListState must be used within a ChainListStateProvider",
    );
  }

  return ctx;
}
