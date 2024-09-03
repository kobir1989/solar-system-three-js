import * as THREE from 'three';

export const light = (scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Sunlight (Point Light)
  const sunlight = new THREE.PointLight(0xffffff, 1.5, 500);
  sunlight.position.set(0, 0, 0);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.width = 1024;
  sunlight.shadow.mapSize.height = 1024;
  scene.add(sunlight);
};
