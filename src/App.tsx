import React, { useState, useEffect, useCallback } from "react";
import {
  Camera,
  Trophy,
  User,
  Clock,
  Sparkles,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BookOpen,
  Smartphone,
  ChevronRight,
  Flame,
  Check,
  RefreshCw,
  Info,
  Users,
  Zap,
  HelpCircle,
  Award,
  ChevronDown,
  ChevronUp,
  LogOut,
  Globe,
  Bell,
  UserPlus,
  Heart
} from "lucide-react";
import { HuntObject, Player, ActivityLog, Team } from "./types";
import CameraCapture from "./components/CameraCapture";
import SocialTab from "./components/SocialTab";
import ProfileMosaic from "./components/ProfileMosaic";
import LoginScreen from "./components/LoginScreen";
import TeamManagement from "./components/TeamManagement";
import ChallengesSection from "./components/ChallengesSection";
import { TRANSLATIONS, Lang } from "./translations";
import { playBeep, playSuccessSound, playErrorSound, playScanSound } from "./utils/audio";


const INITIAL_RESOURCES = [
  { key: "cadira", name: "Una cadira de terrassa retro o de disseny", englishQuery: "chair", points: 12, difficulty: "Fàcil" as const, desc: "Qualsevol cadira de fusta, plàstic, ferro o retro que trobis a la terrassa d'un bar.", verified: false },
  { key: "bicicleta", name: "Una bicicleta de línia lligada amb cadenat", englishQuery: "bicycle", points: 22, difficulty: "Mitjana" as const, desc: "Una bicicleta real lligada meticulosament a un fanal, barana o aparcabicicletes del municipi.", verified: false },
  { key: "gos", name: "Un gos autèntic passejant actiu", englishQuery: "dog", points: 15, difficulty: "Fàcil" as const, desc: "Un gos real en moviment o passejant pel carrer (mai una imatge dibuixada, joguina o estàtua fictícia).", verified: false },
  { key: "semafor_vermell", name: "Un semàfor de vianants clàssic en vermell", englishQuery: "red traffic light", points: 20, difficulty: "Mitjana" as const, desc: "Un llum vermell clar d'aturada de vianants o vehicles perfectament il·luminat de front.", verified: false },
  { key: "autobus", name: "Un autobús urbà gran de transport regular", englishQuery: "bus", points: 25, difficulty: "Mitjana" as const, desc: "El vehicle davanter o cos sencer d'un bus de trànsit local aturat a la marquesina o circulant.", verified: false },
  { key: "portatil", name: "Un ordinador portàtil obert modern", englishQuery: "laptop", points: 14, difficulty: "Fàcil" as const, desc: "Ordinador tipus laptop amb la pantalla encesa o en mode descans damunt d'una taula de teletreball.", verified: false },
  { key: "planta_test", name: "Una planta en test al portal o pati", englishQuery: "potted plant", points: 12, difficulty: "Fàcil" as const, desc: "Jardinera o test visible posat a l'exterior de portals, balcons o botigues de veïns.", verified: false },
  { key: "motxilla", name: "Una motxilla a l'espatlla d'un vianant", englishQuery: "backpack", points: 15, difficulty: "Fàcil" as const, desc: "Una motxilla d'escola o muntanyera que algú dugui posada o recolzada a terra.", verified: false },
  { key: "moto", name: "Una moto scooter de color vermell o groc", englishQuery: "motorcycle", points: 28, difficulty: "Mitjana" as const, desc: "Una motocicleta d'estil scooter de color vermell clau o groc cridaner aparcada o activa.", verified: false },
  { key: "banc_placa", name: "Un banc de plaça de fusta i potes de ferro", englishQuery: "park bench", points: 16, difficulty: "Fàcil" as const, desc: "El típic banc urbà històric muntat amb llistons de fusta d'un passeig, plaça o parc públic.", verified: false },
  { key: "placa_carrer", name: "Placa oficial de nom de carrer de pedra gravada", englishQuery: "street sign", points: 45, difficulty: "Difícil" as const, desc: "Una placa física gravada oficial medieval o clàssica de carrer feta de marbre, pedra o ceràmica muntada a la cantonada d'un edifici.", verified: false },
  { key: "hidrant_incendis", name: "Hidrant d'incendis vermell clàssic (Bombers)", englishQuery: "fire hydrant", points: 50, difficulty: "Difícil" as const, desc: "La tradicional bica o boca d'aigua de bombers, de color vermell llampant o metall, fixada a la vorera.", verified: false },
  { key: "fanal_historic", name: "Fanal artístic ornamentat de ferro fos antic", englishQuery: "lantern", points: 48, difficulty: "Difícil" as const, desc: "Un fanal decoratiu històric d'estil modernista o antic compost de braços de ferro de colors foscos de plaça antiga.", verified: false },
  { key: "contenidor_blau", name: "Contenidor gran blau de reciclatge de cartró", englishQuery: "blue recycling bin", points: 30, difficulty: "Mitjana" as const, desc: "El gran dipòsit públic mòbil de color blau de retirada de paper d'embalar o caixes buides.", verified: false },
  { key: "font_aigua_publica", name: "Font urbana de ferro per a beure aigua potable", englishQuery: "drinking fountain", points: 42, difficulty: "Difícil" as const, desc: "Una font pública rústica de ferro o combinada amb pedra, per beure aigua dels vianants als parcs o places.", verified: false },
  { key: "bústia_correus_groga", name: "Bústia de correus independent de color groc", englishQuery: "mailbox", points: 40, difficulty: "Difícil" as const, desc: "La típica bústia vertical de Correus de disseny cilíndric groc intens instal·lada al peu del carrer.", verified: false },
  { key: "gargola_pedra", name: "Gàrgola de pedra decorativa a la façana antiga", englishQuery: "gargoyle", points: 65, difficulty: "Difícil" as const, desc: "Una escultura de gàrgola, sortidor d'aigua medieval o figura de pedra esculpida a la paret superior d'una església o ajuntament gòtic.", verified: false }
];

const OBJECT_HINTS: Record<string, { cost: number; clue: string }[]> = {
  cadira: [
    { cost: 3, clue: "Ubicació: Qualsevol terrassa externa d'un bar, cafeteria típica de Barcelona o menjador veïnal." },
    { cost: 5, clue: "Detall: Fes la foto de front de perfil perquè s'identifiqui el respatller." }
  ],
  bicicleta: [
    { cost: 4, clue: "Ubicació: Cantonades d'avingudes grosses o aparcaments públics metal·lics del carrer." },
    { cost: 6, clue: "Detall: Ha d'estar lligada, busqueu els formats tipus Bicing o lligams de cadenat." }
  ],
  gos: [
    { cost: 3, clue: "Ubicació: Parcs públics, passeig fluvial o àrees marcades per a joc de mascotes domèstiques." },
    { cost: 5, clue: "Detall: Enfoca directament quan estigui quiet o s'aturi un segon amb el seu amo." }
  ],
  semafor_vermell: [
    { cost: 4, clue: "Ubicació: Cruïlles grans amb passos de zebra d'alta visibilitat." },
    { cost: 6, clue: "Condició: Comprova de debò que la llum superior vermella de vianants estigui encesa." }
  ],
  autobus: [
    { cost: 4, clue: "Ubicació: Parades i terminals de connexió de línies interurbanes." },
    { cost: 6, clue: "Enfocament: Millor una imatge lateral inclinada per incloure la capçalera amb el número de ruta." }
  ],
  portatil: [
    { cost: 3, clue: "Ubicació: Zones de treball compartit, oficines de la ciutat o taules d'estudi de biblioteques." },
    { cost: 5, clue: "Detall: Amb la pantalla il·luminada té un reconeixement instantani per IA de visió." }
  ],
  planta_test: [
    { cost: 3, clue: "Ubicació: Portals de finques clàssiques, entrades de fleques de poble o aparadors decorats." },
    { cost: 5, clue: "Detall: Ha de ser en test o jardinera independent, no una planta plantada directament a terra." }
  ],
  motxilla: [
    { cost: 3, clue: "Ubicació: Molt freqüent prop d'estacions de tren, parades d'autobús o recintes docents." },
    { cost: 5, clue: "Estratègia: De colors vius destacarà fortament sobre la silueta del fons." }
  ],
  moto: [
    { cost: 4, clue: "Ubicació: Places d'aparcament d'asfalt que estan situades al revolt d'encreuament de carrers." },
    { cost: 6, clue: "Requisit: Recomanar que el color principal de la carrosseria de la scooter sigui clarament vermell o groc." }
  ],
  banc_placa: [
    { cost: 3, clue: "Ubicació: Zones de carrer per a vianants amb arbrat històric o bulevards concorreguts." },
    { cost: 5, clue: "Detall: Per obtenir els punts enfoqui de dia per retratar bé les fustes paral·leles." }
  ],
  placa_carrer: [
    { cost: 5, clue: "Ubicació: Cantonades d'edificis a uns 3-4 metres d'alçada del terra." },
    { cost: 8, clue: "Característica: El format original d'epigrafia tallat en pedra, gres o decoració vidrada catalana." }
  ],
  hidrant_incendis: [
    { cost: 6, clue: "Ubicació: En voreres de zones industrials, edificis moderns de l'estat o prop de teatres." },
    { cost: 10, clue: "Detall: La clàssica columna vermella de bombers de dues canelles amb acoblaments de bronze." }
  ],
  fanal_historic: [
    { cost: 5, clue: "Ubicació: Casc antic, places de la vila de municipis o passeigs amb disseny d'època." },
    { cost: 8, clue: "Estratègia: Busqueu les típiques mènsules o braços florals i els vidres de llanterna hexagonal." }
  ],
  contenidor_blau: [
    { cost: 4, clue: "Ubicació: Illes ecològiques de recollida de residus de qualsevol barri." },
    { cost: 7, clue: "Detall: Comproveu que coincideix amb el color de selectiva destinat a paper i cartró." }
  ],
  font_aigua_publica: [
    { cost: 5, clue: "Ubicació: Parcs infantils, pistes esportives públiques o cantonades ombrívoles." },
    { cost: 9, clue: "Ubicació local: La típica font model Canaletes de ferro o el format de broc amb polsador." }
  ],
  bústia_correus_groga: [
    { cost: 5, clue: "Ubicació: Davant d'oficines postals del poble, estacions grans o cruïlles de pas." },
    { cost: 8, clue: "Estratègia: És una bústia de peu de Correus sencera, groga i brillant per les cartes." }
  ],
  gargola_pedra: [
    { cost: 8, clue: "Ubicació: Façanes altes de temples religiosos antics, palaus gòtics o edificacions d'origen medieval." },
    { cost: 12, clue: "Detall: Escultures mitològiques situades al capdamunt del mur d'escorrentia de pluja." }
  ]
};

export default function App() {
  // Language & Internationalization
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("flashhunt_lang");
    if (saved === "ca" || saved === "es" || saved === "en") {
      return saved as Lang;
    }
    return "ca";
  });

  const handleSetLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("flashhunt_lang", newLang);
  };

  const t = TRANSLATIONS[lang];

  // Daily Streak
  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem("flashhunt_streak");
    return saved ? parseInt(saved, 10) : 3;
  });

  // Navigation & User State
  const [currentUser, setCurrentUser] = useState<string | null>(() => localStorage.getItem("flashhunt_user"));
  const [currentCity, setCurrentCity] = useState<string | null>(() => localStorage.getItem("flashhunt_city"));
  const [activeTab, setActiveTab] = useState<"llista" | "social" | "mosaic" | "instruccions" | "reptes" | "cooperatiu">("llista");

  // Onboarding controls
  const [inputUser, setInputUser] = useState("");
  const [inputCity, setInputCity] = useState("Barcelona");

  // Custom high-fidelity confirmation dialog to escape iframe confirm() blocks
  const [confirmDialog, setConfirmDialog] = useState<{
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    isDanger?: boolean;
  } | null>(null);

  // Hunt progress
  const [huntList, setHuntList] = useState<HuntObject[]>(() => {
    const user = localStorage.getItem("flashhunt_user");
    if (user) {
      const saved = localStorage.getItem(`flashhunt_${user}_objects`);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    const savedGeneric = localStorage.getItem("flashhunt_objects");
    if (savedGeneric) {
      try { return JSON.parse(savedGeneric); } catch (e) { }
    }
    return INITIAL_RESOURCES;
  });

  // Timers and metrics
  const [duration, setDuration] = useState<number>(() => {
    const user = localStorage.getItem("flashhunt_user");
    if (user) {
      const saved = localStorage.getItem(`flashhunt_${user}_duration`);
      if (saved) return parseInt(saved, 10);
    }
    const savedGeneric = localStorage.getItem("flashhunt_duration");
    return savedGeneric ? parseInt(savedGeneric, 10) : 0;
  });
  const [secondsRemaining, setSecondsRemaining] = useState(518400); // ~6 days countdown

  // Camera capture modal state
  const [activeCaptureKey, setActiveCaptureKey] = useState<string | null>(null);

  // Verification state feedback modals
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    reason: string;
    aiUsed: boolean;
    points: number;
    objectName: string;
  } | null>(null);

  // Sever Sync / Player state
  const [dbPlayers, setDbPlayers] = useState<Player[]>([]);
  const [dbLogs, setDbLogs] = useState<ActivityLog[]>([]);
  const [geminiActive, setGeminiActive] = useState(false);

  // Cooperative / Challenges / Hints state
  const [bonusPoints, setBonusPoints] = useState<number>(() => {
    const user = localStorage.getItem("flashhunt_user");
    if (user) {
      const saved = localStorage.getItem(`flashhunt_${user}_bonus_points`);
      if (saved) return Number(saved);
    }
    const savedGeneric = localStorage.getItem("flashhunt_bonus_points");
    return savedGeneric ? Number(savedGeneric) : 0;
  });
  const [spentPoints, setSpentPoints] = useState<number>(() => {
    const user = localStorage.getItem("flashhunt_user");
    if (user) {
      const saved = localStorage.getItem(`flashhunt_${user}_spent_points`);
      if (saved) return Number(saved);
    }
    const savedGeneric = localStorage.getItem("flashhunt_spent_points");
    return savedGeneric ? Number(savedGeneric) : 0;
  });
  const [completedChallenges, setCompletedChallenges] = useState<string[]>(() => {
    const user = localStorage.getItem("flashhunt_user");
    if (user) {
      const saved = localStorage.getItem(`flashhunt_${user}_completed_challenges`);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    const savedGeneric = localStorage.getItem("flashhunt_completed_challenges");
    if (savedGeneric) {
      try { return JSON.parse(savedGeneric); } catch (e) { }
    }
    return [];
  });
  const [currentTeam, setCurrentTeam] = useState<Team | null>(() => {
    const user = localStorage.getItem("flashhunt_user");
    if (user) {
      const saved = localStorage.getItem(`flashhunt_${user}_current_team`);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    const savedGeneric = localStorage.getItem("flashhunt_current_team");
    if (savedGeneric) {
      try { return JSON.parse(savedGeneric); } catch (e) { }
    }
    return null;
  });

  // Dynamic In-App Push Notifications Toast State
  const [toasts, setToasts] = useState<{ id: string; title: string; message: string; type: "success" | "info" | "friend" | "like" | "team"; icon?: string }[]>([]);

  const triggerNotification = useCallback((title: string, message: string, type: "success" | "info" | "friend" | "like" | "team") => {
    const id = Date.now().toString() + Math.random().toString();
    playScanSound(); // Plays retro electronic sound!
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 6500);
  }, []);

  useEffect(() => {
    (window as any).triggerNotification = triggerNotification;
  }, [triggerNotification]);

  // Welcome toast notification on startup
  useEffect(() => {
    if (!currentUser) return;
    const testTimer = setTimeout(() => {
       triggerNotification("🌟 BENVINGUT A FLASHHUNT", "S'ha connectat el canal de rànquing i d'activitat de Catalunya!", "info");
    }, 4000);

    return () => {
      clearTimeout(testTimer);
    };
  }, [currentUser, triggerNotification]);
  const [revealedHints, setRevealedHints] = useState<Record<string, number[]>>(() => {
    const user = localStorage.getItem("flashhunt_user");
    if (user) {
      const saved = localStorage.getItem(`flashhunt_${user}_revealed_hints`);
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { }
      }
    }
    const savedGeneric = localStorage.getItem("flashhunt_revealed_hints");
    if (savedGeneric) {
      try { return JSON.parse(savedGeneric); } catch (e) { }
    }
    return {};
  });

  // Local calculation of points
  const basePoints = huntList.filter(o => o.verified).reduce((sum, o) => sum + o.points, 0);
  const totalPoints = Math.max(0, basePoints + bonusPoints - spentPoints);
  const foundCount = huntList.filter(o => o.verified).length;

  // On onboarding submit
  function handleOnboard(e: React.FormEvent) {
    e.preventDefault();
    if (!inputUser.trim()) return;
    
    const user = inputUser.trim();
    localStorage.setItem("flashhunt_user", user);
    localStorage.setItem("flashhunt_city", inputCity);

    // Save to the known device list of accounts in parent
    try {
      const saved = localStorage.getItem("flashhunt_saved_accounts");
      let list = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(list)) list = [];
      list = list.filter((acc: any) => acc.nickname.toLowerCase() !== user.toLowerCase());
      list.unshift({ nickname: user, email: `${user.toLowerCase()}@flashhunt.cat`, city: inputCity, lastUsed: Date.now() });
      localStorage.setItem("flashhunt_saved_accounts", JSON.stringify(list.slice(0, 4)));
    } catch (err) {}

    setCurrentUser(user);
    setCurrentCity(inputCity);
  }

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("flashhunt_user");
    localStorage.removeItem("flashhunt_city");
    setCurrentUser(null);
    setCurrentCity(null);
    setActiveTab("llista");
  };

  // Handle Profile Update with robust state progress key migration
  const handleUpdateProfile = (newNick: string, newCity: string) => {
    if (currentUser && currentUser !== newNick) {
      const oldPrefix = `flashhunt_${currentUser}_`;
      const newPrefix = `flashhunt_${newNick}_`;
      const keysToMigrate = [
        "objects",
        "duration",
        "bonus_points",
        "spent_points",
        "completed_challenges",
        "current_team",
        "revealed_hints"
      ];
      keysToMigrate.forEach(key => {
        const val = localStorage.getItem(oldPrefix + key);
        if (val !== null) {
          localStorage.setItem(newPrefix + key, val);
          localStorage.removeItem(oldPrefix + key);
        }
      });

      // Also migrate saved accounts register
      try {
        const saved = localStorage.getItem("flashhunt_saved_accounts");
        if (saved) {
          let list = JSON.parse(saved);
          if (Array.isArray(list)) {
            list = list.map((acc: any) => {
              if (acc.nickname.toLowerCase() === currentUser.toLowerCase()) {
                return { ...acc, nickname: newNick, city: newCity };
              }
              return acc;
            });
            localStorage.setItem("flashhunt_saved_accounts", JSON.stringify(list));
          }
        }
      } catch (e) {
        console.warn("Could not migrate profile account registration", e);
      }
    }

    localStorage.setItem("flashhunt_user", newNick);
    localStorage.setItem("flashhunt_city", newCity);
    setCurrentUser(newNick);
    setCurrentCity(newCity);
  };

  // Effect to calculate and save duration actively every second (user scoped)
  useEffect(() => {
    if (!currentUser) return;
    const interval = setInterval(() => {
      setDuration(prev => {
        const next = prev + 1;
        localStorage.setItem(`flashhunt_${currentUser}_duration`, String(next));
        return next;
      });
      // Count down 7 days
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentUser]);

  // Sync / poll server active rankings and status
  async function fetchServerStats() {
    try {
      const res = await fetch("/api/players");
      if (res.ok) {
        const data = await res.json();
        setDbPlayers(data.players || []);
        setDbLogs(data.logs || []);
      }
      
      const healthRes = await fetch("/api/health");
      if (healthRes.ok) {
        const healthData = await healthRes.json();
        setGeminiActive(healthData.geminiConfigured === true);
      }
    } catch (error) {
      console.warn("Could not sync with local api:", error);
    }
  }

  useEffect(() => {
    fetchServerStats();
    // Poll stats every 12 seconds for interactive real-time multi-player feeling
    const interval = setInterval(fetchServerStats, 12000);
    return () => clearInterval(interval);
  }, []);

  // Scoped load event listening for user changes
  useEffect(() => {
    if (!currentUser) return;
    const prefix = `flashhunt_${currentUser}_`;

    // 1. Hunt list
    const savedObjects = localStorage.getItem(prefix + "objects");
    if (savedObjects) {
      try { setHuntList(JSON.parse(savedObjects)); } catch (e) { }
    } else {
      const oldGeneric = localStorage.getItem("flashhunt_objects");
      if (oldGeneric) {
        try { setHuntList(JSON.parse(oldGeneric)); } catch (e) { }
      } else {
        setHuntList(INITIAL_RESOURCES);
      }
    }

    // 2. Duration
    const savedDuration = localStorage.getItem(prefix + "duration");
    setDuration(savedDuration ? parseInt(savedDuration, 10) : 0);

    // 3. Bonus points
    const savedBonus = localStorage.getItem(prefix + "bonus_points");
    setBonusPoints(savedBonus ? parseInt(savedBonus, 10) : 0);

    // 4. Spent points
    const savedSpent = localStorage.getItem(prefix + "spent_points");
    setSpentPoints(savedSpent ? parseInt(savedSpent, 10) : 0);

    // 5. Challenges
    const savedChallenges = localStorage.getItem(prefix + "completed_challenges");
    try { setCompletedChallenges(savedChallenges ? JSON.parse(savedChallenges) : []); } catch (e) { }

    // 6. Team
    const savedTeam = localStorage.getItem(prefix + "current_team");
    try { setCurrentTeam(savedTeam ? JSON.parse(savedTeam) : null); } catch (e) { }

    // 7. Hints
    const savedHints = localStorage.getItem(prefix + "revealed_hints");
    try { setRevealedHints(savedHints ? JSON.parse(savedHints) : {}); } catch (e) { }
  }, [currentUser]);

  // Sync objects localstorage scoped
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`flashhunt_${currentUser}_objects`, JSON.stringify(huntList));
    }
  }, [huntList, currentUser]);

  // Sync additional gameplay states scoped
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`flashhunt_${currentUser}_bonus_points`, String(bonusPoints));
    }
  }, [bonusPoints, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`flashhunt_${currentUser}_spent_points`, String(spentPoints));
    }
  }, [spentPoints, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`flashhunt_${currentUser}_completed_challenges`, JSON.stringify(completedChallenges));
    }
  }, [completedChallenges, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`flashhunt_${currentUser}_current_team`, currentTeam ? JSON.stringify(currentTeam) : "");
    }
  }, [currentTeam, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`flashhunt_${currentUser}_revealed_hints`, JSON.stringify(revealedHints));
    }
  }, [revealedHints, currentUser]);

  // Live logging and cooperative point integration
  const handleAddLiveLog = (text: string, points: number) => {
    const newLog: ActivityLog = {
      id: `log_${Date.now()}`,
      nickname: currentUser || "Tu",
      objectKey: "challenge",
      objectName: text,
      points: points,
      timestamp: new Date().toLocaleTimeString("ca-ES", { hour: "2-digit", minute: "2-digit" })
    };
    setDbLogs(prev => [newLog, ...prev]);

    // If currentTeam is active, we also update its points!
    if (currentTeam) {
      const updatedTeam = {
        ...currentTeam,
        points: currentTeam.points + points,
        members: currentTeam.members.map(m => {
          if (m.nickname === currentUser) {
            return { ...m, pointsContributed: m.pointsContributed + points };
          }
          return m;
        })
      };
      setCurrentTeam(updatedTeam);
    }
  };

  const handleAwardBonusPoints = (points: number, badgeName: string) => {
    setBonusPoints(prev => prev + points);
    handleAddLiveLog(`Ha superat el repte "${badgeName}"`, points);
  };

  // Triggering the request to check friend status update
  async function handleUpdateFriend(playerId: string, action: "send" | "accept" | "decline" | "remove") {
    try {
      const res = await fetch(`/api/players/${playerId}/friend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        await fetchServerStats();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Handle active captured photo submission
  async function handlePhotoCapture(base64Data: string) {
    if (!activeCaptureKey) return;
    const obj = huntList.find(o => o.key === activeCaptureKey);
    if (!obj) return;

    setIsVerifying(true);
    setActiveCaptureKey(null); // Close camera screen immediately

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          objectKey: activeCaptureKey,
          imageBase64: base64Data
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.verified) {
          playSuccessSound();
          // Log found object on feed and update team points
          handleAddLiveLog("Ha trobat " + obj.name + " (" + obj.difficulty + ")", obj.points);

          // Update local status with verified URL and details
          setHuntList(prev => prev.map(o => {
            if (o.key === activeCaptureKey) {
              return {
                ...o,
                verified: true,
                photoUrl: base64Data,
                verifyDate: "Avui, " + new Date().toLocaleTimeString("ca-ES", { hour: '2-digit', minute: '2-digit' })
              };
            }
            return o;
          }));

          setVerificationResult({
            success: true,
            reason: data.reason,
            aiUsed: data.aiUsed,
            points: obj.points,
            objectName: obj.name
          });
        } else {
          playErrorSound();
          setVerificationResult({
            success: false,
            reason: data.reason,
            aiUsed: data.aiUsed,
            points: 0,
            objectName: obj.name
          });
        }
      } else {
        throw new Error("Server error verifying photo");
      }
    } catch (err) {
      console.error(err);
      playErrorSound();
      setVerificationResult({
        success: false,
        reason: "S'ha produït un error de xarxa en connectar amb el servidor de validació de la IA. Comprova la connexió.",
        aiUsed: false,
        points: 0,
        objectName: obj.name
      });
    } finally {
      setIsVerifying(false);
    }
  }

  // Restart whole week progress
  function handleResetWeekly() {
    setConfirmDialog({
      title: lang === "en" ? "RESET WEEK PROGRESS" : lang === "es" ? "REINICIAR CAZA" : "REINICIAR CACERA",
      message: lang === "en" 
        ? "Are you absolutely sure you want to reset your weekly scavenger hunt? Your captured photos and scoreboard standings will be cleared."
        : lang === "es"
        ? "¿Seguro que quieres reiniciar tu caza del tesoro de esta semana? Se borrarán todas las fotos y puntos acumulados."
        : "Estàs segur que vols reiniciar la teva caça del tresor de la setmana d'avui? Això esborrarà totes les teves fotos i punts resolts d'aquesta sessió activa.",
      isDanger: true,
      confirmText: lang === "en" ? "RESET SET" : lang === "es" ? "REINICIAR" : "REINICIAR",
      onConfirm: () => {
        setHuntList(INITIAL_RESOURCES);
        setDuration(0);
        if (currentUser) {
          localStorage.removeItem(`flashhunt_${currentUser}_duration`);
          localStorage.removeItem(`flashhunt_${currentUser}_objects`);
          localStorage.removeItem(`flashhunt_${currentUser}_bonus_points`);
          localStorage.removeItem(`flashhunt_${currentUser}_spent_points`);
          localStorage.removeItem(`flashhunt_${currentUser}_completed_challenges`);
          localStorage.removeItem(`flashhunt_${currentUser}_current_team`);
          localStorage.removeItem(`flashhunt_${currentUser}_revealed_hints`);
        } else {
          localStorage.removeItem("flashhunt_duration");
          localStorage.removeItem("flashhunt_objects");
        }
        setConfirmDialog(null);
      }
    });
  }

  // Format time remaining
  function formatCountdown(secs: number) {
    const days = Math.floor(secs / 86400);
    const hours = Math.floor((secs % 86400) / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    return `${days}dies i ${hours}h ${minutes}m restants`;
  }

  // Loading indicator random strings
  const [loadingTip, setLoadingTip] = useState("S'està enviant la imatge...");
  useEffect(() => {
    if (isVerifying) {
      const tips = [
        "Iniciant anàlisi neuronal de la fotografia...",
        "L'algoritme de visió artificial està escanejant l'estructura de l'objecte...",
        "Examinant fons i pixels de la càmera...",
        "Validant detalls de llum i context visual en català...",
        "Verificant si hi ha elements de trampa automàtica...",
        "Comprovant presència de l'objecte amb el model de visió Gemini..."
      ];
      let idx = 0;
      const interval = setInterval(() => {
        idx = (idx + 1) % tips.length;
        setLoadingTip(tips[idx]);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [isVerifying]);

  if (!currentUser) {
    return (
      <LoginScreen
        lang={lang}
        onSetLang={handleSetLang}
        onLogin={(nick, city) => {
          localStorage.setItem("flashhunt_user", nick);
          localStorage.setItem("flashhunt_city", city);
          setCurrentUser(nick);
          setCurrentCity(city);
        }}
      />
    );
  }

  // Active game play view
  return (
    <div className="min-h-screen bg-[#F3F3F3] text-black flex flex-col justify-between selection:bg-[#CCFF00] selection:text-black font-sans">
      
      {/* Top sticky overall scores and timers bar */}
      <header className="sticky top-0 z-40 bg-[#CCFF00] border-b-4 border-black py-3.5 px-4 md:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-black text-[#CCFF00] border-2 border-black flex items-center justify-center font-black text-2xl uppercase select-none rotate-3">
              F
            </div>
            <div>
              <span className="font-black text-2xl md:text-3xl tracking-tighter leading-none uppercase italic text-black block">FlashHunt</span>
              <span className="text-[10px] font-bold tracking-widest uppercase mt-0.5 text-black flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5" /> {currentCity} • SÈRIE EXPERIMENT
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Clock display */}
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-black uppercase text-black leading-none">TEMPS RESTANT</span>
              <span className="text-xs font-black uppercase mt-1 bg-black text-white p-1 font-mono transition-colors">
                {formatCountdown(secondsRemaining)}
              </span>
            </div>

            {/* Score display block */}
            <div className="bg-black text-[#CCFF00] border-2 border-black p-2 font-black text-center flex flex-col justify-center items-end shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
              <span className="text-[9px] font-bold uppercase leading-none">PUNTS</span>
              <span className="text-xl font-black leading-none mt-0.5">{totalPoints}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main workspace frame container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 mb-24">
        
        {/* Dynamic Tab Panel contents switching */}
        {activeTab === "llista" && (
          <div id="hunt-list-tab" className="space-y-5 animate-fade-in">
            {/* Header / Intro instructions */}
            <div className="bg-white border-4 border-black p-6 text-black space-y-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-tight uppercase italic flex items-center gap-1.5 text-black">
                  <Flame className="w-6 h-6 text-black shrink-0" /> TROBA ELS 10 OBJECTES!
                </h2>
                <p className="text-black text-xs font-semibold uppercase mt-2 leading-relaxed">
                  Aquesta setmana tens deu objectes del món real. Guanya el rànking qui n'aconseguesqui <strong className="bg-[#CCFF00] px-1 border border-black">100 punts totals</strong> en el menor temps possible.
                </p>
              </div>
              <div className="flex flex-row items-center gap-4 bg-[#F3F3F3] p-3 border-2 border-black shrink-0">
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase text-gray-500">OBJECTES TROBATS</div>
                  <div className="text-xl font-black text-black">{foundCount} / 10</div>
                </div>
                {foundCount > 0 && (
                  <button
                    onClick={handleResetWeekly}
                    className="p-2 border-2 border-black bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] transition-colors cursor-pointer font-bold"
                    title="Reiniciar setmana"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* List objects grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {huntList.map((obj) => (
                <div
                  id={`item-card-${obj.key}`}
                  key={obj.key}
                  className={`border-2 border-black p-5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                    obj.verified
                      ? "bg-gray-50 border-emerald-600 text-black"
                      : "bg-white hover:bg-[#CCFF00]/10"
                  }`}
                >
                  <div className="space-y-1.5 relative z-10">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-black text-xl uppercase tracking-tight text-black flex items-center gap-1.5">
                        {obj.verified ? <span className="text-emerald-600">✓</span> : <span className="text-xs font-black text-red-655">•</span>}
                        <span>{obj.name}</span>
                      </h3>
                      {/* Difficulty and score badges */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-[9px] uppercase font-black px-2 py-0.5 border border-black ${
                          obj.difficulty === "Fàcil"
                            ? "bg-green-200 text-black"
                            : obj.difficulty === "Mitjana"
                            ? "bg-amber-200 text-black"
                            : "bg-red-200 text-black"
                        }`}>
                          {obj.difficulty}
                        </span>
                        <span className="bg-[#CCFF00] font-black text-black text-[11px] px-2 py-0.5 border border-black">
                          +{obj.points} PTS
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-700 font-bold uppercase tracking-tight mt-1">
                      {obj.desc}
                    </p>
                  </div>

                  {/* Thumbnail if user already solved it */}
                  {obj.verified && obj.photoUrl ? (
                    <div className="relative h-40 w-full border-2 border-black bg-neutral-950 group">
                      <img
                        src={obj.photoUrl}
                        alt="My capture"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-103 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                        <div className="text-[10px] uppercase font-black text-[#CCFF00]">
                          Capturat: {obj.verifyDate || "Avui"}
                        </div>
                      </div>
                      <button
                        id={`re-capture-btn-${obj.key}`}
                        onClick={() => { playScanSound(); setActiveCaptureKey(obj.key); }}
                        className="absolute right-2.5 bottom-2.5 bg-[#CCFF00] text-black font-black px-2.5 py-1.5 border-2 border-black text-xs hover:bg-white transition-colors cursor-pointer"
                      >
                        REFAU FOTO
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {/* Hunt action triggers */}
                      <button
                        id={`hunt-object-${obj.key}`}
                        onClick={() => { playScanSound(); setActiveCaptureKey(obj.key); }}
                        className="w-full bg-[#CCFF00] hover:bg-white text-black font-black border-2 border-black py-3 rounded-none text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
                      >
                        <Camera className="w-4 h-4 text-black shrink-0" /> 
                        Fes foto per validar
                      </button>

                      {/* Optional Hints with progressive disclosure & point cost deduction */}
                      <div className="pt-2 border-t border-black/15 text-black">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-black uppercase text-gray-500 flex items-center gap-1 leading-none select-none">
                            <HelpCircle className="w-3.5 h-3.5" /> Pistes d'Ubicació i trucs
                          </span>
                          <span className="text-[9px] bg-black text-[#CCFF00] font-black px-1.5 py-0.5 uppercase leading-none select-none">
                            OPCIONAL
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          {OBJECT_HINTS[obj.key]?.map((hint, idx) => {
                            const isRevealed = revealedHints[obj.key]?.includes(idx);
                            return (
                              <div key={idx} className="p-2 border-2 border-black bg-[#F8F8F8] text-[11px] font-bold uppercase transition-all">
                                {isRevealed ? (
                                  <div className="text-gray-900 leading-normal font-bold">
                                    💡 {hint.clue}
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-gray-500 font-extrabold text-[9px] select-none uppercase">PISTA #{idx + 1} ({hint.cost} PTS)</span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (totalPoints < hint.cost) {
                                          setConfirmDialog({
                                            title: lang === "en" ? "INSUFFICIENT SCORE" : lang === "es" ? "PUNTOS INSUFICIENTES" : "PUNTS INSUFICIENTS",
                                            message: lang === "en"
                                              ? "You do not have enough points to unlock this scavenger hint! Go hunt objects or complete weekly challenges first."
                                              : lang === "es"
                                              ? "¡No tienes suficientes puntos para revelar esta pista! Consigue más cazando objetos o completando retos."
                                              : "No tens suficients punts per desbloquejar aquesta pista de caça! Aconsegueix-ne més caçant objectes o resolvent els reptes setmanals.",
                                            confirmText: "D'acord",
                                            onConfirm: () => setConfirmDialog(null)
                                          });
                                          return;
                                        }
                                        setConfirmDialog({
                                          title: lang === "en" ? "UNLOCK HINT" : lang === "es" ? "REVELAR PISTA" : "DESBLOQUEJAR PISTA",
                                          message: lang === "en"
                                            ? `Do you want to spend ${hint.cost} points of your score to unlock this scavenger hint?`
                                            : lang === "es"
                                            ? `¿Quieres gastar ${hint.cost} puntos de tu puntuación para revelar esta pista de ayuda?`
                                            : `Vols gastar ${hint.cost} punts de la teva puntuació per desbloquejar aquesta pista d'ajuda sobre "${obj.name}"?`,
                                          confirmText: lang === "en" ? "SPEND POINTS" : lang === "es" ? "GASTAR PUNTOS" : "REVELAR",
                                          onConfirm: () => {
                                            setSpentPoints(prev => prev + hint.cost);
                                            setRevealedHints(prev => {
                                              const current = prev[obj.key] || [];
                                              return {
                                                ...prev,
                                                [obj.key]: [...current, idx]
                                              };
                                            });
                                            handleAddLiveLog(`Ha desbloquejat una pista de caça per a "${obj.name}"`, -hint.cost);
                                            setConfirmDialog(null);
                                          }
                                        });
                                      }}
                                      className="px-2 py-0.5 bg-black hover:bg-[#CCFF00] text-[#CCFF00] hover:text-black border border-black text-[9px] tracking-tight font-black uppercase transition-all cursor-pointer"
                                    >
                                      Desbloquejar
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "cooperatiu" && (
          <TeamManagement
            currentUsername={currentUser || ""}
            currentUserPoints={totalPoints}
            currentTeam={currentTeam}
            onSetTeam={setCurrentTeam}
            onAddLog={handleAddLiveLog}
          />
        )}

        {activeTab === "reptes" && (
          <ChallengesSection
            huntList={huntList}
            onAwardBonusPoints={handleAwardBonusPoints}
            completedChallengesHistory={completedChallenges}
            onSetCompletedChallenges={setCompletedChallenges}
          />
        )}

        {activeTab === "social" && (
          <SocialTab
            currentUsername={currentUser}
            currentUserCity={currentCity || "Barcelona"}
            currentUserPoints={totalPoints}
            currentUserFoundCount={foundCount}
            currentUserDuration={duration}
            players={dbPlayers}
            logs={dbLogs}
            onUpdateFriendStatus={handleUpdateFriend}
          />
        )}

        {activeTab === "mosaic" && (
          <ProfileMosaic
            nickname={currentUser || ""}
            city={currentCity || "Barcelona"}
            points={totalPoints}
            durationSeconds={duration}
            huntObjects={huntList}
            lang={lang}
            onSetLang={handleSetLang}
            streak={streak}
            onLogout={handleLogout}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {activeTab === "instruccions" && (
          <div id="instructions-tab" className="space-y-6 animate-fade-in text-black font-sans max-w-2xl mx-auto">
            <div className="bg-white border-4 border-black p-6 space-y-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black text-black uppercase italic tracking-tight flex items-center gap-1.5 border-b-2 border-black pb-3">
                <BookOpen className="w-6 h-6 text-black shrink-0" /> Guia Oficial del Caçador
              </h2>

              <div className="space-y-4 text-xs md:text-sm text-neutral-800 leading-relaxed font-bold uppercase">
                <div>
                  <h3 className="font-black text-black mb-2 flex items-center gap-2">
                    <Sparkles className="w-4.5 h-4.5 text-black" /> Com funciona la validació de IA reals?
                  </h3>
                  <p className="text-gray-600 font-medium lowercase first-letter:uppercase">
                    Al contrari que altres plataformes que es basen en respostes falses, FlashHunt utilitza el SDK neuronal Gemini 3.5 de Google per fer un escaneig i validació estricta instantània de cada pixel capturat.
                  </p>
                  <p className="mt-2 text-[#CCFF00] bg-black p-2 border border-black inline-block font-black tracking-tight select-none">
                    SEMAFOR VERMELL? DETECTAT. GOS REAL? SÍ, SENSE ENGANYS.
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-black mb-1.5 flex items-center gap-2">
                    <Trophy className="w-4.5 h-4.5 text-black" /> Rànking i Competició d’amics
                  </h3>
                  <p className="text-gray-600 font-medium lowercase first-letter:uppercase">
                    Es mantenen actualitzats els participants que cerquen elements actius en diferents pobles i ciutats de Catalunya simultàniament. Envia'ls sol·licituds i veuràs com responen ràpid !
                  </p>
                </div>
              </div>
            </div>

            {/* Change Profile details block */}
            <div className="bg-white border-4 border-black p-5 space-y-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-lg font-black uppercase italic flex items-center gap-1.5 text-black">
                <User className="w-5 h-5 text-black" /> Configuració d'Usuari
              </h3>
              <p className="text-xs text-neutral-700 font-medium">
                Vols canviar el teu àlies o traslladar-te a viure a una altra ciutat de Catalunya? Pots fer-ho lliurement prement el botó de reiniciar les dades del perfil d'onboarding.
              </p>
              <button
                id="reset-profile-btn"
                onClick={() => {
                  setConfirmDialog({
                    title: lang === "en" ? "PURGE DEVICE ACCOUNTS" : lang === "es" ? "BORRAR CUENTA" : "ESBORRAR COMPTE",
                    message: lang === "en"
                      ? "This will delete all saved accounts, local histories, and weekly scavenger hunts off this browser container permanently."
                      : lang === "es"
                      ? "Esta acción borrará todas tus cuentas, fotos locales e historial guardados en este dispositivo de forma irreversible."
                      : "Si continues es desconnectarà el teu perfil i perdràs de manera permanent totes les dades desades al local storage d'aquest dispositiu.",
                    isDanger: true,
                    confirmText: lang === "en" ? "PURGE ALL" : lang === "es" ? "ELIMINAR" : "ELIMINAR",
                    onConfirm: () => {
                      localStorage.clear();
                      window.location.reload();
                    }
                  });
                }}
                className="bg-red-100 hover:bg-neutral-900 hover:text-white text-red-700 font-black border-2 border-black px-4 py-2 text-xs transition-colors cursor-pointer uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Esborrar tot el perfil d'usuari
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Visual Feedback on verification overlays */}
      {isVerifying && (
        <div id="verifying-loading-overlay" className="fixed inset-0 z-50 bg-black/80 flex flex-col justify-center items-center p-4 backdrop-blur-sm">
          <div className="bg-white border-4 border-black p-8 rounded-none max-w-sm text-center space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black relative">
            <div className="relative w-16 h-16 mx-auto">
              <RefreshCw className="w-16 h-16 text-black animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-6 h-6 text-black animate-pulse" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-black uppercase tracking-tight">VERIFICANT IMATGE PER IA...</h3>
              <p className="text-xs text-neutral-705 leading-relaxed font-bold uppercase bg-amber-100 p-2 border border-black">
                {loadingTip}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Verification Result Modal dialog */}
      {verificationResult && (
        <div id="verify-result-modal" className="fixed inset-0 z-50 bg-black/80 flex flex-col justify-center items-center p-4 backdrop-blur-sm">
          <div className="bg-white border-4 border-black p-6 md:p-8 rounded-none max-w-md w-full text-center space-y-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-black">
            
            <div className="mx-auto w-16 h-16 border-2 border-black flex items-center justify-center font-black text-2xl" style={{
              backgroundColor: verificationResult.success ? "#CCFF00" : "#ffccd4"
            }}>
              {verificationResult.success ? (
                <CheckCircle2 className="w-10 h-10 text-black" />
              ) : (
                <XCircle className="w-10 h-10 text-black" />
              )}
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-black text-neutral-500 tracking-widest block">
                VEREDICTE DE L'OBJECTE: {verificationResult.objectName}
              </span>
              <h3 className="text-2xl font-black uppercase italic leading-none">
                {verificationResult.success ? "VERIFICACIÓ REEIXIDA! 🎉" : "UPS! VERIFICACIÓ FALLIDA ❌"}
              </h3>
            </div>

            <div className="bg-[#F3F3F3] p-4 border-2 border-black text-xs text-black font-bold uppercase leading-relaxed text-left">
              {verificationResult.reason}
            </div>

            {verificationResult.success && (
              <div className="bg-[#CCFF00] border-2 border-black text-black font-black py-2 px-4 text-xs flex items-center justify-center gap-1.5 uppercase">
                <Trophy className="w-4 h-4 text-black" />
                <span>Has aconseguit els +{verificationResult.points} punts reals!</span>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <button
                id="close-feedback-btn"
                onClick={() => setVerificationResult(null)}
                className="w-full bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] border-2 border-black text-black font-black py-3 rounded-none transition-all cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,1)] uppercase text-xs"
              >
                D'acord, continuar
              </button>
              
              {!verificationResult.success && (
                <button
                  id="retry-quick-capture-btn"
                  onClick={() => {
                    const targetKey = huntList.find(o => o.name === verificationResult.objectName)?.key;
                    setVerificationResult(null);
                    if (targetKey) {
                      playScanSound();
                      setActiveCaptureKey(targetKey);
                    }
                  }}
                  className="w-full bg-[#F3F3F3] hover:bg-white text-black border-2 border-black py-3 rounded-none text-xs transition-all font-black uppercase cursor-pointer"
                >
                  Torna-ho a provar immediatament
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Interactive Camera Capture Module Overlay Overlay */}
      {activeCaptureKey && (
        <CameraCapture
          objectName={huntList.find(o => o.key === activeCaptureKey)?.name || ""}
          onCapture={handlePhotoCapture}
          onClose={() => setActiveCaptureKey(null)}
        />
      )}

      {/* Styled bottom navigation helper for mobile screens */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-black border-t-4 border-black pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom,12px))] px-3 shadow-[0_-8px_16px_rgba(0,0,0,0.35)]">
        <div className="max-w-xl mx-auto grid grid-cols-6 items-center justify-items-center text-neutral-400 gap-1 no-scrollbar overflow-x-auto w-full">
          <button
            id="nav-llista-btn"
            onClick={() => { playBeep(); setActiveTab("llista"); }}
            className={`w-full flex flex-col items-center gap-1 transition-all py-1 ${
              activeTab === "llista" ? "text-[#CCFF00] font-black scale-103" : "text-neutral-400 hover:text-white cursor-pointer"
            }`}
          >
            <Camera className="w-4.5 h-4.5 shrink-0" />
            <span className="text-[9px] uppercase font-black tracking-tight text-center leading-none">{t.hunting}</span>
          </button>

          <button
            id="nav-reptes-btn"
            onClick={() => { playBeep(); setActiveTab("reptes"); }}
            className={`w-full flex flex-col items-center gap-1 transition-all py-1 ${
              activeTab === "reptes" ? "text-[#CCFF00] font-black scale-103" : "text-neutral-400 hover:text-white cursor-pointer"
            }`}
          >
            <Zap className="w-4.5 h-4.5 shrink-0" />
            <span className="text-[9px] uppercase font-black tracking-tight text-center leading-none">{t.challenges}</span>
          </button>

          <button
            id="nav-coop-team-btn"
            onClick={() => { playBeep(); setActiveTab("cooperatiu"); }}
            className={`w-full flex flex-col items-center gap-1 transition-all py-1 relative ${
              activeTab === "cooperatiu" ? "text-[#CCFF00] font-black scale-103" : "text-neutral-400 hover:text-white cursor-pointer"
            }`}
          >
            <Users className="w-4.5 h-4.5 shrink-0" />
            <span className="text-[9px] uppercase font-black tracking-tight text-center leading-none">{t.team}</span>
            {currentTeam && (
              <span className="absolute top-1 right-2 w-1.5 h-1.5 bg-[#CCFF00] rounded-full border border-black" />
            )}
          </button>

          <button
            id="nav-social-btn"
            onClick={() => { playBeep(); setActiveTab("social"); }}
            className={`w-full flex flex-col items-center gap-1 transition-all py-1 ${
              activeTab === "social" ? "text-[#CCFF00] font-black scale-103" : "text-neutral-400 hover:text-white cursor-pointer"
            }`}
          >
            <Trophy className="w-4.5 h-4.5 shrink-0" />
            <span className="text-[9px] uppercase font-black tracking-tight text-center leading-none">{t.ranking}</span>
          </button>

          <button
            id="nav-mosaic-btn"
            onClick={() => { playBeep(); setActiveTab("mosaic"); }}
            className={`w-full flex flex-col items-center gap-1 transition-all py-1 ${
              activeTab === "mosaic" ? "text-[#CCFF00] font-black scale-103" : "text-neutral-400 hover:text-white cursor-pointer"
            }`}
          >
            <User className="w-4.5 h-4.5 shrink-0" />
            <span className="text-[9px] uppercase font-black tracking-tight text-center leading-none">{t.mosaic}</span>
          </button>

          <button
            id="nav-instructions-btn"
            onClick={() => { playBeep(); setActiveTab("instruccions"); }}
            className={`w-full flex flex-col items-center gap-1 transition-all py-1 ${
              activeTab === "instruccions" ? "text-[#CCFF00] font-black scale-103" : "text-neutral-400 hover:text-white cursor-pointer"
            }`}
          >
            <BookOpen className="w-4.5 h-4.5 shrink-0" />
            <span className="text-[9px] uppercase font-black tracking-tight text-center leading-none">{t.guide}</span>
          </button>
        </div>
      </footer>

      {/* Unified custom in-app neobrutalist confirmation dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 z-55 bg-black/85 flex flex-col justify-center items-center p-4 backdrop-blur-xs animate-fade-in text-black">
          <div className="bg-white border-4 border-black p-6 rounded-none max-w-sm w-full text-left space-y-4 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 border-b-2 border-black pb-2 text-black">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 animate-pulse" />
              <h4 className="text-xs font-black uppercase tracking-wider">{confirmDialog.title || (lang === "en" ? "CONFIRM OPERATION" : lang === "es" ? "CONFIRMAR ACCIÓN" : "CONFIRMA ACCIÓ")}</h4>
            </div>
            
            <p className="text-[11px] font-bold uppercase text-neutral-800 leading-relaxed">
              {confirmDialog.message}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1 pb-0.5">
              <button
                type="button"
                onClick={() => {
                  playBeep();
                  if (confirmDialog.onCancel) confirmDialog.onCancel();
                  setConfirmDialog(null);
                }}
                className="py-2.5 px-3 border-2 border-black bg-neutral-100 hover:bg-neutral-200 text-black text-[10px] font-black uppercase text-center cursor-pointer transition-colors"
              >
                {confirmDialog.cancelText || (lang === "en" ? "CANCEL" : "CANCEL·LAR")}
              </button>
              <button
                type="button"
                onClick={() => {
                  playBeep();
                  confirmDialog.onConfirm();
                }}
                className={`py-2.5 px-3 border-2 border-black text-[#CCFF00] text-[10px] font-black uppercase text-center cursor-pointer transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 ${
                  confirmDialog.isDanger ? "bg-red-600 text-white hover:bg-red-750" : "bg-black hover:bg-[#CCFF00] hover:text-black"
                }`}
              >
                {confirmDialog.confirmText || (lang === "en" ? "CONFIRM" : "CONFIRMAR")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Push Toast Notification Overlay system */}
      <div id="pushed-notifications-container" className="fixed top-24 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white border-3 border-black p-3.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] transition-all flex items-start gap-2.5 leading-tight duration-200 animate-fade-in"
            style={{ borderLeftWidth: "12px", borderLeftColor: toast.type === "success" ? "#CCFF00" : toast.type === "like" ? "#EF4444" : toast.type === "friend" ? "#3B82F6" : toast.type === "team" ? "#10B981" : "#000000" }}
          >
            <div className="p-1 rounded-none bg-neutral-100 border border-black text-black">
              {toast.type === "success" ? <Trophy className="w-4 h-4 text-black shrink-0" /> :
               toast.type === "like" ? <Heart className="w-4 h-4 text-red-500 fill-red-500 shrink-0" /> :
               toast.type === "friend" ? <UserPlus className="w-4 h-4 text-blue-500 shrink-0" /> :
               toast.type === "team" ? <Users className="w-4 h-4 text-emerald-600 shrink-0" /> :
               <Bell className="w-4 h-4 text-black shrink-0" />}
            </div>
            <div className="flex-1 space-y-0.5 text-black">
              <span className="font-extrabold text-[10px] tracking-wider uppercase block text-black">{toast.title}</span>
              <p className="text-[11px] font-bold text-gray-800 uppercase leading-snug">{toast.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Week Round Finished Overlay taking over the space block when timer expires */}
      {secondsRemaining <= 0 && (
        <div id="round-ended-full-overlay" className="fixed inset-0 z-50 bg-[#F3F3F3] flex flex-col items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-md w-full bg-white border-4 border-black p-6 space-y-5 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-black">
            
            <div className="inline-block bg-black text-[#CCFF00] font-black border-2 border-black rotate-[-2deg] px-4 py-1.5 text-sm uppercase tracking-widest animate-pulse">
              🏆 RONDA EXPIRADA 🏆
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter text-black leading-none">TEMPS EXHAURIT</h2>
              <p className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase">Cicle de recerca de 7 dies finalitzat amb èxit</p>
            </div>

            <div className="border-4 border-black bg-[#CCFF00] p-4 font-black space-y-1 text-center select-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-[10px] uppercase font-bold text-neutral-800 block">PUNTUACIÓ TOTAL ACUMULADA</span>
              <span className="text-5xl font-black font-mono block text-black">{totalPoints} PTS</span>
              <span className="text-xs uppercase text-black inline-block bg-black text-[#CCFF00] px-2 py-0.5 mt-1 font-bold">
                🚀 SÈRIE DE CAÇA: {streak} SETMANES!
              </span>
            </div>

            <div className="border-2 border-black p-4 bg-neutral-50 text-left space-y-2.5">
              <span className="text-[10px] font-black uppercase text-black tracking-wider block border-b border-black pb-1">RESULTATS DEL TEU MOSAIC</span>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-extrabold uppercase align-middle">
                <div className="text-gray-700">OBJECTES CONFIRMATS:</div>
                <div className="text-right text-black">{huntList.filter(o => o.verified).length} / {huntList.length}</div>

                <div className="text-neutral-700">REPTES RESOLTS:</div>
                <div className="text-right text-black">{completedChallenges.length} REPTES</div>

                <div className="text-neutral-700">EQUIP COOPERATIU:</div>
                <div className="text-right text-black">{currentTeam ? `${currentTeam.name}` : "CAP"}</div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-[11px] font-black uppercase leading-relaxed text-neutral-850">
                L'oficina de comptadors municipals ha guardat el teu historial rànquing. Prem a sota per iniciar la següent ronda de 17 objectes específics de debò i augmentar la teva ratxa!
              </p>
              
              <button
                onClick={() => {
                  playSuccessSound();
                  // Reset all verified state to restart the hunt
                  setHuntList(prev => prev.map(o => ({ ...o, verified: false, photoUrl: undefined, verifyDate: undefined })));
                  // Reset timer back to another 7 days (604800 seconds)
                  setSecondsRemaining(604800);
                  // Increment streak!
                  const nextStreak = streak + 1;
                  setStreak(nextStreak);
                  localStorage.setItem("flashhunt_streak", String(nextStreak));
                  
                  // Reset bonusPoints
                  setBonusPoints(0);
                  setSpentPoints(0);
                  setCompletedChallenges([]);
                  localStorage.setItem(`flashhunt_${currentUser}_completed_challenges`, JSON.stringify([]));
                  localStorage.setItem(`flashhunt_${currentUser}_bonus_points`, "0");
                  localStorage.setItem(`flashhunt_${currentUser}_spent_points`, "0");

                  triggerNotification("🌟 RÈCORD I NOVA RONDA", "La teva ratxa oficial s'ha estès! Nous objectes i temps actualitzats.", "success");
                }}
                className="w-full py-3 border-3 border-black bg-black text-[#CCFF00] text-xs font-black uppercase text-center cursor-pointer transition-colors shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] hover:bg-[#CCFF00] hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                🎮 INICIAR NOVA RONDA DE REPTES (+1 SÈRIE)
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
