import * as THREE from "three";

import CONFIG from "../config";

const { innerWidth, innerHeight } = window;
const aspectRatio: number = innerWidth / innerHeight;

const scene: THREE.Scene = new THREE.Scene();
scene.background = new THREE.Color(CONFIG.SCENE_COLOR);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const light: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
light.position.set(0, 0, 1600);
scene.add(light);

const camera = new THREE.PerspectiveCamera(25, aspectRatio, 1, 1000);
camera.position.setX(200);
camera.position.setZ(400);
camera.lookAt(20, 0, 0);
camera.rotateZ(Math.PI / 2);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

export { camera, scene, renderer };
