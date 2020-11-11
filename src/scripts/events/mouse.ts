import * as THREE from "three";
import * as _ from "lodash";

import CONFIG from "scripts/config";
import { camera, scene } from "scripts/scene";

import Tile from "scripts/elements/shapes/tile/Tile";
import { hoveredTileMaterial } from "scripts/elements/shapes/tile/mesh";
import Grid from "scripts/elements/iterable/Grid";
import Cube from "scripts/elements/shapes/cube/Cube";
import Button from "scripts/elements/shapes/button/Button";
import tiles from "scripts/elements/iterable/tiles";
import cubes from "scripts/elements/iterable/cubes";
import buttons from "scripts/elements/iterable/buttons";
import { startSequence, stopSequence } from "scripts/animation/loop";
import { encodeCubesToUrl } from "scripts/routing/helpers/cubes";
import { clickAudio } from "scripts/sound/effects";
import { clearUrlSeed } from "scripts/routing/index";

const raycaster: THREE.Raycaster = new THREE.Raycaster();
const mouse: THREE.Vector2 = new THREE.Vector2();

const getIntersect = (event: MouseEvent, objectType: string): THREE.Intersection[] => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects: THREE.Intersection[] = raycaster.intersectObjects(
    scene.children.filter((el: THREE.Mesh) => el.type === objectType),
    true
  );

  return intersects;
};

// TODO: dedicated class for tile or cube
type GridShape = Cube | Tile;

const findIntersectedShape = (shapes: Grid<GridShape>, intersect: THREE.Intersection): GridShape => {
  const { x, y } = intersect.object.position;
  const flattenedShapes: Array<GridShape> = shapes.toArray();

  const intersectedShape: GridShape = flattenedShapes.find((mesh: THREE.Mesh): boolean => {
    return mesh?.position.x === x && mesh?.position.y === y;
  });

  return intersectedShape;
};

let hovered: Tile;
const handleTileHover = (intersect: THREE.Intersection): void => {
  // Remove 'hover' tile even if none of tiles is hovered
  if (hovered) {
    scene.remove(hovered);
  }

  if (intersect) {
    // Add second tile above pointed one to create 'hover' effect
    const intersectedTile: GridShape = findIntersectedShape(tiles, intersect);

    const { x, y } = intersectedTile;

    hovered = new Tile(y, x);
    hovered.position.setZ(0.2);
    hovered.material = hoveredTileMaterial;

    scene.add(hovered);
  }
};

const onMouseMove = (event: MouseEvent): void => {
  const tileIntersects: THREE.Intersection[] = getIntersect(event, "tile");

  const [tileIntersect] = tileIntersects;
  handleTileHover(tileIntersect);
};

const handleTileClick = (intersect: THREE.Intersection): void => {
  const intersectedTile: Tile = <Tile>findIntersectedShape(tiles, intersect);

  const { x, y } = intersectedTile;

  const cube: Cube = cubes.get(y, x);

  // If tile is empty add cube. Cube removal is handled in handleCubeClick
  if (!cube) {
    const cube = new Cube(y, x);
    cubes.push(y, x, cube);
    scene.add(cube);
    encodeCubesToUrl(cubes);
  }
};

// Cube, when processing promise is not clickable
let isCubeLocked: boolean = false;

const handleCubeClick = (intersect: THREE.Intersection): void => {
  const intersectedCube: Cube = <Cube>findIntersectedShape(cubes, intersect);

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

const handleButtonClick = (intersect: THREE.Intersection): void => {
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

const onMouseClick = (event: MouseEvent): void => {
  const cubeIntersects: THREE.Intersection[] = getIntersect(event, "cube");
  if (cubeIntersects.length) {
    const [cubeIntersect] = cubeIntersects;
    handleCubeClick(cubeIntersect);
    return;
  }

  const tileIntersects: THREE.Intersection[] = getIntersect(event, "tile");
  if (tileIntersects.length) {
    const [tileIntersect] = tileIntersects;
    handleTileClick(tileIntersect);
    return;
  }

  const buttonIntersects: THREE.Intersection[] = getIntersect(event, "button");
  if (buttonIntersects.length) {
    const [buttonIntersect] = buttonIntersects;
    handleButtonClick(buttonIntersect);
    return;
  }
};

window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("click", onMouseClick, false);
