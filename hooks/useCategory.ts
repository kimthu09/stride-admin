
import useSWR from "swr";
import { useFilteredList } from "./useFilterList";
import getAllCategory from "@/lib/api/category/getAllCategory";

export const CATEGORY_KEY = "category-all";

export const useCategoryList = (useFilter: boolean = true) => {
  const { filters } = useFilteredList();
  const key = useFilter
    ? `${CATEGORY_KEY}-${JSON.stringify(filters)}`
    : CATEGORY_KEY;
  const { data, isLoading, error, mutate } = useSWR(key, () =>
    getAllCategory(useFilter ? filters : { page: 1, limit: 10000 })
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
