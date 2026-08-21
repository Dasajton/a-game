"use client";
import { useAppContext } from "../AppContext";
import { TOTAL_SCROLLS } from "../utility/constants";
import { calculateRank } from "../utility/rank";

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VictoryScreen() {
  const {
    levelCompleted,
    finalElapsedMs,
    detections,
    goldenCollected,
    dismissVictory,
    restartRun,
  } = useAppContext();

  if (!levelCompleted) return null;

  const { rank } = calculateRank({
    elapsedMs: finalElapsedMs,
    detections,
    goldenCollected,
  });

  return (
    <div className="victoryOverlay">
      <div className="victoryCard">
        <p className="victoryTitle">
          Alle {TOTAL_SCROLLS} Schriftrollen gefunden!
        </p>
        <div className={`victoryRank rank-${rank}`}>{rank}</div>
        <ul className="victoryStats">
          <li>Zeit: {formatTime(finalElapsedMs)}</li>
          <li>Entdeckungen: {detections}</li>
          <li>
            {goldenCollected
              ? "⭐ Goldene Schriftrolle gefunden"
              : "Goldene Schriftrolle nicht gefunden"}
          </li>
        </ul>
        <div className="victoryActions">
          <button type="button" onClick={restartRun}>
            Neuer Lauf
          </button>
          <button type="button" className="secondary" onClick={dismissVictory}>
            Weiter erkunden
          </button>
        </div>
      </div>
    </div>
  );
}
