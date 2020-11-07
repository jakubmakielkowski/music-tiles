import CONFIG from "scripts/config";
import Button from "scripts/elements/shapes/button/Button";

const PlayButton: Button = new Button(
  (CONFIG.SCREEN_HEIGHT * CONFIG.TILE_OUTER_LENGTH) / 2 + 15,
  (-CONFIG.SCREEN_WIDTH * CONFIG.TILE_OUTER_LENGTH) / 2 + 10,
  "playButton",
  CONFIG.BUTTON_PLAY_COLOR
);

export default PlayButton;
