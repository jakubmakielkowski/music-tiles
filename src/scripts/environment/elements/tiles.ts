import * as THREE from "three";

import CONFIG from "../../config.ts";

const tileGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(CONFIG.TILE_LENGTH, CONFIG.TILE_LENGTH);
const tileMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  color: CONFIG.TILE_COLOR,
});

const tilePrototype: THREE.Mesh = new THREE.Mesh(tileGeometry, tileMaterial);

const tiles: THREE.Group = new THREE.Group();

const screenBoundary = (-CONFIG.SCREEN_SIZE * CONFIG.TILE_OUTER_LENGTH) / 2;

for (let i = 0; i < CONFIG.SCREEN_SIZE; i++) {
  for (let j = 0; j < CONFIG.SCREEN_SIZE; j++) {
    const tile = tilePrototype.clone();
    tile.position.set(
      screenBoundary + i * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2,
      screenBoundary + j * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2,
      0.01
    );
    tiles.add(tile);
  }
}

console.log(tiles);

export default tiles;
