"use client";

import {
  useQueryState,
  parseAsStringEnum,
  parseAsBoolean,
  parseAsArrayOf,
} from "nuqs";
import { createContext, useContext, useState } from "react";

type Mode = "grid" | "list";
type ChainType = "all" | "mainnet" | "testnet";
type Product =
  | "contract"
  | "connect-sdk"
  | "engine"
  | "aa"
  | "pay"
  | "rpc-edge";

type ChainListState = {
  mode: Mode;
  setMode: (mode: Mode) => void;
  chainType: ChainType;
  setChainType: (chainType: ChainType) => void;
  gasSponsored: boolean;
  setGasSponsored: (gasSponsored: boolean) => void;
  showDeprecated: boolean;
  setShowDeprecated: (showDeprecated: boolean) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  showAllProducts: boolean;
  selectAllProducts: () => void;
  toggleProduct: (product: Product) => void;
  reset: () => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

export const ChainListStateCtx = createContext<ChainListState | null>(null);

const allProductNames: Product[] = [
  "contract",
  "connect-sdk",
  "engine",
  "aa",
  "pay",
  "rpc-edge",
];

export function ChainListStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultActiveMode = "grid" as Mode;
  const defaultChainType = "all" as ChainType;
  const defaultGasSponsored = false;
  const defaultShowDeprecated = false;
  const defaultProducts = allProductNames;

  const [activeMode, setActiveMode] = useQueryState(
    "mode",
    parseAsStringEnum(["list", "grid"]).withDefault(defaultActiveMode),
  );

  const [chainType, setChainType] = useQueryState(
    "chainType",
    parseAsStringEnum(["all", "mainnet", "testnet"]).withDefault(
      defaultChainType,
    ),
  );

  const [_gasSponsored, setGasSponsored] = useQueryState(
    "gasSponsored",
    parseAsBoolean,
  );

  const [searchTerm, setSearchTerm] = useQueryState("search");

  const [_showDeprecated, setShowDeprecated] = useQueryState(
    "showDeprecated",
    parseAsBoolean,
  );

  const [products, setProducts] = useQueryState(
    "products",
    parseAsArrayOf(parseAsStringEnum<Product>(allProductNames)).withDefault(
      defaultProducts,
    ),
  );

  function toggleProduct(product: Product) {
    if (products.includes(product)) {
      setProducts(products.filter((p) => p !== product));
    } else {
      setProducts([...products, product]);
    }
  }

  const showAllProducts = products.length === allProductNames.length;

  function selectAllProducts() {
    setProducts([...allProductNames]);
  }

  const gasSponsored =
    _gasSponsored === null ? defaultGasSponsored : _gasSponsored;
  const showDeprecated =
    _showDeprecated === null ? defaultShowDeprecated : _showDeprecated;

  function reset() {
    setActiveMode(defaultActiveMode);
    setChainType(defaultChainType);
    setGasSponsored(defaultGasSponsored);
    setShowDeprecated(defaultShowDeprecated);
    setProducts(defaultProducts);
  }

  return (
    <ChainListStateCtx.Provider
      value={{
        mode: activeMode,
        setMode: setActiveMode,
        chainType,
        setChainType,
        gasSponsored: gasSponsored,
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
