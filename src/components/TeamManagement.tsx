import React, { useState, useEffect } from "react";
import { Users, Shield, Plus, Key, Trophy, Target, ArrowRight, Sparkles, UserPlus, Flame } from "lucide-react";
import { Team, TeamMember } from "../types";
import { Lang } from "../translations";

interface TeamManagementProps {
  currentUsername: string;
  currentUserPoints: number;
  currentTeam: Team | null;
  onSetTeam: (team: Team | null) => void;
  onAddLog: (text: string, points: number) => void;
  lang: Lang;
}

const INITIAL_TEAMS: Team[] = [
  {
    id: "team_senglars",
    name: "Senglars del Montseny",
    passcode: "1234",
    targetScore: 500,
    points: 320,
    members: [
      {
        nickname: "OriolGirona",
        pointsContributed: 140,
        joinedAt: "Fa 2 dies",
        avatarBg: "bg-amber-200"
      },
      {
        nickname: "NuriaVic",
        pointsContributed: 180,
        joinedAt: "Ahir",
        avatarBg: "bg-blue-200"
      }
    ]
  },
  {
    id: "team_dracs",
    name: "Dracs de Gràcia",
    targetScore: 300,
    points: 185,
    members: [
      {
        nickname: "LaiaValles",
        pointsContributed: 185,
        joinedAt: "Fa 3 dies",
        avatarBg: "bg-purple-200"
      }
    ]
  },
  {
    id: "team_super",
    name: "Cercadors Terres de l'Ebre",
    targetScore: 1000,
    points: 410,
    members: [
      {
        nickname: "SenglarHunter",
        pointsContributed: 410,
        joinedAt: "Fa 5 dies",
        avatarBg: "bg-emerald-200"
      }
    ]
  }
];

export default function TeamManagement({
  currentUsername,
  currentUserPoints,
  currentTeam,
  onSetTeam,
  onAddLog,
  lang
}: TeamManagementProps) {
  const T = {
    ca: {
      title: "MODO COOPERATIU: EN EQUIPS",
      intro: "Uneix forces amb altres jugadors reals o amics de Catalunya per completar la llista setmanal. Els punts sumen col·lectivament cap a la vostra fita setmanal!",
      exploreTab: "Explora Rànking d'equips",
      myTeamTab: "El Meu Equip",
      rankingTitle: "Líders de Rànking de Cooperació Col·lectiva",
      membersCount: (count: number, target: number) => `${count} caçadors actius • Objectiu col·lectiu de ${target} PTS`,
      private: "Privat",
      mine: "El meu",
      enterPass: (name: string) => `Introdueix la clau de seguretat privat per unir-te a l'equip "${name}":`,
      accessBtn: "Accedir",
      joinBtn: "Uneix-te",
      memberLabel: "Membre",
      fundaTitle: "Funda un Nou Equip",
      teamNameLabel: "NOM DE L’EQUIP",
      teamNamePlaceholder: "Ex. Senglars del Montseny",
      passcodeLabel: "CLAU DE PAS DE SEGURETAT (OPCIONAL)",
      passcodePlaceholder: "Clau numèrica per fer-lo privat",
      targetLabel: "FITA / TARGET SETMANAL DE PUNTS",
      targetOptionModerated: "300 Punts (Mètode Moderat)",
      targetOptionStandard: "500 Punts (Competició Estàndard)",
      targetOptionElite: "1000 Punts (Mètode Elit Extrema)",
      createBtnAlready: "Ja pertanys a un equip",
      createBtnSubmit: "Crear i unirte",
      teamConfigured: "EL TEU EQUIP CONFIGURAT",
      weeklyGoal: "FITA SETMANAL COOPERATIVA",
      activeMembers: "Membres Actius",
      leaveBtn: "Abandonar Equip",
      squadMembers: (count: number) => `Membres de la Esquadra (${count})`,
      youLabel: "Tu",
      joinedAt: (time: string) => `S'ha unit: ${time}`,
      directivesTitle: "Directrius d'Equip Co-op",
      directive1: "Qualsevol objecte que verifiquis des de la teva pestanya \"Caçar\" sumarà immediatament de forma directa al fons col·lectiu!",
      directive2: "Els punts són col·lectius: l'equip es guanya la victòria conjunta en assolir la fita de punts setmanals abans de diumenge!",
      directive3: "Comparteix el nom de l'equip i la clau de pas amb altres jugadors per muntar una estratègia invencible.",
      authorizedGroup: "GRUP AUTORITZAT PER ALTA VELOCITAT DE VISIÓ IA",
      leaveConfirmTitle: "ABANDONAR EQUIP",
      leaveConfirmText: (name: string) => `Segur que vols abandonar l'equip cooperatiu "${name}"? Les teves contribucions individuals de punts sortiran del fons col·lectiu actiu.`,
      cancelBtn: "Tornar Enrere",
      confirmBtn: "CONFIRMAR",
      incorrectPass: (name: string) => "Clau de pas de seguretat incorrecta pel Team " + name,
      instantNow: "Ara mateix",
      createdTeamLog: (name: string) => `Ha creat l'equip de cooperatiu d'alt rendiment: ${name}`,
      joinedTeamLog: (name: string) => `S'ha unit amb èxit a l'equip cooperatiu ${name}!`
    },
    en: {
      title: "COOPERATIVE MODE: IN TEAMS",
      intro: "Join forces with other real players or friends to complete the weekly list. Points contribute collectively toward your weekly target!",
      exploreTab: "Explore Teams Ranking",
      myTeamTab: "My Team",
      rankingTitle: "Cooperative Leaderboard & Rankings",
      membersCount: (count: number, target: number) => `${count} active hunters • Collective target of ${target} PTS`,
      private: "Private",
      mine: "Mine",
      enterPass: (name: string) => `Enter the private passcode to join team "${name}":`,
      accessBtn: "Access",
      joinBtn: "Join",
      memberLabel: "Member",
      fundaTitle: "Found a New Team",
      teamNameLabel: "TEAM NAME",
      teamNamePlaceholder: "E.g. Scavenger Titans",
      passcodeLabel: "SECURITY PASSCODE (OPTIONAL)",
      passcodePlaceholder: "Passcode to make it private",
      targetLabel: "WEEKLY TARGET SCORE",
      targetOptionModerated: "300 Points (Moderate)",
      targetOptionStandard: "500 Points (Standard Competition)",
      targetOptionElite: "1000 Points (Extreme Elite)",
      createBtnAlready: "Already in a team",
      createBtnSubmit: "Create and Join",
      teamConfigured: "YOUR TEAM IN PLAY",
      weeklyGoal: "COOPERATIVE WEEKLY OBJECTIVE",
      activeMembers: "Active Members",
      leaveBtn: "Leave Team",
      squadMembers: (count: number) => `Squad Members (${count})`,
      youLabel: "You",
      joinedAt: (time: string) => `Joined: ${time === "Ara mateix" ? "Just now" : time}`,
      directivesTitle: "Co-op Team Directives",
      directive1: "Any object you verify under your \"Hunt\" tab will add directly to your collective score fund in real-time!",
      directive2: "Points are collective: the team achieves victory by hitting the weekly milestone before Sunday!",
      directive3: "Share your team name and passcode with teammates to build an undefeated custom strategy.",
      authorizedGroup: "HIGH-SPEED AI SCAVENGER AUTHORIZED BRIGADE",
      leaveConfirmTitle: "LEAVE TEAM",
      leaveConfirmText: (name: string) => `Are you sure you want to leave the cooperative team "${name}"? Your individual score contributions will be deducted from the active collective pool.`,
      cancelBtn: "Go Back",
      confirmBtn: "CONFIRM",
      incorrectPass: (name: string) => "Incorrect passcode for Team " + name,
      instantNow: "Just now",
      createdTeamLog: (name: string) => `Created cooperative team: ${name}`,
      joinedTeamLog: (name: string) => `Successfully joined the cooperative team ${name}!`
    },
    es: {
      title: "MODO COOPERATIVO: EN EQUIPOS",
      intro: "Une fuerzas con otros jugadores reales o amigos de Catalunya para completar la lista semanal. ¡Los puntos sumados se acumulan colectivamente hacia vuestro objetivo semanal!",
      exploreTab: "Explorar Ranking de Equipos",
      myTeamTab: "Mi Equipo",
      rankingTitle: "Líderes de Ranking de Cooperación Colectiva",
      membersCount: (count: number, target: number) => `${count} cazadores activos • Objetivo colectivo de ${target} PTS`,
      private: "Privado",
      mine: "Mío",
      enterPass: (name: string) => `Introduce la contraseña de seguridad para unirte al equipo "${name}":`,
      accessBtn: "Acceder",
      joinBtn: "Unirse",
      memberLabel: "Miembro",
      fundaTitle: "Funda un Nuevo Equipo",
      teamNameLabel: "NOMBRE DEL EQUIPO",
      teamNamePlaceholder: "Ej. Jaguares de Montserrat",
      passcodeLabel: "CONTRASEÑA DE SEGURIDAD (OPCIONAL)",
      passcodePlaceholder: "Contraseña para hacerlo privado",
      targetLabel: "META / TARGET SEMANAL DE PUNTOS",
      targetOptionModerated: "300 Puntos (Método Moderado)",
      targetOptionStandard: "500 Puntos (Competición Estándar)",
      targetOptionElite: "1000 Puntos (Método Elite Extrema)",
      createBtnAlready: "Ya perteneces a un equipo",
      createBtnSubmit: "Crear y unirse",
      teamConfigured: "TU EQUIPO CONFIGURADO",
      weeklyGoal: "META SEMANAL COOPERATIVA",
      activeMembers: "Miembros Activos",
      leaveBtn: "Abandonar Equipo",
      squadMembers: (count: number) => `Miembros de la Escuadra (${count})`,
      youLabel: "Tú",
      joinedAt: (time: string) => `Se unió: ${time === "Ara mateix" ? "Ahora mismo" : time}`,
      directivesTitle: "Directrices de Equipo Co-op",
      directive1: "¡Cualquier objeto que verifiques desde tu pestaña \"Cazar\" sumará inmediatamente al fondo colectivo!",
      directive2: "Los puntos son colectivos: ¡el equipo consigue la victoria conjunta al alcanzar la meta de puntos semanales antes del domingo!",
      directive3: "Comparte el nombre de tu equipo y la contraseña con otros jugadores para coordinar una estrategia ganadora.",
      authorizedGroup: "GRUPO AUTORIZADO PARA ALTA VELOCIDAD DE VISIÓN IA",
      leaveConfirmTitle: "ABANDONAR EQUIPO",
      leaveConfirmText: (name: string) => `¿Seguro que quieres abandonar el equipo cooperativo "${name}"? Tus puntuaciones individuales se restarán del fondo colectivo activo.`,
      cancelBtn: "Volver Atrás",
      confirmBtn: "CONFIRMAR",
      incorrectPass: (name: string) => "Contraseña de seguridad incorrecta para el Team " + name,
      instantNow: "Ahora mismo",
      createdTeamLog: (name: string) => `Ha creado el equipo cooperativo: ${name}`,
      joinedTeamLog: (name: string) => `¡Se ha unido con éxito al equipo cooperativo ${name}!`
    }
  };

  const dict = T[lang] || T.ca;

  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem("flashhunt_all_teams_prod");
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });

  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamPasscode, setNewTeamPasscode] = useState("");
  const [targetScore, setTargetScore] = useState(500);

  const [joinTeamName, setJoinTeamName] = useState("");
  const [joinPasscode, setJoinPasscode] = useState("");
  const [joinError, setJoinError] = useState("");
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  const [activeSubView, setActiveSubView] = useState<"el_meu_equip" | "llista_equips">(() => {
    return currentTeam ? "el_meu_equip" : "llista_equips";
  });

  // Keep teams in sync with local storage
  useEffect(() => {
    localStorage.setItem("flashhunt_all_teams_prod", JSON.stringify(teams));
  }, [teams]);

  // Keep user team updated if teammate points change
  useEffect(() => {
    if (currentTeam) {
      const match = teams.find(t => t.id === currentTeam.id);
      if (match && JSON.stringify(match) !== JSON.stringify(currentTeam)) {
        onSetTeam(match);
      }
    }
  }, [teams, currentTeam, onSetTeam]);

  // Handle Team Creation
  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    const newTeam: Team = {
      id: `team_${Date.now()}`,
      name: newTeamName.trim(),
      passcode: newTeamPasscode.trim() || undefined,
      targetScore: targetScore,
      points: currentUserPoints,
      members: [
        {
          nickname: currentUsername,
          pointsContributed: currentUserPoints,
          joinedAt: dict.instantNow,
          avatarBg: "bg-yellow-200"
        }
      ]
    };

    setTeams(prev => [...prev, newTeam]);
    onSetTeam(newTeam);
    setActiveSubView("el_meu_equip");
    onAddLog(dict.createdTeamLog(newTeam.name), 15);

    // Clear inputs
    setNewTeamName("");
    setNewTeamPasscode("");
  };

  // Handle Joining an Existing Team
  const handleJoinTeam = (teamId: string, customPass?: string) => {
    setJoinError("");
    const target = teams.find(t => t.id === teamId);
    if (!target) return;

    if (target.passcode && target.passcode !== customPass) {
      setJoinError(dict.incorrectPass(target.name));
      return;
    }

    // Check if copy has username already
    const isAlreadyMember = target.members.some(m => m.nickname === currentUsername);
    let updatedMembers = [...target.members];
    if (!isAlreadyMember) {
      updatedMembers.push({
        nickname: currentUsername,
        pointsContributed: currentUserPoints,
        joinedAt: dict.instantNow,
        avatarBg: "bg-emerald-200"
      });
    }

    const updatedTeam: Team = {
      ...target,
      points: target.points + (isAlreadyMember ? 0 : currentUserPoints),
      members: updatedMembers
    };

    setTeams(prev => prev.map(t => t.id === teamId ? updatedTeam : t));
    onSetTeam(updatedTeam);
    setActiveSubView("el_meu_equip");
    onAddLog(dict.joinedTeamLog(updatedTeam.name), 10);
  };

  const handleLeaveTeam = () => {
    setShowLeaveConfirm(true);
  };

  const handleLeaveTeamConfirm = () => {
    if (!currentTeam) return;

    const match = teams.find(t => t.id === currentTeam.id);
    if (match) {
      const remainingMembers = match.members.filter(m => m.nickname !== currentUsername);
      const updatedTeam: Team = {
        ...match,
        points: Math.max(0, match.points - currentUserPoints),
        members: remainingMembers
      };
      setTeams(prev => {
        const next = prev.map(t => t.id === currentTeam.id ? updatedTeam : t);
        // Delete empty teams
        return next.filter(t => t.members.length > 0);
      });
    }
    onSetTeam(null);
    setActiveSubView("llista_equips");
    setShowLeaveConfirm(false);
  };

  // Safe calculated progress percentage
  const currentRatio = currentTeam ? Math.min(100, Math.round((currentTeam.points / currentTeam.targetScore) * 100)) : 0;

  // Sorted team leaderboards list
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points).map((t, idx) => ({ ...t, rank: idx + 1 }));

  return (
    <div id="team-coop-container" className="space-y-6 font-sans text-black animate-fade-in">
      
      {/* Introduction banner */}
      <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black">
        <h2 className="text-2xl font-black uppercase italic tracking-tight mb-2 flex items-center gap-2">
          <Users className="text-black w-6 h-6 shrink-0" /> {dict.title}
        </h2>
        <p className="text-xs font-semibold uppercase text-gray-700">
          {dict.intro}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-black pb-1 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubView("llista_equips")}
          className={`px-4 py-2 text-xs font-black uppercase border-2 transition-all shrink-0 ${
            activeSubView === "llista_equips"
              ? "bg-[#CCFF00] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              : "border-transparent text-gray-500 hover:text-black hover:bg-gray-100 cursor-pointer"
          }`}
        >
          {dict.exploreTab}
        </button>

        {currentTeam && (
          <button
            onClick={() => setActiveSubView("el_meu_equip")}
            className={`px-4 py-2 text-xs font-black uppercase border-2 transition-all shrink-0 ${
              activeSubView === "el_meu_equip"
                ? "bg-[#CCFF00] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                : "border-transparent text-gray-500 hover:text-black hover:bg-gray-100 cursor-pointer"
            }`}
          >
            {dict.myTeamTab} ({currentTeam.name})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Subview 1: Explora Rànkings d'Equips / Create form */}
        {activeSubView === "llista_equips" && (
          <>
            {/* Left Column: List of general Teams */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border-4 border-black p-5 md:p-6 space-y-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2 border-b-2 border-black pb-2 text-black">
                  <Trophy className="w-5 h-5" /> {dict.rankingTitle}
                </h3>

                {joinError && (
                  <div className="border-2 border-black bg-red-100 text-[#721c24] text-xs font-black uppercase p-2">
                    ⚠️ {joinError}
                  </div>
                )}

                <div className="space-y-3.5">
                  {sortedTeams.map((team, idx) => {
                    const progress = Math.min(100, Math.round((team.points / team.targetScore) * 100));
                    const isMyTeam = currentTeam?.id === team.id;
                    return (
                      <div
                        key={team.id}
                        className={`p-4 border-2 border-black transition-all ${
                          isMyTeam ? "bg-[#CCFF00]/10 border-[#CCFF00] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" : "bg-white"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 font-black border-2 border-black text-xs bg-black text-[#CCFF00] flex items-center justify-center rotate-3">
                              #{idx + 1}
                            </span>
                            <div>
                              <h4 className="font-black text-sm uppercase flex items-center gap-1.5">
                                {team.name}
                                {team.passcode && <span className="text-[10px] bg-amber-100 border border-black px-1.5 py-0.2 select-none uppercase">{dict.private}</span>}
                                {isMyTeam && <span className="bg-black text-[#CCFF00] text-[9px] px-1.5 py-0.5 font-black uppercase select-none">{dict.mine}</span>}
                              </h4>
                              <p className="text-[10px] font-bold text-gray-600 uppercase mt-0.5">
                                {dict.membersCount(team.members.length, team.targetScore)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 justify-between sm:justify-end">
                            <div className="text-right">
                              <span className="font-black text-xs bg-[#CCFF00] px-2 py-0.5 border border-black inline-block">
                                {team.points} / {team.targetScore} PTS
                              </span>
                            </div>

                            {!currentTeam ? (
                              team.passcode ? (
                                <button
                                  onClick={() => {
                                    const code = prompt(dict.enterPass(team.name));
                                    if (code !== null) handleJoinTeam(team.id, code);
                                  }}
                                  className="px-3 py-1 bg-black text-[#CCFF00] hover:bg-white hover:text-black border-2 border-black text-[10px] uppercase font-black transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                >
                                  {dict.accessBtn}
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleJoinTeam(team.id)}
                                  className="px-3 py-1 bg-white hover:bg-[#CCFF00] text-black border-2 border-black text-[10px] uppercase font-black transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                >
                                  {dict.joinBtn}
                                </button>
                              )
                            ) : isMyTeam ? (
                              <span className="text-[10px] font-black text-green-700 bg-green-50 px-2 py-1 border border-black border-dashed uppercase">{dict.memberLabel}</span>
                            ) : null}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-3 w-full bg-gray-200 border border-black h-3">
                          <div
                            className="bg-[#CCFF00] h-full border-r border-black"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Create Team Section Form */}
            <div className="lg:col-span-4 space-y-4">
              <form onSubmit={handleCreateTeam} className="bg-white border-4 border-black p-5 space-y-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-sm font-black uppercase border-b-2 border-black pb-2 flex items-center gap-1.5 text-black">
                  <Plus className="w-5 h-5 text-black shrink-0" /> {dict.fundaTitle}
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-black uppercase tracking-wider">{dict.teamNameLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder={dict.teamNamePlaceholder}
                    value={newTeamName}
                    onChange={e => setNewTeamName(e.target.value)}
                    className="w-full bg-white border-2 border-black px-3.5 py-2 text-xs font-bold focus:outline-none"
                    maxLength={24}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-black uppercase tracking-wider">{dict.passcodeLabel}</label>
                  <input
                    type="password"
                    placeholder={dict.passcodePlaceholder}
                    value={newTeamPasscode}
                    onChange={e => setNewTeamPasscode(e.target.value)}
                    className="w-full bg-white border-2 border-black px-3.5 py-2 text-xs font-bold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-black uppercase tracking-wider">{dict.targetLabel}</label>
                  <select
                    value={targetScore}
                    onChange={e => setTargetScore(Number(e.target.value))}
                    className="w-full bg-white border-2 border-black px-3 py-1.5 text-xs font-bold focus:outline-none"
                  >
                    <option value={300}>{dict.targetOptionModerated}</option>
                    <option value={500}>{dict.targetOptionStandard}</option>
                    <option value={1000}>{dict.targetOptionElite}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!!currentTeam}
                  className={`w-full py-2.5 text-xs font-black border-2 uppercase transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 ${
                    currentTeam 
                      ? "bg-gray-100 border-gray-400 text-gray-500 cursor-not-allowed shadow-none" 
                      : "bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] text-black border-black cursor-pointer"
                  }`}
                >
                  {currentTeam ? dict.createBtnAlready : dict.createBtnSubmit}
                </button>
              </form>
            </div>
          </>
        )}

        {/* Subview 2: El Meu Equip Personal progress details dashboard */}
        {activeSubView === "el_meu_equip" && currentTeam && (
          <div className="lg:col-span-12 space-y-5 animate-fade-in text-black">
            
            {/* Header statistics info board for your own team */}
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-8 space-y-3">
                <span className="bg-black text-[#CCFF00] font-black tracking-widest text-[9px] px-2 py-0.5 border border-black uppercase rotate-3 inline-block">
                  {dict.teamConfigured}
                </span>
                <h3 className="text-3xl font-black uppercase italic tracking-tight">{currentTeam.name}</h3>
                
                {/* Visual score target and percentage ratio bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-black uppercase">
                    <span>{dict.weeklyGoal}</span>
                    <span>{currentTeam.points} / {currentTeam.targetScore} PTS ({currentRatio}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 border-2 border-black h-6">
                    <div className="bg-[#CCFF00] h-full border-r-2 border-black" style={{ width: `${currentRatio}%` }} />
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-2 bg-[#F3F3F3] p-4 border-2 border-black text-center justify-center">
                <div className="text-[10px] font-black uppercase text-gray-500">{dict.activeMembers}</div>
                <div className="text-3xl font-black text-black">{currentTeam.members.length}</div>
                <button
                  onClick={handleLeaveTeam}
                  className="bg-red-100 hover:bg-black hover:text-white text-red-700 font-extrabold border-2 border-black text-[10px] py-1 uppercase tracking-wider cursor-pointer"
                >
                  {dict.leaveBtn}
                </button>
              </div>
            </div>

            {/* List and detail grid of active members */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Member lists Column */}
              <div className="bg-white border-4 border-black p-5 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-black text-sm uppercase tracking-wide border-b-2 border-black pb-2 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> {dict.squadMembers(currentTeam.members.length)}
                </h4>

                <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                  {currentTeam.members.map((m, idx) => {
                    const isUser = m.nickname === currentUsername;
                    return (
                      <div
                        key={idx}
                        className={`p-3 border-2 border-black flex items-center justify-between transition-all ${
                          isUser ? "bg-[#CCFF00]/10 border-[#CCFF00]" : "bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-none border border-black ${m.avatarBg || "bg-gray-100"} flex items-center justify-center font-black text-xs select-none uppercase`}>
                            {m.nickname.substring(0, 2)}
                          </div>
                          <div>
                            <span className="font-extrabold text-xs uppercase flex items-center gap-1.5">
                              {m.nickname}
                              {isUser && <span className="bg-black text-[#CCFF00] text-[9px] px-1 font-black">{dict.youLabel}</span>}
                            </span>
                            <span className="text-[9px] text-gray-500 font-bold block uppercase">{dict.joinedAt(m.joinedAt)}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-black bg-black text-[#CCFF00] text-[11px] px-2 py-0.5 border border-black select-none">
                            +{m.pointsContributed} PTS
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Instructions and shared information */}
              <div className="bg-white border-4 border-black p-5 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div className="space-y-3">
                  <h4 className="font-black text-sm uppercase tracking-wide border-b-2 border-black pb-2 flex items-center gap-1.5">
                    <Target className="w-4 h-4" /> {dict.directivesTitle}
                  </h4>
                  <ul className="text-xs font-bold text-gray-700 uppercase space-y-3">
                    <li className="flex gap-2">
                    <span className="text-red-500">▶</span>
                      <span>{dict.directive1}</span>
                    </li>
                    <li className="flex gap-2">
                    <span className="text-red-500">▶</span>
                      <span>{dict.directive2}</span>
                    </li>
                    <li className="flex gap-2">
                    <span className="text-red-500">▶</span>
                      <span>{dict.directive3}</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-[#F3F3F3] border-2 border-black border-dashed text-[10px] font-black uppercase text-center tracking-wider text-black flex items-center justify-center gap-1.5">
                  <Flame className="w-4 h-4 text-black animate-bounce" /> {dict.authorizedGroup}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* CUSTOM IN-APP LEAVE TEAM CONFIRMATION DIALOG */}
      {showLeaveConfirm && currentTeam && (
        <div className="fixed inset-0 z-55 bg-black/85 flex flex-col justify-center items-center p-4 backdrop-blur-xs animate-fade-in text-black">
          <div className="bg-white border-4 border-black p-6 rounded-none max-w-sm w-full text-left space-y-4 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 border-b-2 border-black pb-2 text-black">
              <Users className="w-5 h-5 shrink-0 text-red-600 animate-pulse" />
              <h4 className="text-xs font-black uppercase tracking-wider">{dict.leaveConfirmTitle}</h4>
            </div>

            <p className="text-[11px] font-bold uppercase text-neutral-800 leading-relaxed">
              {dict.leaveConfirmText(currentTeam.name)}
            </p>

            <div className="grid grid-cols-2 gap-2 pb-0.5">
              <button
                type="button"
                onClick={() => {
                  setShowLeaveConfirm(false);
                }}
                className="py-2.5 px-3 border-2 border-black bg-neutral-100 hover:bg-neutral-200 text-black text-[10px] font-black uppercase text-center cursor-pointer transition-colors"
              >
                {dict.cancelBtn}
              </button>
              <button
                type="button"
                onClick={handleLeaveTeamConfirm}
                className="py-2.5 px-3 border-2 border-black bg-red-600 hover:bg-black text-white hover:text-red-500 text-[10px] font-black uppercase text-center cursor-pointer transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              >
                {dict.confirmBtn}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
