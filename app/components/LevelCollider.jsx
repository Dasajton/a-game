import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";

export default function LevelCollider() {
  const { scene } = useGLTF("/FinalCollisionMap.glb");
  const mapRef = useRef(null);

  return (
    <group visible={false} position={[0, -1.1, 70]} scale={1.5}>
      <RigidBody type="fixed" ref={mapRef} colliders="trimesh">
        <primitive object={scene} />
      </RigidBody>
    </group>
  );
}
