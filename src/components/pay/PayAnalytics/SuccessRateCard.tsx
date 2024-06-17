import { useState } from "react";
import { CardHeading, LoadingGraph, NoDataAvailable } from "./common";
import { usePayVolume, type PayVolumeData } from "./hooks/usePayVolume";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

/* eslint-disable react/forbid-dom-props */
export function SuccessRateCard(props: {
  clientId: string;
  from: Date;
  to: Date;
}) {
  const [type, setType] = useState<"all" | "crypto" | "fiat">("all");
  const volumeQuery = usePayVolume({
    clientId: props.clientId,
    from: props.from,
    to: props.to,
    intervalType: "day",
  });

  return (
    <div className="w-full relative flex flex-col">
      <div className="flex justify-between gap-2 items-center">
        <CardHeading> Payments </CardHeading>
        {volumeQuery.data && (
          <Select
            value={type}
            onValueChange={(value: "all" | "crypto" | "fiat") => {
              setType(value);
            }}
          >
            <SelectTrigger className="bg-transparent w-auto">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="all">Total</SelectItem>
              <SelectItem value="crypto">Crypto</SelectItem>
              <SelectItem value="fiat">Fiat</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {volumeQuery.isLoading ? (
          <LoadingGraph />
        ) : volumeQuery.data ? (
          <RenderData data={volumeQuery.data} type={type} />
        ) : (
          <NoDataAvailable />
        )}
      </div>
    </div>
  );
}

function RenderData(props: {
  data: PayVolumeData;
  type: "all" | "crypto" | "fiat";
}) {
  type Data = {
    succeeded: number;
    failed: number;
    rate: number;
    total: number;
  };

  function getData(tab: "all" | "crypto" | "fiat"): Data {
    const aggregated = props.data.aggregate;

    if (tab === "all") {
      const succeeded = aggregated.sum.succeeded.count;
      const failed = aggregated.sum.failed.count;
      const total = succeeded + failed;
      const rate = (succeeded / (succeeded + failed)) * 100;
      return { succeeded, failed, rate, total };
    }

    if (tab === "crypto") {
      const succeeded = aggregated.buyWithCrypto.succeeded.count;
      const failed = aggregated.buyWithCrypto.failed.count;
      const total = succeeded + failed;
      const rate = (succeeded / (succeeded + failed)) * 100;
      return { succeeded, failed, rate, total };
    }

    if (tab === "fiat") {
      const succeeded = aggregated.buyWithFiat.succeeded.count;
      const failed = aggregated.buyWithFiat.failed.count;
      const total = succeeded + failed;
      const rate = (succeeded / (succeeded + failed)) * 100;
      return { succeeded, failed, rate, total };
    }

    throw new Error("Invalid tab");
  }

  const data = getData(props.type);

  return (
    <div>
      {data.total === 0 ? (
        <NoDataAvailable />
      ) : (
        <>
          <div className="h-10" />
          <Bar rate={data.rate} />
          <div className="h-6" />
          <InfoRow label="Succeeded" type="success" amount={data.succeeded} />
          <div className="h-3" />
          <InfoRow label="Failed" type="failure" amount={data.failed} />
        </>
      )}
    </div>
  );
}

function Bar(props: { rate: number }) {
  return (
    <div className="flex items-center">
      <div
        className="h-5 bg-success-foreground transition-all rounded-lg rounded-r-none border-r-0"
        style={{
          width: `${props.rate}%`,
        }}
      />
      <div className="h-5 bg-destructive-foreground flex-1 transition-all rounded-lg rounded-l-none border-l-0" />
    </div>
  );
}

function InfoRow(props: {
  label: string;
  type: "success" | "failure";
  amount: number;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <div
          className={`size-5 rounded-lg ${
            props.type === "success"
              ? "bg-success-foreground"
              : "bg-destructive-foreground"
          }`}
        />
        <p className="text-base text-secondary-foreground">{props.label}</p>
      </div>
      <p className="text-base font-medium">
        {props.amount.toLocaleString("en-US", {
          currency: "USD",
          style: "currency",
        })}
      </p>
    </div>
  );
}
