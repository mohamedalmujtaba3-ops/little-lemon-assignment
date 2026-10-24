import { fetchAPI } from "../api";
import { parseDateInput } from "./dates";

// Initial state for the available times: the times for today.
export const initializeTimes = () => fetchAPI(new Date());

// Reducer for the available times.
// UPDATE_TIMES replaces the list with the times for the selected date; other actions keep the state.
export const updateTimes = (state, action) => {
  if (action && action.type === "UPDATE_TIMES" && action.date) {
    return fetchAPI(parseDateInput(action.date));
  }
  return state;
};
