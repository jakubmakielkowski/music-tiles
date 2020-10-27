import CONFIG from "../../config";
import Tile from "./classes/Tile";

type TilesGrid = Array<Array<Tile>>;
const tiles: TilesGrid = new Array();

const generateTiles = (): void => {
  const screenBoundary = (-CONFIG.SCREEN_SIZE * CONFIG.TILE_OUTER_LENGTH) / 2;

  for (let i = 0; i < CONFIG.SCREEN_SIZE; i++) {
    const tilesColumn: Array<Tile> = new Array();

    for (let j = 0; j < CONFIG.SCREEN_SIZE; j++) {
      const tile: Tile = new Tile(i, j);
      tilesColumn.push(tile);
    }

    tiles.push(tilesColumn);
  }
};

export default tiles;
export { TilesGrid, generateTiles };
