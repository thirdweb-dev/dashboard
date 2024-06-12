"use client";

import * as React from "react";
import { format, isBefore } from "date-fns";
import {
  Calendar as CalendarIcon,
  CalendarX2Icon,
  ChevronDownIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { date } from "zod";
import { TabButtons } from "./tabs";
import { DynamicHeight } from "./DynamicHeight";

export function DatePickerWithRange(props: {
  from: Date;
  to: Date;
  setFrom: (from: Date) => void;
  setTo: (to: Date) => void;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  labelOverride?: string;
}) {
  const [screen, setScreen] = React.useState<"from" | "to">("from");
  const { from, to, setFrom, setTo } = props;

  const isValid = React.useMemo(() => isBefore(from, to), [from, to]);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn("grid gap-2", props.className)}>
      <Popover
        open={isOpen}
        onOpenChange={(v) => {
          if (!v) {
            setScreen("from");
          }
          setIsOpen(v);
        }}
      >
        {/* Button */}
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "min-w-[200px] justify-start text-left font-normal gap-1",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {props.labelOverride || (
              <>
                {format(from, "LLL dd, y")} - {format(to, "LLL dd, y")}
              </>
            )}
            <ChevronDownIcon className="h-4 w-4 ml-auto" />
          </Button>
        </PopoverTrigger>

        {/* Popover */}
        <PopoverContent className="w-auto p-0" align="start">
          <DynamicHeight>
            <div>
              {!isValid && (
                <p className="text-sm pt-2 justify-center text-destructive-foreground text-center flex items-center gap-2">
                  <CalendarX2Icon className="h-4 w-4" />
                  Invalid date range
                </p>
              )}
              {props.header}

              <TabButtons
                tabClassName="!text-sm"
                tabs={[
                  {
                    name: "From",
                    onClick: () => setScreen("from"),
                    isActive: screen === "from",
                    isEnabled: true,
                  },
                  {
                    name: "To",
                    onClick: () => setScreen("to"),
                    isActive: screen === "to",
                    isEnabled: true,
                  },
                ]}
              />

              {screen === "from" && (
                <Calendar
                  key={from.toString()}
                  mode="single"
                  selected={from}
                  defaultMonth={from}
                  onSelect={(newFrom) => {
                    if (!newFrom) {
                      return;
                    }

                    setFrom(newFrom);
                  }}
                />
              )}

              {screen === "to" && (
                <Calendar
                  key={to.toString()}
                  mode="single"
                  selected={to}
                  defaultMonth={to}
                  onSelect={(newTo) => {
                    if (!newTo) {
                      return;
                    }

                    setTo(newTo);
                  }}
                />
              )}
              {props.footer}
            </div>
          </DynamicHeight>
        </PopoverContent>
      </Popover>
    </div>
  );
}
