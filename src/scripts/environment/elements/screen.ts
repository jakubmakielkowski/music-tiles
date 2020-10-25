import * as THREE from "three";

import { TILE_OUTER_LENGTH, SCREEN_SIZE } from "../../config.ts";

const screenGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(
  SCREEN_SIZE * TILE_OUTER_LENGTH,
  SCREEN_SIZE * TILE_OUTER_LENGTH
);
const screenMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  color: 0x333333,
});

const screen: THREE.Mesh = new THREE.Mesh(screenGeometry, screenMaterial);
screen.position.x = 0;
screen.position.z = 0;

export default screen;
