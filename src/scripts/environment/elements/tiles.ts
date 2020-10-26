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
  const tilesColumn: THREE.Group = new THREE.Group();

  for (let j = 0; j < CONFIG.SCREEN_SIZE; j++) {
    const tile = tilePrototype.clone();
    tile.position.set(
      screenBoundary + i * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2,
      screenBoundary + j * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2,
      0.01
    );
    tilesColumn.add(tile);
  }

  tiles.add(tilesColumn);
}

console.log(tiles);

export default tiles;
