/* eslint-disable react/forbid-dom-props */
export function SuccessRateCard() {
  return (
    <div className="w-full">
      <h2 className="text-lg font-medium mb-2"> Payments </h2>
      <Bar rate={80} />
      <div className="h-12" />
      <InfoRow label="Succeeded" type="success" amount={80000} />
      <div className="h-2" />
      <InfoRow label="Failed" type="failure" amount={20000} />
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
