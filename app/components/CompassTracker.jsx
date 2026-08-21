import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppContext } from "../AppContext";

const forward = new THREE.Vector3();
const toTarget = new THREE.Vector3();

export default function CompassTracker() {
  const { playerPositionRef, targetsRef, setCompass } = useAppContext();
  const accum = useRef(0);

  useFrame((state, delta) => {
    accum.current += delta;
    if (accum.current < 0.15) return;
    accum.current = 0;

    const [px, , pz] = playerPositionRef.current;
    let nearest = null;
    let nearestDist = Infinity;

    targetsRef.current.forEach((target) => {
      if (target.collected) return;
      const dx = target.position[0] - px;
      const dz = target.position[2] - pz;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = target;
      }
    });

    if (!nearest) {
      setCompass(null);
      return;
    }

    state.camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    toTarget
      .set(nearest.position[0] - px, 0, nearest.position[2] - pz)
      .normalize();

    const angle = Math.atan2(
      forward.x * toTarget.z - forward.z * toTarget.x,
      forward.x * toTarget.x + forward.z * toTarget.z
    );

    setCompass({ angle, distance: nearestDist, golden: !!nearest.golden });
  });

  return null;
}
