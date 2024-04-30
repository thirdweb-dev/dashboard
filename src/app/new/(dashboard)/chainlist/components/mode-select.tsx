"use client";

import { Button } from "@/components/ui/button";
import { Grid2X2, List } from "lucide-react";
import { parseAsStringEnum, useQueryState } from "nuqs";

export const ChainListModeSelect: React.FC = () => {
  const [activeMode, setActiveMode] = useQueryState(
    "mode",
    parseAsStringEnum(["list", "grid"]).withDefault("grid"),
  );

  return (
    <div className="flex flex-row gap-2">
      <Button
        className={
          activeMode === "grid"
            ? "text-primary border-primary hover:text-primary"
            : ""
        }
        variant="outline"
        size="icon"
        onClick={() => setActiveMode("grid")}
      >
        <Grid2X2 />
      </Button>
      <Button
        className={
          activeMode === "list"
            ? "text-primary border-primary hover:text-primary"
            : ""
        }
        variant="outline"
        size="icon"
        onClick={() => setActiveMode("list")}
      >
        <List />
      </Button>
    </div>
  );
};
