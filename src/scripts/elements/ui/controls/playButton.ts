import * as THREE from "three";

import CONFIG from "scripts/config";
import Button from "scripts/elements/shapes/button/Button";
import { scene } from "scripts/scene";
import { getTextGeometry, textMaterial } from "scripts/elements/shapes/text/mesh";

const PlayButton: Button = new Button(
  (CONFIG.SCREEN_HEIGHT * CONFIG.TILE_OUTER_LENGTH) / 2 + 12,
  (-CONFIG.SCREEN_WIDTH * CONFIG.TILE_OUTER_LENGTH) / 2 + 10,
  "playButton",
  CONFIG.BUTTON_PLAY_COLOR
);

const loader = new THREE.FontLoader();

loader.load("assets/fonts/Open_Sans_Bold.json", function (loadedFont) {
  const textGeometry: THREE.TextGeometry = getTextGeometry(loadedFont, "PLAY");

  const text: THREE.Mesh = new THREE.Mesh(textGeometry, textMaterial);

  text.rotateZ(Math.PI / 2);
  text.position.set(PlayButton.position.x + 11, PlayButton.position.y - 8, 0.1);

  PlayButton.add(text);

  // TODO move to index.ts
  scene.add(text);
});

export default PlayButton;
