import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function Level() {
  const { scene } = useGLTF("/VisualOnlyMap.glb");

  useEffect(() => {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group position={[0, -1.1, 70]} scale={1.5}>
      <primitive object={scene} />
    </group>
  );
}
