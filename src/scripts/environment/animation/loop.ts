import * as THREE from "three";

import CONFIG from "../../config";
import { camera, renderer, scene } from "../scene";
import { pointCurrentTiles } from "./tiles";
import tiles from "../elements/tiles";

const clock: THREE.Clock = new THREE.Clock();
clock.start();

let step = 0;
let currentSequence: number = Number(clock.getElapsedTime().toFixed(0));

// TODO: other timestamps than seconds
const updateSequence = (): void => {
  pointCurrentTiles(tiles, step % CONFIG.SCREEN_SIZE);
  step++;
  currentSequence++;
};

const loop = (): void => {
  requestAnimationFrame(loop);
  if (Number(clock.getElapsedTime().toFixed(0)) > currentSequence) {
    updateSequence();
  }
  renderer.render(scene, camera);
};

export default loop;
