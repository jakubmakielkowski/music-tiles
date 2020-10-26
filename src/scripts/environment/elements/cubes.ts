import * as THREE from "three";
import { Mesh } from "three";

import CONFIG from "../../config.ts";

const tileGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(CONFIG.TILE_LENGTH, CONFIG.TILE_LENGTH);
const tileMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  color: CONFIG.TILE_COLOR,
});

const tiles:Array<Mesh[]> = new Array();

const screenBoundary = (-CONFIG.SCREEN_SIZE * CONFIG.TILE_OUTER_LENGTH) / 2;

for (let i = 0; i < CONFIG.SCREEN_SIZE; i++) {
  const tilesColumn: Array<Mesh> = new Array();

  for (let j = 0; j < CONFIG.SCREEN_SIZE; j++) {
    const tile: THREE.Mesh = new THREE.Mesh(tileGeometry, tileMaterial);
    tile.name = `tile`;
    tile.position.set(
      screenBoundary + i * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2,
      screenBoundary + j * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2,
      0.01
    );
    tilesColumn.push(tile);
  }

  tiles.push(tilesColumn);
}

export default tiles;
