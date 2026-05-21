import React, { useRef, useState, useEffect } from "react";
import { Camera, Upload, X, RefreshCw, AlertCircle, Sparkles } from "lucide-react";

interface CameraCaptureProps {
  objectName: string;
  onCapture: (base64Data: string) => void;
  onClose: () => void;
}

export default function CameraCapture({ objectName, onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Initialize camera stream
  async function initCamera() {
    setIsInitializing(true);
    setCameraError(null);
    
    // Stop any existing streams first
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.warn("Could not start camera inline:", err);
      setCameraError(
        "No hem pogut accedir a la càmera en directe o el navegador ho ha bloquejat. Pots prémer 'Pujar arxiu' per activar la càmera nadiua o triar una foto de la galeria."
      );
    } finally {
      setIsInitializing(false);
    }
  }

  useEffect(() => {
    initCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  // Handle snapping of photo
  function handleSnap() {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      
      if (context) {
        // Set canvas to match video actual resolution
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        
        // Mirror if user-facing
        if (facingMode === "user") {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Check base64 format JPEG representation
        const base64 = canvas.toDataURL("image/jpeg", 0.85);
        setCapturedImage(base64);
        
        // Stop camera tracks to save CPU/battery
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      }
    }
  }

  // Toggle front/back camera if possible
  function handleToggleCamera() {
    setFacingMode(prev => (prev === "environment" ? "user" : "environment"));
  }

  // Handle files selected directly from the mobile capture input API
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setCapturedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Submit the selected photo
  function handleSubmit() {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  }

  // Retry the snap
  function handleReset() {
    setCapturedImage(null);
    initCamera();
  }

  return (
    <div id="camera-capture-overlay" className="fixed inset-0 bg-neutral-950/95 z-50 flex flex-col justify-between p-4 md:p-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="flex items-center justify-between text-white border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="bg-amber-500 text-neutral-900 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Caçar
          </div>
          <span className="font-semibold text-lg">{objectName}</span>
        </div>
        <button
          id="close-camera-btn"
          onClick={onClose}
          className="p-1.5 hover:bg-neutral-800 rounded-full transition-colors text-neutral-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content (Camera Stream or Captured Image) */}
      <div className="flex-1 my-4 flex items-center justify-center relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
        {capturedImage ? (
          // Image Preview mode
          <div className="w-full h-full relative flex flex-col items-center justify-center p-2">
            <img
              src={capturedImage}
              alt="Snapshot"
              className="max-h-[60vh] md:max-h-[70vh] rounded-xl object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-black/70 text-amber-400 text-xs px-3 py-1 rounded-full font-medium backdrop-blur-md">
              Revisa la foto abans de validar
            </div>
          </div>
        ) : (
          // Active camera mode
          <>
            {isInitializing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 gap-3">
                <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
                <p className="text-sm">Iniciant la càmera...</p>
              </div>
            )}

            {cameraError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-neutral-300 gap-4">
                <AlertCircle className="w-12 h-12 text-amber-500" />
                <p className="text-sm leading-relaxed max-w-sm">{cameraError}</p>
                <button
                  id="browse-fallback-btn"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-neutral-900 font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-transform duration-100"
                >
                  <Upload className="w-4 h-4" /> Puja una foto o camera
                </button>
              </div>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full max-h-[60vh] md:max-h-[70vh] object-cover ${
                  facingMode === "user" ? "scale-x-[-1]" : ""
                }`}
              />
            )}

            {/* Target overlay guide */}
            {!isInitializing && !cameraError && (
              <div className="absolute pointer-events-none inset-0 border-[3px] border-amber-500/30 m-8 rounded-xl flex items-center justify-center">
                <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-amber-500 rounded-tl"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-amber-500 rounded-tr"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-amber-500 rounded-bl"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-amber-500 rounded-br"></div>
                
                <span className="bg-black/60 text-white text-[11px] font-mono px-3 py-1 rounded-full backdrop-blur-md">
                  Enfoca l'objecte aquí al mig
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Hidden inputs / canvas */}
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Actions Footer */}
      <div className="border-t border-neutral-800 pt-4 flex flex-col gap-3">
        {capturedImage ? (
          // Actions for review photo
          <div className="flex items-center gap-4">
            <button
              id="retake-photo-btn"
              onClick={handleReset}
              className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 rounded-xl transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Repetir foto
            </button>
            <button
              id="confirm-photo-btn"
              onClick={handleSubmit}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold py-3 rounded-xl transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Envia a validar per IA
            </button>
          </div>
        ) : (
          // Actions active camera
          <div className="flex items-center justify-between gap-4">
            <button
              id="camera-upload-option-btn"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
              title="Pujar imatge"
            >
              <Upload className="w-5 h-5" />
              <span className="text-sm font-medium pr-1">Pujar fitxer</span>
            </button>

            {!cameraError && !isInitializing && (
              <button
                id="shutter-trigger-btn"
                onClick={handleSnap}
                className="w-16 h-16 bg-white hover:bg-neutral-200 active:scale-90 rounded-full border-4 border-neutral-300 flex items-center justify-center shadow-lg transition-transform focus:outline-none"
                aria-label="Clica per fer foto"
              >
                <div className="w-11 h-11 bg-amber-500 rounded-full"></div>
              </button>
            )}

            {!cameraError && !isInitializing ? (
              <button
                id="camera-switch-btn"
                onClick={handleToggleCamera}
                className="p-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition-colors"
                title="Girar càmera"
              >
                <RefreshCw className="w-5 h-5 animate-pulse" />
              </button>
            ) : (
              // Empty spacer to balance layout
              <div className="w-11" />
            )}
          </div>
        )}
        <div className="text-center">
          <p className="text-[11px] text-neutral-500">
            Per a objectes distants, apropa't per assegurar una bona verificació amb l'analitzador visual de Gemini.
          </p>
        </div>
      </div>
    </div>
  );
}
