import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";

export default function Lights() {
  const lightRef = useRef();

  // useHelper(lightRef, DirectionalLightHelper, 5, "red");

  return (
    <>
      <ambientLight color={"lightblue"} intensity={0.2} />
      <directionalLight
        position={[0, 10, 10]}
        ref={lightRef}
        castShadow
        intensity={0.2}
      />
    </>
  );
}
