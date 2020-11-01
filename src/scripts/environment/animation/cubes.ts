import * as THREE from "three";

import CONFIG from "../../config";

import { CubesGrid } from "../elements/cubes";
import Cube, { cubeMaterial, pointedCubeMaterial } from "../elements/classes/Cube";

import { synth, sounds } from "../sound/index"

const pointCurrentCubes = (cubes: CubesGrid, column: number): void => {
  let previousColumn: number = CONFIG.SCREEN_SIZE - 1;

  if (column) {
    previousColumn = column - 1;
  }

  const cubesIndexes:Array<number> = new Array();
 
  // Add color to current column
  cubes[column].forEach((cube: Cube, i:number) => {
    if (cube) {
      cube.material = pointedCubeMaterial;

      if(cube.x || cube.x === 0){
        cubesIndexes.push(i);
      }
    }
  });

  synth.volume.value = -8 ;
  synth.triggerAttackRelease(sounds.filter((el, i) => cubesIndexes.includes(i)), "8n")

  // Remove color from previous column
  cubes[previousColumn].forEach((cube: Cube) => {
    if (cube) {
      cube.material = cubeMaterial;
    }
  });
};

export { pointCurrentCubes };
