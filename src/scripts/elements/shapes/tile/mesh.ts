import * as THREE from "three";

import CONFIG from "scripts/config";

const tileGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(CONFIG.TILE_LENGTH, CONFIG.TILE_LENGTH);

const tileMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.TILE_COLOR,
});

const pointedTileMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.POINTED_TILE_COLOR,
});

const hoveredTileMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.HOVERED_TILE_COLOR,
});

export { tileGeometry, tileMaterial, pointedTileMaterial, hoveredTileMaterial };
