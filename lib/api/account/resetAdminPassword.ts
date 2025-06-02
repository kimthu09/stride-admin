import axios from "../axios";

export const resetAdminPassword = (id: string) => {
  return axios.post(`/identity/manage/admin/by-user-id/${id}/reset-password`);
};
