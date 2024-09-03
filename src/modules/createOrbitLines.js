import * as THREE from 'three';

export const createOrbitLines = (radius, scene) => {
  const segments = 128;
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
  });

  const orbitLine = new THREE.LineLoop(geometry, material);
  scene.add(orbitLine);
  return orbitLine;
};
