"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import { TOTAL_SCROLLS } from "../utility/constants";

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function HUD() {
  const {
    hasStarted,
    levelCompleted,
    runStartRef,
    detections,
    compass,
    itemsCollected,
    muted,
    toggleMuted,
  } = useAppContext();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!hasStarted || levelCompleted) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [hasStarted, levelCompleted]);

  if (!hasStarted) return null;

  const elapsed = runStartRef.current ? now - runStartRef.current : 0;

  return (
    <>
      <div className="hudBar">
        <span className="hudTimer">⏱ {formatTime(elapsed)}</span>
        <span className="hudScrolls">
          巻 {itemsCollected}/{TOTAL_SCROLLS}
        </span>
        {detections > 0 && <span className="hudDetections">👁 {detections}</span>}
        <button
          type="button"
          className="hudMute"
          onClick={toggleMuted}
          aria-label={muted ? "Ton einschalten" : "Ton ausschalten"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>
      {compass && !levelCompleted && (
        <div className="hudCompass">
          <div
            className={`hudCompassArrow${compass.golden ? " golden" : ""}`}
            style={{ transform: `rotate(${compass.angle}rad)` }}
          >
            ▲
          </div>
          <span className="hudCompassDistance">{Math.round(compass.distance)}m</span>
        </div>
      )}
    </>
  );
}
