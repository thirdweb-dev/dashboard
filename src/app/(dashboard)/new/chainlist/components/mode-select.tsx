"use client";

import { Button } from "@/components/ui/button";
import { Grid2X2, List } from "lucide-react";
import { useChainListState } from "./state-provider";

export const ChainListModeSelect: React.FC = () => {
  const { mode, setMode } = useChainListState();

  return (
    <div className="flex flex-row gap-2">
      <Button
        aria-label="Grid mode"
        className={
          mode === "grid"
            ? "text-primary border-primary hover:text-primary"
            : ""
        }
        variant="outline"
        size="icon"
        onClick={() => setMode("grid")}
      >
        <Grid2X2 strokeWidth={1} />
      </Button>
      <Button
        aria-label="List mode"
        className={
          mode === "list"
            ? "text-primary border-primary hover:text-primary"
            : ""
        }
        variant="outline"
        size="icon"
        onClick={() => setMode("list")}
      >
        <List strokeWidth={1} />
      </Button>
    </div>
  );
};
