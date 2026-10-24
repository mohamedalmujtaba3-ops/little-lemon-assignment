import { NavLink } from "react-router-dom";

// Primary navigation. NavLink adds the "active" class to the current page link.
export default function Nav() {
  return (
    <nav aria-label="Main navigation" className="main-nav">
      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/booking">Reservations</NavLink>
        </li>
      </ul>
    </nav>
  );
}
