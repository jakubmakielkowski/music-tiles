import { flatten } from "lodash";

import { renderer, scene } from "./environment/scene";
import tiles, { generateTiles } from "./environment/elements/tiles";
import screen from "./environment/elements/screen";
import panelBottom from "./environment/elements/ui/panel/panelBottom";
import panelLeft from "./environment/elements/ui/panel/panelLeft";
import panelControls from "./environment/elements/ui/panel/panelControls";
import loop from "./environment/animation/loop";
import "./environment/events/mouse";
import "./environment/sound/index";

// Create tiles grid
generateTiles();

scene.add(screen);
scene.add(panelBottom);
scene.add(panelLeft);
scene.add(panelControls);
scene.add(...flatten(tiles));

document.body.appendChild(renderer.domElement);

loop();
