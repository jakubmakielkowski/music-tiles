import * as _ from "lodash";

class Grid<T> {
  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;

    this.initialize();
  }

  private values: Array<Array<T>>;
  public readonly height: number;
  public readonly width: number;

  private initialize() {
    this.values = new Array();
    for (let i = 0; i < this.height; i++) {
      this.values[i] = new Array();
    }
  }

  public clear() {
    this.initialize();
  }

  public push(y: number, x: number, value: T): void {
    this.values[y][x] = value;
  }

  public get(y: number, x: number): T {
    return this.values[y][x];
  }

  public toArray(): Array<T> {
    return _.flatten(this.values);
  }

  public to2Array(): Array<Array<T>> {
    return this.values;
  }
}

export default Grid;
