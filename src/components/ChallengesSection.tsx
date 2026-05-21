import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, Clock, Trophy, Award, Flame, CheckCircle, CheckSquare, Zap } from "lucide-react";
import { Challenge, HuntObject } from "../types";

interface ChallengesSectionProps {
  huntList: HuntObject[];
  onAwardBonusPoints: (points: number, badgeName: string) => void;
  completedChallengesHistory: string[];
  onSetCompletedChallenges: (challenges: string[]) => void;
}

const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: "challenge_vehicles",
    title: "Càrrega Pesant",
    description: "Troba i valida un mitjà de transport actiu de la setmana (Bicicleta o Autobús o Moto).",
    type: "daily",
    target: 1,
    current: 0,
    rewardPoints: 30,
    badgeName: "Moto-Bici-Bus Elite",
    completed: false,
    expiresIn: "14 hores restants d'avui"
  },
  {
    id: "challenge_fast",
    title: "Caçador Express",
    description: "Comença la ronda i verifica 3 objectes ràpids per accelerar la teva puntuació.",
    type: "daily",
    target: 3,
    current: 0,
    rewardPoints: 40,
    badgeName: "Vent de Tramuntana",
    completed: false,
    expiresIn: "21 hores restants d'avui"
  },
  {
    id: "challenge_weekly_full",
    title: "Campionat Brut",
    description: "Suma un total de 5 o més objectes quotidians de qualsevol dificultat.",
    type: "weekly",
    target: 5,
    current: 0,
    rewardPoints: 75,
    badgeName: "Súper Caçador Català",
    completed: false,
    expiresIn: "5 dies restants d'aquesta ronda"
  },
  {
    id: "challenge_easy",
    title: "Aclimatació",
    description: "Suma un objecte fàcil (Cadira, Gos, Portàtil, Planta test o Motxilla) en un segon.",
    type: "daily",
    target: 1,
    current: 0,
    rewardPoints: 15,
    badgeName: "Primeres Passos",
    completed: false,
    expiresIn: "18 hores restants d'avui"
  }
];

export default function ChallengesSection({
  huntList,
  onAwardBonusPoints,
  completedChallengesHistory,
  onSetCompletedChallenges
}: ChallengesSectionProps) {
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);
  const [alertBadge, setAlertBadge] = useState<{ name: string; pts: number } | null>(null);

  // Re-calculate the progress of challenges based on current huntList
  useEffect(() => {
    // 1. Vehicle progress: check if bicycle, bus, or motorcycle are verified
    const isVehicleFound = huntList.some(o => 
      (o.key === "bicicleta" || o.key === "autobus" || o.key === "moto") && o.verified
    );
    const vehicleCount = isVehicleFound ? 1 : 0;

    // 2. Fast: count number of verified objects
    const totalVerifiedCount = huntList.filter(o => o.verified).length;

    // 3. Weekly Full: count number of verified objects
    const weeklyCount = totalVerifiedCount;

    // 4. Easy progress: check if chair, dog, laptop, potted plant, backpack are verified
    const easyVerifiedCount = huntList.filter(o => 
      (o.key === "cadira" || o.key === "gos" || o.key === "portatil" || o.key === "planta_test" || o.key === "motxilla") && o.verified
    ).length;

    setChallenges(prev => prev.map(ch => {
      let currentVal = 0;
      if (ch.id === "challenge_vehicles") currentVal = vehicleCount;
      if (ch.id === "challenge_fast") currentVal = Math.min(ch.target, totalVerifiedCount);
      if (ch.id === "challenge_weekly_full") currentVal = Math.min(ch.target, weeklyCount);
      if (ch.id === "challenge_easy") currentVal = Math.min(ch.target, easyVerifiedCount > 0 ? 1 : 0);

      const isCompletedNow = currentVal >= ch.target;
      const wasAlreadyCompleted = completedChallengesHistory.includes(ch.id);

      if (isCompletedNow && !wasAlreadyCompleted) {
        // Trigger claim badge event!
        setTimeout(() => {
          onSetCompletedChallenges([...completedChallengesHistory, ch.id]);
          onAwardBonusPoints(ch.rewardPoints, ch.badgeName);
          setAlertBadge({ name: ch.badgeName, pts: ch.rewardPoints });
          // Link with our unified in-app notification alerts
          try {
            (window as any).triggerNotification?.(
              "🏆 NOU REPTE COMPLETAT!",
              `Has aconseguit la insígnia oficial de '${ch.badgeName}'! (+${ch.rewardPoints} PTS)`,
              "success"
            );
          } catch(e) {}
        }, 100);
      }

      return {
        ...ch,
        current: currentVal,
        completed: isCompletedNow || wasAlreadyCompleted
      };
    }));
  }, [huntList, completedChallengesHistory, onSetCompletedChallenges, onAwardBonusPoints]);

  return (
    <div id="challenges-section-v4" className="space-y-6 font-sans text-black animate-fade-in">
      
      {/* Alert badge popup alert box */}
      {alertBadge && (
        <div className="border-4 border-black bg-[#CCFF00] p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-4 animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black text-[#CCFF00] border-2 border-black flex items-center justify-center font-black animate-spin">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase italic">REPTE SUPERAT COMRADE! 🎉</h4>
              <p className="text-xs font-bold uppercase text-gray-800">
                Has guanyat la insígnia <strong className="bg-black text-white px-1.5 py-0.5">{alertBadge.name}</strong> i +{alertBadge.pts} PTS addicionals reals!
              </p>
            </div>
          </div>
          <button
            onClick={() => setAlertBadge(null)}
            className="px-3 py-1 bg-black text-white hover:bg-white hover:text-black border-2 border-black font-black text-xs uppercase cursor-pointer"
          >
            Tancar
          </button>
        </div>
      )}

      {/* Main Container Header */}
      <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-2">
            <Zap className="text-black w-6 h-6 shrink-0" /> REPTES DIARIS I SETMANALS
          </h2>
          <p className="text-xs font-semibold uppercase text-gray-700">
            Completa els objectius de caça específics per guanyar insígnies exclusives i bónus de puntuació directe.
          </p>
        </div>

        <div className="bg-black text-[#CCFF00] font-black uppercase text-[10px] px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] select-none">
          INSÍGNIES TOTALS: {completedChallengesHistory.length}
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((ch) => {
          const ratio = Math.min(100, Math.round((ch.current / ch.target) * 100));
          return (
            <div
              key={ch.id}
              className={`p-5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-4 transition-all relative overflow-hidden ${
                ch.completed 
                  ? "bg-gray-50 border-emerald-500/80 text-black" 
                  : "bg-white hover:bg-[#CCFF00]/5"
              }`}
            >
              
              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase border border-black px-1.5 py-0.5 select-none ${
                      ch.type === "daily" ? "bg-amber-100 text-black animate-pulse" : "bg-purple-100 text-black"
                    }`}>
                      {ch.type === "daily" ? "DIARI" : "SETMANAL"}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {ch.expiresIn}
                    </span>
                  </div>

                  {ch.completed && (
                    <span className="bg-emerald-100 text-emerald-900 border border-emerald-500 text-[10px] font-black uppercase px-2 py-0.5">
                      SUPERAT ✓
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-black text-lg uppercase tracking-tight text-black flex items-center gap-1.5">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-neutral-700 font-bold uppercase tracking-tight mt-1 leading-relaxed">
                    {ch.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-600">
                    <span>PROGRÉS DE CACERA</span>
                    <span>{ch.current} / {ch.target} ({ratio}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 border border-black h-3">
                    <div className="bg-[#CCFF00] h-full" style={{ width: `${ratio}%` }} />
                  </div>
                </div>

                {/* Badge card info and point indicators */}
                <div className="bg-[#F3F3F3] border-2 border-black p-2 flex items-center justify-between text-xs font-black uppercase">
                  <div className="flex items-center gap-1.5 truncate text-black">
                    <Award className="w-4 h-4 shrink-0 text-black" />
                    <span className="truncate">{ch.badgeName}</span>
                  </div>
                  <span className="bg-[#CCFF00] px-2 py-0.5 border border-black text-[11px] shrink-0">
                    +{ch.rewardPoints} PTS
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
