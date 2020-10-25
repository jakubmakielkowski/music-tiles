import { AmbientLight, PerspectiveCamera, Scene, WebGLRenderer } from "three";

import CONFIG from "../config.ts";

const { innerWidth, innerHeight } = window;
const aspectRatio: number = innerWidth / innerHeight;

const scene: Scene = new Scene();
scene.background = CONFIG.SCENE_BACKGROUND_COLOR;

scene.add(new AmbientLight(0x4000ff));

const camera = new PerspectiveCamera(25, aspectRatio, 1, 1000);
camera.position.setY(-200);
camera.position.setZ(200);
camera.lookAt(0, 0, 0);

scene.add(camera);

const renderer: WebGLRenderer = new WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

export { camera, scene, renderer };
