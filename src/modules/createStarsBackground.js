import * as THREE from 'three';

export const createStarsBackground = (scene) => {
  const vertices = [];
  const orbitRadius = [];

  for (let i = 0; i < 20000; i++) {
    // Initial position of stars
    const x = THREE.MathUtils.randFloatSpread(600);
    const y = THREE.MathUtils.randFloatSpread(600);
    const z = THREE.MathUtils.randFloatSpread(600);

    vertices.push(x, y, z);

    // Calculate and store the initial orbit radius
    const radius = Math.sqrt(x * x + y * y + z * z);
    orbitRadius.push(radius);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  // Store the initial orbit radius as a custom attribute
  geometry.setAttribute('orbitRadius', new THREE.Float32BufferAttribute(orbitRadius, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color('#FFFF00') },
      size: { value: 3 },
      time: { value: 0 },
    },
    vertexShader: `
      uniform float size;
      uniform float time;
      varying float vOpacity;
      
      void main() {
        vOpacity = sin(time + position.z * 0.1) * 0.5 + 0.5;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      varying float vOpacity;

      void main() {
        vec2 uv = gl_PointCoord.xy - vec2(0.5);
        float alpha = 1.0 - smoothstep(0.2, 0.5, length(uv));
        gl_FragColor = vec4(color, alpha * vOpacity);
      }
    `,
    transparent: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);
};

export function animate(renderer, scene, camera, clock) {
  const delta = clock.getDelta();
  const elapsedTime = clock.elapsedTime;

  const points = scene.children.find((child) => child instanceof THREE.Points);
  if (!points) return;

  const positions = points.geometry.attributes.position.array;
  const orbitRadius = points.geometry.attributes.orbitRadius.array;

  const orbitSpeed = 0.01;

  // Update positions to simulate circular orbit
  for (let i = 0; i < positions.length; i += 3) {
    const radius = orbitRadius[i / 3];
    // Calculate the angle of rotation for each star
    const angle = elapsedTime * orbitSpeed + (i / 3) * 0.1; // Use i/3 to ensure each point has a different offset

    positions[i] = radius * Math.cos(angle); // Update x position
    positions[i + 1] = radius * Math.sin(angle); // Update y position
    // positions[i + 2] stays the same to keep the motion on a 2D plane.
  }

  points.geometry.attributes.position.needsUpdate = true;

  // Update the shader's time uniform to animate stars' opacity
  points.material.uniforms.time.value = elapsedTime;

  renderer.render(scene, camera);
}
