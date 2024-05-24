"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ClientOnly } from "../../components/ClientOnly/ClientOnly";

export function ColorModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      aria-label="Toggle theme"
    >
      <ClientOnly ssr={<Moon className="size-6" />}>
        {theme === "dark" ? (
          <Moon className="size-6" />
        ) : (
          <Sun className="size-6 " />
        )}
      </ClientOnly>
    </Button>
  );
}
