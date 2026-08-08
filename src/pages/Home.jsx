import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { featuredProjects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import CaseStudyModal from "../components/CaseStudyModal";
import { useScrollReveal } from "../hooks/useScrollReveal";

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const text = textRef.current;
    if (!hero || !text) return;

    const onMove = (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      text.style.transform = `translate(${x * 22}px, ${y * 14}px)`;
    };

    const onLeave = () => {
      text.style.transform = "translate(0,0)";
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef} aria-label="Introduction">
      <div className="hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__status-dot" aria-hidden="true"></span>
          <span>Available for internships &amp; collaborations</span>
        </div>

        <div className="hero__text" ref={textRef}>
          <h1 className="hero__name">
            Fedi<br />Ben Ali
          </h1>
          <p className="hero__tagline">
            I build things that run fast<br className="hero__br" /> and feel good to use.
          </p>
        </div>

        <div className="hero__sub">
          <p className="hero__desc">
            Full-stack developer & CS student at ISTIC borj cedria.<br />
            Backend-curious, frontend-obsessed.
          </p>
          <a href="#work" className="hero__cta" onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}>
            See my work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <span>scroll</span>
        <span className="hero__scroll-line"></span>
      </div>
    </section>
  );
}

// ─── Featured Work ─────────────────────────────────────────────────────────────
function FeaturedWork({ onSelectProject }) {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      const progress = (el.scrollLeft / maxScroll) * 100;
      setScrollProgress(progress);
    };

    const handleWheel = (e) => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;
      const reachedEnd = el.scrollLeft >= maxScroll - 1;
      const reachedStart = el.scrollLeft <= 0;

      if ((isScrollingDown && !reachedEnd) || (isScrollingUp && !reachedStart)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    el.addEventListener("wheel", handleWheel, { passive: false });
    handleScroll();

    return () => {
      el.removeEventListener("scroll", handleScroll);
      el.removeEventListener("wheel", handleWheel);
    };
  }, []); return (
    <section className="section work" id="work" aria-labelledby="work-heading">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title" id="work-heading">Selected work</h2>
            <span className="section-count">{featuredProjects.length} projects</span>
          </div>
        </Reveal>

        <div className="work__scroll-wrapper">
          <div className="work__scroll-container" ref={scrollRef}>
            {featuredProjects.map((project) => (
              <div className="work__scroll-item" key={project.id}>
                <ProjectCard project={project} onSelect={onSelectProject} />
              </div>
            ))}
          </div>
        </div>

        <div className="work__scroll-footer">
          <div className="work__progress-track">
            <div className="work__progress-bar" style={{ width: `${scrollProgress}%` }} />
          </div>

          <Link to="/projects" className="work__all-link">
            View all projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      <div className="container">
        <div className="about__grid">
          <div className="about__copy">
            <Reveal>
              <h2 className="section-title" id="about-heading">About</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="about__text">I'm a final-year Computer Science student finishing my degree who started coding to build the full-stack web applications I wished existed. Those early builds taught me the realities of shipping real code—from designing solid backend architectures to refactoring entire user flows—and taught me far more than any coursework could.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="about__text">
                Since then, I’ve built microservices to process real-time cursor telemetry into heatmaps, developed multi-modal search engines, and designed role-based project platforms. Working across TypeScript, Angular, Python, Express.js, and PostgreSQL, I focus on bridging scalable API design with polished UI/UX—including modern web integrations like 3D elements that elevate the user experience. I care deeply about the craft: intuitive interfaces, clean data flow, and software that holds up under load.</p>
            </Reveal>
            <Reveal delay={240}>
              <p className="about__text">
                When I'm not in front of a terminal: playing chess, studying Japanese, or experimenting with new recipes in the kitchen.
              </p>
            </Reveal>
          </div>

          <Reveal className="about__photo-wrap">
            <div className="about__photo-frame">
              <div className="about__photo-placeholder" aria-label="Photo of Alex Mercer">
                <img src="https://avatars.githubusercontent.com/u/101462496?size=400&u=4493f6bf8919ac65ee56cd0c02c97624a520dd3f&v=4" alt="my picture" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Timeline ──────────────────────────────────────────────────────────────────
const timelineEvents = [
  {
    date: "2024 — PRESENT",
    title: "Computer Science Student",
    subtitle: "ISTIC Borj Cedria",
    desc: "Focusing on systems programming, algorithmic foundations, web architectures, and full-stack development methodologies.",
  },
  {
    date: "2023 — 2024",
    title: "Freelance Full Stack Developer",
    subtitle: "Self-Employed",
    desc: "Designed and developed highly responsive React applications, optimized REST APIs, and managed database design for local businesses.",
  },
  {
    date: "2022 — 2023",
    title: "Open Source Contributor & Game Prototype Maker",
    subtitle: "GitHub & Side Projects",
    desc: "Explored real-time communication protocols using WebSockets. Built 2D Canvas-based game engines and contributed to community tools.",
  },
  {
    date: "2021",
    title: "Started Coding Journey",
    subtitle: "Initial Steps",
    desc: "Began writing Python automation scripts, diving deep into Unix systems, core terminal tooling, and basic web building blocks.",
  },
];

function Timeline() {
  return (
    <section className="section timeline" id="timeline" aria-labelledby="timeline-heading">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title" id="timeline-heading">Timeline</h2>
            <p className="section-subtitle">A brief overview of my journey so far</p>
          </div>
        </Reveal>

        <div className="timeline__container">
          <div className="timeline__track"></div>
          {timelineEvents.map((event, idx) => (
            <Reveal key={idx} delay={idx * 80} className="timeline__item">
              <div className="timeline__badge"></div>
              <div className="timeline__card">
                <div className="timeline__date">{event.date}</div>
                <h3 className="timeline__title">{event.title}</h3>
                <div className="timeline__subtitle">{event.subtitle}</div>
                <p className="timeline__desc">{event.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ─────────────────────────────────────────────────────────────────────
const skillGroups = [
  {
    label: "Languages",
    skills: ["Python", "JavaScript / TypeScript", "C", "MySQL"],
  },
  {
    label: "Frontend",
    skills: ["React", "Angular", "Bootstrap", "Tailwind CSS"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "FastAPI", "PostgreSQL + pgvector", "WebSockets"],
  },
  {
    label: "Tools",
    skills: ["Docker", "Nginx", "Git", "Linux (daily driver)", "Figma"],
  },
];

function Skills() {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title" id="skills-heading">Stack</h2>
            <p className="section-subtitle">What I reach for, and why</p>
          </div>
        </Reveal>

        <div className="skills__grid">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 60}>
              <div className="skills__group">
                <h3 className="skills__group-label">{group.label}</h3>
                <ul className="skills__list">
                  {group.skills.map((s) => (
                    <li key={s} className="skills__item">
                      <span className="skills__dot" aria-hidden="true"></span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <Reveal>
          <div className="contact__inner">
            <p className="contact__pre">Get in touch</p>
            <h2 className="contact__headline" id="contact-heading">
              Have something to build?
            </h2>
            <p className="contact__sub">
              Currently open to summer internships and side projects worth losing sleep over.
            </p>
            <a href="mailto:fedibenali8@gmail.com" className="contact__email">
              fedibenali8@gmail.com
            </a>
            <div className="contact__links">
              <a href="https://github.com/FediBenAli8" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                GitHub
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/fedi-ben-ali-359397235/" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                LinkedIn
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Hero />
      <FeaturedWork onSelectProject={setSelectedProject} />
      <About />
      <Timeline />
      <Skills />
      <Contact />
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  );
}
