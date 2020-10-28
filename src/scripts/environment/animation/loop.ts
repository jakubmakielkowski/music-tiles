import * as THREE from "three";
import * as _ from "lodash";

import CONFIG from "../../config";
import { camera, renderer, scene } from "../scene";
import tiles from "../elements/tiles";
import cubes from "../elements/cubes";
import { pointCurrentTiles } from "./tiles";
import { pointCurrentCubes } from "./cubes";
import Cube from "../elements/classes/Cube";

const clock: THREE.Clock = new THREE.Clock();
clock.start();

let step = 0;
let currentSequence: number = Number(clock.getElapsedTime().toFixed(0));

// TODO: other timestamps than seconds
const updateSequence = (): void => {
  pointCurrentTiles(tiles, step % CONFIG.SCREEN_SIZE);
  pointCurrentCubes(cubes, step % CONFIG.SCREEN_SIZE);
  step++;
  currentSequence++;
};

const loop = (): void => {
  const delta: number = clock.getDelta();

  requestAnimationFrame(loop);
  if (Number(clock.getElapsedTime().toFixed(0)) > currentSequence) {
    updateSequence();
  }

  _.flatten(cubes).forEach((cube: Cube) => {
    cube && cube.mixer.update(delta);
  });

  renderer.render(scene, camera);
};

export default loop;
