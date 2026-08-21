import { useFrame } from "@react-three/fiber";
import { useAppContext } from "../AppContext";

// Ecctrl manages the character's rigid body internally without exposing its
// position, so we approximate "player position" from the follow-camera each
// frame. Written into a ref (not state) since this runs every frame.
export default function PlayerTracker() {
  const { playerPositionRef } = useAppContext();

  useFrame((state) => {
    playerPositionRef.current[0] = state.camera.position.x;
    playerPositionRef.current[1] = state.camera.position.y;
    playerPositionRef.current[2] = state.camera.position.z;
  });

  return null;
}
