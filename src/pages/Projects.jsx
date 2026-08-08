import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projects, categories } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import CaseStudyModal from "../components/CaseStudyModal";
import { useScrollReveal } from "../hooks/useScrollReveal";

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeYear, setActiveYear] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const years = ["All", ...Array.from(new Set(projects.map((p) => String(p.year)))).sort((a, b) => b - a)];

  const filtered = projects.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const yearMatch = activeYear === "All" || String(p.year) === activeYear;
    return catMatch && yearMatch;
  });

  return (
    <main className="projects-page">
      <div className="container">
        <section className="projects-header" aria-labelledby="projects-heading">
          <Reveal>
            <p className="projects-header__eyebrow">Full archive</p>
            <h1 className="projects-header__title" id="projects-heading">
              Everything I&apos;ve shipped
            </h1>
            <p className="projects-header__sub">
              {projects.length} projects, {new Set(projects.map((p) => p.year)).size} years. Side projects, coursework, and things I built because I wanted them to exist.
            </p>
          </Reveal>
        </section>

        <Reveal>
          <div className="projects-filters" role="toolbar" aria-label="Filter projects">
            <div className="projects-filters__group">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn${activeCategory === cat ? " filter-btn--active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="projects-filters__group">
              {years.map((yr) => (
                <button
                  key={yr}
                  className={`filter-btn filter-btn--year${activeYear === yr ? " filter-btn--active" : ""}`}
                  onClick={() => setActiveYear(yr)}
                  aria-pressed={activeYear === yr}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="projects-count">
          <span>{filtered.length} {filtered.length === 1 ? "project" : "projects"}</span>
        </div>

        <div className="projects-grid">
          {filtered.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 60}>
              <ProjectCard project={project} onSelect={setSelectedProject} />
            </Reveal>
          ))}
          {filtered.length === 0 && (
            <div className="projects-empty">
              <p>No projects match this filter.</p>
              <button className="filter-btn filter-btn--active" onClick={() => { setActiveCategory("All"); setActiveYear("All"); }}>
                Reset filters
              </button>
            </div>
          )}
        </div>

        <div className="projects-footer">
          <Link to="/" className="projects-footer__back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to home
          </Link>
        </div>
        {selectedProject && (
          <CaseStudyModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </div>
    </main>
  );
}
