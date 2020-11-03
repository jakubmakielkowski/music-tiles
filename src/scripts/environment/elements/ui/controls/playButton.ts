import CONFIG from "../../../../config";
import Button from "../../classes/Button";

const PlayButton: Button = new Button(75, (-CONFIG.SCREEN_SIZE * CONFIG.TILE_OUTER_LENGTH) / 2 + 10, "playButton", CONFIG.BUTTON_PLAY_COLOR);

export default PlayButton;
