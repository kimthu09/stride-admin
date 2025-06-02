import { Sport, SportRule } from "@/lib/types";
import axios from "../axios";
import { SportMapType } from "@/lib/constants/enum";

export interface CreateSportPayload {
  categoryId: string;
  sportMapType: string;
  name: string;
  image: string;
  rules: SportRule[];
}

export const createSport = (payload: CreateSportPayload) => {
  if (payload.sportMapType === SportMapType.NOMAP) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { rules, ...data } = payload;
    return axios.post<Sport>("/core/sports/manage", {
      ...data,
      sportMapType: null,
    });
  } else {
    return axios.post<Sport>("/core/sports/manage", payload);
  }
};
