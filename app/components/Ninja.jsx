import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useAppContext } from "../AppContext";

export default function Ninja() {
  const { scene } = useGLTF("/Ninja.glb");
  const playerRef = useRef(scene);
  const { playerPosition } = useAppContext();

  useEffect(() => {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <primitive object={scene} position={playerPosition} ref={playerRef} />
  );
}
