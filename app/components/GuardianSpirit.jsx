import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppContext } from "../AppContext";
import { GUARDIAN_DETECTION_RADIUS } from "../utility/constants";

const CATCH_SECONDS = 1.1;
const COOLDOWN_SECONDS = 4;

export default function GuardianSpirit({ from, to, speed = 0.15, phase = 0 }) {
  const spiritRef = useRef();
  const glowRef = useRef();
  const ringRef = useRef();

  const { playerPositionRef, registerDetection } = useAppContext();

  const start = useMemo(() => new THREE.Vector3(...from), [from]);
  const end = useMemo(() => new THREE.Vector3(...to), [to]);
  const current = useMemo(() => new THREE.Vector3(), []);

  const timeInside = useRef(0);
  const cooldown = useRef(0);

  useFrame((state, delta) => {
    const t = (Math.sin(state.clock.elapsedTime * speed + phase) + 1) / 2;
    current.lerpVectors(start, end, t);
    const bob = Math.sin(state.clock.elapsedTime * 2 + phase) * 0.3;

    if (spiritRef.current) {
      spiritRef.current.position.set(current.x, current.y + bob, current.z);
      spiritRef.current.rotation.y += delta * 0.6;
    }
    if (ringRef.current) {
      ringRef.current.position.set(current.x, current.y - 1, current.z);
    }

    if (cooldown.current > 0) cooldown.current -= delta;

    const [px, , pz] = playerPositionRef.current;
    const dx = px - current.x;
    const dz = pz - current.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    const inRange = dist < GUARDIAN_DETECTION_RADIUS && cooldown.current <= 0;
    if (inRange) {
      timeInside.current += delta;
    } else {
      timeInside.current = Math.max(0, timeInside.current - delta * 2);
    }

    if (timeInside.current >= CATCH_SECONDS) {
      registerDetection();
      timeInside.current = 0;
      cooldown.current = COOLDOWN_SECONDS;
    }

    const alertProgress = Math.min(1, timeInside.current / CATCH_SECONDS);
    const hue = 0.55 - alertProgress * 0.55;

    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.15;
      glowRef.current.scale.setScalar((0.9 + alertProgress * 0.4) * pulse);
      glowRef.current.material.color.setHSL(hue, 1, 0.55);
      glowRef.current.material.emissive.setHSL(hue, 1, 0.5);
    }
    if (ringRef.current) {
      ringRef.current.material.opacity = 0.15 + alertProgress * 0.5;
      ringRef.current.material.color.setHSL(hue, 1, 0.5);
    }
  });

  return (
    <group>
      <group ref={spiritRef}>
        <mesh ref={glowRef}>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color="#5ad1ff"
            emissive="#2aa7ff"
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
        <pointLight color="#5ad1ff" intensity={2} distance={8} decay={2} />
      </group>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry
          args={[GUARDIAN_DETECTION_RADIUS - 0.15, GUARDIAN_DETECTION_RADIUS, 48]}
        />
        <meshBasicMaterial
          color="#5ad1ff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
