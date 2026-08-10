"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const NAV_SECTIONS = ["work", "skills", "experience", "achievements", "about", "contact"];

const NAV_LABELS = {
  work: "Projects",
  skills: "Skills",
  experience: "Experience",
  achievements: "Achievements",
  about: "About",
  contact: "Contact",
};

const SKILL_CATEGORIES = [
  { id: "query", label: "Querying & Prep", color: "var(--accent)" },
  { id: "viz", label: "Visualization & BI", color: "var(--amber)" },
  { id: "infra", label: "Data Infra & Cloud", color: "var(--cat-green)" },
  { id: "cloud", label: "Cloud & Infrastructure", color: "var(--cat-teal)" },
  { id: "aiml", label: "AI/ML & DevOps", color: "var(--cat-rust)" },
  { id: "tools", label: "Tools", color: "var(--cat-violet)" },
  { id: "soft", label: "Soft Skills", color: "var(--cat-rose)" },
];

const SKILLS = [
  { name: "SQL", cat: "query", url: "https://en.wikipedia.org/wiki/SQL" },
  { name: "MySQL", cat: "query", url: "https://www.mysql.com/" },
  { name: "Python", cat: "query", url: "https://www.python.org/" },
  { name: "Excel", cat: "query", url: "https://www.microsoft.com/en-us/microsoft-365/excel" },
  { name: "Data Cleaning & Validation", cat: "query", url: null },
  { name: "Statistical Analysis", cat: "query", url: null },
  { name: "Tableau", cat: "viz", url: "https://www.tableau.com/" },
  { name: "Power BI", cat: "viz", url: "https://powerbi.microsoft.com/" },
  { name: "Looker", cat: "viz", url: "https://cloud.google.com/looker" },
  { name: "Google Analytics 4", cat: "viz", url: "https://marketingplatform.google.com/about/analytics/" },
  { name: "Salesforce Marketing Cloud", cat: "viz", url: "https://www.salesforce.com/products/marketing-cloud/" },
  { name: "dbt", cat: "infra", url: "https://www.getdbt.com/" },
  { name: "Snowflake", cat: "infra", url: "https://www.snowflake.com/" },
  { name: "DuckDB", cat: "infra", url: "https://duckdb.org/" },
  { name: "Azure", cat: "infra", url: "https://azure.microsoft.com/" },
  { name: "BigQuery", cat: "infra", url: "https://cloud.google.com/bigquery" },
  { name: "AWS", cat: "cloud", url: "https://aws.amazon.com/" },
  { name: "GCP", cat: "cloud", url: "https://cloud.google.com/" },
  { name: "Kubernetes", cat: "cloud", url: "https://kubernetes.io/" },
  { name: "Docker", cat: "cloud", url: "https://www.docker.com/" },
  { name: "Terraform", cat: "cloud", url: "https://www.terraform.io/" },
  { name: "Linux", cat: "cloud", url: null },
  { name: "Bash", cat: "cloud", url: null },
  { name: "LLMs", cat: "aiml", url: null },
  { name: "RAG", cat: "aiml", url: null },
  { name: "LangChain", cat: "aiml", url: "https://www.langchain.com/" },
  { name: "FAISS", cat: "aiml", url: "https://faiss.ai/" },
  { name: "PyTorch", cat: "aiml", url: "https://pytorch.org/" },
  { name: "Hugging Face", cat: "aiml", url: "https://huggingface.co/" },
  { name: "TensorFlow", cat: "aiml", url: "https://www.tensorflow.org/" },
  { name: "Prompt Engineering", cat: "aiml", url: null },
  { name: "CI/CD", cat: "aiml", url: null },
  { name: "GitLab", cat: "aiml", url: "https://about.gitlab.com/" },
  { name: "JUnit", cat: "aiml", url: null },
  { name: "Git / GitHub", cat: "tools", url: "https://github.com/" },
  { name: "Streamlit", cat: "tools", url: "https://streamlit.io/" },
  { name: "Critical Thinking & Problem Solving", cat: "soft", url: null },
  { name: "Data Storytelling & Communication", cat: "soft", url: null },
  { name: "Business Acumen", cat: "soft", url: null },
  { name: "Stakeholder Collaboration", cat: "soft", url: null },
  { name: "Attention to Detail", cat: "soft", url: null },
  { name: "Adaptability", cat: "soft", url: null },
];

const EXPERIENCE = [
  {
    date: "Jun 2025 – May 2026",
    role: "Marketing Analytics Specialist",
    org: "Arizona State University, Tempe, AZ",
    url: "https://www.asu.edu/",
    bullets: [
      "Built Excel- and SQL-based dashboards giving marketing and enrollment teams real-time visibility into campaign performance, increasing revenue by 15% across 5+ university initiatives.",
      "Analyzed GA4 and campaign data to identify underperforming segments, driving a 10x increase in email open rates (0.2% → 2.67%).",
    ],
  },
  {
    date: "May 2025 – Jul 2025",
    role: "Research Aide",
    org: "Arizona State University, Tempe, AZ",
    url: "https://www.asu.edu/",
    bullets: [
      "Built Python and SQL validation checks to flag data quality issues across 10,000+ AI-generated outputs, reducing manual review time to zero.",
      "Built reusable Python and SQL pipelines to process and report on 10,000+ evaluation records, accelerating throughput.",
    ],
  },
  {
    date: "Jan 2025 – May 2025",
    role: "Writing Resource Creator",
    org: "Arizona State University, Tempe, AZ",
    url: "https://www.asu.edu/",
    bullets: [
      "Used AI tools to create and optimize web and social content for university pages, applying prompt iteration and editorial judgment to align output with brand voice.",
    ],
  },
  {
    date: "Jan 2024 – May 2024",
    role: "Data Scientist",
    org: "Deepak Cybit Private Limited, India",
    url: null,
    bullets: [
      "Analyzed 50,000+ daily sensor records in Python and Excel to identify early equipment failure signals, reducing unplanned downtime costs by 15%.",
      "Designed Tableau dashboards tracking downtime and maintenance KPIs, informing resource allocation decisions for operations leadership.",
    ],
  },
  {
    date: "Nov 2023 – Feb 2024",
    role: "Python Developer",
    org: "Slashmark, Vadodara, India",
    url: null,
    bullets: [
      "Developed Text-to-Speech (TTS) applications using Python, enhancing accessibility features used by 15 team members across departments.",
      "Contributed to an AI chatbot, integrating ML models to improve NLP and conversational capabilities.",
    ],
  },
  {
    date: "May 2023 – Jul 2023",
    role: "Summer Intern",
    org: "Intel Corporation, India",
    url: "https://www.intel.com/",
    bullets: [
      "Analyzed transaction logs using Python and SQL to identify performance bottlenecks in ATM systems, improving processing speed by 25%.",
      "Built an automated monitoring dashboard across 200+ ATM units, cutting failure detection time by 60%.",
    ],
  },
];

const ACHIEVEMENTS = [
  {
    title: "Selected to work with a NASA open dataset",
    tag: "NASA",
    tagUrl: "https://data.nasa.gov/",
    body:
      "Selected for a project working with NASA's open dataset. I'm helping with their research as a volunteer.",
  },
  {
    title: "1st Place, Social Blitz Award — Kiro Hackathon",
    tag: "CIVICIVI",
    tagUrl: "https://civicivi.vercel.app",
    body: "Won the Social Blitz award at the Kiro Hackathon for CiviCivi.",
  },
  {
    title: "Founder & Lead, STEM for Women Club",
    tag: "PARUL UNIVERSITY",
    tagUrl: "https://paruluniversity.ac.in/",
    body: "Created and led a club supporting women in STEM at Parul University.",
  },
  {
    title: "Intel Unnati Internship, 1 of 3 selected",
    tag: "INTEL",
    tagUrl: "https://www.intel.com/",
    body: "Selected as one of three candidates for the Intel Unnati internship program.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCat, setActiveCat] = useState("all");
  const [activeNav, setActiveNav] = useState("");
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const sections = NAV_SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean
    );
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => navObserver.observe(s));
    return () => navObserver.disconnect();
  }, []);

  const renderSkillPill = (skill) => {
    const dimmed = activeCat !== "all" && skill.cat !== activeCat;
    const dot = (
      <span
        className="cat-dot"
        style={{ background: SKILL_CATEGORIES.find((c) => c.id === skill.cat).color }}
      ></span>
    );
    if (skill.url) {
      return (
        <a
          key={skill.name}
          className={`pill${dimmed ? " dim" : ""}`}
          href={skill.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {dot}
          {skill.name}
        </a>
      );
    }
    return (
      <span key={skill.name} className={`pill plain${dimmed ? " dim" : ""}`}>
        {dot}
        {skill.name}
      </span>
    );
  };

  return (
    <>
      {/* ============ NAV ============ */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#top" className="brand">
            A. <span>DESAI</span>
          </a>
          <div className="nav-links">
            {NAV_SECTIONS.slice(0, -1).map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeNav === id ? "active" : ""}
              >
                {NAV_LABELS[id]}
              </a>
            ))}
            <a href="#contact" className="nav-cta">
              Contact
            </a>
          </div>
          <button
            className="menu-btn"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {NAV_SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {NAV_LABELS[id]}
            </a>
          ))}
        </div>
      </nav>

      <div id="top"></div>

      {/* ============ HERO ============ */}
      <header className="hero">
        <div className="wrap hero-inner">
          <div className="eyebrow reveal" ref={addRevealRef}>
            <span className="dot"></span>Open to Data Analyst, Analytics
            Engineer &amp; ML Engineer roles
          </div>
          <h1 className="reveal" ref={addRevealRef}>
            I turn messy data into decisions people can <em>act on.</em>
          </h1>
          <p className="hero-sub reveal" ref={addRevealRef}>
            Data Analyst with an MS in Computer Science from Arizona State
            University. I build SQL and Python pipelines, dbt models, and
            Tableau/Power BI dashboards that give teams real-time visibility
            instead of static reports.
          </p>
          <div className="hero-actions reveal" ref={addRevealRef}>
            <a href="#work" className="btn-primary">
              See the work →
            </a>
            <a href="#about" className="btn-secondary">
              How I work
            </a>
          </div>
          <div className="stat-row reveal" ref={addRevealRef}>
            <div className="stat">
              <div className="num">4.00</div>
              <div className="label">GPA, MS Computer Science, ASU</div>
            </div>
            <div className="stat">
              <div className="num">10×</div>
              <div className="label">email engagement lift from GA4 analysis</div>
            </div>
            <div className="stat">
              <div className="num">15%</div>
              <div className="label">revenue growth across 5+ initiatives</div>
            </div>
          </div>
        </div>
      </header>

      {/* ============ METHOD (blue band) ============ */}
      <section className="row band-blue" id="method">
        <span className="row-tag">METHOD</span>
        <div className="wrap">
          <span className="row-tag-mobile">Method</span>
          <div className="section-head reveal" ref={addRevealRef}>
            <h2>How I work through a dataset</h2>
            <p>
              The same loop, whether it&apos;s a marketing funnel, a sensor
              feed, or a budget model.
            </p>
          </div>
          <div className="method-grid reveal" ref={addRevealRef}>
            <div className="method-cell">
              <div className="idx mono">01</div>
              <h4>Scope the question</h4>
              <p>
                Pin down the decision the data actually needs to inform
                before touching a query.
              </p>
            </div>
            <div className="method-cell">
              <div className="idx mono">02</div>
              <h4>Clean &amp; model</h4>
              <p>
                SQL / dbt / Python to validate, join, and shape raw sources
                into something trustworthy.
              </p>
            </div>
            <div className="method-cell">
              <div className="idx mono">03</div>
              <h4>Analyze</h4>
              <p>
                Look for the segment, trend, or anomaly that actually changes
                a decision.
              </p>
            </div>
            <div className="method-cell">
              <div className="idx mono">04</div>
              <h4>Report &amp; automate</h4>
              <p>
                Ship a dashboard or pipeline so the answer stays current
                without manual rework.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WORK / PROJECTS (tinted band) ============ */}
      <section className="row band-tint" id="work">
        <span className="row-tag">PROJECTS</span>
        <div className="wrap">
          <span className="row-tag-mobile">Projects</span>
          <div className="section-head reveal" ref={addRevealRef}>
            <span className="section-count">5 featured builds</span>
            <h2 style={{ marginTop: "10px" }}>Recent projects</h2>
            <p>
              AI-assisted tooling, financial infrastructure, and analytics
              work with real repos or live sites behind it.
            </p>
          </div>

          <div className="project-grid">
            {/* MeetingMind */}
            <article className="project-card reveal" ref={addRevealRef}>
              <div className="project-visual">
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="14" y="20" width="92" height="64" rx="4" stroke="#2F44D6" strokeWidth="2.5" />
                  <path d="M28 36h44M28 46h64M28 56h52M28 66h30" stroke="#2F44D6" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
                  <circle cx="60" cy="98" r="4" fill="#2F44D6" />
                  <path d="M60 84v10" stroke="#2F44D6" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="project-body">
                <div className="project-top">
                  <h3>MeetingMind</h3>
                  <span className="tag tag-progress">In progress</span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--ink-faint)", marginTop: "4px" }}>
                  AI Meeting Assistant with Cross-Meeting Memory
                </p>
                <p className="desc">
                  Built an AI-powered meeting assistant using faster-whisper,
                  Ollama (Llama 3.1), and DuckDB to transcribe, summarize,
                  and structure meeting data, enabling searchable
                  cross-meeting insights and automated reporting.
                </p>
                <div className="stack-row">
                  <span className="stack-pill">faster-whisper</span>
                  <span className="stack-pill">Ollama · Llama 3.1</span>
                  <span className="stack-pill">DuckDB</span>
                  <span className="stack-pill">Python</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/ayushid543/MeetingMind" target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                </div>
              </div>
            </article>

            {/* DriverPlan */}
            <article className="project-card reveal" ref={addRevealRef}>
              <div className="project-visual">
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 92V50l18-14 18 20 18-30 18 22 12-10v54H18z" stroke="#2F44D6" strokeWidth="2.5" strokeLinejoin="round" />
                  <line x1="18" y1="92" x2="102" y2="92" stroke="#2F44D6" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="project-body">
                <div className="project-top">
                  <h3>DriverPlan</h3>
                  <span className="tag tag-progress">In progress</span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--ink-faint)", marginTop: "4px" }}>
                  Driver-Based Financial Planning &amp; Forecasting
                </p>
                <p className="desc">
                  Built a driver-based FP&amp;A platform (Python, dbt,
                  DuckDB, Streamlit) automating budget-vs-actual variance
                  analysis and rolling 24-month forecasts, with direct
                  experience reconciling financial data and building
                  audit-ready reporting.
                </p>
                <div className="stack-row">
                  <span className="stack-pill">Python</span>
                  <span className="stack-pill">dbt</span>
                  <span className="stack-pill">DuckDB</span>
                  <span className="stack-pill">Streamlit</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/ayushid543" target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                </div>
              </div>
            </article>

            {/* Spotify Creator Growth Analytics */}
            <article className="project-card reveal" ref={addRevealRef}>
              <div className="project-visual">
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="60" r="40" stroke="#2F44D6" strokeWidth="2.5" />
                  <path d="M40 52c14-6 28-6 40 2M40 62c12-5 24-5 34 2M42 72c9-4 19-4 27 2" stroke="#2F44D6" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="project-body">
                <div className="project-top">
                  <h3>Spotify Creator Growth Analytics</h3>
                  <span className="tag tag-live">Repo</span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--ink-faint)", marginTop: "4px" }}>
                  Creator Health Score &amp; cohort insights
                </p>
                <p className="desc">
                  Queried and analyzed 86,000+ artists using SQL, dbt, and
                  Python to build a Creator Health Score and deliver
                  cohort/funnel insights for Discovery Mode, Marquee, and
                  Showcase.
                </p>
                <div className="stack-row">
                  <span className="stack-pill">SQL</span>
                  <span className="stack-pill">dbt</span>
                  <span className="stack-pill">Python</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/ayushid543/spotify-creator-analytics" target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                </div>
              </div>
            </article>

            {/* NYC Taxi Analytics */}
            <article className="project-card reveal" ref={addRevealRef}>
              <div className="project-visual">
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="46" width="80" height="28" rx="6" stroke="#2F44D6" strokeWidth="2.5" />
                  <circle cx="38" cy="78" r="7" stroke="#2F44D6" strokeWidth="2.5" />
                  <circle cx="82" cy="78" r="7" stroke="#2F44D6" strokeWidth="2.5" />
                  <path d="M28 46l8-14h48l8 14" stroke="#2F44D6" strokeWidth="2.5" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="project-body">
                <div className="project-top">
                  <h3>NYC Taxi Analytics</h3>
                  <span className="tag tag-live">Repo</span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--ink-faint)", marginTop: "4px" }}>
                  Interactive Streamlit dashboard, 2.7M+ records
                </p>
                <p className="desc">
                  Built an interactive Streamlit dashboard with filters,
                  heatmaps, and KPI tracking on 2.7M+ NYC taxi records using
                  dbt and DuckDB.
                </p>
                <div className="stack-row">
                  <span className="stack-pill">Streamlit</span>
                  <span className="stack-pill">dbt</span>
                  <span className="stack-pill">DuckDB</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/ayushid543/nyc-taxi-analytics" target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                </div>
              </div>
            </article>

            {/* CiviCivi */}
            <article className="project-card reveal" ref={addRevealRef}>
              <div className="project-visual">
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60 18l34 16v24c0 22-14 38-34 44-20-6-34-22-34-44V34l34-16z" stroke="#2F44D6" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M46 60l10 10 20-22" stroke="#2F44D6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="project-body">
                <div className="project-top">
                  <h3>CiviCivi</h3>
                  <span className="tag tag-live">Live</span>
                </div>
                <p style={{ fontSize: "13px", color: "var(--ink-faint)", marginTop: "4px" }}>
                  1st Place, Social Blitz Award — Kiro Hackathon
                </p>
                <p className="desc">Won the Social Blitz award at the Kiro Hackathon for CiviCivi.</p>
                <div className="project-links">
                  <a href="https://civicivi.vercel.app" target="_blank" rel="noopener noreferrer">
                    Visit site ↗
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ SKILLS ============ */}
      <section className="row" id="skills">
        <span className="row-tag">SKILLS</span>
        <div className="wrap">
          <span className="row-tag-mobile">Skills</span>
          <div className="section-head reveal" ref={addRevealRef}>
            <h2>Stack</h2>
            <p>Grouped the way I actually use them, day to day. Click a category to filter.</p>
          </div>

          <div className="reveal" ref={addRevealRef}>
            <div className="skills-filter-row">
              <button
                className={`cat-chip${activeCat === "all" ? " active" : ""}`}
                onClick={() => setActiveCat("all")}
              >
                All
              </button>
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`cat-chip${activeCat === cat.id ? " active" : ""}`}
                  onClick={() => setActiveCat(cat.id)}
                >
                  <span className="cat-dot" style={{ background: cat.color }}></span>
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="pill-grid">{SKILLS.map(renderSkillPill)}</div>
          </div>
        </div>
      </section>

      {/* ============ ACHIEVEMENTS ============ */}
      <section className="row" id="achievements">
        <span className="row-tag">RECOGNITION</span>
        <div className="wrap">
          <span className="row-tag-mobile">Achievements</span>
          <div className="section-head reveal" ref={addRevealRef}>
            <h2>Achievements &amp; recognition</h2>
          </div>

          <div className="achieve-grid reveal" ref={addRevealRef}>
            {ACHIEVEMENTS.map((a) => (
              <div className="achieve-cell" key={a.title}>
                <a className="tl-tag mono" href={a.tagUrl} target="_blank" rel="noopener noreferrer">
                  {a.tag} ↗
                </a>
                <h4>{a.title}</h4>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE & EDUCATION ============ */}
      <section className="row band-tint" id="experience">
        <span className="row-tag">EXPERIENCE</span>
        <div className="wrap">
          <span className="row-tag-mobile">Experience</span>
          <div className="section-head reveal" ref={addRevealRef}>
            <h2>Experience &amp; Education</h2>
            <p>Where I&apos;ve applied the stack above, and where I learned it.</p>
          </div>

          <div className="exp-list reveal" ref={addRevealRef}>
            {EXPERIENCE.map(({ date, role, org, url, bullets }) => (
              <div className="exp-row" key={role}>
                <div className="exp-date mono">{date}</div>
                <div>
                  <div className="exp-role">{role}</div>
                  {url ? (
                    <a className="exp-org" href={url} target="_blank" rel="noopener noreferrer">
                      {org} ↗
                    </a>
                  ) : (
                    <div className="exp-org">{org}</div>
                  )}
                  <ul className="exp-bullets">
                    {bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="edu-divider">
            <span className="mono">EDUCATION</span>
          </div>

          <div className="edu-list reveal" ref={addRevealRef}>
            <div className="edu-row">
              <div>
                <div className="deg">Master of Science, Computer Science</div>
                <a className="school edu-school" href="https://www.asu.edu/" target="_blank" rel="noopener noreferrer">
                  Arizona State University, Tempe, AZ · Aug 2024 – May 2026 ↗
                </a>
                <div className="coursework">
                  Coursework: Data Processing at Scale, Data Mining,
                  Statistical Machine Learning, Mobile Computing, Data
                  Visualization, Perception of Robotics, Applied
                  Cryptography, Blockchain
                </div>
              </div>
              <div className="gpa mono">GPA 4.00 / 4.00</div>
            </div>
            <div className="edu-row">
              <div>
                <div className="deg">Bachelor of Technology, Computer Science</div>
                <a className="school edu-school" href="https://paruluniversity.ac.in/" target="_blank" rel="noopener noreferrer">
                  Parul University, Vadodara, Gujarat · Sep 2020 – May 2024 ↗
                </a>
                <div className="coursework">
                  Coursework: Data Structures and Algorithms, Operating
                  Systems, Computer Networks, Database Management Systems,
                  Data Science, Big Data Analytics, Artificial Intelligence,
                  Web Development
                </div>
              </div>
              <div className="gpa mono">GPA 8.3 / 10.0</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="row band-alt" id="about">
        <span className="row-tag">ABOUT</span>
        <div className="wrap">
          <span className="row-tag-mobile">About</span>
          <div className="section-head reveal" ref={addRevealRef}>
            <h2>About</h2>
          </div>

          <div className="about-grid reveal" ref={addRevealRef}>
            <div className="avatar-block">
              <div className="avatar-frame">
                <Image
                  src="/headshot.jpg"
                  alt="Portrait of Ayushi Desai"
                  width={800}
                  height={1000}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 22%" }}
                  priority
                />
              </div>
              <div className="status-line">
                <span className="status-dot"></span>Open to full-time roles
              </div>
              <div className="status-line" style={{ color: "var(--ink-faint)" }}>
                Tempe, AZ
              </div>
            </div>

            <div>
              <div className="about-bio">
                <p>
                  I hold an MS in Computer Science from Arizona State
                  University (4.0 GPA), with experience turning messy,
                  large-scale data into dashboards, reports, and pipelines
                  that drive real business decisions.
                </p>
                <p>
                  Most recently at{" "}
                  <a className="inline-link" href="https://www.asu.edu/" target="_blank" rel="noopener noreferrer">
                    ASU
                  </a>
                  , I&apos;ve been building marketing analytics
                  infrastructure, SQL dashboards, GA4 analysis, and
                  reverse-ETL pipelines, that drove a 10x increase in email
                  engagement and eliminated manual reporting across 1,000+
                  records. Earlier, at Deepak Cybit, I built sensor-data
                  pipelines and Tableau dashboards that helped reduce
                  unplanned downtime costs by 15%.
                </p>
                <p>
                  I work across the full analytics stack: SQL, Python, dbt,
                  Snowflake/DuckDB, Tableau, Power BI, and GA4, from data
                  cleaning and pipeline-building through to dashboarding and
                  stakeholder-facing reporting.
                </p>
              </div>

              <ul className="take-on">
                <li>SQL &amp; dashboard builds that give stakeholders real-time visibility</li>
                <li>Data pipeline &amp; ETL work with dbt, Snowflake, or DuckDB</li>
                <li>Marketing / product analytics, GA4, funnel &amp; cohort analysis</li>
                <li>Reporting automation that removes manual, repetitive work</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="row" id="contact">
        <span className="row-tag">CONTACT</span>
        <div className="wrap">
          <span className="row-tag-mobile">Contact</span>
          <div className="contact-block reveal" ref={addRevealRef}>
            <h2>Let&apos;s talk about your data.</h2>
            <p>
              Open to full-time Data Analyst, Analytics Engineer, and Machine
              Learning Engineer roles. The fastest way to reach me is email.
            </p>
            <div className="contact-links">
              <a className="contact-link primary" href="mailto:adesai67@asu.edu">
                Email me ↗
              </a>
              <a
                className="contact-link"
                href="https://www.linkedin.com/in/ayushi-desai"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                className="contact-link"
                href="https://github.com/ayushid543"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="footer-row">
            <div className="footer-links">
              {NAV_SECTIONS.map((id) => (
                <a key={id} href={`#${id}`}>
                  {NAV_LABELS[id]}
                </a>
              ))}
            </div>
            <div className="copyright">© 2026 Ayushi Desai</div>
          </div>
        </div>
      </footer>
    </>
  );
}
