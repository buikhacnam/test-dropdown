import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Item {
  value: string;
  id: number;
}

interface SelectScrollableProps {
  items: Item[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export function SelectScrollable({
  items,
  placeholder,
  onValueChange,
  disabled,
}: SelectScrollableProps) {
  return (
    <Select
      onValueChange={(value) => onValueChange && onValueChange(value)}
      disabled={disabled}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={placeholder || "Select"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>
              {item.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
