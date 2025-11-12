// Popup script for UI management
let isRunning = false;

// Load running state from storage
async function loadRunningState() {
  const local = await chrome.storage.local.get(['isRunning']);
  isRunning = local.isRunning || false;
  updateButtons();
  updateStatusDisplay(isRunning ? 'Running' : 'Stopped', isRunning);
}

// Load config on startup
document.addEventListener('DOMContentLoaded', async () => {
  await loadConfig();
  await updateStatus();
  await loadRunningState(); // Load current running state
  setupTabs();
  setupResumeUpload();
  setupValidation(); // Setup field validation
  checkOnboarding(); // Check if first time user
});

// Setup tabs
function setupTabs() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));

      // Add active to clicked
      tab.classList.add('active');
      const tabName = tab.getAttribute('data-tab');
      document.getElementById(`${tabName}-tab`).classList.add('active');

      // Load applied jobs when tab is opened
      if (tabName === 'applied') {
        loadAppliedJobs();
      }
    });
  });
}

// Load saved configuration
async function loadConfig() {
  const config = await chrome.storage.sync.get([
    'firstName', 'lastName', 'email', 'phone', 'phoneCountryCode', 'city',
    'yearsOfExperience', 'maxYearsRequired', 'blacklistKeywords', 'maxApplications', 'autoNextPage', 'expectedSalary'
  ]);

  // Load from local storage for larger data (resume)
  const local = await chrome.storage.local.get(['resumeFile', 'resumeFileName']);

  document.getElementById('firstName').value = config.firstName || '';
  document.getElementById('lastName').value = config.lastName || '';
  document.getElementById('email').value = config.email || '';
  document.getElementById('phoneCountryCode').value = config.phoneCountryCode || '+1';
  document.getElementById('phone').value = config.phone || '';
  document.getElementById('city').value = config.city || '';
  document.getElementById('yearsOfExperience').value = config.yearsOfExperience || '2';
  document.getElementById('maxYearsRequired').value = config.maxYearsRequired || '3';
  document.getElementById('expectedSalary').value = config.expectedSalary || '';
  document.getElementById('blacklistKeywords').value = config.blacklistKeywords || '';
  document.getElementById('maxApplications').value = config.maxApplications || '50';
  document.getElementById('autoNextPage').checked = config.autoNextPage !== false;

  // Load resume if exists
  if (local.resumeFileName) {
    document.getElementById('resumeFileName').textContent = local.resumeFileName;
    document.getElementById('resumeFileName').classList.add('has-file');
    document.getElementById('removeResumeBtn').style.display = 'inline-flex';
  }

  // Setup auto-save on all fields
  setupAutoSave();
  setupResumeUpload();
}

// Auto-save indicator
let saveTimeout;
function showAutoSaveIndicator(saving = false) {
  const indicator = document.getElementById('autosave-indicator');
  indicator.classList.remove('show', 'saving');

  if (saving) {
    indicator.classList.add('saving', 'show');
    indicator.querySelector('span').textContent = 'Saving...';
  } else {
    indicator.classList.add('show');
    indicator.querySelector('span').textContent = 'Saved';
    setTimeout(() => {
      indicator.classList.remove('show');
    }, 2000);
  }
}

// Auto-save configuration
async function saveConfig() {
  const config = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phoneCountryCode: document.getElementById('phoneCountryCode').value,
    phone: document.getElementById('phone').value,
    city: document.getElementById('city').value,
    yearsOfExperience: document.getElementById('yearsOfExperience').value,
    maxYearsRequired: document.getElementById('maxYearsRequired').value,
    expectedSalary: document.getElementById('expectedSalary').value,
    blacklistKeywords: document.getElementById('blacklistKeywords').value,
    maxApplications: document.getElementById('maxApplications').value,
    autoNextPage: document.getElementById('autoNextPage').checked
  };

  showAutoSaveIndicator(true);
  await chrome.storage.sync.set(config);
  showAutoSaveIndicator(false);
}

// Setup auto-save on all form fields
function setupAutoSave() {
  const inputFields = [
    'firstName', 'lastName', 'email', 'phone', 'phoneCountryCode',
    'city', 'yearsOfExperience', 'maxYearsRequired', 'expectedSalary', 'blacklistKeywords', 'maxApplications'
  ];

  inputFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('input', () => {
        // Debounce: wait 500ms after user stops typing
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          saveConfig();
        }, 500);
      });
    }
  });

  // For checkbox, save immediately
  const checkbox = document.getElementById('autoNextPage');
  if (checkbox) {
    checkbox.addEventListener('change', () => {
      saveConfig();
    });
  }
}

// Start automation
document.getElementById('start-btn').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Check if we're on LinkedIn
    if (!tab.url || !tab.url.includes('linkedin.com')) {
      showToast('Please open a LinkedIn jobs page first! (linkedin.com/jobs/...)', 'warning', 6000);
      return;
    }

    // Check if on job search page
    if (!tab.url.includes('/jobs/')) {
      showToast('Please navigate to LinkedIn Jobs page first! (linkedin.com/jobs/search/ or /jobs/collections/)', 'warning', 6000);
      return;
    }

    // Validate fields before starting
    if (!validateAllFields()) {
      showToast('Please fix the errors in your personal information before starting', 'error');
      return;
    }

    console.log('🔒 SECURITY: Injecting content script ONLY when user clicks Start...');

    // CRITICAL: Inject content script ONLY when user clicks Start
    // This prevents ANY automatic execution
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content-simple.js']
      });
      console.log('✅ Content script injected successfully');

      // Wait a bit for script to initialize
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (injectError) {
      console.log('⚠️ Script may already be injected, continuing...');
    }

    // Send message and wait for response
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'start' });

    if (response && response.success) {
      console.log('Bot started successfully:', response.message);
    }

    // Content script will send botStarted/botStopped messages
    await new Promise(resolve => setTimeout(resolve, 300));
  } catch (error) {
    console.error('Start error:', error);
    showToast('Error starting bot. Please reload the LinkedIn page (F5) and try again.', 'error');
  }
});

// Stop automation
document.getElementById('stop-btn').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Check if we're on LinkedIn
    if (!tab.url || !tab.url.includes('linkedin.com')) {
      // If not on LinkedIn, just update local state
      await chrome.storage.local.set({ isRunning: false });
      await loadRunningState();
      console.log('Bot stopped (not on LinkedIn page)');
      return;
    }

    // Send message and wait for response
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'stop' });

    if (response && response.success) {
      console.log('Bot stopped successfully:', response.message);
    }

    // Content script will send botStarted/botStopped messages
    await new Promise(resolve => setTimeout(resolve, 300));
  } catch (error) {
    console.error('Stop error:', error);

    // Even if error, try to stop by updating storage directly
    await chrome.storage.local.set({ isRunning: false });
    await loadRunningState();
    console.log('Bot stopped (via storage fallback)');
  }
});

// Update button states
function updateButtons() {
  document.getElementById('start-btn').disabled = isRunning;
  document.getElementById('stop-btn').disabled = !isRunning;
}

// Update status display
function updateStatusDisplay(text, running) {
  const statusEl = document.getElementById('status');
  statusEl.textContent = text;
  statusEl.className = running ? 'status-value running' : 'status-value stopped';
}

// Update status from storage
async function updateStatus() {
  const local = await chrome.storage.local.get(['appliedCount', 'skippedCount']);
  document.getElementById('applied-count').textContent = local.appliedCount || 0;
  document.getElementById('skipped-count').textContent = local.skippedCount || 0;
}

// Listen for updates from content script
chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'updateCount') {
    document.getElementById('applied-count').textContent = request.count;
  } else if (request.type === 'updateSkippedCount') {
    document.getElementById('skipped-count').textContent = request.count;
  } else if (request.type === 'botStarted') {
    // Bot has started in content script
    isRunning = true;
    updateButtons();
    updateStatusDisplay('Running', true);
  } else if (request.type === 'botStopped') {
    // Bot has stopped in content script
    isRunning = false;
    updateButtons();
    updateStatusDisplay('Stopped', false);
  }
});

// Update status (counters) every 2 seconds
// NOTE: isRunning state is NOT in storage anymore, managed by messages from content script
setInterval(async () => {
  await updateStatus();
}, 2000);

// Export jobs to CSV
document.getElementById('export-csv-btn').addEventListener('click', async () => {
  try {
    // Read directly from storage instead of content script
    const local = await chrome.storage.local.get(['appliedJobs']);
    const jobs = local.appliedJobs || [];

    if (jobs.length === 0) {
      showToast('No jobs applied yet. Start the bot first!', 'info');
      return;
    }

    // Convert to CSV
    const csvContent = convertToCSV(jobs);

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `linkedin_applied_jobs_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    // Visual feedback
    const btn = document.getElementById('export-csv-btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Exported ${jobs.length} jobs!`;
    btn.style.background = '#059669';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
    }, 3000);
  } catch (error) {
    console.error('Export error:', error);
    showToast('Error exporting jobs: ' + error.message, 'error');
  }
});

// Reset counters
document.getElementById('reset-counters-btn').addEventListener('click', async () => {
  if (!confirm('Reset all counters and clear applied jobs list?')) return;

  try {
    // Update storage directly - more reliable than messaging content script
    await chrome.storage.local.set({
      appliedCount: 0,
      skippedCount: 0,
      appliedJobs: []
    });

    // Also try to notify content script if it's running
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.url && tab.url.includes('linkedin.com')) {
        await chrome.tabs.sendMessage(tab.id, { action: 'resetCounters' });
      }
    } catch (e) {
      // Content script not available, that's ok - we already updated storage
      console.log('Content script not available, counters reset in storage only');
    }

    // Update display
    document.getElementById('applied-count').textContent = '0';
    document.getElementById('skipped-count').textContent = '0';

    // Visual feedback
    const btn = document.getElementById('reset-counters-btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Reset!`;
    btn.style.background = '#059669';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
    }, 2000);
  } catch (error) {
    console.error(error);
  }
});

// Convert jobs to CSV
function convertToCSV(jobs) {
  const headers = ['Date', 'Job Title', 'Company', 'Link'];
  const rows = jobs.map(job => [
    new Date(job.date).toLocaleString(),
    `"${job.title.replace(/"/g, '""')}"`, // Escape quotes
    `"${job.company.replace(/"/g, '""')}"`,
    job.link
  ]);

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}

// Load and display applied jobs
async function loadAppliedJobs() {
  try {
    const { appliedJobs = [] } = await chrome.storage.local.get(['appliedJobs']);

    const listContainer = document.getElementById('applied-jobs-list');
    const countElement = document.getElementById('applied-jobs-count');

    countElement.textContent = appliedJobs.length;

    if (appliedJobs.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6H16V4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 4V6H4C2.89543 6 2 6.89543 2 8V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V8C22 6.89543 21.1046 6 20 6Z" stroke="currentColor" stroke-width="2"/>
            <path d="M8 6V4H16V6" stroke="currentColor" stroke-width="2"/>
            <path d="M12 11V17M9 14H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <p>No applications yet</p>
          <small>Start applying to see your job applications here</small>
        </div>
      `;
      return;
    }

    // Sort by date (most recent first)
    const sortedJobs = [...appliedJobs].sort((a, b) => new Date(b.date) - new Date(a.date));

    listContainer.innerHTML = sortedJobs.map(job => `
      <div class="job-card">
        <div class="job-card-header">
          <div>
            <h4 class="job-title">${escapeHtml(job.title)}</h4>
            <p class="job-company">${escapeHtml(job.company)}</p>
            ${job.location ? `<p class="job-location">📍 ${escapeHtml(job.location)}</p>` : ''}
          </div>
          <span class="job-time">${formatTimeAgo(job.date)}</span>
        </div>
        <a href="${job.link}" target="_blank" class="job-link">
          View on LinkedIn
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    `).join('');

  } catch (error) {
    console.error('Error loading applied jobs:', error);
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Format time ago
function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return date.toLocaleDateString();
}

// Clear all applied jobs
document.getElementById('clear-applied-jobs')?.addEventListener('click', async () => {
  if (!confirm('Clear all applied jobs from the list? This cannot be undone.')) return;

  try {
    await chrome.storage.local.set({ appliedJobs: [] });
    loadAppliedJobs();

    // Also try to clear from content script
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      try {
        await chrome.tabs.sendMessage(tab.id, { action: 'clearAppliedJobs' });
      } catch (e) {
        // Content script might not be loaded, that's okay
      }
    }
  } catch (error) {
    console.error('Error clearing applied jobs:', error);
  }
});

// Resume upload functionality
function setupResumeUpload() {
  const fileInput = document.getElementById('resumeFile');
  const uploadBtn = document.getElementById('uploadResumeBtn');
  const fileName = document.getElementById('resumeFileName');
  const removeBtn = document.getElementById('removeResumeBtn');

  // Click upload button triggers file input
  uploadBtn.addEventListener('click', () => {
    fileInput.click();
  });

  // Handle file selection
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB for Chrome Storage local)
    if (file.size > 5 * 1024 * 1024) {
      showToast('File too large! Please upload a file smaller than 5MB.');
      return;
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      showToast('Invalid file type! Please upload PDF, DOC, or DOCX files only.');
      return;
    }

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target.result;

        // Save to Chrome storage local (larger quota than sync)
        await chrome.storage.local.set({
          resumeFile: base64,
          resumeFileName: file.name,
          resumeFileType: file.type
        });

        // Update UI
        fileName.textContent = file.name;
        fileName.classList.add('has-file');
        removeBtn.style.display = 'inline-flex';

        // Show saved indicator
        showAutoSaveIndicator(false);

        console.log('Resume uploaded successfully:', file.name);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading resume:', error);
      showToast('Error uploading file. Please try again.');
    }
  });

  // Handle remove button
  removeBtn.addEventListener('click', async () => {
    if (!confirm('Remove uploaded resume?')) return;

    try {
      // Remove from storage
      await chrome.storage.local.remove(['resumeFile', 'resumeFileName', 'resumeFileType']);

      // Reset UI
      fileName.textContent = 'No file chosen';
      fileName.classList.remove('has-file');
      removeBtn.style.display = 'none';
      fileInput.value = '';

      console.log('Resume removed');
    } catch (error) {
      console.error('Error removing resume:', error);
    }
  });
}
