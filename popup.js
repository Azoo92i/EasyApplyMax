// Popup script for UI management
let isRunning = false;

// Load config on startup
document.addEventListener('DOMContentLoaded', async () => {
  await loadConfig();
  await updateStatus();
  await loadRunningState(); // Load bot running state
  setupTabs();
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
    });
  });
}

// Load saved configuration
async function loadConfig() {
  const config = await chrome.storage.sync.get([
    'firstName', 'lastName', 'email', 'phone', 'phoneCountryCode', 'city',
    'yearsOfExperience', 'maxYearsRequired', 'blacklistKeywords', 'maxApplications', 'autoNextPage'
  ]);

  document.getElementById('firstName').value = config.firstName || '';
  document.getElementById('lastName').value = config.lastName || '';
  document.getElementById('email').value = config.email || '';
  document.getElementById('phoneCountryCode').value = config.phoneCountryCode || '+1';
  document.getElementById('phone').value = config.phone || '';
  document.getElementById('city').value = config.city || '';
  document.getElementById('yearsOfExperience').value = config.yearsOfExperience || '2';
  document.getElementById('maxYearsRequired').value = config.maxYearsRequired || '3';
  document.getElementById('blacklistKeywords').value = config.blacklistKeywords || '';
  document.getElementById('maxApplications').value = config.maxApplications || '50';
  document.getElementById('autoNextPage').checked = config.autoNextPage !== false;
}

// Save configuration
document.getElementById('save-btn').addEventListener('click', async () => {
  const config = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phoneCountryCode: document.getElementById('phoneCountryCode').value,
    phone: document.getElementById('phone').value,
    city: document.getElementById('city').value,
    yearsOfExperience: document.getElementById('yearsOfExperience').value,
    maxYearsRequired: document.getElementById('maxYearsRequired').value,
    blacklistKeywords: document.getElementById('blacklistKeywords').value,
    maxApplications: document.getElementById('maxApplications').value,
    autoNextPage: document.getElementById('autoNextPage').checked
  };

  await chrome.storage.sync.set(config);

  // Visual feedback
  const btn = document.getElementById('save-btn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '✓ Saved!';
  btn.style.background = '#10b981';
  btn.style.color = 'white';

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
    btn.style.color = '';
  }, 2000);
});

// Start automation
document.getElementById('start-btn').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Send message and wait for response
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'start' });

    if (response && response.success) {
      console.log('Bot started successfully:', response.message);
    }

    // Wait a bit for content script to update storage, then reload state
    await new Promise(resolve => setTimeout(resolve, 300));
    await loadRunningState();
  } catch (error) {
    console.error('Start error:', error);
    alert('Error: Please reload LinkedIn page (F5) and try again');
  }
});

// Stop automation
document.getElementById('stop-btn').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Send message and wait for response
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'stop' });

    if (response && response.success) {
      console.log('Bot stopped successfully:', response.message);
    }

    // Wait a bit for content script to update storage, then reload state
    await new Promise(resolve => setTimeout(resolve, 300));
    await loadRunningState();
  } catch (error) {
    console.error('Stop error:', error);
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

// Load running state from storage
async function loadRunningState() {
  const local = await chrome.storage.local.get(['isRunning']);
  isRunning = local.isRunning === true;
  updateButtons();
  updateStatusDisplay(isRunning ? 'Running' : 'Stopped', isRunning);
}

// Listen for updates
chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'updateCount') {
    document.getElementById('applied-count').textContent = request.count;
  } else if (request.type === 'updateSkippedCount') {
    document.getElementById('skipped-count').textContent = request.count;
  } else if (request.type === 'setRunning') {
    isRunning = request.value;
    updateButtons();
    updateStatusDisplay(request.value ? 'Running' : 'Stopped', request.value);
  }
});

// Update status and running state every 2 seconds
setInterval(async () => {
  await updateStatus();
  await loadRunningState();
}, 2000);

// Export jobs to CSV
document.getElementById('export-csv-btn').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'exportJobs' });

    if (!response || !response.jobs || response.jobs.length === 0) {
      alert('No jobs applied yet. Start the bot first!');
      return;
    }

    // Convert to CSV
    const csvContent = convertToCSV(response.jobs);

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
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Exported ${response.jobs.length} jobs!`;
    btn.style.background = '#059669';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
    }, 3000);
  } catch (error) {
    alert('Error exporting jobs. Make sure you are on a LinkedIn page.');
  }
});

// Reset counters
document.getElementById('reset-counters-btn').addEventListener('click', async () => {
  if (!confirm('Reset all counters and clear applied jobs list?')) return;

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.tabs.sendMessage(tab.id, { action: 'resetCounters' });

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
