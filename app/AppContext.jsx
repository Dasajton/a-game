"use client";
import {
  useContext,
  createContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import {
  playCollect,
  playGolden,
  playDetected,
  playVictory,
  setAudioMuted,
} from "./utility/audio";
import { TOTAL_SCROLLS } from "./utility/constants";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [playerPosition] = useState([0, -0.9, 0]);
  const [itemsCollected, setItemsCollected] = useState(0);
  const [goldenCollected, setGoldenCollected] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [detections, setDetections] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const [muted, setMuted] = useState(false);
  const [toast, setToast] = useState(null);
  const [compass, setCompass] = useState(null);
  const [finalElapsedMs, setFinalElapsedMs] = useState(0);

  // Live/high-frequency data lives in refs so updates don't trigger re-renders.
  const playerPositionRef = useRef([0, -0.9, 0]);
  const targetsRef = useRef(new Map());
  const runStartRef = useRef(null);
  const completedRef = useRef(false);
  const toastTimer = useRef(null);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = useCallback((text, tone = "info", duration = 2200) => {
    setToast({ text, tone, id: Date.now() });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), duration);
  }, []);

  const startRun = useCallback(() => {
    if (!runStartRef.current) {
      runStartRef.current = Date.now();
      setHasStarted(true);
    }
  }, []);

  const registerTarget = useCallback((id, position, meta = {}) => {
    targetsRef.current.set(id, { position, collected: false, ...meta });
  }, []);

  const unregisterTarget = useCallback((id) => {
    targetsRef.current.delete(id);
  }, []);

  const markTargetCollected = useCallback((id) => {
    const target = targetsRef.current.get(id);
    if (target) target.collected = true;
  }, []);

  const collectScroll = useCallback(() => {
    setItemsCollected((prev) => prev + 1);
    playCollect();
  }, []);

  const collectGolden = useCallback(() => {
    setGoldenCollected(true);
    playGolden();
    showToast("Goldene Schriftrolle gefunden! ⭐", "golden");
  }, [showToast]);

  const registerDetection = useCallback(() => {
    setDetections((prev) => prev + 1);
    playDetected();
    showToast("Entdeckt! +15s Strafe", "danger");
  }, [showToast]);

  const completeRun = useCallback(() => {
    const elapsed = runStartRef.current ? Date.now() - runStartRef.current : 0;
    setFinalElapsedMs(elapsed);
    setLevelCompleted(true);
    playVictory();
  }, []);

  useEffect(() => {
    if (itemsCollected >= TOTAL_SCROLLS && hasStarted && !completedRef.current) {
      completedRef.current = true;
      completeRun();
    }
  }, [itemsCollected, hasStarted, completeRun]);

  const dismissVictory = useCallback(() => setLevelCompleted(false), []);

  const restartRun = useCallback(() => {
    setItemsCollected(0);
    setGoldenCollected(false);
    setDetections(0);
    setLevelCompleted(false);
    setFinalElapsedMs(0);
    setCompass(null);
    targetsRef.current.clear();
    completedRef.current = false;
    runStartRef.current = Date.now();
    setRestartKey((k) => k + 1);
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      setAudioMuted(!prev);
      return !prev;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        playerPosition,
        playerPositionRef,
        targetsRef,
        registerTarget,
        unregisterTarget,
        markTargetCollected,
        itemsCollected,
        goldenCollected,
        levelCompleted,
        detections,
        hasStarted,
        restartKey,
        muted,
        toast,
        compass,
        finalElapsedMs,
        runStartRef,
        setCompass,
        startRun,
        collectScroll,
        collectGolden,
        registerDetection,
        dismissVictory,
        restartRun,
        toggleMuted,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
