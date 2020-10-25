import * as THREE from "three";

import { camera, renderer, scene } from "./environment/scene.ts";
import screen from "./environment/elements/screen.ts";

scene.add(screen);

const animate = () => {    
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
};
animate();

document.body.appendChild( renderer.domElement );

