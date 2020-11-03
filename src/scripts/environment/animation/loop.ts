import * as THREE from "three";
import * as _ from "lodash";

import CONFIG from "../../config";
import { camera, renderer, scene } from "../scene";
import tiles from "../elements/tiles";
import cubes from "../elements/cubes";
import buttons from "../elements/buttons";
import { pointCurrentTiles } from "./tiles";
import { pointCurrentCubes } from "./cubes";
import Cube from "../elements/classes/Cube";
import Button from "../elements/classes/Button";

const clock: THREE.Clock = new THREE.Clock(true);

const getElapsedTime = (tempo: number): number => {
  const elapsedTime: number = (clock.getElapsedTime() / 60) * tempo;
  return parseInt(String(elapsedTime));
};

let step: number = 0;
let currentSequence: number = getElapsedTime(CONFIG.TEMPO);

const updateSequence = (): void => {
  pointCurrentTiles(tiles, step % CONFIG.SCREEN_SIZE);
  pointCurrentCubes(cubes, step % CONFIG.SCREEN_SIZE);
  step++;
  currentSequence++;
};

let isBrowserTabActive: boolean = true;

const stopSequence = (): void => {
  if(clock.running){
    clock.stop();
    currentSequence = 0;
    isBrowserTabActive = false;
  }
};

const startSequence = ():void => {
  if(!clock.running){
    clock.start();
    isBrowserTabActive = true;
  }
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopSequence();
  } else {
    startSequence();
  }
};

document.addEventListener("visibilitychange", handleVisibilityChange, false);

const loop = (): void => {
  const delta: number = clock.getDelta();

  requestAnimationFrame(loop);

  if (isBrowserTabActive) {
    if (getElapsedTime(CONFIG.TEMPO) > currentSequence) {
      updateSequence();
    }

    _.flatten(cubes).forEach((cube: Cube) => {
      cube && cube.mixer.update(delta);
    });

    buttons.forEach((button: Button) => {
      button.mixer.update(delta);
    });

    renderer.render(scene, camera);
  }
};

export default loop;
export { startSequence, stopSequence };
