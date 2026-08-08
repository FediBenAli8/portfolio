import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <Link to="/" className="footer__logo">Alex.dev</Link>
        <nav className="footer__nav" aria-label="Footer navigation">
          <Link to="/" className="footer__link">Home</Link>
          <Link to="/projects" className="footer__link">Projects</Link>
        </nav>
        <p className="footer__copy">
          &copy; {year} Alex Mercer. Built with intention.
        </p>
      </div>
    </footer>
  );
}
