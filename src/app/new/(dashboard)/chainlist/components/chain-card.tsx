"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Star, Verified } from "lucide-react";
import { ChainMetadata } from "thirdweb/chains";
import { resolveScheme } from "thirdweb/storage";
import Image from "next/image";
import { thirdwebClient } from "@/constants/client";
import Link from "next/link";
import { useState } from "react";

type ChainCardProps = {
  chain: ChainMetadata;
  isPreferred: boolean;
  isVerified: boolean;
};

export const ChainCard: React.FC<ChainCardProps> = ({
  chain,
  isPreferred: initialPreferred,
  isVerified,
}) => {
  const [isPreferred, setIsPreferred] = useState(initialPreferred);
  return (
    <div className="relative">
      <Card className="h-full w-full">
        <CardHeader className="flex flex-row justify-between items-center space-y-0 space-x-4">
          <div className="flex flex-row items-center gap-2">
            {chain.icon?.url ? (
              <Image
                alt=""
                src={resolveScheme({
                  client: thirdwebClient,
                  uri: chain.icon.url,
                })}
                width={chain.icon.width}
                height={chain.icon.height}
                className="w-8 h-8"
              />
            ) : (
              <Image
                alt=""
                src={resolveScheme({
                  client: thirdwebClient,
                  uri: "ipfs://bafybeicuktp3vc72orffdxuqlqfdekkmif7fjjq2gjnqaot3ku5p4bkz4q/globe.svg",
                })}
                width={40}
                height={40}
                className="w-8 h-8"
              />
            )}

            <Link
              className="static group before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:z-0"
              href={`/new/${chain.slug}`}
            >
              <CardTitle className="underline-offset-4 group-hover:underline">
                {chain.name}
              </CardTitle>
            </Link>
            {isVerified && (
              <Verified strokeWidth={1.5} className="text-primary w-5 h-5" />
            )}
          </div>
          <Button
            className="relative z-10"
            variant="ghost"
            size="icon"
            aria-label={
              isPreferred
                ? `Remove ${chain.name} from preferred chains.`
                : `Add ${chain.name} to preferred chains.`
            }
            onClick={() => setIsPreferred((prev) => !prev)}
          >
            <Star
              className="text-muted-foreground transition-all"
              fill={isPreferred ? "rgba(218, 142, 71, 1)" : "transparent"}
              strokeWidth={1}
              stroke={isPreferred ? "rgba(218, 142, 71, 1)" : "currentColor"}
            />
          </Button>
        </CardHeader>
        <CardContent>
          {/* table of `chain id` `native token` `managed support`, header row on left value row on right */}
          <table className="w-full">
            <tbody>
              <tr>
                <th className="text-left font-normal text-muted-foreground">
                  Chain ID
                </th>
                <td>{chain.chainId}</td>
              </tr>
              <tr>
                <th className="text-left font-normal text-muted-foreground">
                  Native Token
                </th>
                <td>{chain.nativeCurrency?.symbol}</td>
              </tr>
              <tr>
                <th className="text-left font-normal text-muted-foreground">
                  Enabled Services
                </th>
                <td>
                  <div className="flex flex-row gap-2 items-center">
                    <span>5 / 6</span>
                    <Button
                      aria-label="Show enabled services details"
                      variant="link"
                      size="icon"
                      className="h-6 w-6 z-10"
                    >
                      <Info size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
