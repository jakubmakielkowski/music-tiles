import * as THREE from "three";

import CONFIG from "../../../config";

const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(
  CONFIG.TILE_LENGTH,
  CONFIG.TILE_LENGTH,
  CONFIG.TILE_LENGTH
);

const cubeMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: 0x777777,
  specular: 0xffffff,
  shininess: 50,
});

class Cube extends THREE.Mesh {
  constructor(y: number, x: number) {
    super(cubeGeometry, cubeMaterial);
    this.position.setX(x);
    this.position.setY(y);
    this.position.setZ(4);

    const screenBoundary = (-CONFIG.SCREEN_SIZE * CONFIG.TILE_OUTER_LENGTH) / 2;

    this.position.setY(screenBoundary + y * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2);
    this.position.setX(screenBoundary + x * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2);

    this.type = "cube";
    this.y = y;
    this.x = x;
  }

  readonly type: string;
  readonly y: number;
  readonly x: number;
}

export default Cube;
export { cubeGeometry, cubeMaterial };
