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

function SkeletonContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  isLoading: boolean;
}) {
  const { children, ...restProps } = props;
  return (
    <div
      className={cn(
        props.isLoading && "animate-pulse rounded-md bg-muted",
        className,
      )}
      {...restProps}
    >
      <div className={cn(props.isLoading && "invisible")}>
        <div
          className={cn(
            "transitino-opacity duration-300",
            props.isLoading ? "opacity-0" : "opacity-100",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export { Skeleton, SkeletonContainer };
