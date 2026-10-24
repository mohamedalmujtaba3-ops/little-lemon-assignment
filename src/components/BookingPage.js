import BookingForm from "./BookingForm";

// Booking page. State and handlers are owned by App and passed down as props.
export default function BookingPage({ availableTimes, dispatch, submitForm }) {
  return (
    <section className="page" aria-labelledby="booking-title">
      <div className="section-inner narrow">
        <h1 id="booking-title">Book a table</h1>
        <p>Choose a date, time and the number of diners to reserve your table.</p>
        <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
      </div>
    </section>
  );
}
