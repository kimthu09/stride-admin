import axios from "../axios";
import { CreateCategoryPayload } from "./createCategory";

export const updateCategory = (id: string, payload: CreateCategoryPayload) => {
  return axios.put(`/core/categories/manage/${id}`, payload);
};
