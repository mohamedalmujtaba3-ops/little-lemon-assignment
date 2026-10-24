import { Link } from "react-router-dom";

// Site footer with the restaurant name, secondary navigation and contact details.
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <section aria-labelledby="footer-brand">
          <h2 id="footer-brand">Little Lemon</h2>
          <p>Family owned Mediterranean restaurant.</p>
        </section>
        <nav aria-label="Footer navigation">
          <h2>Navigate</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/booking">Reservations</Link>
            </li>
          </ul>
        </nav>
        <address>
          <h2>Contact</h2>
          <p>
            <a href="mailto:hello@littlelemon.example">hello@littlelemon.example</a>
          </p>
          <p>
            <a href="tel:+10000000000">+1 000 000 0000</a>
          </p>
        </address>
      </div>
    </footer>
  );
}
