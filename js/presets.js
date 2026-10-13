/**
 * PromptPilot — Presets and Curated Examples Library
 * Contains industry-standard prompt engineering templates for all 5 categories:
 * Coding, Studying, Writing, Marketing, and Creative.
 */

export const CATEGORIES = [
  { id: 'coding', name: 'Coding & Dev', icon: '💻', desc: 'Code architecture, refactoring, test suites, and debugging' },
  { id: 'studying', name: 'Studying & Academia', icon: '📚', desc: 'Feynman technique, exam prep, active recall, and syntheses' },
  { id: 'writing', name: 'Writing & Content', icon: '✍️', desc: 'Technical essays, newsletters, storytelling, and copy editing' },
  { id: 'marketing', name: 'Marketing & Sales', icon: '📈', desc: 'Campaign strategies, cold outreach, value props, and landing pages' },
  { id: 'creative', name: 'Creative & Design', icon: '🎨', desc: 'Worldbuilding, cinematic Midjourney prompts, and scriptwriting' },
  { id: 'general', name: 'General / Universal', icon: '⚡', desc: 'Structured workflows, decision matrices, and executive summaries' }
];

export const PRESETS_BY_CATEGORY = {
  coding: [
    {
      label: 'Production Code Refactor & Optimization',
      topic: 'Legacy Node.js / Express API endpoint handling database transactions',
      purpose: 'Refactor for performance, connection pooling, and resilient error handling',
      audience: 'Senior Backend Engineers and Code Reviewers',
      tone: 'Technical & Precise',
      outputFormat: 'Clean Code with Comments & Types',
      model: 'chatgpt',
      persona: 'Principal Backend Systems Architect with deep expertise in distributed systems',
      constraints: 'Avoid third-party bloated libraries, adhere to clean architecture principles, include TypeScript types and unit test recommendations.',
      chainOfThought: true,
      fewShot: false
    },
    {
      label: 'Automated Unit & Integration Test Suite',
      topic: 'Authentication & Session Refresh Flow in React and Next.js',
      purpose: 'Generate an exhaustive test suite covering happy path and edge cases (expired tokens, race conditions, network failures)',
      audience: 'Full-stack software engineers',
      tone: 'Professional & Authoritative',
      outputFormat: 'Step-by-Step Implementation Guide',
      model: 'claude',
      persona: 'Lead QA Automation Engineer and Test-Driven Development (TDD) advocate',
      constraints: 'Use Vitest and React Testing Library, mock network calls cleanly, avoid brittle snapshot tests.',
      chainOfThought: true,
      fewShot: true
    },
    {
      label: 'System Design & Architecture Spec',
      topic: 'Real-time collaborative document editor (like Google Docs or Notion)',
      purpose: 'Design the distributed architecture, CRDT/OT data synchronization, and WebSocket clustering strategy',
      audience: 'Engineering leadership and infrastructure leads',
      tone: 'Professional & Authoritative',
      outputFormat: 'Markdown Comparison Table',
      model: 'universal',
      persona: 'Chief Architect specializing in high-throughput real-time systems',
      constraints: 'Detail state management, offline-first sync, conflict resolution, and horizontal scalability bottlenecks.',
      chainOfThought: true,
      fewShot: false
    }
  ],
  studying: [
    {
      label: 'Feynman Technique Topic Breakdown',
      topic: 'Quantum Computing Qubits and Superposition',
      purpose: 'Explain the fundamental mechanism using intuitive real-world analogies, then build up to technical definitions',
      audience: 'First-year computer science undergraduates with basic linear algebra knowledge',
      tone: 'Socratic & Inquisitive',
      outputFormat: 'Step-by-Step Implementation Guide',
      model: 'chatgpt',
      persona: 'Award-winning university physics professor known for clarifying complex phenomena',
      constraints: 'Do not use unexplained mathematical jargon, provide everyday physical analogies, and include 3 self-test concept check questions.',
      chainOfThought: true,
      fewShot: false
    },
    {
      label: 'Active Recall Flashcard & Quiz Generator',
      topic: 'Human Cardiovascular System & Cardiac Cycle hemodynamics',
      purpose: 'Create high-yield spaced-repetition flashcards and multiple-choice questions for medical exam prep',
      audience: 'Medical students preparing for USMLE / board exams',
      tone: 'Academic & Rigorous',
      outputFormat: 'Interactive Quiz / Flashcards',
      model: 'claude',
      persona: 'Medical Board Examiner and Clinical Physiology Professor',
      constraints: 'Focus on high-yield clinical correlations, explain why incorrect distractors are wrong, format in front/back markdown format.',
      chainOfThought: false,
      fewShot: true
    },
    {
      label: 'Executive Research Paper Synthesis',
      topic: 'Recent Advances in Multimodal LLM Reasoning (2024-2026)',
      purpose: 'Synthesize core findings, methodology trade-offs, benchmarks, and unresolved limitations',
      audience: 'AI researchers and postgraduate computer science students',
      tone: 'Academic & Rigorous',
      outputFormat: 'Executive Summary with Key Takeaways',
      model: 'gemini',
      persona: 'Senior AI Research Scientist and Peer Reviewer',
      constraints: 'Distinguish between empirical claims and theoretical assumptions, highlight failure modes, structure with clear subheadings.',
      chainOfThought: true,
      fewShot: false
    }
  ],
  writing: [
    {
      label: 'High-Authority Technical Blog Post',
      topic: 'Why Event-Driven Microservices Fail and How to Prevent It',
      purpose: 'Write an insightful, battle-tested essay analyzing event streaming pitfalls, dead-letter queues, and schema evolution',
      audience: 'Software engineers, DevOps leads, and technical founders',
      tone: 'Professional & Authoritative',
      outputFormat: 'Essay / Long-form Article',
      model: 'claude',
      persona: 'Veteran software engineering author and tech keynote speaker',
      constraints: 'Use concrete code snippets or architecture diagrams in ascii, avoid generic tech clichés, write compelling subheaders.',
      chainOfThought: false,
      fewShot: false
    },
    {
      label: 'Engaging Newsletter Hook & Story Arc',
      topic: 'The Psychological Cost of Context-Switching in Remote Knowledge Work',
      purpose: 'Craft an opening personal narrative leading into actionable productivity protocols',
      audience: 'Knowledge workers, product managers, and remote professionals',
      tone: 'Casual & Friendly',
      outputFormat: 'Social Media Post / Thread',
      model: 'chatgpt',
      persona: 'Substack newsletter creator with over 100,000 weekly readers',
      constraints: 'Hook readers within the first 2 sentences, keep paragraphs under 3 lines, end with an introspective question.',
      chainOfThought: false,
      fewShot: true
    },
    {
      label: 'Comprehensive Book / Chapter Review & Critique',
      topic: 'Thinking, Fast and Slow by Daniel Kahneman — Behavioral Economics Core Ideas',
      purpose: 'Provide a nuanced critical evaluation of System 1 vs System 2 thinking, replicability issues, and modern business applications',
      audience: 'Intellectual readers and product decision makers',
      tone: 'Academic & Rigorous',
      outputFormat: 'Executive Summary with Key Takeaways',
      model: 'universal',
      persona: 'Literary critic and behavioral science researcher',
      constraints: 'Balance praise with methodological critiques, summarize key cognitive biases, keep analysis rigorous.',
      chainOfThought: true,
      fewShot: false
    }
  ],
  marketing: [
    {
      label: 'High-Converting B2B SaaS Landing Page Copy',
      topic: 'AI-Powered Automated Observability & Bug Triaging Platform',
      purpose: 'Write compelling value propositions, above-the-fold headline, feature benefits, objection handling, and CTA buttons',
      audience: 'CTOs, Engineering Managers, and VP of Infrastructure at series A-C tech startups',
      tone: 'Persuasive & Action-Oriented',
      outputFormat: 'Step-by-Step Implementation Guide',
      model: 'claude',
      persona: 'Direct-response conversion copywriter specializing in developer tools and B2B SaaS',
      constraints: 'Focus on business ROI (saved dev hours, MTTR reduction), eliminate empty buzzwords, use PAS (Problem-Agitation-Solution) framework.',
      chainOfThought: false,
      fewShot: true
    },
    {
      label: 'Personalized Cold Outreach Email Sequence',
      topic: 'Cybersecurity Compliance Automation for SOC2 & ISO 27001',
      purpose: 'Craft a 3-step high-reply email sequence that provides immediate value without sounding spammy',
      audience: 'Heads of Security and Compliance Directors at growing FinTech companies',
      tone: 'Concise & Direct',
      outputFormat: 'Actionable Bullet Points',
      model: 'chatgpt',
      persona: 'Top 1% Enterprise SDR and Cold Email Strategist',
      constraints: 'Under 125 words per email, no generic compliments, clear single call-to-interest (not a hard 30-min calendar ask).',
      chainOfThought: false,
      fewShot: true
    },
    {
      label: 'Viral LinkedIn Thought Leadership Thread',
      topic: 'How Junior Developers Can Actually Stand Out in the Age of AI Coding Assistants',
      purpose: 'Share unconventional career advice backed by hiring manager perspectives to spark discussion and shares',
      audience: 'Aspiring developers, career changers, and tech hiring managers',
      tone: 'Persuasive & Action-Oriented',
      outputFormat: 'Social Media Post / Thread',
      model: 'gemini',
      persona: 'Tech founder and LinkedIn Top Voice with viral reach',
      constraints: 'Start with a contrarian one-liner hook, use white space generously, include 5 specific actionable traits.',
      chainOfThought: false,
      fewShot: false
    }
  ],
  creative: [
    {
      label: 'Sci-Fi Worldbuilding Lore Bible & Faction Design',
      topic: 'A post-climate cyberpunk metropolis powered by subterranean geothermal crystals',
      purpose: 'Develop deep worldbuilding details: economic classes, technological taboos, competing syndicates, and cultural rituals',
      audience: 'Tabletop RPG dungeon masters, novelists, and narrative game designers',
      tone: 'Creative & Imaginative',
      outputFormat: 'Markdown Comparison Table',
      model: 'claude',
      persona: 'Award-winning speculative fiction author and tabletop worldbuilder',
      constraints: 'Establish cause-and-effect for societal customs, include sensory details (sounds, smells, slang), avoid generic trope rehashes.',
      chainOfThought: true,
      fewShot: false
    },
    {
      label: 'Cinematic Midjourney / Diffusion Image Prompt',
      topic: 'Neon-lit cyberpunk alleyway in rain with an android artisan fixing a clockwork sparrow',
      purpose: 'Generate an ultra-detailed, photorealistic image prompt using Midjourney v6 parameters and lighting composition',
      audience: 'Concept artists and digital designers',
      tone: 'Creative & Imaginative',
      outputFormat: 'Clean Code with Comments & Types',
      model: 'midjourney',
      persona: 'Master Cinematographer and AI Concept Art Director',
      constraints: 'Specify focal length (85mm f/1.4), lighting (anamorphic lens flare, moody volumetric mist), camera angle, and aspect ratio flags.',
      chainOfThought: false,
      fewShot: false
    },
    {
      label: 'Screenplay Scene & Dialogue Beat Sheet',
      topic: 'Tense confrontation between a detective and their retired mentor who turned whistleblower',
      purpose: 'Write the scene outline with subtext, character motives, beats of rising tension, and climax',
      audience: 'Indie filmmakers and screenwriters',
      tone: 'Creative & Imaginative',
      outputFormat: 'Step-by-Step Implementation Guide',
      model: 'chatgpt',
      persona: 'Hollywood script doctor and dramatic screenwriting mentor',
      constraints: 'Every line must carry subtext, avoid characters saying exactly what they feel, use standard sluglines and action beats.',
      chainOfThought: true,
      fewShot: false
    }
  ],
  general: [
    {
      label: 'Decision-Making Matrix & Strategic Trade-Off Analysis',
      topic: 'Choosing between building in-house AI infrastructure vs relying on managed cloud APIs',
      purpose: 'Construct a multi-criteria decision framework evaluating TCO, latency, data governance, vendor lock-in, and talent required',
      audience: 'Executive committee and Chief Information Officer (CIO)',
      tone: 'Professional & Authoritative',
      outputFormat: 'Markdown Comparison Table',
      model: 'universal',
      persona: 'Management Consultant and Technology Strategy Director',
      constraints: 'Quantify impact on a 1-5 scale, include risk mitigation contingencies for both choices.',
      chainOfThought: true,
      fewShot: false
    }
  ]
};

// 15 Curated Showcase Prompts across all 5 categories
export const CURATED_EXAMPLES = [
  {
    id: 'ex-code-1',
    category: 'coding',
    categoryLabel: 'Coding & Dev',
    title: 'PostgreSQL Query Optimization & Indexing Blueprint',
    badge: 'Performance',
    model: 'ChatGPT / Claude',
    description: 'Directs the AI to act as a Principal Database Engineer to diagnose slow query execution plans and recommend compound B-tree/GIN indexes.',
    presetData: {
      topic: 'PostgreSQL database queries experiencing high I/O latency on 50M+ row tables',
      purpose: 'Analyze EXPLAIN ANALYZE output, recommend proper indexing strategies, and refactor slow JOINs',
      audience: 'Senior Backend Engineers and Database Administrators',
      tone: 'Technical & Precise',
      outputFormat: 'Clean Code with Comments & Types',
      model: 'chatgpt',
      persona: 'Principal Database Performance Engineer specializing in PostgreSQL internals',
      constraints: 'Highlight buffer hit rates, sequential scan eliminations, partial index considerations, and concurrency locks.'
    }
  },
  {
    id: 'ex-code-2',
    category: 'coding',
    categoryLabel: 'Coding & Dev',
    title: 'TypeScript Monorepo Architecture & Package Boundary Setup',
    badge: 'Architecture',
    model: 'Claude 3.5 Sonnet',
    description: 'Configures a clean Turborepo/Nx workspace with isolated domain packages, shared UI components, and strict boundary linting.',
    presetData: {
      topic: 'Large-scale TypeScript full-stack monorepo with web, mobile, and backend microservices',
      purpose: 'Structure workspace packages, establish dependency rules, and configure shared tsconfig/eslint configs',
      audience: 'Tech Leads and DevOps Engineers',
      tone: 'Professional & Authoritative',
      outputFormat: 'Step-by-Step Implementation Guide',
      model: 'claude',
      persona: 'Staff Infrastructure Architect with extensive enterprise monorepo experience',
      constraints: 'Prevent circular dependencies, ensure blazing fast remote caching, and provide directory tree diagram.'
    }
  },
  {
    id: 'ex-code-3',
    category: 'coding',
    categoryLabel: 'Coding & Dev',
    title: 'API Security Audit & Penetration Testing Directive',
    badge: 'Security',
    model: 'Universal LLM',
    description: 'Enforces an OWASP Top 10 security audit on REST & GraphQL endpoints, probing for IDOR, rate limiting, and broken auth.',
    presetData: {
      topic: 'Customer-facing REST and GraphQL payment gateway API endpoints',
      purpose: 'Perform a comprehensive security audit for OWASP Top 10 vulnerabilities (IDOR, SSRF, broken auth, injection)',
      audience: 'Application Security Engineers and Penetration Testers',
      tone: 'Technical & Precise',
      outputFormat: 'Actionable Bullet Points',
      model: 'universal',
      persona: 'Certified Information Systems Security Professional (CISSP) and White-Hat Penetration Tester',
      constraints: 'Provide reproducible proof-of-concept scenarios and specific remediation code diffs.'
    }
  },
  {
    id: 'ex-study-1',
    category: 'studying',
    categoryLabel: 'Studying & Academia',
    title: 'Feynman Technique: Machine Learning Backpropagation',
    badge: 'Concept Breakdown',
    model: 'ChatGPT / Claude',
    description: 'Demystifies gradient descent and the chain rule of calculus through real-world hill-climbing and sensory analogies.',
    presetData: {
      topic: 'Neural Network Backpropagation and Chain Rule of Calculus',
      purpose: 'Explain the core intuition without skipping math rigor, using intuitive physical analogies and visual diagrams',
      audience: 'Computer science undergraduates and self-taught developers',
      tone: 'Socratic & Inquisitive',
      outputFormat: 'Step-by-Step Implementation Guide',
      model: 'chatgpt',
      persona: 'Master Computer Science Educator and Author',
      constraints: 'Explain every mathematical symbol upon first mention, avoid hand-wavy assumptions, test comprehension with 3 quick questions.'
    }
  },
  {
    id: 'ex-study-2',
    category: 'studying',
    categoryLabel: 'Studying & Academia',
    title: 'USMLE / Medical Physiology High-Yield Flashcards',
    badge: 'Exam Prep',
    model: 'Claude 3.5 Sonnet',
    description: 'Produces structured Anki-compatible flashcard pairs focusing on nephrology, renin-angiotensin-aldosterone axis, and drug mechanisms.',
    presetData: {
      topic: 'Renal Physiology and the Renin-Angiotensin-Aldosterone System (RAAS)',
      purpose: 'Formulate high-yield two-sided flashcards and clinical case vignettes for spaced repetition learning',
      audience: 'Medical students studying for USMLE Step 1 / Board Exams',
      tone: 'Academic & Rigorous',
      outputFormat: 'Interactive Quiz / Flashcards',
      model: 'claude',
      persona: 'Nephrology Fellow and Board Examination Prep Instructor',
      constraints: 'Include clinical presentations, mechanism of action for ACE inhibitors vs ARBs, formatted in markdown.'
    }
  },
  {
    id: 'ex-study-3',
    category: 'studying',
    categoryLabel: 'Studying & Academia',
    title: 'Research Methodology & Literature Gap Synthesizer',
    badge: 'Research',
    model: 'Google Gemini',
    description: 'Structures a rigorous academic review comparing empirical methodologies, sample sizes, and identifying unexplored research gaps.',
    presetData: {
      topic: 'Long-term cognitive effects of smartphone push notifications on adolescent focus',
      purpose: 'Evaluate peer-reviewed literature, cross-compare conflicting studies, and synthesize unresolved methodology gaps',
      audience: 'Postgraduate psychology researchers and academic advisors',
      tone: 'Academic & Rigorous',
      outputFormat: 'Executive Summary with Key Takeaways',
      model: 'gemini',
      persona: 'Lead Academic Peer Reviewer for Cognitive Science Journals',
      constraints: 'Distinguish correlation from causation, cite study design limits, highlight open empirical questions.'
    }
  },
  {
    id: 'ex-write-1',
    category: 'writing',
    categoryLabel: 'Writing & Content',
    title: 'Deep-Dive Investigative Essay on Tech Ethics',
    badge: 'Long-form',
    model: 'Claude 3.5 Sonnet',
    description: 'Crafts an engaging, narrative-driven 2,000-word essay investigating automated decision systems in public policy.',
    presetData: {
      topic: 'The ethical perils and algorithmic bias of automated risk-assessment scoring in criminal justice',
      purpose: 'Write an investigative narrative exploring the human stories behind algorithmic decisions and systemic flaws',
      audience: 'Discerning readers of The Atlantic, Wired, and tech policy makers',
      tone: 'Academic & Rigorous',
      outputFormat: 'Essay / Long-form Article',
      model: 'claude',
      persona: 'Award-winning investigative journalist and technology essayist',
      constraints: 'Ground abstract concepts in human anecdotes, maintain journalistic balance, write evocative transitions.'
    }
  },
  {
    id: 'ex-write-2',
    category: 'writing',
    categoryLabel: 'Writing & Content',
    title: 'High-Retention Substack Newsletter Formula',
    badge: 'Newsletter',
    model: 'ChatGPT / Claude',
    description: 'Structures a punchy 4-part newsletter edition with an irresistible narrative hook, deep insight, and immediate subscriber challenge.',
    presetData: {
      topic: 'The hidden cost of "Silent Meetings" and async collaboration overload in tech companies',
      purpose: 'Write an addictive weekly newsletter issue that challenges standard management dogma and drives shares',
      audience: 'Founders, knowledge workers, and modern corporate managers',
      tone: 'Casual & Friendly',
      outputFormat: 'Social Media Post / Thread',
      model: 'chatgpt',
      persona: 'Top-tier tech newsletter editor with 80% open rates',
      constraints: 'Keep paragraphs under 3 sentences, use bold key phrases, end with a provocative community discussion prompt.'
    }
  },
  {
    id: 'ex-write-3',
    category: 'writing',
    categoryLabel: 'Writing & Content',
    title: 'Non-Fiction Book Chapter Outline & Scene Beats',
    badge: 'Publishing',
    model: 'Universal LLM',
    description: 'Designs an entire chapter blueprint using the Hero’s Journey framework adapted for non-fiction business narrative.',
    presetData: {
      topic: 'The founding story and make-or-break pivot of a failed gaming studio into Slack',
      purpose: 'Develop an immersive chapter outline with dramatic tension, character arcs, and leadership lessons',
      audience: 'Entrepreneurs, startup enthusiasts, and non-fiction readers',
      tone: 'Creative & Imaginative',
      outputFormat: 'Step-by-Step Implementation Guide',
      model: 'universal',
      persona: 'Bestselling Silicon Valley biographer and narrative non-fiction editor',
      constraints: 'Outline opening hook, inciting crisis, internal conflict, revelation moment, and key takeaways.'
    }
  },
  {
    id: 'ex-market-1',
    category: 'marketing',
    categoryLabel: 'Marketing & Sales',
    title: 'High-Converting SaaS Hero Section & Value Prop',
    badge: 'Conversion Rate',
    model: 'Claude 3.5 Sonnet',
    description: 'Formulates a killer landing page headline, subheadline, 3 benefit bullet points, and social proof triggers that maximize signups.',
    presetData: {
      topic: 'All-in-one developer productivity tracker that eliminates manual Jira status updates',
      purpose: 'Write an ultra-persuasive hero section and value proposition testing 3 distinct psychological angles (Fear of missing out, Time savings, Career growth)',
      audience: 'Overworked engineering managers and startup CTOs',
      tone: 'Persuasive & Action-Oriented',
      outputFormat: 'Markdown Comparison Table',
      model: 'claude',
      persona: 'High-ticket conversion rate optimization (CRO) director and SaaS copywriter',
      constraints: 'Keep headlines under 9 words, eliminate corporate fluff, explicitly contrast old vs new way.'
    }
  },
  {
    id: 'ex-market-2',
    category: 'marketing',
    categoryLabel: 'Marketing & Sales',
    title: 'Multi-Touch Enterprise Cold Outreach Cadence',
    badge: 'B2B Sales',
    model: 'ChatGPT',
    description: 'Constructs a 4-touchpoint sales outreach sequence combining personalized email, LinkedIn voice note script, and warm follow-up.',
    presetData: {
      topic: 'Enterprise AI code compliance and secret leakage prevention scanner',
      purpose: 'Write a non-pushy, high-response sales sequence focusing on recently announced security breaches and compliance deadlines',
      audience: 'Chief Information Security Officers (CISOs) at publicly traded companies',
      tone: 'Concise & Direct',
      outputFormat: 'Actionable Bullet Points',
      model: 'chatgpt',
      persona: 'Top-performing Enterprise Account Executive who closes 7-figure cybersecurity deals',
      constraints: 'Zero generic templates, each email must offer a free proprietary benchmark report, total words under 120 per email.'
    }
  },
  {
    id: 'ex-market-3',
    category: 'marketing',
    categoryLabel: 'Marketing & Sales',
    title: 'Viral Twitter / X Thread Hook & Architecture',
    badge: 'Social Growth',
    model: 'Gemini / Claude',
    description: 'Generates a 10-tweet viral thread structure breaking down how a bootstrapped founder scaled to $10M ARR in 24 months.',
    presetData: {
      topic: 'Unvarnished growth breakdown of a solo bootstrapped software developer scaling to $10M ARR',
      purpose: 'Hook scrolling readers, deliver dense actionable takeaways with zero fluff, and drive profile follows and newsletter opt-ins',
      audience: 'Indie hackers, startup operators, and tech enthusiasts on X/Twitter',
      tone: 'Persuasive & Action-Oriented',
      outputFormat: 'Social Media Post / Thread',
      model: 'gemini',
      persona: 'Viral organic social strategist with over 500M organic impressions',
      constraints: 'Hook must contain an intriguing contrast, use numbered tweet formatting, embed CTA smoothly in penultimate tweet.'
    }
  },
  {
    id: 'ex-creat-1',
    category: 'creative',
    categoryLabel: 'Creative & Design',
    title: 'Photorealistic Cinematic Midjourney v6 Prompt',
    badge: 'Image Gen',
    model: 'Midjourney v6',
    description: 'Constructs an ultra-rich image generation prompt featuring lighting, camera lens, color grading, and aspect ratio flags.',
    presetData: {
      topic: 'A solitary astronaut discovering an ancient bioluminescent cathedral overgrown with crystal vegetation on a frozen moon',
      purpose: 'Generate an atmospheric, cinematic, award-winning concept art prompt with exact lighting and camera specifications',
      audience: 'Midjourney and Stable Diffusion creators, concept artists',
      tone: 'Creative & Imaginative',
      outputFormat: 'Clean Code with Comments & Types',
      model: 'midjourney',
      persona: 'Hollywood Director of Photography and World-Class Concept Artist',
      constraints: 'Include exact lighting specs (chiaroscuro, rim light), lens details (Panavision anamorphic 70mm, f/2.0), film stock (Kodak Vision3 500T), and Midjourney flags (--v 6.0 --ar 16:9 --style raw --q 2).'
    }
  },
  {
    id: 'ex-creat-2',
    category: 'creative',
    categoryLabel: 'Creative & Design',
    title: 'Immersive Tabletop RPG Campaign Opening Scenario',
    badge: 'Worldbuilding',
    model: 'Claude 3.5 Sonnet',
    description: 'Designs an unforgettable opening tavern-twist scene with sensory descriptions, dynamic NPCs, and sudden moral dilemma.',
    presetData: {
      topic: 'A dark-fantasy border town experiencing a supernatural eclipse that turns shadows into sentient beasts',
      purpose: 'Design the opening 60-minute prologue adventure session with environmental hazards, distinct NPC voices, and high stakes',
      audience: 'Dungeon Masters and Tabletop RPG players',
      tone: 'Creative & Imaginative',
      outputFormat: 'Step-by-Step Implementation Guide',
      model: 'claude',
      persona: 'Veteran D&D Game Master and Speculative Fiction Author',
      constraints: 'Engage all 5 senses in the opening read-aloud boxed text, provide 3 distinct paths for players to react, include NPC secrets.'
    }
  },
  {
    id: 'ex-creat-3',
    category: 'creative',
    categoryLabel: 'Creative & Design',
    title: 'Character Voice Bible & Dialogue Differentiation',
    badge: 'Writing Craft',
    model: 'Universal LLM',
    description: 'Establishes distinct dialogue patterns, catchphrases, speech rhythms, and psychological subtext for three rival characters.',
    presetData: {
      topic: 'Three rival starship captains trapped in a derelict orbital station negotiating over a single escape capsule',
      purpose: 'Create a voice bible specifying cadence, vocabulary, defense mechanisms, and sample lines of dialogue for each character',
      audience: 'Novelists, scriptwriters, and game narrative designers',
      tone: 'Creative & Imaginative',
      outputFormat: 'Markdown Comparison Table',
      model: 'universal',
      persona: 'Dramatic Dialogue Coach and Playwright',
      constraints: 'Ensure each character sounds unmistakably unique without names attached, detail non-verbal physical quirks.'
    }
  }
];
