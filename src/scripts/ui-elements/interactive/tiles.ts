import CONFIG from "scripts/config";
import { Grid } from "../../classes/grid/Grid";
import Tile from "scripts/elements/shapes/tile/Tile";

export const tiles = new Grid<Tile>(CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT);

export const generateTiles = (): void => {
  for (let i = 0; i < CONFIG.SCREEN_WIDTH; i++) {
    for (let j = 0; j < CONFIG.SCREEN_HEIGHT; j++) {
      const tile: Tile = new Tile(i, j);
      tiles.push(i, j, tile);
    }
  }
};
