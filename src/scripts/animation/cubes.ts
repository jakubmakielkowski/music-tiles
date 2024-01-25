import CONFIG from "scripts/config";

import { Grid } from "scripts/elements/iterable/Grid";
import Cube, { cubeMaterial, pointedCubeMaterial } from "scripts//elements/shapes/cube/Cube";
import { synth, sounds } from "scripts/sound/index";

const pointCurrentCubes = (cubes: Grid<Cube>, column: number): void => {
  let previousColumn: number = CONFIG.SCREEN_WIDTH - 1;

  if (column) {
    previousColumn = column - 1;
  }

  const cubesIndexes: Array<number> = new Array();

  // Add color to current column
  const cbs: Array<Array<Cube>> = cubes.to2Array();
  cbs[column].forEach((cube: Cube, i: number) => {
    if (cube) {
      cube.material = pointedCubeMaterial;

      if (cube.x || cube.x === 0) {
        cubesIndexes.push(i);
      }
    }
  });

  synth.volume.value = -8;
  synth.triggerAttackRelease(
    sounds.filter((el, i) => cubesIndexes.includes(i)),
    "8n"
  );

  // Remove color from previous column
  cbs[previousColumn].forEach((cube: Cube) => {
    if (cube) {
      cube.material = cubeMaterial;
    }
  });
};

export { pointCurrentCubes };
