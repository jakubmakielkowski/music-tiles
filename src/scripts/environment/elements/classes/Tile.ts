import * as THREE from "three";

import CONFIG from "../../../config";

const tileGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(CONFIG.TILE_LENGTH, CONFIG.TILE_LENGTH);

const tileMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.TILE_COLOR
});

const pointedTileMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.POINTED_TILE_COLOR,
});

const hoveredTileMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.HOVERED_TILE_COLOR,
});

class Tile extends THREE.Mesh {
  constructor(y: number, x: number) {
    super(tileGeometry, tileMaterial);

    const screenBoundary = (-CONFIG.SCREEN_SIZE * CONFIG.TILE_OUTER_LENGTH) / 2;

    this.position.setX(screenBoundary + x * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2);
    this.position.setY(screenBoundary + y * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2);
    this.position.setZ(0.1);

    this.type = "tile";
    this.y = y;
    this.x = x;
  }

  readonly type: string;
  readonly y: number;
  readonly x: number;
}

export default Tile;
export { tileGeometry, tileMaterial, pointedTileMaterial, hoveredTileMaterial };
