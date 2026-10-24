import { Link, useLocation } from "react-router-dom";
import { parseDateInput } from "../utils/dates";

// Confirmation page. The reservation details arrive through the router state.
export default function ConfirmedBooking() {
  const { state } = useLocation();

  // Edge case: the page was opened directly, without a reservation.
  if (!state) {
    return (
      <section className="page" aria-labelledby="confirmed-title">
        <div className="section-inner narrow">
          <h1 id="confirmed-title">No reservation found</h1>
          <p>We could not find a reservation to show. Please make a new one.</p>
          <Link to="/booking" className="button">
            Book a table
          </Link>
        </div>
      </section>
    );
  }

  const formattedDate = parseDateInput(state.date).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="page" aria-labelledby="confirmed-title">
      <div className="section-inner narrow">
        <h1 id="confirmed-title">Reservation confirmed</h1>
        <p role="status">Thank you. Your table is booked.</p>
        <dl className="summary">
          <div>
            <dt>Date</dt>
            <dd>{formattedDate}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{state.time}</dd>
          </div>
          <div>
            <dt>Diners</dt>
            <dd>{state.diners}</dd>
          </div>
          <div>
            <dt>Occasion</dt>
            <dd>{state.occasion}</dd>
          </div>
        </dl>
        <Link to="/" className="button">
          Back to home
        </Link>
      </div>
    </section>
  );
}
