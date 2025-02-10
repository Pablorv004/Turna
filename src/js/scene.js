import { loadAnimations } from './loadAnimations.js';
import { loadImages } from './loadImages.js';
import { loadTiles } from './loadTiles.js';
import Player from './Player.js';
import Tile from './Tile.js';
import BaseSlime from './BaseSlime.js';
import MagmaSlime from './MagmaSlime.js';
import SkullSlime from './SkullSlime.js';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.tileOffset = -25; // Constant to store the y value offset for the player and enemies
    }

    preload() {
        loadImages(this);
    }

    create() {
        const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.enemies = []; // Initialize enemies array

        const player = new Player(this);
        this.player = player; // Make player accessible in the scene
        console.log(player);

        loadAnimations(this);

        const tiles = loadTiles(this);

        const playerSprite = this.add.sprite(650 - 65 * 0.5, 400 + 54 + this.tileOffset, 'playerIdle'); // Spawn player on the center tile with offset
        playerSprite.setScale(2); // Scale the player sprite upwards
        playerSprite.play('idleDown'); // Set initial idle animation to looking down
        this.playerSprite = playerSprite; // Make player sprite accessible in the scene
        this.playerSprite.setDepth(1); // Ensure player sprite is above the tiles

        // Set the player's initial tile to the bottom left of the center tile
        const initialTile = tiles.find(tile => tile.x === 650 - 65 / 2 && tile.y === 400 + 54);
        this.player.moveToTile(initialTile);

        this.spawnEnemies();

        this.gameOver = this.gameOver.bind(this); // Bind gameOver method to the scene
    }

    update() {
        // Game logic goes here
    }

    spawnEnemies() {
        const enemies = [
            new BaseSlime(this, this.tiles),
            new BaseSlime(this, this.tiles),
            new MagmaSlime(this, this.tiles),
            new MagmaSlime(this, this.tiles),
            new SkullSlime(this, this.tiles)
        ];

        enemies.forEach((enemy, index) => {
            this.time.delayedCall(index * 100, () => {
                enemy.spawn();
                this.enemies.push(enemy);
                console.log(enemy);
            });
        });
    }

    gameOver() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        // Fade out all enemies
        this.enemies.forEach(enemy => {
            this.tweens.add({
                targets: enemy.sprite,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    enemy.sprite.destroy();
                }
            });
        });

        // Fade out all tiles
        this.tiles.forEach(tile => {
            this.tweens.add({
                targets: tile.sprite,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    tile.sprite.destroy();
                }
            });
        });

        // Fade in game over screen
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(0, 0, width, height);
        graphics.alpha = 0;

        this.tweens.add({
            targets: graphics,
            alpha: 1,
            duration: 1000
        });
        this.input.enabled = false;
        const gameOverText = this.add.text(width / 2, height / 2, 'Game Over', {
            fontSize: '64px',
            fill: '#ffffff'
        });
        gameOverText.setOrigin(0.5, 0.5);
        gameOverText.alpha = 0;

        this.tweens.add({
            targets: gameOverText,
            alpha: 1,
            duration: 1000
        });
    }
}

export default GameScene;