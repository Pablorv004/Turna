import Tile from './Tile.js';
import { TILE_CONFIG } from './config.js';

export function loadTiles(scene) {
    const centerx = TILE_CONFIG.centerx;
    const centery = TILE_CONFIG.centery;
    const xoffset = TILE_CONFIG.xoffset;
    const yoffset = TILE_CONFIG.yoffset;

    const tiles = [
        //GAME TILES

        //Outer hexagon (top)
        //This will surround the branches with the same offsets with a hollow tile hexagon
        //Left-To-Top row
        new Tile(scene, centerx - xoffset * 3, centery - yoffset * 4, 0),
        new Tile(scene, centerx - xoffset * 3.5, centery - yoffset * 3, 0),
        new Tile(scene, centerx - xoffset * 4, centery - yoffset * 2, 0),
        new Tile(scene, centerx - xoffset * 4.5, centery - yoffset, 0),
        new Tile(scene, centerx - xoffset * 5, centery, 0),

        // Top row (ltr)
        new Tile(scene, centerx - xoffset * 2, centery - yoffset * 4, 0),
        new Tile(scene, centerx - xoffset, centery - yoffset * 4, 0),
        new Tile(scene, centerx, centery - yoffset * 4, 0),
        new Tile(scene, centerx + xoffset, centery - yoffset * 4, 0),

        //Right-To-Top row
        new Tile(scene, centerx + xoffset * 2, centery - yoffset * 4, 0),
        new Tile(scene, centerx + xoffset * 2.5, centery - yoffset * 3, 0),
        new Tile(scene, centerx + xoffset * 3, centery - yoffset * 2, 0),
        new Tile(scene, centerx + xoffset * 3.5, centery - yoffset, 0),
        new Tile(scene, centerx + xoffset * 4, centery, 0),
        
        //Top left branch
        new Tile(scene, centerx - xoffset * 2.5, centery - yoffset * 3, 0),
        new Tile(scene, centerx - xoffset * 2, centery - yoffset * 2, 0),
        new Tile(scene, centerx - xoffset * 1.5, centery - yoffset, 0),

        //Top right branch
        new Tile(scene, centerx + xoffset * 1.5, centery - yoffset * 3, 0),
        new Tile(scene, centerx + xoffset, centery - yoffset * 2, 0),
        new Tile(scene, centerx + xoffset * 0.5, centery - yoffset, 0),
        
        //Inner Hexagon
        new Tile(scene, centerx, centery, 0), // Center tile
        new Tile(scene, centerx - xoffset, centery, 0),
        new Tile(scene, centerx - xoffset / 2, centery + yoffset, 0),
        new Tile(scene, centerx - xoffset * 1.5, centery + yoffset, 0),
        new Tile(scene, centerx + xoffset * 0.5, centery + yoffset, 0),
        new Tile(scene, centerx, centery + yoffset * 2, 0),
        new Tile(scene, centerx - xoffset, centery + yoffset * 2, 0),

        //Bottom left branch
        new Tile(scene, centerx - xoffset * 1.5, centery + yoffset * 3, 0),
        new Tile(scene, centerx - xoffset * 2, centery + yoffset * 4, 0),
        new Tile(scene, centerx - xoffset * 2.5, centery + yoffset * 5, 0),

        //Bottom right branch
        new Tile(scene, centerx + xoffset * 0.5, centery + yoffset * 3, 0),
        new Tile(scene, centerx + xoffset, centery + yoffset * 4, 0),
        new Tile(scene, centerx + xoffset * 1.5, centery + yoffset * 5, 0),

        //Left branch
        new Tile(scene, centerx - xoffset * 2.5, centery + yoffset, 0),
        new Tile(scene, centerx - xoffset * 3.5, centery + yoffset, 0),
        new Tile(scene, centerx - xoffset * 4.5, centery + yoffset, 0),

        //Right branch
        new Tile(scene, centerx + xoffset * 1.5, centery + yoffset, 0),
        new Tile(scene, centerx + xoffset * 2.5, centery + yoffset, 0),
        new Tile(scene, centerx + xoffset * 3.5, centery + yoffset, 0),

        //Bottom middle triangle (lava tiles)
        new Tile(scene, centerx - xoffset * 0.5, centery + yoffset * 3, 2),
        new Tile(scene, centerx - xoffset, centery + yoffset * 4, 2),
        new Tile(scene, centerx, centery + yoffset * 4, 2),
        new Tile(scene, centerx - xoffset * 1.5, centery + yoffset * 5, 2),
        new Tile(scene, centerx - xoffset * 0.5, centery + yoffset * 5, 2),
        new Tile(scene, centerx + xoffset * 0.5, centery + yoffset * 5, 2),

        //Outer hexagon (bottom)
        //This will surround the branches with the same offsets with a hollow tile hexagon
        //Right-To-Bottom row
        new Tile(scene, centerx + xoffset * 4.5, centery + yoffset, 0),
        new Tile(scene, centerx + xoffset * 4, centery + yoffset * 2, 0),
        new Tile(scene, centerx + xoffset * 3.5, centery + yoffset * 3, 0),
        new Tile(scene, centerx + xoffset * 3, centery + yoffset * 4, 0),
        new Tile(scene, centerx + xoffset * 2.5, centery + yoffset * 5, 0),

        
        //Left-To-Bottom row
        new Tile(scene, centerx - xoffset * 5.5, centery + yoffset, 0),
        new Tile(scene, centerx - xoffset * 5, centery + yoffset * 2, 0),
        new Tile(scene, centerx - xoffset * 4.5, centery + yoffset * 3, 0),
        new Tile(scene, centerx - xoffset * 4, centery + yoffset * 4, 0),
        new Tile(scene, centerx - xoffset * 3.5, centery + yoffset * 5, 0),

        //Bottom row (rtl)
        new Tile(scene, centerx + xoffset * 2, centery + yoffset * 6, 0),
        new Tile(scene, centerx + xoffset, centery + yoffset * 6, 0),
        new Tile(scene, centerx, centery + yoffset * 6, 0),
        new Tile(scene, centerx - xoffset, centery + yoffset * 6, 0),
        new Tile(scene, centerx - xoffset * 2, centery + yoffset * 6, 0),
        new Tile(scene, centerx - xoffset * 3, centery + yoffset * 6, 0),
    ];

    scene.tiles = tiles;

    tiles.forEach((tile, index) => {
        tile.sprite.alpha = 0;
        scene.time.delayedCall(index, () => {
            scene.tweens.add({
                targets: tile.sprite,
                alpha: 1,
                duration: 150
            });
        });
    });

    return tiles;
}
