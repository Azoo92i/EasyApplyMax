// ============================================
// INTERNATIONALIZATION (i18n) SYSTEM
// Manages language loading and text translation
// ============================================

// Available languages
const AVAILABLE_LANGUAGES = {
  'en': { name: 'English', flag: '🇺🇸' },
  'pt-br': { name: 'Português (BR)', flag: '🇧🇷' },
  'es': { name: 'Español', flag: '🇪🇸' },
  'fr': { name: 'Français', flag: '🇫🇷' }
};

// Current language translations
let currentLang = 'en';
let translations = {};

// Language files mapping
const LANG_FILES = {
  'en': 'i18n/en.js',
  'pt-br': 'i18n/pt-br.js',
  'es': 'i18n/es.js',
  'fr': 'i18n/fr.js'
};

// Load translations from language file
async function loadLanguage(langCode) {
  try {
    // Get the translation object based on langCode
    switch (langCode) {
      case 'en':
        translations = typeof EN !== 'undefined' ? EN : {};
        break;
      case 'pt-br':
        translations = typeof PT_BR !== 'undefined' ? PT_BR : {};
        break;
      case 'es':
        translations = typeof ES !== 'undefined' ? ES : {};
        break;
      case 'fr':
        translations = typeof FR !== 'undefined' ? FR : {};
        break;
      default:
        translations = typeof EN !== 'undefined' ? EN : {};
        langCode = 'en';
    }

    currentLang = langCode;

    // Save to storage
    await chrome.storage.sync.set({ language: langCode });

    console.log(`[i18n] Language loaded: ${langCode}`);
    return true;
  } catch (error) {
    console.error(`[i18n] Error loading language ${langCode}:`, error);
    return false;
  }
}

// Get translation by key path (e.g., "ui.firstName" or "patterns.yearsExperience")
function t(keyPath, fallback = '') {
  const keys = keyPath.split('.');
  let value = translations;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.warn(`[i18n] Missing translation: ${keyPath}`);
      return fallback || keyPath;
    }
  }

  return value;
}

// Get UI translation (shorthand for ui.*)
function tUI(key, fallback = '') {
  return t(`ui.${key}`, fallback);
}

// Get pattern (returns regex or array)
function getPattern(key) {
  return t(`patterns.${key}`, null);
}

// Get all patterns for content script
function getAllPatterns() {
  return translations.patterns || {};
}

// Get AI prompts
function getAIPrompts() {
  return translations.ai || {};
}

// Get log messages
function getLogMessage(key) {
  return t(`logs.${key}`, key);
}

// Apply translations to DOM elements with data-i18n attribute
function applyTranslations() {
  // Elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = tUI(key);
    if (translation) {
      el.textContent = translation;
    }
  });

  // Elements with data-i18n-placeholder attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = tUI(key);
    if (translation) {
      el.placeholder = translation;
    }
  });

  // Elements with data-i18n-title attribute
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const translation = tUI(key);
    if (translation) {
      el.title = translation;
    }
  });

  // Elements with data-i18n-html attribute (for HTML content)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const translation = tUI(key);
    if (translation) {
      el.innerHTML = translation;
    }
  });
}

// Initialize language system
async function initI18n() {
  try {
    // Try to load saved language preference
    const { language } = await chrome.storage.sync.get(['language']);
    const langCode = language || detectBrowserLanguage() || 'en';

    await loadLanguage(langCode);
    applyTranslations();

    return langCode;
  } catch (error) {
    console.error('[i18n] Initialization error:', error);
    return 'en';
  }
}

// Detect browser language and map to available languages
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage || '';
  const lang = browserLang.toLowerCase();

  if (lang.startsWith('pt')) return 'pt-br';
  if (lang.startsWith('es')) return 'es';
  if (lang.startsWith('fr')) return 'fr';
  if (lang.startsWith('en')) return 'en';

  return null;
}

// Change language
async function changeLanguage(langCode) {
  if (!AVAILABLE_LANGUAGES[langCode]) {
    console.error(`[i18n] Language not available: ${langCode}`);
    return false;
  }

  await loadLanguage(langCode);
  applyTranslations();

  // Dispatch event for components that need to react
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: langCode } }));

  return true;
}

// Get current language code
function getCurrentLanguage() {
  return currentLang;
}

// Get available languages list
function getAvailableLanguages() {
  return AVAILABLE_LANGUAGES;
}

// Export for content script use
function getTranslationsForContentScript() {
  return {
    patterns: getAllPatterns(),
    ai: getAIPrompts(),
    logs: translations.logs || {}
  };
}
