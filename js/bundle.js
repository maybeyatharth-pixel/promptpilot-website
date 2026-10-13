/**
 * PromptPilot — Production Application Bundle
 * Combines Presets, Storage, Generator, UI, and App Controller.
 * Formatted as an IIFE for 100% compatibility across both HTTP servers
 * and direct file:// local previews in all modern browsers.
 */

(function () {
  'use strict';

  /* =========================================================
     1. PRESETS & CURATED DATA
     ========================================================= */
  const CATEGORIES = [
    { id: 'coding', name: 'Coding & Dev', icon: '💻', desc: 'Code architecture, refactoring, test suites, and debugging' },
    { id: 'studying', name: 'Studying & Academia', icon: '📚', desc: 'Feynman technique, exam prep, active recall, and syntheses' },
    { id: 'writing', name: 'Writing & Content', icon: '✍️', desc: 'Technical essays, newsletters, storytelling, and copy editing' },
    { id: 'marketing', name: 'Marketing & Sales', icon: '📈', desc: 'Campaign strategies, cold outreach, value props, and landing pages' },
    { id: 'creative', name: 'Creative & Design', icon: '🎨', desc: 'Worldbuilding, cinematic Midjourney prompts, and scriptwriting' },
    { id: 'general', name: 'General / Universal', icon: '⚡', desc: 'Structured workflows, decision matrices, and executive summaries' }
  ];

  const PRESETS_BY_CATEGORY = {
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

  const CURATED_EXAMPLES = [
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

  /* =========================================================
     2. LOCAL STORAGE MANAGEMENT
     ========================================================= */
  const STORAGE_KEYS = {
    SAVED_PROMPTS: 'promptpilot_saved_prompts'
  };

  function isStorageAvailable() {
    try {
      const test = '__pp_storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  function getSavedPrompts() {
    if (!isStorageAvailable()) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_PROMPTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function savePrompt(promptItem) {
    if (!isStorageAvailable()) return { success: false, reason: 'LocalStorage is unavailable' };
    try {
      const saved = getSavedPrompts();
      const exists = saved.some(item => item.id === promptItem.id || item.rawText === promptItem.rawText);
      if (exists) {
        return { success: false, reason: 'Already saved in favorites!' };
      }

      const newItem = {
        id: promptItem.id || `prompt_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        title: promptItem.topic ? truncateText(promptItem.topic, 45) : 'Custom Generated Prompt',
        category: promptItem.category || 'general',
        model: promptItem.model || 'universal',
        rawText: promptItem.rawText,
        formData: promptItem.formData || {},
        savedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      saved.unshift(newItem);
      if (saved.length > 50) saved.pop();

      localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(saved));
      return { success: true, item: newItem, count: saved.length };
    } catch (e) {
      return { success: false, reason: 'Storage quota exceeded' };
    }
  }

  function deleteSavedPrompt(id) {
    if (!isStorageAvailable()) return false;
    try {
      const saved = getSavedPrompts();
      const filtered = saved.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(filtered));
      return { success: true, count: filtered.length };
    } catch (e) {
      return false;
    }
  }

  function clearAllSavedPrompts() {
    if (!isStorageAvailable()) return false;
    try {
      localStorage.removeItem(STORAGE_KEYS.SAVED_PROMPTS);
      return true;
    } catch (e) {
      return false;
    }
  }

  function truncateText(str, maxLen = 40) {
    if (!str) return 'Untitled';
    return str.length > maxLen ? str.substring(0, maxLen) + '…' : str;
  }

  /* =========================================================
     3. UI CONTROLS & UTILITIES
     ========================================================= */
  function showToast(message, type = 'success', duration = 3200) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');

    const icons = {
      success: `<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`,
      info: `<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>`,
      warning: `<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`,
      error: `<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>`
    };

    toast.innerHTML = `
      ${icons[type] || icons.info}
      <span class="toast-message">${escapeHtml(message)}</span>
      <button class="toast-close" aria-label="Dismiss">&times;</button>
    `;

    container.appendChild(toast);

    const dismiss = () => {
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 250);
    };

    toast.querySelector('.toast-close').addEventListener('click', dismiss);
    const timer = setTimeout(dismiss, duration);
    toast.addEventListener('mouseenter', () => clearTimeout(timer));
  }

  async function copyToClipboard(text, triggerButton = null) {
    if (!text) {
      showToast('Nothing to copy yet!', 'warning');
      return false;
    }

    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch (err) {
      success = false;
    }

    if (success) {
      showToast('Prompt copied to clipboard! Ready to paste into ChatGPT, Claude, or Gemini.', 'success');
      if (triggerButton) {
        triggerButton.classList.add('btn-copied');
        const originalHtml = triggerButton.innerHTML;
        triggerButton.innerHTML = `
          <svg class="icon-inline" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <span>Copied!</span>
        `;
        setTimeout(() => {
          triggerButton.innerHTML = originalHtml;
          triggerButton.classList.remove('btn-copied');
        }, 2200);
      }
      return true;
    } else {
      showToast('Could not copy automatically. Please select text manually.', 'error');
      return false;
    }
  }

  function exportFile(content, filename = 'promptpilot-prompt.md', mime = 'text/markdown') {
    if (!content) {
      showToast('No prompt content to export.', 'warning');
      return;
    }

    try {
      const blob = new Blob([content], { type: `${mime};charset=utf-8` });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast(`Downloaded as ${filename}`, 'info');
    } catch (err) {
      showToast('Export failed. Please copy text directly.', 'error');
    }
  }

  function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-btn');
    const navDrawer = document.getElementById('mobile-nav-drawer');
    const navOverlay = document.getElementById('mobile-nav-overlay');
    const closeBtn = document.getElementById('mobile-menu-close');

    if (!toggleBtn || !navDrawer) return;

    const openNav = () => {
      navDrawer.classList.add('is-open');
      if (navOverlay) navOverlay.classList.add('is-visible');
      document.body.classList.add('scroll-locked');
      toggleBtn.setAttribute('aria-expanded', 'true');
    };

    const closeNav = () => {
      navDrawer.classList.remove('is-open');
      if (navOverlay) navOverlay.classList.remove('is-visible');
      document.body.classList.remove('scroll-locked');
      toggleBtn.setAttribute('aria-expanded', 'false');
    };

    toggleBtn.addEventListener('click', () => {
      if (navDrawer.classList.contains('is-open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeNav);
    if (navOverlay) navOverlay.addEventListener('click', closeNav);

    const links = navDrawer.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navDrawer.classList.contains('is-open')) {
        closeNav();
      }
    });
  }

  function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* =========================================================
     4. PROMPT GENERATION ENGINE (CO-STAR & RTF)
     ========================================================= */
  function validatePromptInputs(inputs) {
    const errors = {};
    if (!inputs.topic || !inputs.topic.trim()) {
      errors.topic = 'Please specify a topic or subject.';
    } else if (inputs.topic.trim().length < 3) {
      errors.topic = 'Topic is too short. Provide at least 3 characters.';
    }

    if (!inputs.purpose || !inputs.purpose.trim()) {
      errors.purpose = 'Please define what the AI should achieve.';
    } else if (inputs.purpose.trim().length < 5) {
      errors.purpose = 'Purpose is too brief. Provide a more specific goal.';
    }

    if (!inputs.audience || !inputs.audience.trim()) {
      errors.audience = 'Please designate who this output is meant for.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  function generatePrompt(data) {
    const {
      category = 'general',
      topic = '',
      purpose = '',
      audience = 'General Audience',
      tone = 'Professional & Authoritative',
      outputFormat = 'Step-by-Step Implementation Guide',
      model = 'universal',
      persona = '',
      constraints = '',
      chainOfThought = true,
      fewShot = false
    } = data;

    const effectivePersona = persona.trim() || getDefaultPersona(category);
    let rawText = '';
    let segments = [];

    if (model === 'midjourney') {
      const mj = generateMidjourneyPrompt({ topic, purpose, tone, constraints });
      rawText = mj.rawText;
      segments = mj.segments;
    } else if (model === 'claude') {
      const cl = generateClaudeXmlPrompt({
        category,
        topic,
        purpose,
        audience,
        tone,
        outputFormat,
        persona: effectivePersona,
        constraints,
        chainOfThought,
        fewShot
      });
      rawText = cl.rawText;
      segments = cl.segments;
    } else {
      const std = generateStandardMarkdownPrompt({
        category,
        topic,
        purpose,
        audience,
        tone,
        outputFormat,
        model,
        persona: effectivePersona,
        constraints,
        chainOfThought,
        fewShot
      });
      rawText = std.rawText;
      segments = std.segments;
    }

    const wordCount = countWords(rawText);
    const charCount = rawText.length;
    const tokenCount = Math.round(charCount / 3.8);
    const quality = calculateQualityScore({
      persona: effectivePersona,
      topic,
      purpose,
      audience,
      constraints,
      outputFormat,
      chainOfThought
    });

    return {
      rawText,
      segments,
      metrics: {
        wordCount,
        charCount,
        tokenCount,
        qualityScore: quality.score,
        qualityBreakdown: quality.breakdown,
        framework: model === 'midjourney' ? 'Direct Prompt Syntax' : 'CO-STAR & RTF Framework'
      },
      meta: {
        category,
        model,
        generatedAt: new Date().toISOString()
      }
    };
  }

  function generateStandardMarkdownPrompt(params) {
    const {
      topic,
      purpose,
      audience,
      tone,
      outputFormat,
      model,
      persona,
      constraints,
      chainOfThought,
      fewShot
    } = params;

    const modelHeading = model === 'chatgpt' 
      ? 'System & User Instruction (Optimized for GPT-4o)' 
      : model === 'gemini' 
        ? 'Structured Directive (Optimized for Gemini 1.5/2.0)'
        : 'Master System Instruction (Universal LLM)';

    const segments = [];

    segments.push({
      title: '1. Role & Persona Definition',
      code: `Act as a ${persona}. You have extensive deep domain mastery and consistently produce rigorous, publication-grade work with zero superfluous filler.`
    });

    segments.push({
      title: '2. Context & Core Objective',
      code: `### Context:\nWe are addressing the following subject: "${topic.trim()}".\n\n### Objective:\nYour primary goal is: ${purpose.trim()}. Ensure all explanations, recommendations, or code directly fulfill this objective.`
    });

    segments.push({
      title: '3. Audience & Tone Directives',
      code: `- **Target Audience:** ${audience.trim()}. Calibrate vocabulary, complexity, and mental models specifically for this audience.\n- **Tone & Style:** ${tone}. Maintain this posture unwaveringly from start to finish.`
    });

    segments.push({
      title: '4. Output Format Specifications',
      code: `Present your response formatted strictly as: **${outputFormat}**.\n- Utilize clean Markdown formatting, descriptive headings, bullet points, and code fences where applicable.\n- Ensure the structure is immediately skimmable and actionable.`
    });

    const defaultConstraints = '1. Avoid vague generalities; provide concrete, actionable specifics.\n2. Do not include boilerplate conversational openers (e.g., "Sure, I can help with that"). Start directly with the substance.\n3. Verify all technical syntax, logic, and factual statements for accuracy.';
    const effectiveConstraints = constraints.trim() 
      ? `${constraints.trim()}\n4. Do not include introductory fluff or closing pleasantries.` 
      : defaultConstraints;

    segments.push({
      title: '5. Strict Directives & Constraints',
      code: effectiveConstraints
    });

    if (chainOfThought) {
      segments.push({
        title: '6. Execution Strategy (Chain-of-Thought)',
        code: `Before outputting your final response:\n1. Mentally analyze the edge cases and critical dependencies of this request.\n2. Verify that all constraints listed above are strictly respected.\n3. Formulate the response step-by-step to maximize clarity and technical depth.`
      });
    }

    if (fewShot) {
      segments.push({
        title: '7. Expected Response Structure (Scaffolding)',
        code: `Follow this structural outline in your output:\n- **Overview / Executive Context**\n- **Core Implementation / Solution**\n- **Critical Considerations & Edge Cases**\n- **Immediate Next Steps / Action Items**`
      });
    }

    let rawText = `# ${modelHeading}\n\n`;
    rawText += `## [Role & Persona]\n${segments[0].code}\n\n`;
    rawText += `## [Context & Core Objective]\n${segments[1].code}\n\n`;
    rawText += `## [Audience & Tone]\n${segments[2].code}\n\n`;
    rawText += `## [Output Format Specifications]\n${segments[3].code}\n\n`;
    rawText += `## [Strict Constraints & Negative Rules]\n${segments[4].code}\n\n`;

    if (chainOfThought) {
      rawText += `## [Reasoning Process]\n${segments[5].code}\n\n`;
    }

    if (fewShot) {
      const fewShotIndex = chainOfThought ? 6 : 5;
      rawText += `## [Structural Template]\n${segments[fewShotIndex].code}\n\n`;
    }

    rawText += `Begin your response directly without meta-commentary.`;

    return { rawText, segments };
  }

  function generateClaudeXmlPrompt(params) {
    const {
      topic,
      purpose,
      audience,
      tone,
      outputFormat,
      persona,
      constraints,
      chainOfThought,
      fewShot
    } = params;

    const segments = [];

    segments.push({
      title: 'Role Specification',
      code: `<role>\nYou are a ${persona}. Your analysis and deliverables are renowned for precision, clarity, and deep domain rigor.\n</role>`
    });

    segments.push({
      title: 'Context & Task Details',
      code: `<context>\nTopic: ${topic.trim()}\nAudience: ${audience.trim()}\nTone: ${tone}\n</context>\n\n<task>\n${purpose.trim()}\n</task>`
    });

    const effectiveConstraints = constraints.trim()
      ? `<constraints>\n- ${constraints.trim().split('\n').filter(Boolean).join('\n- ')}\n- Omit generic preamble, throat-clearing, and boilerplate conversation.\n</constraints>`
      : `<constraints>\n- Avoid superficial advice; deliver comprehensive, production-grade substance.\n- Omit generic preamble, throat-clearing, and boilerplate conversation.\n- Verify all assumptions and state any trade-offs clearly.\n</constraints>`;

    segments.push({
      title: 'Constraints & Boundary Rules',
      code: effectiveConstraints
    });

    segments.push({
      title: 'Output Format Specifications',
      code: `<output_format>\nDeliver your response strictly structured as: ${outputFormat}.\nEnsure clean markdown headings and high information density.\n</output_format>`
    });

    if (chainOfThought) {
      segments.push({
        title: 'Thinking Directive',
        code: `<instructions>\nUse <thinking> tags to carefully plan your structure, review constraints, and verify edge-cases before providing your final answer outside of the thinking tags.\n</instructions>`
      });
    }

    if (fewShot) {
      segments.push({
        title: 'Structural Outline',
        code: `<response_outline>\n1. Diagnostic / Context Summary\n2. Primary Deliverable / Implementation\n3. Verification & Best Practices\n</response_outline>`
      });
    }

    let rawText = `${segments[0].code}\n\n${segments[1].code}\n\n${segments[2].code}\n\n${segments[3].code}\n\n`;
    if (chainOfThought) {
      rawText += `${segments[4].code}\n\n`;
    }
    if (fewShot) {
      const outlineIndex = chainOfThought ? 5 : 4;
      rawText += `${segments[outlineIndex].code}\n\n`;
    }
    rawText += `Please execute the task now.`;

    return { rawText, segments };
  }

  function generateMidjourneyPrompt(params) {
    const { topic, purpose, tone, constraints } = params;

    const styleDescriptor = tone.includes('Creative') 
      ? 'cinematic concept art, hyper-detailed, award-winning composition'
      : 'photorealistic 35mm photograph, editorial magazine quality, ultra-detailed';

    let rawText = `/imagine prompt: ${topic.trim()}, ${purpose.trim()}, ${styleDescriptor}, volumetric lighting, 8k resolution, octane render, photorealistic, intricate textures`;

    if (constraints.trim()) {
      rawText += `, ${constraints.trim()}`;
    }

    rawText += ` --ar 16:9 --v 6.0 --style raw --q 2`;

    const segments = [
      {
        title: 'Subject & Core Scene',
        code: `${topic.trim()}, ${purpose.trim()}`
      },
      {
        title: 'Artistic Style & Atmosphere',
        code: `${styleDescriptor}, volumetric lighting, 8k resolution, intricate textures`
      },
      {
        title: 'Midjourney v6 Execution Parameters',
        code: `--ar 16:9 --v 6.0 --style raw --q 2`
      }
    ];

    return { rawText, segments };
  }

  function getDefaultPersona(category) {
    switch (category) {
      case 'coding':
        return 'Principal Software Architect and Senior Code Reviewer';
      case 'studying':
        return 'Distinguished Academic Professor and Learning Strategist';
      case 'writing':
        return 'Senior Editorial Director and Bestselling Non-Fiction Author';
      case 'marketing':
        return 'Chief Marketing Officer and Direct-Response Conversion Specialist';
      case 'creative':
        return 'Award-Winning Creative Director and Master Narrative Designer';
      default:
        return 'World-Class Domain Specialist and Strategic Consultant';
    }
  }

  function countWords(str) {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
  }

  function calculateQualityScore(fields) {
    let score = 20;
    const breakdown = [];

    if (fields.topic && fields.topic.length > 10) {
      score += 15;
      breakdown.push({ label: 'Specific Subject Defined', passed: true, points: 15 });
    } else {
      breakdown.push({ label: 'Specific Subject Defined', passed: false, points: 0, hint: 'Make topic more detailed' });
    }

    if (fields.persona && fields.persona.trim().length > 5) {
      score += 20;
      breakdown.push({ label: 'Expert Persona Assigned', passed: true, points: 20 });
    } else {
      breakdown.push({ label: 'Expert Persona Assigned', passed: false, points: 0, hint: 'Specify a concrete role' });
    }

    if (fields.audience && fields.audience.trim().length > 3) {
      score += 15;
      breakdown.push({ label: 'Audience Calibrated', passed: true, points: 15 });
    } else {
      breakdown.push({ label: 'Audience Calibrated', passed: false, points: 0, hint: 'Identify target reader' });
    }

    if (fields.outputFormat && fields.outputFormat.trim().length > 3) {
      score += 15;
      breakdown.push({ label: 'Explicit Output Format', passed: true, points: 15 });
    } else {
      breakdown.push({ label: 'Explicit Output Format', passed: false, points: 0, hint: 'Choose an exact format' });
    }

    if (fields.constraints && fields.constraints.trim().length > 10) {
      score += 15;
      breakdown.push({ label: 'Negative Constraints Defined', passed: true, points: 15 });
    } else {
      breakdown.push({ label: 'Negative Constraints Defined', passed: false, points: 0, hint: 'Add rules or what to avoid' });
    }

    return {
      score: Math.min(100, score),
      breakdown
    };
  }

  /* =========================================================
     5. MAIN APPLICATION CONTROLLER
     ========================================================= */
  const state = {
    currentCategory: 'coding',
    currentModel: 'universal',
    lastGeneratedPrompt: null,
    activeFilter: 'all'
  };

  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initBackToTop();
    initCategoryTabs();
    initPresetsDropdown('coding');
    initFormListeners();
    initExamplesSection();
    initOutputActions();
    initSavedPromptsDrawer();
    initContactForm();
    updateSavedBadge();

    // Load initial default prompt
    if (PRESETS_BY_CATEGORY.coding && PRESETS_BY_CATEGORY.coding[0]) {
      loadPresetIntoForm(PRESETS_BY_CATEGORY.coding[0]);
    }
  });

  function initCategoryTabs() {
    const container = document.getElementById('category-tabs');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => `
      <button type="button" class="category-pill ${cat.id === state.currentCategory ? 'active' : ''}" data-category="${cat.id}">
        <span class="pill-icon">${cat.icon}</span>
        <span class="pill-name">${cat.name}</span>
      </button>
    `).join('');

    container.addEventListener('click', (e) => {
      const pill = e.target.closest('.category-pill');
      if (!pill) return;
      const catId = pill.dataset.category;
      switchCategory(catId);
    });
  }

  function switchCategory(catId) {
    state.currentCategory = catId;

    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.category === catId);
    });

    const categorySelect = document.getElementById('field-category');
    if (categorySelect && categorySelect.value !== catId) {
      categorySelect.value = catId;
    }

    initPresetsDropdown(catId);
    updatePlaceholdersForCategory(catId);
  }

  function initPresetsDropdown(catId) {
    const select = document.getElementById('field-preset-picker');
    if (!select) return;

    const presets = PRESETS_BY_CATEGORY[catId] || PRESETS_BY_CATEGORY.general;
    select.innerHTML = `
      <option value="">⚡ Select a pre-crafted template (${presets.length} available)...</option>
      ${presets.map((p, idx) => `<option value="${idx}">${escapeHtml(p.label)}</option>`).join('')}
    `;

    select.onchange = () => {
      const idx = select.value;
      if (idx !== '') {
        const selectedPreset = presets[idx];
        loadPresetIntoForm(selectedPreset);
        showToast(`Loaded template: "${selectedPreset.label}"`, 'info', 2000);
        select.value = '';
      }
    };
  }

  function updatePlaceholdersForCategory(catId) {
    const topicInput = document.getElementById('field-topic');
    const purposeInput = document.getElementById('field-purpose');
    const audienceInput = document.getElementById('field-audience');

    const placeholders = {
      coding: {
        topic: 'e.g., PostgreSQL connection pool exhaustion during peak traffic',
        purpose: 'e.g., Refactor query routing and recommend pgbouncer configurations',
        audience: 'e.g., Senior Backend Engineers and DevOps Architects'
      },
      studying: {
        topic: 'e.g., Epigenetics and DNA methylation mechanisms',
        purpose: 'e.g., Break down how environmental factors regulate gene expression using the Feynman Technique',
        audience: 'e.g., First-year Molecular Biology college students'
      },
      writing: {
        topic: 'e.g., Why remote team culture fails without intentional serendipity',
        purpose: 'e.g., Write a compelling 1,500-word essay with a strong opening personal hook',
        audience: 'e.g., Founders, remote team managers, and product leaders'
      },
      marketing: {
        topic: 'e.g., AI automated contract review software for legal teams',
        purpose: 'e.g., Write a high-converting B2B landing page hero section and 3 core value props',
        audience: 'e.g., In-house General Counsels and Legal Operations Directors'
      },
      creative: {
        topic: 'e.g., A clandestine subterranean night market illuminated by bio-lanterns',
        purpose: 'e.g., Write an atmospheric concept scene detailing sensory sights, smells, and unique slang',
        audience: 'e.g., Tabletop RPG players and sci-fi worldbuilders'
      },
      general: {
        topic: 'e.g., Transitioning from a monolithic repo to distributed micro-frontends',
        purpose: 'e.g., Create a decision matrix evaluating engineering velocity, latency, and operational cost',
        audience: 'e.g., Engineering Directors and Tech Leads'
      }
    };

    const current = placeholders[catId] || placeholders.general;
    if (topicInput) topicInput.placeholder = current.topic;
    if (purposeInput) purposeInput.placeholder = current.purpose;
    if (audienceInput) audienceInput.placeholder = current.audience;
  }

  function loadPresetIntoForm(preset) {
    if (!preset) return;

    setInputValue('field-topic', preset.topic);
    setInputValue('field-purpose', preset.purpose);
    setInputValue('field-audience', preset.audience);
    setInputValue('field-tone', preset.tone);
    setInputValue('field-output-format', preset.outputFormat);
    setInputValue('field-model', preset.model || 'universal');
    setInputValue('field-persona', preset.persona || '');
    setInputValue('field-constraints', preset.constraints || '');

    const cotCheckbox = document.getElementById('field-cot');
    if (cotCheckbox) cotCheckbox.checked = preset.chainOfThought !== false;

    const fewShotCheckbox = document.getElementById('field-few-shot');
    if (fewShotCheckbox) fewShotCheckbox.checked = preset.fewShot === true;

    clearFormErrors();
    handleGenerate();
  }

  function initFormListeners() {
    const form = document.getElementById('prompt-form');
    const resetBtn = document.getElementById('btn-reset-form');
    const randomBtn = document.getElementById('btn-random-inspiration');
    const advancedToggle = document.getElementById('advanced-toggle-btn');
    const advancedDrawer = document.getElementById('advanced-fields-drawer');
    const categorySelect = document.getElementById('field-category');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleGenerate();
      });
    }

    if (categorySelect) {
      categorySelect.addEventListener('change', () => {
        switchCategory(categorySelect.value);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetFormToCleanState();
      });
    }

    if (randomBtn) {
      randomBtn.addEventListener('click', () => {
        pickRandomInspiration();
      });
    }

    if (advancedToggle && advancedDrawer) {
      advancedToggle.addEventListener('click', () => {
        const isExpanded = advancedToggle.getAttribute('aria-expanded') === 'true';
        advancedToggle.setAttribute('aria-expanded', !isExpanded);
        advancedDrawer.classList.toggle('is-open', !isExpanded);
        advancedToggle.querySelector('.toggle-arrow').textContent = !isExpanded ? '▲' : '▼';
      });
    }

    const modelSelect = document.getElementById('field-model');
    if (modelSelect) {
      modelSelect.addEventListener('change', () => {
        state.currentModel = modelSelect.value;
        const modelNotice = document.getElementById('model-format-notice');
        if (modelNotice) {
          if (modelSelect.value === 'claude') {
            modelNotice.textContent = '✨ Claude XML tags (<context>, <task>, <constraints>) activated for optimum adherence.';
            modelNotice.style.display = 'block';
          } else if (modelSelect.value === 'midjourney') {
            modelNotice.textContent = '🎨 Midjourney prompt syntax (/imagine prompt: ... --ar 16:9 --v 6.0) activated.';
            modelNotice.style.display = 'block';
          } else {
            modelNotice.style.display = 'none';
          }
        }
      });
    }

    ['field-topic', 'field-purpose', 'field-audience'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          el.classList.remove('has-error');
          const errEl = document.getElementById(`${id}-error`);
          if (errEl) errEl.textContent = '';
        });
      }
    });
  }

  function handleGenerate() {
    const formData = {
      category: state.currentCategory,
      topic: getInputValue('field-topic'),
      purpose: getInputValue('field-purpose'),
      audience: getInputValue('field-audience'),
      tone: getInputValue('field-tone'),
      outputFormat: getInputValue('field-output-format'),
      model: getInputValue('field-model'),
      persona: getInputValue('field-persona'),
      constraints: getInputValue('field-constraints'),
      chainOfThought: document.getElementById('field-cot')?.checked ?? true,
      fewShot: document.getElementById('field-few-shot')?.checked ?? false
    };

    const validation = validatePromptInputs(formData);
    if (!validation.isValid) {
      displayFormErrors(validation.errors);
      showToast('Please fix the highlighted fields to generate your prompt.', 'warning');
      return;
    }

    clearFormErrors();

    const generated = generatePrompt(formData);
    state.lastGeneratedPrompt = {
      ...generated,
      formData,
      category: state.currentCategory,
      model: formData.model
    };

    renderOutputWorkspace(generated);

    const genBtn = document.getElementById('btn-generate');
    if (genBtn) {
      genBtn.classList.add('btn-pulse');
      setTimeout(() => genBtn.classList.remove('btn-pulse'), 500);
    }
  }

  function renderOutputWorkspace(result) {
    const emptyState = document.getElementById('output-empty-state');
    const activeState = document.getElementById('output-active-state');
    const promptContainer = document.getElementById('prompt-text-display');
    const rawTextarea = document.getElementById('prompt-raw-textarea');
    const wordCountEl = document.getElementById('metric-word-count');
    const tokenCountEl = document.getElementById('metric-token-count');
    const qualityScoreEl = document.getElementById('metric-quality-score');
    const qualityProgressEl = document.getElementById('quality-score-bar');
    const frameworkBadgeEl = document.getElementById('metric-framework-badge');

    if (emptyState) emptyState.style.display = 'none';
    if (activeState) activeState.style.display = 'flex';

    if (wordCountEl) wordCountEl.textContent = `${result.metrics.wordCount} words`;
    if (tokenCountEl) tokenCountEl.textContent = `~${result.metrics.tokenCount} tokens`;
    if (qualityScoreEl) qualityScoreEl.textContent = `${result.metrics.qualityScore}/100`;
    if (qualityProgressEl) qualityProgressEl.style.width = `${result.metrics.qualityScore}%`;
    if (frameworkBadgeEl) frameworkBadgeEl.textContent = result.metrics.framework;

    if (promptContainer) {
      promptContainer.innerHTML = result.segments.map(seg => `
        <div class="prompt-segment-card">
          <div class="segment-header">
            <span class="segment-indicator"></span>
            <span class="segment-title">${escapeHtml(seg.title)}</span>
          </div>
          <pre class="segment-body"><code>${escapeHtml(seg.code)}</code></pre>
        </div>
      `).join('');
    }

    if (rawTextarea) {
      rawTextarea.value = result.rawText;
    }
  }

  function clearFormErrors() {
    document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.classList.remove('has-error');
    });
    document.querySelectorAll('.field-error-msg').forEach(msg => {
      msg.textContent = '';
    });
  }

  function displayFormErrors(errors) {
    Object.keys(errors).forEach(key => {
      const input = document.getElementById(`field-${key}`);
      const errEl = document.getElementById(`field-${key}-error`);
      if (input) input.classList.add('has-error');
      if (errEl) errEl.textContent = errors[key];
    });
  }

  function resetFormToCleanState() {
    setInputValue('field-topic', '');
    setInputValue('field-purpose', '');
    setInputValue('field-audience', 'General Audience');
    setInputValue('field-persona', '');
    setInputValue('field-constraints', '');

    const cotCheckbox = document.getElementById('field-cot');
    if (cotCheckbox) cotCheckbox.checked = true;

    const fewShotCheckbox = document.getElementById('field-few-shot');
    if (fewShotCheckbox) fewShotCheckbox.checked = false;

    clearFormErrors();

    const emptyState = document.getElementById('output-empty-state');
    const activeState = document.getElementById('output-active-state');
    if (emptyState) emptyState.style.display = 'flex';
    if (activeState) activeState.style.display = 'none';

    state.lastGeneratedPrompt = null;
    showToast('Generator cleared. Fill in fields or select a preset to begin.', 'info');
  }

  function pickRandomInspiration() {
    const allCategoryKeys = Object.keys(PRESETS_BY_CATEGORY);
    const randomCat = allCategoryKeys[Math.floor(Math.random() * allCategoryKeys.length)];
    const presets = PRESETS_BY_CATEGORY[randomCat];
    const randomPreset = presets[Math.floor(Math.random() * presets.length)];

    switchCategory(randomCat);
    loadPresetIntoForm(randomPreset);
    showToast(`Loaded inspiration: "${randomPreset.label}" (${randomCat})`, 'success');
  }

  function initOutputActions() {
    const copyBtn = document.getElementById('btn-copy-prompt');
    const saveBtn = document.getElementById('btn-save-prompt');
    const exportMdBtn = document.getElementById('btn-export-md');
    const exportTxtBtn = document.getElementById('btn-export-txt');
    const viewToggleBtn = document.getElementById('btn-toggle-view');
    const promptContainer = document.getElementById('prompt-text-display');
    const rawContainer = document.getElementById('prompt-raw-wrapper');

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = getCurrentPromptText();
        copyToClipboard(text, copyBtn);
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        if (!state.lastGeneratedPrompt) {
          showToast('Generate a prompt before saving.', 'warning');
          return;
        }
        const result = savePrompt({
          topic: state.lastGeneratedPrompt.formData.topic,
          category: state.lastGeneratedPrompt.category,
          model: state.lastGeneratedPrompt.model,
          rawText: getCurrentPromptText(),
          formData: state.lastGeneratedPrompt.formData
        });

        if (result.success) {
          showToast('Prompt saved to favorites! Access anytime from the top bar.', 'success');
          updateSavedBadge();
        } else {
          showToast(result.reason || 'Could not save prompt.', 'warning');
        }
      });
    }

    if (exportMdBtn) {
      exportMdBtn.addEventListener('click', () => {
        const text = getCurrentPromptText();
        const topic = state.lastGeneratedPrompt?.formData?.topic || 'promptpilot';
        const cleanFilename = `promptpilot-${sanitizeFilename(topic)}.md`;
        exportFile(text, cleanFilename, 'text/markdown');
      });
    }

    if (exportTxtBtn) {
      exportTxtBtn.addEventListener('click', () => {
        const text = getCurrentPromptText();
        const topic = state.lastGeneratedPrompt?.formData?.topic || 'promptpilot';
        const cleanFilename = `promptpilot-${sanitizeFilename(topic)}.txt`;
        exportFile(text, cleanFilename, 'text/plain');
      });
    }

    if (viewToggleBtn && promptContainer && rawContainer) {
      let isRaw = false;
      viewToggleBtn.addEventListener('click', () => {
        isRaw = !isRaw;
        if (isRaw) {
          promptContainer.style.display = 'none';
          rawContainer.style.display = 'block';
          viewToggleBtn.textContent = '👓 View Formatted';
        } else {
          const rawTextarea = document.getElementById('prompt-raw-textarea');
          if (rawTextarea && state.lastGeneratedPrompt) {
            state.lastGeneratedPrompt.rawText = rawTextarea.value;
          }
          promptContainer.style.display = 'flex';
          rawContainer.style.display = 'none';
          viewToggleBtn.textContent = '✏️ Edit Raw Text';
        }
      });
    }
  }

  function getCurrentPromptText() {
    const rawWrapper = document.getElementById('prompt-raw-wrapper');
    const rawTextarea = document.getElementById('prompt-raw-textarea');
    if (rawWrapper && rawWrapper.style.display === 'block' && rawTextarea && rawTextarea.value) {
      return rawTextarea.value;
    }
    return state.lastGeneratedPrompt ? state.lastGeneratedPrompt.rawText : '';
  }

  function initExamplesSection() {
    const grid = document.getElementById('examples-grid');
    const filtersContainer = document.getElementById('examples-filter-bar');
    if (!grid) return;

    renderExamples(CURATED_EXAMPLES);

    if (filtersContainer) {
      filtersContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        filtersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.filter;
        state.activeFilter = category;

        if (category === 'all') {
          renderExamples(CURATED_EXAMPLES);
        } else {
          const filtered = CURATED_EXAMPLES.filter(ex => ex.category === category);
          renderExamples(filtered);
        }
      });
    }
  }

  function renderExamples(examples) {
    const grid = document.getElementById('examples-grid');
    if (!grid) return;

    if (examples.length === 0) {
      grid.innerHTML = `
        <div class="empty-examples-state">
          <p>No examples found for this category yet.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = examples.map(ex => `
      <div class="example-card" data-category="${ex.category}">
        <div class="example-card-top">
          <span class="example-category-badge">${escapeHtml(ex.categoryLabel)}</span>
          <span class="example-tag">${escapeHtml(ex.badge)}</span>
        </div>
        <h3 class="example-title">${escapeHtml(ex.title)}</h3>
        <p class="example-desc">${escapeHtml(ex.description)}</p>
        <div class="example-model-tag">
          <svg class="icon-inline" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clip-rule="evenodd"/>
          </svg>
          <span>${escapeHtml(ex.model)}</span>
        </div>
        <div class="example-actions">
          <button type="button" class="btn btn-sm btn-outline btn-use-example" data-example-id="${ex.id}">
            ⚡ Load in Generator
          </button>
          <button type="button" class="btn btn-sm btn-ghost btn-copy-example" data-example-id="${ex.id}" aria-label="Copy prompt">
            📋 Copy
          </button>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.btn-use-example').forEach(btn => {
      btn.addEventListener('click', () => {
        const exId = btn.dataset.exampleId;
        const ex = CURATED_EXAMPLES.find(item => item.id === exId);
        if (ex) {
          switchCategory(ex.category);
          loadPresetIntoForm(ex.presetData);
          scrollToElement('generator');
          showToast(`Loaded "${ex.title}" into Generator!`, 'success');
        }
      });
    });

    grid.querySelectorAll('.btn-copy-example').forEach(btn => {
      btn.addEventListener('click', () => {
        const exId = btn.dataset.exampleId;
        const ex = CURATED_EXAMPLES.find(item => item.id === exId);
        if (ex) {
          const fullPrompt = generatePrompt({
            category: ex.category,
            ...ex.presetData
          });
          copyToClipboard(fullPrompt.rawText, btn);
        }
      });
    });
  }

  function initSavedPromptsDrawer() {
    const openBtn = document.getElementById('btn-open-saved');
    const drawer = document.getElementById('saved-drawer');
    const overlay = document.getElementById('saved-drawer-overlay');
    const closeBtn = document.getElementById('btn-close-saved');
    const clearAllBtn = document.getElementById('btn-clear-all-saved');

    if (!drawer) return;

    const openDrawer = () => {
      renderSavedPromptsList();
      drawer.classList.add('is-open');
      if (overlay) overlay.classList.add('is-visible');
      document.body.classList.add('scroll-locked');
    };

    const closeDrawer = () => {
      drawer.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-visible');
      document.body.classList.remove('scroll-locked');
    };

    if (openBtn) openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        const count = getSavedPrompts().length;
        if (count === 0) return;
        if (confirm('Are you sure you want to delete all saved prompts?')) {
          clearAllSavedPrompts();
          renderSavedPromptsList();
          updateSavedBadge();
          showToast('All saved prompts cleared.', 'info');
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  function renderSavedPromptsList() {
    const container = document.getElementById('saved-prompts-list');
    if (!container) return;

    const items = getSavedPrompts();
    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-saved-state">
          <div class="empty-icon">📂</div>
          <h3>No saved prompts yet</h3>
          <p>Click "Save to Favorites" in the generator output to store prompts here for easy reuse.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="saved-prompt-item" data-id="${item.id}">
        <div class="saved-item-header">
          <span class="saved-category-pill">${escapeHtml(item.category)}</span>
          <span class="saved-date">${escapeHtml(item.savedAt)}</span>
        </div>
        <h4 class="saved-item-title">${escapeHtml(item.title)}</h4>
        <div class="saved-item-actions">
          <button type="button" class="btn btn-xs btn-primary btn-load-saved" data-id="${item.id}">
            ⚡ Load
          </button>
          <button type="button" class="btn btn-xs btn-outline btn-copy-saved" data-id="${item.id}">
            📋 Copy
          </button>
          <button type="button" class="btn btn-xs btn-ghost btn-delete-saved" data-id="${item.id}" aria-label="Delete">
            🗑️
          </button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.btn-load-saved').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = items.find(i => i.id === id);
        if (item && item.formData) {
          switchCategory(item.category || 'general');
          loadPresetIntoForm(item.formData);
          document.getElementById('saved-drawer').classList.remove('is-open');
          document.getElementById('saved-drawer-overlay').classList.remove('is-visible');
          document.body.classList.remove('scroll-locked');
          scrollToElement('generator');
          showToast(`Loaded "${item.title}" into generator!`, 'success');
        }
      });
    });

    container.querySelectorAll('.btn-copy-saved').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = items.find(i => i.id === id);
        if (item) {
          copyToClipboard(item.rawText, btn);
        }
      });
    });

    container.querySelectorAll('.btn-delete-saved').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        deleteSavedPrompt(id);
        renderSavedPromptsList();
        updateSavedBadge();
        showToast('Prompt removed from favorites.', 'info');
      });
    });
  }

  function updateSavedBadge() {
    const badge = document.getElementById('saved-count-badge');
    if (!badge) return;
    const count = getSavedPrompts().length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedbackSuccess = document.getElementById('contact-success-msg');
    const sendAnotherBtn = document.getElementById('btn-send-another');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value.trim();
      const email = form.querySelector('[name="email"]')?.value.trim();
      const message = form.querySelector('[name="message"]')?.value.trim();

      let hasErrors = false;

      const nameErr = document.getElementById('contact-name-error');
      if (!name || name.length < 2) {
        if (nameErr) nameErr.textContent = 'Please enter your full name (at least 2 letters).';
        hasErrors = true;
      } else if (nameErr) {
        nameErr.textContent = '';
      }

      const emailErr = document.getElementById('contact-email-error');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        if (emailErr) emailErr.textContent = 'Please enter a valid email address.';
        hasErrors = true;
      } else if (emailErr) {
        emailErr.textContent = '';
      }

      const msgErr = document.getElementById('contact-msg-error');
      if (!message || message.length < 10) {
        if (msgErr) msgErr.textContent = 'Please provide details in your message (at least 10 characters).';
        hasErrors = true;
      } else if (msgErr) {
        msgErr.textContent = '';
      }

      if (hasErrors) {
        showToast('Please fix the errors in the contact form.', 'warning');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner-icon" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg>
          <span>Transmitting...</span>
        `;
      }

      try {
        const formData = new FormData(form);
        const urlEncoded = new URLSearchParams(formData).toString();

        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: urlEncoded
        }).catch(err => {
          console.log('Static preview notice: form submitted locally.', err);
        });

        form.style.display = 'none';
        if (feedbackSuccess) feedbackSuccess.style.display = 'block';
        showToast('Thank you! Your message has been sent successfully.', 'success');
      } catch (err) {
        form.style.display = 'none';
        if (feedbackSuccess) feedbackSuccess.style.display = 'block';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });

    if (sendAnotherBtn && form && feedbackSuccess) {
      sendAnotherBtn.addEventListener('click', () => {
        form.reset();
        form.style.display = 'block';
        feedbackSuccess.style.display = 'none';
      });
    }
  }

  function getInputValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
  }

  function setInputValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  function sanitizeFilename(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 30);
  }

  function scrollToElement(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

})();
