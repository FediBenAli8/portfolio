// ─── Project Data ─────────────────────────────────────────────────────────────
// Add a new object here to publish it everywhere on the site.

export const projects = [
  {
    id: "nursery e-store",
    title: "Nursery e-store",
    description: "E-store for plants and gardening equipment with AI-powered plant care recommendations.",
    longDescription: "Built with EJS, Express.js, MySQL, and Tailwind CSS. Custom AI-powered plant care recommendations using Gemini API. Handles thousands of products with advanced search and filtering. Fully responsive and optimized for mobile and desktop. Integrated with Stripe for payments and SendGrid for email notifications.",
    tags: ["EJS", "TailwindCSS", "JavaScript", "Node.js", "MySQL", "DevOps"],
    category: "Fullstack",
    year: 2023,
    featured: false,
    color: "#34D399",
    link: "#",
    github: "https://github.com/FediBenAli8/Ecommerce",
    caseStudy: {
      timeline: "4 Weeks",
      problem: "Online shoppers frequently abandon purchases due to slow page load times, complex checkout flows, and unresponsive inventory management across dynamic carts.",
      process: "Engineered a full-stack e-commerce web application featuring modular UI components, secure RESTful APIs, JWT authentication, dynamic client-side state management for the shopping cart, and Stripe payment gateway integration.",
      outcome: "Delivered a fully responsive online store with fast product browsing, automated checkout processing, and an administrative dashboard for real-time product catalog and order management."
    }
  },
  {
    id: "PharmaLab",
    title: "PharmaLab",
    description: "Pharmacuetical inventory and lab management system.",
    longDescription: "Canvas API pixel editor with a custom CRDT for live multi-user editing. History stored as diff stacks — rewind any change non-destructively. Exports to PNG, GIF, or sprite sheet.",
    tags: ["EJS", "TailwindCSS", "JavaScript", "Node.js", "Algorithms", "MySQL"],
    category: "Fullstack",
    year: 2025,
    featured: false,
    color: "#F472B6",
    link: "#",
    github: "https://github.com/FediBenAli8/Pharmalab",
    caseStudy: {
      timeline: "4 Weeks",
      problem: "Manual inventory tracking and fragmented communication between pharmaceutical laboratories and pharmacies lead to order delays, stock discrepancies, and inefficient supply chain management.",
      process: "Engineered a web application using EJS for rendering, powered by a Node.js backend to implement optimization algorithms, Constraint Satisfaction Problem (CSP) solvers, and secure API endpoints.",
      outcome: "Bridged the digital gap between labs and pharmacies with a centralized platform for real-time stock monitoring, automated order workflows, and intelligent inventory distribution."
    }
  },
  {
    id: "TaskAura",
    title: "TaskAura",
    description: "Team collaboration and task management platform designed to streamline project workflows and enhance productivity.",
    longDescription: "Full-stack project management platform for teams to organize tasks, streamline communication, and track progress. Built with a high-performance REST backend and containerized microservice-ready environment.",
    tags: ["FastAPI", "Angular", "MySQL", "Docker", "Python"],
    category: "Fullstack",
    year: 2026,
    featured: true,
    color: "#60A5FA",
    link: "#",
    github: "https://github.com/FediBenAli8/Project-management-system",
    caseStudy: {
      timeline: "4 Weeks",
      problem: "Teams often struggle with fragmented communication tools and scattered task tracking, leading to poor visibility across project milestones and reduced productivity.",
      process: "Architected a scalable REST API using FastAPI and MySQL for relational data management, fully containerized with Docker. Designed a responsive, modular dashboard interface in Angular to enable seamless task creation, status tracking, and team workflow management.",
      outcome: "Delivered an end-to-end workspace platform that unifies project management and team communication into a single, high-performance interface."
    }
  },
  {
    id: "Cybiris",
    title: "Cybiris",
    description: "Interactive 3D landing page and user engagement tracking system with real-time visual heatmaps.",
    longDescription: "Frontend interface featuring immersive 3D scene rendering, fluid motion graphics, and continuous real-time cursor tracking to map user engagement behaviors directly on the client side.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Spline"],
    category: "Frontend",
    year: 2026,
    featured: true,
    color: "#FBBF24",
    link: "https://aquamarine-kashata-b10412.netlify.app/",
    github: "#",
    caseStudy: {
      timeline: "4 Weeks",
      problem: "Traditional static landing pages often struggle to maintain high user engagement and fail to capture granular visual interaction data on how visitors explore page elements.",
      process: "Built an immersive 3D interface combining Spline and Three.js for interactive models, driven by React and TypeScript. Integrated Framer Motion and Tailwind CSS for smooth micro-interactions, alongside continuous event listeners that stream user cursor and scroll coordinates asynchronously.",
      outcome: "Created an engaging, interactive UI that captures high-density user engagement data while maintaining fluid 60 FPS performance."
    }
  }
];

export const categories = ["All", "Fullstack", "Frontend", "Backend"];
export const featuredProjects = projects.filter((p) => p.featured);
