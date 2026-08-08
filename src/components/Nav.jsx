import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <Link to="/" className="nav__logo" aria-label="Home">
        <span className="nav__logo-dot"></span>
        <span>Fedi.dev</span>
      </Link>

      <nav className={`nav__links${menuOpen ? " nav__links--open" : ""}`} aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => `nav__link${isActive ? " nav__link--active" : ""}`}>
          Home
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `nav__link${isActive ? " nav__link--active" : ""}`}>
          Projects
        </NavLink>
        <button className="nav__link nav__link--btn" onClick={() => scrollTo("about")}>About</button>
        <button className="nav__link nav__link--btn" onClick={() => scrollTo("contact")}>Contact</button>
      </nav>

      <div className="nav__actions">
        <button
          className="nav__theme-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
