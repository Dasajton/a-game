import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function LevelCollider() {
  const gltf = useLoader(GLTFLoader, "./finalCollisionMap.glb");
  const mapRef = useRef(gltf);

  gltf.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  return (
    <group visible={false} position={[0, -1.1, 70]} scale={1.5}>
      <RigidBody type="fixed" ref={mapRef} colliders="trimesh">
        <primitive object={gltf.scene} />
      </RigidBody>
    </group>
  );
}
