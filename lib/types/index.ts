import { IconType } from "react-icons";
import { FilterInputType } from "../constants/enum";

export interface SidebarItem {
  title: string;
  href: string;
  icon?: IconType;
  submenu?: boolean;
  subMenuItems?: SidebarItem[];
}

export interface User {
  name: string;
  ava: string;
  dob: string;
}
export interface UserInfo extends User {
  id: string;
}

export interface Sport {
  id: string;
  category: Category;
  name: string;
  image: string;
  sportMapType: string;
  color: string;
  rules: SportRule[];
}

export interface SportRule {
  expression: string;
  met: number;
}

export interface Account {
  id: string;
  email: string;
  name: string;
  ava: string;
  dob: string | null;
  isAdmin: boolean;
  isBlocked: boolean;
}

export interface CreateAccountPayload {
  email: string;
  name: string;
  dob: string;
  password: string;
  ava: string;
}
export interface UpdateAccountPayload {
  email: string;
  name: string;
  dob: string;
  ava: string;
  isBlocked: boolean;
}

export interface AccountData {
  data: Account[];
  page: PagingType;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginToken {
  token: string;
  expiryTime: string;
}

export interface PagingParam {
  page?: number;
  limit?: number;
}

export interface PagingType {
  index: number;
  limit: number;
  totalPages: number;
  totalElements: number;
}

export interface AccountFilterParam extends PagingParam {
  name?: string;
  email?: string;
  admin?: boolean;
  male?: boolean;
  monthDOB?: number;
  yearDOB?: number;
}

export interface FormFilterItem {
  type: string;
  value: string;
}

export interface FormFilterType {
  type: string;
  title: string;
  inputType: FilterInputType;
  trueTitle?: string;
  falseTitle?: string;
}

export interface FormFilterValues {
  filters: FormFilterItem[];
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface ApiError {
  timestamp: string;
  status: string;
  message: string;
  detail: string;
}

export interface VerifyOtpPayload {
  username: string;
  token: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface CategoryData {
  data: Category[];
  page: PagingType;
}
export interface SportData {
  data: Sport[];
  page: PagingType;
}
