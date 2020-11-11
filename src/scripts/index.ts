import { renderer, scene } from "./scene";
import tiles, { generateTiles } from "./elements/iterable/tiles";
import screen from "./elements/screen";
import panelControls from "./elements/ui/panel/panelControls";
import playButton from "./elements/ui/controls/playButton";
import stopButton from "./elements/ui/controls/stopButton";
import clearButton from "./elements/ui/controls/clearButton";
import loop from "./animation/loop";
import "./events/mouse";
import "./sound/index";
import "./routing/index";

// Create tiles grid
generateTiles();

scene.add(screen);
scene.add(panelControls);

scene.add(playButton);
scene.add(stopButton);
scene.add(clearButton);

scene.add(...tiles.toArray());

document.body.appendChild(renderer.domElement);

loop();
