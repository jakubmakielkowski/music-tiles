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

  const cube = cubes.get(y, x);

  cube.show();
};
