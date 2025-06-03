import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const stringToDate = (value: string) => {
  try {
    const dateParts = value.split("/");
    const dateObject = new Date(
      +dateParts[2],
      +dateParts[1] - 1,
      +dateParts[0]
    );
    return dateObject;
  } catch {
    return null; // Or any default value you prefer
  }
};

export const formatDateToLocal = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split("T")[0];
};

export const dateTimeStringFormat = (value: number) => {
  const dateObject = new Date(value * 1000);
  const formattedDate = format(dateObject, "HH:mm, dd/MM/yyyy", { locale: vi });
  return formattedDate;
};

export const stringNumberToDate = (value: string) => {
  const milli = +value;
  const dateObject = new Date(milli);
  return dateObject;
};

export const toVNTime = (value: string) => {
  const date = new Date(value);
  return format(date, "dd/MM/yyyy", {
    locale: vi,
  });
};
