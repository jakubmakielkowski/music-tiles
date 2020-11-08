import Grid from "scripts/elements/iterable/Grid";
import Cube from "scripts/elements/shapes/cube/Cube";
import cubes from "scripts/elements/iterable/cubes";
import { scene } from "scripts/scene";
import { pairs } from "./compression";
import { changeUrlSeed } from "scripts/routing";

const encodeCubesToUrl = (cubes: Grid<Cube>) => {
  const flattenedCubes: Array<Cube> = cubes.toArray().filter(Boolean);

  const seed: Array<string> = new Array();
  flattenedCubes.forEach((cube: Cube) => {
    const { x, y } = cube;
    seed.push(pairs[x][y]);
  });

  const seedString: string = seed.join("");
  changeUrlSeed(seedString);
};



const generateCubesFromCoords = (coords: Array<Array<number>>): void => {
  // Generate cubes if coords from query string are valid
  coords.forEach((coord: Array<number>): void => {
    const [x, y] = coord;
    const cube = new Cube(y, x);
    cubes.push(y, x, cube);
    scene.add(cube);
  });
};

export { encodeCubesToUrl, generateCubesFromCoords };
