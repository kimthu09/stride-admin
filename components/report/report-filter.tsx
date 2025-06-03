import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import DaypickerPopup from "../ui/daypicker-popup";
import { stringNumberToDate } from "@/lib/helpers/date";
import { FilterParams } from "@/hooks/useFilterList";

export interface ReportFilterValue {
  fromDate: string;
  toDate: string;
}

export function endOfToday() {
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  return now;
}
export interface ReportFilterProps {
  filters: FilterParams;
  onApplyFilters: (data: ReportFilterValue) => void;
}
const ReportFilter = ({ filters, onApplyFilters }: ReportFilterProps) => {
  const [timeFrom, setTimeFrom] = useState<string>();
  const [timeTo, setTimeTo] = useState<string>();

  useEffect(() => {
    setTimeFrom(filters.fromDate);
    setTimeTo(filters.toDate);
  }, [filters]);

  return (
    <div className="flex flex-row gap-3">
      <div>
        <span className="font-medium">From Date</span>
        <DaypickerPopup
          triggerClassname="flex-1 w-full mt-1"
          date={timeFrom ? stringNumberToDate(timeFrom) : new Date()}
          setDate={(date) => {
            const seconds = date?.valueOf();
            setTimeFrom(`${seconds ?? new Date().valueOf}`);
          }}
        />
      </div>
      <div>
        <span className="font-medium mb-2">To Date</span>
        <DaypickerPopup
          triggerClassname="flex-1 w-full mt-1"
          date={timeTo ? stringNumberToDate(timeTo) : new Date()}
          setDate={(date) => {
            const seconds = date?.setHours(23, 59, 59, 999);
            setTimeTo(`${seconds ?? endOfToday().valueOf}`);
          }}
        />
      </div>
      <Button
        type="submit"
        className="self-end"
        onClick={() => {
          onApplyFilters({ fromDate: timeFrom ?? "", toDate: timeTo ?? "" });
        }}
      >
        View
      </Button>
    </div>
  );
};

export default ReportFilter;
