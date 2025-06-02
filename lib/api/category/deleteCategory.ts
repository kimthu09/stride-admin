import axios from "../axios";

export const deleteCategory = (id: string) => {
  return axios.delete(`/core/categories/manage/${id}`);
};
