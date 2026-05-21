import React, { useState } from "react";
import { Trophy, Search, UserPlus, UserCheck, UserX, MapPin, Sparkles, AlertCircle, Heart, Users } from "lucide-react";
import { Player, ActivityLog } from "../types";

interface SocialTabProps {
  currentUsername: string;
  currentUserCity: string;
  currentUserPoints: number;
  currentUserFoundCount: number;
  currentUserDuration: number;
  players: Player[];
  logs: ActivityLog[];
  onUpdateFriendStatus: (playerId: string, action: "send" | "accept" | "decline" | "remove") => void;
}

export default function SocialTab({
  currentUsername,
  currentUserCity,
  currentUserPoints,
  currentUserFoundCount,
  currentUserDuration,
  players,
  logs,
  onUpdateFriendStatus
}: SocialTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubTab, setActiveSubTab] = useState<"global" | "local" | "amics" | "activitat">("global");

  // Interactive local likes dictionary state
  const [localLikes, setLocalLikes] = useState<Record<string, { count: number; active: boolean }>>({});

  const handleToggleLike = (logId: string, logNickname: string, objName: string) => {
    setLocalLikes(prev => {
      const current = prev[logId] || { count: Math.floor(Math.random() * 8) + 1, active: false };
      const nextActive = !current.active;
      const nextCount = nextActive ? current.count + 1 : Math.max(0, current.count - 1);
      
      if (nextActive) {
        // Trigger push notification using our in-app engine!
        try {
          (window as any).triggerNotification?.(
            "❤️ ENVIAT",
            `Has enviat un m'agrada a la troballa de @${logNickname}!`,
            "like"
          );
        } catch(e) {}
      }
      
      return {
        ...prev,
        [logId]: { count: nextCount, active: nextActive }
      };
    });
  };

  // Helper to format duration
  function formatTime(secs: number) {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  }

  // Construct current player representation to inject into rankings
  const mePlayer: Player = {
    id: "me",
    nickname: `${currentUsername} (Tu)`,
    city: currentUserCity,
    points: currentUserPoints,
    foundCount: currentUserFoundCount,
    durationSeconds: currentUserDuration,
    isFriend: false,
    friendStatus: "none",
    mosaic: []
  };

  // Combine me with players database for actual rankings
  const allPlayers = [mePlayer, ...players];

  // Filter based on search query
  const filteredPlayers = allPlayers.filter(p => {
    if (p.id === "me") return false; // Don't show me in search results for adding friends
    const query = searchQuery.toLowerCase();
    return p.nickname.toLowerCase().includes(query) || p.city.toLowerCase().includes(query);
  });

  // Calculate rankings
  const globalRanking = [...allPlayers].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return a.durationSeconds - b.durationSeconds;
  });

  const localRanking = [...allPlayers]
    .filter(p => p.city.toLowerCase() === currentUserCity.toLowerCase())
    .sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return a.durationSeconds - b.durationSeconds;
    });

  const friendsRanking = [...allPlayers]
    .filter(p => p.id === "me" || p.friendStatus === "friends" || p.isFriend)
    .sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return a.durationSeconds - b.durationSeconds;
    });

  return (
    <div id="social-tab-container" className="space-y-6 font-sans text-black">
      {/* Title */}
      <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black">
        <h2 className="text-2xl font-black uppercase italic tracking-tight mb-2 flex items-center gap-2">
          <Trophy className="text-black w-6 h-6 shrink-0" /> COMUNITAT I RÀNKINGS
        </h2>
        <p className="text-xs font-semibold uppercase text-gray-700">
          Troba altres jugadors, envia sol·licituds d'amistat i consulta qui és el millor de debò de les teves zones.
        </p>
      </div>

      {/* Grid: Live Activity Feed & Social Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Tabbed rankings and Search */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border-4 border-black p-4 md:p-6 space-y-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4.5 h-4.5" />
              <input
                id="search-player-input"
                type="text"
                placeholder="Cerca jugadors pel seu nom o ciutat (ex: Girona)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-black rounded-none py-3 pl-10 pr-4 text-black text-sm font-bold focus:outline-none focus:bg-[#CCFF00]/10 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black uppercase text-gray-650 hover:text-black cursor-pointer"
                >
                  Netejar
                </button>
              )}
            </div>

            {searchQuery ? (
              // Search Results mode
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-700 uppercase tracking-widest">
                  Resultats de la cerca ({filteredPlayers.length})
                </h3>
                {filteredPlayers.length === 0 ? (
                  <div className="bg-[#F3F3F3] p-6 border-2 border-black text-center text-gray-600 text-xs font-bold uppercase">
                    No hem trobat cap caçador que coincideixi amb la cerca.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredPlayers.map(p => (
                      <div
                        key={p.id}
                        className="bg-white p-4 border-2 border-black flex items-center justify-between gap-3 text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                      >
                        <div>
                          <div className="font-black text-sm uppercase">
                            {p.nickname}
                          </div>
                          <div className="text-xs text-gray-500 font-bold flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-black" /> {p.city}
                          </div>
                          <div className="text-xs text-black font-black uppercase italic mt-1 bg-[#CCFF00] px-1.5 py-0.5 inline-block border border-black">
                            {p.points} PTS • {p.foundCount} TROBATS
                          </div>
                        </div>

                        {/* Friend actions */}
                        <div className="flex items-center shrink-0">
                          {p.friendStatus === "friends" ? (
                            <button
                              id={`remove-friend-btn-${p.id}`}
                              onClick={() => onUpdateFriendStatus(p.id, "remove")}
                              className="px-2.5 py-1.5 bg-red-100 hover:bg-red-200 border-2 border-black text-red-900 font-bold text-xs uppercase cursor-pointer transition-colors"
                              title="Eliminar amic"
                            >
                              Amics
                            </button>
                          ) : p.friendStatus === "sent" ? (
                            <span className="text-xs font-black uppercase text-gray-500 bg-white border-2 border-black border-dashed px-2.5 py-1.5">
                              Pendent
                            </span>
                          ) : p.friendStatus === "received" ? (
                            <button
                              id={`accept-friend-btn-${p.id}`}
                              onClick={() => onUpdateFriendStatus(p.id, "accept")}
                              className="px-3 py-1.5 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] text-black font-black border-2 border-black text-xs transition-all uppercase cursor-pointer"
                            >
                              Acceptar
                            </button>
                          ) : (
                            <button
                              id={`add-friend-btn-${p.id}`}
                              onClick={() => onUpdateFriendStatus(p.id, "send")}
                              className="px-3 py-1.5 bg-white hover:bg-black hover:text-white text-black font-black border-2 border-black text-xs transition-all uppercase cursor-pointer"
                            >
                              Afegir
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Tabbed Rankings mode
              <div className="space-y-4">
                <div className="flex border-b-2 border-black pb-1 gap-1 overflow-x-auto">
                  <button
                    id="subtag-global-btn"
                    onClick={() => setActiveSubTab("global")}
                    className={`px-4 py-2 text-xs font-black uppercase border-2 transition-all shrink-0 ${
                      activeSubTab === "global"
                        ? "bg-[#CCFF00] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        : "border-transparent text-gray-500 hover:text-black hover:bg-gray-100"
                    }`}
                  >
                    Global
                  </button>
                  <button
                    id="subtag-local-btn"
                    onClick={() => setActiveSubTab("local")}
                    className={`px-4 py-2 text-xs font-black uppercase border-2 transition-all shrink-0 ${
                      activeSubTab === "local"
                        ? "bg-[#CCFF00] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        : "border-transparent text-gray-500 hover:text-black hover:bg-gray-100"
                    }`}
                  >
                    Local ({currentUserCity})
                  </button>
                  <button
                    id="subtag-amics-btn"
                    onClick={() => setActiveSubTab("amics")}
                    className={`px-4 py-2 text-xs font-black uppercase border-2 transition-all shrink-0 ${
                      activeSubTab === "amics"
                        ? "bg-[#CCFF00] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        : "border-transparent text-gray-500 hover:text-black hover:bg-gray-100"
                    }`}
                  >
                    Amics
                  </button>
                </div>

                {/* Listing of selected rank */}
                <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                  {(activeSubTab === "global" ? globalRanking : activeSubTab === "local" ? localRanking : friendsRanking).map((p, idx) => {
                    const isCurrentUser = p.id === "me";
                    const rankNum = idx + 1;
                    
                    return (
                      <div
                        id={`ranking-row-${p.id}`}
                        key={p.id}
                        className={`flex items-center justify-between p-3.5 border-2 border-black transition-colors ${
                          isCurrentUser
                            ? "bg-[#CCFF00]/15 text-black font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            : "bg-white text-black hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Rank badge */}
                          <div className={`w-8 h-8 rounded-none border-2 border-black flex items-center justify-center font-black text-sm shrink-0 ${
                            rankNum === 1
                              ? "bg-[#CCFF00] text-black rotate-3"
                              : rankNum === 2
                              ? "bg-gray-250 text-black -rotate-3"
                              : rankNum === 3
                              ? "bg-amber-100 text-black"
                              : "bg-white text-gray-700"
                          }`}>
                            {rankNum}
                          </div>
                          
                          <div>
                            <div className="font-black text-sm uppercase flex items-center gap-1.5">
                              <span>{p.nickname}</span>
                              {isCurrentUser && (
                                <span className="bg-black text-[#CCFF00] text-[9px] px-1.5 py-0.5 font-black uppercase tracking-wider">
                                  Tu
                                </span>
                              )}
                              {p.isFriend && (
                                <span className="text-emerald-700 text-xs font-black uppercase">
                                  • Amic
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-gray-600 font-bold uppercase flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-black" /> {p.city}
                              <span className="mx-1">•</span>
                              <span>Temps: {formatTime(p.durationSeconds || 0)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Points badge */}
                        <div className="text-right shrink-0">
                          <div className="font-black text-lg text-black bg-[#CCFF00] px-1.5 py-0.5 border border-black inline-block">
                            {p.points} PTS
                          </div>
                          <div className="text-[10px] font-bold uppercase text-gray-500 mt-1">
                            {p.foundCount}/10 trobats
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {(activeSubTab === "amics" && friendsRanking.length === 1) && (
                    <div className="text-center p-8 bg-[#F3F3F3] border-2 border-black text-gray-600 text-xs font-bold uppercase space-y-2">
                      <Users className="w-8 h-8 mx-auto text-black" />
                      <p>Encara no has afegit cap amic a la teva llista d'amics.</p>
                      <p className="text-[10px] text-gray-500">
                        Busca de dalt i prem "Afegir" per competir-hi.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Right Column: Live Activity Feed (Temps real) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border-4 border-black p-5 space-y-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between pb-2 border-b-2 border-black">
              <h3 className="text-sm font-black uppercase text-black tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-black shrink-0 animate-pulse" /> Activitat en Viu
              </h3>
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping border border-black" />
            </div>

            <div className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
              {logs.map((log) => {
                const itemLike = localLikes[log.id] || { count: Math.floor(Math.random() * 5) + 1, active: false };
                return (
                  <div
                    key={log.id}
                    className="bg-[#F3F3F3] border-2 border-black p-3.5 space-y-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-extrabold text-xs uppercase text-black">
                        {log.nickname}
                      </span>
                      <span className="text-[9px] font-bold uppercase text-gray-500">
                        {log.timestamp}
                      </span>
                    </div>
                    
                    <p className="text-xs text-black font-semibold uppercase">
                      Ha trobat l'objecte <strong className="bg-[#CCFF00] px-1 border border-black text-[11px] font-black">{log.objectName}</strong>!
                    </p>
                    
                    <div className="flex items-center justify-between text-[11px] text-black pt-1 border-t border-black/5">
                      <button
                        onClick={() => handleToggleLike(log.id, log.nickname, log.objectName)}
                        className={`flex items-center gap-1 font-extrabold uppercase text-xs cursor-pointer transition-all duration-150 ${
                          itemLike.active ? "text-red-600 scale-105" : "text-neutral-700 hover:text-red-500"
                        }`}
                      >
                        <Heart className={`w-4 h-4 transition-colors ${itemLike.active ? "fill-red-600 text-red-600 animate-pulse" : "text-black"}`} /> 
                        <span>M'agrada</span>
                        <span className="bg-black/10 text-black px-1.5 py-0.2 rounded-full text-[10px] ml-0.5">{itemLike.count}</span>
                      </button>
                      <span className="bg-black text-[#CCFF00] font-black px-1.5 py-0.5 text-[10px]">
                        +{log.points} PTS
                      </span>
                    </div>
                  </div>
                );
              })}

              {logs.length === 0 && (
                <p className="text-gray-500 text-xs font-bold text-center py-6 uppercase">
                  Sense activitat recent registrada.
                </p>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
