import { useEffect, useRef } from "react";

/**
 * CaseStudyModal
 *
 * Frosted glass overlay showing detailed case study timeline for projects.
 * Follows the existing midnight-blue theme and electric-blue hover actions.
 */
export default function CaseStudyModal({ project, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const caseStudy = project.caseStudy || {
    timeline: "Ongoing",
    problem: "Not specified.",
    process: "Not specified.",
    outcome: "Not specified."
  };

  return (
    <div className="case-study-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="case-study-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ "--card-accent": project.color }}
        ref={modalRef}
      >
        <button className="case-study-modal__close" onClick={onClose} aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="case-study-modal__header">
          <span className="case-study-modal__category">{project.category}</span>
          <h2 className="case-study-modal__title">{project.title}</h2>
          <div className="case-study-modal__meta">
            <div className="case-study-modal__meta-item">
              <span className="meta-label">Timeline</span>
              <span className="meta-val">{caseStudy.timeline}</span>
            </div>
            <div className="case-study-modal__meta-item">
              <span className="meta-label">Year</span>
              <span className="meta-val">{project.year}</span>
            </div>
          </div>
        </div>

        <div className="case-study-modal__content">
          <p className="case-study-modal__long-desc">{project.longDescription}</p>

          <div className="case-study-modal__timeline-flow">
            <div className="timeline-node">
              <div className="timeline-node__label-wrap">
                <span className="timeline-node__number">01</span>
                <h4 className="timeline-node__label">Problem</h4>
              </div>
              <p className="timeline-node__text">{caseStudy.problem}</p>
            </div>

            <div className="timeline-node">
              <div className="timeline-node__label-wrap">
                <span className="timeline-node__number">02</span>
                <h4 className="timeline-node__label">Process</h4>
              </div>
              <p className="timeline-node__text">{caseStudy.process}</p>
            </div>

            <div className="timeline-node">
              <div className="timeline-node__label-wrap">
                <span className="timeline-node__number">03</span>
                <h4 className="timeline-node__label">Outcome</h4>
              </div>
              <p className="timeline-node__text">{caseStudy.outcome}</p>
            </div>
          </div>
        </div>

        <div className="case-study-modal__footer">
          <div className="case-study-modal__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="case-study-modal__actions">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="hero__cta" style={{ padding: "0.4rem 1.1rem" }}>
                <span>Codebase</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.138 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58C20.57 21.79 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
                </svg>
              </a>
            )}
            {project.link && project.link !== "#" && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="hero__cta" style={{ padding: "0.4rem 1.1rem" }}>
                <span>Live Site</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
