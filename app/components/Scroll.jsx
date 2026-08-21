import { useState, useMemo, useRef, useId, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useAppContext } from "../AppContext";
import { RigidBody } from "@react-three/rapier";

export default function Scroll({ position = [0, -0.5, 0], golden = false }) {
  const { scene: sourceScene } = useGLTF("/ScrollLowPerf.glb");
  const scene = useMemo(() => {
    const clone = sourceScene.clone();
    clone.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        if (golden) {
          object.material = object.material.clone();
          object.material.emissive = new THREE.Color("#ffcf4d");
          object.material.emissiveIntensity = 0.8;
          object.material.color = new THREE.Color("#ffe28a");
        }
      }
    });
    return clone;
  }, [sourceScene, golden]);
  const [visible, setVisible] = useState(true);
  const lockItemCollect = useRef(false);
  const id = useId();

  const {
    collectScroll,
    collectGolden,
    registerTarget,
    unregisterTarget,
    markTargetCollected,
  } = useAppContext();

  useEffect(() => {
    registerTarget(id, position, { golden });
    return () => unregisterTarget(id);
  }, [id, position, golden, registerTarget, unregisterTarget]);

  const handleItemCollect = () => {
    if (!lockItemCollect.current) {
      lockItemCollect.current = true;
      markTargetCollected(id);
      golden ? collectGolden() : collectScroll();
      setVisible(false);
      setTimeout(() => {
        lockItemCollect.current = false;
      }, 500);
    }
  };

  return (
    visible && (
      <group position={position} scale={golden ? 0.14 : 0.1}>
        <RigidBody type="fixed" sensor onIntersectionEnter={handleItemCollect}>
          <primitive object={scene} />
        </RigidBody>
        {golden && <pointLight color="#ffcf4d" intensity={3} distance={6} decay={2} />}
      </group>
    )
  );
}
