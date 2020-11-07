import CONFIG from "scripts/config";
import Grid from "./Grid";
import Tile from "scripts/elements/shapes/tile/Tile";

const tiles: Grid<Tile> = new Grid(CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT);

const generateTiles = (): void => {
  for (let i = 0; i < CONFIG.SCREEN_WIDTH; i++) {
    for (let j = 0; j < CONFIG.SCREEN_HEIGHT; j++) {
      const tile: Tile = new Tile(i, j);
      tiles.push(i, j, tile);
    }
  }
};

export default tiles;
export { generateTiles };
