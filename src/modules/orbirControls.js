import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const orbitControls = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.minDistance = 20;
  controls.maxDistance = 300;
  return controls;
};
