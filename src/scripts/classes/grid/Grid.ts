import * as _ from "lodash";
import { CONFIG } from "scripts/config";

export class Grid<T> {
  constructor(height: number, width: number, typeFactory: { new(...args: any[]): T }) {
    this.height = height;
    this.width = width;
    this.typeFactory = typeFactory;

    this.initialize();
  }

  private values: Array<Array<T>>;
  public readonly height: number;
  public readonly width: number;
  public readonly typeFactory: { new(...args: any[]): T };

  private initialize() {
    this.values = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      this.values[i] = new Array(this.width);
      for (let j = 0; j < this.width; j++) {
        this.values[i][j] = new this.typeFactory(i, j);
      }
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
