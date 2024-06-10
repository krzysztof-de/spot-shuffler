import dayjs from "dayjs";

export const calculateDaysOfStay = (
  checkInDate: Date,
  checkOutDate: Date
): Number => dayjs(checkOutDate).diff(dayjs(checkInDate), "day") + 1;
