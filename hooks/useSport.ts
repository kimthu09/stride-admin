import useSWR from "swr";
import { useFilteredList } from "./useFilterList";
import getAllSport from "@/lib/api/sport/getAllSport";

export const SPORT_KEY = "sport-all";

export const useSportList = () => {
  const { filters } = useFilteredList();
  const { data, isLoading, error, mutate } = useSWR(
    `${SPORT_KEY}-${JSON.stringify(filters)}`,
    () => getAllSport(filters)
  );

  return {
    filters,
    data,
    isLoading,
    error,
    mutate,
  };
};
