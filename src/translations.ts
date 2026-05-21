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
