import * as React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input, InputProps } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...restProps }, ref) => {
    return (
      <div className="relative">
        <Search className="absolute h-8 w-8 p-2 top-1 left-1 text-muted-foreground" />
        <Input {...restProps} className={cn(className, "px-10")} ref={ref} />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute h-8 w-8 p-2 top-1 right-1"
            >
              <Filter />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-4 mt-0.5 max-w-full">
            <h3 className="text-center text-lg font-semibold">Filters</h3>
            <section className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold text-muted-foreground">
                Chain Type
              </h4>
              <RadioGroup defaultValue="all-chains">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all-chains" id="all-chains" />
                  <Label htmlFor="all-chains">All Chains</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mainnet" id="mainnet" />
                  <Label htmlFor="mainnet">Mainnets Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="testnet" id="testnet" />
                  <Label htmlFor="testnet">Testnets Only</Label>
                </div>
              </RadioGroup>
            </section>
            <Separator />
            <section className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="gas-sponsored" />
                <Label
                  htmlFor="gas-sponsored"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Gas Sponsored
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="deprecated" />
                <Label
                  htmlFor="deprecated"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include Deprecated
                </Label>
              </div>
            </section>
            <Separator />
            <section className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold text-muted-foreground">
                Available Products
              </h4>

              <div className="flex items-center justify-between my-2">
                <Label htmlFor="all-products">Select All Products</Label>
                <Switch id="all-products" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="contracts" />
                <Label
                  htmlFor="contracts"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Contracts
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="connect" />
                <Label
                  htmlFor="connect"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Connect SDK
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="engine" />
                <Label
                  htmlFor="engine"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Engine
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="aa" />
                <Label
                  htmlFor="aa"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Account Abstraction
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pay" />
                <Label
                  htmlFor="pay"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pay
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="rpc" />
                <Label
                  htmlFor="rpc"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  RPC Edge
                </Label>
              </div>
            </section>
            <Separator />
            <Button variant="secondary">Reset to defaults</Button>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
