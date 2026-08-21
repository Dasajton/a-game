import { useGLTF } from "@react-three/drei";

const modelUrls = [
  "/Ninja.glb",
  "/VisualOnlyMap.glb",
  "/FinalCollisionMap.glb",
  "/LampsFinal.glb",
  "/FinalTreeMap.glb",
  "/ScrollLowPerf.glb",
];

export function preloadAssets() {
  modelUrls.forEach((url) => useGLTF.preload(url));
}
