import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Level() {
  const gltf = useLoader(GLTFLoader, "./VisualOnlyMap.glb");

  gltf.scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  return (
    <group position={[0, -1.1, 70]} scale={1.5}>
      <primitive object={gltf.scene} />
    </group>
  );
}
