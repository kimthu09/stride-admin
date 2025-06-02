import { VerifyOtpPayload } from "@/lib/types";
import axios from "../axios";

export default async function verifyTokenForgotPassword(
  data: VerifyOtpPayload
) {
  const url = `/identity/users/reset-password/verify`;

  const res = axios.post(url, data)
  return res;
}
