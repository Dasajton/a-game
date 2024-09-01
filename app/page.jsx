"use client";
import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stats,
  KeyboardControls,
  Sky,
  Stars,
} from "@react-three/drei";
import Trees from "./components/Trees";
import { Physics } from "@react-three/rapier";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import {
  Ninja,
  Level,
  LevelCollider,
  UICollectedItems,
  Lights,
  Lamp,
  Scrolls,
  UILevelCompleted,
} from "./components";
import keyboardMap from "./utility/keyboardControlls";
import animationSet from "./utility/animationsSet";
import { AppProvider } from "./AppContext";

const characterURL = "./ninja.glb";

export default function Game() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;

    const handlePointerLockChange = () => {
      if (document.pointerLockElement === canvas) {
        console.log("Pointer locked!");
      } else {
        console.log("Pointer unlocked!");
      }
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
        <Canvas ref={canvasRef} onClick={handleClick}>
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
              {/* {debugging} */}
              {/* <OrbitControls /> */}
              {/* <Stats /> */}

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
      </div>
    </AppProvider>
  );
}
