import axios from "../axios";

export default async function sendEmailForgotPassword({
  email,
}: {
  email: string;
}) {
  const url = `/identity/users/reset-password/send-otp`;
  const data = {
    username: email,
  };

  const res = axios
    .post(url, data)
    .then((response) => {
      if (response) return response.data;
    })
  return res;
}
