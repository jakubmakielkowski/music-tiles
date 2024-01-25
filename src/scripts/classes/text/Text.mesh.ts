import * as THREE from "three";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Font } from 'three/examples/jsm/loaders/FontLoader';

const getTextGeometry = (font: Font, text: string): TextGeometry => {
  return new TextGeometry(text, {
    font: font,
    size: 4,
    height: 0,
    curveSegments: 12,
    bevelEnabled: false,
  });
};

const textMaterial = new THREE.MeshPhongMaterial({
  color: 0x555555,
});

export { getTextGeometry, textMaterial };
