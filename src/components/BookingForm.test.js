import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { toDateInputValue } from "../utils/dates";

const times = ["17:00", "18:30", "20:00"];

// Renders the form with mock handlers and returns them for assertions.
const setup = (overrides = {}) => {
  const props = {
    availableTimes: times,
    dispatch: jest.fn(),
    submitForm: jest.fn(() => true),
    ...overrides,
  };
  render(<BookingForm {...props} />);
  return props;
};

const submitButton = () => screen.getByRole("button", { name: "Confirm reservation" });

test("renders every field with an accessible label", () => {
  setup();
  expect(screen.getByLabelText("Date")).toBeInTheDocument();
  expect(screen.getByLabelText("Time")).toBeInTheDocument();
  expect(screen.getByLabelText("Number of diners")).toBeInTheDocument();
  expect(screen.getByLabelText("Occasion")).toBeInTheDocument();
});

test("applies HTML validation attributes", () => {
  setup();
  const today = toDateInputValue(new Date());
  expect(screen.getByLabelText("Date")).toBeRequired();
  expect(screen.getByLabelText("Date")).toHaveAttribute("min", today);
  expect(screen.getByLabelText("Time")).toBeRequired();
  const diners = screen.getByLabelText("Number of diners");
  expect(diners).toBeRequired();
  expect(diners).toHaveAttribute("min", "1");
  expect(diners).toHaveAttribute("max", "10");
});

test("lists the available times", () => {
  setup();
  times.forEach((time) => expect(screen.getByRole("option", { name: time })).toBeInTheDocument());
});

test("submit is disabled until a time is chosen", () => {
  setup();
  expect(submitButton()).toBeDisabled();
  fireEvent.change(screen.getByLabelText("Time"), { target: { value: "18:30" } });
  expect(submitButton()).toBeEnabled();
});

test("asks for new times when the date changes", () => {
  const { dispatch } = setup();
  fireEvent.change(screen.getByLabelText("Date"), { target: { value: "2099-01-15" } });
  expect(dispatch).toHaveBeenCalledWith({ type: "UPDATE_TIMES", date: "2099-01-15" });
});

test("shows an error when the number of diners is too high", () => {
  setup();
  const diners = screen.getByLabelText("Number of diners");
  fireEvent.change(diners, { target: { value: "11" } });
  fireEvent.blur(diners);
  expect(screen.getByText(/between 1 and 10/)).toBeInTheDocument();
  expect(diners).toHaveAttribute("aria-invalid", "true");
});

test("shows an error when the number of diners is empty", () => {
  setup();
  const diners = screen.getByLabelText("Number of diners");
  fireEvent.change(diners, { target: { value: "" } });
  fireEvent.blur(diners);
  expect(screen.getByText("Please enter the number of diners.")).toBeInTheDocument();
});

test("shows an error for a date in the past", () => {
  setup();
  const date = screen.getByLabelText("Date");
  fireEvent.change(date, { target: { value: "2000-01-01" } });
  fireEvent.blur(date);
  expect(screen.getByText("Please choose today or a future date.")).toBeInTheDocument();
  expect(submitButton()).toBeDisabled();
});

test("tells the user when no times are available", () => {
  setup({ availableTimes: [] });
  expect(screen.getByText(/no free tables on this date/i)).toBeInTheDocument();
  expect(submitButton()).toBeDisabled();
});

test("submits the chosen values", () => {
  const { submitForm } = setup();
  fireEvent.change(screen.getByLabelText("Time"), { target: { value: "18:30" } });
  fireEvent.change(screen.getByLabelText("Occasion"), { target: { value: "Birthday" } });
  fireEvent.click(submitButton());
  expect(submitForm).toHaveBeenCalledWith({
    date: toDateInputValue(new Date()),
    time: "18:30",
    diners: 2,
    occasion: "Birthday",
  });
});

test("shows an alert when the submission fails", () => {
  setup({ submitForm: jest.fn(() => false) });
  fireEvent.change(screen.getByLabelText("Time"), { target: { value: "17:00" } });
  fireEvent.click(submitButton());
  expect(screen.getByRole("alert")).toHaveTextContent("We could not complete your reservation");
});
