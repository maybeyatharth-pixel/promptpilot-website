/**
 * PromptPilot — LocalStorage Management
 * Handles persistent storage for user favorites, prompt history, and custom presets
 * Completely client-side and privacy-preserving.
 */

const STORAGE_KEYS = {
  SAVED_PROMPTS: 'promptpilot_saved_prompts',
  HISTORY: 'promptpilot_history',
  THEME: 'promptpilot_theme'
};

/**
 * Check if localStorage is supported and accessible
 */
export function isStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get all saved prompts
 */
export function getSavedPrompts() {
  if (!isStorageAvailable()) return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_PROMPTS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse saved prompts', e);
    return [];
  }
}

/**
 * Save a prompt to favorites
 */
export function savePrompt(promptItem) {
  if (!isStorageAvailable()) return false;
  try {
    const saved = getSavedPrompts();
    // Check if duplicate already exists
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
    // Keep max 50 saved prompts
    if (saved.length > 50) saved.pop();

    localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(saved));
    return { success: true, item: newItem, count: saved.length };
  } catch (e) {
    console.error('Error saving prompt', e);
    return { success: false, reason: 'Storage quota exceeded' };
  }
}

/**
 * Delete a prompt from favorites by id
 */
export function deleteSavedPrompt(id) {
  if (!isStorageAvailable()) return false;
  try {
    const saved = getSavedPrompts();
    const filtered = saved.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(filtered));
    return { success: true, count: filtered.length };
  } catch (e) {
    console.error('Error deleting prompt', e);
    return { success: false };
  }
}

/**
 * Clear all saved prompts
 */
export function clearAllSavedPrompts() {
  if (!isStorageAvailable()) return false;
  try {
    localStorage.removeItem(STORAGE_KEYS.SAVED_PROMPTS);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Truncate helper
 */
function truncateText(str, maxLen = 40) {
  if (!str) return 'Untitled';
  return str.length > maxLen ? str.substring(0, maxLen) + '…' : str;
}
