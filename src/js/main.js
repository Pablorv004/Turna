import GameScene from './scene.js';
import MainMenu from './mainMenu.js';
import ManualScene from './manualScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1247,
    height: 968,
    pixelArt: true,
    scene: [MainMenu, GameScene, ManualScene],
};

const game = new Phaser.Game(config);
