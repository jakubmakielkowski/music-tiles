import * as THREE from "three";

import CONFIG from "scripts/config";
import Shape from "scripts/elements/shapes/shape/Shape";
import { buttonGeometry } from "./mesh";
import { getTextGeometry, textMaterial } from "scripts/elements/shapes/text/mesh";
import { scene } from "scripts/scene";

class Button extends Shape {
  constructor(x: number, y: number, name: string, color: number, text: string) {
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

    this.addText(text);
  }

  private animation: THREE.AnimationAction;
  public readonly mixer: THREE.AnimationMixer;

  private addText(text: string) {
    const loader = new THREE.FontLoader();

    loader.load("assets/fonts/Open_Sans_Bold.json", (loadedFont: THREE.Font) => {
      const textGeometry: THREE.TextGeometry = getTextGeometry(loadedFont, text);

      const textMesh: THREE.Mesh = new THREE.Mesh(textGeometry, textMaterial);

      textMesh.rotateZ(Math.PI / 2);
      textMesh.position.set(this.position.x + 11, this.position.y - 9, 0.1);

      this.add(textMesh);

      // TODO move to index.ts
      scene.add(textMesh);
    });
  }

  public animate() {
    this.animation.stop();
    this.animation.play();
  }
}

export default Button;
