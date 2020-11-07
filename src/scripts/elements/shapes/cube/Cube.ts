import * as THREE from "three";

import CONFIG from "scripts/config";
import Shape from "scripts/elements/shapes/shape/Shape";
import { cubeGeometry, cubeMaterial, pointedCubeMaterial } from "./mesh";
import { getGridPosition } from "scripts/elements/shapes/shape/helpers/grid";

class Cube extends Shape {
  constructor(y: number, x: number) {
    super(cubeGeometry, cubeMaterial);

    this.type = "cube";
    this.y = y;
    this.x = x;

    const [gridX, gridY] = getGridPosition(x, y);
    this.position.set(gridX, gridY, CONFIG.CUBE_HEIGHT / 2);

    this.mixer = new THREE.AnimationMixer(this);

    const clips: Array<THREE.AnimationClip> = [
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

    // Show newly created Cube
    this.show();
  }

  public readonly type: string;
  public readonly y: number;
  public readonly x: number;
  public readonly mixer: THREE.AnimationMixer;
  private animationShow: THREE.AnimationAction;
  private animationHide: THREE.AnimationAction;


  public show() {
    this.animationHide.stop();
    this.animationShow.play();
  }

  public hide() {
    this.animationShow.stop();
    this.animationHide.play();
  }
}

export default Cube;
export { cubeGeometry, cubeMaterial, pointedCubeMaterial };
