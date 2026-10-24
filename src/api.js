// Simulated booking API. Replace these functions with real HTTP calls when a backend is available.
// Deterministic pseudo random generator: the same seed always gives the same sequence.
const seededRandom = (seed) => {
  const modulus = 2 ** 35 - 31;
  const multiplier = 185852;
  let state = seed % modulus;
  return () => {
    state = (state * multiplier) % modulus;
    return state / modulus;
  };
};

// Returns the free booking times for a date.
// The result depends on the day of the month, so a date always returns the same times.
// An invalid date returns an empty list.
export const fetchAPI = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return [];
  }
  const times = [];
  const random = seededRandom(date.getDate());
  for (let hour = 17; hour <= 23; hour += 1) {
    if (random() < 0.5) {
      times.push(`${hour}:00`);
    }
    if (random() < 0.5) {
      times.push(`${hour}:30`);
    }
  }
  return times;
};

// Simulates sending a reservation to a server.
// Returns true when the reservation is accepted and false otherwise.
export const submitAPI = (formData) => Boolean(formData);
