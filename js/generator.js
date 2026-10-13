/**
 * PromptPilot — Prompt Generation Engine
 * Implements CO-STAR & RTF frameworks to assemble high-impact, production-grade prompts
 * for ChatGPT, Claude, Gemini, Midjourney, and Universal LLMs.
 * 
 * 100% Client-side. Transparent prompt engineering without fake AI APIs.
 */

/**
 * Validate input values before generating
 */
export function validatePromptInputs(inputs) {
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

/**
 * Generate structured prompt object
 */
export function generatePrompt(data) {
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

  // Default persona fallbacks per category if none supplied
  const effectivePersona = persona.trim() || getDefaultPersona(category);

  // Model-specific generation
  let rawText = '';
  let segments = [];

  if (model === 'midjourney') {
    const mj = generateMidjourneyPrompt({
      topic,
      purpose,
      tone,
      constraints
    });
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
    // ChatGPT, Gemini, and Universal Markdown structured prompt
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

  // Calculate metrics
  const wordCount = countWords(rawText);
  const charCount = rawText.length;
  const tokenCount = Math.round(charCount / 3.8); // standard rough token estimation
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

/**
 * Standard Markdown Prompt generator (for ChatGPT, Gemini, and Universal)
 */
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

  // 1. Role / Persona
  segments.push({
    title: '1. Role & Persona Definition',
    code: `Act as a ${persona}. You have extensive deep domain mastery and consistently produce rigorous, publication-grade work with zero superfluous filler.`
  });

  // 2. Context & Objective (CO-STAR Context & Objective)
  segments.push({
    title: '2. Context & Core Objective',
    code: `### Context:\nWe are addressing the following subject: "${topic.trim()}".\n\n### Objective:\nYour primary goal is: ${purpose.trim()}. Ensure all explanations, recommendations, or code directly fulfill this objective.`
  });

  // 3. Target Audience & Tone (CO-STAR Audience & Tone)
  segments.push({
    title: '3. Audience & Tone Directives',
    code: `- **Target Audience:** ${audience.trim()}. Calibrate vocabulary, complexity, and mental models specifically for this audience.\n- **Tone & Style:** ${tone}. Maintain this posture unwaveringly from start to finish.`
  });

  // 4. Output Format (RTF Format)
  segments.push({
    title: '4. Output Format Specifications',
    code: `Present your response formatted strictly as: **${outputFormat}**.\n- Utilize clean Markdown formatting, descriptive headings, bullet points, and code fences where applicable.\n- Ensure the structure is immediately skimmable and actionable.`
  });

  // 5. Strict Constraints (Negative Prompting)
  const defaultConstraints = '1. Avoid vague generalities; provide concrete, actionable specifics.\n2. Do not include boilerplate conversational openers (e.g., "Sure, I can help with that", "Certainly!"). Start directly with the substance.\n3. Verify all technical syntax, logic, and factual statements for accuracy.';
  const effectiveConstraints = constraints.trim() 
    ? `${constraints.trim()}\n4. Do not include introductory fluff or closing pleasantries.` 
    : defaultConstraints;

  segments.push({
    title: '5. Strict Directives & Constraints',
    code: effectiveConstraints
  });

  // 6. Chain of Thought / Execution Guidance
  if (chainOfThought) {
    segments.push({
      title: '6. Execution Strategy (Chain-of-Thought)',
      code: `Before outputting your final response:\n1. Mentally analyze the edge cases and critical dependencies of this request.\n2. Verify that all constraints listed above are strictly respected.\n3. Formulate the response step-by-step to maximize clarity and technical depth.`
    });
  }

  // 7. Few-Shot Scaffold
  if (fewShot) {
    segments.push({
      title: '7. Expected Response Structure (Scaffolding)',
      code: `Follow this structural outline in your output:\n- **Overview / Executive Context**\n- **Core Implementation / Solution**\n- **Critical Considerations & Edge Cases**\n- **Immediate Next Steps / Action Items**`
    });
  }

  // Build full text
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

/**
 * Claude XML Prompt generator (Anthropic Best Practices)
 */
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

  // Combine raw text
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

/**
 * Midjourney & Diffusion Image Prompt Generator
 */
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

/**
 * Default fallback persona by category
 */
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

/**
 * Count words in string
 */
function countWords(str) {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Calculate prompt quality score (0 - 100) with diagnostic breakdown
 */
function calculateQualityScore(fields) {
  let score = 20; // baseline for topic and purpose
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
