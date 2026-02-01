// English translations
const EN = {
  // ============================================
  // POPUP UI TRANSLATIONS
  // ============================================
  ui: {
    // Header
    appName: "EasyApplyMax",
    beta: "BETA",

    // Status Card
    status: "Status",
    statusRunning: "Running",
    statusStopped: "Stopped",
    applied: "Applied",
    skipped: "Skipped",

    // Tabs
    tabPersonalInfo: "Personal Info",
    tabSettings: "Settings",
    tabAppliedJobs: "Applied Jobs",

    // Personal Info Tab
    firstName: "First Name",
    firstNamePlaceholder: "John",
    lastName: "Last Name",
    lastNamePlaceholder: "Doe",
    email: "Email",
    emailPlaceholder: "john.doe@example.com",
    countryCode: "Country Code",
    phoneNumber: "Phone Number",
    phonePlaceholder: "1234567890",
    phoneHint: "Without country code or leading zero",
    city: "City",
    cityPlaceholder: "New York, NY",
    currentCompany: "Current Company",
    currentCompanyPlaceholder: "Google, Microsoft, etc.",
    currentCompanyHint: "Your current or most recent employer",
    linkedinUrl: "LinkedIn Profile URL",
    linkedinUrlPlaceholder: "https://linkedin.com/in/yourprofile",
    linkedinUrlHint: "Your LinkedIn profile URL",
    portfolioUrl: "Portfolio URL",
    portfolioUrlPlaceholder: "https://yourportfolio.com",
    portfolioUrlHint: "Your portfolio or personal website URL",
    yearsOfExperience: "Years of Experience",
    yearsOfExperienceHint: "Default answer for \"How many years of experience...\" questions",
    resumeUpload: "Resume / CV Upload",
    chooseFile: "Choose File",
    noFileChosen: "No file chosen",
    resumeHint: "Upload your resume (PDF/DOC/DOCX). Will be used for LinkedIn applications requiring CV upload.",

    // Settings Tab
    blacklistKeywords: "Blacklist Keywords",
    blacklistPlaceholder: "internship, junior, entry-level",
    blacklistHint: "Comma-separated. Jobs containing these words will be skipped",
    maxYearsRequired: "Max Years of Experience Required",
    maxYearsHint: "Skip jobs requiring more years (e.g., \"8+ years required\" will be skipped if max is 3)",
    expectedSalary: "Expected Salary",
    expectedSalaryPlaceholder: "60000",
    expectedSalaryHint: "Your expected annual salary (used for salary-related questions)",

    // Common Questions Section
    commonQuestions: "Common Application Questions",
    visaSponsorship: "Visa Sponsorship Required?",
    visaSponsorshipHint: "Answer to \"Do you need visa sponsorship?\" questions",
    legallyAuthorized: "Legally Authorized to Work?",
    legallyAuthorizedHint: "Answer to work authorization questions",
    willingToRelocate: "Willing to Relocate?",
    willingToRelocateHint: "Answer to relocation questions",
    driversLicense: "Have Driver's License?",
    driversLicenseHint: "Answer to driver's license questions",
    disabilityStatus: "Person with Disability (PCD)?",
    disabilityStatusHint: "Answer to disability/PCD related questions",
    ethnicity: "Race/Ethnicity",
    ethnicityHint: "Answer to race/ethnicity questions",
    preferNotToSay: "Prefer not to say",
    ethnicityWhite: "White",
    ethnicityBlack: "Black",
    ethnicityHispanic: "Hispanic/Latino",
    ethnicityAsian: "Asian",
    ethnicityIndigenous: "Indigenous",
    ethnicityMixed: "Mixed/Multiracial",
    ethnicityOther: "Other",
    englishLevel: "English Level",
    englishLevelHint: "Answer to English proficiency questions",
    englishNative: "Native/Bilingual",
    englishFluent: "Fluent",
    englishAdvanced: "Advanced",
    englishIntermediate: "Intermediate",
    englishBasic: "Basic",
    englishNone: "None",
    yes: "Yes",
    no: "No",

    // AI Section
    aiSection: "AI-Powered Answers (Groq)",
    groqApiKey: "Groq API Key",
    groqApiKeyPlaceholder: "gsk_...",
    groqApiKeyHint: "Get your free API key at",
    enableAI: "Enable AI for unknown questions",
    professionalSummary: "Your Professional Summary",
    professionalSummaryPlaceholder: "E.g.: I'm a Full Stack Developer with 5 years of experience in React, Node.js, and Python. I've worked at startups and large companies...",
    professionalSummaryHint: "AI will use this to answer questions about your experience",
    skills: "Your Skills",
    skillsPlaceholder: "React, Node.js, Python, AWS, Docker, PostgreSQL...",
    skillsHint: "Comma-separated list of your technical skills",
    cachedAnswers: "cached answers",
    clearCache: "Clear Cache",

    // Toggle
    autoNextPage: "Auto next page",

    // Applied Jobs Tab
    appliedJobs: "Applied Jobs",
    clearAll: "Clear All",
    noApplicationsYet: "No applications yet",
    noApplicationsHint: "Start applying to see your job applications here",
    viewOnLinkedIn: "View on LinkedIn",

    // Action Buttons
    start: "Start",
    stop: "Stop",
    exportCSV: "Export Applied Jobs (CSV)",
    resetCounters: "Reset Counters",

    // Feedback Section
    feedbackTitle: "Support This Free Tool!",
    feedbackDescription: "EasyApplyMax is 100% free, built to help job seekers. We're a small project and every bit of support helps!",
    feedbackReview: "Leave a 5-star review on Chrome Web Store",
    feedbackShare: "Share with friends looking for jobs",
    feedbackDiscord: "Join Discord to report bugs & suggest features",
    leaveReview: "Leave a Review",
    joinDiscord: "Join Discord",

    // Instructions
    howToUse: "How to use",
    instruction1: "Go to LinkedIn and activate",
    instruction1Bold: "Easy Apply filter",
    instruction2: "Fill in your personal information above",
    instruction3: "Click",
    instruction3Bold: "Save Config",
    instruction4: "Click",
    instruction4Bold: "Start",
    instruction4End: "to begin auto-applying",
    instruction5: "Open Browser Console (F12) to see detailed logs",

    // Footer
    footer: "Community-driven project",

    // Messages
    saved: "Saved",
    saving: "Saving...",
    exported: "Exported",
    reset: "Reset!",
    aiCacheCleared: "AI answers cache cleared",

    // Errors & Warnings
    errorLinkedInPage: "Please open a LinkedIn jobs page first! (linkedin.com/jobs/...)",
    errorJobsPage: "Please navigate to LinkedIn Jobs page first! (linkedin.com/jobs/search/ or /jobs/collections/)",
    errorFixFields: "Please fix the errors in your personal information before starting",
    errorStartBot: "Error starting bot. Please reload the LinkedIn page (F5) and try again.",
    errorFileTooLarge: "File too large! Please upload a file smaller than 5MB.",
    errorInvalidFileType: "Invalid file type! Please upload PDF, DOC, or DOCX files only.",
    noJobsApplied: "No jobs applied yet. Start the bot first!",
    confirmReset: "Reset all counters and clear applied jobs list?",
    confirmClearJobs: "Clear all applied jobs from the list? This cannot be undone.",
    confirmClearCache: "Clear all cached AI answers? This cannot be undone.",
    confirmRemoveResume: "Remove uploaded resume?",

    // Language
    language: "Language",
  },

  // ============================================
  // LINKEDIN FIELD DETECTION PATTERNS
  // Used by content-simple.js to detect form fields
  // ============================================
  patterns: {
    // Field type detection (regex patterns)
    yearsExperience: /experience|years|how many years|total years/i,
    salary: /salary|compensation|remuneration|pay|wage|expected salary/i,
    email: /email|e-mail/i,
    firstName: /first\s*name|given\s*name/i,
    lastName: /last\s*name|surname|family\s*name/i,
    phone: /phone|telephone|mobile|cell|contact number/i,
    city: /city|location|where.*located|current location/i,

    // Question detection for radio buttons
    visaSponsorship: /visa|sponsor|sponsorship|work visa|immigration/i,
    workAuthorization: /authorized|legally.*work|permit.*work|eligible.*work|right.*work|employment eligibility/i,
    relocation: /relocat|move.*location|willing.*move|open.*relocation/i,
    securityClearance: /security.*clearance|clearance|secret|top secret/i,
    driversLicense: /driver.*license|driving.*license|valid.*license|driver's license/i,
    languageProficiency: /proficiency|level.*english|fluency|language.*level/i,

    // Yes/No answer patterns
    yesAnswers: /^(yes|y)$/i,
    noAnswers: /^(no|n)$/i,

    // Language proficiency levels
    native: /native|bilingual|mother tongue/i,
    fluent: /fluent|full professional/i,
    professional: /professional|advanced|proficient/i,
    intermediate: /intermediate|conversational|working/i,

    // Done/Submit button text patterns
    doneButtons: ['Done', 'Submit application', 'Submit', 'Dismiss', 'Close', 'Continue'],

    // Discard/Cancel button text patterns
    discardButtons: ['discard', 'cancel', 'close', 'dismiss'],
  },

  // ============================================
  // AI SYSTEM PROMPT (for Groq API)
  // ============================================
  ai: {
    systemPromptIntro: "You are an AI assistant helping to fill out job application forms.",
    systemPromptRules: `You must provide SHORT, CONCISE answers suitable for form fields (usually 1-3 sentences max).
Do NOT use markdown formatting. Just plain text.`,
    systemPromptProfile: "CANDIDATE PROFILE:",
    systemPromptPreviousAnswers: "PREVIOUS ANSWERS (use for consistency):",
    systemPromptRulesList: `RULES:
1. Be concise - form fields have character limits
2. Be professional and confident
3. Match the tone of the question
4. If asking about years of experience with specific tech, give a realistic number based on total experience
5. If you don't have enough info, make reasonable assumptions based on the profile
6. NEVER say "I don't know" - always provide a helpful answer`,
    userPromptQuestion: "Application Question:",
    userPromptFieldType: "Field Type:",
    userPromptMaxLength: "Max Length:",
    userPromptInstruction: "Provide a direct answer suitable for this form field:",
  },

  // ============================================
  // LOG MESSAGES (for console)
  // ============================================
  logs: {
    botStarted: "Bot started by USER",
    botStopped: "Bot stopped by user",
    securityFlagsSet: "Security flags set: isRunning=true, userExplicitlyClickedStart=true",
    securityFlagsCleared: "Security flags cleared: isRunning=false, userExplicitlyClickedStart=false",
    dailyLimitReached: "DAILY LIMIT REACHED!",
    dailyLimitMessage: "LinkedIn limits Easy Apply to ~50-100 per day",
    canContinueTomorrow: "You can continue applying tomorrow!",
    botStoppedAuto: "Bot stopped automatically",
    noEasyApply: "Not Easy Apply, skip",
    jobsFound: "jobs found",
    noJobsFound: "No jobs found. Waiting 5s...",
    pageSearch: "Page type: SEARCH (pagination mode)",
    pageCollections: "Page type: COLLECTIONS (infinite scroll mode)",
    aiEnabled: "AI enabled with",
    aiDisabled: "AI disabled",
    aiNoApiKey: "AI enabled but no API key configured",
    cachedAnswersCount: "cached answers",
    resumeLoaded: "Resume loaded:",
    noResume: "No resume uploaded - file upload fields will be skipped",
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EN;
}
