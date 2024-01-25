import { Grid } from "scripts/classes/grid/Grid";
import { Shape } from "scripts/classes/shape/Shape";

export const findIntersectedShape = <T extends Shape>(shapes: Grid<T>, intersect: THREE.Intersection): T => {
  const { x, y } = intersect.object.position;

  const flattenedShapes: Array<T> = shapes.toArray();

  const intersectedShape: T = flattenedShapes.find((shape: T): boolean => {
    return shape?.position.x === x && shape?.position.y === y;
  });

  return intersectedShape;
};
