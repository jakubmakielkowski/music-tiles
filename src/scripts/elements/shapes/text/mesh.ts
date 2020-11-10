import * as THREE from "three";

const getTextGeometry = (font: THREE.Font, text: string): THREE.TextGeometry => {
  return new THREE.TextGeometry(text, {
    font: font,
    size: 4,
    height: 0,
    curveSegments: 12,
    bevelEnabled: false,
  });
};

const textMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  color: 0x555555,
});

export { getTextGeometry, textMaterial };
