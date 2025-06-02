import { CategoryData, PagingParam } from "@/lib/types";
import axios from "../axios";
import { AxiosResponse } from "axios";
import encodeParams from "@/lib/helpers/params";

export default function getAllCategory(
  params: PagingParam
): Promise<AxiosResponse<CategoryData>> {
  return axios.get<CategoryData>(`/core/categories/manage?${encodeParams(params)}`);
}
