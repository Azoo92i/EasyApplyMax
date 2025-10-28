// ULTRA SIMPLE - COPIE EXACTE DU PYTHON
let isRunning = false;
let config = {};
let appliedCount = 0;
let skippedCount = 0;
let appliedJobs = []; // Liste des jobs appliqués pour export
let lastActivityTime = Date.now(); // Track last activity for stuck detection
let lastJobIndex = -1; // Track last job processed
const STUCK_TIMEOUT = 120000; // 2 minutes without activity = stuck

// Logs simples
function log(msg) {
  console.log('[LinkedIn Bot]', msg);
  try {
    chrome.runtime.sendMessage({ type: 'log', message: msg });
  } catch (e) {}
}

// Attendre
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Cliquer
async function click(element) {
  element.click();
  updateActivity(); // Update activity on every click
  await wait(500);
}

// Update last activity time
function updateActivity() {
  lastActivityTime = Date.now();
}

// Check if script is stuck (no activity for STUCK_TIMEOUT)
function isStuck() {
  const timeSinceActivity = Date.now() - lastActivityTime;
  return timeSinceActivity > STUCK_TIMEOUT;
}

// IMPROVED: Function to find and click Done button with exhaustive search
async function findAndClickDoneButton(contextElement = document, contextName = 'page', maxAttempts = 15) {
  log(`🔍 [${contextName}] Starting exhaustive search for Done button...`);

  const doneTexts = ['Done', 'Terminé', 'Submit application', 'Soumettre la candidature', 'Dismiss', 'Close', 'Fermer'];
  let doneBtn = null;

  for (let attempt = 0; attempt < maxAttempts && !doneBtn; attempt++) {
    await wait(1000);

    // Log what we're looking for on first attempt
    if (attempt === 0) {
      log(`   Looking for buttons with text: ${doneTexts.join(', ')}`);
    }

    // METHOD 1: Search by SPAN text (Python method - most reliable)
    for (let targetText of doneTexts) {
      // Find ALL spans in context
      const spans = Array.from(contextElement.querySelectorAll('span.artdeco-button__text, span'));

      for (let span of spans) {
        const spanText = span.textContent.trim();

        if (spanText === targetText) {
          // Find clickable parent
          let clickableElement = span.closest('button, [role="button"], .artdeco-button');

          if (!clickableElement) {
            clickableElement = span;
          }

          // Check if visible
          if (clickableElement.offsetParent !== null) {
            doneBtn = clickableElement;
            log(`   ✅ [METHOD 1] Found via SPAN: "${targetText}"`);
            break;
          }
        }
      }
      if (doneBtn) break;
    }

    // METHOD 2: Direct button search (fallback)
    if (!doneBtn) {
      const buttons = Array.from(contextElement.querySelectorAll('button, [role="button"]'));
      for (let btn of buttons) {
        const btnText = btn.textContent.trim();
        for (let targetText of doneTexts) {
          if (btnText === targetText && btn.offsetParent !== null) {
            doneBtn = btn;
            log(`   ✅ [METHOD 2] Found via direct button search: "${targetText}"`);
            break;
          }
        }
        if (doneBtn) break;
      }
    }

    // METHOD 3: Search by aria-label
    if (!doneBtn) {
      for (let targetText of doneTexts) {
        const ariaBtn = contextElement.querySelector(`button[aria-label*="${targetText}"], [role="button"][aria-label*="${targetText}"]`);
        if (ariaBtn && ariaBtn.offsetParent !== null) {
          doneBtn = ariaBtn;
          log(`   ✅ [METHOD 3] Found via aria-label: "${targetText}"`);
          break;
        }
      }
    }

    // METHOD 4: Search by data-control-name (LinkedIn specific)
    if (!doneBtn) {
      const controlNames = ['done', 'submit', 'continue_application'];
      for (let name of controlNames) {
        const controlBtn = contextElement.querySelector(`button[data-control-name*="${name}"]`);
        if (controlBtn && controlBtn.offsetParent !== null) {
          doneBtn = controlBtn;
          log(`   ✅ [METHOD 4] Found via data-control-name: "${name}"`);
          break;
        }
      }
    }

    // Debug: Log all visible buttons on first and every 5th attempt
    if (attempt === 0 || attempt % 5 === 0) {
      if (!doneBtn) {
        const allButtons = Array.from(contextElement.querySelectorAll('button, [role="button"]'));
        const visibleButtons = allButtons.filter(b => b.offsetParent !== null);
        log(`   [DEBUG Attempt ${attempt + 1}/${maxAttempts}] Found ${visibleButtons.length} visible buttons:`);
        visibleButtons.slice(0, 10).forEach((btn, i) => {
          const text = btn.textContent.trim().substring(0, 30);
          const ariaLabel = btn.getAttribute('aria-label') || 'none';
          const dataControl = btn.getAttribute('data-control-name') || 'none';
          log(`      ${i + 1}. Text: "${text}" | Aria: "${ariaLabel}" | Data: "${dataControl}"`);
        });
      }
    }

    if (!doneBtn && (attempt === 0 || attempt % 5 === 0)) {
      log(`   ⏳ [${contextName}] Attempt ${attempt + 1}/${maxAttempts}: Still searching...`);
    }
  }

  // Try to click if found
  if (doneBtn) {
    log(`✅✅✅ [${contextName}] Done button FOUND! Attempting click...`);

    let clickSuccessful = false;

    // Method 1: Standard click
    try {
      log('   Click Method 1: Standard click...');
      doneBtn.click();
      await wait(500);
      log('   ✅ Standard click successful');
      clickSuccessful = true;
    } catch (e1) {
      log(`   ⚠️ Standard click failed: ${e1.message}`);

      // Method 2: MouseEvent
      try {
        log('   Click Method 2: MouseEvent dispatch...');
        doneBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        await wait(500);
        log('   ✅ MouseEvent click successful');
        clickSuccessful = true;
      } catch (e2) {
        log(`   ⚠️ MouseEvent failed: ${e2.message}`);

        // Method 3: Focus + Enter
        try {
          log('   Click Method 3: Keyboard Enter...');
          doneBtn.focus();
          await wait(200);
          doneBtn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true, cancelable: true }));
          doneBtn.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', keyCode: 13, bubbles: true, cancelable: true }));
          await wait(500);
          log('   ✅ Keyboard trigger successful');
          clickSuccessful = true;
        } catch (e3) {
          log(`   ❌ All click methods failed: ${e3.message}`);
        }
      }
    }

    if (clickSuccessful) {
      updateActivity();
      await wait(2000);
      return { success: true, clicked: true };
    } else {
      return { success: false, clicked: false, reason: 'Click failed' };
    }
  } else {
    log(`❌ [${contextName}] Done button NOT FOUND after ${maxAttempts} attempts`);
    return { success: false, clicked: false, reason: 'Button not found' };
  }
}

// Refresh page and return to job search
async function refreshAndReturnToSearch() {
  log('🔄 REFRESHING page due to stuck detection...');
  try {
    // Reload the page
    location.reload();
    // Wait will happen automatically when page reloads
    return true;
  } catch (error) {
    log(`❌ Error refreshing page: ${error.message}`);
    return false;
  }
}

// Discard application (Python ligne 1500-1580) - ULTRA AGGRESSIVE VERSION + STUCK DETECTION
async function discardApplication() {
  log('🚀 DISCARD: Starting SAFE discard sequence...');

  const discardTexts = ['discard', 'annuler', 'cancel', 'abandonner', 'descarter'];

  try {
    // 🆕 DETECTION CRITIQUE: Vérifier si popup de chargement est bloqué (Python ligne 1547-1558)
    if (checkForStuckLoadingPopup()) {
      log('🚨 POPUP DE CHARGEMENT BLOQUÉ DÉTECTÉ!');
      log('🔄 REFRESH DE LA PAGE POUR DÉBLOQUER...');
      try {
        location.reload();
        await wait(3000);
        log('✅ Page rafraîchie avec succès');
        return true;
      } catch (error) {
        log(`❌ Erreur lors du refresh: ${error.message}`);
      }
    }

    // STEP 1: Press ESC key
    log('📤 STEP 1: Pressing ESC key...');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape', keyCode: 27, bubbles: true }));
    await wait(2000); // Wait longer for popup

    // STEP 2: Look for ANY discard/cancel button (aggressive search)
    log('🔍 STEP 2: Searching for Discard/Cancel buttons...');

    // Try 3 times to find the button (it may appear slowly)
    for (let attempt = 1; attempt <= 3; attempt++) {
      log(`   Attempt ${attempt}/3...`);

      // Get ALL buttons on page (including in dialogs/modals)
      const allButtons = Array.from(document.querySelectorAll('button, [role="button"]'));
      log(`   Found ${allButtons.length} total buttons`);

      for (let btn of allButtons) {
        // Skip invisible buttons
        if (!btn.offsetParent) continue;

        // Get text from button and nested elements
        const btnText = btn.textContent.trim().toLowerCase();
        const ariaLabel = (btn.getAttribute('aria-label') || '').toLowerCase();
        const dataControl = (btn.getAttribute('data-control-name') || '').toLowerCase();

        // Check if it's a discard/cancel button
        const isDiscardButton = discardTexts.some(text =>
          btnText === text ||
          btnText.includes(text) ||
          ariaLabel.includes(text) ||
          dataControl.includes(text)
        );

        if (isDiscardButton) {
          log(`✅ FOUND: "${btn.textContent.trim()}" (visible, will click)`);

          // Click with multiple methods
          try {
            btn.click();
            await wait(300);
            btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          } catch (e) {
            log(`⚠️ Click error: ${e.message}`);
          }

          await wait(1500);

          // Check if modal closed
          const modal = document.querySelector('.jobs-easy-apply-modal');
          if (!modal || modal.offsetParent === null) {
            log('✅✅✅ MODAL CLOSED SUCCESSFULLY!');
            return true;
          }
        }
      }

      await wait(1000); // Wait before retry
    }

    // STEP 3: Force close with X button
    log('🔍 STEP 3: Looking for X/Close button...');
    const closeButtons = document.querySelectorAll('button[aria-label*="Dismiss"], button[aria-label*="Close"], button.artdeco-modal__dismiss');

    for (let btn of closeButtons) {
      if (btn.offsetParent) {
        log(`✅ Clicking close button: ${btn.getAttribute('aria-label')}`);
        btn.click();
        await wait(1000);

        // Look for discard confirmation again
        const discardBtn = Array.from(document.querySelectorAll('button')).find(b =>
          b.offsetParent && discardTexts.some(t => b.textContent.trim().toLowerCase().includes(t))
        );

        if (discardBtn) {
          log('✅ Clicking discard confirmation');
          discardBtn.click();
          await wait(1500);
        }

        const modal = document.querySelector('.jobs-easy-apply-modal');
        if (!modal || modal.offsetParent === null) {
          log('✅✅✅ MODAL CLOSED!');
          return true;
        }
      }
    }

    log('❌ DISCARD FAILED: Could not close modal after all attempts');
    return false;

  } catch (error) {
    log(`❌ Error discarding: ${error.message}`);
    return false;
  }
}

// Remplir un champ
function fill(input, value) {
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

// BOUCLE PRINCIPALE - EXACTEMENT COMME PYTHON
async function mainLoop() {
  log('Démarrage...');

  while (isRunning) {
    try {
      // 🆕 CHECK: Script stuck? (no activity for 2 minutes)
      if (isStuck()) {
        log('🚨 SCRIPT STUCK DETECTED: No activity for 2 minutes!');
        log('🔄 Refreshing page to recover...');
        await refreshAndReturnToSearch();
        await wait(5000);
        updateActivity(); // Reset activity after refresh
        continue;
      }

      // Python ligne 1695: job_listings = driver.find_elements(By.XPATH, "//li[@data-occludable-job-id]")
      const jobCards = document.querySelectorAll('li[data-occludable-job-id]');

      if (jobCards.length === 0) {
        log(`Aucune offre trouvée. Attente 5s...`);

        // Check if page is unrecognized (no jobs for too long)
        if (isStuck()) {
          log('🚨 Page might be unrecognized (no jobs found + stuck)');
          log('🔄 Refreshing to return to job search...');
          await refreshAndReturnToSearch();
          await wait(5000);
          updateActivity();
        }

        await wait(5000);
        continue;
      }

      log(`${jobCards.length} offres trouvées`);
      updateActivity(); // Found jobs = activity

      // Python ligne 1701: for job in job_listings
      for (let i = 0; i < jobCards.length; i++) {
        if (!isRunning) break;

        const job = jobCards[i];
        const jobId = job.getAttribute('data-occludable-job-id');

        log(`\n--- Job ${i + 1}/${jobCards.length} (ID: ${jobId}) ---`);

        // CRITICAL: Check if modal from previous job is still open (stuck scenario)
        const leftoverModal = document.querySelector('.jobs-easy-apply-modal');
        if (leftoverModal && leftoverModal.offsetParent !== null) {
          log('⚠️ WARNING: Modal from previous job still open! Cleaning up...');
          await discardApplication();
          await wait(2000);

          // Verify it's closed
          const stillOpen = document.querySelector('.jobs-easy-apply-modal');
          if (stillOpen && stillOpen.offsetParent !== null) {
            log('❌ CRITICAL: Could not close leftover modal, skipping this job');
            skippedCount++;
            updateSkippedCount();
            continue;
          } else {
            log('✅ Leftover modal cleaned up successfully');
          }
        }

        // Get job info for filtering
        const jobTitle = job.querySelector('.job-card-list__title, .artdeco-entity-lockup__title')?.textContent.trim() || '';
        const jobCompany = job.querySelector('.job-card-container__primary-description, .artdeco-entity-lockup__subtitle')?.textContent.trim() || '';
        const jobDescription = job.querySelector('.job-card-container__metadata-item')?.textContent.trim() || '';

        // Check blacklist keywords
        if (shouldSkipByBlacklist(jobTitle, jobCompany, jobDescription, config.blacklistKeywords)) {
          skippedCount++;
          updateSkippedCount();
          continue;
        }

        // Check max years required
        if (shouldSkipByExperience(job, parseInt(config.maxYearsRequired))) {
          skippedCount++;
          updateSkippedCount();
          continue;
        }

        // Scroll and click (Python line 371)
        job.scrollIntoView({ block: 'start', behavior: 'smooth' });
        await wait(500);

        const link = job.querySelector('a');
        if (link) {
          await click(link);
          await wait(2000);
        }

        // Chercher Easy Apply (Python ligne 1853)
        const easyApplyBtn = document.querySelector('button.jobs-apply-button[aria-label*="Easy"]');
        if (!easyApplyBtn) {
          log('Pas Easy Apply, skip');
          skippedCount++;
          updateSkippedCount();
          continue;
        }

        await click(easyApplyBtn);
        await wait(2000);

        // Infos du job déjà extraites plus haut pour blacklist, on les réutilise
        const jobLink = job.querySelector('a')?.href || window.location.href;

        // Remplir formulaire multi-étapes avec TIMEOUT (Python ligne 528-529)
        let step = 0;
        const applicationStartTime = Date.now();
        const applicationTimeout = 180000; // 3 minutes max par candidature
        let loadingScreenTimeout = 20000; // 20 secondes pour écran de chargement (Python ligne 1481-1497)
        let lastActivityTime = Date.now();

        while (step < 10) {
          step++;

          // TIMEOUT CHECK (Python ligne 639)
          if (Date.now() - applicationStartTime > applicationTimeout) {
            log('⏰ TIMEOUT 3min - Discarding application');
            await discardApplication();
            skippedCount++;
            updateSkippedCount();
            break;
          }

          // 🆕 RE-CHECK: Popup bloqué avant chaque step (Python ligne 1563-1568)
          if (checkForStuckLoadingPopup()) {
            log('🚨 POPUP TOUJOURS BLOQUÉ - REFRESH...');
            location.reload();
            await wait(3000);
            skippedCount++;
            updateSkippedCount();
            break;
          }

          // CHECK FOR VALIDATION ERRORS EARLY (stuck scenario)
          let modal = document.querySelector('.jobs-easy-apply-modal');
          if (modal) {
            const errors = modal.querySelectorAll('[role="alert"], .artdeco-inline-feedback--error, .fb-form-element-label__error');
            for (let error of errors) {
              if (error.offsetParent !== null) {
                const errorText = error.textContent.toLowerCase();
                if (errorText.includes('please enter') ||
                    errorText.includes('valid answer') ||
                    errorText.includes('required') ||
                    errorText.includes('must be') ||
                    errorText.includes('invalid')) {

                  log(`❌ STUCK: Validation error detected: ${error.textContent.substring(0, 50)}`);
                  log('⚠️ Discarding application due to validation error');

                  await discardApplication();
                  skippedCount++;
                  updateSkippedCount();
                  step = 999; // Force break
                  break;
                }
              }
            }
            if (step === 999) break;
          }

          // CHECK LOADING SCREEN (Python ligne 1481-1497)
          if (await isPageLoadingSlow()) {
            log('⏳ Loading screen detected...');
            const loadingStart = Date.now();

            while (await isPageLoadingSlow()) {
              if (Date.now() - loadingStart > loadingScreenTimeout) {
                log('⏰ Loading screen TIMEOUT 20s - Discarding application');

                // Use the discardApplication function to properly close modal
                const discarded = await discardApplication();

                if (discarded) {
                  log('✅ Modal closed successfully, moving to next job');
                } else {
                  log('⚠️ Modal may not be closed, forcing break anyway');
                }

                skippedCount++;
                updateSkippedCount();

                // Wait to ensure modal is closed and page is stable
                await wait(2000);

                // Exit the step loop to move to next job
                break;
              }
              await wait(1000);
            }

            if (Date.now() - loadingStart > loadingScreenTimeout) {
              break; // Sortir du while principal pour passer au job suivant
            }
          }

          log(`Step ${step}`);

          // Find modal (reuse variable from earlier)
          modal = document.querySelector('.jobs-easy-apply-modal');
          if (!modal) {
            log('Modal closed');
            break;
          }

          // 1. TEXT FIELDS (Python line 1102) - Multilingual support
          const textInputs = modal.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"]');
          for (let input of textInputs) {
            if (input.value) continue; // Skip if already filled

            // Get label from multiple sources
            let labelText = '';

            // aria-label
            labelText += ' ' + (input.getAttribute('aria-label') || '');

            // name attribute
            labelText += ' ' + (input.getAttribute('name') || '');

            // Associated <label> element
            const inputId = input.getAttribute('id');
            if (inputId) {
              const labelEl = modal.querySelector(`label[for="${inputId}"]`);
              if (labelEl) labelText += ' ' + labelEl.textContent;
            }

            // Parent label
            const parentLabel = input.closest('label');
            if (parentLabel) labelText += ' ' + parentLabel.textContent;

            const label = labelText.toLowerCase();

            // Years of experience (EN/FR/ES/DE/IT)
            if (label.match(/experience|years|expérience|années|años|jahre|anni|esperienza/)) {
              fill(input, config.yearsOfExperience || '2');
              log(`Years exp: ${config.yearsOfExperience || '2'}`);
            }
            // Email
            else if (label.match(/email|e-mail|courriel|correo/)) fill(input, config.email);
            // First name (EN/FR/ES/DE/IT)
            else if (label.match(/first|prénom|prenom|nombre|vorname|nome/)) fill(input, config.firstName);
            // Last name (EN/FR/ES/DE/IT)
            else if (label.match(/last|nom|apellido|nachname|cognome/)) fill(input, config.lastName);
            // Phone (EN/FR/ES/DE/IT) - includes "portable", "cell", "móvil"
            else if (label.match(/phone|téléphone|telefono|telefon|mobile|portable|cell|móvil|cellulare/)) {
              fill(input, config.phone);
              log(`Phone filled: ${config.phone}`);
            }
            // City/Location (EN/FR/ES/DE/IT) - with autocomplete handling
            else if (label.match(/city|ville|ciudad|stadt|città|location|localisation|ubicación|standort/)) {
              fill(input, config.city || '');
              log(`Location filled: ${config.city}`);

              // Wait for autocomplete dropdown to appear
              await wait(1500);

              // Try multiple selectors for autocomplete dropdown
              let dropdown = null;
              const dropdownSelectors = [
                '[role="listbox"]',
                '.basic-typeahead__selectable',
                '.artdeco-typeahead__results',
                '.artdeco-dropdown__content-inner',
                'ul[role="listbox"]',
                '.typeahead-results'
              ];

              for (let selector of dropdownSelectors) {
                dropdown = document.querySelector(selector);
                if (dropdown && dropdown.offsetParent !== null) { // Visible
                  break;
                }
              }

              if (dropdown) {
                // Find first option
                const optionSelectors = [
                  '[role="option"]:first-child',
                  'li:first-child',
                  '.basic-typeahead__selectable-item:first-child'
                ];

                let firstOption = null;
                for (let selector of optionSelectors) {
                  firstOption = dropdown.querySelector(selector);
                  if (firstOption) break;
                }

                if (firstOption) {
                  firstOption.click();
                  log(`✓ Location autocomplete: ${firstOption.textContent.substring(0, 30)}`);
                  await wait(500);
                }
              } else {
                // Fallback: Keyboard navigation (Arrow Down + Enter)
                log('Using keyboard fallback for location');
                input.focus();
                await wait(300);
                input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', keyCode: 40, bubbles: true }));
                await wait(500);
                input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true }));
                await wait(300);
              }
            }
          }

          // 2. CHECKBOXES (consent, terms, etc.)
          const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
          for (let checkbox of checkboxes) {
            if (checkbox.id === 'follow-company-checkbox') continue; // Skip follow company (handled later)

            // Get associated label
            const checkboxLabel = modal.querySelector(`label[for="${checkbox.id}"]`);
            const labelText = checkboxLabel ? checkboxLabel.textContent.toLowerCase() : '';

            // Check for consent, terms, conditions, etc.
            if (labelText.match(/consent|agree|terms|conditions|policy|privacy|accept|j'accepte|j'autorise|consentement/)) {
              if (!checkbox.checked) {
                checkboxLabel ? checkboxLabel.click() : checkbox.click();
                log(`✓ Checkbox: ${labelText.substring(0, 40)}`);
                await wait(300);
              }
            }
          }

          // 3. RADIO BUTTONS (Python ligne 1037)
          const radios = modal.querySelectorAll('fieldset[data-test-form-builder-radio-button-form-component]');
          for (let fieldset of radios) {
            const questionLabel = fieldset.querySelector('legend, span[class*="title"]');
            const questionText = questionLabel ? questionLabel.textContent.toLowerCase() : '';

            const radioInputs = fieldset.querySelectorAll('input[type="radio"]');
            let answered = false;

            // Look for "Yes" first (Python line 1044) - Multilingual
            for (let radio of radioInputs) {
              const radioLabel = fieldset.querySelector(`label[for="${radio.id}"]`);
              const radioText = radioLabel ? radioLabel.textContent.trim().toLowerCase() : '';

              // Yes in multiple languages: EN, FR, ES, DE, IT
              if (radioText.match(/^(yes|oui|sí|si|ja|y)$/)) {
                if (!radio.checked) {
                  radioLabel ? radioLabel.click() : radio.click();
                  log(`Radio Yes: ${questionText.substring(0, 30)}`);
                  answered = true;
                }
                break;
              }
            }

            // If no "Yes", check first option
            if (!answered && radioInputs.length > 0 && !radioInputs[0].checked) {
              const firstLabel = fieldset.querySelector(`label[for="${radioInputs[0].id}"]`);
              firstLabel ? firstLabel.click() : radioInputs[0].click();
              log(`Radio first option: ${questionText.substring(0, 30)}`);
            }
          }

          // 3. DROPDOWN/SELECT (Python ligne 661)
          const selects = modal.querySelectorAll('select');
          for (let select of selects) {
            if (select.selectedIndex > 0) continue; // Skip si déjà sélectionné

            // Get label from multiple sources
            let labelText = '';
            labelText += ' ' + (select.getAttribute('aria-label') || '');
            labelText += ' ' + (select.getAttribute('name') || '');
            const selectId = select.getAttribute('id');
            if (selectId) {
              const labelEl = modal.querySelector(`label[for="${selectId}"]`);
              if (labelEl) labelText += ' ' + labelEl.textContent;
            }
            const parentLabel = select.closest('label');
            if (parentLabel) labelText += ' ' + parentLabel.textContent;

            const label = labelText.toLowerCase();
            const options = Array.from(select.options);

            // Essayer de trouver une option intelligente
            let selectedOption = null;

            // Language proficiency questions (English, French, Spanish, etc.)
            // "What is your level of proficiency in English?"
            if (label.match(/proficiency|level.*english|level.*french|level.*spanish|level.*german|niveau.*anglais|niveau.*français|nivel.*inglés/)) {
              // Priority order: Native > Fluent > Professional > Intermediate
              selectedOption = options.find(opt => {
                const text = opt.text.toLowerCase();
                return text.includes('native') || text.includes('bilingual') || text.includes('bilingue') || text.includes('langue maternelle');
              });

              if (!selectedOption) {
                selectedOption = options.find(opt => {
                  const text = opt.text.toLowerCase();
                  return text.includes('fluent') || text.includes('courant') || text.includes('fluide');
                });
              }

              if (!selectedOption) {
                selectedOption = options.find(opt => {
                  const text = opt.text.toLowerCase();
                  return text.includes('professional') || text.includes('professionnel') || text.includes('advanced');
                });
              }

              log(`Dropdown language proficiency: ${selectedOption ? selectedOption.text : 'fallback'}`);
            }
            // General language questions
            else if (label.match(/english|anglais|language|langue|french|français|spanish|español|german|deutsch/)) {
              selectedOption = options.find(opt => {
                const text = opt.text.toLowerCase();
                return text.includes('native') || text.includes('bilingual') || text.includes('fluent') ||
                       text.includes('courant') || text.includes('professionnel') || text.includes('bilingue');
              });
              log(`Dropdown language: ${selectedOption ? selectedOption.text : 'fallback'}`);
            }

            // Si pas trouvé, prendre option 1 (pas 0 car souvent "Select...")
            if (!selectedOption && options.length > 1) {
              selectedOption = options[1];
            }

            if (selectedOption) {
              select.value = selectedOption.value;
              select.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }

          // 4. DROPDOWN CUSTOM LINKEDIN (Python ligne 668)
          const customDropdowns = modal.querySelectorAll('button[aria-haspopup="listbox"], button.artdeco-dropdown__trigger');
          for (let dropdown of customDropdowns) {
            // Get label/question text for smart selection
            let questionText = '';
            questionText += ' ' + (dropdown.getAttribute('aria-label') || '');
            questionText += ' ' + (dropdown.textContent || '');

            // Look for associated label
            const dropdownId = dropdown.getAttribute('id');
            if (dropdownId) {
              const labelEl = modal.querySelector(`label[for="${dropdownId}"]`);
              if (labelEl) questionText += ' ' + labelEl.textContent;
            }
            const parentDiv = dropdown.closest('div[class*="form-component"]');
            if (parentDiv) {
              const label = parentDiv.querySelector('label, legend, span[class*="label"]');
              if (label) questionText += ' ' + label.textContent;
            }

            const question = questionText.toLowerCase();

            // Cliquer pour ouvrir
            dropdown.click();
            await wait(500);

            // Chercher les options
            const listbox = document.querySelector('[role="listbox"]');
            if (listbox) {
              const options = Array.from(listbox.querySelectorAll('[role="option"]'));
              if (options.length > 0) {
                let selectedOption = null;

                // Language proficiency questions
                if (question.match(/proficiency|level.*english|level.*french|level.*spanish|niveau.*anglais|nivel.*inglés/)) {
                  // Try: Native/Bilingual first
                  selectedOption = options.find(opt => {
                    const text = opt.textContent.toLowerCase();
                    return text.includes('native') || text.includes('bilingual') || text.includes('bilingue');
                  });

                  // Then: Fluent
                  if (!selectedOption) {
                    selectedOption = options.find(opt => {
                      const text = opt.textContent.toLowerCase();
                      return text.includes('fluent') || text.includes('courant');
                    });
                  }

                  // Then: Professional
                  if (!selectedOption) {
                    selectedOption = options.find(opt => {
                      const text = opt.textContent.toLowerCase();
                      return text.includes('professional') || text.includes('professionnel') || text.includes('advanced');
                    });
                  }

                  log(`Custom dropdown language: ${selectedOption ? selectedOption.textContent.substring(0, 30) : 'fallback'}`);
                }

                // If no smart match, take first valid option (not "Select...")
                if (!selectedOption) {
                  selectedOption = options.find(opt =>
                    !opt.textContent.toLowerCase().includes('select') &&
                    !opt.textContent.toLowerCase().includes('choose') &&
                    !opt.textContent.toLowerCase().includes('choisir')
                  );
                }

                if (selectedOption) {
                  selectedOption.click();
                  log(`Dropdown custom: ${selectedOption.textContent.substring(0, 30)}`);
                  await wait(300);
                }
              }
            }
          }

          await wait(1500);

          // Chercher bouton Next ou Submit
          const nextBtn = Array.from(modal.querySelectorAll('button')).find(btn => {
            const text = btn.textContent.toLowerCase();
            return text.includes('next') || text.includes('suivant') ||
                   text.includes('review') || text.includes('submit') || text.includes('soumettre');
          });

          if (!nextBtn) {
            log('Pas de bouton trouvé');
            break;
          }

          const isSubmit = nextBtn.textContent.toLowerCase().includes('submit') ||
                          nextBtn.textContent.toLowerCase().includes('soumettre');

          // IMPORTANT: Unfollow AVANT de cliquer Submit (Python ligne 1974)
          if (isSubmit) {
            log('Avant Submit: unfollow entreprise...');

            // Scroll vers le bas de la modale pour voir la checkbox
            nextBtn.scrollIntoView({ block: 'end', behavior: 'smooth' });
            await wait(800);

            // Chercher checkbox Follow company (Python ligne 1319)
            const followCheckbox = modal.querySelector('input[id="follow-company-checkbox"]') ||
                                  modal.querySelector('input[id*="follow-company"][type="checkbox"]');

            if (followCheckbox && followCheckbox.checked) {
              // Scroll vers la checkbox
              followCheckbox.scrollIntoView({ block: 'center', behavior: 'smooth' });
              await wait(500);

              // Cliquer sur le label (Python ligne 1321)
              const label = modal.querySelector(`label[for="${followCheckbox.id}"]`);
              if (label) {
                await click(label);
                log('✅ Entreprise UNFOLLOWED');
              } else {
                followCheckbox.click();
                log('✅ Entreprise UNFOLLOWED (fallback)');
              }
            } else {
              log('Checkbox Follow déjà décochée ou non trouvée');
            }

            await wait(500);
          }

          // Vérifier que le bouton n'est pas disabled
          if (nextBtn.disabled || nextBtn.getAttribute('aria-disabled') === 'true') {
            log('⚠️ Button disabled, checking for stuck scenario...');

            // If button stays disabled for too long = stuck
            if (step > 2) {
              log('❌ STUCK: Button remains disabled after multiple attempts');
              log('⚠️ Probably validation error - DISCARDING');

              await discardApplication();
              skippedCount++;
              updateSkippedCount();
              break;
            }

            await wait(1000);
            continue;
          }

          await click(nextBtn);

          // Attendre que la page change
          await wait(2000);

          // Vérifier si vraiment passé à l'étape suivante
          const stillSameModal = document.querySelector('.jobs-easy-apply-modal');
          if (stillSameModal && !isSubmit) {
            // Vérifier si une erreur est affichée (validation failed)
            const errorMessages = [
              '[role="alert"]',
              '.artdeco-inline-feedback--error',
              '.fb-form-element-label__error'
            ];

            for (let selector of errorMessages) {
              const errors = stillSameModal.querySelectorAll(selector);
              for (let error of errors) {
                if (error.offsetParent !== null) { // Visible
                  const errorText = error.textContent.toLowerCase();

                  // Check for validation errors
                  if (errorText.includes('please enter') ||
                      errorText.includes('valid answer') ||
                      errorText.includes('required') ||
                      errorText.includes('must be') ||
                      errorText.includes('invalid') ||
                      errorText.includes('veuillez') ||
                      errorText.includes('requis')) {

                    log(`❌ VALIDATION ERROR: ${error.textContent.substring(0, 60)}`);
                    log('⚠️ Cannot fix validation error - DISCARDING application');

                    await discardApplication();
                    skippedCount++;
                    updateSkippedCount();

                    // Break out of step loop
                    step = 999;
                    break;
                  }
                }
              }
              if (step === 999) break;
            }

            // If we're discarding, break out
            if (step === 999) break;
          }

          if (isSubmit) {
            log('✅ Submit cliqué !');
            appliedCount++;

            // Sauvegarder le job appliqué pour export
            appliedJobs.push({
              title: jobTitle,
              company: jobCompany,
              link: jobLink,
              date: new Date().toISOString()
            });
            updateAppliedCount();
            saveAppliedJobsToStorage();

            // Check if max applications reached
            const maxApps = parseInt(config.maxApplications) || 50;
            if (appliedCount >= maxApps) {
              log(`🎯 MAX APPLICATIONS REACHED: ${appliedCount}/${maxApps}`);
              log('🛑 Stopping bot automatically...');
              isRunning = false;
              await chrome.storage.local.set({ isRunning: false });

              // Notify popup that bot stopped
              try {
                chrome.runtime.sendMessage({ type: 'setRunning', value: false });
              } catch (e) {
                // Popup might be closed, ignore error
              }

              // Close any open modal before stopping
              await discardApplication();
              break; // Exit the main loop
            }

            // OPTIMIZED: Check modal status immediately after Submit
            log('🔍 Checking if modal closed after Submit...');
            await wait(1000); // Short wait to let page process

            // OPTIMIZATION: Check if modal already closed (means application is complete)
            let modalCheck = document.querySelector('.jobs-easy-apply-modal, [role="dialog"], .artdeco-modal');
            if (!modalCheck || modalCheck.offsetParent === null) {
              log('✅ Modal closed immediately - Application completed!');
              updateActivity();

              // Skip all waiting - application is done
              log('--- End of job processing, moving to next ---');
              await wait(1500); // Short wait before next job
              break;
            }

            // Modal still open - need to find Done button
            log('⏳ Modal still open, searching for Done button...');
            await wait(2000); // Wait a bit more for Done to appear

            // Use improved Done button finder
            const result = await findAndClickDoneButton(document, 'Main Modal', 15);

            if (!result.clicked) {
              log('⚠️ Done button not found, checking modal status...');
              const modal = document.querySelector('.jobs-easy-apply-modal');
              if (modal && modal.offsetParent !== null) {
                log('⚠️ Modal still open, trying to close it...');
                await discardApplication();
              } else {
                log('✅ Modal closed during search');
              }
            }

            // Final check: is there an "Application sent" modal?
            await wait(1500);
            let sentModal = document.querySelector('.jobs-easy-apply-modal, [role="dialog"], .artdeco-modal');
            if (sentModal && sentModal.offsetParent !== null) {
              log('📨 "Application sent" modal detected, clicking Done...');
              const sentResult = await findAndClickDoneButton(sentModal, 'Application Sent Modal', 8);

              if (!sentResult.clicked) {
                log('⚠️ Done button not found in sent modal, forcing discard');
                await discardApplication();
              }
            }

            // Application completed
            log('✅ Application completed, moving to next job');
            log('--- End of job processing ---');
            await wait(1500); // Reduced wait before next job
            break;
          }
        }
      }

      // Page suivante (Python ligne 2047)
      log('Passage page suivante...');
      const pagination = document.querySelector('.jobs-search-pagination__pages');
      if (pagination) {
        const activeBtn = pagination.querySelector('button.active');
        if (activeBtn) {
          const currentPage = parseInt(activeBtn.textContent);
          const nextPageBtn = pagination.querySelector(`button[aria-label="Page ${currentPage + 1}"]`);
          if (nextPageBtn) {
            await click(nextPageBtn);
            await wait(3000);
            continue;
          }
        }
      }

      log('Fin des pages');
      break;

    } catch (error) {
      log(`Erreur: ${error.message}`);
      await wait(3000);
    }
  }

  log('Arrêt');
}

// Vérifier si le job contient des mots blacklistés
function shouldSkipByBlacklist(title, company, description, blacklistKeywords) {
  if (!blacklistKeywords || blacklistKeywords.trim() === '') return false;

  // Parse keywords (comma-separated)
  const keywords = blacklistKeywords.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
  if (keywords.length === 0) return false;

  // Combine all job text
  const jobText = (title + ' ' + company + ' ' + description).toLowerCase();

  // Check each keyword
  for (let keyword of keywords) {
    if (jobText.includes(keyword)) {
      log(`⏭️ Skip (Blacklist): "${keyword}" found in job`);
      log(`   Title: ${title.substring(0, 50)}`);
      return true;
    }
  }

  return false;
}

// Extraire années d'expérience requises du texte (multilingue)
function extractYearsRequired(text) {
  if (!text) return 0;

  const lowerText = text.toLowerCase();

  // Patterns multilingues pour années d'expérience
  const patterns = [
    // English: "5+ years", "5-8 years", "5 years"
    /(\d+)\+?\s*(?:years?|yrs?)/gi,
    // French: "5 ans", "5+ ans", "5 années"
    /(\d+)\+?\s*(?:ans?|années?)/gi,
    // Spanish: "5 años"
    /(\d+)\+?\s*años?/gi,
    // German: "5 Jahre"
    /(\d+)\+?\s*jahre?/gi,
    // Italian: "5 anni"
    /(\d+)\+?\s*anni?/gi
  ];

  const years = [];
  patterns.forEach(pattern => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      const num = parseInt(match[1]);
      if (num > 0 && num <= 20) years.push(num);
    }
  });

  return years.length > 0 ? Math.max(...years) : 0;
}

// Vérifier si le job doit être skippé selon années requises
function shouldSkipByExperience(jobCard, maxYearsRequired) {
  if (!maxYearsRequired || maxYearsRequired <= 0) return false;

  try {
    // Chercher dans le titre et la description visible
    const title = jobCard.querySelector('.job-card-list__title, .artdeco-entity-lockup__title')?.textContent || '';
    const subtitle = jobCard.querySelector('.job-card-container__metadata-item')?.textContent || '';
    const combinedText = title + ' ' + subtitle;

    const yearsRequired = extractYearsRequired(combinedText);

    if (yearsRequired > 0 && yearsRequired > maxYearsRequired) {
      log(`⏭️ Skip: ${yearsRequired}+ years required (max: ${maxYearsRequired})`);
      return true;
    }
  } catch (error) {
    // Si erreur, ne pas skipper
  }

  return false;
}

// Fonction pour détecter si la page charge lentement (Python ligne 1440-1479)
async function isPageLoadingSlow() {
  try {
    // Check document readyState (Python ligne 1446)
    if (document.readyState !== 'complete') {
      log(`⏳ Page still loading (readyState: ${document.readyState})`);
      return true;
    }

    // Chercher des spinners/loaders visibles (Python ligne 1517-1528)
    const spinners = document.querySelectorAll('[role="progressbar"], .artdeco-loader, .loading-spinner, .spinner, .loading');
    for (let spinner of spinners) {
      if (spinner.offsetParent !== null) { // Visible
        return true;
      }
    }

    // Vérifier si la modal est visible (Python ligne 1466-1469)
    const modal = document.querySelector('.jobs-easy-apply-modal');
    if (!modal || !modal.offsetParent) {
      return true; // Modal pas visible = en chargement
    }

    return false;
  } catch (error) {
    return true; // Assume slow loading on error (Python ligne 1477)
  }
}

// Fonction pour détecter si popup de chargement est BLOQUÉ (Python ligne 1513-1545)
function checkForStuckLoadingPopup() {
  try {
    // Chercher les spinners/loaders de LinkedIn (Python ligne 1517-1528)
    const loadingIndicators = document.querySelectorAll(
      '.artdeco-loader, .loading, .spinner, [role="progressbar"]'
    );

    if (loadingIndicators.length > 0) {
      for (let indicator of loadingIndicators) {
        if (indicator.offsetParent !== null) { // Visible
          log('⚠️ POPUP DE CHARGEMENT DÉTECTÉ ET VISIBLE!');
          return true;
        }
      }
    }

    // Vérifier aussi si le modal est figé (pas de boutons cliquables) (Python ligne 1531-1540)
    const modal = document.querySelector('.jobs-easy-apply-modal');
    if (modal && modal.offsetParent !== null) {
      const buttons = modal.querySelectorAll('button');
      const clickableButtons = Array.from(buttons).filter(b =>
        !b.disabled && b.offsetParent !== null
      );

      if (clickableButtons.length === 0) {
        log('⚠️ MODAL FIGÉ DÉTECTÉ (aucun bouton cliquable)!');
        return true;
      }
    }

    return false;
  } catch (error) {
    log(`⚠️ Erreur lors de la vérification du popup: ${error.message}`);
    return false;
  }
}

// Mettre à jour le compteur appliqués
function updateAppliedCount() {
  chrome.storage.local.set({ appliedCount: appliedCount });
  try {
    chrome.runtime.sendMessage({ type: 'updateCount', count: appliedCount });
  } catch (e) {}
}

// Mettre à jour le compteur skipped
function updateSkippedCount() {
  chrome.storage.local.set({ skippedCount: skippedCount });
  try {
    chrome.runtime.sendMessage({ type: 'updateSkippedCount', count: skippedCount });
  } catch (e) {}
}

// Sauvegarder les jobs appliqués dans le storage
function saveAppliedJobsToStorage() {
  chrome.storage.local.set({ appliedJobs: appliedJobs });
}

// Écouter les messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle async operations properly
  (async () => {
    try {
      if (request.action === 'start') {
        config = await chrome.storage.sync.get([
          'firstName', 'lastName', 'email', 'phone', 'phoneCountryCode',
          'yearsOfExperience', 'maxYearsRequired', 'blacklistKeywords', 'city', 'country', 'maxApplications'
        ]);

        // Charger les compteurs depuis storage
        const local = await chrome.storage.local.get(['appliedCount', 'skippedCount', 'appliedJobs']);
        appliedCount = local.appliedCount || 0;
        skippedCount = local.skippedCount || 0;
        appliedJobs = local.appliedJobs || [];

        log(`Config: ${config.firstName} ${config.lastName}, exp: ${config.yearsOfExperience || 2}, max required: ${config.maxYearsRequired || 3}`);
        log(`Counters: Applied ${appliedCount}, Skipped ${skippedCount}`);
        isRunning = true;

        // Persist isRunning state pour survire au refresh
        await chrome.storage.local.set({ isRunning: true });
        log('✅ Bot started - State persisted');

        // Send response before starting main loop
        sendResponse({ success: true, message: 'Bot started' });

        // Start main loop (don't await - let it run in background)
        mainLoop();
      } else if (request.action === 'stop') {
        isRunning = false;

        // Clear isRunning state
        await chrome.storage.local.set({ isRunning: false });
        log('⏸️ Bot stopped - State cleared');

        sendResponse({ success: true, message: 'Bot stopped' });
      } else if (request.action === 'exportJobs') {
        // Exporter les jobs en CSV
        sendResponse({ jobs: appliedJobs });
      } else if (request.action === 'resetCounters') {
        appliedCount = 0;
        skippedCount = 0;
        appliedJobs = [];
        await chrome.storage.local.set({ appliedCount: 0, skippedCount: 0, appliedJobs: [] });
        updateAppliedCount();
        updateSkippedCount();
        sendResponse({ success: true, message: 'Counters reset' });
      }
    } catch (error) {
      log(`❌ Message handler error: ${error.message}`);
      sendResponse({ success: false, error: error.message });
    }
  })();

  // Return true to indicate we will send a response asynchronously
  return true;
});

log('Script loaded v2.17.0 - FIXED: Start/Stop button state synchronization');

// AUTO-RESTART: Check if bot was running before page refresh
(async () => {
  try {
    const state = await chrome.storage.local.get(['isRunning', 'appliedCount', 'skippedCount', 'appliedJobs']);

    if (state.isRunning === true) {
      log('🔄 AUTO-RESTART: Bot was running before refresh, restarting...');

      // Reload config
      config = await chrome.storage.sync.get([
        'firstName', 'lastName', 'email', 'phone', 'phoneCountryCode',
        'yearsOfExperience', 'maxYearsRequired', 'blacklistKeywords', 'city', 'country'
      ]);

      // Restore counters
      appliedCount = state.appliedCount || 0;
      skippedCount = state.skippedCount || 0;
      appliedJobs = state.appliedJobs || [];

      log(`✅ AUTO-RESTART: Restored state - Applied: ${appliedCount}, Skipped: ${skippedCount}`);
      log(`Config: ${config.firstName} ${config.lastName}`);

      // Restart bot
      isRunning = true;
      updateActivity(); // Reset activity timer

      // Wait a bit for page to be fully loaded
      await wait(2000);

      log('🚀 AUTO-RESTART: Resuming mainLoop...');
      mainLoop();
    } else {
      log('ℹ️ Bot not running - waiting for user to start');
    }
  } catch (error) {
    log(`⚠️ AUTO-RESTART error: ${error.message}`);
  }
})();
