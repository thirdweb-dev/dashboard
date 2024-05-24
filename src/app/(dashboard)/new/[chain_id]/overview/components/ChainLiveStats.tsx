"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { PrimaryInfoItem } from "./PrimaryInfoItem";
import { CircleCheck, XIcon } from "lucide-react";
import { ToolTipLabel } from "@/components/ui/tooltip";
import { CopyButton } from "@/components/ui/CopyButton";
import { useChainStatswithRPC } from "./useChainStats";

export function ChainLiveStats(props: { rpc: string }) {
  const stats = useChainStatswithRPC(props.rpc);

  return (
    <>
      {/* RPC URL */}
      <PrimaryInfoItem
        title="RPC"
        titleIcon={
          stats.isSuccess ? (
            <ToolTipLabel label="Working">
              <CircleCheck className="size-4 text-success-foreground" />
            </ToolTipLabel>
          ) : stats.isError ? (
            <ToolTipLabel label="Not Working">
              <XIcon className="size-4 text-destructive-foreground" />
            </ToolTipLabel>
          ) : null
        }
      >
        <div className="flex items-center gap-1">
          <div className="text-lg">{new URL(props.rpc).origin}</div>
          <CopyButton text={new URL(props.rpc).origin} />
        </div>
      </PrimaryInfoItem>

      {/* Block Height */}
      <PrimaryInfoItem title="Block Height" titleIcon={<PulseDot />}>
        {stats.isError ? (
          <p className="text-lg fade-in-0 animate-in text-destructive-foreground">
            N/A
          </p>
        ) : stats.data ? (
          <p className="text-lg fade-in-0 animate-in">
            {stats.data.blockNumber}
          </p>
        ) : (
          <div className="flex py-1 h-[28px] w-[140px]">
            <Skeleton className="h-full w-full" />
          </div>
        )}
      </PrimaryInfoItem>

      {/* Latency */}
      <PrimaryInfoItem title="Latency" titleIcon={<PulseDot />}>
        {stats.isError ? (
          <p className="text-lg fade-in-0 animate-in text-destructive-foreground">
            N/A
          </p>
        ) : stats.data ? (
          <p className="text-lg fade-in-0 animate-in">{stats.data.latency}</p>
        ) : (
          <div className="flex py-1 h-[28px] w-[70px]">
            <Skeleton className="h-full w-full" />
          </div>
        )}
      </PrimaryInfoItem>
    </>
  );
}

function PulseDot() {
  return (
    <ToolTipLabel label={"Live Data"}>
      <span className="relative flex size-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full size-3 bg-primary"></span>
      </span>
    </ToolTipLabel>
  );
}
