import { useReducer } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import BookingPage from "./components/BookingPage";
import ConfirmedBooking from "./components/ConfirmedBooking";
import { submitAPI } from "./api";
import { initializeTimes, updateTimes } from "./utils/times";
import "./App.css";

// Root component. Owns the available times state and the reservation submission,
// and defines the application routes.
export default function App() {
  const navigate = useNavigate();
  const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);

  // Sends the reservation and opens the confirmation page when it succeeds.
  const submitForm = (formData) => {
    const succeeded = submitAPI(formData);
    if (succeeded) {
      navigate("/confirmed", { state: formData });
    }
    return succeeded;
  };

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/booking"
            element={
              <BookingPage availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
            }
          />
          <Route path="/confirmed" element={<ConfirmedBooking />} />
          {/* Fallback for unknown addresses */}
          <Route
            path="*"
            element={
              <section className="page">
                <div className="section-inner narrow">
                  <h1>Page not found</h1>
                  <p>The page you are looking for does not exist.</p>
                </div>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
