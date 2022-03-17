// this file just merges a bunch of contexts together
import React from "react";
import { AppContextProvider } from "./sdk/modules/app-context";
import { MarketContextProvider } from "./sdk/modules/market-context";
import { NFTContextProvider } from "./sdk/modules/nft-context";
import { PackContextProvider } from "./sdk/modules/pack-context";
import { CollectionContextProvider } from "./sdk/modules/collection-context";
import { CurrencyContextProvider } from "./sdk/modules/currency-context";
import { SDKProvider } from "./sdk/sdk-context";

// IMPORTANT - the order MATTERS
// 1 SDK has to come first
// 2 contract has to come second
// 3 app has to come third
// 4 modules can come after in any order
export const NFTLabsContext: React.FC = ({ children }) => {
  return (
    <SDKProvider>
      <AppContextProvider>
        <NFTContextProvider>
          <PackContextProvider>
            <CollectionContextProvider>
              <CurrencyContextProvider>
                <MarketContextProvider>{children}</MarketContextProvider>
              </CurrencyContextProvider>
            </CollectionContextProvider>
          </PackContextProvider>
        </NFTContextProvider>
      </AppContextProvider>
    </SDKProvider>
  );
};
