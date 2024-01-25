import * as THREE from "three";
import { CONFIG } from "scripts/config";

const cubeGeometry = new THREE.BoxGeometry(
  CONFIG.TILE_LENGTH,
  CONFIG.TILE_LENGTH,
  CONFIG.CUBE_HEIGHT
);

const cubeMaterial= new THREE.MeshPhongMaterial({
  color: CONFIG.CUBE_COLOR,
});

const pointedCubeMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.POINTED_CUBE_COLOR,
});

export { cubeGeometry, cubeMaterial, pointedCubeMaterial };
