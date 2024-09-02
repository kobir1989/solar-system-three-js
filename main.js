import './style.css';
import * as THREE from 'three';
import { createScene } from './src/modules/createScene';
import { animate, createStarsBackground } from './src/modules/createStarsBackground';
import { loadGLTFModal } from './src/modules/loadGLTFModal';

const { camera, scene, renderer } = createScene();

// Create Stars Background
createStarsBackground(scene);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const clock = new THREE.Clock();

//  Load *Sun* 3d Modal
loadGLTFModal({ x: 0, y: 0, z: 0 }, { x: 1, y: 2, z: 2 }, '/sun/scene.gltf', scene);
loadGLTFModal({ x: -45, y: 0, z: 5 }, { x: 5, y: 10, z: 10 }, '/earth/scene.gltf', scene);
loadGLTFModal({ x: 45, y: 0, z: 5 }, { x: 5, y: 10, z: 10 }, '/saturn_planet/scene.gltf', scene);
loadGLTFModal({ x: 85, y: -25, z: 35 }, { x: 0.2, y: 0.4, z: 0.4 }, '/mercury/scene.gltf', scene);

function animateScene() {
  requestAnimationFrame(animateScene);
  animate(renderer, scene, camera, clock);
}

animateScene();
