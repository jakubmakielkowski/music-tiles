import * as THREE from "three";

import CONFIG from "../../config";

import { CubesGrid } from "../elements/cubes";
import { cubeMaterial, pointedCubeMaterial } from "../elements/classes/Cube";

const pointCurrentCubes = (cubes: CubesGrid, column: number): void => {
  let previousColumn: number = CONFIG.SCREEN_SIZE - 1;

  if (column) {
    previousColumn = column - 1;
  }

  // Add color to current column
  cubes[column].forEach((cube: THREE.Mesh) => {
    if (cube) {
      cube.material = pointedCubeMaterial;
    }
  });

  // Remove color from previous column
  cubes[previousColumn].forEach((cube: THREE.Mesh) => {
    if (cube) {
      cube.material = cubeMaterial;
    }
  });
};

export { pointCurrentCubes };
