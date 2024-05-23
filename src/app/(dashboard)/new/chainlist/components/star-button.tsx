"use client";

import { Button } from "@chakra-ui/react";
import { Star } from "lucide-react";
import { useState } from "react";

export function StarButton(props: {
  chainName: string;
  initialPreferred: boolean;
}) {
  const { chainName, initialPreferred } = props;
  const [isPreferred, setIsPreferred] = useState(initialPreferred);

  return (
    <Button
      className="!m-0"
      variant="ghost"
      size="icon"
      aria-label={
        isPreferred
          ? `Remove ${chainName} from preferred chains.`
          : `Add ${chainName} to preferred chains.`
      }
      onClick={() => setIsPreferred((prev) => !prev)}
    >
      <Star
        className="text-muted-foreground transition-all size-5"
        fill={isPreferred ? "rgba(218, 142, 71, 1)" : "transparent"}
        strokeWidth={1}
        stroke={isPreferred ? "rgba(218, 142, 71, 1)" : "currentColor"}
      />
    </Button>
  );
}
