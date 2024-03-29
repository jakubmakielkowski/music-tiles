import * as THREE from "three";
import { CONFIG } from "scripts/config";
import { camera, renderer, scene } from "scripts/scene";
import { tiles } from "scripts/ui-elements/interactive/tiles";
import { cubes } from "scripts/ui-elements/interactive/cubes";
import { buttons } from "scripts/ui-elements/controls/buttons";
import { pointCurrentTiles } from "./tiles";
import { pointCurrentCubes } from "./cubes";
import Cube from "scripts/classes/cube/Cube";
import Button from "scripts/classes/button/Button";

// Updates sequence in time
const sequenceClock = new THREE.Clock(true);

// Updates shapes animations in time 
const animationClock: THREE.Clock = new THREE.Clock(true);

const getElapsedTime = (tempo: number): number => {
  const elapsedTime: number = (sequenceClock.getElapsedTime() / 60) * tempo;
  return parseInt(String(elapsedTime));
};

let step: number = 0;
let currentSequence: number = getElapsedTime(CONFIG.TEMPO);

const updateSequence = (): void => {
  pointCurrentTiles(tiles, step % CONFIG.SCREEN_WIDTH);
  pointCurrentCubes(cubes, step % CONFIG.SCREEN_WIDTH);
  step++;
  currentSequence++;
};

let isBrowserTabActive: boolean = true;

const stopSequence = (): void => {
  if(sequenceClock.running){
    sequenceClock.stop();
    currentSequence = 0;
    isBrowserTabActive = false;
  }
};

const startSequence = ():void => {
  if(!sequenceClock.running){
    sequenceClock.start();
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
  const animationDelta: number = animationClock.getDelta();

  requestAnimationFrame(loop);

  if (isBrowserTabActive) {
    if (getElapsedTime(CONFIG.TEMPO) > currentSequence) {
      updateSequence();
    }
  }
  
  const cubesArray:Array<Cube> = cubes.toArray();
  cubesArray.forEach((cube: Cube) => {
    cube?.mixer.update(animationDelta);
  });
  
  buttons.forEach((button: Button) => {
    button.mixer.update(animationDelta);
  });

  renderer.render(scene, camera);
};

export default loop;
export { startSequence, stopSequence };
