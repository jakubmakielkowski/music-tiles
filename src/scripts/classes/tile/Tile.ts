import { Shape } from "scripts/classes/shape/Shape";
import { tileGeometry, tileMaterial } from "./Tile.mesh";
import { getGridPosition } from "scripts/classes/shape/helpers/grid";

class Tile extends Shape {
  constructor(y: number, x: number) {
    super(tileGeometry, tileMaterial);

    this.tempType = "tile";
    this.y = y;
    this.x = x;

    const [gridX, gridY] = getGridPosition(x, y);
    this.position.set(gridX, gridY, 0.1);
  }

  public readonly y: number;
  public readonly x: number;
}

export default Tile;
