import { useState } from "react";
import { toDateInputValue } from "../utils/dates";

// Form options and limits.
const OCCASIONS = ["None", "Birthday", "Anniversary", "Engagement"];
const MIN_DINERS = 1;
const MAX_DINERS = 10;

// Validates the form values and returns an object with one message per invalid field.
// An empty object means the form is valid. Dates are compared as YYYY-MM-DD strings.
const validate = (values, today) => {
  const errors = {};

  if (!values.date) {
    errors.date = "Please choose a date.";
  } else if (values.date < today) {
    errors.date = "Please choose today or a future date.";
  }

  if (!values.time) {
    errors.time = "Please choose a time.";
  }

  const diners = Number(values.diners);
  if (values.diners === "") {
    errors.diners = "Please enter the number of diners.";
  } else if (!Number.isInteger(diners) || diners < MIN_DINERS || diners > MAX_DINERS) {
    errors.diners = `Diners must be a whole number between ${MIN_DINERS} and ${MAX_DINERS}.`;
  }

  return errors;
};

// Reservation form.
// Props:
//   availableTimes - list of free times for the selected date
//   dispatch       - updates the available times when the date changes
//   submitForm     - sends the reservation and returns true on success
export default function BookingForm({ availableTimes, dispatch, submitForm }) {
  const today = toDateInputValue(new Date());
  const [values, setValues] = useState({
    date: today,
    time: "",
    diners: "2",
    occasion: OCCASIONS[0],
  });
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");

  const errors = validate(values, today);
  const isValid = Object.keys(errors).length === 0;

  // Errors are only shown after a field has been visited.
  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setSubmitError("");
    // A new date invalidates the chosen time, so the time is reset and the times are reloaded.
    if (name === "date") {
      setValues((current) => ({ ...current, date: value, time: "" }));
      if (value) {
        dispatch({ type: "UPDATE_TIMES", date: value });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Reveal all errors if the user submits an invalid form.
    if (!isValid) {
      setTouched({ date: true, time: true, diners: true });
      return;
    }
    const succeeded = submitForm({
      date: values.date,
      time: values.time,
      diners: Number(values.diners),
      occasion: values.occasion,
    });
    // Edge case: the server rejected the reservation.
    if (!succeeded) {
      setSubmitError("We could not complete your reservation. Please try again.");
    }
  };

  const showError = (field) => Boolean(touched[field] && errors[field]);

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate aria-labelledby="booking-title">
      <div className="field">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          min={today}
          required
          value={values.date}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError("date")}
          aria-describedby={showError("date") ? "date-error" : undefined}
        />
        {showError("date") && (
          <p id="date-error" className="field-error" aria-live="polite">
            {errors.date}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="time">Time</label>
        <select
          id="time"
          name="time"
          required
          value={values.time}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError("time")}
          aria-describedby={showError("time") ? "time-error" : "time-help"}
        >
          <option value="">
            {availableTimes.length === 0 ? "No times available" : "Select a time"}
          </option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        {availableTimes.length === 0 ? (
          <p id="time-help" className="field-hint" aria-live="polite">
            There are no free tables on this date. Please choose another date.
          </p>
        ) : (
          <p id="time-help" className="field-hint">
            Only free times for the chosen date are listed.
          </p>
        )}
        {showError("time") && (
          <p id="time-error" className="field-error" aria-live="polite">
            {errors.time}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="diners">Number of diners</label>
        <input
          id="diners"
          name="diners"
          type="number"
          min={MIN_DINERS}
          max={MAX_DINERS}
          step="1"
          required
          value={values.diners}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError("diners")}
          aria-describedby={showError("diners") ? "diners-error" : undefined}
        />
        {showError("diners") && (
          <p id="diners-error" className="field-error" aria-live="polite">
            {errors.diners}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="occasion">Occasion</label>
        <select id="occasion" name="occasion" value={values.occasion} onChange={handleChange}>
          {OCCASIONS.map((occasion) => (
            <option key={occasion} value={occasion}>
              {occasion}
            </option>
          ))}
        </select>
      </div>

      {submitError && (
        <p role="alert" className="form-error">
          {submitError}
        </p>
      )}

      <button type="submit" className="button" disabled={!isValid} aria-label="Confirm reservation">
        Confirm reservation
      </button>
    </form>
  );
}
