import * as THREE from "three";

import CONFIG from "../../config";

import { TilesGrid } from "../elements/tiles";
import { tileMaterial, pointedTileMaterial } from "../elements/classes/Tile";

const pointCurrentTiles = (tiles: TilesGrid, column: number): void => {
  let previousColumn: number = CONFIG.SCREEN_SIZE - 1;

  if (column) {
    previousColumn = column - 1;
  }

  // Add color to current column
  tiles[column].forEach((tile: THREE.Mesh) => {
    tile.material = pointedTileMaterial;
  });

  // Remove color from previous column
  tiles[previousColumn].forEach((tile: THREE.Mesh) => {
    tile.material = tileMaterial;
  });
};

export { pointCurrentTiles };
