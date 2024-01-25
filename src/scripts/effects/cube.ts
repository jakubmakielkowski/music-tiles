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

  const { x, y } = intersectedCube;

  // If cube is present remove it
  if (intersectedCube && !isCubeLocked) {
    isCubeLocked = true;

    // Hide cube and then remove it
    new Promise((res) => {
      intersectedCube.hide();
      setTimeout(res, CONFIG.CUBE_ANIMATION_LENGTH * 1000);
    }).then(() => {
      cubes.push(y, x, null);
      scene.remove(intersectedCube);
      isCubeLocked = false;
      encodeCubesToUrl(cubes);
    });
  }
};