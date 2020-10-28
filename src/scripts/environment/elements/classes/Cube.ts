import * as THREE from "three";

import CONFIG from "../../../config";

const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(
  CONFIG.TILE_LENGTH,
  CONFIG.TILE_LENGTH,
  CONFIG.CUBE_HEIGHT
);

const cubeMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.CUBE_COLOR,
});

const pointedCubeMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: CONFIG.POINTED_TILE_COLOR,
});

class Cube extends THREE.Mesh {
  constructor(y: number, x: number) {
    super(cubeGeometry, cubeMaterial);

    this.positionMesh(y, x);
    this.prepareAnimationControls();

    this.type = "cube";
    this.y = y;
    this.x = x;

    // Show newly created Cube
    this.show();
  }

  readonly type: string;
  readonly y: number;
  readonly x: number;
  readonly mixer: THREE.AnimationMixer;
  readonly clipShow: THREE.AnimationClip;
  readonly clipHide: THREE.AnimationClip;
  readonly animationShow: THREE.AnimationAction;
  readonly animationHide: THREE.AnimationAction;

  private positionMesh(y: number, x: number) {
    // Align mesh position to screen grid
    const screenBoundary = (-CONFIG.SCREEN_SIZE * CONFIG.TILE_OUTER_LENGTH) / 2;
    this.position.setY(screenBoundary + y * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2);
    this.position.setX(screenBoundary + x * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2);
  }

  private prepareAnimationControls() {
    this.mixer = new THREE.AnimationMixer(this);

    const HALF_CUBE_HEIGHT: number = CONFIG.CUBE_HEIGHT / 2;
    this.clipShow = new THREE.AnimationClip("clipShow", 3, [
      new THREE.VectorKeyframeTrack(
        ".position",
        [0, CONFIG.CUBE_ANIMATION_LENGTH],
        [this.position.x, this.position.y, -HALF_CUBE_HEIGHT, this.position.x, this.position.y, HALF_CUBE_HEIGHT]
      ),
    ]);

    this.animationShow = this.mixer.clipAction(this.clipShow);
    this.animationShow.setLoop(THREE.LoopOnce, 1);

    this.clipHide = new THREE.AnimationClip("clipHide", 3, [
      new THREE.VectorKeyframeTrack(
        ".position",
        [0, CONFIG.CUBE_ANIMATION_LENGTH],
        [this.position.x, this.position.y, HALF_CUBE_HEIGHT, this.position.x, this.position.y, -HALF_CUBE_HEIGHT]
      ),
    ]);

    this.animationHide = this.mixer.clipAction(this.clipHide);
    this.animationHide.setLoop(THREE.LoopOnce, 1);
  }

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
