import { Link } from "react-router-dom";
import Nav from "./Nav";

// Site header with a skip link for keyboard users, the brand link and the main navigation.
export default function Header() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Little Lemon home">
          Little Lemon
        </Link>
        <Nav />
      </div>
    </header>
  );
}
