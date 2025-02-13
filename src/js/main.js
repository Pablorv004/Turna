import GameScene from './scene.js';
import MainMenu from './mainMenu.js';
import ManualScene from './manualScene.js';
import HelpScene from './helpScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1247,
    height: 820,
    pixelArt: true,
    scene: [MainMenu, GameScene, ManualScene, HelpScene],
};

const game = new Phaser.Game(config);
