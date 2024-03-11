import { CONFIG } from "scripts/config";
import { Grid } from "scripts/classes/grid/Grid";
import Cube, { cubeMaterial, pointedCubeMaterial } from "scripts/classes/cube/Cube";
import { synth, sounds } from "scripts/sound/index";

const pointCurrentCubes = (cubes: Grid<Cube>, column: number): void => {
  const cubesIndexes: Array<number> = new Array();

  // Add color to current column
  const cubes2Array: Array<Array<Cube>> = cubes.to2Array();
  cubes2Array[column].forEach((cube, index) => {
    if (cube) {
      cube.material = pointedCubeMaterial;

      if (cube.x ?? 0) {
        cubesIndexes.push(index);
      }
    }
  });

  // synth.volume.value = -8;
  // synth.triggerAttackRelease(
  //   sounds.filter((x, index) => cubesIndexes.includes(index)),
  //   "8n"
  // );

  // Remove color from previous column
  const previousColumn = column ? column - 1 : CONFIG.SCREEN_WIDTH - 1;
  cubes2Array[previousColumn].forEach((cube) => {
    if (cube) {
      cube.material = cubeMaterial;
    }
  });
};

export { pointCurrentCubes };
