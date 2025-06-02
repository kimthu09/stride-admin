import axios from "../axios";
import Cookies from "js-cookie";

export const logOut = () => {
  return axios.post("/identity/auth/logout", { token: Cookies.get("token") });
};
