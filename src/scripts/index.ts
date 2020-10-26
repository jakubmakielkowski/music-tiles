import * as THREE from "three";
import { flatten } from 'lodash';

import CONFIG from "./config.ts";
import { camera, renderer, scene } from "./environment/scene.ts";
import screen from "./environment/elements/screen.ts";
import tiles from "./environment/elements/tiles.ts";
import { pointCurrentTiles } from "./environment/animation/tiles.ts";
import { onMouseMove } from "./environment/events/mouse.ts";


scene.add(screen);
scene.add(...flatten(tiles));

onMouseMove
const clock: THREE.Clock = new THREE.Clock();
clock.start();

let step = 0;
let currentSequence = parseInt(clock.getElapsedTime());

// TODO: other timestamps than seconds
const updateSequence = (): void => {
  pointCurrentTiles(tiles, step % CONFIG.SCREEN_SIZE);
  step++;
  currentSequence++;
};

const animate = (): void => {
  requestAnimationFrame(animate);
  if (parseInt(clock.getElapsedTime()) > currentSequence) {
    updateSequence();
  }
  renderer.render(scene, camera);
};
animate();

document.body.appendChild(renderer.domElement);
