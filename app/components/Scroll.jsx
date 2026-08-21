import { useState, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useAppContext } from "../AppContext";
import { RigidBody } from "@react-three/rapier";

export default function Scroll({ position = [0, -0.5, 0] }) {
  const { scene: sourceScene } = useGLTF("/ScrollLowPerf.glb");
  const scene = useMemo(() => {
    const clone = sourceScene.clone();
    clone.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    return clone;
  }, [sourceScene]);
  const [visible, setVisible] = useState(true);
  const lockItemCollect = useRef(false);

  const { setItemsCollected } = useAppContext();

  const handleItemCollect = () => {
    if (!lockItemCollect.current) {
      lockItemCollect.current = true;
      setItemsCollected((prev) => prev + 1);
      setVisible(false);
      setTimeout(() => {
        lockItemCollect.current = false;
      }, 500);
    }
  };

  return (
    visible && (
      <group position={position} scale={0.1}>
        <RigidBody type="fixed" sensor onIntersectionEnter={handleItemCollect}>
          <primitive object={scene} />
        </RigidBody>
      </group>
    )
  );
}
