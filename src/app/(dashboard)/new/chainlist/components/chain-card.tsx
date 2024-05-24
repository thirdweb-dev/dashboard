/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FuelIcon, Verified } from "lucide-react";
import { ChainMetadata } from "thirdweb/chains";
import Link from "next/link";
import { StarButton } from "./star-button";

type ChainCardProps = {
  chain: ChainMetadata;
  isPreferred: boolean;
  isVerified: boolean;
  isGasSponsored: boolean;
};

export const ChainCard: React.FC<ChainCardProps> = ({
  chain,
  isPreferred: initialPreferred,
  isVerified,
  isGasSponsored,
}) => {
  return (
    <div className="relative h-full">
      <Card className="h-full w-full hover:border-ring">
        <CardHeader className="flex flex-row justify-between justify-items-center p-4">
          <div className="flex flex-row items-center gap-2.5">
            <Link
              className="static group before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:z-0"
              href={`/new/${chain.slug}`}
            >
              <CardTitle className="text-xl">{chain.name}</CardTitle>
            </Link>
          </div>

          <StarButton
            chainId={chain.chainId}
            initialPreferred={initialPreferred}
          />
        </CardHeader>

        <CardContent className="pt-0 px-4 pb-4">
          {/* table of `chain id` `native token` `managed support`, header row on left value row on right */}
          <table className="w-full">
            <tbody className="[&_td]:py-0.5 text-sm">
              <tr>
                <th className="text-left font-semibold text-muted-foreground">
                  Chain ID
                </th>
                <td>{chain.chainId}</td>
              </tr>
              <tr>
                <th className="text-left font-semibold text-muted-foreground">
                  Native Token
                </th>
                <td>{chain.nativeCurrency?.symbol}</td>
              </tr>
              <tr>
                <th className="text-left font-semibold text-muted-foreground">
                  Available Products
                </th>

                {/* TODO - use real data */}
                <td>
                  <span> 5 / 6 </span>
                </td>
              </tr>
            </tbody>
          </table>

          {(isVerified || isGasSponsored) && (
            <div className="mt-4 flex gap-5">
              {isVerified && (
                <div className="gap-1.5 flex items-center">
                  <Verified className="text-primary-foreground size-5" />
                  <p className="text-sm">Verified</p>
                </div>
              )}

              {isGasSponsored && (
                <div className="gap-1.5 flex items-center">
                  <FuelIcon className="text-primary-foreground size-5" />
                  <p className="text-sm">Gas Sponsored</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
