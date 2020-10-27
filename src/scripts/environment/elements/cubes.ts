import CONFIG from "../../config";
import Cube from "./classes/Cube";

type CubesGrid = Array<Array<Cube>>;
const cubes: CubesGrid = new Array();

const initCubesArray = () => {
  for (let i = 0; i < CONFIG.SCREEN_SIZE; i++) {
    cubes[i] = new Array();
  }
};

initCubesArray();

export default cubes;
export { CubesGrid };
