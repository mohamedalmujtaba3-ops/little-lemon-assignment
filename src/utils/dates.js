// Formats a Date as YYYY-MM-DD using the local time zone, the format used by <input type="date">.
export const toDateInputValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Converts a YYYY-MM-DD string to a local Date, avoiding the UTC shift of new Date("YYYY-MM-DD").
export const parseDateInput = (value) => {
  const [year, month, day] = String(value).split("-").map(Number);
  return new Date(year, month - 1, day);
};
