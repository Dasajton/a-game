import { DETECTION_PENALTY_SECONDS } from "./constants";

const RANKS = [
  { rank: "S", maxSeconds: 60 },
  { rank: "A", maxSeconds: 100 },
  { rank: "B", maxSeconds: 150 },
  { rank: "C", maxSeconds: Infinity },
];

export function calculateRank({ elapsedMs, detections, goldenCollected }) {
  const goldenBonus = goldenCollected ? 15 : 0;
  const adjustedSeconds = Math.max(
    0,
    elapsedMs / 1000 + detections * DETECTION_PENALTY_SECONDS - goldenBonus
  );
  const { rank } = RANKS.find((r) => adjustedSeconds <= r.maxSeconds);
  return { rank, adjustedSeconds };
}
