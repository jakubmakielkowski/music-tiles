import { stopSequence, startSequence } from "scripts/animation/loop";
import { CONFIG } from "scripts/config";
import { buttons } from "scripts/ui-elements/controls/buttons";
import { cubes } from "scripts/ui-elements/interactive/cubes";
import Button from "scripts/classes/button/Button";
import Cube from "scripts/classes/cube/Cube";
import { clearUrlSeed } from "scripts/routing";
import { scene } from "scripts/scene";
import { clickAudio } from "scripts/sound/effects";

export const handleButtonClick = (intersect: THREE.Intersection): void => {
  const object: THREE.Object3D = intersect.object;
  const button: Button = buttons.find((button: Button) => button.name === object.name);

  clickAudio.load();
  clickAudio.play();

  button.animate();

  if (button.name === "stopButton") {
    stopSequence();
  } else if (button.name === "playButton") {
    startSequence();
  } else if (button.name === "clearButton") {
    clearUrlSeed();

    const cbs: Array<Cube> = cubes.toArray().filter(Boolean);

    new Promise((res) => {
      cbs.map((cube: Cube) => cube.hide());
      setTimeout(res, CONFIG.CUBE_ANIMATION_LENGTH * 1000);
    }).then(() => {
      cbs.forEach((cube: Cube) => {
        const { x, y } = cube;

        cubes.push(y, x, null);
        scene.remove(cube);
      });
    });

    cubes.clear();
  }
};
