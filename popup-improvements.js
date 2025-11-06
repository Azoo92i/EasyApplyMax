// ==========================================
// AMÉLIORATIONS POPUP - v1.3.0
// Toast notifications, Validation, Onboarding
// ==========================================

// ==========================================
// TOAST NOTIFICATIONS (remplace les alerts)
// ==========================================

let toastContainer = null;

function showToast(message, type = 'info', duration = 4000) {
  // Créer le container si nécessaire
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(toastContainer);
  }

  // Créer le toast
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#0a66c2'
  };

  toast.innerHTML = `
    <div style="
      background: white;
      padding: 14px 18px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 300px;
      max-width: 400px;
      border-left: 4px solid ${colors[type]};
      animation: slideIn 0.3s ease-out;
    ">
      <div style="
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${colors[type]};
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
      ">${icons[type]}</div>
      <div style="
        flex: 1;
        font-size: 14px;
        color: #1e293b;
        line-height: 1.4;
      ">${message}</div>
      <button onclick="this.closest('.toast').remove()" style="
        background: none;
        border: none;
        color: #94a3b8;
        cursor: pointer;
        font-size: 18px;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">×</button>
    </div>
  `;

  // Ajouter au container
  toastContainer.appendChild(toast);

  // Auto-remove après duration
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Ajouter les animations CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ==========================================
// VALIDATION DES CHAMPS
// ==========================================

const validators = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  phone: {
    pattern: /^[0-9]{7,15}$/,
    message: 'Phone must be 7-15 digits only'
  },
  firstName: {
    pattern: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
    message: 'First name must be 2-50 characters'
  },
  lastName: {
    pattern: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
    message: 'Last name must be 2-50 characters'
  },
  yearsOfExperience: {
    validate: (value) => {
      const num = parseInt(value);
      return num >= 0 && num <= 50;
    },
    message: 'Years of experience must be between 0 and 50'
  }
};

function validateField(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return true;

  const value = field.value.trim();

  // Skip validation if field is empty and not required
  if (!value && !field.hasAttribute('required')) {
    clearFieldError(fieldId);
    return true;
  }

  const validator = validators[fieldId];
  if (!validator) return true;

  let isValid = false;

  if (validator.pattern) {
    isValid = validator.pattern.test(value);
  } else if (validator.validate) {
    isValid = validator.validate(value);
  }

  if (!isValid) {
    showFieldError(fieldId, validator.message);
    return false;
  } else {
    clearFieldError(fieldId);
    return true;
  }
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  // Add error class to field
  field.style.borderColor = '#ef4444';
  field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';

  // Find or create error message element
  let errorMsg = field.parentElement.querySelector('.field-error');
  if (!errorMsg) {
    errorMsg = document.createElement('div');
    errorMsg.className = 'field-error';
    errorMsg.style.cssText = `
      color: #ef4444;
      font-size: 12px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    `;
    field.parentElement.appendChild(errorMsg);
  }

  errorMsg.innerHTML = `<span style="font-weight: 600;">⚠</span> ${message}`;
}

function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  // Remove error styling
  field.style.borderColor = '';
  field.style.boxShadow = '';

  // Remove error message
  const errorMsg = field.parentElement.querySelector('.field-error');
  if (errorMsg) {
    errorMsg.remove();
  }
}

function validateAllFields() {
  const fieldsToValidate = ['email', 'phone', 'firstName', 'lastName', 'yearsOfExperience'];
  let allValid = true;

  fieldsToValidate.forEach(fieldId => {
    if (!validateField(fieldId)) {
      allValid = false;
    }
  });

  return allValid;
}

// Setup validation listeners
function setupValidation() {
  const fieldsToValidate = ['email', 'phone', 'firstName', 'lastName', 'yearsOfExperience'];

  fieldsToValidate.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      // Validate on blur
      field.addEventListener('blur', () => {
        validateField(fieldId);
      });

      // Clear error on focus
      field.addEventListener('focus', () => {
        const errorMsg = field.parentElement.querySelector('.field-error');
        if (errorMsg) {
          field.style.borderColor = '';
          field.style.boxShadow = '';
        }
      });
    }
  });
}

// ==========================================
// ONBOARDING - PREMIÈRE UTILISATION
// ==========================================

async function checkOnboarding() {
  const { onboardingCompleted } = await chrome.storage.local.get(['onboardingCompleted']);

  if (!onboardingCompleted) {
    showOnboarding();
  }
}

function showOnboarding() {
  // Créer l'overlay
  const overlay = document.createElement('div');
  overlay.id = 'onboarding-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
  `;

  overlay.innerHTML = `
    <div style="
      background: white;
      border-radius: 16px;
      padding: 32px;
      max-width: 480px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
      animation: scaleIn 0.3s ease-out;
    ">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="font-size: 48px; margin-bottom: 12px;">🎉</div>
        <h2 style="margin: 0 0 8px 0; color: #0a66c2; font-size: 24px;">Welcome to EasyApplyMax!</h2>
        <p style="margin: 0; color: #64748b; font-size: 14px;">Let's get you started in 3 easy steps</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
        <div style="display: flex; gap: 12px; align-items: start;">
          <div style="
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0a66c2 0%, #378fe9 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
          ">1</div>
          <div>
            <h3 style="margin: 0 0 4px 0; font-size: 15px; color: #1e293b;">Fill Your Info</h3>
            <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
              Complete the "Personal Info" tab with your details
            </p>
          </div>
        </div>

        <div style="display: flex; gap: 12px; align-items: start;">
          <div style="
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0a66c2 0%, #378fe9 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
          ">2</div>
          <div>
            <h3 style="margin: 0 0 4px 0; font-size: 15px; color: #1e293b;">Go to LinkedIn Jobs</h3>
            <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
              Visit <strong>linkedin.com/jobs/search/</strong> and activate the <strong>"Easy Apply"</strong> filter
            </p>
          </div>
        </div>

        <div style="display: flex; gap: 12px; align-items: start;">
          <div style="
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0a66c2 0%, #378fe9 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
          ">3</div>
          <div>
            <h3 style="margin: 0 0 4px 0; font-size: 15px; color: #1e293b;">Click Start!</h3>
            <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
              Come back here and click the <strong>Start</strong> button to begin auto-applying
            </p>
          </div>
        </div>
      </div>

      <div style="
        background: #f8fafc;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 20px;
        border-left: 3px solid #f59e0b;
      ">
        <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5;">
          <strong style="color: #92400e;">💡 Pro Tip:</strong> Open the browser console (F12) to see detailed logs while the bot is running
        </p>
      </div>

      <button id="close-onboarding" style="
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #0a66c2 0%, #378fe9 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
      " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
        Got it, let's start!
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  // Add CSS animations
  if (!document.getElementById('onboarding-styles')) {
    const style = document.createElement('style');
    style.id = 'onboarding-styles';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes scaleIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }

  // Close button
  document.getElementById('close-onboarding').addEventListener('click', async () => {
    await chrome.storage.local.set({ onboardingCompleted: true });
    overlay.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => overlay.remove(), 300);

    showToast('Welcome aboard! Fill your info and click Start on LinkedIn Jobs page.', 'success', 6000);
  });
}

// ==========================================
// EXPORT: Rendre disponibles globalement
// ==========================================

window.showToast = showToast;
window.validateField = validateField;
window.validateAllFields = validateAllFields;
window.setupValidation = setupValidation;
window.checkOnboarding = checkOnboarding;
