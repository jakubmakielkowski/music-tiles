import * as THREE from "three";

import CONFIG from "scripts/config";

const screenGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(
  CONFIG.SCREEN_HEIGHT * CONFIG.TILE_OUTER_LENGTH + 2,
  10
);

const screenMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.SCREEN_COLOR,
});

const panelBottom: THREE.Mesh = new THREE.Mesh(screenGeometry, screenMaterial);

panelBottom.position.y = -(CONFIG.SCREEN_WIDTH * CONFIG.TILE_OUTER_LENGTH) / 2 - 10;

export default panelBottom;
