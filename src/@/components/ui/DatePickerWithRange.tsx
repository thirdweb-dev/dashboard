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

              <div className="px-4">
                <TabButtons
                  tabClassName="!text-sm"
                  activeTabClassName="!bg-inverted !text-inverted-foreground"
                  tabContainerClassName="gap-2"
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
              </div>

              {screen === "from" && (
                <Calendar
                  key={from.toString()}
                  mode="range"
                  selected={{
                    from,
                    to,
                  }}
                  defaultMonth={from}
                  onDayClick={(newFrom) => {
                    if (isBefore(newFrom, to)) {
                      setFrom(newFrom);
                    }
                  }}
                  classNames={{
                    day_range_start: "!bg-inverted",
                    day_range_end:
                      "!bg-inverted/20 !text-inverted pointer-events-none",
                  }}
                />
              )}

              {screen === "to" && (
                <Calendar
                  key={to.toString()}
                  mode="range"
                  selected={{
                    from,
                    to,
                  }}
                  defaultMonth={to}
                  onDayClick={(newTo) => {
                    if (isBefore(from, newTo)) {
                      setTo(newTo);
                    }
                  }}
                  classNames={{
                    day_range_end: "!bg-inverted",
                    day_range_start:
                      "!bg-inverted/20 !text-inverted pointer-events-none",
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
