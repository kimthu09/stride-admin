import useSWR from "swr";
import { useFilteredList } from "./useFilterList";
import getAllAccount from "../lib/api/account/getAllAccount";

export const useAccountList = () => {
  const { filters, filtersReady, updateFilter, resetFilters, removeFilter } =
    useFilteredList();
  const { data, isLoading, error, mutate } = useSWR(
    filtersReady.current
      ? `account-${JSON.stringify(filters)}`
      : null,
    () => getAllAccount(filters),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    filters,
    updateFilter,
    resetFilters,
    removeFilter,
    data,
    isLoading,
    error,
    mutate,
  };
};
