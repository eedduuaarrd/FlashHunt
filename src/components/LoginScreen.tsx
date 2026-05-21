import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock, User, MapPin, Fingerprint, Trash2, Key, X, UserCheck } from "lucide-react";
import { TRANSLATIONS, Lang } from "../translations";
import { playBeep, playSuccessSound, playScanSound, playErrorSound } from "../utils/audio";

interface LoginScreenProps {
  onLogin: (nickname: string, city: string) => void;
  lang: Lang;
  onSetLang: (lang: Lang) => void;
}

export default function LoginScreen({ onLogin, lang, onSetLang }: LoginScreenProps) {
  const t = TRANSLATIONS[lang];
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [city, setCity] = useState("Barcelona");
  const [error, setError] = useState("");
  const [activePopupProvider, setActivePopupProvider] = useState<"Google" | "Facebook" | "Apple" | null>(null);
  const [popupEmail, setPopupEmail] = useState("");
  const [popupPassword, setPopupPassword] = useState("");

  // Authenticating state for smooth arcade feedback
  const [authenticatingUser, setAuthenticatingUser] = useState<string | null>(null);

  // Saved accounts list for switching on the same browser
  const [savedAccounts, setSavedAccounts] = useState<{ nickname: string; email: string; city: string; lastUsed: number }[]>(() => {
    try {
      const saved = localStorage.getItem("flashhunt_saved_accounts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveAccountToDevice = (nick: string, mail: string, cty: string) => {
    try {
      const saved = localStorage.getItem("flashhunt_saved_accounts");
      let list = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(list)) list = [];
      // Remove previous duplicates
      list = list.filter((acc: any) => acc.email.toLowerCase() !== mail.toLowerCase() && acc.nickname.toLowerCase() !== nick.toLowerCase());
      // Insert on top
      list.unshift({ nickname: nick, email: mail, city: cty, lastUsed: Date.now() });
      list = list.slice(0, 4); // Keep maximum 4 active accounts
      localStorage.setItem("flashhunt_saved_accounts", JSON.stringify(list));
      setSavedAccounts(list);
    } catch (e) {
      console.warn("Could not write saved accounts", e);
    }
  };

  const forgetAccount = (mail: string, nick: string) => {
    playErrorSound();
    const updated = savedAccounts.filter(acc => acc.email !== mail || acc.nickname !== nick);
    setSavedAccounts(updated);
    localStorage.setItem("flashhunt_saved_accounts", JSON.stringify(updated));
  };

  const handleQuickLogin = (acc: { nickname: string; email: string; city: string }) => {
    playScanSound();
    setAuthenticatingUser(acc.nickname);
    
    // Simulate beautiful AI Studio neural loading handshake
    setTimeout(() => {
      playSuccessSound();
      saveAccountToDevice(acc.nickname, acc.email, acc.city); // Refresh lastUsed
      onLogin(acc.nickname, acc.city);
    }, 1300);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError(lang === "en" ? "Please fill all credential fields." : lang === "es" ? "Por favor completa todos los campos." : "Si us plau, omple tots els camps d’accés.");
      playErrorSound();
      return;
    }
    setError("");
    const userNick = nickname.trim() || email.split("@")[0] || "Caçador_Anònim";
    
    playScanSound();
    setAuthenticatingUser(userNick);

    saveAccountToDevice(userNick, email, city);

    setTimeout(() => {
      playSuccessSound();
      onLogin(userNick, city);
    }, 1300);
  };

  const handleSimulatedOAuthLogin = (provider: "Google" | "Facebook" | "Apple") => {
    playBeep();
    setActivePopupProvider(provider);
    const simulatedEmail = `${provider.toLowerCase()}.scout@flashhunt.cat`;
    setPopupEmail(simulatedEmail);
  };

  const submitSimulatedOAuth = () => {
    setActivePopupProvider(null);
    let mockNick = popupEmail.split("@")[0].replace(".", "_");
    if (activePopupProvider) {
      mockNick = `${mockNick}_${activePopupProvider.substring(0, 3).toUpperCase()}`;
    }
    
    playScanSound();
    setAuthenticatingUser(mockNick);

    saveAccountToDevice(mockNick, popupEmail, city);

    setTimeout(() => {
      playSuccessSound();
      onLogin(mockNick, city);
    }, 1300);
  };

  return (
    <div id="login-screen-v8" className="min-h-screen bg-[#F3F3F3] flex flex-col justify-center items-center py-8 px-4 selection:bg-[#CCFF00] selection:text-black font-sans text-black animate-fade-in relative overflow-hidden">
      
      {/* Background ambient retro vectors */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full bg-[#CCFF00]/10 border-4 border-black border-dashed -z-10 pointer-events-none animate-spin" style={{ animationDuration: "60s" }} />
      <div className="absolute bottom-[-150px] right-[-150px] w-128 h-128 rounded-full bg-black/5 border-4 border-black -z-10 pointer-events-none" />

      <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10">
        
        {/* Header Block Section */}
        <div className="p-6 bg-[#CCFF00] border-b-4 border-black text-black text-center space-y-1 relative">
          <div className="absolute top-2.5 right-2.5 bg-black text-[#CCFF00] font-black text-[9px] px-1.5 py-0.5 border border-black uppercase rotate-3">
            v4.0 STABLE
          </div>
          <h1 className="text-5xl font-black tracking-tighter leading-none uppercase italic flex items-center justify-center gap-1">
            Flash<span className="text-stroke-black">Hunt</span>
          </h1>
          <span className="text-[10px] font-bold tracking-[0.2em] block uppercase text-black/85">
            {t.loginSubtitle || "CIUTATS DE CATALUNYA EN JOC"}
          </span>
        </div>

        {/* Language Selector Row */}
        <div className="bg-black text-[#CCFF00] px-4 py-2 border-b-4 border-black flex items-center justify-between gap-1.5 text-xs font-black uppercase">
          <span className="text-[9px] tracking-wider text-neutral-400">SELECT REGION:</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => { playBeep(); onSetLang("ca"); }}
              className={`px-2 py-0.5 border text-[10px] tracking-tight ${
                lang === "ca"
                  ? "bg-[#CCFF00] text-black border-[#CCFF00]"
                  : "bg-transparent text-neutral-300 border-neutral-700 hover:text-white"
              } cursor-pointer transition-all`}
            >
              CAT
            </button>
            <button
              type="button"
              onClick={() => { playBeep(); onSetLang("es"); }}
              className={`px-2 py-0.5 border text-[10px] tracking-tight ${
                lang === "es"
                  ? "bg-[#CCFF00] text-black border-[#CCFF00]"
                  : "bg-transparent text-neutral-300 border-neutral-700 hover:text-white"
              } cursor-pointer transition-all`}
            >
              ESP
            </button>
            <button
              type="button"
              onClick={() => { playBeep(); onSetLang("en"); }}
              className={`px-2 py-0.5 border text-[10px] tracking-tight ${
                lang === "en"
                  ? "bg-[#CCFF00] text-black border-[#CCFF00]"
                  : "bg-transparent text-neutral-300 border-neutral-700 hover:text-white"
              } cursor-pointer transition-all`}
            >
              ENG
            </button>
          </div>
        </div>

        {/* SCENARIO A: Saved accounts list directly on device */}
        {savedAccounts.length > 0 && (
          <div className="p-5 border-b-4 border-black bg-neutral-50 space-y-3.5">
            <h2 className="text-xs font-black tracking-wider uppercase text-black flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-black" />
              {lang === "en" ? "DETECTED HUNTING SIGNATURES" : lang === "es" ? "CUENTAS ACUMULADAS EN EL DISPOSITIVO" : "COMPTES REGISTRATS EN AQUEST DISPOSITIU"}
            </h2>

            <div className="grid grid-cols-1 gap-2.5">
              {savedAccounts.map((acc) => (
                <div
                  key={acc.nickname}
                  className="bg-white border-2 border-black p-3 flex items-center justify-between gap-2.5 transition-all hover:bg-[#CCFF00]/5 hover:translate-x-1 hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] relative group"
                >
                  <button
                    type="button"
                    onClick={() => handleQuickLogin(acc)}
                    className="flex-1 flex items-center gap-3 text-left focus:outline-none cursor-pointer"
                  >
                    {/* User Avatar tag initials */}
                    <div className="w-10 h-10 bg-[#CCFF00] border-2 border-black flex items-center justify-center font-black text-black uppercase italic text-sm tracking-tighter select-none rotate-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] shrink-0 group-hover:scale-105 transition-transform">
                      {acc.nickname.substring(0, 2)}
                    </div>
                    
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-extrabold text-[#CCFF00] text-xs px-1.5 py-0.2 bg-black inline-block tracking-wide">
                        {acc.nickname}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-bold uppercase flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-black shrink-0" /> {acc.city} • {acc.email}
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleQuickLogin(acc)}
                      title="Entrada ràpida"
                      className="p-1 px-2 border border-black bg-black text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black font-black text-[9px] uppercase tracking-wide cursor-pointer transition-colors"
                    >
                      {lang === "en" ? "Quick Entry" : lang === "es" ? "Acceso Rápido" : "Entra Directe"}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => forgetAccount(acc.email, acc.nickname)}
                      title="Oblidar de la llista"
                      className="p-1.5 border border-black bg-white hover:bg-red-50 text-neutral-500 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 space-y-5">
          {/* Tabs switch */}
          <div className="grid grid-cols-2 gap-2 border-b-2 border-black pb-4 font-black text-xs">
            <button
              type="button"
              onClick={() => { playBeep(); setIsRegister(false); setError(""); }}
              className={`py-2 text-xs font-black uppercase border-2 transition-all cursor-pointer text-center ${
                !isRegister 
                  ? "bg-black text-[#CCFF00] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]" 
                  : "bg-white text-black border-black hover:bg-gray-100"
              }`}
            >
              {lang === "ca" ? "Inicia Sessió" : lang === "es" ? "Inicia Sesión" : "Log In"}
            </button>
            <button
              type="button"
              onClick={() => { playBeep(); setIsRegister(true); setError(""); }}
              className={`py-2 text-xs font-black uppercase border-2 transition-all cursor-pointer text-center ${
                isRegister 
                  ? "bg-black text-[#CCFF00] border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]" 
                  : "bg-white text-black border-black hover:bg-gray-100"
              }`}
            >
              {lang === "ca" ? "Registra't de nou" : lang === "es" ? "Registrarse" : "Sign Up"}
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {error && (
              <div className="border-2 border-black bg-red-100 p-2.5 text-xs font-black text-red-900 uppercase animate-bounce">
                ⚠️ Error: {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-black tracking-wider flex items-center gap-1">
                <Mail className="w-3 h-3 text-black" /> {lang === "en" ? "EMAIL ADDRESS" : lang === "es" ? "CORREO ELECTRÓNICO" : "CORREU ELECTRÒNIC"}
              </label>
              <input
                type="email"
                required
                placeholder="correu@exemple.cat"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white border-2 border-black px-3.5 py-2 text-black text-sm font-bold focus:outline-none focus:bg-[#CCFF00]/10 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-black tracking-wider flex items-center gap-1">
                <Lock className="w-3 h-3 text-black" /> {lang === "en" ? "SECURE PASSWORD" : lang === "es" ? "CONTRASEÑA SEGURA" : "CONTRASENYA SEGURA"}
              </label>
              <input
                type="password"
                required
                placeholder="••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white border-2 border-black px-3.5 py-2 text-black text-sm font-bold focus:outline-none focus:bg-[#CCFF00]/10 transition-colors"
              />
            </div>

            {isRegister && (
              <>
                <div className="space-y-1 animate-fade-in">
                  <label className="text-[10px] font-black uppercase text-black tracking-wider flex items-center gap-1">
                    <User className="w-3 h-3 text-black" /> {t.loginLabelNickname}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.loginPlaceholderNickname}
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                    className="w-full bg-white border-2 border-black px-3.5 py-2 text-black text-sm font-bold focus:outline-none focus:bg-[#CCFF00]/10 transition-colors"
                    maxLength={18}
                  />
                </div>

                <div className="space-y-1 animate-fade-in">
                  <label className="text-[10px] font-black uppercase text-black tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-black" /> {t.loginLabelCity}
                  </label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full bg-white border-2 border-black px-3.5 py-2 text-black text-sm font-bold focus:outline-none cursor-pointer"
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
              </>
            )}

            {!isRegister && (
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-black tracking-wider">
                  {lang === "en" ? "LOGIN ACTIVE REGION / CITY" : lang === "es" ? "CIUDAD DE INICIO DE SESIÓN" : "CIUTAT DIÀRIA DE CACERA"}
                </label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full bg-white border-2 border-black px-3.5 py-2 text-black text-sm font-bold focus:outline-none cursor-pointer"
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
            )}

            <button
              id="submit-auth-btn"
              type="submit"
              className="w-full bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] text-black font-black border-2 border-black py-3 rounded-none transition-all font-sans text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{isRegister ? (lang === "en" ? "Register & Enter" : lang === "es" ? "Registrar y Entrar" : "Registrar i Començar") : (lang === "en" ? "Enter FlashHunt" : lang === "es" ? "Entrar en FlashHunt" : "Entrar a l'Aplicació")}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </form>

          {/* How it works info summary accordion list */}
          <div className="bg-neutral-50 border-2 border-black p-3.5 text-[11px] font-bold uppercase space-y-1 text-black">
            <span className="text-[10px] font-black text-neutral-500 block">{t.loginDescTitle}</span>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-1">⏱️ <span className="leading-tight">{t.loginDesc1}</span></li>
              <li className="flex items-start gap-1">🚶 <span className="leading-tight">{t.loginDesc2}</span></li>
              <li className="flex items-start gap-1">🤖 <span className="leading-tight">{t.loginDesc3}</span></li>
              <li className="flex items-start gap-1">🏆 <span className="leading-tight">{t.loginDesc4}</span></li>
            </ul>
          </div>

          {/* Social login divider */}
          <div className="flex items-center my-4 select-none">
            <div className="flex-1 h-[2px] bg-black"></div>
            <span className="px-3 text-[10px] font-black uppercase text-neutral-400 bg-white">Alternative Sign-In</span>
            <div className="flex-1 h-[2px] bg-black"></div>
          </div>

          {/* Social Sign-In buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleSimulatedOAuthLogin("Google")}
              className="bg-white border-2 border-black p-2 hover:bg-[#CCFF00]/10 transition-colors cursor-pointer text-center font-bold text-[11px] tracking-tight flex flex-col items-center justify-center gap-1 group shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <span className="text-red-500 font-extrabold group-hover:scale-110 transition-transform">G</span>
              <span className="text-[9px] font-black uppercase">Google</span>
            </button>

            <button
              onClick={() => handleSimulatedOAuthLogin("Facebook")}
              className="bg-white border-2 border-black p-2 hover:bg-[#CCFF00]/10 transition-colors cursor-pointer text-center font-bold text-[11px] tracking-tight flex flex-col items-center justify-center gap-1 group shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <span className="text-blue-600 font-extrabold group-hover:scale-110 transition-transform">F</span>
              <span className="text-[9px] font-black uppercase">Facebook</span>
            </button>

            <button
              onClick={() => handleSimulatedOAuthLogin("Apple")}
              className="bg-white border-2 border-black p-2 hover:bg-[#CCFF00]/10 transition-colors cursor-pointer text-center font-bold text-[11px] tracking-tight flex flex-col items-center justify-center gap-1 group shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <span className="text-black font-extrabold group-hover:scale-110 transition-transform"></span>
              <span className="text-[9px] font-black uppercase">Apple</span>
            </button>
          </div>

          <div className="text-center font-bold text-[9px] uppercase text-neutral-400 tracking-wider pt-2 border-t border-black/10 flex items-center justify-center gap-1 selection:bg-transparent">
            <ShieldCheck className="w-3.5 h-3.5 text-black shrink-0" /> {lang === "en" ? "AUTHENTICATION SECURED BY DEVICE KEYRING SHA-256" : lang === "es" ? "CONEXIÓN CON ENCRIPTACIÓN DE SEGURIDAD SHA-256" : "SISTEMA PROTEGIT AMB CARNET SHA-256"}
          </div>
        </div>
      </div>

      {/* Simulated Popups for Google/Facebook/Apple Sign In */}
      {activePopupProvider && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-white border-4 border-black p-6 max-w-sm w-full space-y-4 shadow-[8px_8px_0px_rgba(0,0,0,1)] text-black text-left animate-zoom-in">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <span className="font-black text-xs uppercase tracking-widest text-neutral-400">
                Inici de Sessió Segur
              </span>
              <button
                onClick={() => { playBeep(); setActivePopupProvider(null); }}
                className="text-black font-black text-xs hover:text-red-600 bg-neutral-100 hover:bg-neutral-200 border border-black px-1.5 py-0.5"
              >
                [X]
              </button>
            </div>

            <div className="space-y-1 bg-[#F3F3F3] p-3 border-2 border-black border-dashed flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black text-[#CCFF00] font-black flex items-center justify-center shrink-0">
                {activePopupProvider === "Google" ? "G" : activePopupProvider === "Facebook" ? "F" : ""}
              </div>
              <div>
                <p className="text-xs font-black uppercase">Autenticador {activePopupProvider}</p>
                <p className="text-[10px] text-neutral-600 font-bold uppercase">Permetent enviament segur de credencials</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-neutral-550">CORREU DE COMPTE ({activePopupProvider})</label>
                <input
                  type="email"
                  value={popupEmail}
                  onChange={(e) => setPopupEmail(e.target.value)}
                  className="w-full bg-white border-2 border-black px-3 py-1.5 text-black text-xs font-bold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-neutral-550">CONTRASENYA SEGURA</label>
                <input
                  type="password"
                  value={popupPassword}
                  onChange={(e) => setPopupPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full bg-white border-2 border-black px-3 py-1.5 text-black text-xs font-bold focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={submitSimulatedOAuth}
              className="w-full bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] text-black font-black border-2 border-black py-2.5 text-xs transition-colors uppercase tracking-widest cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
            >
              Conectar Compte via {activePopupProvider}
            </button>
          </div>
        </div>
      )}

      {/* FULL SCREEN ANIMATED NEURAL/BIOMETRIC HANDSHAKE OVERLAY */}
      {authenticatingUser && (
        <div className="fixed inset-0 bg-black/95 flex flex-col justify-center items-center z-50 p-6 backdrop-blur-md">
          <div className="w-full max-w-sm text-center space-y-6">
            
            {/* Concentric Biometric Circles */}
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border-4 border-[#CCFF00] animate-ping opacity-25" style={{ animationDuration: "1.8s" }} />
              {/* Middle spinning dashed ring */}
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#CCFF00]/60 animate-spin" style={{ animationDuration: "6s" }} />
              {/* Inner glow circle */}
              <div className="absolute inset-4 rounded-full bg-[#CCFF00]/10 border-2 border-[#CCFF00] flex items-center justify-center">
                <Fingerprint className="w-12 h-12 text-[#CCFF00] animate-pulse" />
              </div>

              {/* Running matrix grid lines */}
              <div className="absolute left-1/2 -translate-x-1/2 w-40 h-0.5 bg-[#CCFF00] opacity-80 blur-[1px] animate-bounce" style={{ top: "40%" }} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black uppercase text-[#CCFF00] tracking-wider animate-pulse">
                SCANNING USER SIGNATURE...
              </h3>
              <p className="text-[10px] font-mono uppercase text-gray-400 tracking-widest bg-white/5 py-1 px-3 border border-white/10 italic">
                Ranger ID: @{authenticatingUser.toLowerCase()}
              </p>
            </div>

            <div className="bg-black border-2 border-neutral-800 p-4 font-mono text-left text-[10px] space-y-1.5 text-[#CCFF00]/80">
              <div className="flex items-center gap-1.5">
                <span className="text-[#CCFF00]">✓</span> DEVICE HANDSHAKE SET
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#CCFF00]">✓</span> PARSING LOCALLY SAVE SECURE CRYPTO KEYS
              </div>
              <div className="flex items-center gap-1.5 text-neutral-400 animate-pulse">
                <span className="text-[#CCFF00]/40">⏳</span> RETRIEVING SCOPED SCAVENGER DATA PORFOLIO...
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
