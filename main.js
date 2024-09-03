import './style.css';
import * as THREE from 'three';
import { createScene } from './src/modules/createScene';
import { animate, createStarsBackground } from './src/modules/createStarsBackground';
import { loadGLTFModal } from './src/modules/loadGLTFModal';
import { planets } from './src/modules/planets';
import { orbitControls } from './src/modules/orbirControls';
import { light } from './src/modules/light';
import { createOrbitLines } from './src/modules/createOrbitLines';

const { camera, scene, renderer } = createScene();

// Initialize OrbitControls
const controls = orbitControls(camera, renderer);

// Create Stars Background
createStarsBackground(scene);

// Light
light(scene);

const clock = new THREE.Clock();

// Load the Sun 3D Model
loadGLTFModal({ x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 }, '/sun/scene.gltf', scene).then((mesh) => {
  mesh.castShadow = true;
  mesh.receiveShadow = true;
});

const planetObjects = [];

// Load all planet models
planets.forEach((planet) => {
  createOrbitLines(planet.radius, scene);

  loadGLTFModal({ x: planet.radius, y: 0, z: 0 }, planet.size, planet.url, scene)
    .then((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      mesh.material = new THREE.MeshStandardMaterial({
        color: 0xffffff, // Base color of the planet
        emissive: 0x000000, // Default emissive color
        emissiveIntensity: 0, // No emissive intensity by default
      });

      const obj = {
        mesh: mesh,
        radius: planet.radius,
        speed: planet.speed,
        angle: Math.random() * Math.PI * 2,
      };
      planetObjects.push(obj);
    })
    .catch((error) => {
      console.error(`Failed to load model for ${planet.name}:`, error);
    });
});

// Animation Loop
const animateScene = () => {
  requestAnimationFrame(animateScene);

  planetObjects.forEach((planet) => {
    if (planet.mesh) {
      planet.angle += planet.speed;
      planet.mesh.position.x = planet.radius * Math.cos(planet.angle);
      planet.mesh.position.z = planet.radius * Math.sin(planet.angle);

      // Calculate distance to the sun
      const distanceToSun = planet.mesh.position.distanceTo(new THREE.Vector3(0, 0, 0));

      if (distanceToSun < planet.radius) {
        planet.mesh.material.emissiveIntensity = 0.7;
        planet.mesh.material.emissive.set(0xffffff);
      } else {
        planet.mesh.material.emissiveIntensity = 0;
      }
    }
  });

  controls.update();
  animate(renderer, scene, camera, clock);
};

animateScene();
