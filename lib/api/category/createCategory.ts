import { Category } from "@/lib/types";
import axios from "../axios";

export interface CreateCategoryPayload {
  name: string;
}

export const createCategory = (payload: CreateCategoryPayload) => {
  return axios.post<Category>("/core/categories/manage", payload);
};
