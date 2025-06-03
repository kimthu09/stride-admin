import { ReportParam, ReportData } from "@/lib/types";
import axios from "../axios";
import { AxiosResponse } from "axios";
import encodeParams from "@/lib/helpers/params";

export default function getReport(
  params: ReportParam
): Promise<AxiosResponse<ReportData>> {
  return axios.get<ReportData>(`/metric/report?${encodeParams(params, false)}`);
}
