import './style.css';
import * as THREE from 'three';
import { createScene } from './src/modules/createScene';
import {
  animate,
  createStarsBackground,
} from './src/modules/createStarsBackground';

const { camera, scene, renderer } = createScene();

// Create Stars Background
createStarsBackground(scene);

renderer.render(scene, camera);

// Create the material for the stars

scene.background = new THREE.Color(0x000000); // Black background

const clock = new THREE.Clock();

function animateScene() {
  requestAnimationFrame(animateScene);
  animate(renderer, scene, camera, clock);
}

animateScene();
