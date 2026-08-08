import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/**
 * CommandMenu
 *
 * Glassmorphic command control center HUD toggled via Cmd+K or trigger.
 * Fully keyboard navigable (Arrow keys + Enter + Escape).
 */
export default function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const actions = [
    { label: "Go to Projects Archive", value: "/projects", type: "nav" },
    { label: "Go to Home Page", value: "/", type: "nav" },
    { label: "Scroll to About Mercer", value: "about", type: "scroll" },
    { label: "Scroll to Contact / Hiring", value: "contact", type: "scroll" },
    { label: "Toggle Theme (Light / Dark)", value: "theme", type: "theme" },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.value.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleAction = (action) => {
    setIsOpen(false);
    if (action.type === "nav") {
      navigate(action.value);
    } else if (action.type === "scroll") {
      if (window.location.pathname !== "/") {
        window.location.href = `/#${action.value}`;
        return;
      }
      document.getElementById(action.value)?.scrollIntoView({ behavior: "smooth" });
    } else if (action.type === "theme") {
      const toggleBtn = document.querySelector(".nav__theme-btn");
      toggleBtn?.click();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) {
        handleAction(filtered[activeIndex]);
      }
    }
  };

  return (
    <>
      <button 
        className="hud-trigger-btn" 
        onClick={() => setIsOpen(true)}
        aria-label="Open command menu"
      >
        <span className="hud-trigger-icon">⌘</span>
        <span className="hud-trigger-text">CMD+K</span>
      </button>

      {isOpen && (
        <div className="hud-overlay" onClick={() => setIsOpen(false)}>
          <div className="hud-modal" onClick={(e) => e.stopPropagation()}>
            <div className="hud-search-box">
              <svg className="hud-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="hud-input"
                placeholder="Search commands (e.g. /projects)..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
              />
              <span className="hud-esc-badge">ESC</span>
            </div>

            <div className="hud-results">
              {filtered.map((action, idx) => (
                <div
                  key={action.label}
                  className={`hud-item ${idx === activeIndex ? "hud-item--active" : ""}`}
                  onClick={() => handleAction(action)}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  <span className="hud-item-cmd">
                    {action.type === "scroll" ? "/" : ""}{action.value}
                  </span>
                  <span className="hud-item-label">{action.label}</span>
                  <span className="hud-enter-badge">↵</span>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="hud-no-results">No actions found. Try typing another query.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
