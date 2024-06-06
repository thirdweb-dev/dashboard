"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useChainListState } from "./state-provider";
import type { ChainSupportedService } from "../getChain";

export function ChainListFilters() {
  const {
    chainType,
    setChainType,
    // setGasSponsored,
    // gasSponsored,
    showDeprecated,
    setShowDeprecated,
    showAllProducts,
    selectAllProducts,
    setProducts,
    reset,
    searchTerm,
    setSearchTerm,
    setPage,
  } = useChainListState();

  function resetPagination() {
    setPage(1);
  }

  return (
    <div className="flex items-stretch gap-3">
      {/* Search Input */}
      <div className="relative w-full lg:w-[350px] ">
        <Search className="absolute size-5 top-[50%] -translate-y-1/2 left-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or chain ID"
          className={"pl-12 h-auto py-3 text-base bg-secondary rounded-lg"}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            resetPagination();
          }}
        />
      </div>

      {/* Filter Button */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="px-3 w-auto h-auto bg-secondary hover:bg-muted"
          >
            <Filter className="size-5 text-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          sideOffset={20}
          className="flex flex-col gap-4 mt-0.5 max-w-full"
        >
          <h3 className="text-lg font-semibold">Filters</h3>

          {/* Chain Type */}
          <section className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-secondary-foreground">
              Chain Type
            </h4>
            <RadioGroup value={chainType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="all"
                  id="all"
                  onClick={() => {
                    setChainType("all");
                    resetPagination();
                  }}
                />
                <Label htmlFor="all">All Chains</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="mainnet"
                  id="mainnet"
                  onClick={() => {
                    setChainType("mainnet");
                    resetPagination();
                  }}
                />
                <Label htmlFor="mainnet">Mainnets Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="testnet"
                  id="testnet"
                  onClick={() => {
                    setChainType("testnet");
                    resetPagination();
                  }}
                />
                <Label htmlFor="testnet">Testnets Only</Label>
              </div>
            </RadioGroup>
          </section>

          <Separator />

          {/* Other Options */}
          <section className="flex flex-col gap-2">
            {/* <div className="flex items-center space-x-2">
              <Checkbox
                id="gas-sponsored"
                checked={gasSponsored}
                onClick={() => {
                  setGasSponsored(!gasSponsored);
                }}
              />
              <Label
                htmlFor="gas-sponsored"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Gas Sponsored
              </Label>
            </div> */}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="deprecated"
                checked={showDeprecated}
                onClick={() => {
                  setShowDeprecated(!showDeprecated);
                  resetPagination();
                }}
              />
              <Label
                htmlFor="deprecated"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include Deprecated
              </Label>
            </div>
          </section>

          <Separator />

          {/* Products */}
          <section className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold text-muted-foreground">
              Available Services
            </h4>

            <div className="flex items-center justify-between my-2">
              <Label htmlFor="all-products">Select All Services</Label>
              <Switch
                id="all-products"
                checked={showAllProducts}
                onClick={() => {
                  if (!showAllProducts) {
                    selectAllProducts();
                  } else {
                    setProducts([]);
                  }
                  resetPagination();
                }}
              />
            </div>

            <ProductCard label="Contracts" id="contracts" />
            <ProductCard label="Connect SDK" id="connect-sdk" />
            <ProductCard label="Engine" id="engine" />
            <ProductCard label="Account Abstraction" id="account-abstraction" />
            <ProductCard label="Pay" id="pay" />
            <ProductCard label="RPC Edge" id="rpc-edge" />
          </section>

          <Separator />

          {/* Reset */}
          <Button variant="default" className="font-semibold" onClick={reset}>
            Reset to defaults
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function ProductCard(props: { label: string; id: ChainSupportedService }) {
  const { products, toggleProduct } = useChainListState();
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={props.id}
        checked={products.includes(props.id)}
        onClick={() => toggleProduct(props.id)}
      />
      <Label
        htmlFor={props.id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {props.label}
      </Label>
    </div>
  );
}
