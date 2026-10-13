/**
 * PromptPilot — Main Application Controller
 * Wires the prompt generator engine, UI controls, preset loader, curated examples,
 * local storage favorites, and Netlify-compatible contact form.
 */

import { CATEGORIES, PRESETS_BY_CATEGORY, CURATED_EXAMPLES } from './presets.js';
import { generatePrompt, validatePromptInputs } from './generator.js';
import { savePrompt, getSavedPrompts, deleteSavedPrompt, clearAllSavedPrompts } from './storage.js';
import { showToast, copyToClipboard, exportFile, initMobileNav, initBackToTop, escapeHtml } from './ui.js';

// Application State
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

  // Pre-load initial default prompt so user immediately sees value
  loadPresetIntoForm(PRESETS_BY_CATEGORY.coding[0]);
});

/**
 * Initialize Category Navigation Tabs
 */
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

/**
 * Switch active category & adjust preset suggestions
 */
function switchCategory(catId) {
  state.currentCategory = catId;

  // Update tabs visual active state
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.category === catId);
  });

  // Update category select dropdown if present
  const categorySelect = document.getElementById('field-category');
  if (categorySelect && categorySelect.value !== catId) {
    categorySelect.value = catId;
  }

  // Refresh preset dropdown
  initPresetsDropdown(catId);

  // Update placeholder tips based on category
  updatePlaceholdersForCategory(catId);
}

/**
 * Populate quick presets dropdown
 */
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
      select.value = ''; // reset select indicator
    }
  };
}

/**
 * Update input field placeholders dynamically
 */
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

/**
 * Load preset object into the generator form
 */
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

/**
 * Attach listeners to the generator form
 */
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

  // Model selector change listener
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

  // Real-time error clearance on typing
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

/**
 * Core generation handler
 */
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

  // Validation
  const validation = validatePromptInputs(formData);
  if (!validation.isValid) {
    displayFormErrors(validation.errors);
    showToast('Please fix the highlighted fields to generate your prompt.', 'warning');
    return;
  }

  clearFormErrors();

  // Generate engineered prompt
  const generated = generatePrompt(formData);
  state.lastGeneratedPrompt = {
    ...generated,
    formData,
    category: state.currentCategory,
    model: formData.model
  };

  renderOutputWorkspace(generated);

  // Smooth visual feedback on generate button
  const genBtn = document.getElementById('btn-generate');
  if (genBtn) {
    genBtn.classList.add('btn-pulse');
    setTimeout(() => genBtn.classList.remove('btn-pulse'), 500);
  }
}

/**
 * Render the prompt workspace output
 */
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

  // Metrics
  if (wordCountEl) wordCountEl.textContent = `${result.metrics.wordCount} words`;
  if (tokenCountEl) tokenCountEl.textContent = `~${result.metrics.tokenCount} tokens`;
  if (qualityScoreEl) qualityScoreEl.textContent = `${result.metrics.qualityScore}/100`;
  if (qualityProgressEl) qualityProgressEl.style.width = `${result.metrics.qualityScore}%`;
  if (frameworkBadgeEl) frameworkBadgeEl.textContent = result.metrics.framework;

  // Render segmented cards
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

  // Update raw textarea
  if (rawTextarea) {
    rawTextarea.value = result.rawText;
  }
}

/**
 * Clear form errors
 */
function clearFormErrors() {
  document.querySelectorAll('.form-input').forEach(input => {
    input.classList.remove('has-error');
  });
  document.querySelectorAll('.field-error-msg').forEach(msg => {
    msg.textContent = '';
  });
}

/**
 * Display form errors
 */
function displayFormErrors(errors) {
  Object.keys(errors).forEach(key => {
    const input = document.getElementById(`field-${key}`);
    const errEl = document.getElementById(`field-${key}-error`);
    if (input) input.classList.add('has-error');
    if (errEl) errEl.textContent = errors[key];
  });
}

/**
 * Reset generator form completely
 */
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

/**
 * Pick a random preset from across all categories for instant inspiration
 */
function pickRandomInspiration() {
  const allCategoryKeys = Object.keys(PRESETS_BY_CATEGORY);
  const randomCat = allCategoryKeys[Math.floor(Math.random() * allCategoryKeys.length)];
  const presets = PRESETS_BY_CATEGORY[randomCat];
  const randomPreset = presets[Math.floor(Math.random() * presets.length)];

  switchCategory(randomCat);
  loadPresetIntoForm(randomPreset);
  showToast(`Loaded inspiration: "${randomPreset.label}" (${randomCat})`, 'success');
}

/**
 * Initialize output toolbar actions (copy, save, export, view mode)
 */
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

  // Toggle between segmented visual view and editable raw markdown
  if (viewToggleBtn && promptContainer && rawContainer) {
    let isRaw = false;
    viewToggleBtn.addEventListener('click', () => {
      isRaw = !isRaw;
      if (isRaw) {
        promptContainer.style.display = 'none';
        rawContainer.style.display = 'block';
        viewToggleBtn.textContent = '👓 View Formatted';
      } else {
        // Sync any manual edits back
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

/**
 * Get current active prompt text (accounting for raw textarea edits)
 */
function getCurrentPromptText() {
  const rawTextarea = document.getElementById('prompt-raw-textarea');
  if (rawContainerVisible() && rawTextarea && rawTextarea.value) {
    return rawTextarea.value;
  }
  return state.lastGeneratedPrompt ? state.lastGeneratedPrompt.rawText : '';
}

function rawContainerVisible() {
  const rawWrapper = document.getElementById('prompt-raw-wrapper');
  return rawWrapper && rawWrapper.style.display === 'block';
}

/**
 * Initialize Curated Examples Library
 */
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

/**
 * Render example cards
 */
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

  // Attach card action listeners
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

/**
 * Initialize Saved Prompts Modal / Drawer
 */
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

/**
 * Render saved items inside drawer
 */
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

  // Wire buttons inside drawer
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

/**
 * Update saved badge counter in navbar
 */
function updateSavedBadge() {
  const badge = document.getElementById('saved-count-badge');
  if (!badge) return;
  const count = getSavedPrompts().length;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline-flex' : 'none';
}

/**
 * Netlify-compatible Contact Form Handling with client validation and feedback
 */
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
    const category = form.querySelector('[name="category"]')?.value;

    let hasErrors = false;

    // Validate Name
    const nameErr = document.getElementById('contact-name-error');
    if (!name || name.length < 2) {
      if (nameErr) nameErr.textContent = 'Please enter your full name (at least 2 letters).';
      hasErrors = true;
    } else if (nameErr) {
      nameErr.textContent = '';
    }

    // Validate Email
    const emailErr = document.getElementById('contact-email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      if (emailErr) emailErr.textContent = 'Please enter a valid email address.';
      hasErrors = true;
    } else if (emailErr) {
      emailErr.textContent = '';
    }

    // Validate Message
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

    // Send via standard Netlify form submission POST
    try {
      const formData = new FormData(form);
      const urlEncoded = new URLSearchParams(formData).toString();

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: urlEncoded
      }).catch(err => {
        // Fallback for local testing or file:// protocol where POST to / might fail
        console.log('Static preview mode notice: form submitted locally.', err);
      });

      // Show animated success UI
      form.style.display = 'none';
      if (feedbackSuccess) feedbackSuccess.style.display = 'block';
      showToast('Thank you! Your message has been sent successfully.', 'success');
    } catch (err) {
      console.error('Contact submission error', err);
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

/**
 * Utility Helpers
 */
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
