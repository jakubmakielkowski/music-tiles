import * as THREE from "three";

import CONFIG from "../config.ts";

const { innerWidth, innerHeight } = window;
const aspectRatio: number = innerWidth / innerHeight;

const scene: THREE.Scene = new THREE.Scene();
scene.background = new THREE.Color(CONFIG.SCENE_COLOR);

scene.add(new THREE.AmbientLight(0x4000ff));

const camera = new THREE.PerspectiveCamera(25, aspectRatio, 1, 1000);
camera.position.setY(-100);
camera.position.setZ(300);
camera.lookAt(0, 0, 0);

scene.add(camera);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

export { camera, scene, renderer };
