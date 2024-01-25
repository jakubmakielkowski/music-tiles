import * as THREE from "three";
import { CONFIG } from "scripts/config";

const screenGeometry = new THREE.PlaneGeometry(
  20,
  CONFIG.SCREEN_WIDTH * CONFIG.TILE_OUTER_LENGTH + 2
);

const screenMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.SCREEN_COLOR,
});

const panelControls= new THREE.Mesh(screenGeometry, screenMaterial);

panelControls.position.x = (CONFIG.SCREEN_HEIGHT * CONFIG.TILE_OUTER_LENGTH) / 2 + 15;

export default panelControls;
