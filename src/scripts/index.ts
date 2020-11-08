import { renderer, scene } from "./scene";
import tiles, { generateTiles } from "./elements/iterable/tiles";
import screen from "./elements/screen";
import panelLeft from "./elements/ui/panel/panelLeft";
import panelControls from "./elements/ui/panel/panelControls";
import playButton from "./elements/ui/controls/playButton";
import stopButton from "./elements/ui/controls/stopButton";
import loop from "./animation/loop";
import "./events/mouse";
import "./sound/index";
import "./routing/index";

// Create tiles grid
generateTiles();

scene.add(screen);
scene.add(panelLeft);
scene.add(panelControls);

scene.add(playButton);
scene.add(stopButton);

scene.add(...tiles.toArray());

document.body.appendChild(renderer.domElement);

loop();
