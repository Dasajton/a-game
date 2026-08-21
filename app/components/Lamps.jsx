import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Lamps() {
  const { scene } = useGLTF("/LampsFinal.glb");
  const lampRef = useRef(null);

  useEffect(() => {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group position={[0, -1, 70]} scale={1.5}>
      <RigidBody type="fixed" ref={lampRef} colliders="hull">
        <primitive object={scene} />
      </RigidBody>
    </group>
  );
}
