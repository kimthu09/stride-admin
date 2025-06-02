import { CreateAccountPayload, Account } from "@/lib/types";
import axios from "../axios";

export const createAdminAccount = (payload: CreateAccountPayload) => {
  return axios.post<Account>("/profile/users/manage/admin", payload);
};

export interface CreateUserAccountPayload {
  email: string;
  password: string;
}
export const createUserAccount = (payload: CreateUserAccountPayload) => {
  return axios.post<Account>("/profile/users/manage/user", payload);
};
