import React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DateRangePickerProps = {
  className?: string;
};

type DateRange = {
  from: Date;
  to: Date;
};

const DateRangePicker = ({ className }: DateRangePickerProps) => {
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const presets = [
    {
      label: "Today",
      value: "today",
      dates: { from: new Date(), to: new Date() },
    },
    {
      label: "Last 7 days",
      value: "last7days",
      dates: { from: addDays(new Date(), -6), to: new Date() },
    },
    {
      label: "Last 30 days",
      value: "last30days",
      dates: { from: addDays(new Date(), -29), to: new Date() },
    },
    {
      label: "Last 90 days",
      value: "last90days",
      dates: { from: addDays(new Date(), -89), to: new Date() },
    },
  ];

  const handlePresetChange = (value: string) => {
    const preset = presets.find((p) => p.value === value);
    if (preset) {
      setDate(preset.dates);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col">
            <div className="p-2">
              <Select onValueChange={handlePresetChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preset" />
                </SelectTrigger>
                <SelectContent>
                  {presets.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(range) => {
                if (range) {
                  setDate(range as DateRange);
                }
              }}
              numberOfMonths={2}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
