export const xoffset = 65;
export const yoffset = 54;
export const playerTileOffset = -25;
export const center = 500;

export const gameConfig = {
    type: Phaser.AUTO,
    width: 1800,
    height: 1014,
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
