import CONFIG from "../../../../config";
import Button from "../../classes/Button";

const StopButton: Button = new Button(75, (-CONFIG.SCREEN_SIZE * CONFIG.TILE_OUTER_LENGTH) / 2 + 30, "stopButton", CONFIG.BUTTON_STOP_COLOR);

export default StopButton;
