import { RigidBody } from "@react-three/rapier";

// A few seams in the hand-built collision trimesh let a sprinting player
// slip through into the void below. Rather than teleporting the character
// (which meant remounting the physics body mid-frame and reliably crashed
// the Rapier WASM step with a re-entrancy panic), just catch anyone who
// falls with plain static floors placed beneath the level.
export default function SafetyNet() {
  return (
    <>
      {/* Flush with the ground right at the entrance corridor by the torii
          gate, where the original mesh has a real gap almost every player
          would otherwise fall through on their very first steps. */}
      <RigidBody type="fixed" position={[10, -1.1, 60]}>
        <mesh>
          <boxGeometry args={[160, 1.4, 150]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      </RigidBody>
      {/* Deep catch-all beneath the rest of the playable area. */}
      <RigidBody type="fixed" position={[25, -8, 110]}>
        <mesh>
          <boxGeometry args={[240, 1, 320]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      </RigidBody>
    </>
  );
}
