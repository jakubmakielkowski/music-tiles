import * as THREE from "three";

import { camera, scene } from "../scene.ts";

import CONFIG from "../../config.ts";

const raycaster:THREE.Raycaster = new THREE.Raycaster();
const mouse:THREE.Vector2 = new THREE.Vector2();


const tileMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
	side: THREE.DoubleSide,
	color: CONFIG.TILE_COLOR,
});
  
const hoveredTileMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
	side: THREE.DoubleSide,
	color: CONFIG.HOVERED_TILE_COLOR,
});


let previousIntersect;

const onMouseMove = (event:Event):void {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	const intersects = raycaster.intersectObjects( scene.children.filter(el => el.name === "tile"), true );

	if(intersects.length){
		// Remove color after mouse leave
		if(previousIntersect){
			previousIntersect.object.material = tileMaterial;
		}

		previousIntersect = intersects[0];
		intersects[0].object.material = hoveredTileMaterial;
	}
}

const onMouseClick = (event:Event):void {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	const intersects = raycaster.intersectObjects( scene.children.filter(el => el.name === "tile"), true );

	if(intersects.length){
		
	}
}

window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'click', onMouseClick, false );

export { onMouseMove }