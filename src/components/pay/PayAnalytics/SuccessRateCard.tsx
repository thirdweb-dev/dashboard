import { useState } from "react";
import { TabButtons } from "../../../@/components/ui/tabs";
import { LoadingGraph, NoDataAvailable } from "./common";
import { usePayVolume, type PayVolumeData } from "./usePayVolume";

/* eslint-disable react/forbid-dom-props */
export function SuccessRateCard(props: {
  clientId: string;
  from: Date;
  to: Date;
}) {
  const payoutsQuery = usePayVolume({
    clientId: props.clientId,
    from: props.from,
    to: props.to,
    intervalType: "day",
  });

  return (
    <div className="w-full">
      <h2 className="text-base font-medium"> Payments </h2>

      {payoutsQuery.isLoading ? (
        <LoadingGraph />
      ) : payoutsQuery.data ? (
        <RenderData data={payoutsQuery.data} />
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
}

function RenderData(props: { data: PayVolumeData }) {
  type Data = {
    succeeded: number;
    failed: number;
    rate: number;
    total: number;
  };

  const [activeTab, setActiveTab] = useState<"all" | "crypto" | "fiat">("all");

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

  const data = getData(activeTab);

  return (
    <div>
      <div className="h-3" />

      <TabButtons
        tabs={[
          {
            name: "Total",
            isActive: activeTab === "all",
            onClick: () => setActiveTab("all"),
            isEnabled: true,
          },
          {
            name: "Crypto",
            isActive: activeTab === "crypto",
            onClick: () => setActiveTab("crypto"),
            isEnabled: true,
          },
          {
            name: "Fiat",
            isActive: activeTab === "fiat",
            onClick: () => setActiveTab("fiat"),
            isEnabled: true,
          },
        ]}
      />

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
    <div className="flex items-center rounded-lg overflow-hidden">
      <div
        className="h-6 bg-success-foreground transition-all"
        style={{
          width: `${props.rate}%`,
        }}
      />
      <div className="h-6 bg-destructive-foreground flex-1 transition-all" />
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
        ${props.amount.toLocaleString("en-US")}
      </p>
    </div>
  );
}
