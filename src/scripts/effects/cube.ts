import { CONFIG } from "scripts/config";
import { cubes } from "scripts/ui-elements/interactive/cubes";
import Cube from "scripts/classes/cube/Cube";
import { encodeCubesToUrl } from "scripts/routing/helpers/cubes";
import { scene } from "scripts/scene";
import { findIntersectedShape } from "./helpers";

// Cube, when processing promise is not clickable
let isCubeLocked = false;

export const handleCubeClick = (intersect: THREE.Intersection): void => {
  const intersectedCube = <Cube>findIntersectedShape(cubes, intersect);
  
  // If cube is present remove it
  if (intersectedCube && !isCubeLocked) {
    isCubeLocked = true;

    // Hide cube and then remove it
    new Promise((res) => {
      intersectedCube.active ? intersectedCube.hide() : intersectedCube.show();
      setTimeout(res, CONFIG.CUBE_ANIMATION_LENGTH * 1000);
    }).then(() => {
      isCubeLocked = false;
      encodeCubesToUrl(cubes);
    });
  }
};