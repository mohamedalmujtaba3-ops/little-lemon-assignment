import { initializeTimes, updateTimes } from "./times";

// Tests for the reducer helpers that manage the available booking times.
describe("initializeTimes", () => {
  test("returns a list of time strings", () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    times.forEach((time) => expect(time).toMatch(/^\d{2}:(00|30)$/));
  });
});

describe("updateTimes", () => {
  test("returns the times for the selected date", () => {
    const result = updateTimes([], { type: "UPDATE_TIMES", date: "2099-01-15" });
    expect(Array.isArray(result)).toBe(true);
    result.forEach((time) => expect(time).toMatch(/^\d{2}:(00|30)$/));
  });

  test("returns the same times for the same date", () => {
    const first = updateTimes([], { type: "UPDATE_TIMES", date: "2099-03-10" });
    const second = updateTimes(["x"], { type: "UPDATE_TIMES", date: "2099-03-10" });
    expect(second).toEqual(first);
  });

  test("keeps the current state for unknown actions", () => {
    const state = ["17:00"];
    expect(updateTimes(state, { type: "OTHER" })).toBe(state);
  });

  test("returns an empty list for an invalid date", () => {
    expect(updateTimes(["17:00"], { type: "UPDATE_TIMES", date: "not-a-date" })).toEqual([]);
  });
});
