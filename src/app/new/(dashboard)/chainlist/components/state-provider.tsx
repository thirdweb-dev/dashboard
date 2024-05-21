"use client";

import {
  useQueryState,
  parseAsStringEnum,
  parseAsBoolean,
  parseAsArrayOf,
} from "nuqs";
import { createContext, useContext } from "react";

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
  // Defaults
  const defaultActiveMode = "grid" as Mode;
  const defaultChainType = "all" as ChainType;
  const defaultGasSponsored = false;
  const defaultShowDeprecated = true;
  const defaultProducts = allProductNames;

  const [activeMode, setActiveMode] = useQueryState(
    "mode",
    parseAsStringEnum(["list", "grid"]).withDefault(defaultActiveMode),
  );

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

  function setShowDeprecated(value: boolean | null) {
    if (value === defaultShowDeprecated) {
      _setShowDeprecated(null);
    } else {
      _setShowDeprecated(value);
    }
  }

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
      const newProducts = [...products, product];
      setProducts(newProducts);
      if (newProducts.length === allProductNames.length) {
        setProducts(null);
      }
    }
  }

  const showAllProducts = products.length === allProductNames.length;

  function selectAllProducts() {
    setProducts(null);
  }

  const gasSponsored =
    _gasSponsored === null ? defaultGasSponsored : _gasSponsored;
  const showDeprecated =
    _showDeprecated === null ? defaultShowDeprecated : _showDeprecated;

  function reset() {
    setActiveMode(null);
    setChainType(null);
    setGasSponsored(null);
    setShowDeprecated(null);
    setProducts(null);
  }

  return (
    <ChainListStateCtx.Provider
      value={{
        mode: activeMode,
        setMode: setActiveMode,
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
