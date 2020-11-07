import CONFIG from "scripts/config";
import Grid from "./Grid";
import Cube from "scripts/elements/shapes/cube/Cube";

const cubes: Grid<Cube> = new Grid(CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT);

export default cubes;
