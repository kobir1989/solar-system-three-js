import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const loadGLTFModal = (positions, scale, path, scene) => {
  const { x, y, z } = positions;

  new GLTFLoader().load(path, (gltf) => {
    console.log('gltf', gltf);
    const modal = gltf.scene;
    modal.position.set(x, y, z);
    modal.scale.set(scale.x, scale.y, scale.z);
    scene.add(modal);
  });
};
