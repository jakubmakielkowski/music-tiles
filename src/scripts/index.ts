import { renderer, scene } from "./scene";
import { tiles } from "./ui-elements/interactive/tiles";
import { screen } from "./ui-elements/screen";
import panelControls from "./ui-elements/static/panelControls";
import { PlayButton } from "./ui-elements/controls/playButton";
import { StopButton } from "./ui-elements/controls/stopButton";
import { ClearButton } from "./ui-elements/controls/clearButton";
import loop from "./animation/loop";
import "./events/mouse";
import "./sound/index";
import "./routing/index";
import { cubes } from "./ui-elements/interactive/cubes";

scene.add(screen);
scene.add(panelControls);

scene.add(PlayButton);
scene.add(StopButton);
scene.add(ClearButton);

scene.add(...tiles.toArray());
scene.add(...cubes.toArray());

document.body.appendChild(renderer.domElement);

loop();
