import * as THREE from "three";

import { CONFIG } from "scripts/config";

const screenGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(
  CONFIG.SCREEN_HEIGHT * CONFIG.TILE_OUTER_LENGTH + 2,
  CONFIG.SCREEN_WIDTH * CONFIG.TILE_OUTER_LENGTH + 2
);

const screenMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.SCREEN_COLOR,
});

export const screen: THREE.Mesh = new THREE.Mesh(screenGeometry, screenMaterial);
