import React, { useState } from "react";
import { Camera, Calendar, Award, MapPin, Grid, Heart, Smile, Flame, Settings, Save, LogOut, Globe, Check } from "lucide-react";
import { HuntObject } from "../types";
import { TRANSLATIONS, Lang } from "../translations";

interface ProfileMosaicProps {
  nickname: string;
  city: string;
  points: number;
  durationSeconds: number;
  huntObjects: HuntObject[];
  lang: Lang;
  onSetLang: (lang: Lang) => void;
  streak: number;
  onLogout: () => void;
  onUpdateProfile: (newNick: string, newCity: string) => void;
}

export default function ProfileMosaic({
  nickname,
  city,
  points,
  durationSeconds,
  huntObjects,
  lang,
  onSetLang,
  streak,
  onLogout,
  onUpdateProfile
}: ProfileMosaicProps) {
  const t = TRANSLATIONS[lang];
  
  // Filter objects that are successfully verified
  const foundObjects = huntObjects.filter(obj => obj.verified && obj.photoUrl);

  const [editMode, setEditMode] = useState(false);
  const [tempNick, setTempNick] = useState(nickname);
  const [tempCity, setTempCity] = useState(city);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Formats time in hours, minutes, seconds
  function formatTime(secs: number) {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    if (hours > 0) return `${hours}H ${mins}M ${seconds}S`;
    return `${mins}M ${seconds}S`;
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempNick.trim()) return;
    onUpdateProfile(tempNick.trim(), tempCity);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setEditMode(false);
    }, 1500);
  };

  return (
    <div id="profile-mosaic-container" className="space-y-6 font-sans text-black animate-fade-in">
      
      {/* Profile Header Card */}
      <div className="bg-white border-4 border-black p-6 md:p-8 text-black relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        
        <div id="profile-card-layout" className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between relative z-10">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center text-center md:text-left">
            <div className="w-20 h-20 bg-[#CCFF00] border-4 border-black flex items-center justify-center font-black text-black text-2xl uppercase tracking-wider select-none rotate-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative group">
              {nickname ? nickname.substring(0, 2) : "FH"}
              <div className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-none border border-black p-0.5 text-[8px] font-black uppercase rotate-6">
                Active
              </div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h2 id="profile-nickname-badge" className="text-2xl font-black uppercase italic tracking-tight">{nickname || "Jugador sense nom"}</h2>
                <button
                  onClick={() => {
                    setTempNick(nickname);
                    setTempCity(city);
                    setEditMode(!editMode);
                  }}
                  className="p-1.5 bg-gray-100 hover:bg-[#CCFF00] border-2 border-black transition-all cursor-pointer text-black"
                  title="Editar Perfil"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-black uppercase text-gray-750 mt-1">
                <span className="flex items-center gap-1 bg-[#F3F3F3] border border-black px-2 py-0.5">
                  <MapPin className="w-3.5 h-3.5 text-black" /> {city || "Catalunya"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 bg-[#CCFF00] text-black border border-black px-2 py-0.5 font-bold animate-pulse">
                  <Flame className="w-3.5 h-3.5 text-black shrink-0" /> {streak} {lang === "en" ? "DAY STREAK" : lang === "es" ? "DÍAS SEGUIDOS" : "DIES SEGUITS"}
                </span>
              </div>
            </div>
          </div>

          {/* Core metrics display */}
          <div className="grid grid-cols-3 gap-4 text-center border-t-2 border-black pt-6 md:pt-0 md:border-t-0 md:pl-8">
            <div className="space-y-1">
              <div className="text-xl md:text-2xl font-black italic bg-[#CCFF00] text-black px-2.5 py-1 border-2 border-black inline-block shadow-[2px_2px_0px_rgba(0,0,0,1)]">{points}</div>
              <div className="text-[10px] text-gray-700 font-extrabold uppercase">{lang === "en" ? "Points" : lang === "es" ? "Puntos" : "Punts"}</div>
            </div>
            <div className="space-y-1 px-2 md:px-4">
              <div className="text-xl md:text-2xl font-black italic bg-white text-black px-2.5 py-1 border-2 border-black inline-block shadow-[2px_2px_0px_rgba(0,0,0,1)]">{foundObjects.length}</div>
              <div className="text-[10px] text-gray-700 font-extrabold uppercase">{lang === "en" ? "Found" : lang === "es" ? "Encontrados" : "Trobats"}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono font-black italic bg-white text-black px-2.5 py-1 border-2 border-black inline-block shadow-[2px_2px_0px_rgba(0,0,0,1)] h-9 md:h-10 flex items-center justify-center leading-none">
                {formatTime(durationSeconds)}
              </div>
              <div className="text-[10px] text-gray-700 font-extrabold uppercase mt-1">{lang === "en" ? "Time" : lang === "es" ? "Tiempo" : "Temps"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Panel Drawer */}
      {editMode && (
        <form onSubmit={handleProfileSave} className="bg-white border-4 border-black p-5 space-y-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] animate-fade-in text-black">
          <h3 className="text-sm font-black uppercase text-black border-b-2 border-black pb-2 flex items-center gap-1.5 leading-none">
            <Settings className="w-4 h-4" /> {lang === "en" ? "EDIT PLAYER CARD & SETTINGS" : lang === "es" ? "EDITAR PERFIL Y CONFIGURACIÓN" : "MODIFICAR PERFIL IPRESÈNCIA"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-black block">{lang === "en" ? "PUBLIC NICKNAME" : lang === "es" ? "NICKNAME / ALIAS" : "ÀLIES PÚBLIC"}</label>
              <input
                type="text"
                required
                value={tempNick}
                onChange={e => setTempNick(e.target.value)}
                className="w-full bg-white border-2 border-black px-3 py-1.5 text-xs font-bold focus:outline-none"
                maxLength={18}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-black block">{lang === "en" ? "REGION CITY" : lang === "es" ? "CIUDAD" : "CIUTAT DE CACERA"}</label>
              <select
                value={tempCity}
                onChange={e => setTempCity(e.target.value)}
                className="w-full bg-white border-2 border-black px-3 py-1.5 text-xs font-bold focus:outline-none cursor-pointer"
              >
                <option value="Barcelona">Barcelona</option>
                <option value="Girona">Girona</option>
                <option value="Tarragona">Tarragona</option>
                <option value="Lleida">Lleida</option>
                <option value="Vic">Vic</option>
                <option value="Sabadell">Sabadell</option>
                <option value="Terrassa">Terrassa</option>
                <option value="Reus">Reus</option>
                <option value="Manresa">Manresa</option>
                <option value="Figueres">Figueres</option>
              </select>
            </div>
          </div>

          {/* Language Selector Row inside settings */}
          <div className="space-y-1.5 border-t border-black/10 pt-3">
            <label className="text-[10px] font-black uppercase tracking-wider text-black block flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> {lang === "en" ? "APP LANGUAGE" : lang === "es" ? "IDIOMA DE LA APP" : "IDIOMA DE L'APLICACIÓ"}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onSetLang("ca")}
                className={`py-2 border-2 text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  lang === "ca"
                    ? "bg-[#CCFF00] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-gray-500 border-gray-400 hover:text-black hover:bg-gray-50"
                }`}
              >
                Català {lang === "ca" && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => onSetLang("es")}
                className={`py-2 border-2 text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  lang === "es"
                    ? "bg-[#CCFF00] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-gray-500 border-gray-400 hover:text-black hover:bg-gray-50"
                }`}
              >
                Español {lang === "es" && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => onSetLang("en")}
                className={`py-2 border-2 text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  lang === "en"
                    ? "bg-[#CCFF00] text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-gray-500 border-gray-400 hover:text-black hover:bg-gray-50"
                }`}
              >
                English {lang === "en" && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-black/10 pt-3">
            {saveSuccess ? (
              <span className="text-xs font-black text-green-700 bg-green-100 px-3 py-1.5 border border-black uppercase flex items-center gap-1">
                ✔ {lang === "en" ? "SAVED SUCCESSFULLY" : lang === "es" ? "GUARDADO CORRECTAMENTE" : "DESAT CORRECTAMENT"}
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase text-gray-500">
                {lang === "en" ? "Instant local & leaderboard update" : lang === "es" ? "Actualización instantánea en ranking" : "Actualització instantània del rànking"}
              </span>
            )}
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-3 py-1.5 border-2 border-gray-400 text-xs font-black uppercase hover:bg-gray-50 shrink-0 cursor-pointer text-gray-600"
              >
                {lang === "en" ? "Cancel" : lang === "es" ? "Cancelar" : "Cancel·lar"}
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-black hover:bg-[#CCFF00] text-[#CCFF00] hover:text-black border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all flex items-center gap-1 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{lang === "en" ? "Save Changes" : lang === "es" ? "Guardar" : "Desar canvis"}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Grid Mosaic List */}
      <div className="space-y-4 text-black">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black uppercase italic tracking-wider text-black flex items-center gap-2">
            <Grid className="w-5 h-5 text-black" /> {lang === "en" ? "Your Capture Mosaic" : lang === "es" ? "Tu Mosaico de Capturas" : "El Teu Mosaïc de Fotos"}
          </h3>
          <span className="text-xs font-black uppercase text-black bg-[#CCFF00] px-2 py-0.5 border border-black">
            {foundObjects.length}/10 {lang === "en" ? "VERIFIED" : lang === "es" ? "VERIFICADOS" : "TROBATS"}
          </span>
        </div>

        {foundObjects.length === 0 ? (
          // Empty State
          <div className="bg-white border-4 border-black border-dashed p-10 text-center space-y-4 text-black shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            <div className="w-16 h-16 bg-[#CCFF00] border-4 border-black flex items-center justify-center mx-auto rotate-12 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
              <Camera className="w-7 h-7 text-black" />
            </div>
            <div className="space-y-2 max-w-sm mx-auto">
              <h4 className="font-black text-lg uppercase italic">{lang === "en" ? "Empty Mosaic" : lang === "es" ? "Mosaico vacío" : "Mosaïc buit"}</h4>
              <p className="text-xs text-gray-750 font-semibold uppercase leading-relaxed">
                {lang === "en" 
                  ? "You have not verified any objects yet. Go outside, search the city, active the app camera to build your hunt portfolio!" 
                  : lang === "es" 
                  ? "Aún no has verificado ningún objeto. ¡Sal a la calle, encuéntralos y usa la cámara para rellenar tu mosaico y ganar puntos!" 
                  : "Encara no has verificat cap foto d'objecte. Surt al carrer, busca'ls i fes servir la càmera de l'aplicació per començar a dissenyar el teu mosaïc!"}
              </p>
            </div>
          </div>
        ) : (
          // Grid Mosaic List (like Instagram cards)
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {foundObjects.map((obj) => (
              <div
                id={`mosaic-item-${obj.key}`}
                key={obj.key}
                className="group relative bg-[#F3F3F3] border-4 border-black rounded-none overflow-hidden aspect-square flex flex-col justify-end text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all"
              >
                {/* Photo */}
                <img
                  src={obj.photoUrl}
                  alt={obj.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Flat overlay header details info */}
                <div className="absolute top-2 right-2 bg-[#CCFF00] text-black px-2 py-0.5 border-2 border-black text-xs font-black font-mono shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  +{obj.points} PTS
                </div>

                {/* Bottom details content */}
                <div className="p-3 bg-white border-t-2 border-black text-black relative z-10 space-y-1">
                  <div className="text-xs font-black uppercase truncate flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-black shrink-0" />
                    <span className="truncate">{obj.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase text-gray-650">
                    <span>{obj.difficulty}</span>
                    <span className="bg-[#CCFF00] px-1 border border-black text-[9px]">{obj.verifyDate || "Avui"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Goal Check Box */}
      <div className="bg-[#CCFF00]/10 border-4 border-black border-dashed p-5 space-y-2 text-black">
        <h4 className="text-sm font-black uppercase italic text-black flex items-center gap-1.5">
          <Smile className="w-4.5 h-4.5 text-black" /> {lang === "en" ? "Competition Card" : lang === "es" ? "Tarjeta de Competición" : "Targeta de Competició"}
        </h4>
        <p className="text-xs uppercase font-bold text-gray-800 leading-relaxed">
          {lang === "en" 
            ? "The victory is for hunters who sum 100 base points in the minimum possible time limit. Verify the 10 weekly real items around town to achieve ultimate champion badge!" 
            : lang === "es"
            ? "La victoria es para los cazadores que sumen 100 puntos totales en el menor tiempo posible. ¡Encuentra los objetos de la calle usando la visión artificial!"
            : "La victòria és per als caçadors que sumin els 100 punts totals en el menor temps possible. Tens l'autenticació del mosaïc completament actualitzada per la IA de visió computacional."}
        </p>
      </div>

      {/* Session Logout Action Button (Explicitly requested by user) */}
      <div className="border-4 border-black p-4 bg-red-50 text-black flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        <div>
          <span className="text-xs font-black text-red-700 bg-red-100 border border-black px-2 py-0.5 uppercase tracking-wide leading-none inline-block rotate-[-2deg] mb-1.5">
            {lang === "en" ? "DANGER ZONE" : lang === "es" ? "ZONA CRÍTICA" : "ZONA CRÍTICA"}
          </span>
          <h4 className="font-extrabold text-sm uppercase">{lang === "en" ? "CLOSE CURRENT CACERA SESSION" : lang === "es" ? "CERRAR SESIÓN DE ESTE DISPOSITIVO" : "TANCAR LA SESSIÓ DELS DISPOSITIUS"}</h4>
          <p className="text-[10px] font-semibold text-gray-650 uppercase mt-0.5">
            {lang === "en" ? "Exit safely. Your weekly verification photos and scoreboard standings will stay saved!" : lang === "es" ? "Saldrás de este navegador de forma segura. ¡Tu progreso continuará en la clasificación!" : "Surt de l'aplicació de manera segura. El rànking general no es perdrà!"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowLogoutConfirm(true);
          }}
          className="w-full sm:w-auto px-5 py-3.5 bg-red-650 hover:bg-black text-white hover:text-red-500 border-2 border-black font-black uppercase text-xs tracking-wider transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center justify-center gap-1.5"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>{lang === "en" ? "Log Out Now" : lang === "es" ? "Cerrar Sesión" : "Tancar Sessió"}</span>
        </button>
      </div>

      {/* CUSTOM IN-APP LOGOUT CONFIRMATION DIALOG */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-55 bg-black/85 flex flex-col justify-center items-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-4 border-black p-6 rounded-none max-w-sm w-full text-left space-y-4 shadow-[8px_8px_0px_rgba(0,0,0,1)] text-black">
            <div className="flex items-center gap-2 border-b-2 border-black pb-2 text-black">
              <LogOut className="w-5 h-5 shrink-0 text-red-600 animate-pulse" />
              <h4 className="text-sm font-black uppercase tracking-wider">{lang === "en" ? "DISCONNECT SESSION" : lang === "es" ? "CERRAR SESIÓN DE AGENTE" : "TANCAR SESSIÓ D'AGENT"}</h4>
            </div>

            <p className="text-xs font-bold uppercase text-neutral-850 leading-relaxed">
              {lang === "en" 
                ? "Are you sure you want to disconnect from FlashHunt? Choose 'CONFIRM' to log out of this account. You can log back in instantly."
                : lang === "es"
                ? "¿De verdad quieres salir de tu perfil? Tu cacería de la semana guardada estará disponible y segura."
                : "Segur que vols tancar la sessió a FlashHunt? L'estat de la teva cacera quedarà guardat per quan tornis a entrar ràpidament."}
            </p>

            <div className="grid grid-cols-2 gap-2 pb-0.5">
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                }}
                className="py-2 px-4 border-2 border-black bg-neutral-100 hover:bg-neutral-200 text-black text-[11px] font-black uppercase text-center cursor-pointer transition-colors"
              >
                {lang === "en" ? "GO BACK" : lang === "es" ? "VOLVER" : "TORNAR ENRERE"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                }}
                className="py-2 px-4 border-2 border-black bg-red-655 hover:bg-black text-red-600 hover:text-[#CCFF00] text-[11px] font-black uppercase text-center cursor-pointer transition-colors shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              >
                {lang === "en" ? "CONFIRM" : lang === "es" ? "SALIR" : "CONFIRMAR"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
