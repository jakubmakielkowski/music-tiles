import CONFIG from "scripts/config";
import Button from "scripts/elements/shapes/button/Button";

const StopButton: Button = new Button(
  (CONFIG.SCREEN_HEIGHT * CONFIG.TILE_OUTER_LENGTH) / 2 + 12,
  (-CONFIG.SCREEN_WIDTH * CONFIG.TILE_OUTER_LENGTH) / 2 + 30,
  "stopButton",
  CONFIG.BUTTON_STOP_COLOR,
  "STOP"
);

export default StopButton;
