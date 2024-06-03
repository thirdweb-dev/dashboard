/* eslint-disable @next/next/no-img-element */
"use client";

import {
  CheckIcon,
  CircleAlertIcon,
  // FuelIcon,
  // Verified,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { StarButton } from "./star-button";
import { ToolTipLabel } from "../../../../../@/components/ui/tooltip";
import { cn } from "../../../../../@/lib/utils";
import { products } from "../products";
import type { ChainMetadataWithServices } from "../getChain";

type ChainRowProps = {
  chain: ChainMetadataWithServices;
  isPreferred: boolean;
  // isVerified: boolean;
  // isGasSponsored: boolean;
};

export const ChainRowContent: React.FC<ChainRowProps> = (props) => {
  const { chain, isPreferred } = props;
  const isDeprecated = chain.status === "deprecated";
  const supportedServicesCount = chain.services.filter((c) => c.enabled).length;
  const totalServicesCount = chain.services.length;

  return (
    <tr className="border-b relative hover:bg-secondary">
      {/* Icon + Name */}
      <TableData>
        <div className="flex flex-row items-center gap-4 w-[370px]">
          <StarButton
            chainId={chain.chainId}
            initialPreferred={isPreferred}
            className="relative z-10"
          />

          <div className="flex items-center gap-2">
            <Link
              href={`/new/${chain.slug}`}
              className="static group before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:z-0"
            >
              {chain.name}
            </Link>

            {/* {isVerified && (
              <ToolTipLabel label="Verified">
                <Verified className="text-primary-foreground size-5 z-10 " />
              </ToolTipLabel>
            )}

            {isGasSponsored && (
              <ToolTipLabel label="Gas Sponsored">
                <FuelIcon className="text-primary-foreground size-5 z-10 " />
              </ToolTipLabel>
            )} */}

            {isDeprecated && (
              <ToolTipLabel label="Deprecated">
                <CircleAlertIcon className="text-destructive-foreground size-5 z-10 " />
              </ToolTipLabel>
            )}
          </div>
        </div>
      </TableData>

      <TableData>{chain.chainId}</TableData>

      <TableData>{chain.nativeCurrency?.symbol}</TableData>

      <TableData>
        {/* TODO - use real data */}
        <div className="flex flex-row gap-14 items-center w-[520px] ">
          <span>
            {" "}
            {supportedServicesCount} out of {totalServicesCount}{" "}
          </span>
          <div className="flex items-center gap-7 z-10">
            {products.map((p) => {
              return (
                <ProductIcon
                  key={p.name}
                  icon={p.icon}
                  label={p.name}
                  href={p.href}
                  enabled={
                    chain.services.find((c) => c.service === p.id)?.enabled ??
                    false
                  }
                />
              );
            })}
          </div>
        </div>
      </TableData>
    </tr>
  );
};

function TableData({ children }: { children: React.ReactNode }) {
  return <td className="p-4">{children}</td>;
}

function ProductIcon(props: {
  icon: React.FC<{ className?: string }>;
  label: string;
  href: string;
  enabled: boolean;
}) {
  return (
    <ToolTipLabel
      label={props.label}
      rightIcon={
        props.enabled ? (
          <CheckIcon className="size-4 text-success-foreground" />
        ) : (
          <XIcon className="size-4 text-destructive-foreground" />
        )
      }
    >
      <Link href={props.href} target="_blank">
        <props.icon
          className={cn(
            "size-8 grayscale hover:grayscale-0",
            !props.enabled && "opacity-30",
          )}
        />
      </Link>
    </ToolTipLabel>
  );
}
