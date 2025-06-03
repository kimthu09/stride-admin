import useSWR from "swr";
import { useFilteredList } from "./useFilterList";
import getReport from "@/lib/api/report/getReport";

export const useReport = () => {
  const {
    filters,
    filtersReady,
    updateFilter,
    updateFilters,
    resetFilters,
    removeFilter,
  } = useFilteredList();
  const { data, isLoading, error, mutate } = useSWR(
    filtersReady.current ? `report-${JSON.stringify(filters)}` : null,
    () => getReport(filters),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    removeFilter,
    data,
    isLoading,
    error,
    mutate,
  };
};
