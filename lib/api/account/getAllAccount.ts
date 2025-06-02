import {  AccountData, AccountFilterParam } from "@/lib/types";
import axios from "../axios";
import encodeParams from "@/lib/helpers/params";
import { AxiosResponse } from "axios";

export default function getAllAccount(
  params: AccountFilterParam
): Promise<AxiosResponse<AccountData>> {
  return axios.get<AccountData>(`/profile/users/manage?${encodeParams(params)}`);
}
