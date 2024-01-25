import * as THREE from "three";

import CONFIG from "scripts/config";

import { Grid } from "scripts/elements/iterable/Grid";
import Tile from "scripts/elements/shapes/tile/Tile";
import { tileMaterial, pointedTileMaterial } from "scripts/elements/shapes/tile/mesh";

const pointCurrentTiles = (tiles: Grid<Tile>, column: number): void => {
  let previousColumn: number = CONFIG.SCREEN_WIDTH - 1;

  if (column) {
    previousColumn = column - 1;
  }

  const tls:Array<Array<Tile>> = tiles.to2Array();

  // Add color to current column
  tls[column].forEach((tile: THREE.Mesh) => {
    tile.material = pointedTileMaterial;
  });

  // Remove color from previous column
  tls[previousColumn].forEach((tile: THREE.Mesh) => {
    tile.material = tileMaterial;
  });
};

export { pointCurrentTiles };
