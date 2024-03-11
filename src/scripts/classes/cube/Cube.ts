import * as THREE from "three";

import { CONFIG } from "scripts/config";
import { Shape } from "scripts/classes/shape/Shape";
import { cubeGeometry, cubeMaterial, pointedCubeMaterial } from "./Cube.mesh";
import { getGridPosition } from "scripts/classes/shape/helpers/grid";

class Cube extends Shape {
  public readonly y: number;
  public readonly x: number;
  public readonly mixer: THREE.AnimationMixer;
  public active: boolean;
  private animationShow: THREE.AnimationAction;
  private animationHide: THREE.AnimationAction;

  constructor(y: number, x: number) {
    super(cubeGeometry, cubeMaterial);

    this.shapeName = "cube";
    this.y = y;
    this.x = x;
    this.active = false;

    const [gridX, gridY] = getGridPosition(x, y);
    this.position.set(gridX, gridY, -CONFIG.CUBE_HEIGHT / 2 - 0.1);

    this.mixer = new THREE.AnimationMixer(this);

    const clips = [
      new THREE.AnimationClip("clipShow", 3, [
        new THREE.VectorKeyframeTrack(
          ".position",
          [0, CONFIG.CUBE_ANIMATION_LENGTH],
          [
            this.position.x,
            this.position.y,
            -CONFIG.CUBE_HEIGHT / 2,
            this.position.x,
            this.position.y,
            CONFIG.CUBE_HEIGHT / 2,
          ]
        ),
      ]),
      new THREE.AnimationClip("clipHide", 3, [
        new THREE.VectorKeyframeTrack(
          ".position",
          [0, CONFIG.CUBE_ANIMATION_LENGTH],
          [
            this.position.x,
            this.position.y,
            CONFIG.CUBE_HEIGHT / 2,
            this.position.x,
            this.position.y,
            -CONFIG.CUBE_HEIGHT / 2,
          ]
        ),
      ]),
    ];

    const [clipShow, clipHide] = clips;

    this.animationShow = this.mixer.clipAction(clipShow);
    this.animationShow.setLoop(THREE.LoopOnce, 1);

    this.animationHide = this.mixer.clipAction(clipHide);
    this.animationHide.setLoop(THREE.LoopOnce, 1);
  }

  public show() {
    this.active = true;
    this.animationHide.stop();
    this.animationShow.play();
  }

  public hide() {
    this.active = false;
    this.animationShow.stop();
    this.animationHide.play();
  }
}

export default Cube;
export { cubeGeometry, cubeMaterial, pointedCubeMaterial };
