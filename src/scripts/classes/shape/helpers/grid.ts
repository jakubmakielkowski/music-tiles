// Helper functions to calculate Tile's alingment in grid

import CONFIG from "scripts/config";

const screenBoundaryX = (-CONFIG.SCREEN_HEIGHT * CONFIG.TILE_OUTER_LENGTH) / 2;
const screenBoundaryY = (-CONFIG.SCREEN_WIDTH * CONFIG.TILE_OUTER_LENGTH) / 2;

const getGridPosition = (x:number, y:number):any => {
    return [
        screenBoundaryX + x * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2,
        screenBoundaryY + y * CONFIG.TILE_OUTER_LENGTH + CONFIG.TILE_OUTER_LENGTH / 2
    ]
}

export { getGridPosition }