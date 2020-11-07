import * as THREE from "three";

import CONFIG from "scripts/config";
import Shape from "scripts/elements/shapes/shape/Shape";
import { buttonGeometry } from "./mesh";

class Button extends Shape {
  constructor(x: number, y: number, name: string, color: number) {
    const buttonMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
      color: color,
    });

    super(buttonGeometry, buttonMaterial);

    this.type = "button";
    this.name = name;
    this.position.set(x, y, CONFIG.CUBE_HEIGHT / 2);
    
    this.mixer = new THREE.AnimationMixer(this);
    const clip: THREE.AnimationClip = new THREE.AnimationClip("clipShow", 3, [
      new THREE.VectorKeyframeTrack(
        ".position",
        [0, CONFIG.BUTTON_ANIMATION_LENGTH],
        [this.position.x, this.position.y, -CONFIG.CUBE_HEIGHT / 2, this.position.x, this.position.y, CONFIG.CUBE_HEIGHT / 2]
      ),
    ]);
    
    this.animation = this.mixer.clipAction(clip);
    this.animation.setLoop(THREE.LoopOnce, 1);
  }

  private animation: THREE.AnimationAction;
  public readonly mixer: THREE.AnimationMixer;

  public animate() {
    this.animation.stop();
    this.animation.play();
  }
}

export default Button;
