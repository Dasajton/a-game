// Purely decorative, primitive-built torii gate near the spawn point to
// frame the start of the run. No collider — walking through it is intended.
export default function ToriiGate() {
  return (
    <group position={[0, -0.9, 6]}>
      <mesh position={[-3.2, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 4, 0.5]} />
        <meshStandardMaterial color="#8b2e2e" />
      </mesh>
      <mesh position={[3.2, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 4, 0.5]} />
        <meshStandardMaterial color="#8b2e2e" />
      </mesh>
      <mesh position={[0, 4.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[7.8, 0.4, 0.7]} />
        <meshStandardMaterial color="#8b2e2e" />
      </mesh>
      <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.8, 0.3, 0.55]} />
        <meshStandardMaterial color="#3b2a1a" />
      </mesh>
    </group>
  );
}
