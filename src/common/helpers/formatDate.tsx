import { isNil } from "lodash";
import moment from "moment";

export const formatWithTime = (date?: string | Date | null) => {
  if (isNil(date)) {
    return "";
  }
  return moment(date).format("dddd, MMM Do YYYY, h:mm:ss a");
};

export const formatDate = (date: string | Date) => {
  return moment(date).format("DD MMM YYYY");
};

/**
 * Get no years/months/days difference between 2 dates
 * @param startDate Start date
 * @param endDate End Date
 */
export const getDifference = (
  startDate: Date | string,
  endDate: Date | string
) => {
  const end = moment(endDate);
  const start = moment(startDate);
  const diffDuration = moment.duration(start.diff(end));
  const years = diffDuration.years();
  const months = diffDuration.months();
  const days = diffDuration.days();

  return { years, months, days };
};

export const timeAgo = (date: string | Date) => moment(date).fromNow();
