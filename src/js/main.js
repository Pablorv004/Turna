import GameScene from './scene.js';
import MainMenu from './mainMenu.js';

const config = {
    type: Phaser.AUTO,
    width: 1247,
    height: 968,
    pixelArt: true,
    scene: [MainMenu, GameScene]
};

const game = new Phaser.Game(config);
