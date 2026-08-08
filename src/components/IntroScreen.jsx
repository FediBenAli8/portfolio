import { useState, useEffect, useRef } from "react";

const LOG_MESSAGES = [
  { text: "INITIALIZING VECTOR FIELD CONTROLLER...", type: "info" },
  { text: "CORE GRAPHICS DRIVER: OK", type: "success" },
  { text: "LOADING INTERACTIVE AMBIENT ORBS & PARTICLE SYSTEM...", type: "info" },
  { text: "ORB SHADERS COMPILED SUCCESSFULLY.", type: "success" },
  { text: "SYNCING PORTFOLIO PROJECT METADATA & REPOS...", type: "info" },
  { text: "FETCHED 12 REPOSITORIES SUCCESSFULLY.", type: "success" },
  { text: "PARSING HUD CORE INTERACTION SCHEMAS...", type: "info" },
  { text: "HUD BOOT SEQUENCE: ACTIVE", type: "success" },
  { text: "DECRYPTING IDENTITY PROTOCOLS...", type: "info" },
  { text: "PROFILE SYNC: BEN ALI FEDI DEPLOYED.", type: "success" },
  { text: "SYSTEM STATUS: FULLY OPERATIONAL.", type: "ready" }
];

export default function IntroScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [consoleLines, setConsoleLines] = useState([]);
  const [phase, setPhase] = useState("loading"); // loading, ready, entering
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const scanTimerRef = useRef(null);
  const consoleContainerRef = useRef(null);

  // Loading sequence
  useEffect(() => {
    if (phase !== "loading") return;

    const totalDuration = 2800; // 2.8s total loading time
    const intervalTime = 40;
    const increment = 100 / (totalDuration / intervalTime);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(progressTimer);
  }, [phase]);

  // Log message generator timed with progress
  useEffect(() => {
    if (phase !== "loading") return;

    const messageIndex = Math.min(
      Math.floor((progress / 100) * LOG_MESSAGES.length),
      LOG_MESSAGES.length - 1
    );

    if (consoleLines.length <= messageIndex) {
      const newLine = LOG_MESSAGES[consoleLines.length];
      if (newLine) {
        setConsoleLines((prev) => [...prev, newLine]);
      }
    }
  }, [progress, consoleLines.length, phase]);

  // Scroll loader console to bottom
  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [consoleLines]);

  // Transition to ready phase
  useEffect(() => {
    if (progress === 100 && phase === "loading") {
      const timeout = setTimeout(() => {
        setPhase("ready");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, phase]);

  // Handle Scanning logic (Hold to authorize)
  const startScanning = () => {
    if (phase !== "ready") return;
    setIsScanning(true);
    setScanProgress(0);

    const startTime = Date.now();
    const duration = 1200; // 1.2 seconds hold

    scanTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setScanProgress(pct);

      if (pct >= 100) {
        clearInterval(scanTimerRef.current);
        triggerAccessGranted();
      }
    }, 30);
  };

  const stopScanning = () => {
    setIsScanning(false);
    setScanProgress(0);
    if (scanTimerRef.current) {
      clearInterval(scanTimerRef.current);
    }
  };

  const triggerAccessGranted = () => {
    setPhase("entering");
    const timeout = setTimeout(() => {
      onComplete();
    }, 1200); // match exit-sequence CSS animation duration
    return () => clearTimeout(timeout);
  };

  return (
    <div className={`intro-container ${phase === "entering" ? "exit-sequence" : ""}`}>
      <div className="intro-scanlines"></div>
      <div className="intro-grid"></div>

      <div className="intro-content">
        {phase === "loading" && (
          <div className="cyber-loader">
            <h2 className="loader-title">SYSTEM STARTUP</h2>
            <div className="loader-percentage">{Math.floor(progress)}%</div>

            <div className="loader-bar-container">
              <div
                className="loader-bar-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="loader-console" ref={consoleContainerRef}>
              {consoleLines.map((line, index) => (
                <div
                  key={index}
                  className={`console-line ${line.type === "success"
                      ? "success"
                      : line.type === "ready"
                        ? "ready"
                        : ""
                    }`}
                >
                  {line.type === "success" && "✔ "}
                  {line.type === "ready" && "⚡ "}
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        )}

        {phase !== "loading" && (
          <div className="entry-portal">
            <div className="entry-welcome">Welcome to the Portfolio</div>
            <div className="entry-identity">ACCESS PORTAL : ALEX MERCER</div>

            <div
              className="scanner-outer"
              onMouseDown={startScanning}
              onMouseUp={stopScanning}
              onMouseLeave={stopScanning}
              onTouchStart={startScanning}
              onTouchEnd={stopScanning}
            >
              <div className="scanner-ring"></div>
              <div className="scanner-pulse"></div>

              <div className={`scanner-button ${isScanning ? "scanning" : ""}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c0-3.517-1.009-6.799-2.753-9.571m-3.44 2.04l.054-.09A13.916 13.916 0 009 11a13.916 13.916 0 002.812 8.485L12 20M7.89 5.23a11.963 11.963 0 00-3.27 3.731M4.62 9a10.974 10.974 0 00.177 3M12 11c0 1.942-.486 3.77-1.348 5.372M10.65 17c.504.606 1.155 1.096 1.85 1.415M12 20c-1.378 0-2.684-.337-3.832-.934m8.058-8.232c.218-.638.337-1.32.337-2.029a10.974 10.974 0 00-.176-3m.176 3c-.114.332-.25.656-.407.967m-3.208-8.232c.114.332.25.656.407.967M18 10.5c0 2.454-.812 4.719-2.188 6.536M15 17.5c-.655.334-1.375.565-2.138.672M12 20c1.378 0 2.684-.337 3.832-.934m1.118-.847A11.963 11.963 0 0020 14.5"
                  />
                </svg>
              </div>

              <div className="scanner-bar"></div>
            </div>

            <div className="scanner-instruction">
              {isScanning
                ? `AUTHORIZING: ${Math.floor(scanProgress)}%`
                : "HOLD TO AUTHORIZE SYSTEM ACCESS"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
