import { flatten } from "lodash";

import { renderer, scene } from "./environment/scene";
import tiles, { generateTiles } from "./environment/elements/tiles";
import screen from "./environment/elements/screen";
import loop from "./environment/animation/loop";
import { onMouseMove } from "./environment/events/mouse";

onMouseMove;
// Create tiles grid
generateTiles();

scene.add(screen);
scene.add(...flatten(tiles));

document.body.appendChild(renderer.domElement);

loop();
