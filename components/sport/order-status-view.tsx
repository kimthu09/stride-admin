import { mapTypeColors } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const MapTypeView = ({ type }: { type: string }) => {
  return (
    <div
      className={cn(
        "rounded-xl px-3 py-1.5 text-sm font-medium text-white tracking-wide self-start"
      )}
      style={{ background: mapTypeColors[type] }}
    >
      {type}
    </div>
  );
};
