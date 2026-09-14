/**
 * ============================================================
 * FLOW — 3D Scene (Three.js)
 * ------------------------------------------------------------
 * Creates the animated background: an icosahedron wireframe,
 * an inner solid icosahedron, orbiting particles, and small
 * floating spheres. Handles resize + animation loop.
 * ============================================================
 */

import * as THREE from 'three';

export function initThreeScene() {
  /* ---------- Container ---------- */
  const container = document.getElementById('canvas-container');
  if (!container) return;

  /* ---------- Scene & Fog ---------- */
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a1a);
  scene.fog = new THREE.FogExp2(0x0a0a1a, 0.0025);

  /* ---------- Camera ---------- */
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 4, 30);
  camera.lookAt(0, 0, 0);

  /* ---------- Renderer ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  /* ---------- Lights ---------- */
  scene.add(new THREE.AmbientLight(0x404060));

  const light1 = new THREE.PointLight(0x6c63ff, 1, 50);
  light1.position.set(10, 10, 10);
  scene.add(light1);

  const light2 = new THREE.PointLight(0xff6ec7, 0.8, 50);
  light2.position.set(-10, -5, 10);
  scene.add(light2);

  const light3 = new THREE.PointLight(0x4d4dff, 0.5, 60);
  light3.position.set(5, 15, -10);
  scene.add(light3);

  /* ---------- Central Icosahedrons ---------- */
  const icosaGeo = new THREE.IcosahedronGeometry(7, 2);
  const icosaMat = new THREE.MeshPhongMaterial({
    color: 0x6c63ff,
    emissive: 0x1a1a40,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    shininess: 30,
  });
  const icosa = new THREE.Mesh(icosaGeo, icosaMat);
  scene.add(icosa);

  const innerGeo = new THREE.IcosahedronGeometry(4.5, 1);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a6a,
    emissive: 0x12123a,
    roughness: 0.4,
    metalness: 0.7,
    transparent: true,
    opacity: 0.25,
  });
  const innerIcosa = new THREE.Mesh(innerGeo, innerMat);
  scene.add(innerIcosa);

  /* ---------- Particle Field ---------- */
  const particlesGeo = new THREE.BufferGeometry();
  const particlesCount = 2500;
  const posArray = new Float32Array(particlesCount * 3);
  const colorArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i += 3) {
    const radius = 18 + Math.random() * 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
    posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    posArray[i + 2] = radius * Math.cos(phi);

    const color = new THREE.Color().setHSL(
      0.65 + Math.random() * 0.25,
      0.8,
      0.5 + Math.random() * 0.3
    );
    colorArray[i] = color.r;
    colorArray[i + 1] = color.g;
    colorArray[i + 2] = color.b;
  }

  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  particlesGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 0.25,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particles = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particles);

  /* ---------- Orbiting Small Spheres ---------- */
  const smallSpheres = [];
  const sphereCount = 12;

  for (let i = 0; i < sphereCount; i++) {
    const sphereGeo = new THREE.SphereGeometry(0.4 + Math.random() * 0.6, 8, 8);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(0.7 + Math.random() * 0.3, 0.9, 0.6),
      emissive: new THREE.Color().setHSL(0.7, 0.5, 0.1),
      roughness: 0.2,
      metalness: 0.1,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);

    const angle = (i / sphereCount) * Math.PI * 2;
    const radius = 12 + Math.random() * 5;
    sphere.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle * 2) * 5 + (Math.random() - 0.5) * 4,
      Math.sin(angle) * radius
    );

    sphere.userData = {
      angle,
      radius,
      speed: 0.0005 + Math.random() * 0.001,
      offsetY: Math.random() * 10,
    };

    scene.add(sphere);
    smallSpheres.push(sphere);
  }

  /* ---------- Animation Loop ---------- */
  const clock = new THREE.Clock();

  function animate() {
    const delta = clock.getDelta();
    const t = performance.now() * 0.001;

    // Rotate central shapes
    icosa.rotation.x += 0.0008;
    icosa.rotation.y += 0.0012;
    icosa.rotation.z += 0.0004;

    innerIcosa.rotation.x -= 0.0005;
    innerIcosa.rotation.y -= 0.0009;
    innerIcosa.rotation.z += 0.0003;

    // Drift particles
    particles.rotation.y += 0.0001;
    particles.rotation.x += 0.00005;

    // Orbit small spheres
    smallSpheres.forEach((sphere, index) => {
      sphere.userData.angle += sphere.userData.speed * 30 * delta;
      const { angle, radius } = sphere.userData;

      sphere.position.x = Math.cos(angle) * radius;
      sphere.position.z = Math.sin(angle) * radius;
      sphere.position.y =
        Math.sin(angle * 3 + t) * 4 + Math.sin(t * 0.8 + index) * 1.5;

      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.015;
    });

    // Gentle camera float
    camera.position.x = Math.sin(t * 0.2) * 2;
    camera.position.y = 4 + Math.sin(t * 0.5) * 1.5;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

  /* ---------- Resize Handler ---------- */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
