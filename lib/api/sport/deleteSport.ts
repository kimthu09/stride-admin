import axios from "../axios";

export const deleteSport = (id: string) => {
  return axios.delete(`/core/sports/manage/${id}`);
};
