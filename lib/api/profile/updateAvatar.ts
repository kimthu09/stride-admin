import axios from "../axios";

interface UpdateAvatarPayload {
  ava: string;
}
export const updateAvatar = ( payload: UpdateAvatarPayload) => {
  return axios.put(`/profile/users/profile`, payload);
};
