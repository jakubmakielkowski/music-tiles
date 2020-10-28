import * as THREE from "three";

import CONFIG from "../../../../config";

const screenGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(
  10,
  CONFIG.SCREEN_SIZE * CONFIG.TILE_OUTER_LENGTH + 2
);

const screenMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.SCREEN_COLOR,
});

const panelBottom: THREE.Mesh = new THREE.Mesh(screenGeometry, screenMaterial);

panelBottom.position.x = (CONFIG.SCREEN_SIZE * CONFIG.TILE_OUTER_LENGTH) / 2 + 10;

export default panelBottom;
