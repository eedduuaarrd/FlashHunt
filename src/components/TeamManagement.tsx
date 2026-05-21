import React, { useState, useEffect } from "react";
import { Users, Shield, Plus, Key, Trophy, Target, ArrowRight, Sparkles, UserPlus, Flame } from "lucide-react";
import { Team, TeamMember } from "../types";

interface TeamManagementProps {
  currentUsername: string;
  currentUserPoints: number;
  currentTeam: Team | null;
  onSetTeam: (team: Team | null) => void;
  onAddLog: (text: string, points: number) => void;
}

const INITIAL_TEAMS: Team[] = [];

export default function TeamManagement({
  currentUsername,
  currentUserPoints,
  currentTeam,
  onSetTeam,
  onAddLog
}: TeamManagementProps) {
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
          joinedAt: "Ara mateix",
          avatarBg: "bg-yellow-200"
        }
      ]
    };

    setTeams(prev => [...prev, newTeam]);
    onSetTeam(newTeam);
    setActiveSubView("el_meu_equip");
    onAddLog(`Ha creat l'equip de cooperatiu d'alt rendiment: ${newTeam.name}`, 15);

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
      setJoinError("Clau de pas de seguretat incorrecta pel Team " + target.name);
      return;
    }

    // Check if copy has username already
    const isAlreadyMember = target.members.some(m => m.nickname === currentUsername);
    let updatedMembers = [...target.members];
    if (!isAlreadyMember) {
      updatedMembers.push({
        nickname: currentUsername,
        pointsContributed: currentUserPoints,
        joinedAt: "Ara mateix",
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
    onAddLog(`S'ha unit amb èxit a l'equip cooperatiu ${updatedTeam.name}!`, 10);
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
          <Users className="text-black w-6 h-6 shrink-0" /> MODO COOPERATIU: EN EQUIPS
        </h2>
        <p className="text-xs font-semibold uppercase text-gray-700">
          Uneix forces amb altres jugadors reals o amics de Catalunya per completar la llista setmanal. Els punts sumen col·lectivament cap a la vostra fita setmanal!
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
          Explora Rànking d'equips
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
            El Meu Equip ({currentTeam.name})
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
                  <Trophy className="w-5 h-5" /> Líders de Rànking de Cooperació Col·lectiva
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
                                {team.passcode && <span className="text-[10px] bg-amber-100 border border-black px-1.5 py-0.2 select-none uppercase">Privat</span>}
                                {isMyTeam && <span className="bg-black text-[#CCFF00] text-[9px] px-1.5 py-0.5 font-black uppercase select-none">El meu</span>}
                              </h4>
                              <p className="text-[10px] font-bold text-gray-600 uppercase mt-0.5">
                                {team.members.length} caçadors actius • Objectiu col·lectiu de {team.targetScore} PTS
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
                                    const code = prompt(`Introdueix la clau de seguretat privat per unir-te a l'equip "${team.name}":`);
                                    if (code !== null) handleJoinTeam(team.id, code);
                                  }}
                                  className="px-3 py-1 bg-black text-[#CCFF00] hover:bg-white hover:text-black border-2 border-black text-[10px] uppercase font-black transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                >
                                  Accedir
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleJoinTeam(team.id)}
                                  className="px-3 py-1 bg-white hover:bg-[#CCFF00] text-black border-2 border-black text-[10px] uppercase font-black transition-all cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                >
                                  Uneix-te
                                </button>
                              )
                            ) : isMyTeam ? (
                              <span className="text-[10px] font-black text-green-700 bg-green-50 px-2 py-1 border border-black border-dashed uppercase">Membre</span>
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
                  <Plus className="w-5 h-5 text-black shrink-0" /> Funda un Nou Equip
                </h3>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-black uppercase tracking-wider">NOM DE L’EQUIP</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex. Senglars del Montseny"
                    value={newTeamName}
                    onChange={e => setNewTeamName(e.target.value)}
                    className="w-full bg-white border-2 border-black px-3.5 py-2 text-xs font-bold focus:outline-none"
                    maxLength={24}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-black uppercase tracking-wider">CLAU DE PAS DE SEGURETAT (OPCIONAL)</label>
                  <input
                    type="password"
                    placeholder="Clau numèrica per fer-lo privat"
                    value={newTeamPasscode}
                    onChange={e => setNewTeamPasscode(e.target.value)}
                    className="w-full bg-white border-2 border-black px-3.5 py-2 text-xs font-bold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-black uppercase tracking-wider">FITA / TARGET SETMANAL DE PUNTS</label>
                  <select
                    value={targetScore}
                    onChange={e => setTargetScore(Number(e.target.value))}
                    className="w-full bg-white border-2 border-black px-3 py-1.5 text-xs font-bold focus:outline-none"
                  >
                    <option value={300}>300 Punts (Mètode Moderat)</option>
                    <option value={500}>500 Punts (Competició Estàndard)</option>
                    <option value={1000}>1000 Punts (Mètode Elit Extrema)</option>
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
                  {currentTeam ? "Ja pertanys a un equip" : "Crear i unirte"}
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
                  EL TEU EQUIP CONFIGURAT
                </span>
                <h3 className="text-3xl font-black uppercase italic tracking-tight">{currentTeam.name}</h3>
                
                {/* Visual score target and percentage ratio bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-black uppercase">
                    <span>FITA SETMANAL COOPERATIVA</span>
                    <span>{currentTeam.points} / {currentTeam.targetScore} PTS ({currentRatio}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 border-2 border-black h-6">
                    <div className="bg-[#CCFF00] h-full border-r-2 border-black" style={{ width: `${currentRatio}%` }} />
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-2 bg-[#F3F3F3] p-4 border-2 border-black text-center justify-center">
                <div className="text-[10px] font-black uppercase text-gray-500">Membres Actius</div>
                <div className="text-3xl font-black text-black">{currentTeam.members.length}</div>
                <button
                  onClick={handleLeaveTeam}
                  className="bg-red-100 hover:bg-black hover:text-white text-red-700 font-extrabold border-2 border-black text-[10px] py-1 uppercase tracking-wider cursor-pointer"
                >
                  Abandonar Equip
                </button>
              </div>
            </div>

            {/* List and detail grid of active members */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Member lists Column */}
              <div className="bg-white border-4 border-black p-5 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="font-black text-sm uppercase tracking-wide border-b-2 border-black pb-2 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> Membres de la Esquadra ({currentTeam.members.length})
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
                              {isUser && <span className="bg-black text-[#CCFF00] text-[9px] px-1 font-black">Tu</span>}
                            </span>
                            <span className="text-[9px] text-gray-500 font-bold block uppercase">S'ha unit: {m.joinedAt}</span>
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
                    <Target className="w-4 h-4" /> Directrius d'Equip Co-op
                  </h4>
                  <ul className="text-xs font-bold text-gray-700 uppercase space-y-3">
                    <li className="flex gap-2">
                    <span className="text-red-500">▶</span>
                      <span>Qualsevol objecte que verifiquis des de la teva pestanya "Caçar" sumarà immediatament de forma directa al fons col·lectiu!</span>
                    </li>
                    <li className="flex gap-2">
                    <span className="text-red-500">▶</span>
                      <span>Els punts són col·lectius: l'equip es guanya la victòria conjunta en assolir la fita de punts setmanals abans de diumenge!</span>
                    </li>
                    <li className="flex gap-2">
                    <span className="text-red-500">▶</span>
                      <span>Comparteix el nom de l'equip i la clau de pas amb altres jugadors per muntar una estratègia invencible.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-[#F3F3F3] border-2 border-black border-dashed text-[10px] font-black uppercase text-center tracking-wider text-black flex items-center justify-center gap-1.5">
                  <Flame className="w-4 h-4 text-black animate-bounce" /> GRUP AUTORITZAT PER ALTA VELOCITAT DE VISIÓ IA
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
              <h4 className="text-xs font-black uppercase tracking-wider">ABANDONAR EQUIP</h4>
            </div>

            <p className="text-[11px] font-bold uppercase text-neutral-800 leading-relaxed">
              Segur que vols abandonar l'equip cooperatiu "{currentTeam.name}"? Les teves contribucions individuals de punts sortiran del fons col·lectiu actiu.
            </p>

            <div className="grid grid-cols-2 gap-2 pb-0.5">
              <button
                type="button"
                onClick={() => {
                  setShowLeaveConfirm(false);
                }}
                className="py-2.5 px-3 border-2 border-black bg-neutral-100 hover:bg-neutral-200 text-black text-[10px] font-black uppercase text-center cursor-pointer transition-colors"
              >
                Tornar Enrere
              </button>
              <button
                type="button"
                onClick={handleLeaveTeamConfirm}
                className="py-2.5 px-3 border-2 border-black bg-red-600 hover:bg-black text-white hover:text-red-500 text-[10px] font-black uppercase text-center cursor-pointer transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              >
                CONFIRMAR
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
