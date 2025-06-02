import { SportMapType } from "@/lib/constants/enum";
import axios from "../axios";
import { CreateSportPayload } from "./createSport";

export const updateSport = (id: string, payload: CreateSportPayload) => {
  if (payload.sportMapType === SportMapType.NOMAP) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { rules, ...data } = payload;
    return axios.put(`/core/sports/manage/${id}`, {
      ...data,
      sportMapType: null,
    });
  } else {
    return axios.put(`/core/sports/manage/${id}`, payload);
  }
};
