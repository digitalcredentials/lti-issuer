import moment from "moment-timezone";

/**
 * @param {String} dateInput
 * @return {String}
 */
const formatDate = (dateInput) => {
  const date = parseDate(dateInput);
  return `${date.format("MMMM")} ${date.format("D")}, ${date.format("YYYY")}`;
};

/**
 * @param {String} dateStr
 * @return {String}
 */
const parseDate = (dateStr) =>
  moment.tz(
    dateStr,
    [moment.ISO_8601, "llll", "LLLL", "lll", "LLL", "ll", "LL", "l", "L"],
    "en",
    "UTC"
  );

export default {
  formatDate,
  parseDate,
};
