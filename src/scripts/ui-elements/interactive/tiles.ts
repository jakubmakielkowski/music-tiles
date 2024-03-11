import { CONFIG } from "scripts/config";
import { Grid } from "../../classes/grid/Grid";
import Tile from "scripts/classes/tile/Tile";

export const tiles = new Grid<Tile>(CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT, Tile);
