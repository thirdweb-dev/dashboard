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
      <h2 className="text-lg font-medium mb-2"> Payments </h2>
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
  const succeeded = props.data.aggregate.sum.succeeded;
  const failed = props.data.aggregate.sum.failed;
  const total = succeeded + failed;
  const rate = (succeeded / (succeeded + failed)) * 100;

  if (total === 0) {
    return <NoDataAvailable />;
  }

  return (
    <div>
      <Bar rate={rate} />
      <div className="h-12" />
      <InfoRow label="Succeeded" type="success" amount={succeeded} />
      <div className="h-2" />
      <InfoRow label="Failed" type="failure" amount={failed} />
    </div>
  );
}

function Bar(props: { rate: number }) {
  return (
    <div className="flex items-center gap-1 bg-destructive-foreground rounded-lg overflow-hidden">
      <div
        className="h-6 bg-success-foreground"
        style={{
          width: `${props.rate}%`,
        }}
      />
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
        <p className="text-lg text-secondary-foreground">{props.label}</p>
      </div>
      <p className="text-lg font-medium">
        ${props.amount.toLocaleString("en-US")}
      </p>
    </div>
  );
}
