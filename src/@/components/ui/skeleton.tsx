import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

function SkeletonContainer<T>(props: {
  loadedData?: T;
  skeletonData: T;
  className?: string;
  render: (data: T, isSkeleton: boolean) => React.ReactNode;
}) {
  const isLoading = props.loadedData === undefined;
  return (
    <div
      className={cn(
        isLoading && "animate-pulse rounded-lg bg-muted",
        props.className,
      )}
    >
      <div className={cn(isLoading && "invisible")}>
        <div
          className={cn(
            "transitino-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
          )}
        >
          {props.render(props.loadedData || props.skeletonData, !isLoading)}
        </div>
      </div>
    </div>
  );
}

export { Skeleton, SkeletonContainer };
