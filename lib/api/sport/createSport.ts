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
    payload.rules = [];
    payload.sportMapType = "NO_MAP";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return axios.post<Sport>("/core/sports/manage", payload);
  } else {
    return axios.post<Sport>("/core/sports/manage", payload);
  }
};
