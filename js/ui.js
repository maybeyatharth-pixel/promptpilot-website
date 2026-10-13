/**
 * PromptPilot — UI Controls & Interactions
 * Manages toast notifications, clipboard copy, mobile drawer, export downloads,
 * modal dialogs, and smooth micro-interactions.
 */

/**
 * Show a modern toast notification
 * type: 'success' | 'info' | 'warning' | 'error'
 */
export function showToast(message, type = 'success', duration = 3200) {
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

/**
 * Copy text to clipboard with graceful fallback and button visual state
 */
export async function copyToClipboard(text, triggerButton = null) {
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
      // Legacy fallback
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
    console.error('Copy to clipboard failed', err);
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

/**
 * Export text as file (.md or .txt)
 */
export function exportFile(content, filename = 'promptpilot-prompt.md', mime = 'text/markdown') {
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
    console.error('Export failed', err);
    showToast('Export failed. Please copy text directly.', 'error');
  }
}

/**
 * Setup mobile navigation toggle
 */
export function initMobileNav() {
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

  // Close when clicking mobile links
  const links = navDrawer.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer.classList.contains('is-open')) {
      closeNav();
    }
  });
}

/**
 * Setup back to top button
 */
export function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  const handleScroll = () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Escape HTML for safe rendering
 */
export function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
