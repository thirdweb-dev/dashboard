import { Spinner } from "@/components/ui/Spinner/Spinner";

export function NoDataAvailable() {
  return (
    <div className="h-[250px] flex items-center justify-center">
      <p className="text-muted-foreground">No data available</p>
    </div>
  );
}

export function LoadingGraph() {
  return (
    <div className="h-[250px] flex items-center justify-center">
      <Spinner className="size-10" />
    </div>
  );
}
