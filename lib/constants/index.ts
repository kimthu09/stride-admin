import { FormFilterType, SidebarItem } from "../types";
import { GoPeople } from "react-icons/go";
import { FilterInputType, SportMapType } from "./enum";
import { BiCategory } from "react-icons/bi";
import { MdOutlineSportsBaseball } from "react-icons/md";
export const sidebarItems: SidebarItem[] = [
  {
    title: "Category",
    href: "/admin/category",
    icon: BiCategory,
    submenu: false,
  },

  {
    title: "Sport",
    href: "/admin/sport",
    icon: MdOutlineSportsBaseball,
    submenu: false,
  },
  {
    title: "User",
    href: "/admin/account",
    icon: GoPeople,
    submenu: false,
  },
];

export const accountFilterValues: FormFilterType[] = [
  { type: "search", title: "Search", inputType: FilterInputType.TEXT },
  {
    type: "isAdmin",
    title: "Type",
    inputType: FilterInputType.BOOLEAN,
    trueTitle: "Admin",
    falseTitle: "User",
  },
  {
    type: "isBlocked",
    title: "Status",
    inputType: FilterInputType.BOOLEAN,
    trueTitle: "Blocked",
    falseTitle: "Active",
  },
];

export const mapTypeColors: Record<string, string> = {
  [SportMapType.CYCLING]: "#fb923c",
  [SportMapType.WALKING]: "#0891b2",
  [SportMapType.DRIVING]: "#15803d",
};
