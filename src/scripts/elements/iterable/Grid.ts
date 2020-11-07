import * as _ from "lodash";

class Grid<T> {
    constructor(height:number, width:number) {
        this.height = height;
        this.width = width;

        this.values = new Array();
        for(let i=0; i<height; i++) {
            this.values[i] = new Array();
        }
    }

    private values: Array<Array<T>>;
    public readonly height: number;
    public readonly width: number;

    push(y:number, x:number, value: T):void {
        this.values[y][x] = value;
    }

    get(y:number, x:number):T {
        return this.values[y][x];
    }

    toArray():Array<T> {
        return _.flatten(this.values);
    }

    to2Array():Array<Array<T>> {
        return this.values;
    }
}

export default Grid;