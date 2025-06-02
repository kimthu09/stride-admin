import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { HexColorPicker } from "react-colorful";

export interface ColorPopoverProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}
const ColorPopover = ({
  value,
  onValueChange,
  children,
}: ColorPopoverProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="rounded-xl responsive w-60" align="end">
        <HexColorPicker color={value} onChange={onValueChange} />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPopover;
