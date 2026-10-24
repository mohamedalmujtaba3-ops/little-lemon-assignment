import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Renders the app at a given route inside an in-memory router.
const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

test("home page shows the restaurant name and a reservation link", () => {
  renderAt("/");
  expect(screen.getByRole("heading", { level: 1, name: "Little Lemon" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Reserve a table" })).toHaveAttribute("href", "/booking");
});

test("booking page shows the booking form", () => {
  renderAt("/booking");
  expect(screen.getByRole("heading", { level: 1, name: "Book a table" })).toBeInTheDocument();
  expect(screen.getByLabelText("Number of diners")).toBeInTheDocument();
});

test("confirmation page without data explains what to do", () => {
  renderAt("/confirmed");
  expect(screen.getByRole("heading", { name: "No reservation found" })).toBeInTheDocument();
});

test("unknown routes show a not found message", () => {
  renderAt("/missing");
  expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
});

test("page has main landmarks", () => {
  renderAt("/");
  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
});
