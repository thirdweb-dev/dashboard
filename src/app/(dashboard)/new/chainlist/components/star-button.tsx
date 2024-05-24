"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../../../@/lib/utils";
import { Button } from "../../../../../@/components/ui/button";
import { ToolTipLabel } from "../../../../../@/components/ui/tooltip";
import { useDebounce } from "../../../../../hooks/common/useDebounce";

export function StarButton(props: {
  chainId: number;
  initialPreferred: boolean;
  className?: string;
  iconClassName?: string;
}) {
  const { initialPreferred } = props;
  const [isPreferred, setIsPreferred] = useState(initialPreferred);
  const label = isPreferred ? "Remove from Favourites" : "Add to Favourites";
  // don't update the tooltip immediately on click
  const tooltipLabel = useDebounce(label, 1000);

  return (
    <Button
      className={cn("!m-0 h-auto w-auto", props.className)}
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={() => setIsPreferred((prev) => !prev)}
    >
      <ToolTipLabel label={tooltipLabel}>
        <Star
          className={cn(
            "transition-all size-5",
            props.iconClassName,
            isPreferred ? "text-primary" : "text-muted-foreground",
          )}
          fill={isPreferred ? "currentColor" : "none"}
        />
      </ToolTipLabel>
    </Button>
  );
}
