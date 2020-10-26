import * as THREE from "three";

import CONFIG from "../../config.ts";

const screenGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(
  CONFIG.SCREEN_SIZE * CONFIG.TILE_OUTER_LENGTH + 2,
  CONFIG.SCREEN_SIZE * CONFIG.TILE_OUTER_LENGTH + 2
);
const screenMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  color: CONFIG.SCREEN_COLOR,
});

const screen: THREE.Mesh = new THREE.Mesh(screenGeometry, screenMaterial);
screen.position.x = 0;
screen.position.z = 0;

export default screen;
