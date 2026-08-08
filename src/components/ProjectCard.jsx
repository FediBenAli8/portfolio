import { useRef } from "react";

/**
 * ProjectCard
 *
 * Wrapped in .project-card-wrap which handles 3D parallax tilt rotation,
 * ambient background glows, frosted glass body depth, and cursor-reactive gradient masks.
 */
export default function ProjectCard({ project, large = false, onSelect }) {
  const wrapRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    
    // Relative coordinates
    const xVal = e.clientX - rect.left;
    const yVal = e.clientY - rect.top;
    
    const xPct = (xVal / rect.width) * 100;
    const yPct = (yVal / rect.height) * 100;
    
    el.style.setProperty("--mx", xPct.toFixed(1) + "%");
    el.style.setProperty("--my", yPct.toFixed(1) + "%");

    // 3D Tilt angles (max 15 degrees)
    const xRotation = -15 * ((yVal - rect.height / 2) / rect.height);
    const yRotation = 15 * ((xVal - rect.width / 2) / rect.width);
    
    el.style.transform = `perspective(1000px) rotateX(${xRotation.toFixed(2)}deg) rotateY(${yRotation.toFixed(2)}deg)`;
  };

  const handleMouseLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      className="project-card-wrap"
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect && onSelect(project)}
      style={{ cursor: onSelect ? "pointer" : "default" }}
    >
      {/* Visual Layer 1: Background Glow (Back Layer) */}
      <div className="project-card__glow-back" style={{ "--card-accent": project.color }} />

      {/* Visual Layer 2: Middle Frosted Glass Body */}
      <article
        className={`project-card${large ? " project-card--large" : ""}`}
        style={{ "--card-accent": project.color }}
      >
        <div className="project-card__thumb">
          <div className="project-card__thumb-bg" aria-hidden="true">
            <span className="project-card__thumb-title">{project.title}</span>
          </div>
          <div className="project-card__overlay"></div>
          <div className="project-card__actions" onClick={(e) => e.stopPropagation()}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__icon-btn"
                aria-label="View source on GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.138 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58C20.57 21.79 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
                </svg>
              </a>
            )}
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__icon-btn"
                aria-label="View live project"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Visual Layer 3: Foreground content (Text/Icons) */}
        <div className="project-card__body project-card__body--front">
          <div className="project-card__meta">
            <span className="project-card__category">{project.category}</span>
            <span className="project-card__year">{project.year}</span>
          </div>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__desc">{project.description}</p>
          <div className="project-card__tags">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
