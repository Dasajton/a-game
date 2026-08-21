export default function Lights() {
  return (
    <>
      <ambientLight color={"lightblue"} intensity={0.5} />
      <directionalLight
        position={[40, 60, 20]}
        castShadow
        intensity={1.2}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-120}
        shadow-camera-right={120}
        shadow-camera-top={120}
        shadow-camera-bottom={-120}
        shadow-camera-near={0.5}
        shadow-camera-far={300}
        shadow-bias={-0.0005}
      />
    </>
  );
}
