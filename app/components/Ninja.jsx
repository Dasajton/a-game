import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAppContext } from "../AppContext";

export default function Ninja() {
  const gltf = useLoader(GLTFLoader, "./ninja.glb");
  const playerRef = useRef(gltf.scene);
  const { playerPosition } = useAppContext();

  gltf.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  return (
    <primitive object={gltf.scene} position={playerPosition} ref={playerRef} />
  );
}
