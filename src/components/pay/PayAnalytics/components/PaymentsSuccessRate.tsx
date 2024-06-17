import { useState } from "react";
import { CardHeading, NoDataAvailable } from "./common";
import { usePayVolume } from "../hooks/usePayVolume";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SkeletonContainer } from "../../../../@/components/ui/skeleton";

type UIData = {
  succeeded: number;
  failed: number;
  rate: number;
  total: number;
};

/* eslint-disable react/forbid-dom-props */
export function PaymentsSuccessRate(props: {
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

  function getUIData(): {
    data?: UIData;
    isError?: boolean;
    isLoading?: boolean;
  } {
    if (volumeQuery.isLoading) {
      return { isLoading: true };
    }

    if (volumeQuery.isError) {
      return { isError: true };
    }

    const aggregated = volumeQuery.data.aggregate;
    let data: UIData;

    if (type === "all") {
      const succeeded = aggregated.sum.succeeded.count;
      const failed = aggregated.sum.failed.count;
      const total = succeeded + failed;
      const rate = (succeeded / (succeeded + failed)) * 100;
      data = { succeeded, failed, rate, total };
    } else if (type === "crypto") {
      const succeeded = aggregated.buyWithCrypto.succeeded.count;
      const failed = aggregated.buyWithCrypto.failed.count;
      const total = succeeded + failed;
      const rate = (succeeded / (succeeded + failed)) * 100;
      data = { succeeded, failed, rate, total };
    } else if (type === "fiat") {
      const succeeded = aggregated.buyWithFiat.succeeded.count;
      const failed = aggregated.buyWithFiat.failed.count;
      const total = succeeded + failed;
      const rate = (succeeded / (succeeded + failed)) * 100;
      data = { succeeded, failed, rate, total };
    } else {
      throw new Error("Invalid tab");
    }

    if (data.total === 0) {
      return {
        isError: true,
      };
    }

    return { data };
  }

  const uiData = getUIData();

  return (
    <div className="w-full relative flex flex-col">
      <div className="flex justify-between gap-2 items-center">
        <CardHeading> Payments </CardHeading>
        {uiData.data && (
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
        {!uiData.isError ? (
          <RenderData data={uiData.data} />
        ) : (
          <NoDataAvailable />
        )}
      </div>
    </div>
  );
}

function RenderData(props: { data?: UIData }) {
  return (
    <div>
      <div className="h-10" />
      <SkeletonContainer
        loadedData={props.data?.rate}
        skeletonData={50}
        render={(rate) => <Bar rate={rate} />}
      ></SkeletonContainer>

      <div className="h-6" />

      <InfoRow
        label="Succeeded"
        type="success"
        amount={props.data?.succeeded}
      />

      <div className="h-3" />

      <InfoRow label="Failed" type="failure" amount={props.data?.failed} />
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
  amount?: number;
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
      <SkeletonContainer
        loadedData={props.amount}
        skeletonData={50}
        render={(v) => {
          return (
            <p className="text-base font-medium">
              {v.toLocaleString("en-US", {
                currency: "USD",
                style: "currency",
              })}
            </p>
          );
        }}
      />
    </div>
  );
}
