// Portuguese (Brazil) translations
const PT_BR = {
  // ============================================
  // POPUP UI TRANSLATIONS
  // ============================================
  ui: {
    // Header
    appName: "EasyApplyMax",
    beta: "BETA",

    // Status Card
    status: "Status",
    statusRunning: "Executando",
    statusStopped: "Parado",
    applied: "Aplicados",
    skipped: "Ignorados",

    // Tabs
    tabPersonalInfo: "Dados pessoais",
    tabSettings: "Configurações",
    tabAppliedJobs: "Vagas aplicadas",

    // Personal Info Tab
    firstName: "Nome",
    firstNamePlaceholder: "João",
    lastName: "Sobrenome",
    lastNamePlaceholder: "Silva",
    email: "E-mail",
    emailPlaceholder: "joao.silva@exemplo.com",
    countryCode: "Código do país",
    phoneNumber: "Telefone",
    phonePlaceholder: "11999999999",
    phoneHint: "Sem código do país ou zero inicial",
    city: "Cidade",
    cityPlaceholder: "São Paulo, SP",
    currentCompany: "Empresa Atual",
    currentCompanyPlaceholder: "Google, Microsoft, etc.",
    currentCompanyHint: "Sua empresa atual ou mais recente",
    linkedinUrl: "URL do Perfil LinkedIn",
    linkedinUrlPlaceholder: "https://linkedin.com/in/seuperfil",
    linkedinUrlHint: "URL do seu perfil no LinkedIn",
    portfolioUrl: "URL do Portfólio",
    portfolioUrlPlaceholder: "https://seuportfolio.com",
    portfolioUrlHint: "URL do seu portfólio ou site pessoal",
    yearsOfExperience: "Anos de experiência",
    yearsOfExperienceHint: "Resposta padrão para perguntas \"Quantos anos de experiência...\"",
    resumeUpload: "Upload de Currículo",
    chooseFile: "Escolher Arquivo",
    noFileChosen: "Nenhum arquivo selecionado",
    resumeHint: "Faça upload do seu currículo (PDF/DOC/DOCX). Será usado nas candidaturas do LinkedIn que exigem CV.",

    // Settings Tab
    blacklistKeywords: "Palavras-chave bloqueadas",
    blacklistPlaceholder: "estágio, júnior, trainee",
    blacklistHint: "Separadas por vírgula. Vagas contendo essas palavras serão ignoradas",
    maxYearsRequired: "Máximo de anos de experiência exigidos",
    maxYearsHint: "Ignorar vagas que exigem mais anos (ex: \"8+ anos\" será ignorada se o máximo for 3)",
    expectedSalary: "Salário esperado",
    expectedSalaryPlaceholder: "80000",
    expectedSalaryHint: "Seu salário anual esperado (usado em perguntas sobre remuneração)",

    // Common Questions Section
    commonQuestions: "Perguntas comuns de candidatura",
    visaSponsorship: "Precisa de visto de trabalho?",
    visaSponsorshipHint: "Resposta para perguntas \"Você precisa de patrocínio de visto?\"",
    legallyAuthorized: "Autorizado legalmente a trabalhar?",
    legallyAuthorizedHint: "Resposta para perguntas sobre autorização de trabalho",
    willingToRelocate: "Disposto a se mudar?",
    willingToRelocateHint: "Resposta para perguntas sobre realocação",
    driversLicense: "Possui carteira de motorista?",
    driversLicenseHint: "Resposta para perguntas sobre CNH",
    disabilityStatus: "Pessoa com deficiência (PCD)?",
    disabilityStatusHint: "Resposta para perguntas sobre deficiência/PCD",
    ethnicity: "Cor/Raça",
    ethnicityHint: "Resposta para perguntas sobre cor/raça",
    preferNotToSay: "Prefiro não informar",
    ethnicityWhite: "Branco(a)",
    ethnicityBlack: "Preto(a)/Negro(a)",
    ethnicityHispanic: "Hispânico/Latino",
    ethnicityAsian: "Asiático(a)/Amarelo(a)",
    ethnicityIndigenous: "Indígena",
    ethnicityMixed: "Pardo(a)/Multirracial",
    ethnicityOther: "Outro",
    englishLevel: "Nível de inglês",
    englishLevelHint: "Resposta para perguntas sobre proficiência em inglês",
    englishNative: "Nativo/Bilíngue",
    englishFluent: "Fluente",
    englishAdvanced: "Avançado",
    englishIntermediate: "Intermediário",
    englishBasic: "Básico",
    englishNone: "Nenhum",
    yes: "Sim",
    no: "Não",

    // AI Section
    aiSection: "Respostas com IA (Groq)",
    groqApiKey: "Chave da API Groq",
    groqApiKeyPlaceholder: "gsk_...",
    groqApiKeyHint: "Obtenha sua chave gratuita em",
    enableAI: "Ativar IA para perguntas desconhecidas",
    professionalSummary: "Seu resumo profissional",
    professionalSummaryPlaceholder: "Ex: Sou Desenvolvedor Full Stack com 5 anos de experiência em React, Node.js e Python. Trabalhei em startups e grandes empresas...",
    professionalSummaryHint: "A IA usará isso para responder perguntas sobre sua experiência",
    skills: "Suas habilidades",
    skillsPlaceholder: "React, Node.js, Python, AWS, Docker, PostgreSQL...",
    skillsHint: "Lista de habilidades técnicas separadas por vírgula",
    cachedAnswers: "respostas em cache",
    clearCache: "Limpar cache",

    // Toggle
    autoNextPage: "Próxima página automática",

    // Applied Jobs Tab
    appliedJobs: "Vagas aplicadas",
    clearAll: "Limpar tudo",
    noApplicationsYet: "Nenhuma candidatura ainda",
    noApplicationsHint: "Comece a se candidatar para ver suas vagas aqui",
    viewOnLinkedIn: "Ver no LinkedIn",

    // Action Buttons
    start: "Iniciar",
    stop: "Parar",
    exportCSV: "Exportar vagas (CSV)",
    resetCounters: "Resetar contadores",

    // Feedback Section
    feedbackTitle: "Apoie esta ferramenta gratuita!",
    feedbackDescription: "EasyApplyMax é 100% gratuito, feito para ajudar quem busca emprego. Somos um projeto pequeno e todo apoio ajuda!",
    feedbackReview: "Deixe uma avaliação 5 estrelas na Chrome Web Store",
    feedbackShare: "Compartilhe com amigos que buscam emprego",
    feedbackDiscord: "Entre no Discord para reportar bugs e sugerir features",
    leaveReview: "Avaliar",
    joinDiscord: "Entrar no Discord",

    // Instructions
    howToUse: "Como usar",
    instruction1: "Vá ao LinkedIn e ative o filtro",
    instruction1Bold: "Candidatura simplificada",
    instruction2: "Preencha suas informações pessoais acima",
    instruction3: "Clique em",
    instruction3Bold: "Salvar config",
    instruction4: "Clique em",
    instruction4Bold: "Iniciar",
    instruction4End: "para começar a se candidatar automaticamente",
    instruction5: "Abra o console do navegador (F12) para ver logs detalhados",

    // Footer
    footer: "Projeto da comunidade",

    // Messages
    saved: "Salvo",
    saving: "Salvando...",
    exported: "Exportado",
    reset: "Resetado!",
    aiCacheCleared: "Cache de respostas da IA limpo",

    // Errors & Warnings
    errorLinkedInPage: "Por favor, abra uma página de vagas do LinkedIn primeiro! (linkedin.com/jobs/...)",
    errorJobsPage: "Por favor, navegue até a página de Vagas do LinkedIn! (linkedin.com/jobs/search/ ou /jobs/collections/)",
    errorFixFields: "Por favor, corrija os erros nas suas informações pessoais antes de iniciar",
    errorStartBot: "Erro ao iniciar o bot. Por favor, recarregue a página do LinkedIn (F5) e tente novamente.",
    errorFileTooLarge: "Arquivo muito grande! Por favor, faça upload de um arquivo menor que 5MB.",
    errorInvalidFileType: "Tipo de arquivo inválido! Por favor, faça upload apenas de arquivos PDF, DOC ou DOCX.",
    noJobsApplied: "Nenhuma vaga aplicada ainda. Inicie o bot primeiro!",
    confirmReset: "Resetar todos os contadores e limpar a lista de vagas aplicadas?",
    confirmClearJobs: "Limpar todas as vagas aplicadas da lista? Isso não pode ser desfeito.",
    confirmClearCache: "Limpar todas as respostas da IA em cache? Isso não pode ser desfeito.",
    confirmRemoveResume: "Remover currículo enviado?",

    // Language
    language: "Idioma",
  },

  // ============================================
  // LINKEDIN FIELD DETECTION PATTERNS
  // Used by content-simple.js to detect form fields
  // ============================================
  patterns: {
    // Field type detection (regex patterns) - Portuguese additions
    yearsExperience: /experiência|anos|quantos anos|tempo de experiência|anos de experiência/i,
    salary: /salário|remuneração|pretensão salarial|valor|pagamento|compensação/i,
    email: /email|e-mail|correio eletrônico/i,
    firstName: /primeiro\s*nome|nome/i,
    lastName: /sobrenome|último\s*nome|nome de família/i,
    phone: /telefone|celular|móvel|contato|whatsapp/i,
    city: /cidade|localização|onde.*mora|localidade|município/i,

    // Question detection for radio buttons
    visaSponsorship: /visto|patrocínio|sponsor|imigração|permissão de trabalho/i,
    workAuthorization: /autorizado|legalmente.*trabalhar|permissão.*trabalho|elegível.*trabalhar|direito.*trabalhar/i,
    relocation: /realocação|mudar.*cidade|mudança|disposto.*mudar|aberto.*realocação/i,
    securityClearance: /credenciamento.*segurança|segurança|confidencial/i,
    driversLicense: /carteira.*motorista|cnh|habilitação|carta de condução/i,
    languageProficiency: /proficiência|nível.*inglês|fluência|nível.*idioma|domínio/i,

    // Yes/No answer patterns
    yesAnswers: /^(sim|s|yes|y)$/i,
    noAnswers: /^(não|nao|n|no)$/i,

    // Language proficiency levels
    native: /nativo|bilíngue|língua materna|fluente nativo/i,
    fluent: /fluente|proficiência completa|avançado fluente/i,
    professional: /profissional|avançado|proficiente|competente/i,
    intermediate: /intermediário|conversacional|básico avançado/i,

    // Done/Submit button text patterns
    doneButtons: ['Concluído', 'Enviar candidatura', 'Enviar', 'Fechar', 'Dispensar', 'Continuar', 'Done', 'Submit'],

    // Discard/Cancel button text patterns
    discardButtons: ['descartar', 'cancelar', 'fechar', 'dispensar', 'discard', 'cancel'],
  },

  // ============================================
  // AI SYSTEM PROMPT (for Groq API) - Portuguese
  // ============================================
  ai: {
    systemPromptIntro: "Você é um assistente de IA ajudando a preencher formulários de candidatura a vagas.",
    systemPromptRules: `Você deve fornecer respostas CURTAS e CONCISAS adequadas para campos de formulário (geralmente 1-3 frases no máximo).
NÃO use formatação markdown. Apenas texto simples.`,
    systemPromptProfile: "PERFIL DO CANDIDATO:",
    systemPromptPreviousAnswers: "RESPOSTAS ANTERIORES (use para consistência):",
    systemPromptRulesList: `REGRAS:
1. Seja conciso - campos de formulário têm limite de caracteres
2. Seja profissional e confiante
3. Combine o tom da pergunta
4. Se perguntarem sobre anos de experiência com tecnologia específica, dê um número realista baseado na experiência total
5. Se você não tiver informação suficiente, faça suposições razoáveis baseadas no perfil
6. NUNCA diga "Eu não sei" - sempre forneça uma resposta útil`,
    userPromptQuestion: "Pergunta da candidatura:",
    userPromptFieldType: "Tipo de campo:",
    userPromptMaxLength: "Tamanho máximo:",
    userPromptInstruction: "Forneça uma resposta direta adequada para este campo de formulário:",
  },

  // ============================================
  // LOG MESSAGES (for console)
  // ============================================
  logs: {
    botStarted: "Bot iniciado pelo USUÁRIO",
    botStopped: "Bot parado pelo usuário",
    securityFlagsSet: "Flags de segurança definidas: isRunning=true, userExplicitlyClickedStart=true",
    securityFlagsCleared: "Flags de segurança limpas: isRunning=false, userExplicitlyClickedStart=false",
    dailyLimitReached: "LIMITE DIÁRIO ATINGIDO!",
    dailyLimitMessage: "O LinkedIn limita Candidatura Simplificada a ~50-100 por dia",
    canContinueTomorrow: "Você pode continuar se candidatando amanhã!",
    botStoppedAuto: "Bot parado automaticamente",
    noEasyApply: "Não é candidatura simplificada, pulando",
    jobsFound: "vagas encontradas",
    noJobsFound: "Nenhuma vaga encontrada. Aguardando 5s...",
    pageSearch: "Tipo de página: BUSCA (modo paginação)",
    pageCollections: "Tipo de página: COLEÇÕES (modo scroll infinito)",
    aiEnabled: "IA habilitada com",
    aiDisabled: "IA desabilitada",
    aiNoApiKey: "IA habilitada mas sem chave de API configurada",
    cachedAnswersCount: "respostas em cache",
    resumeLoaded: "Currículo carregado:",
    noResume: "Nenhum currículo enviado - campos de upload de arquivo serão ignorados",
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PT_BR;
}
