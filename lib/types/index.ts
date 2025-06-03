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

export interface ReportActivity {
  totalTime: number;
  totalDistance: number;
  totalElevationGain: number;
  numberActivity: number;
  numberUsers: number;
  recentActivities: RecentActivity[];
}

export interface RecentActivity {
  id: string;
  sport: SportInReport;
  time: number;
  elevationGain?: number;
  distance?: number;
  calories: number;
  avgHeartRate?: number;
}

export interface SportReport {
  numberSports: number;
  sportMapTypes: SportReportTypeItem[];
  sports: SportInReport[];
}

export interface SportReportTypeItem {
  type: string;
  numberActivities: number;
}
export interface SportInReport {
  id: string;
  name: string;
  image: string;
  sportMapType: string;
  color: string;
  numberActivities: number;
}

export interface UserReport {
  totalUsers: number;
  users: UserInReport[];
}

export interface UserInReport {
  provider: string;
  value: number;
}

export interface ReportData {
  activity: ReportActivity;
  sportReport: SportReport;
  userReport: UserReport;
  sportMapTypes: SportMapBucket[];
}

export interface ReportParam extends PagingParam {
  fromDate?: number;
  toDate?: number;
}

export interface SportMapValue {
  type: string;
  numberActivities: number;
  time: number;
}

export interface SportMapBucket {
  from: number;
  to: number;
  values: SportMapValue[];
}
