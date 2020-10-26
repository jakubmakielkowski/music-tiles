import * as THREE from "three";

import CONFIG from "../../config.ts";

const tileMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  color: CONFIG.TILE_COLOR,
});

const pointedTileMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  color: CONFIG.POINTED_TILE_COLOR,
});

const pointCurrentTiles = (tiles: THREE.Group, column: number): void => {
  let previousColumn:number = CONFIG.SCREEN_SIZE - 1;

  if(column) {
    previousColumn = column - 1;
  }
  
  // Color current column
  tiles.children[column].children.forEach((tile: THREE.Mesh) => {
    tile.material = pointedTileMaterial;
  });

  // Remove color form previous column
  tiles.children[previousColumn].children.forEach((tile: THREE.Mesh) => {
    tile.material = tileMaterial;
  });
};

export { pointCurrentTiles };
