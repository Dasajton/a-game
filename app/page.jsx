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
  UILevelCompleted,
} from "./components";
import keyboardMap from "./utility/keyboardControlls";
import animationSet from "./utility/animationsSet";
import { AppProvider } from "./AppContext";
import { preloadAssets } from "./utility/preloadAssets";

const characterURL = "/Ninja.glb";

preloadAssets();

export default function Game() {
  const canvasRef = useRef();
  const [isLocked, setIsLocked] = useState(false);

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

  const handleClick = () => {
    if (canvasRef.current) {
      canvasRef.current.requestPointerLock();
    }
  };

  return (
    <AppProvider>
      <div className="container">
        <UICollectedItems />
        <UILevelCompleted />
        {!isLocked && (
          <div className="controlsHint">
            <p>Klicke, um zu spielen</p>
            <p>
              <strong>WASD</strong> bewegen &middot; <strong>Maus</strong>{" "}
              umsehen &middot; <strong>Shift</strong> sprinten &middot;{" "}
              <strong>Leertaste</strong> springen
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
              <LevelCollider />
              <Trees />
              <Lamp />
              <Scrolls />
            </Suspense>
          </Physics>
        </Canvas>
        <Loader />
      </div>
    </AppProvider>
  );
}
