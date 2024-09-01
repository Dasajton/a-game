import { useState, useMemo, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAppContext } from "../AppContext";
import { RigidBody } from "@react-three/rapier";

export default function Scroll({ position = [0, -0.5, 0] }) {
  const gltf = useLoader(GLTFLoader, "./scrollLowPerf.glb");
  const scene = useMemo(() => gltf.scene.clone(), [gltf]);
  const [visible, setVisible] = useState(true);
  const lockItemCollect = useRef(false);

  const { setItemsCollected } = useAppContext();

  gltf.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

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
