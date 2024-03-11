import * as THREE from "three";
import { CONFIG } from "scripts/config";
import { Grid } from "scripts/classes/grid/Grid";
import Tile from "scripts/classes/tile/Tile";
import { tileMaterial, pointedTileMaterial } from "scripts/classes/tile/Tile.mesh";

const pointCurrentTiles = (tiles: Grid<Tile>, column: number): void => {
  const tiles2Array = tiles.to2Array();

  // Add color to current column
  tiles2Array[column].forEach((tile) => {
    tile.material = pointedTileMaterial;
  });

  // Remove color from previous column
  const previousColumn = column ? column - 1 : CONFIG.SCREEN_WIDTH - 1;
  tiles2Array[previousColumn].forEach((tile) => {
    tile.material = tileMaterial;
  });
};

export { pointCurrentTiles };
