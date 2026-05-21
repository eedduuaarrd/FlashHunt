export type Lang = "ca" | "en" | "es";

export interface TranslationSet {
  // Navigation & General
  hunting: string;
  challenges: string;
  team: string;
  ranking: string;
  mosaic: string;
  guide: string;
  logout: string;
  points: string;
  found: string;
  time: string;
  secondsRemaining: string;
  daysRemaining: string;
  hoursRemaining: string;
  success: string;
  error: string;
  confirm: string;
  back: string;
  close: string;
  cancel: string;
  optional: string;

  // Onboarding / Login
  loginTitle: string;
  loginSubtitle: string;
  loginDescTitle: string;
  loginDesc1: string;
  loginDesc2: string;
  loginDesc3: string;
  loginDesc4: string;
  loginLabelNickname: string;
  loginPlaceholderNickname: string;
  loginLabelCity: string;
  loginBtnStart: string;
  loginFooter: string;

  // Hunt List View
  huntTitle: string;
  huntSubtitle: string;
  huntTimeAlert: string;
  huntTimeDesc: string;
  huntButtonCapture: string;
  huntHintTitle: string;
  huntHintUnlock: string;
  huntHintNoPoints: string;
  huntHintConfirm: string;
  huntDetailsTitle: string;
  huntDetailsDifficulty: string;
  difficultyEasy: string;
  difficultyMedium: string;
  difficultyHard: string;
  pointsBadge: string;
  verifiedLabel: string;
  backToList: string;

  // Challenges View
  challengeTitle: string;
  challengeSubtitle: string;
  challengeTotalBadges: string;
  challengeClaimHeader: string;
  challengeClaimText: string;
  challengeDaily: string;
  challengeWeekly: string;
  challengeProgress: string;

  // Team View
  teamTitle: string;
  teamSubtitle: string;
  teamTabExplore: string;
  teamTabMyTeam: string;
  teamPrivate: string;
  teamMine: string;
  teamLeaderboardHeader: string;
  teamTargetLabel: string;
  teamActiveMembers: string;
  teamCreatedSuccess: string;
  teamJoinSuccess: string;
  teamLeaveConfirm: string;
  teamLeaveBtn: string;
  teamSimulationNotice: string;
  teamSimulationBtn: string;
  teamMembersHeader: string;
  teamGuideHeader: string;
  teamGuide1: string;
  teamGuide2: string;
  teamGuide3: string;
  teamCreateTitle: string;
  teamCreateNameLabel: string;
  teamCreateNamePlaceholder: string;
  teamCreatePassLabel: string;
  teamCreateTargetLabel: string;
  teamCreateBtn: string;
  teamTargetOption1: string;
  teamTargetOption2: string;
  teamTargetOption3: string;
  teamStatusMember: string;

  // Social View
  socialTitle: string;
  socialSubtitle: string;
  socialSearchPlaceholder: string;
  socialSearchClear: string;
  socialSearchResults: string;
  socialSearchEmpty: string;
  socialActionFriends: string;
  socialActionPending: string;
  socialActionAccept: string;
  socialActionAdd: string;
  socialActionCustomAdd: string;
  socialActionCustomPrompt: string;
  socialTabGlobal: string;
  socialTabLocal: string;
  socialTabFriends: string;
  socialTabFeed: string;
  socialEmptyFriends: string;
  socialEmptyFriendsDesc: string;
  socialFeedHeader: string;
  socialFeedLike: string;
  socialFeedLiked: string;
  socialFeedChallenge: string;
  socialFactHeader: string;
  socialFactBody: string;

  // Profile View
  profileTitle: string;
  profileSubtitle: string;
  profileWeeklyParticipation: string;
  profileRankLevel: string;
  profileStreakTitle: string;
  profileStreakDesc: string;
  profileMosaicTitle: string;
  profileMosaicFound: string;
  profileMosaicEmptyTitle: string;
  profileMosaicEmptyDesc: string;
  profileStatsCardTitle: string;
  profileStatsCardDesc: string;
  profileEditNickname: string;
  profileEditCity: string;
  profileSave: string;

  // Level & Ranks translated
  rank1: string;
  rank2: string;
  rank3: string;
  rank4: string;
  rank5: string;
  rank6: string;
}

export const TRANSLATIONS: Record<Lang, TranslationSet> = {
  ca: {
    hunting: "Caçar",
    challenges: "Reptes",
    team: "Equip",
    ranking: "Rànking",
    mosaic: "Mosaïc",
    guide: "Guia",
    logout: "Tancar Sessió",
    points: "Punts",
    found: "Trobats",
    time: "Temps",
    secondsRemaining: "segons restants",
    daysRemaining: "dies restants",
    hoursRemaining: "hores restants",
    success: "Èxit",
    error: "Error",
    confirm: "Confirmar",
    back: "Enrere",
    close: "Tancar",
    cancel: "Cancel·lar",
    optional: "OPCIONAL",

    loginTitle: "FlashHunt",
    loginSubtitle: "SERIES DE CACERA URBANA",
    loginDescTitle: "COM FUNCIONA?",
    loginDesc1: "Descobreix la llista dels 10 objectes de la setmana.",
    loginDesc2: "Surt al carrer i fes fotos reals dels objectes.",
    loginDesc3: "La intel·ligència artificial (Gemini) valida la foto al moment.",
    loginDesc4: "Suma punts i puja fins a dalt del rànking!",
    loginLabelNickname: "EL TEU NICKNAME / ÀLIES",
    loginPlaceholderNickname: "Ex. Andreu_Castells",
    loginLabelCity: "LA TEVA CIUTAT DE RESIDÈNCIA",
    loginBtnStart: "Comença a Jugar",
    loginFooter: "DISSENY BOLD TYPOGRAPHY • VERSIÓ MÒBIL & DESKTOP",

    huntTitle: "OBJECTES DE LA SETMANA",
    huntSubtitle: "Explora la teva ciutat per capturar aquests 10 elements vius. La IA analitzarà la teva foto al moment.",
    huntTimeAlert: "TEMPS LIMIT DE R0NDA ACTIU",
    huntTimeDesc: "Surt al carrer i captura per augmentar la ràtio. El rànking es tanca diumenge a la nit!",
    huntButtonCapture: "Fes foto per validar",
    huntHintTitle: "Pistes d'Ubicació i trucs",
    huntHintUnlock: "Desbloquejar",
    huntHintNoPoints: "No tens suficients punts per desbloquejar aquesta pista! Consegueix-ne caçant o amb reptes.",
    huntHintConfirm: "Vols gastar {cost} punts de la teva puntuació per desbloquejar aquesta pista d'ajuda?",
    huntDetailsTitle: "Detall d'Objectiu",
    huntDetailsDifficulty: "Dificultat",
    difficultyEasy: "Fàcil",
    difficultyMedium: "Mitjana",
    difficultyHard: "Difícil",
    pointsBadge: "PTS",
    verifiedLabel: "VERIFICAT✓",
    backToList: "Tornar a la Llista",

    challengeTitle: "REPTES DIARIS I SETMANALS",
    challengeSubtitle: "Completa els objectius de caça específics per guanyar insígnies exclusives i bónus de puntuació directe.",
    challengeTotalBadges: "INSÍGNIES TOTALS",
    challengeClaimHeader: "REPTE SUPERAT COMRADE! 🎉",
    challengeClaimText: "Has guanyat la insígnia {name} i +{pts} PTS addicionals reals!",
    challengeDaily: "DIARI",
    challengeWeekly: "SETMANAL",
    challengeProgress: "PROGRÉS DE CACERA",

    teamTitle: "MODO COOPERATIU: EN EQUIPS",
    teamSubtitle: "Uneix forces amb altres jugadors reals o amics de Catalunya per completar la llista setmanal. Els punts sumen col·lectivament!",
    teamTabExplore: "Explora Rànking d'equips",
    teamTabMyTeam: "El Meu Equip",
    teamPrivate: "Privat",
    teamMine: "El meu",
    teamLeaderboardHeader: "Líders de Rànking de Cooperació Col·lectiva",
    teamTargetLabel: "fita setmanal",
    teamActiveMembers: "Membres Actius",
    teamCreatedSuccess: "Ha creat l'equip de cooperatiu d'alt rendiment: {name}",
    teamJoinSuccess: "S'ha unit amb èxit a l'equip cooperatiu {name}!",
    teamLeaveConfirm: "Segur que vols abandonar el teu equip cooperatiu actual? El progrés de l'equip romandrà actiu.",
    teamLeaveBtn: "Abandonar Equip",
    teamSimulationNotice: "Vols simular recerques coop en segon pla dels teus companys per augmentar els punts?",
    teamSimulationBtn: "Simula troballa col·lectiva",
    teamMembersHeader: "Membres de la Esquadra",
    teamGuideHeader: "Directrius d'Equip Co-op",
    teamGuide1: "Qualsevol objecte que verifiquis des de la teva pestanya 'Caçar' sumarà immediatament de forma directa al fons col·lectiu!",
    teamGuide2: "Els punts són col·lectius: l'equip es guanya la victòria conjunta en assolir la fita de punts setmanals abans de diumenge!",
    teamGuide3: "Comparteix el nom de l'equip i la clau de pas amb altres jugadors per muntar una estratègia invencible.",
    teamCreateTitle: "Funda un Nou Equip",
    teamCreateNameLabel: "NOM DE L'EQUIP",
    teamCreateNamePlaceholder: "Ex. Senglars del Montseny",
    teamCreatePassLabel: "CLAU DE PAS DE SEGURETAT (OPCIONAL)",
    teamCreateTargetLabel: "FITA / TARGET SETMANAL DE PUNTS",
    teamCreateBtn: "Crear i unirte",
    teamTargetOption1: "300 Punts (Mètode Moderat)",
    teamTargetOption2: "500 Punts (Competició Estàndard)",
    teamTargetOption3: "1000 Punts (Mètode Elit Extrema)",
    teamStatusMember: "Membre",

    socialTitle: "COMUNITAT I RÀNKINGS",
    socialSubtitle: "Troba altres jugadors, envia sol·licituds d'amistat i consulta qui és el millor de debò de les teves zones.",
    socialSearchPlaceholder: "Cerca jugadors o afegeix-ne un escrivint el seu nom d'usuari...",
    socialSearchClear: "Netejar",
    socialSearchResults: "Resultats de la cerca",
    socialSearchEmpty: "No hem trobat cap caçador. Vols afegir un nou caçador fictici amb aquest nom per competir?",
    socialActionFriends: "Amics",
    socialActionPending: "Pendent",
    socialActionAccept: "Acceptar",
    socialActionAdd: "Afegir amic",
    socialActionCustomAdd: "Fundar Caçador",
    socialActionCustomPrompt: "Introdueix la ciutat del nou jugador per afegir-lo al rànking de competidors:",
    socialTabGlobal: "Global",
    socialTabLocal: "Local",
    socialTabFriends: "Amics",
    socialTabFeed: "Activitat en viu",
    socialEmptyFriends: "Sense amics seleccionats",
    socialEmptyFriendsDesc: "Encara no has afegit cap amic. Busca'ls dalt i prem 'Afegir' per veure'ls aquí.",
    socialFeedHeader: "Activitat en Viu",
    socialFeedLike: "M'agrada 👍",
    socialFeedLiked: "T'agrada ♥",
    socialFeedChallenge: "Reptar ⚔️",
    socialFactHeader: "SABIES QUE...?",
    socialFactBody: "Cada setmana s'actualitzen els rànkings i apareixen 10 objectes nous de debò. Completa'ls!",

    profileTitle: "EL TEU PERFIL DE CAÇADOR",
    profileSubtitle: "Consulta els teus èxits col·lectius, el teu rànquing d'experiència, l'estat de les teves ratxes de caça i personalitza les dades.",
    profileWeeklyParticipation: "Participació Setmanal",
    profileRankLevel: "LLIGA DE DETECTOR",
    profileStreakTitle: "RATXA CONSECUTIVA",
    profileStreakDesc: "Juga diàriament per mantenir la teva flama i guanyar punts extra en caceres i desafiaments!",
    profileMosaicTitle: "El Teu Mosaïc de Fotos",
    profileMosaicFound: "TROBATS",
    profileMosaicEmptyTitle: "Mosaïc buit",
    profileMosaicEmptyDesc: "Encara no has verificat cap foto d'objecte. Surt al carrer, busca'ls i fes servir la càmera de l'aplicació per començar!",
    profileStatsCardTitle: "Targeta de Competició",
    profileStatsCardDesc: "La victòria és per als caçadors que sumin els punts totals. El sistema utilitza visió artificial per donar la validesa real a cada imatge capturada.",
    profileEditNickname: "MODIFICAR NICKNAME / NOM D'USUARI",
    profileEditCity: "MODIFICAR CIUTAT DE RESIDÈNCIA",
    profileSave: "Guardar dades de perfil",

    rank1: "Caçador Novell",
    rank2: "Vigilant de Barri",
    rank3: "Rastrejador d'Asfalt",
    rank4: "Mestre Cercador",
    rank5: "Llegendari de l'Objectiu",
    rank6: "Deïtat de la Càmera",
  },
  en: {
    hunting: "Hunt",
    challenges: "Challenges",
    team: "Team",
    ranking: "Rankings",
    mosaic: "Mosaic",
    guide: "Guide",
    logout: "Log Out",
    points: "Points",
    found: "Found",
    time: "Time",
    secondsRemaining: "seconds remaining",
    daysRemaining: "days remaining",
    hoursRemaining: "hours remaining",
    success: "Success",
    error: "Error",
    confirm: "Confirm",
    back: "Back",
    close: "Close",
    cancel: "Cancel",
    optional: "OPTIONAL",

    loginTitle: "FlashHunt",
    loginSubtitle: "URBAN SCAVENGER SERIES",
    loginDescTitle: "HOW IT WORKS?",
    loginDesc1: "Discover the weekly list of 10 scavenger hunt items.",
    loginDesc2: "Go outside and take real pictures of those items.",
    loginDesc3: "Artificial Intelligence (Gemini) reviews and validates your photo instantly.",
    loginDesc4: "Earn points and climb to the top of the leaderboards!",
    loginLabelNickname: "YOUR NICKNAME / INTERACTIVE ALIAS",
    loginPlaceholderNickname: "e.g. Neo_Scout",
    loginLabelCity: "YOUR RESIDENCE CITY",
    loginBtnStart: "Start Scavenger Hunt",
    loginFooter: "BOLD TYPOGRAPHY DESIGN • MOBILE & DESKTOP COMPATIBLE",

    huntTitle: "OBJECTS OF THE WEEK",
    huntSubtitle: "Explore your town to find these 10 active items. The AI will validate your photo live.",
    huntTimeAlert: "ROUND TIMER RUNNING",
    huntTimeDesc: "Explore outside to increase your detection ratio. Rankings lock this Sunday at midnight!",
    huntButtonCapture: "Take Photo to Validate",
    huntHintTitle: "Location Hints & Pro Tips",
    huntHintUnlock: "Unlock Hint",
    huntHintNoPoints: "Not enough points to purchase this tip! Go find objects or complete challenges.",
    huntHintConfirm: "Do you want to spend {cost} points from your score to reveal this location hint?",
    huntDetailsTitle: "Object Targets",
    huntDetailsDifficulty: "Difficulty",
    difficultyEasy: "Easy",
    difficultyMedium: "Medium",
    difficultyHard: "Hard",
    pointsBadge: "PTS",
    verifiedLabel: "VERIFIED✓",
    backToList: "Back to List",

    challengeTitle: "DAILY & WEEKLY CHALLENGES",
    challengeSubtitle: "Achieve specific targeting goals to earn ultimate badges and direct bonus experience points.",
    challengeTotalBadges: "TOTAL BADGES",
    challengeClaimHeader: "CHALLENGE BEATEN COMRADE! 🎉",
    challengeClaimText: "You unlocked the badge {name} and gained +{pts} real bonus points!",
    challengeDaily: "DAILY",
    challengeWeekly: "WEEKLY",
    challengeProgress: "HUNTING PROGRESS",

    teamTitle: "CO-OP MODE: TEAMS",
    teamSubtitle: "Join forces with real players or friends in Catalonia to conquer the weekly list together. Scores combine collectively!",
    teamTabExplore: "Explore Teams Standings",
    teamTabMyTeam: "My Team",
    teamPrivate: "Private",
    teamMine: "Mine",
    teamLeaderboardHeader: "Cooperative Alliance Standings",
    teamTargetLabel: "weekly goal",
    teamActiveMembers: "Active Members",
    teamCreatedSuccess: "Successfully founded high-performance cooperative guild: {name}",
    teamJoinSuccess: "Successfully integrated to the cooperative squad {name}!",
    teamLeaveConfirm: "Are you sure you want to desert your current co-op squad? The squad's progress will remain active.",
    teamLeaveBtn: "Leave Squad",
    teamSimulationNotice: "Simulate off-screen co-op scans from your teammates to increase collective points?",
    teamSimulationBtn: "Simulate Team Find",
    teamMembersHeader: "Squad Members",
    teamGuideHeader: "Co-op Guidelines",
    teamGuide1: "Any object you capture on your own 'Hunt' tab is immediately added to the collective score pool!",
    teamGuide2: "Score is mutual: the team wins aggregate glory by hitting the weekly points target before Sunday!",
    teamGuide3: "Share your squad name and secret passcode with friends to draft an unbeatable visual strategy.",
    teamCreateTitle: "Found a New Squad",
    teamCreateNameLabel: "SQUAD NAME",
    teamCreateNamePlaceholder: "e.g. Pyrenees Explorers",
    teamCreatePassLabel: "SECURITY PASSCODE (OPTIONAL)",
    teamCreateTargetLabel: "WEEKLY POINTS TARGET GOAL",
    teamCreateBtn: "Create & Align",
    teamTargetOption1: "300 Points (Moderate Run)",
    teamTargetOption2: "500 Points (Standard League)",
    teamTargetOption3: "1000 Points (Extreme Elite Method)",
    teamStatusMember: "Member",

    socialTitle: "COMMUNITY & RANKINGS",
    socialSubtitle: "Discover fellow active hunters, build friendships, and verify who is truly the best in your area.",
    socialSearchPlaceholder: "Search players or type a username to create one...",
    socialSearchClear: "Clear",
    socialSearchResults: "Search Results",
    socialSearchEmpty: "No hunter found. Would you like to spawn a mock competitor with this name to challenge?",
    socialActionFriends: "Friends",
    socialActionPending: "Pending",
    socialActionAccept: "Accept",
    socialActionAdd: "Add Friend",
    socialActionCustomAdd: "Spawn Ranger",
    socialActionCustomPrompt: "Enter the city of the new challenger to add to the rankings:",
    socialTabGlobal: "Global",
    socialTabLocal: "Local",
    socialTabFriends: "Friends",
    socialTabFeed: "Live Feed",
    socialEmptyFriends: "No Friends Added",
    socialEmptyFriendsDesc: "You haven't added any friends yet. Look them up in the search bar above and click 'Add Friend' to compare.",
    socialFeedHeader: "Live Scavenge Feed",
    socialFeedLike: "Like 👍",
    socialFeedLiked: "Liked ♥",
    socialFeedChallenge: "Challenge ⚔️",
    socialFactHeader: "DID YOU KNOW...?",
    socialFactBody: "Rankings refresh every single week with 10 completely fresh physical targets. Go find them!",

    profileTitle: "YOUR HUNTER PROFILE",
    profileSubtitle: "Review your collective achievements, experience rankings, hunting streak status, and customize your data.",
    profileWeeklyParticipation: "Weekly Attendance",
    profileRankLevel: "RECONNAISSANCE LEAGUE",
    profileStreakTitle: "DAILY SCORE STREAK",
    profileStreakDesc: "Access daily to sustain your active fire and earn bonus multipliers on scan results!",
    profileMosaicTitle: "Your Photos Mosaic Board",
    profileMosaicFound: "SCANS FOUND",
    profileMosaicEmptyTitle: "Mosaic is empty",
    profileMosaicEmptyDesc: "You haven't validated any object photos yet. Explore outside, hunt them, and use the camera component to begin!",
    profileStatsCardTitle: "Official Scavenge License",
    profileStatsCardDesc: "Victory belong to high-velocity scouts who unlock target lists. The system evaluates every submission with physical AI analysis.",
    profileEditNickname: "RENAME NICKNAME / USER INTERACTION PIN",
    profileEditCity: "ALTER CURRENT METROPOLITAN CITY",
    profileSave: "Apply Player Card Alterations",

    rank1: "Novice Finder",
    rank2: "Neighborhood Ward",
    rank3: "Urban Pathfinder",
    rank4: "Scavenger Master",
    rank5: "Visionary Legend",
    rank6: "Camera Overlord",
  },
  es: {
    hunting: "Cazar",
    challenges: "Retos",
    team: "Equipo",
    ranking: "Ránking",
    mosaic: "Mosaico",
    guide: "Guía",
    logout: "Cerrar Sesión",
    points: "Puntos",
    found: "Encontrados",
    time: "Tiempo",
    secondsRemaining: "segundos restantes",
    daysRemaining: "días restantes",
    hoursRemaining: "horas restantes",
    success: "Éxito",
    error: "Error",
    confirm: "Confirmar",
    back: "Atrás",
    close: "Cerrar",
    cancel: "Cancelar",
    optional: "OPCIONAL",

    loginTitle: "FlashHunt",
    loginSubtitle: "SERIES DE CACERÍA URBANA",
    loginDescTitle: "¿CÓMO FUNCIONA?",
    loginDesc1: "Descubre la lista semanal de 10 objetos de cacería urbana.",
    loginDesc2: "Sal a la calle y toma fotos reales de esos objetos.",
    loginDesc3: "La inteligencia artificial (Gemini) valida la foto en el acto.",
    loginDesc4: "Suma puntos y sube hasta lo más alto del ránking.",
    loginLabelNickname: "TU NICKNAME / APODO",
    loginPlaceholderNickname: "Ej. Buscador_Estrella",
    loginLabelCity: "TU CIUDAD DE RESIDENCIA",
    loginBtnStart: "Comenzar Cacería",
    loginFooter: "DISEÑO BOLD TYPOGRAPHY • COMPATIBLE CON MÓVIL Y ESCRITORIO",

    huntTitle: "OBJETIVOS DE LA SEANA",
    huntSubtitle: "Explora tu ciudad para capturar estos 10 elementos activos. La IA validará tu toma al instante.",
    huntTimeAlert: "TIEMPO DE RONDA ACTIVO",
    huntTimeDesc: "Sal a explorar para elevar tu índice de detección. El ránking se congela este domingo a medianoche.",
    huntButtonCapture: "Hacer foto para validar",
    huntHintTitle: "Pistas de Ubicación y trucos",
    huntHintUnlock: "Desbloquear",
    huntHintNoPoints: "No tienes suficientes puntos para desbloquear esta pista. Consigue cazando o mediante retos.",
    huntHintConfirm: "¿Deseas gastar {cost} puntos de tu marcador para revelar esta pista de ubicación?",
    huntDetailsTitle: "Detalles del Objetivo",
    huntDetailsDifficulty: "Dificultad",
    difficultyEasy: "Fácil",
    difficultyMedium: "Media",
    difficultyHard: "Difícil",
    pointsBadge: "PTS",
    verifiedLabel: "VERIFICADO✓",
    backToList: "Volver a la Lista",

    challengeTitle: "RETOS DIARIOS Y SEMANALES",
    challengeSubtitle: "Completa fistas físicas y objetivos especiales para ganar valiosas insignias y puntos de bono.",
    challengeTotalBadges: "INSIGNIAS TOTALES",
    challengeClaimHeader: "¡RETO SUPERADO CAMARADA! 🎉",
    challengeClaimText: "¡Has ganado la insignia {name} y sumado +{pts} PTS adicionales reales!",
    challengeDaily: "DIARIO",
    challengeWeekly: "SEMANAL",
    challengeProgress: "PROGRESO DE CACERÍA",

    teamTitle: "MODO COOPERATIVO: SQUAD",
    teamSubtitle: "Une fuerzas con otros jugadores reales o amigos de Cataluña para rellenar la lista. ¡Los puntajes se agregan en tiempo real!",
    teamTabExplore: "Explorar Rangos de Equipos",
    teamTabMyTeam: "Mi Equipo",
    teamPrivate: "Privado",
    teamMine: "Mío",
    teamLeaderboardHeader: "Tabla de Alianza Cooperativa",
    teamTargetLabel: "meta semanal",
    teamActiveMembers: "Integrantes Activos",
    teamCreatedSuccess: "Creado con éxito el clan cooperativo de alto rendimiento: {name}",
    teamJoinSuccess: "¡Te has integrado con éxito en la escuadra cooperativa {name}!",
    teamLeaveConfirm: "¿Seguro que quieres desertar de tu equipo cooperativo actual? La trayectoria del equipo permanecerá online.",
    teamLeaveBtn: "Abandonar Equipo",
    teamSimulationNotice: "¿Simular capturas en segundo plano de tus compañeros de clan para elevar el fondo global?",
    teamSimulationBtn: "Simular hallazgo colectivo",
    teamMembersHeader: "Integrantes de la Escuadra",
    teamGuideHeader: "Líneas de Cooperación",
    teamGuide1: "Cualquier objeto que valides desde tu panel de 'Cazar' aportará automáticamente al fondo colectivo del squad.",
    teamGuide2: "Los puntos son consolidados: el equipo logra la inmortalidad al alcanzar la meta de puntos antes del domingo.",
    teamGuide3: "Comparte el código secreto y nombre del squad con colegas para fraguar un plan de escaneo imbatible.",
    teamCreateTitle: "Funda una Nueva Alianza",
    teamCreateNameLabel: "NOMBRE DEL SQUAD",
    teamCreateNamePlaceholder: "Ej. Exploradores de Barcelona",
    teamCreatePassLabel: "CONTRASEÑA DE SEGURIDAD (OPCIONAL)",
    teamCreateTargetLabel: "META DE PUNTOS SEMANALES REQUERIDA",
    teamCreateBtn: "Establecer y Unirme",
    teamTargetOption1: "300 Puntos (Método Moderado)",
    teamTargetOption2: "500 Puntos (Competición Estándar)",
    teamTargetOption3: "1000 Puntos (Élite Extrema)",
    teamStatusMember: "Miembro",

    socialTitle: "COMUNIDAD Y RÁNKINGS",
    socialSubtitle: "Busca cazadores en vivo de tu región, haz alianzas de amistad y demuestra de verdad quién domina las calles.",
    socialSearchPlaceholder: "Busca jugadores o ingresa un nombre para crear uno nuevo...",
    socialSearchClear: "Limpiar",
    socialSearchResults: "Resultados de búsqueda",
    socialSearchEmpty: "Ningún cazador encontrado. ¿Deseas añadir un nuevo oponente artificial con este nombre para retarlo?",
    socialActionFriends: "Amigos",
    socialActionPending: "Pendiente",
    socialActionAccept: "Aceptar",
    socialActionAdd: "Añadir amigo",
    socialActionCustomAdd: "Añadir Líder",
    socialActionCustomPrompt: "Introduce la ciudad del nuevo integrante para adherirlo al ránking de competidores:",
    socialTabGlobal: "Global",
    socialTabLocal: "Local",
    socialTabFriends: "Amigos",
    socialTabFeed: "Actividad en directo",
    socialEmptyFriends: "Sin amigos añadidos",
    socialEmptyFriendsDesc: "Aún no has agregado amigos. Búscalos en la barra superior y presiona 'Añadir' para seguirlos aquí.",
    socialFeedHeader: "Actividad en Directo",
    socialFeedLike: "Me gusta 👍",
    socialFeedLiked: "Te gusta ♥",
    socialFeedChallenge: "Retar ⚔️",
    socialFactHeader: "¿SABÍAS QUE...?",
    socialFactBody: "Cada lunes se limpian los ránkings y se publican 10 objetivos físicos inéditos. ¡Sal a por ellos!",

    profileTitle: "TU PERFIL DE CAZADOR",
    profileSubtitle: "Revisa tus medallas conseguidas, tu progreso de nivel de experiencia, tu racha activa y retoca tus datos de piloto.",
    profileWeeklyParticipation: "Asistencia Semanal",
    profileRankLevel: "RANGO DEL DETECTOR",
    profileStreakTitle: "RACHA CONSECUTIVA",
    profileStreakDesc: "¡Ingresa diariamente para alimentar tu fuego y ganar beneficios directos en todos tus hallazgos!",
    profileMosaicTitle: "Tu Mosaico Oficial de Fotos",
    profileMosaicFound: "FOTOS VALIDAS",
    profileMosaicEmptyTitle: "Mosaico vacío",
    profileMosaicEmptyDesc: "No has validado ninguna foto aún. ¡Explora la ciudad, caza un objeto y emplea el visor de cámara para iniciar!",
    profileStatsCardTitle: "Licencia de Reconocimiento",
    profileStatsCardDesc: "La gloria pertenece a los inspectores de alta velocidad. El sistema valida las fotos con análisis neuronal real para evitar farsas.",
    profileEditNickname: "ALTERAR APODO / NOMENCLATURA DE USUARIO",
    profileEditCity: "MODIFICAR MUNICIPIO DE RESIDENCIA",
    profileSave: "Guardar Cambios de Perfil",

    rank1: "Cazador Novato",
    rank2: "Vigilante del Barrio",
    rank3: "Rastreador de Asfalto",
    rank4: "Maestro Buscador",
    rank5: "Leyenda del Sensor",
    rank6: "Deidad de la Cámara",
  }
};

export const LOCALIZED_OBJECTS: Record<Lang, Record<string, { name: string; desc: string }>> = {
  ca: {
    cadira: { name: "Una cadira de terrassa retro o de disseny", desc: "Qualsevol cadira de fusta, plàstic, ferro o retro que trobis a la terrassa d'un bar." },
    bicicleta: { name: "Una bicicleta de línia lligada amb cadenat", desc: "Una bicicleta real lligada meticulosament a un fanal, barana o aparcabicicletes del municipi." },
    gos: { name: "Un gos autèntic passejant actiu", desc: "Un gos real en moviment o passejant pel carrer (mai una imatge dibuixada, joguina o estàtua fictícia)." },
    semafor_vermell: { name: "Un semàfor de vianants clàssic en vermell", desc: "Un llum vermell clar d'aturada de vianants o vehicles perfectament il·luminat de front." },
    autobus: { name: "Un autobús urbà gran de transport regular", desc: "El vehicle davanter o cos sencer d'un bus de trànsit local aturat a la marquesina o circulant." },
    portatil: { name: "Un ordinador portàtil obert modern", desc: "Ordinador tipus laptop amb la pantalla encesa o en mode descans damunt d'una taula de teletreball." },
    planta_test: { name: "Una planta en test al portal o pati", desc: "Jardinera o test visible posat a l'exterior de portals, balcons o botigues de veïns." },
    motxilla: { name: "Una motxilla a l'espatlla d'un vianant", desc: "Una motxilla d'escola o muntanyera que algú dugui posada o recolzada a terra." },
    moto: { name: "Una moto scooter de color vermell o groc", desc: "Una motocicleta d'estil scooter de color vermell clau o groc cridaner aparcada o activa." },
    banc_placa: { name: "Un banc de plaça de fusta i potes de ferro", desc: "El típic banc urbà històric muntat amb llistons de fusta d'un passeig, plaça o parc públic." },
    placa_carrer: { name: "Placa oficial de nom de carrer de pedra gravada", desc: "Una placa física gravada oficial medieval o clàssica de carrer feta de marbre, pedra o ceràmica muntada a la cantonada d'un edifici." },
    hidrant_incendis: { name: "Hidrant d'incendis vermell clàssic (Bombers)", desc: "La tradicional bica o boca d'aigua de bombers, de color vermell llampant o metall, fixada a la vorera." },
    fanal_historic: { name: "Fanal artístic ornamentat de ferro fos antic", desc: "Un fanal decoratiu històric d'estil modernista o antic compost de braços de ferro de colors foscos de plaça antiga." },
    contenidor_blau: { name: "Contenidor gran blau de reciclatge de cartró", desc: "El gran dipòsit públic mòbil de color blau de retirada de paper d'embalar o caixes buides." },
    font_aigua_publica: { name: "Font urbana de ferro per a beure aigua potable", desc: "Una font pública rústica de ferro o combinada amb pedra, per beure aigua dels vianants als parcs o places." },
    bústia_correus_groga: { name: "Bústia de correus independent de color groc", desc: "La típica bústia vertical de Correus de disseny cilíndric groc intens instal·lada al peu del carrer." },
    gargola_pedra: { name: "Gàrgola de pedra decorativa a la façana antiga", desc: "Una escultura de gàrgola, sortidor d'aigua medieval o figura de pedra esculpida a la paret superior d'una església o ajuntament gòtic." }
  },
  en: {
    cadira: { name: "A retro or designer terrace chair", desc: "Any wooden, plastic, iron, or retro chair you find on a bar's outdoor terrace." },
    bicicleta: { name: "A bicycle locked with a padlock", desc: "A real bicycle meticulously locked to a lamppost, railing, or bicycle parking rack." },
    gos: { name: "A real dog walking actively", desc: "A real dog moving or walking on the street (never a drawing, toy, or statue)." },
    semafor_vermell: { name: "A classic red pedestrian traffic light", desc: "A clear red light for pedestrians or vehicles, perfectly illuminated from the front." },
    autobus: { name: "A large city bus on regular transit", desc: "The front vehicle or whole body of a local transit bus stopped at a shelter or driving." },
    portatil: { name: "A modern open laptop computer", desc: "A laptop computer with its screen turned on or in sleep mode on a desk." },
    planta_test: { name: "A potted plant in a porch or courtyard", desc: "A visible planter or flowerpot placed outside porches, balconies, or shops." },
    motxilla: { name: "A backpack on a pedestrian's shoulder", desc: "A school or hiking backpack being worn by someone or resting on the ground." },
    moto: { name: "A red or yellow scooter/motorcycle", desc: "A scooter-style motorcycle in bright red or yellow, parked or driving." },
    banc_placa: { name: "A wooden park bench with iron legs", desc: "The typical historic urban bench made of wooden slats in a promenade, square, or public park." },
    placa_carrer: { name: "Official engraved stone street name sign", desc: "A physical official medieval or classic street plaque made of marble, stone, or ceramic mounted on the corner of a building." },
    hidrant_incendis: { name: "Classic red fire hydrant", desc: "The traditional fire hydrant, in bright red or metal, fixed to the sidewalk." },
    fanal_historic: { name: "Ornate artistic cast-iron lantern", desc: "A decorative historic lamppost made of dark cast iron arms in an old square." },
    contenidor_blau: { name: "Large blue cardboard recycling bin", desc: "The large public blue bin for disposing of packaging paper or empty boxes." },
    font_aigua_publica: { name: "Urban cast-iron drinking fountain", desc: "A rustic public iron or stone fountain for pedestrians to drink water in parks or plazas." },
    bústia_correus_groga: { name: "Independent yellow mailbox", desc: "The typical vertical yellow mailbox with a cylindrical design installed on the street." },
    gargola_pedra: { name: "Decorative stone gargoyle on an old facade", desc: "A gargoyle sculpture or stone figure carved on the upper wall of a gothic church or old town hall." }
  },
  es: {
    cadira: { name: "Una silla de terraza retro o de diseño", desc: "Cualquier silla de madera, plástico, hierro o retro que encuentres en la terraza de un bar." },
    bicicleta: { name: "Una bicicleta atada con candado", desc: "Una bicicleta real atada meticulosamente a una farola, barandilla o aparcabicicletas del municipio." },
    gos: { name: "Un perro real paseando activo", desc: "Un perro real en movimiento o paseando por la calle (nunca una imagen dibujada, juguete o estatua)." },
    semafor_vermell: { name: "Un semáforo de peatones clásico en rojo", desc: "Una luz roja clara de parada de peatones o vehículos perfectamente iluminada de frente." },
    autobus: { name: "Un autobús urbano grande de transporte regular", desc: "El vehículo delantero o cuerpo entero de un autobús de tránsito local detenido en la marquesina o circulando." },
    portatil: { name: "Un ordenador portátil abierto moderno", desc: "Ordenador tipo laptop con la pantalla encendida o en modo descanso sobre una mesa de teletrabajo." },
    planta_test: { name: "Una planta en maceta en el portal o patio", desc: "Jardinera o maceta de flores visible colocada en el exterior de portales, balcones o tiendas de vecinos." },
    motxilla: { name: "Una mochila al hombro de un peatón", desc: "Una mochila de escuela o montaña que alguien lleve puesta o apoyada en el suelo." },
    moto: { name: "Una moto scooter de color rojo o amarillo", desc: "Una motocicleta de estilo scooter de color rojo claro o amarillo llamativo aparcada o activa." },
    banc_placa: { name: "Un banco de plaza de madera y patas de hierro", desc: "El típico banco urbano histórico montado con listones de madera de un paseo, plaza o parque público." },
    placa_carrer: { name: "Placa oficial de nombre de calle de piedra grabada", desc: "Una placa física grabada oficial medieval o clásica de calle hecha de mármol, piedra o cerámica montada en la esquina de un edificio." },
    hidrant_incendis: { name: "Hidrante de incendios rojo clásico (Bomberos)", desc: "La tradicional toma de agua de bomberos, de color rojo brillante o metal, fijada a la acera." },
    fanal_historic: { name: "Farola artística ornamentada de hierro fundido antiguo", desc: "Una farola de diseño modernista o antiguo compuesta de brazos de hierro de color oscuro." },
    contenidor_blau: { name: "Contenedor grande azul de reciclaje de cartón", desc: "El gran depósito público móvil de color azul de retirada de papel de embalar o cajas vacías." },
    font_aigua_publica: { name: "Fuente urbana de hierro para beber agua potable", desc: "Una fuente pública rústica de hierro o combinada con piedra, para beber agua de los peatones en parques o plazas." },
    bústia_correus_groga: { name: "Buzón de correos independiente de color amarillo", desc: "El típico buzón vertical de Correos de diseño cilíndrico amarillo intenso instalado a pie de calle." },
    gargola_pedra: { name: "Gárgola de piedra decorativa en fachada antigua", desc: "Una escultura de gárgola o figura de piedra esculpida en la pared superior de una iglesia gótica o ayuntamiento." }
  }
};

export const LOCALIZED_HINTS: Record<Lang, Record<string, { clue: string }[]>> = {
  ca: {
    cadira: [
      { clue: "Ubicació: Qualsevol terrassa externa d'un bar, cafeteria típica de Barcelona o menjador veïnal." },
      { clue: "Detall: Fes la foto de front de perfil perquè s'identifiqui el respatller." }
    ],
    bicicleta: [
      { clue: "Ubicació: Cantonades d'avingudes grosses o aparcaments públics metal·lics del carrer." },
      { clue: "Detall: Ha d'estar lligada, busqueu els formats tipus Bicing o lligams de cadenat." }
    ],
    gos: [
      { clue: "Ubicació: Parcs públics, passeig fluvial o àrees marcades per a joc de mascotes domèstiques." },
      { clue: "Detall: Enfoca directament quan estigui quiet o s'aturi un segon amb el seu amo." }
    ],
    semafor_vermell: [
      { clue: "Ubicació: Cruïlles grans amb passos de zebra d'alta visibilitat." },
      { clue: "Condició: Comprova de debò que la llum superior vermella de vianants estigui encesa." }
    ],
    autobus: [
      { clue: "Ubicació: Parades i terminals de connexió de línies interurbanes." },
      { clue: "Enfocament: Millor una imatge lateral inclinada per incloure la capçalera amb el número de ruta." }
    ],
    portatil: [
      { clue: "Ubicació: Zones de treball compartit, oficines de la ciutat o taules d'estudi de biblioteques." },
      { clue: "Detall: Amb la pantalla il·luminada té un reconeixement instantani per IA de visió." }
    ],
    planta_test: [
      { clue: "Ubicació: Portals de finques clàssiques, entrades de fleques de poble o aparadors decorats." },
      { clue: "Detall: Ha de ser en test o jardinera independent, no una planta plantada directament a terra." }
    ],
    motxilla: [
      { clue: "Ubicació: Molt freqüent prop d'estacions de tren, parades d'autobús o recintes docents." },
      { clue: "Estratègia: De colors vius destacarà fortament sobre la silueta del fons." }
    ],
    moto: [
      { clue: "Ubicació: Places d'aparcament d'asfalt que estan situades al revolt d'encreuament de carrers." },
      { clue: "Requisit: Recomanar que el color principal de la carrosseria de la scooter sigui clarament vermell o groc." }
    ],
    banc_placa: [
      { clue: "Ubicació: Zones de carrer per a vianants amb arbrat històric o bulevards concorreguts." },
      { clue: "Detall: Per obtenir els punts enfoqui de dia per retratar bé les fustes paral·leles." }
    ],
    placa_carrer: [
      { clue: "Ubicació: Cantonades d'edificis a uns 3-4 metres d'alçada del terra." },
      { clue: "Característica: El format original d'epigrafia tallat en pedra, gres o decoració vidrada catalana." }
    ],
    hidrant_incendis: [
      { clue: "Ubicació: En voreres de zones industrials, edificis moderns de l'estat o prop de teatres." },
      { clue: "Detall: La clàssica columna vermella de bombers de dues canelles amb acoblaments de bronze." }
    ],
    fanal_historic: [
      { clue: "Ubicació: Casc antic, places de la vila de municipis o passeigs amb disseny d'època." },
      { clue: "Estratègia: Busqueu les típiques mènsules o braços florals i els vidres de llanterna hexagonal." }
    ],
    contenidor_blau: [
      { clue: "Ubicació: Illes ecològiques de recollida de residus de qualsevol barri." },
      { clue: "Detall: Comproveu que coincideix amb el color de selectiva destinat a paper i cartró." }
    ],
    font_aigua_publica: [
      { clue: "Ubicació: Parcs infantils, pistes esportives públiques o cantonades ombrívoles." },
      { clue: "Ubicació local: La típica font model Canaletes de ferro o el format de broc amb polsador." }
    ],
    bústia_correus_groga: [
      { clue: "Ubicació: Davant d'oficines postals del poble, estacions grans o cruïlles de pas." },
      { clue: "Estratègia: És una bústia de peu de Correus sencera, groga i brillant per les cartes." }
    ],
    gargola_pedra: [
      { clue: "Ubicació: Façanes altes de temples religiosos antics, palaus gòtics o edificacions d'origen medieval." },
      { clue: "Detall: Escultures mitològiques situades al capdamunt del mur d'escorrentia de pluja." }
    ]
  },
  en: {
    cadira: [
      { clue: "Location: Any outdoor terrace of a bar, typical cafe, or residential dining area." },
      { clue: "Detail: Take the photo from a side or front angle to clearly show the backrest." }
    ],
    bicicleta: [
      { clue: "Location: Corners of major avenues or public metal bicycle racks." },
      { clue: "Detail: Must be chained or secured, search for public bike shares or standard combination locks." }
    ],
    gos: [
      { clue: "Location: Public parks, river promenades, or designated pet-friendly play zones." },
      { clue: "Detail: Focus directly when the dog is stationary or pauses for a moment near its owner." }
    ],
    semafor_vermell: [
      { clue: "Location: Busy street intersections with high-visibility zebra pedestrian crossings." },
      { clue: "Requirement: Ensure the red pedestrian light silhouette is completely illuminated and glowing." }
    ],
    autobus: [
      { clue: "Location: Key bus stops, central stations, or terminal points of transit routes." },
      { clue: "Angling: A slightly diagonal or side-angle shot showing the full vehicle body and route sign works best." }
    ],
    portatil: [
      { clue: "Location: Coworking spaces, local tech offices, or study desks in public libraries." },
      { clue: "Detail: A glowing/active laptop screen facilitates instant recognition for our vision AI model." }
    ],
    planta_test: [
      { clue: "Location: Porches of residential apartments, local bakery entryways, or decorative shop windows." },
      { clue: "Detail: Must be in a standalone flowerpot or planter box, not planted directly in open garden ground." }
    ],
    motxilla: [
      { clue: "Location: Frequently found around train stations, bus stops, or university campuses." },
      { clue: "Strategy: Bright, high-contrast colors make the outline pop beautifully against the background." }
    ],
    moto: [
      { clue: "Location: On-street designated motorcycle parking spaces near intersections." },
      { clue: "Requirement: The primary scooter body color should be clearly red or yellow." }
    ],
    banc_placa: [
      { clue: "Location: Pedestrian pathways, public city squares, or breezy urban boulevards." },
      { clue: "Detail: For high scores, snap the phone photo during daylit hours to highlight wooden slats." }
    ],
    placa_carrer: [
      { clue: "Location: Side corners of street corners elevated about 3-4 meters above ground level." },
      { clue: "Detail: Look for original historical stone engravings or glazed tile designs typical of regional towns." }
    ],
    hidrant_incendis: [
      { clue: "Location: Sidewalks of industrial districts, modern civic buildings, or near theaters." },
      { clue: "Detail: The classic bright red fire column with metallic couplings on the side." }
    ],
    fanal_historic: [
      { clue: "Location: Old gothic quarters, central village plazas, or historical decorative walkways." },
      { clue: "Strategy: Look for decorative floral metal brackets and typical hexagonal lantern glassware." }
    ],
    contenidor_blau: [
      { clue: "Location: Recycling nodes located in neighborhood collection centers." },
      { clue: "Detail: Verify it matches the blue waste bin strictly allocated for paper and corrugated board packaging." }
    ],
    font_aigua_publica: [
      { clue: "Location: Children playgrounds, public sports fields, or shaded park corners." },
      { clue: "Format: Standard iron pedestal drinking fountain or push-button bubbler design." }
    ],
    bústia_correus_groga: [
      { clue: "Location: In front of local postal offices, major transit station exits, or main junctions." },
      { clue: "Strategy: The iconic cylindrical, bright yellow free-standing mailbox." }
    ],
    gargola_pedra: [
      { clue: "Location: High facade eaves of ancient churches, gothic palaces, or medieval castles." },
      { clue: "Detail: Mythological sculpted beast/gargoyle extending proudly out from upper gutter walls." }
    ]
  },
  es: {
    cadira: [
      { clue: "Ubicación: Cualquier terraza externa de un bar, cafetería típica o comedor de vecinos." },
      { clue: "Detalle: Haz la foto de frente o de perfil para que se identifique bien el respaldo." }
    ],
    bicicleta: [
      { clue: "Ubicación: Esquinas de avenidas grandes o aparcamientos públicos metálicos de la calle." },
      { clue: "Detalle: Debe estar atada, buscad los formatos de bicicletas compartidas o candados." }
    ],
    gos: [
      { clue: "Ubicación: Parques públicos, paseos fluviales o áreas autorizadas para el juego de mascotas." },
      { clue: "Detalle: Enfoca directamente cuando esté quieto o se detenga un segundo con su dueño." }
    ],
    semafor_vermell: [
      { clue: "Ubicación: Cruces grandes con pasos de cebra de alta visibilidad." },
      { clue: "Condición: Comprueba que la luz superior roja para peatones esté claramente encendida." }
    ],
    autobus: [
      { clue: "Ubicación: Paradas y terminales de conexión de líneas urbanas o interurbanas." },
      { clue: "Enfoque: Mejor una imagen lateral inclinada para incluir tanto el chasis como el número de ruta." }
    ],
    portatil: [
      { clue: "Ubicación: Espacios de coworking, oficinas o mesas de estudio de bibliotecas públicas." },
      { clue: "Detalle: Con la pantalla encendida se facilita la detección instantánea por el modelo de IA de de visión." }
    ],
    planta_test: [
      { clue: "Ubicación: Portales de fincas clásicas, entradas de panaderías o escaparates de tiendas." },
      { clue: "Detalle: Debe estar en maceta o jardinera independiente, no plantada directo en la tierra." }
    ],
    motxilla: [
      { clue: "Ubicación: Frecuente cerca de estaciones de tren, paradas de autobús o centros docentes." },
      { clue: "Estrategia: Los colores vivos destacarán mejor sobre el fondo de la calle." }
    ],
    moto: [
      { clue: "Ubicación: Zonas de aparcamiento pintadas en el asfalto cerca de las intersecciones." },
      { clue: "Requisito: Se recomienda firmemente que el color de la scooter sea rojo o amarillo." }
    ],
    banc_placa: [
      { clue: "Ubicación: Zonas peatonales arboladas, bulevares transitados o parques urbanos." },
      { clue: "Detalle: Haz la toma a plena luz del día para que resalten las tablillas de madera paralelas." }
    ],
    placa_carrer: [
      { clue: "Ubicación: Esquinas de edificios a unos 3 o 4 metros de altura del suelo." },
      { clue: "Detall: Placa física grabada oficial clásica de calle hecha de mármol o cerámica montada en muros." }
    ],
    hidrant_incendis: [
      { clue: "Ubicación: En aceras de zonas industriales, edificios públicos modernos o teatros." },
      { clue: "Detalle: La clásica columna roja de bomberos de dos salidas con acoples metálicos." }
    ],
    fanal_historic: [
      { clue: "Ubicación: Casco antiguo, plazas de la villa o avenidas de diseño monumental de época." },
      { clue: "Estrategia: Busca los soportes ornamentados de hierro y las linternas de diseño hexagonal." }
    ],
    contenidor_blau: [
      { clue: "Ubicación: Islas ecológicas de reciclaje de residuos de cualquier vecindario." },
      { clue: "Detalle: Asegúrate de que coincida con el color azul destinado estrictamente a papel y cartón." }
    ],
    font_aigua_publica: [
      { clue: "Ubicación: Parques infantiles, pistas deportivas públicas o esquinas sombrías." },
      { clue: "Formato: La clásica fuente de pedestal de hierro de parques o grifos con pulsador." }
    ],
    bústia_correus_groga: [
      { clue: "Ubicación: Frente a oficinas de correo, estaciones de tren o cruces de mucho paso." },
      { clue: "Estrategia: El icónico buzón cilíndrico de color amarillo intenso para cartas." }
    ],
    gargola_pedra: [
      { clue: "Ubicación: Aleros superiores de iglesias antiguas, palacios gónicos o castillos medievales." },
      { clue: "Detalle: Escultura de gárgola, desagüe o bestia mitológica tallada que sobresale de fachadas." }
    ]
  }
};

export const LOCALIZED_CHALLENGES: Record<Lang, { id: string; title: string; description: string; badgeName: string; expiresIn: string }[]> = {
  ca: [
    {
      id: "challenge_vehicles",
      title: "Càrrega Pesant",
      description: "Troba i valida un mitjà de transport actiu de la setmana (Bicicleta o Autobús o Moto).",
      badgeName: "Moto-Bici-Bus Elite",
      expiresIn: "14 hores restants d'avui"
    },
    {
      id: "challenge_fast",
      title: "Caçador Express",
      description: "Comença la ronda i verifica 3 objectes ràpids per accelerar la teva puntuació.",
      badgeName: "Vent de Tramuntana",
      expiresIn: "21 hores restants d'avui"
    },
    {
      id: "challenge_weekly_full",
      title: "Campionat Brut",
      description: "Suma un total de 5 o més objectes quotidians de qualsevol dificultat.",
      badgeName: "Súper Caçador Català",
      expiresIn: "5 dies restants d'aquesta ronda"
    },
    {
      id: "challenge_easy",
      title: "Aclimatació",
      description: "Suma un objecte fàcil (Cadira, Gos, Portàtil, Planta test o Motxilla) en un segon.",
      badgeName: "Primeres Passos",
      expiresIn: "18 hores restants d'avui"
    }
  ],
  en: [
    {
      id: "challenge_vehicles",
      title: "Heavy Load",
      description: "Find and validate an active vehicle of the week (Bicycle, Bus, or Motorcycle).",
      badgeName: "Moto-Bike-Bus Elite",
      expiresIn: "14 hours remaining today"
    },
    {
      id: "challenge_fast",
      title: "Express Hunter",
      description: "Start the round and verify 3 fast objects to accelerate your score.",
      badgeName: "Wind of Tramuntana",
      expiresIn: "21 hours remaining today"
    },
    {
      id: "challenge_weekly_full",
      title: "Major Championship",
      description: "Gather a total of 5 or more everyday objects of any difficulty level.",
      badgeName: "Super Catalan Hunter",
      expiresIn: "5 days remaining this round"
    },
    {
      id: "challenge_easy",
      title: "Getting Prepared",
      description: "Acquire an easy object (Chair, Dog, Laptop, Potted Plant, or Backpack) in seconds.",
      badgeName: "First Steps",
      expiresIn: "18 hours remaining today"
    }
  ],
  es: [
    {
      id: "challenge_vehicles",
      title: "Carga Pesada",
      description: "Encuentra y valida un medio de transporte activo de la semana (Bicicleta, Autobús o Moto).",
      badgeName: "Moto-Bici-Bus Élite",
      expiresIn: "14 horas restantes de hoy"
    },
    {
      id: "challenge_fast",
      title: "Cazador Exprés",
      description: "Comienza la ronda y verifica 3 objetos rápidos para acelerar tu puntuación.",
      badgeName: "Viento de Tramontana",
      expiresIn: "21 horas restantes de hoy"
    },
    {
      id: "challenge_weekly_full",
      title: "Campeonato Mayor",
      description: "Suma un total de 5 o más objetos del día a día de cualquier nivel de dificultad.",
      badgeName: "Súper Cazador Catalán",
      expiresIn: "5 días restantes de esta ronda"
    },
    {
      id: "challenge_easy",
      title: "Aclimatación",
      description: "Suma un objeto fácil (Silla, Perro, Portátil, Maceta de planta o Mochila) en segundos.",
      badgeName: "Primeros Pasos",
      expiresIn: "18 horas de hoy"
    }
  ]
};

