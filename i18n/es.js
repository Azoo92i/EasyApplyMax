// Spanish translations
const ES = {
  // ============================================
  // POPUP UI TRANSLATIONS
  // ============================================
  ui: {
    // Header
    appName: "EasyApplyMax",
    beta: "BETA",

    // Status Card
    status: "Estado",
    statusRunning: "Ejecutando",
    statusStopped: "Detenido",
    applied: "Aplicados",
    skipped: "Omitidos",

    // Tabs
    tabPersonalInfo: "Datos Personales",
    tabSettings: "Configuración",
    tabAppliedJobs: "Empleos Aplicados",

    // Personal Info Tab
    firstName: "Nombre",
    firstNamePlaceholder: "Juan",
    lastName: "Apellido",
    lastNamePlaceholder: "García",
    email: "Correo Electrónico",
    emailPlaceholder: "juan.garcia@ejemplo.com",
    countryCode: "Código de País",
    phoneNumber: "Teléfono",
    phonePlaceholder: "612345678",
    phoneHint: "Sin código de país ni cero inicial",
    city: "Ciudad",
    cityPlaceholder: "Madrid, España",
    currentCompany: "Empresa Actual",
    currentCompanyPlaceholder: "Google, Microsoft, etc.",
    currentCompanyHint: "Tu empresa actual o más reciente",
    linkedinUrl: "URL del Perfil de LinkedIn",
    linkedinUrlPlaceholder: "https://linkedin.com/in/tuperfil",
    linkedinUrlHint: "URL de tu perfil de LinkedIn",
    portfolioUrl: "URL del Portafolio",
    portfolioUrlPlaceholder: "https://tuportafolio.com",
    portfolioUrlHint: "URL de tu portafolio o sitio web personal",
    yearsOfExperience: "Años de Experiencia",
    yearsOfExperienceHint: "Respuesta predeterminada para preguntas \"¿Cuántos años de experiencia...\"",
    resumeUpload: "Subir Currículum / CV",
    chooseFile: "Elegir Archivo",
    noFileChosen: "Ningún archivo seleccionado",
    resumeHint: "Sube tu currículum (PDF/DOC/DOCX). Se usará en las solicitudes de LinkedIn que requieran CV.",

    // Settings Tab
    blacklistKeywords: "Palabras Clave Bloqueadas",
    blacklistPlaceholder: "prácticas, junior, becario",
    blacklistHint: "Separadas por comas. Los empleos que contengan estas palabras serán omitidos",
    maxYearsRequired: "Máximo de Años de Experiencia Requeridos",
    maxYearsHint: "Omitir empleos que requieran más años (ej: \"8+ años\" será omitido si el máximo es 3)",
    expectedSalary: "Salario Esperado",
    expectedSalaryPlaceholder: "40000",
    expectedSalaryHint: "Tu salario anual esperado (usado en preguntas sobre remuneración)",

    // Common Questions Section
    commonQuestions: "Preguntas Comunes de Solicitud",
    visaSponsorship: "¿Necesita Patrocinio de Visa?",
    visaSponsorshipHint: "Respuesta para preguntas \"¿Necesita patrocinio de visa?\"",
    legallyAuthorized: "¿Autorizado Legalmente para Trabajar?",
    legallyAuthorizedHint: "Respuesta para preguntas sobre autorización de trabajo",
    willingToRelocate: "¿Dispuesto a Reubicarse?",
    willingToRelocateHint: "Respuesta para preguntas sobre reubicación",
    driversLicense: "¿Tiene Licencia de Conducir?",
    driversLicenseHint: "Respuesta para preguntas sobre licencia de conducir",
    disabilityStatus: "¿Persona con Discapacidad?",
    disabilityStatusHint: "Respuesta para preguntas sobre discapacidad",
    ethnicity: "Raza/Etnia",
    ethnicityHint: "Respuesta para preguntas sobre raza/etnia",
    preferNotToSay: "Prefiero no decir",
    ethnicityWhite: "Blanco/a",
    ethnicityBlack: "Negro/a",
    ethnicityHispanic: "Hispano/Latino",
    ethnicityAsian: "Asiático/a",
    ethnicityIndigenous: "Indígena",
    ethnicityMixed: "Mestizo/Multirracial",
    ethnicityOther: "Otro",
    englishLevel: "Nivel de Inglés",
    englishLevelHint: "Respuesta para preguntas sobre dominio del inglés",
    englishNative: "Nativo/Bilingüe",
    englishFluent: "Fluido",
    englishAdvanced: "Avanzado",
    englishIntermediate: "Intermedio",
    englishBasic: "Básico",
    englishNone: "Ninguno",
    yes: "Sí",
    no: "No",

    // AI Section
    aiSection: "Respuestas con IA (Groq)",
    groqApiKey: "Clave de API Groq",
    groqApiKeyPlaceholder: "gsk_...",
    groqApiKeyHint: "Obtén tu clave gratuita en",
    enableAI: "Activar IA para preguntas desconocidas",
    professionalSummary: "Tu Resumen Profesional",
    professionalSummaryPlaceholder: "Ej: Soy Desarrollador Full Stack con 5 años de experiencia en React, Node.js y Python. He trabajado en startups y grandes empresas...",
    professionalSummaryHint: "La IA usará esto para responder preguntas sobre tu experiencia",
    skills: "Tus Habilidades",
    skillsPlaceholder: "React, Node.js, Python, AWS, Docker, PostgreSQL...",
    skillsHint: "Lista de habilidades técnicas separadas por comas",
    cachedAnswers: "respuestas en caché",
    clearCache: "Limpiar Caché",

    // Toggle
    autoNextPage: "Página siguiente automática",

    // Applied Jobs Tab
    appliedJobs: "Empleos Aplicados",
    clearAll: "Limpiar Todo",
    noApplicationsYet: "Ninguna solicitud aún",
    noApplicationsHint: "Comienza a aplicar para ver tus solicitudes de empleo aquí",
    viewOnLinkedIn: "Ver en LinkedIn",

    // Action Buttons
    start: "Iniciar",
    stop: "Detener",
    exportCSV: "Exportar Empleos (CSV)",
    resetCounters: "Reiniciar Contadores",

    // Feedback Section
    feedbackTitle: "¡Apoya Esta Herramienta Gratuita!",
    feedbackDescription: "EasyApplyMax es 100% gratuito, creado para ayudar a quienes buscan empleo. Somos un proyecto pequeño y ¡todo apoyo ayuda!",
    feedbackReview: "Deja una reseña de 5 estrellas en Chrome Web Store",
    feedbackShare: "Comparte con amigos que buscan empleo",
    feedbackDiscord: "Únete a Discord para reportar bugs y sugerir features",
    leaveReview: "Dejar Reseña",
    joinDiscord: "Unirse a Discord",

    // Instructions
    howToUse: "Cómo usar",
    instruction1: "Ve a LinkedIn y activa el filtro",
    instruction1Bold: "Solicitud Sencilla",
    instruction2: "Completa tu información personal arriba",
    instruction3: "Haz clic en",
    instruction3Bold: "Guardar Config",
    instruction4: "Haz clic en",
    instruction4Bold: "Iniciar",
    instruction4End: "para comenzar a aplicar automáticamente",
    instruction5: "Abre la Consola del Navegador (F12) para ver logs detallados",

    // Footer
    footer: "Proyecto de la comunidad",

    // Messages
    saved: "Guardado",
    saving: "Guardando...",
    exported: "Exportado",
    reset: "¡Reiniciado!",
    aiCacheCleared: "Caché de respuestas de IA limpiado",

    // Errors & Warnings
    errorLinkedInPage: "¡Por favor, abre primero una página de empleos de LinkedIn! (linkedin.com/jobs/...)",
    errorJobsPage: "¡Por favor, navega a la página de Empleos de LinkedIn! (linkedin.com/jobs/search/ o /jobs/collections/)",
    errorFixFields: "Por favor, corrige los errores en tu información personal antes de iniciar",
    errorStartBot: "Error al iniciar el bot. Por favor, recarga la página de LinkedIn (F5) e intenta de nuevo.",
    errorFileTooLarge: "¡Archivo muy grande! Por favor, sube un archivo menor a 5MB.",
    errorInvalidFileType: "¡Tipo de archivo inválido! Por favor, sube solo archivos PDF, DOC o DOCX.",
    noJobsApplied: "Ningún empleo aplicado aún. ¡Inicia el bot primero!",
    confirmReset: "¿Reiniciar todos los contadores y limpiar la lista de empleos aplicados?",
    confirmClearJobs: "¿Limpiar todos los empleos aplicados de la lista? Esto no se puede deshacer.",
    confirmClearCache: "¿Limpiar todas las respuestas de IA en caché? Esto no se puede deshacer.",
    confirmRemoveResume: "¿Eliminar currículum subido?",

    // Language
    language: "Idioma",
  },

  // ============================================
  // LINKEDIN FIELD DETECTION PATTERNS
  // Used by content-simple.js to detect form fields
  // ============================================
  patterns: {
    // Field type detection (regex patterns) - Spanish additions
    yearsExperience: /experiencia|años|cuántos años|tiempo de experiencia|años de experiencia/i,
    salary: /salario|remuneración|sueldo|compensación|retribución|pretensión salarial/i,
    email: /email|e-mail|correo electrónico|correo/i,
    firstName: /nombre|primer\s*nombre/i,
    lastName: /apellido|apellidos|segundo\s*nombre/i,
    phone: /teléfono|celular|móvil|contacto|número de teléfono/i,
    city: /ciudad|ubicación|localización|dónde.*vive|localidad|municipio/i,

    // Question detection for radio buttons
    visaSponsorship: /visa|patrocinio|sponsor|inmigración|permiso de trabajo/i,
    workAuthorization: /autorizado|legalmente.*trabajar|permiso.*trabajo|elegible.*trabajar|derecho.*trabajar/i,
    relocation: /reubicación|mudarse|cambio.*ciudad|dispuesto.*mudarse|abierto.*reubicación/i,
    securityClearance: /acreditación.*seguridad|seguridad|confidencial|habilitación/i,
    driversLicense: /licencia.*conducir|carnet.*conducir|permiso.*conducir|carné/i,
    languageProficiency: /dominio|nivel.*inglés|fluidez|nivel.*idioma|competencia/i,

    // Yes/No answer patterns
    yesAnswers: /^(sí|si|s|yes|y)$/i,
    noAnswers: /^(no|n)$/i,

    // Language proficiency levels
    native: /nativo|bilingüe|lengua materna|fluido nativo/i,
    fluent: /fluido|fluidez completa|avanzado fluido/i,
    professional: /profesional|avanzado|competente|experto/i,
    intermediate: /intermedio|conversacional|básico avanzado/i,

    // Done/Submit button text patterns
    doneButtons: ['Listo', 'Enviar solicitud', 'Enviar', 'Cerrar', 'Descartar', 'Continuar', 'Done', 'Submit'],

    // Discard/Cancel button text patterns
    discardButtons: ['descartar', 'cancelar', 'cerrar', 'anular', 'discard', 'cancel'],
  },

  // ============================================
  // AI SYSTEM PROMPT (for Groq API) - Spanish
  // ============================================
  ai: {
    systemPromptIntro: "Eres un asistente de IA ayudando a completar formularios de solicitud de empleo.",
    systemPromptRules: `Debes proporcionar respuestas CORTAS y CONCISAS adecuadas para campos de formulario (generalmente 1-3 oraciones como máximo).
NO uses formato markdown. Solo texto plano.`,
    systemPromptProfile: "PERFIL DEL CANDIDATO:",
    systemPromptPreviousAnswers: "RESPUESTAS ANTERIORES (usa para consistencia):",
    systemPromptRulesList: `REGLAS:
1. Sé conciso - los campos de formulario tienen límites de caracteres
2. Sé profesional y seguro
3. Adapta el tono a la pregunta
4. Si preguntan sobre años de experiencia con tecnología específica, da un número realista basado en la experiencia total
5. Si no tienes suficiente información, haz suposiciones razonables basadas en el perfil
6. NUNCA digas "No sé" - siempre proporciona una respuesta útil`,
    userPromptQuestion: "Pregunta de la Solicitud:",
    userPromptFieldType: "Tipo de Campo:",
    userPromptMaxLength: "Longitud Máxima:",
    userPromptInstruction: "Proporciona una respuesta directa adecuada para este campo de formulario:",
  },

  // ============================================
  // LOG MESSAGES (for console)
  // ============================================
  logs: {
    botStarted: "Bot iniciado por el USUARIO",
    botStopped: "Bot detenido por el usuario",
    securityFlagsSet: "Flags de seguridad establecidas: isRunning=true, userExplicitlyClickedStart=true",
    securityFlagsCleared: "Flags de seguridad limpiadas: isRunning=false, userExplicitlyClickedStart=false",
    dailyLimitReached: "¡LÍMITE DIARIO ALCANZADO!",
    dailyLimitMessage: "LinkedIn limita Solicitud Sencilla a ~50-100 por día",
    canContinueTomorrow: "¡Puedes continuar aplicando mañana!",
    botStoppedAuto: "Bot detenido automáticamente",
    noEasyApply: "No es Solicitud Sencilla, omitiendo",
    jobsFound: "empleos encontrados",
    noJobsFound: "No se encontraron empleos. Esperando 5s...",
    pageSearch: "Tipo de página: BÚSQUEDA (modo paginación)",
    pageCollections: "Tipo de página: COLECCIONES (modo scroll infinito)",
    aiEnabled: "IA habilitada con",
    aiDisabled: "IA deshabilitada",
    aiNoApiKey: "IA habilitada pero sin clave de API configurada",
    cachedAnswersCount: "respuestas en caché",
    resumeLoaded: "Currículum cargado:",
    noResume: "Ningún currículum subido - los campos de subida de archivo serán omitidos",
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ES;
}
