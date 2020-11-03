import * as THREE from "three";

import CONFIG from "../../../config";

const buttonGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(10, 18, CONFIG.CUBE_HEIGHT);


class Button extends THREE.Mesh {
  constructor(x: number, y: number, name: string, color: number) {
    const buttonMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
      color: color,
    });

    super(buttonGeometry, buttonMaterial);

    this.position.set(x, y, CONFIG.CUBE_HEIGHT / 2);
    this.type = "button";
    this.name = name;
    
    this.prepareAnimationControls();
  }

  type: string;
  mixer: THREE.AnimationMixer;
  clip: THREE.AnimationClip;
  animation: THREE.AnimationAction;

  private prepareAnimationControls() {
    console.log(this.children[0])
    this.mixer = new THREE.AnimationMixer(this);

    const HALF_CUBE_HEIGHT: number = CONFIG.CUBE_HEIGHT / 2;
    this.clip = new THREE.AnimationClip("clipShow", 3, [
      new THREE.VectorKeyframeTrack(
        ".position",
        [0, CONFIG.BUTTON_ANIMATION_LENGTH],
        [this.position.x, this.position.y, -HALF_CUBE_HEIGHT, this.position.x, this.position.y, HALF_CUBE_HEIGHT]
      ),
    ]);

    this.animation = this.mixer.clipAction(this.clip);
    this.animation.setLoop(THREE.LoopOnce, 1);
  }

  public animate() {
    this.animation.stop();
    this.animation.play();
  }
}

export default Button;
