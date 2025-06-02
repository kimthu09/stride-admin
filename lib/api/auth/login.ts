import { LoginPayload, LoginToken } from "@/lib/types";
import axios from "../axios";
import Cookies from "js-cookie";

export const login = (payload: LoginPayload) => {
  return axios
    .post<LoginToken>("/identity/auth/login", payload)
    .then((res) => {
      const expirationDate = new Date(res.data.expiryTime);

      Cookies.set("token", res.data.token, {
        sameSite: "Strict",
        expires: expirationDate,
      });
    });
};
