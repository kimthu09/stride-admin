import { SportData, PagingParam } from "@/lib/types";
import axios from "../axios";
import { AxiosResponse } from "axios";
import encodeParams from "@/lib/helpers/params";

export default function getAllSport(
  params: PagingParam
): Promise<AxiosResponse<SportData>> {
  return axios.get<SportData>(`/core/sports/manage?${encodeParams(params)}`);
}
