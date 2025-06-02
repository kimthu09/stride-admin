import axios from "../axios";

export const blockAccount = (id: string, value: boolean) => {
  return axios.put(`/profile/users/manage/user/${id}`, { isBlocked: value });
};
