import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function IntervalSelector(props: {
  intervalType: "day" | "week";
  setIntervalType: (intervalType: "day" | "week") => void;
}) {
  return (
    <Select
      value={props.intervalType}
      onValueChange={(value: "day" | "week") => {
        props.setIntervalType(value);
      }}
    >
      <SelectTrigger className="bg-transparent w-auto">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="week"> Weekly </SelectItem>
        <SelectItem value="day"> Daily</SelectItem>
      </SelectContent>
    </Select>
  );
}
