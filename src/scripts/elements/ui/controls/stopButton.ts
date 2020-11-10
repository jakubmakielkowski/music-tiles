import * as THREE from "three";

import CONFIG from "scripts/config";
import Button from "scripts/elements/shapes/button/Button";
import { scene } from "scripts/scene";
import { getTextGeometry, textMaterial } from "scripts/elements/shapes/text/mesh";

const StopButton: Button = new Button(
  (CONFIG.SCREEN_HEIGHT * CONFIG.TILE_OUTER_LENGTH) / 2 + 12,
  (-CONFIG.SCREEN_WIDTH * CONFIG.TILE_OUTER_LENGTH) / 2 + 30,
  "stopButton",
  CONFIG.BUTTON_STOP_COLOR
);

const loader = new THREE.FontLoader();

loader.load("assets/fonts/Open_Sans_Bold.json", function (loadedFont) {
  const textGeometry: THREE.TextGeometry = getTextGeometry(loadedFont, "STOP");

  const mesh: THREE.Mesh = new THREE.Mesh(textGeometry, textMaterial);

  mesh.rotateZ(Math.PI / 2);
  mesh.position.set(StopButton.position.x + 11, StopButton.position.y - 8, 0.1);

  StopButton.add(mesh);

  // TODO move to index.ts
  scene.add(mesh);
});

export default StopButton;
