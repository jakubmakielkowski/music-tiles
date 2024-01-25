import { cubes } from "scripts/ui-elements/interactive/cubes";
import { tiles } from "scripts/ui-elements/interactive/tiles";
import Cube from "scripts/classes/cube/Cube";
import { hoveredTileMaterial } from "scripts/classes/tile/Tile.mesh";
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
