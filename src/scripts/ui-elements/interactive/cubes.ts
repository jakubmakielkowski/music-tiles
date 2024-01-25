import { CONFIG } from "scripts/config";
import { Grid } from "../../classes/grid/Grid";
import Cube from "scripts/classes/cube/Cube";

export const cubes: Grid<Cube> = new Grid(CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT);
