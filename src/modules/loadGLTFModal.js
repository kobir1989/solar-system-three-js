import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function loadGLTFModal(position, scale, url, scene) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    loader.load(
      url,
      (gltf) => {
        const model = gltf.scene;
        model.position.set(position.x, position.y, position.z);
        model.scale.set(scale.x, scale.y, scale.z);
        scene.add(model);
        resolve(model);
      },
      undefined,
      (error) => {
        console.error('ERROR_:', error);
        reject(error);
      }
    );
  });
}
