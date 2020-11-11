import * as THREE from "three";

import CONFIG from "scripts/config";
import Button from "scripts/elements/shapes/button/Button";
import { scene } from "scripts/scene";
import { getTextGeometry, textMaterial } from "scripts/elements/shapes/text/mesh";

const ClearButton: Button = new Button(
  (CONFIG.SCREEN_HEIGHT * CONFIG.TILE_OUTER_LENGTH) / 2 + 12,
  (-CONFIG.SCREEN_WIDTH * CONFIG.TILE_OUTER_LENGTH) / 2 + 50,
  "clearButton",
  CONFIG.BUTTON_CLEAR_COLOR
);

const loader = new THREE.FontLoader();

loader.load("assets/fonts/Open_Sans_Bold.json", (loadedFont: THREE.Font) => {
  const textGeometry: THREE.TextGeometry = getTextGeometry(loadedFont, "CLEAR");

  const text: THREE.Mesh = new THREE.Mesh(textGeometry, textMaterial);

  text.rotateZ(Math.PI / 2);
  text.position.set(ClearButton.position.x + 11, ClearButton.position.y - 9, 0.1);

  ClearButton.add(text);

  // TODO move to index.ts
  scene.add(text);
});

export default ClearButton;
