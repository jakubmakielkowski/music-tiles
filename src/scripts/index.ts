import * as THREE from "three";

import { camera, renderer, scene } from "./environment/scene.ts";
import screen from "./environment/elements/screen.ts";
import tiles from "./environment/elements/tiles.ts";

scene.add(screen);
scene.add(tiles);

const animate = () => {    
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
};
animate();

document.body.appendChild( renderer.domElement );

