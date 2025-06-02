import { UpdateAccountPayload } from "@/lib/types";
import axios from "../axios";

export const updateAccount = (id: string, payload: UpdateAccountPayload) => {
  return axios.put(`/profile/users/manage/admin/${id}`, payload);
};
