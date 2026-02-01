// French translations
const FR = {
  // ============================================
  // POPUP UI TRANSLATIONS
  // ============================================
  ui: {
    // Header
    appName: "EasyApplyMax",
    beta: "BETA",

    // Status Card
    status: "Statut",
    statusRunning: "En cours",
    statusStopped: "Arrêté",
    applied: "Postulé",
    skipped: "Ignoré",

    // Tabs
    tabPersonalInfo: "Infos personnelles",
    tabSettings: "Paramètres",
    tabAppliedJobs: "Emplois postulés",

    // Personal Info Tab
    firstName: "Prénom",
    firstNamePlaceholder: "Jean",
    lastName: "Nom",
    lastNamePlaceholder: "Dupont",
    email: "E-mail",
    emailPlaceholder: "jean.dupont@exemple.com",
    countryCode: "Indicatif pays",
    phoneNumber: "Téléphone",
    phonePlaceholder: "0612345678",
    phoneHint: "Sans indicatif pays ni zéro initial",
    city: "Ville",
    cityPlaceholder: "Paris, France",
    currentCompany: "Entreprise actuelle",
    currentCompanyPlaceholder: "Google, Microsoft, etc.",
    currentCompanyHint: "Votre employeur actuel ou le plus récent",
    linkedinUrl: "URL du profil LinkedIn",
    linkedinUrlPlaceholder: "https://linkedin.com/in/votreprofil",
    linkedinUrlHint: "URL de votre profil LinkedIn",
    portfolioUrl: "URL du portfolio",
    portfolioUrlPlaceholder: "https://votreportfolio.com",
    portfolioUrlHint: "URL de votre portfolio ou site personnel",
    yearsOfExperience: "Années d'expérience",
    yearsOfExperienceHint: "Réponse par défaut pour les questions \"Combien d'années d'expérience...\"",
    resumeUpload: "Télécharger CV",
    chooseFile: "Choisir un fichier",
    noFileChosen: "Aucun fichier choisi",
    resumeHint: "Téléchargez votre CV (PDF/DOC/DOCX). Sera utilisé pour les candidatures LinkedIn nécessitant un CV.",

    // Settings Tab
    blacklistKeywords: "Mots-clés bloqués",
    blacklistPlaceholder: "stage, junior, débutant",
    blacklistHint: "Séparés par des virgules. Les offres contenant ces mots seront ignorées",
    maxYearsRequired: "Maximum d'années d'expérience requises",
    maxYearsHint: "Ignorer les offres nécessitant plus d'années (ex: \"8+ ans requis\" sera ignoré si max est 3)",
    expectedSalary: "Salaire attendu",
    expectedSalaryPlaceholder: "50000",
    expectedSalaryHint: "Votre salaire annuel attendu (utilisé pour les questions sur le salaire)",

    // Common Questions Section
    commonQuestions: "Questions courantes de candidature",
    visaSponsorship: "Besoin de parrainage de visa ?",
    visaSponsorshipHint: "Réponse aux questions \"Avez-vous besoin d'un parrainage de visa ?\"",
    legallyAuthorized: "Autorisé légalement à travailler ?",
    legallyAuthorizedHint: "Réponse aux questions sur l'autorisation de travail",
    willingToRelocate: "Prêt à déménager ?",
    willingToRelocateHint: "Réponse aux questions sur la relocalisation",
    driversLicense: "Avez-vous le permis de conduire ?",
    driversLicenseHint: "Réponse aux questions sur le permis de conduire",
    disabilityStatus: "Personne en situation de handicap ?",
    disabilityStatusHint: "Réponse aux questions sur le handicap",
    ethnicity: "Origine ethnique",
    ethnicityHint: "Réponse aux questions sur l'origine ethnique",
    preferNotToSay: "Je préfère ne pas répondre",
    ethnicityWhite: "Blanc(he)",
    ethnicityBlack: "Noir(e)",
    ethnicityHispanic: "Hispanique/Latino",
    ethnicityAsian: "Asiatique",
    ethnicityIndigenous: "Autochtone",
    ethnicityMixed: "Métis/Multiracial",
    ethnicityOther: "Autre",
    englishLevel: "Niveau d'anglais",
    englishLevelHint: "Réponse aux questions sur la maîtrise de l'anglais",
    englishNative: "Natif/Bilingue",
    englishFluent: "Courant",
    englishAdvanced: "Avancé",
    englishIntermediate: "Intermédiaire",
    englishBasic: "Débutant",
    englishNone: "Aucun",
    yes: "Oui",
    no: "Non",

    // AI Section
    aiSection: "Réponses assistées par IA (Groq)",
    groqApiKey: "Clé API Groq",
    groqApiKeyPlaceholder: "gsk_...",
    groqApiKeyHint: "Obtenez votre clé API gratuite sur",
    enableAI: "Activer l'IA pour les questions inconnues",
    professionalSummary: "Votre résumé professionnel",
    professionalSummaryPlaceholder: "Ex: Je suis Développeur Full Stack avec 5 ans d'expérience en React, Node.js et Python. J'ai travaillé dans des startups et grandes entreprises...",
    professionalSummaryHint: "L'IA utilisera ceci pour répondre aux questions sur votre expérience",
    skills: "Vos compétences",
    skillsPlaceholder: "React, Node.js, Python, AWS, Docker, PostgreSQL...",
    skillsHint: "Liste de compétences techniques séparées par des virgules",
    cachedAnswers: "réponses en cache",
    clearCache: "Vider le cache",

    // Toggle
    autoNextPage: "Page suivante automatique",

    // Applied Jobs Tab
    appliedJobs: "Emplois postulés",
    clearAll: "Tout effacer",
    noApplicationsYet: "Aucune candidature pour l'instant",
    noApplicationsHint: "Commencez à postuler pour voir vos candidatures ici",
    viewOnLinkedIn: "Voir sur LinkedIn",

    // Action Buttons
    start: "Démarrer",
    stop: "Arrêter",
    exportCSV: "Exporter les emplois (CSV)",
    resetCounters: "Réinitialiser les compteurs",

    // Feedback Section
    feedbackTitle: "Soutenez cet outil gratuit !",
    feedbackDescription: "EasyApplyMax est 100% gratuit, conçu pour aider les chercheurs d'emploi. Nous sommes un petit projet et chaque soutien compte !",
    feedbackReview: "Laissez un avis 5 étoiles sur le Chrome Web Store",
    feedbackShare: "Partagez avec des amis en recherche d'emploi",
    feedbackDiscord: "Rejoignez Discord pour signaler des bugs et suggérer des fonctionnalités",
    leaveReview: "Laisser un avis",
    joinDiscord: "Rejoindre Discord",

    // Instructions
    howToUse: "Comment utiliser",
    instruction1: "Allez sur LinkedIn et activez le filtre",
    instruction1Bold: "Candidature simplifiée",
    instruction2: "Remplissez vos informations personnelles ci-dessus",
    instruction3: "Cliquez sur",
    instruction3Bold: "Sauvegarder",
    instruction4: "Cliquez sur",
    instruction4Bold: "Démarrer",
    instruction4End: "pour commencer à postuler automatiquement",
    instruction5: "Ouvrez la console du navigateur (F12) pour voir les logs détaillés",

    // Footer
    footer: "Projet communautaire",

    // Messages
    saved: "Sauvegardé",
    saving: "Sauvegarde...",
    exported: "Exporté",
    reset: "Réinitialisé !",
    aiCacheCleared: "Cache des réponses IA vidé",

    // Errors & Warnings
    errorLinkedInPage: "Veuillez d'abord ouvrir une page d'emplois LinkedIn ! (linkedin.com/jobs/...)",
    errorJobsPage: "Veuillez d'abord naviguer vers la page Emplois LinkedIn ! (linkedin.com/jobs/search/ ou /jobs/collections/)",
    errorFixFields: "Veuillez corriger les erreurs dans vos informations personnelles avant de commencer",
    errorStartBot: "Erreur lors du démarrage du bot. Veuillez recharger la page LinkedIn (F5) et réessayer.",
    errorFileTooLarge: "Fichier trop volumineux ! Veuillez télécharger un fichier de moins de 5 Mo.",
    errorInvalidFileType: "Type de fichier invalide ! Veuillez télécharger uniquement des fichiers PDF, DOC ou DOCX.",
    noJobsApplied: "Aucun emploi postulé pour l'instant. Démarrez d'abord le bot !",
    confirmReset: "Réinitialiser tous les compteurs et effacer la liste des emplois postulés ?",
    confirmClearJobs: "Effacer tous les emplois postulés de la liste ? Cette action est irréversible.",
    confirmClearCache: "Effacer toutes les réponses IA en cache ? Cette action est irréversible.",
    confirmRemoveResume: "Supprimer le CV téléchargé ?",

    // Language
    language: "Langue",
  },

  // ============================================
  // LINKEDIN FIELD DETECTION PATTERNS
  // Used by content-simple.js to detect form fields
  // ============================================
  patterns: {
    // Field type detection (regex patterns) - French additions
    yearsExperience: /expérience|années|combien d'années|années d'expérience/i,
    salary: /salaire|rémunération|compensation|prétentions salariales/i,
    email: /email|e-mail|courriel/i,
    firstName: /prénom|premier\s*nom/i,
    lastName: /nom|nom de famille/i,
    phone: /téléphone|portable|mobile|numéro de téléphone/i,
    city: /ville|localisation|où.*situé|emplacement/i,

    // Question detection for radio buttons
    visaSponsorship: /visa|parrainage|sponsor|immigration|permis de travail/i,
    workAuthorization: /autorisé|légalement.*travailler|permis.*travail|éligible.*travailler|droit.*travailler/i,
    relocation: /relocalisation|déménager|mutation|prêt.*déménager|ouvert.*relocalisation/i,
    securityClearance: /habilitation.*sécurité|sécurité|confidentiel/i,
    driversLicense: /permis.*conduire|permis de conduire/i,
    languageProficiency: /maîtrise|niveau.*anglais|aisance|niveau.*langue/i,

    // Yes/No answer patterns
    yesAnswers: /^(oui|o|yes|y)$/i,
    noAnswers: /^(non|n|no)$/i,

    // Language proficiency levels
    native: /natif|bilingue|langue maternelle/i,
    fluent: /courant|maîtrise complète/i,
    professional: /professionnel|avancé|compétent/i,
    intermediate: /intermédiaire|conversationnel/i,

    // Done/Submit button text patterns
    doneButtons: ['Terminé', 'Soumettre la candidature', 'Soumettre', 'Fermer', 'Ignorer', 'Continuer', 'Done', 'Submit'],

    // Discard/Cancel button text patterns
    discardButtons: ['abandonner', 'annuler', 'fermer', 'ignorer', 'discard', 'cancel'],
  },

  // ============================================
  // AI SYSTEM PROMPT (for Groq API) - French
  // ============================================
  ai: {
    systemPromptIntro: "Vous êtes un assistant IA aidant à remplir des formulaires de candidature.",
    systemPromptRules: `Vous devez fournir des réponses COURTES et CONCISES adaptées aux champs de formulaire (généralement 1-3 phrases max).
N'utilisez PAS de formatage markdown. Juste du texte brut.`,
    systemPromptProfile: "PROFIL DU CANDIDAT:",
    systemPromptPreviousAnswers: "RÉPONSES PRÉCÉDENTES (utiliser pour la cohérence):",
    systemPromptRulesList: `RÈGLES:
1. Soyez concis - les champs de formulaire ont des limites de caractères
2. Soyez professionnel et confiant
3. Adaptez le ton à la question
4. Si on vous demande les années d'expérience avec une technologie spécifique, donnez un nombre réaliste basé sur l'expérience totale
5. Si vous n'avez pas assez d'informations, faites des suppositions raisonnables basées sur le profil
6. Ne dites JAMAIS "Je ne sais pas" - fournissez toujours une réponse utile`,
    userPromptQuestion: "Question de candidature:",
    userPromptFieldType: "Type de champ:",
    userPromptMaxLength: "Longueur maximale:",
    userPromptInstruction: "Fournissez une réponse directe adaptée à ce champ de formulaire:",
  },

  // ============================================
  // LOG MESSAGES (for console)
  // ============================================
  logs: {
    botStarted: "Bot démarré par l'UTILISATEUR",
    botStopped: "Bot arrêté par l'utilisateur",
    securityFlagsSet: "Drapeaux de sécurité définis: isRunning=true, userExplicitlyClickedStart=true",
    securityFlagsCleared: "Drapeaux de sécurité effacés: isRunning=false, userExplicitlyClickedStart=false",
    dailyLimitReached: "LIMITE QUOTIDIENNE ATTEINTE !",
    dailyLimitMessage: "LinkedIn limite les candidatures simplifiées à ~50-100 par jour",
    canContinueTomorrow: "Vous pouvez continuer à postuler demain !",
    botStoppedAuto: "Bot arrêté automatiquement",
    noEasyApply: "Pas de candidature simplifiée, on passe",
    jobsFound: "emplois trouvés",
    noJobsFound: "Aucun emploi trouvé. Attente de 5s...",
    pageSearch: "Type de page: RECHERCHE (mode pagination)",
    pageCollections: "Type de page: COLLECTIONS (mode défilement infini)",
    aiEnabled: "IA activée avec",
    aiDisabled: "IA désactivée",
    aiNoApiKey: "IA activée mais aucune clé API configurée",
    cachedAnswersCount: "réponses en cache",
    resumeLoaded: "CV chargé:",
    noResume: "Aucun CV téléchargé - les champs de téléchargement de fichiers seront ignorés",
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FR;
}
