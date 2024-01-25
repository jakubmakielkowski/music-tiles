import * as THREE from "three";

import CONFIG from "scripts/config";

const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(
  CONFIG.TILE_LENGTH,
  CONFIG.TILE_LENGTH,
  CONFIG.CUBE_HEIGHT
);

const cubeMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.CUBE_COLOR,
});

const pointedCubeMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.POINTED_CUBE_COLOR,
});

export { cubeGeometry, cubeMaterial, pointedCubeMaterial };
