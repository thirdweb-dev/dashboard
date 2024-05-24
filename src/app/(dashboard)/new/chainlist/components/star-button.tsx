"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../../../@/lib/utils";
import { Button } from "../../../../../@/components/ui/button";
import { ToolTipLabel } from "../../../../../@/components/ui/tooltip";

export function StarButton(props: {
  chainId: number;
  initialPreferred: boolean;
  className?: string;
  iconClassName?: string;
}) {
  const { initialPreferred } = props;
  const [isPreferred, setIsPreferred] = useState(initialPreferred);
  const label = isPreferred ? "Add to Favourites" : "Remove from Favourites";

  return (
    <Button
      className={cn("!m-0 h-auto w-auto", props.className)}
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={() => setIsPreferred((prev) => !prev)}
    >
      <ToolTipLabel label={label}>
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
