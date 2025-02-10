export const xoffset = 65;
export const yoffset = 54;
export const playerTileOffset = -25;
export const center = 500;

export const config = {
    type: Phaser.AUTO,
    width: 1247,
    height: 968,
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
