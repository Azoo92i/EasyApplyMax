// ============================================
// COMBINED MULTILINGUAL PATTERNS
// Used by content-simple.js for field detection
// ============================================

// Combined patterns for all supported languages (EN, PT-BR, ES)
// These are used to detect form fields regardless of LinkedIn's UI language

const MULTILINGUAL_PATTERNS = {
  // ============================================
  // FIELD TYPE DETECTION (for text inputs)
  // ============================================

  // Years of experience field
  yearsExperience: /experience|years|how many years|total years|expérience|années|experiência|anos|quantos anos|tiempo de experiencia|años de experiencia|cuántos años|jahre|anni|esperienza/i,

  // Salary/Compensation field
  salary: /salary|compensation|remuneration|pay|wage|expected salary|salaire|rémunération|salário|remuneração|pretensão salarial|sueldo|compensación|retribución|gehalt|stipendio/i,

  // Email field
  email: /email|e-mail|courriel|correo electrónico|correio eletrônico/i,

  // First name field
  firstName: /first\s*name|given\s*name|prénom|prenom|primeiro\s*nome|nombre|primer\s*nombre|vorname|nome/i,

  // Last name field
  lastName: /last\s*name|surname|family\s*name|nom de famille|sobrenome|último\s*nome|apellido|apellidos|nachname|cognome/i,

  // Phone field
  phone: /phone|telephone|mobile|cell|contact number|téléphone|telefono|telefon|portable|móvil|cellulare|celular|whatsapp|número de teléfono/i,

  // City/Location field
  city: /city|location|where.*located|current location|ville|localisation|ciudad|ubicación|localización|cidade|localização|localidade|município|stadt|città|dónde.*vive|onde.*mora/i,

  // ============================================
  // QUESTION DETECTION (for radio buttons)
  // ============================================

  // Visa/Sponsorship questions
  visaSponsorship: /visa|sponsor|sponsorship|work visa|immigration|patrocínio|visto|imigração|permissão de trabalho|permiso de trabajo|inmigración/i,

  // Work authorization questions
  workAuthorization: /authorized|legally.*work|permit.*work|eligible.*work|right.*work|employment eligibility|autorizado|legalmente.*trabalhar|permissão.*trabalho|elegível.*trabalhar|direito.*trabalhar|legalmente.*trabajar|permiso.*trabajo|elegible.*trabajar|derecho.*trabajar/i,

  // Relocation questions
  relocation: /relocat|move.*location|willing.*move|open.*relocation|realocação|mudar.*cidade|mudança|disposto.*mudar|aberto.*realocação|reubicación|mudarse|cambio.*ciudad|dispuesto.*mudarse|abierto.*reubicación/i,

  // Security clearance questions
  securityClearance: /security.*clearance|clearance|secret|top secret|credenciamento.*segurança|confidencial|acreditación.*seguridad|habilitación/i,

  // Driver's license questions
  driversLicense: /driver.*license|driving.*license|valid.*license|driver's license|carteira.*motorista|cnh|habilitação|carta de condução|licencia.*conducir|carnet.*conducir|permiso.*conducir|carné|führerschein|patente di guida/i,

  // Language proficiency questions
  languageProficiency: /proficiency|level.*english|fluency|language.*level|proficiência|nível.*inglês|fluência|nível.*idioma|domínio|dominio|nivel.*inglés|fluidez|niveau.*anglais|niveau.*français/i,

  // ============================================
  // YES/NO ANSWER PATTERNS
  // ============================================

  yesAnswers: /^(yes|y|sim|s|sí|si|oui|ja)$/i,
  noAnswers: /^(no|n|não|nao|non|nein)$/i,

  // ============================================
  // LANGUAGE PROFICIENCY LEVELS
  // ============================================

  native: /native|bilingual|mother tongue|nativo|bilingue|bilíngue|língua materna|fluente nativo|bilingüe|lengua materna|fluido nativo|langue maternelle/i,
  fluent: /fluent|full professional|fluente|proficiência completa|avançado fluente|fluido|fluidez completa|courant|fluide/i,
  professional: /professional|advanced|proficient|profissional|avançado|proficiente|competente|profesional|experto|professionnel/i,
  intermediate: /intermediate|conversational|working|intermediário|conversacional|básico avançado|intermedio|basique/i,

  // ============================================
  // BUTTON TEXT PATTERNS
  // ============================================

  // Done/Submit button text (exact matches preferred)
  doneButtons: [
    // English
    'Done', 'Submit application', 'Submit', 'Dismiss', 'Close', 'Continue',
    // Portuguese
    'Concluído', 'Enviar candidatura', 'Enviar', 'Fechar', 'Dispensar', 'Continuar',
    // Spanish
    'Listo', 'Enviar solicitud', 'Enviar', 'Cerrar', 'Descartar', 'Continuar',
    // French
    'Terminé', 'Soumettre la candidature', 'Soumettre', 'Fermer',
    // German
    'Fertig', 'Bewerbung absenden', 'Absenden', 'Schließen',
    // Italian
    'Fatto', 'Invia candidatura', 'Invia', 'Chiudi'
  ],

  // Discard/Cancel button text
  discardButtons: [
    // English
    'discard', 'cancel', 'close', 'dismiss',
    // Portuguese
    'descartar', 'cancelar', 'fechar', 'dispensar',
    // Spanish
    'descartar', 'cancelar', 'cerrar', 'anular',
    // French
    'annuler', 'abandonner', 'fermer',
    // German
    'verwerfen', 'abbrechen', 'schließen',
    // Italian
    'scartare', 'annullare', 'chiudere'
  ],

  // Next/Review button text
  nextButtons: [
    // English
    'next', 'review', 'continue',
    // Portuguese
    'próximo', 'avançar', 'continuar', 'revisar',
    // Spanish
    'siguiente', 'revisar', 'continuar',
    // French
    'suivant', 'réviser', 'continuer',
    // German
    'weiter', 'überprüfen', 'fortsetzen',
    // Italian
    'avanti', 'rivedi', 'continua'
  ],

  // Submit button text
  submitButtons: [
    // English
    'submit', 'send', 'apply',
    // Portuguese
    'enviar', 'candidatar',
    // Spanish
    'enviar', 'aplicar', 'postular',
    // French
    'soumettre', 'envoyer', 'postuler',
    // German
    'absenden', 'bewerben',
    // Italian
    'invia', 'candidati'
  ],

  // Easy Apply button detection (aria-label patterns)
  easyApplyPatterns: [
    // English
    'Easy Apply',
    // Portuguese
    'Candidatura simplificada',
    'Candidatura Simplificada',
    // Spanish
    'Solicitud sencilla',
    'Solicitud Sencilla',
    // French
    'Candidature simplifiée',
    'Candidature Simplifiée',
    // German
    'Einfach bewerben',
    // Italian
    'Candidatura semplice'
  ],

  // ============================================
  // DAILY LIMIT DETECTION PATTERNS
  // ============================================

  dailyLimitPatterns: [
    // English
    "You've reached today's Easy Apply limit",
    "reached today's Easy Apply limit",
    "Great effort applying today",
    "we limit daily submissions",
    "continue applying tomorrow",
    "Save this job and continue applying tomorrow",
    "exceeded the daily application limit",
    "daily Easy Apply limit",
    "limit daily submissions",
    // Portuguese
    "Você atingiu o limite de Candidatura Simplificada de hoje",
    "limite diário de candidaturas",
    "Limitamos o número de envios diários para manter a qualidade e prevenir bots, ajudando cada candidatura a receber a atenção certa.",
    "continue se candidatando amanhã",
    "Bom trabalho se candidatando hoje",
    "limite de candidaturas diárias",
    // Spanish
    "Has alcanzado el límite de Solicitud Sencilla de hoy",
    "Limitamos el número de envíos diarios para mantener la calidad y prevenir bots, ayudando a que cada solicitud reciba la atención adecuada.",
    "límite diario de solicitudes",
    "continúa aplicando mañana",
    "Gran esfuerzo aplicando hoy",
    // French
    "Vous avez atteint la limite de Candidature Simplifiée",
    "Nous limitons le nombre de candidatures quotidiennes pour maintenir la qualité et prévenir les bots, aidant chaque candidature à recevoir l'attention appropriée.",
    "limite quotidienne de candidatures",
    // German
    "Tägliches Bewerbungslimit erreicht",
    "Wir begrenzen die Anzahl der täglichen Einsendungen, um die Qualität zu erhalten und Bots zu verhindern, damit jede Bewerbung die richtige Aufmerksamkeit erhält.",
    "tägliches Limit für Bewerbungen",
  ]
};

// Export for use in content script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MULTILINGUAL_PATTERNS;
}
