import { flatten } from "lodash";

import { renderer, scene } from "./environment/scene";
import tiles, { generateTiles } from "./environment/elements/tiles";
import screen from "./environment/elements/screen";
import panelLeft from "./environment/elements/ui/panel/panelLeft";
import panelControls from "./environment/elements/ui/panel/panelControls";
import playButton from "./environment/elements/ui/controls/playButton";
import stopButton from "./environment/elements/ui/controls/stopButton";
import loop from "./environment/animation/loop";
import "./environment/events/mouse";
import "./environment/sound/index";

// Create tiles grid
generateTiles();

scene.add(screen);
scene.add(panelLeft);
scene.add(panelControls);

scene.add(playButton);
scene.add(stopButton);

scene.add(...flatten(tiles));

document.body.appendChild(renderer.domElement);

loop();
