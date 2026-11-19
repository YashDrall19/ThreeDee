export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Full Stack" | "AI & LLM" | "Enterprise" | "Mobile";
  technologies: string[];
  description: string;
  keyFeatures: string[];
  architectureHighlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  artifactName: string;
  runeSymbol: string;
  accentColor: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  theme: string;
  sigil: string;
}

export interface SkillCategory {
  title: string;
  spellName: string;
  description: string;
  iconName: string;
  skills: { name: string; level: number; highlight?: boolean }[];
  accentColor: string;
}

export interface ChapterMeta {
  number: number;
  id: string;
  title: string;
  movieTitle: string;
  theme: string;
  quote: string;
  atmosphere: string;
  accentColor: string;
}

export const CHAPTERS: ChapterMeta[] = [
  {
    number: 1,
    id: "philosophers-stone",
    title: "The Awakening",
    movieTitle: "The Philosopher's Stone",
    theme: "The Beginning of a Journey",
    quote: "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
    atmosphere: "Golden candlelight, ancient castle towers, floating staircases, and parchment.",
    accentColor: "#C6A15B",
  },
  {
    number: 2,
    id: "chamber-of-secrets",
    title: "Hidden Chambers",
    movieTitle: "The Chamber of Secrets",
    theme: "Discovering Hidden Abilities",
    quote: "It is our choices, Yash, that show what we truly are, far more than our abilities.",
    atmosphere: "Subterranean emerald glow, serpent stone carvings, ancient runic inscriptions.",
    accentColor: "#10B981",
  },
  {
    number: 3,
    id: "prisoner-of-azkaban",
    title: "Grimoire of Runes",
    movieTitle: "The Prisoner of Azkaban",
    theme: "Mastery of Spells & Skills",
    quote: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
    atmosphere: "Mystical sapphire blue, Patronus silvery frost, orbiting celestial spell circles.",
    accentColor: "#38BDF8",
  },
  {
    number: 4,
    id: "goblet-of-fire",
    title: "Trials of Honor",
    movieTitle: "The Goblet of Fire",
    theme: "Challenges and Professional Experience",
    quote: "Dark and difficult times lie ahead. Soon we must all face the choice between what is right and what is easy.",
    atmosphere: "The Great Hall, dancing blue and amber flames of the Goblet, parchment challenges.",
    accentColor: "#F59E0B",
  },
  {
    number: 5,
    id: "order-of-phoenix",
    title: "Room of Requirement",
    movieTitle: "The Order of the Phoenix",
    theme: "Artifacts of Creation & Projects",
    quote: "We've all got both light and dark inside us. What matters is the part we choose to act on.",
    atmosphere: "Warm crimson embers, phoenix feathers, enchanted chests revealing production creations.",
    accentColor: "#EF4444",
  },
  {
    number: 6,
    id: "half-blood-prince",
    title: "The Pensieve",
    movieTitle: "The Half-Blood Prince",
    theme: "Deep Technical Architecture & Systems",
    quote: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.",
    atmosphere: "Dumbledore's sanctum, swirling liquid silver memory strands, deep astronomical navy.",
    accentColor: "#818CF8",
  },
  {
    number: 7,
    id: "deathly-hallows-1",
    title: "The Wandering Path",
    movieTitle: "The Deathly Hallows Part 1",
    theme: "Evolution, Journey & Milestones",
    quote: "Do not pity the dead, Harry. Pity the living, and, above all, those who live without love.",
    atmosphere: "Misty Forbidden Forest, glowing Elder Wand beam, ancient Deathly Hallows insignia.",
    accentColor: "#A78BFA",
  },
  {
    number: 8,
    id: "deathly-hallows-2",
    title: "The Final Encounter",
    movieTitle: "The Deathly Hallows Part 2",
    theme: "The Destination & Future Horizons",
    quote: "The magic doesn't end here. It's just the beginning.",
    atmosphere: "Golden dawn over Hogwarts, fluttering Golden Snitch, phoenix fire celebration.",
    accentColor: "#C6A15B",
  },
];

export const PROFILE = {
  name: "Yash Drall",
  title: "Full Stack Developer | Building Scalable Web & AI Experiences",
  headline: "A Wizard Behind the Code",
  email: "drall.yash@gmail.com",
  phone: "+91 7082661109",
  location: "Sonipat, Haryana, India",
  linkedIn: "https://linkedin.com/in/yashdrall01",
  linkedInHandle: "linkedin.com/in/yashdrall01",
  github: "https://github.com",
  resumeUrl: "/Resume_Yash.pdf",
  summary:
    "Full Stack Developer with 3 years of experience building scalable web applications and AI-powered solutions. Proficient in React.js, Next.js, TypeScript, Python, Django, REST APIs, and SQL databases. Experienced in AI integration, CRM development, software architecture, database design, real-time systems, and performance optimization. Skilled in end-to-end development, problem-solving, and delivering production-ready software.",
  stats: [
    { label: "Years of Experience", value: "3+", spell: "Chronos" },
    { label: "Daily Business Records", value: "1,000+", spell: "Imperium" },
    { label: "Active Enterprise Users", value: "200+", spell: "Legion" },
    { label: "Production Platforms", value: "6+", spell: "Magnum" },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Conjurations",
    spellName: "Appare Vestigium",
    description: "Crafting reactive, lightning-fast interfaces with modern component architecture.",
    iconName: "Layout",
    accentColor: "#38BDF8",
    skills: [
      { name: "React.js", level: 95, highlight: true },
      { name: "Next.js", level: 92, highlight: true },
      { name: "TypeScript", level: 90, highlight: true },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Component Architecture", level: 90 },
      { name: "State Management", level: 88 },
      { name: "Responsive UI Design", level: 94 },
    ],
  },
  {
    title: "Backend & Server Charms",
    spellName: "Protego Horribilis",
    description: "Architecting resilient APIs, distributed microservices, and high-load servers.",
    iconName: "Server",
    accentColor: "#10B981",
    skills: [
      { name: "Python", level: 92, highlight: true },
      { name: "Django & DRF", level: 90, highlight: true },
      { name: "FastAPI & Flask", level: 86 },
      { name: "RESTful APIs", level: 94, highlight: true },
      { name: "Microservices", level: 85 },
      { name: "API Security & Rate Limiting", level: 88 },
      { name: "CRUD Architectures", level: 95 },
    ],
  },
  {
    title: "Arcane AI & LLM Systems",
    spellName: "Legilimens",
    description: "Synthesizing multimodal models, embeddings, autonomous pipelines, and RAG architectures.",
    iconName: "Sparkles",
    accentColor: "#F59E0B",
    skills: [
      { name: "Google Gemini API", level: 92, highlight: true },
      { name: "LangChain & LangGraph", level: 88, highlight: true },
      { name: "RAG & Vector Databases", level: 87, highlight: true },
      { name: "Ollama (Local LLMs)", level: 90, highlight: true },
      { name: "Qwen3-VL & Whisper.cpp", level: 86 },
      { name: "FAISS & ChromaDB", level: 85 },
      { name: "Prompt Engineering", level: 92 },
      { name: "Semantic Search", level: 89 },
    ],
  },
  {
    title: "Data Vaults & Schemas",
    spellName: "Gringotts Sanctum",
    description: "Designing ACID relational schemas, optimizing query indexing, and caching high-volume data.",
    iconName: "Database",
    accentColor: "#8B5CF6",
    skills: [
      { name: "MySQL", level: 92, highlight: true },
      { name: "PostgreSQL", level: 88, highlight: true },
      { name: "MongoDB", level: 84 },
      { name: "SQL & Query Optimization", level: 90 },
      { name: "Database Indexing", level: 88 },
      { name: "ORM & Migrations", level: 92 },
      { name: "Relational Modeling", level: 91 },
    ],
  },
  {
    title: "Cloud, VPS & DevOps",
    spellName: "Portus Translatio",
    description: "Deploying production Linux VPS clusters, zero-downtime PM2 processes, and reverse proxies.",
    iconName: "Cloud",
    accentColor: "#EC4899",
    skills: [
      { name: "Linux & Bash", level: 90, highlight: true },
      { name: "Nginx Reverse Proxy", level: 88, highlight: true },
      { name: "PM2 Process Manager", level: 90 },
      { name: "Docker", level: 84 },
      { name: "AWS EC2 & S3", level: 86 },
      { name: "SSL / TLS Encryption", level: 92 },
      { name: "CI/CD & GitHub Actions", level: 85 },
    ],
  },
  {
    title: "Security & Guard Wards",
    spellName: "Alohomora & Colloportus",
    description: "Enforcing enterprise-grade authentication, RBAC authorization, and hardened endpoints.",
    iconName: "Shield",
    accentColor: "#EF4444",
    skills: [
      { name: "Role-Based Access (RBAC)", level: 94, highlight: true },
      { name: "JWT Authentication", level: 92, highlight: true },
      { name: "Google OAuth 2.0", level: 90 },
      { name: "OTP & Email Verification", level: 90 },
      { name: "HTTP-Only Cookies & CSRF", level: 88 },
      { name: "API Security Standards", level: 90 },
    ],
  },
  {
    title: "Real-Time & Mobile Craft",
    spellName: "Floo Network",
    description: "Streaming real-time events through WebSockets, Kafka, and building cross-platform Flutter apps.",
    iconName: "Smartphone",
    accentColor: "#14B8A6",
    skills: [
      { name: "Flutter & Dart", level: 88, highlight: true },
      { name: "WebSockets Real-Time", level: 90, highlight: true },
      { name: "Push Notifications", level: 88 },
      { name: "Kafka & RabbitMQ", level: 82 },
      { name: "React Native", level: 80 },
    ],
  },
  {
    title: "Alchemical Quality & Testing",
    spellName: "Veritaserum",
    description: "Ensuring bulletproof production releases with automated tests, profiling, and agile precision.",
    iconName: "CheckCircle",
    accentColor: "#C6A15B",
    skills: [
      { name: "PyTest & Unit Testing", level: 88 },
      { name: "Integration Testing", level: 86 },
      { name: "Postman & API Testing", level: 94 },
      { name: "Git & Version Control", level: 94 },
      { name: "Performance Optimization", level: 90 },
      { name: "Agile & SDLC Execution", level: 92 },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Karma Ayurveda Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "September 2025 – Present",
    location: "New Delhi, India",
    summary:
      "Spearheading the engineering of an enterprise-grade CRM ecosystem and multimodal AI communication infrastructure utilized by 200+ active staff members, handling over 1,000 daily business records.",
    achievements: [
      "Led the development and continuous enhancement of an enterprise CRM platform used by 200+ employees across Sales, Doctors, Accounts, Dispatch, Verification, and Management teams, handling 1,000+ business records daily.",
      "Designed and integrated an AI-powered website enquiry chatbot using Google Gemini API, enabling contextual conversations, automated lead capture, customer detail validation, health concern collection, and seamless CRM enquiry creation.",
      "Developed a multimodal customer communication platform supporting text, image, and voice-note messaging, with Gemini-powered AI responses, attachment processing, conversation history, WebSocket-based real-time communication, and push notifications.",
      "Architected and developed core CRM modules covering lead management, order processing, inventory, payment tracking, customer management, MIS reporting, RBAC, role-specific dashboards, and automated business workflows.",
      "Built staff-facing chat management tools for conversation search, filtering, assignments, labels, status management, internal notes, and follow-up reminders; led a team of 2 developers while driving technical architecture, code quality, and performance.",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Python",
      "Django",
      "REST APIs",
      "Google Gemini API",
      "WebSockets",
      "MySQL",
      "Push Notifications",
      "Git",
      "RBAC",
    ],
    theme: "The Goblet of Fire Champion",
    sigil: "Crown",
  },
  {
    company: "Talentiser",
    role: "Full Stack Developer",
    period: "September 2023 – September 2025",
    location: "Noida, Uttar Pradesh, India",
    summary:
      "Owned end-to-end development lifecycle for production web platforms and cross-platform mobile apps, implementing robust database architectures, secure authentication, and real-time operational portals.",
    achievements: [
      "Developed and deployed multiple production-ready web and cross-platform mobile applications using React.js, Flutter, Python, JavaScript, and MySQL, handling complete frontend and backend development.",
      "Built a Flutter-based Fandom application featuring ticket booking, event management, digital wallet, OTP authentication, email verification, Google OAuth, and user profile management.",
      "Designed and developed a Tour Planner application supporting international tour and cruise bookings, real-time pricing, package availability, itinerary management, and third-party API integrations.",
      "Developed a Telecommunication Management System using React.js and Python, implementing customer management, service tracking, operational dashboards, reporting, and RESTful API integration.",
      "Managed end-to-end application development across requirements analysis, technical implementation, database design, API development, debugging, testing, deployment, and maintenance, with a focus on reusable architecture.",
    ],
    technologies: [
      "React.js",
      "Flutter",
      "Python",
      "JavaScript",
      "HTML5",
      "CSS3",
      "MySQL",
      "REST APIs",
      "Git",
      "OAuth",
      "OTP Authentication",
    ],
    theme: "The Order Guardian",
    sigil: "Shield",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "chatspace",
    title: "ChatSpace – Private AI Personal Vault",
    subtitle: "Private AI-Powered Personal Message & Knowledge Vault",
    category: "AI & LLM",
    technologies: ["Next.js", "React", "TypeScript", "MySQL", "Ollama", "Qwen3-VL", "Whisper.cpp", "FFmpeg", "JWT", "bcrypt"],
    description:
      "A high-security, multimodal workspace designed to securely archive and index personal messages, voice notes, media, documents, and reminders with on-device local AI intelligence.",
    keyFeatures: [
      "Local multimodal AI pipeline running Ollama, Qwen3-VL, and Whisper.cpp with zero external data leaks.",
      "Asynchronous FFmpeg media conversion, voice-to-text audio transcription, and semantic content classification.",
      "Hardened authentication with bcrypt password hashing, JWT tokens, and HTTP-only cookie guards.",
      "Unified message threads with real-time emoji reactions, message pinning, starring, full-text search, and infinite scrolling.",
      "Intelligent caching layer for instant AI inferences and reduced memory footprint.",
    ],
    architectureHighlights: [
      "Decoupled asynchronous worker queue for CPU-intensive Whisper audio transcription and image vision prompts.",
      "Relational MySQL indexing on message bodies and vector representations for high-speed sub-millisecond retrieval.",
      "Client-side optimistic state updates with Next.js App Router and React Server Components.",
    ],
    artifactName: "The Pensieve Crystal",
    runeSymbol: "ᚦ",
    accentColor: "#F59E0B",
  },
  {
    id: "gcc-circle",
    title: "GCC Circle – Full Stack Web Platform",
    subtitle: "Production Enterprise Community & Event Management Portal",
    category: "Full Stack",
    technologies: ["Next.js", "MySQL", "REST APIs", "Linux", "Nginx", "PM2", "Hostinger VPS", "SSL"],
    description:
      "A production web platform built for high-traffic community engagement, event ticketing, corporate leadership directories, editorial content management, and inbound lead capture.",
    keyFeatures: [
      "End-to-end event registration portal with dynamic ticket issuance and confirmation workflows.",
      "Dynamic blog and content management system with SEO-optimized server-rendered pages.",
      "Relational MySQL schema architected for rapid lead capture, event analytics, and contact management.",
      "Production deployment on Hostinger KVM Linux VPS using Nginx reverse proxy, PM2 process supervisor, and automated SSL.",
    ],
    architectureHighlights: [
      "Server-side rendering (SSR) ensuring near-instant Core Web Vitals and search engine indexing.",
      "Custom RESTful endpoints with parameter validation and SQL injection defense.",
      "Configured automated PM2 clustering for zero-downtime rolling server updates.",
    ],
    artifactName: "The Triwizard Cup",
    runeSymbol: "ᚱ",
    accentColor: "#38BDF8",
  },
  {
    id: "purchase-order-system",
    title: "Purchase Order Management System",
    subtitle: "Enterprise Procurement, Approvals & Inventory Operations Suite",
    category: "Enterprise",
    technologies: ["React.js", "Python", "MySQL", "REST APIs", "RBAC", "Excel Export/Import", "Linux VPS"],
    description:
      "A mission-critical business application automating the entire vendor lifecycle, procurement orders, multi-level management approvals, inventory allocation, and invoice payment tracking.",
    keyFeatures: [
      "Granular Role-Based Access Control (RBAC) separating Procurement, Accounts, and Executive approval privileges.",
      "Live order lifecycle state machine tracking orders from draft quote to warehouse receipt and final payment reconciliation.",
      "High-performance Excel bulk data import and export pipelines for financial reconciliation.",
      "Interactive operational dashboards providing instant visual analytics on pending expenditures and supplier metrics.",
    ],
    architectureHighlights: [
      "Normalized transactional database schema preventing inventory double-allocation and race conditions.",
      "Python REST API micro-endpoints with token verification and audit log history tracking.",
      "Deployed on a dedicated Linux VPS environment with daily database snapshots.",
    ],
    artifactName: "The Golden Snitch Vault",
    runeSymbol: "ᚷ",
    accentColor: "#10B981",
  },
  {
    id: "tour-planner",
    title: "Tour Planner Mobile Application",
    subtitle: "Cross-Platform International Tour & Cruise Booking Engine",
    category: "Mobile",
    technologies: ["Flutter", "Dart", "REST APIs", "Third-Party Provider APIs", "State Management"],
    description:
      "A cross-platform mobile booking companion enabling travelers to explore global tour packages, book cruise itineraries, view real-time flight connections, and manage travel documents.",
    keyFeatures: [
      "Dynamic tour and cruise discovery engine displaying live inventory, pricing tiers, and seasonal promotions.",
      "Interactive day-by-day itinerary view with route mapping, offline day plans, and excursion booking.",
      "Seamless integration with third-party travel vendor APIs with automated error retry mechanisms.",
      "Fluid 60fps animations crafted in Flutter with smooth transitions and offline cached storage.",
    ],
    architectureHighlights: [
      "Modular Flutter architecture with reactive state management and clean separation of concerns.",
      "Network caching layer providing instant app launch and offline itinerary access.",
      "Optimized API payload compression reducing cellular data consumption.",
    ],
    artifactName: "The Marauder's Map",
    runeSymbol: "ᛗ",
    accentColor: "#EC4899",
  },
  {
    id: "telecom-system",
    title: "Telecommunication Management System",
    subtitle: "Real-Time Subscriber Operations & Service Dispatch Portal",
    category: "Enterprise",
    technologies: ["React.js", "Python", "REST APIs", "MySQL", "Operational Reporting"],
    description:
      "A unified administrative operations portal for telecom customer management, support ticket tracking, technician service dispatch, and automated MIS reporting.",
    keyFeatures: [
      "Comprehensive subscriber lifecycle management with service history, billing statuses, and contract renewals.",
      "Real-time operational dashboards visualizing technician allocation, resolved outages, and regional SLA metrics.",
      "Data synchronization engine coordinating between field technician inputs and central database records.",
      "Automated PDF and spreadsheet operational reporting for management compliance.",
    ],
    architectureHighlights: [
      "Component-based React design system with reusable data grids, filter bars, and modal forms.",
      "Python backend handling concurrent request handling and transaction consistency.",
    ],
    artifactName: "The Mirror of Erised",
    runeSymbol: "ᛖ",
    accentColor: "#8B5CF6",
  },
  {
    id: "soccer-premier-league",
    title: "Soccer Premier League Web Application",
    subtitle: "Live Sports Analytics, Fixtures & Team Statistics Portal",
    category: "Full Stack",
    technologies: ["React.js", "REST APIs", "JavaScript", "Responsive UI", "Component Optimization"],
    description:
      "A responsive sports dashboard tracking match fixtures, live league tables, player performance statistics, head-to-head records, and team rosters.",
    keyFeatures: [
      "Live table standings with automatic points, goal difference, and qualification zone calculations.",
      "Interactive fixture schedule with filterable matchweeks, team badges, and stadium details.",
      "Detailed player statistical cards highlighting goals, assists, clean sheets, and disciplinary metrics.",
      "Optimized virtualized rendering ensuring instant search and filter responses across full league rosters.",
    ],
    architectureHighlights: [
      "Clean modular component architecture with memoized selectors to eliminate redundant re-renders.",
      "Resilient REST API client with intelligent cache expiration for match updates.",
    ],
    artifactName: "The Quidditch World Cup",
    runeSymbol: "ᛟ",
    accentColor: "#EF4444",
  },
];

export const TECHNICAL_PILLARS = [
  {
    id: "realtime-ai",
    title: "Multimodal AI & Real-Time Intelligence",
    symbol: "⚡",
    subtitle: "Orchestrating Gemini & Local LLMs with WebSockets",
    description:
      "Pioneering full-stack AI integrations that bridge large language models with real business workflows. Architected multimodal customer communication systems processing text, imagery, and audio notes in real time, delivering automated customer qualification and instant CRM synchronization.",
    details: [
      "Google Gemini API integration with structured prompt engineering and dynamic context injection.",
      "Local inference pipelines combining Ollama, Qwen3-VL, and Whisper.cpp with FFmpeg audio chunking.",
      "Bi-directional WebSocket streaming delivering real-time agent notifications and live conversational updates.",
      "RAG and vector storage indexing using FAISS, ChromaDB, and semantic text chunking.",
    ],
    accentColor: "#F59E0B",
  },
  {
    id: "crm-rbac",
    title: "Enterprise Architecture & Scalable RBAC",
    symbol: "🏰",
    subtitle: "Systems Serving 200+ Users & 1,000+ Daily Records",
    description:
      "Designing fault-tolerant enterprise platforms that run core corporate operations. Implemented role-based access control protecting sensitive patient and customer data across Sales, Medical, Dispatch, and Financial divisions without bottlenecking workflows.",
    details: [
      "Hierarchical RBAC engine controlling granular field-level and view-level permissions.",
      "Optimized order processing lifecycle preventing inventory race conditions and double-spending.",
      "Executive MIS reporting engines synthesizing operational KPIs into interactive dashboards.",
      "Staff collaboration tools featuring thread assignments, priority tagging, and automated reminders.",
    ],
    accentColor: "#10B981",
  },
  {
    id: "devops-vps",
    title: "Production Infrastructure & Linux DevOps",
    symbol: "🛡️",
    subtitle: "Zero-Downtime Deployments with Nginx, PM2 & SSL",
    description:
      "Managing the complete infrastructure lifecycle on self-hosted Linux VPS environments. Configuring hardened Nginx reverse proxies, SSL certificate renewals, automated PM2 cluster restarts, and CI/CD pipelines.",
    details: [
      "Production deployment and server provisioning on Hostinger KVM Linux VPS.",
      "Nginx reverse proxy configuration with gzip compression, caching headers, and rate limiting.",
      "PM2 process supervisor with cluster mode and automated memory-leak recycling.",
      "Automated TLS/SSL encryption via Let's Encrypt Certbot with zero service interruption.",
    ],
    accentColor: "#38BDF8",
  },
  {
    id: "data-design",
    title: "Database Modeling & Query Optimization",
    symbol: "📜",
    subtitle: "ACID Relational Architectures with MySQL & PostgreSQL",
    description:
      "Crafting high-throughput database schemas structured for data integrity and speed. Tuning slow queries, creating compound indices, designing normalized entity relationships, and managing database migrations safely in production.",
    details: [
      "Normalized relational schema design ensuring referential integrity across multi-table business operations.",
      "Query optimization utilizing EXPLAIN plans, composite indices, and execution profiling.",
      "Transaction isolation handling concurrent payment updates and inventory reservations.",
      "Secure database backup automation with point-in-time disaster recovery scripts.",
    ],
    accentColor: "#A78BFA",
  },
];

export const TIMELINE_MILESTONES = [
  {
    year: "2019 – 2023",
    title: "Bachelor of Technology in Biomedical Engineering",
    institution: "Deenbandhu Chhotu Ram University of Science and Technology (DCRUST), Murthal",
    grade: "CGPA: 8.04 / 10",
    theme: "The Foundation of Logic",
    description:
      "Rigorous engineering education grounding computational problem solving, signal processing, mathematics, and software design principles. Developed an analytical approach to complex systems.",
    icon: "GraduationCap",
    accentColor: "#C6A15B",
  },
  {
    year: "Sept 2023 – Sept 2025",
    title: "Full Stack Developer",
    institution: "Talentiser (Noida, Uttar Pradesh)",
    grade: "2 Years of Full Stack Excellence",
    theme: "The Journey of Creation",
    description:
      "Engineered multiple production-ready web and cross-platform mobile applications using React.js, Flutter, Python, and MySQL. Spearheaded the Fandom ticketing platform, Tour Planner, and Telecom Management suites.",
    icon: "Briefcase",
    accentColor: "#38BDF8",
  },
  {
    year: "Sept 2025 – Present",
    title: "Full Stack Developer & Technical Lead",
    institution: "Karma Ayurveda Pvt. Ltd. (New Delhi)",
    grade: "Enterprise Scale & AI Leadership",
    theme: "The Master of Enterprise Systems",
    description:
      "Leading enterprise CRM development for 200+ staff across 6 departments, architecting Gemini-powered multimodal AI communication tools, real-time WebSocket pipelines, and managing junior engineering talent.",
    icon: "Award",
    accentColor: "#10B981",
  },
  {
    year: "The Horizon Ahead",
    title: "Architecting Next-Gen Intelligent Web Systems",
    institution: "Open to Global Innovations & High-Impact Engineering",
    grade: "Infinite Horizons",
    theme: "The Magic Doesn't End Here",
    description:
      "Pioneering autonomous AI agent workflows, distributed cloud architectures, and immersive 3D web experiences that elevate digital craftsmanship to an art form.",
    icon: "Sparkles",
    accentColor: "#F59E0B",
  },
];

