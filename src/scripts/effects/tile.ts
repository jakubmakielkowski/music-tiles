import { cubes } from "scripts/elements/iterable/cubes";
import { tiles } from "scripts/elements/iterable/tiles";
import Cube from "scripts/elements/shapes/cube/Cube";
import { hoveredTileMaterial } from "scripts/elements/shapes/tile/mesh";
import { encodeCubesToUrl } from "scripts/routing/helpers/cubes";
import { scene } from "scripts/scene";
import { findIntersectedShape } from "./helpers";

export const handleTileHover = (intersect: THREE.Intersection): void => {
  if (intersect) {
    const intersectedTile = findIntersectedShape(tiles, intersect);

    intersectedTile.material = hoveredTileMaterial;
  }
};

export const handleTileClick = (intersect: THREE.Intersection): void => {
  const intersectedTile = findIntersectedShape(tiles, intersect);

  const { x, y } = intersectedTile.position;

  const cube: Cube = cubes.get(y, x);

  // If tile is empty add cube. Cube removal is handled in handleCubeClick
  if (!cube) {
    const cube = new Cube(y, x);
    cubes.push(y, x, cube);
    scene.add(cube);
    encodeCubesToUrl(cubes);
  }
};
