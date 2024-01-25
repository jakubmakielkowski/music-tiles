import { CONFIG } from "scripts/config";
import Button from "scripts/classes/button/Button";

export const ClearButton = new Button(
  (CONFIG.SCREEN_HEIGHT * CONFIG.TILE_OUTER_LENGTH) / 2 + 12,
  (-CONFIG.SCREEN_WIDTH * CONFIG.TILE_OUTER_LENGTH) / 2 + 50,
  "clearButton",
  CONFIG.BUTTON_CLEAR_COLOR,
  "CLEAR"
);
