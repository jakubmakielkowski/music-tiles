import * as THREE from "three";

abstract class Shape extends THREE.Mesh {
    constructor(geometry: THREE.ShapeGeometry | THREE.BoxGeometry | THREE.PlaneGeometry, material: THREE.Material) {
        super(geometry, material);
    }

    public type: string;
}

export default Shape;