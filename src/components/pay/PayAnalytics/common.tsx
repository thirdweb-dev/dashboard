import { Spinner } from "@/components/ui/Spinner/Spinner";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ToolTipLabel } from "../../../@/components/ui/tooltip";
import { cn } from "../../../@/lib/utils";

export function NoDataAvailable() {
  return (
    <div className="h-[250px] flex items-center justify-center">
      <p className="text-muted-foreground">No data available</p>
    </div>
  );
}

export function LoadingGraph(props: { className?: string }) {
  return (
    <div
      className={cn(
        "min-h-[200px] flex items-center justify-center",
        props.className,
      )}
    >
      <Spinner className="size-14" />
    </div>
  );
}

export function CardHeading(props: { children: React.ReactNode }) {
  return <h3 className="text-base font-medium">{props.children}</h3>;
}

export function ChangeBadge(props: { percent: number }) {
  const percentValue = `${props.percent.toFixed(0)}%`;
  let label = "No change compared to prior range";
  if (props.percent !== 0) {
    label = `
      ${props.percent >= 0 ? "Increase" : "Decrease"} of ${percentValue} compared to prior range
    `;
  }
  return (
    <ToolTipLabel label={label}>
      <div>
        <Badge
          variant={props.percent >= 0 ? "success" : "destructive"}
          className="text-sm gap-1 px-2 py-1.5"
        >
          {props.percent >= 0 ? (
            <ArrowUpIcon className="size-4 " />
          ) : (
            <ArrowDownIcon className="size-4" />
          )}
          {percentValue}
        </Badge>
      </div>
    </ToolTipLabel>
  );
}
