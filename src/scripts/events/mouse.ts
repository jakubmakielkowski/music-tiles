import * as THREE from "three";
import * as _ from "lodash";

import { camera, scene } from "scripts/scene";
import { handleCubeClick } from "scripts/effects/cube";
import { handleTileHover, handleTileClick } from "scripts/effects/tile";
import { handleButtonClick } from "scripts/effects/button";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const getIntersect = (event: MouseEvent, objectType: string): THREE.Intersection[] => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(
    scene.children.filter((el: any) => el.tempType === objectType),
    true
  );

  return intersects;
};

const onMouseMove = (event: MouseEvent): void => {
  const tileIntersects = getIntersect(event, "tile");

  const [tileIntersect] = tileIntersects;
  handleTileHover(tileIntersect);
};

const onMouseClick = (event: MouseEvent): void => {
  const cubeIntersects = getIntersect(event, "cube");
  if (cubeIntersects.length) {
    const [cubeIntersect] = cubeIntersects;
    handleCubeClick(cubeIntersect);
    return;
  }

  const tileIntersects = getIntersect(event, "tile");
  if (tileIntersects.length) {
    const [tileIntersect] = tileIntersects;
    handleTileClick(tileIntersect);
    return;
  }

  const buttonIntersects = getIntersect(event, "button");
  if (buttonIntersects.length) {
    const [buttonIntersect] = buttonIntersects;
    handleButtonClick(buttonIntersect);
    return;
  }
};

window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("click", onMouseClick, false);
