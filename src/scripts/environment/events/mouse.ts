import * as THREE from "three";
import * as _ from "lodash";

import CONFIG from "../../config";
import { camera, scene } from "../scene";

import Tile, { hoveredTileMaterial } from "../elements/classes/Tile";
import tiles, { TilesGrid } from "../elements/tiles";
import cubes, { CubesGrid } from "../elements/cubes";
import Cube from "../elements/classes/Cube";

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

type Shape = Tile | Cube;
type ShapesGrid = TilesGrid | CubesGrid;

const findIntersectedShape = (shapes: ShapesGrid, intersect: THREE.Intersection): Shape => {
  const { x, y } = intersect.object.position;
  const flattenedShapes: Array<Shape> = _.flatten(shapes);

  const intersectedShape: Shape = flattenedShapes.find((mesh: THREE.Mesh): boolean => {
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
    const intersectedTile: Tile = findIntersectedShape(tiles, intersect);

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

  const cube: Cube = cubes[y][x];

  // If tile is empty add cube. Cube removal is handled in handleCubeClick
  if (!cube) {
    const cube: Cube = (cubes[y][x] = new Cube(y, x));
    scene.add(cube);
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
      cubes[y][x] = null;
      scene.remove(intersectedCube);
      isCubeLocked = false;
    });
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
};

window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("click", onMouseClick, false);
