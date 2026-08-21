import GuardianSpirit from "./GuardianSpirit";

// Patrol routes loosely follow the walkable areas used for scroll placement.
const routes = [
  { from: [24, 1, 45], to: [-16, 1, 65], speed: 0.18, phase: 0 },
  { from: [-46, 1, 145], to: [-28, 1, 185], speed: 0.15, phase: 2.1 },
  { from: [58, 1, 115], to: [86, 1, 155], speed: 0.2, phase: 4.2 },
];

export default function GuardianSpirits() {
  return (
    <>
      {routes.map((route, index) => (
        <GuardianSpirit key={index} {...route} />
      ))}
    </>
  );
}
