/* eslint-disable @next/next/no-img-element */
"use client";

import { CheckIcon, FuelIcon, Verified, XIcon } from "lucide-react";
import { ChainMetadata } from "thirdweb/chains";
import Link from "next/link";
import { StarButton } from "./star-button";
import { ToolTipLabel } from "../../../../../@/components/ui/tooltip";
import { ContractIcon } from "./icons/ContractIcon";
import { PayIcon } from "./icons/PayIcon";
import { EngineIcon } from "./icons/EngineIcon";
import { RPCIcon } from "./icons/RPCIcon";
import { SmartAccountIcon } from "./icons/SmartAccountIcon";
import { ConnectSDKIcon } from "./icons/ConnectSDKIcon";
import { cn } from "../../../../../@/lib/utils";

type ChainRowProps = {
  chain: ChainMetadata;
  isPreferred: boolean;
  isVerified: boolean;
  isGasSponsored: boolean;
};

export const ChainRowContent: React.FC<ChainRowProps> = (props) => {
  const { chain, isPreferred, isVerified, isGasSponsored } = props;

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

          <div className="flex items-center gap-3">
            <Link
              href={`/new/${chain.slug}`}
              className="static group before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:z-0"
            >
              {chain.name}
            </Link>

            {isVerified && (
              <ToolTipLabel label="Verified">
                <Verified className="text-primary size-5 z-10" />
              </ToolTipLabel>
            )}

            {isGasSponsored && (
              <ToolTipLabel label="Gas Sponsored">
                <FuelIcon className="text-primary size-5 block z-10" />
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
          <span> 5 out of 6 </span>
          <div className="flex items-center gap-7 z-10">
            <ProductIcon
              icon={ConnectSDKIcon}
              label="Connect SDK"
              href="/connect"
              enabled={true}
            />

            <ProductIcon
              icon={ContractIcon}
              label="Contracts"
              href="/contracts"
              enabled={true}
            />

            <ProductIcon
              icon={PayIcon}
              label="thirdweb Pay"
              href="https://portal.thirdweb.com/connect/pay/overview"
              enabled={true}
            />

            <ProductIcon
              icon={EngineIcon}
              label="Engine"
              href="/engine"
              enabled={true}
            />

            <ProductIcon
              icon={RPCIcon}
              label="RPC Edge"
              href="https://portal.thirdweb.com/infrastructure/rpc-edge/overview"
              enabled={true}
            />

            <ProductIcon
              icon={SmartAccountIcon}
              label="Account Abstraction"
              href="https://portal.thirdweb.com/connect/account-abstraction"
              enabled={false}
            />
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
          <CheckIcon className="size-4 text-green-600" />
        ) : (
          <XIcon className="size-4 text-red-600" />
        )
      }
    >
      <Link
        href={props.href}
        target={props.href.startsWith("https") ? "_blank" : undefined}
      >
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
