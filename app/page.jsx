"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Sky, Stars, Loader } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import {
  Ninja,
  Level,
  LevelCollider,
  UICollectedItems,
  Lights,
  Lamp,
  Trees,
  Scrolls,
  VictoryScreen,
  GuardianSpirits,
  PlayerTracker,
  CompassTracker,
  HUD,
  Toast,
  ToriiGate,
  SafetyNet,
} from "./components";
import keyboardMap from "./utility/keyboardControlls";
import animationSet from "./utility/animationsSet";
import { AppProvider, useAppContext } from "./AppContext";
import { preloadAssets } from "./utility/preloadAssets";

const characterURL = "/Ninja.glb";

preloadAssets();

function GameScene() {
  const canvasRef = useRef();
  const [isLocked, setIsLocked] = useState(false);
  const { startRun, levelCompleted } = useAppContext();

  useEffect(() => {
    const canvas = canvasRef.current;

    const handlePointerLockChange = () => {
      setIsLocked(document.pointerLockElement === canvas);
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
    };
  }, []);

  useEffect(() => {
    if (isLocked) startRun();
  }, [isLocked, startRun]);

  useEffect(() => {
    if (levelCompleted && document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, [levelCompleted]);

  const handleClick = () => {
    if (canvasRef.current && !levelCompleted) {
      canvasRef.current.requestPointerLock();
    }
  };

  return (
    <div className="container">
      <UICollectedItems />
      <HUD />
      <Toast />
      <VictoryScreen />
      {!isLocked && !levelCompleted && (
        <div className="controlsHint">
          <p>Klicke, um zu spielen</p>
          <p>
            <strong>WASD</strong> bewegen &middot; <strong>Maus</strong>{" "}
            umsehen &middot; <strong>Shift</strong> sprinten &middot;{" "}
            <strong>Leertaste</strong> springen
          </p>
          <p className="controlsHintFlavor">
            Finde alle Schriftrollen &mdash; und meide die Wächtergeister.
          </p>
        </div>
      )}
      <Canvas ref={canvasRef} onClick={handleClick} shadows dpr={[1, 2]}>
        <Sky
          sunPosition={[0, 0.1, 0.1]}
          mieDirectionalG={1}
          mieCoefficient={0.1}
          rayleigh={0}
          turbidity={0.01}
        />
        <Stars depth={200} />
        <Physics>
          <Suspense fallback={null}>
            {/* Collision geometry mounts first so its Rapier colliders are
                registered before the character's rigid body starts falling
                under gravity, avoiding a spawn-in tunneling race. */}
            <LevelCollider />
            <SafetyNet />
            <Trees />
            <Lamp />

            <KeyboardControls map={keyboardMap}>
              <Ecctrl animated sprintMult={4.0}>
                <EcctrlAnimation
                  characterURL={characterURL}
                  animationSet={animationSet}
                >
                  <Ninja />
                </EcctrlAnimation>
              </Ecctrl>
            </KeyboardControls>

            <Lights />
            <Level />
            <ToriiGate />
            <Scrolls />
            <GuardianSpirits />
            <PlayerTracker />
            <CompassTracker />
          </Suspense>
        </Physics>
      </Canvas>
      <Loader />
    </div>
  );
}

export default function Game() {
  return (
    <AppProvider>
      <GameScene />
    </AppProvider>
  );
}
