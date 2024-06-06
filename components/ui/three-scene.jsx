"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

function isSafariOrIOS() {
  const navigator = window.navigator;
  const ua = navigator.userAgent.toLowerCase();

  const isSafariOrIOS =
    (/safari/.test(ua) && !/chrome/.test(ua) && /version\//.test(ua)) ||
    /iPad|iPhone|iPod/.test(navigator.platform) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); // Added check for iOS devices

  return isSafariOrIOS;
}

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentRef = mountRef.current;

    const width = currentRef.offsetWidth;
    const height = currentRef.offsetHeight;

    // Constants
    const CUBE_SIZE = 8;
    const VERTEX_SIZE = 0.4;
    const GRID_SIZE = 5;
    const SPACING = 8.01;

    const VERTEX_OFFSETS = [
      { position: new THREE.Vector3(-4, -4, 4), label: "bottom front right" },
      { position: new THREE.Vector3(-4, 4, 4), label: "top front right" },
      { position: new THREE.Vector3(-4, 4, -4), label: "top front left" },
      { position: new THREE.Vector3(-4, -4, -4), label: "bottom front left" },
      { position: new THREE.Vector3(4, 4, 4), label: "top back right" },
      { position: new THREE.Vector3(4, 4, -4), label: "top back left" },
      { position: new THREE.Vector3(4, -4, 4), label: "bottom back right" },
      { position: new THREE.Vector3(4, -4, -4), label: "bottom back left" },
    ];

    let scene, camera, controls, composer, clock, renderer;
    let mainGroup,
      group,
      cubeLocations = [];
    let currentStartCubeIndex = 1;

    // Initialize Scene
    function initScene() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
      camera.position.set(75, 0, 0);

      renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      currentRef.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.03;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.maxPolarAngle = Math.PI / 2;
      controls.minPolarAngle = Math.PI / 2;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2.2;

      let target = new THREE.WebGLRenderTarget(width, height, {
        samples: 10,
      });

      const renderScene = new RenderPass(scene, camera);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        1.5,
        0.8,
        0.65
      );

      // Use the target in your EffectComposer
      composer = new EffectComposer(renderer, target);
      composer.addPass(renderScene);
      composer.addPass(bloomPass);
      composer.setSize(width, height);
      composer.setPixelRatio(window.devicePixelRatio);

      clock = new THREE.Clock();

      function animate() {
        controls.update();
        composer.render();
      }

      renderer.setAnimationLoop(animate);
    }

    // Create Cube with small cubes on vertices and black edges
    function createCubeWithVerticesAndEdges() {
      const cubeGeometry = new THREE.BoxGeometry(
        CUBE_SIZE,
        CUBE_SIZE,
        CUBE_SIZE
      );
      const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const edgeGeometry = new THREE.EdgesGeometry(cubeGeometry);
      const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);

      const vertexGeometry = new THREE.BoxGeometry(
        VERTEX_SIZE,
        VERTEX_SIZE,
        VERTEX_SIZE
      );
      const vertexMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const vertexEdgeGeometry = new THREE.EdgesGeometry(vertexGeometry);

      const cubeGroup = new THREE.Group();
      cubeGroup.add(cube);
      cubeGroup.add(edges);

      const uniqueVertices = [
        [-4, -4, 4],
        [-4, 4, 4],
        [-4, 4, -4],
        [-4, -4, -4],
        [4, 4, 4],
        [4, 4, -4],
        [4, -4, 4],
        [4, -4, -4],
      ];

      uniqueVertices.forEach((vertex) => {
        const vertexMesh = new THREE.Mesh(vertexGeometry, vertexMaterial);
        const vertexEdges = new THREE.LineSegments(
          vertexEdgeGeometry,
          edgeMaterial
        );
        vertexMesh.add(vertexEdges);
        vertexMesh.position.set(vertex[0], vertex[1], vertex[2]);
        cubeGroup.add(vertexMesh);
      });

      return cubeGroup;
    }

    // Create grid of cubes
    function createGrid() {
      group = new THREE.Group();
      cubeLocations = [];

      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if ((i + j) % 2 === 1) {
            const cube = createCubeWithVerticesAndEdges();
            cube.position.set(
              0,
              i * SPACING - ((GRID_SIZE - 1) * SPACING) / 2,
              j * SPACING - ((GRID_SIZE - 1) * SPACING) / 2
            );
            group.add(cube);
            cubeLocations.push({
              cube: cube,
              position: { x: 0, y: i, z: j },
            });
          }
        }
      }

      mainGroup.add(group);
      scene.add(mainGroup);
    }

    // Initialize and start animation
    function init() {
      mainGroup = new THREE.Group();
      initScene();
      createGrid();

      mainGroup.rotation.x = THREE.MathUtils.degToRad(-110);
      mainGroup.rotation.y = THREE.MathUtils.degToRad(-31);
      mainGroup.rotation.z = THREE.MathUtils.degToRad(-30);
    }

    // Start the script
    init();

    // Handle window resize
    window.addEventListener("resize", () => onWindowResize(renderer), false);

    function onWindowResize() {
      const width = currentRef.offsetWidth;
      const height = currentRef.offsetHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    }

    return () => {
      window.removeEventListener(
        "resize",
        () => onWindowResize(renderer),
        false
      );

      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default ThreeScene;
