import { loadAnimations } from './loadAnimations.js';
import { loadImages } from './loadImages.js';
import { loadTiles } from './loadTiles.js';
import Player from './Player.js';
import Tile from './Tile.js';
import BaseSlime from './BaseSlime.js';
import MagmaSlime from './MagmaSlime.js';
import SkullSlime from './SkullSlime.js';
import MainMenu from './mainMenu.js';
import { getWaveEnemies } from './WaveEnemies.js';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.tileOffset = -25; // Constant to store the y value offset for the player and enemies
        this.waveNumber = 1; // Initialize wave number
        this.movesUntilNextWave = 5; // Moves required to trigger the next wave
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

        this.add.image(this.sys.game.config.width - 150, this.sys.game.config.height / 2 - 240, 'greyBox').setScale(2); // Spawn the grey box in the middle-right of the screen

        this.waveText = this.add.bitmapText(this.sys.game.config.width - 150, this.sys.game.config.height / 2 - 300, 'pixelfont', `Wave:`, 28).setOrigin(0.5, 0.5);
        this.waveNumberText = this.add.bitmapText(this.sys.game.config.width - 150, this.sys.game.config.height / 2 - 240, 'pixelfont', `${this.waveNumber}`, 72).setOrigin(0.5, 0.5);
        this.movesText = this.add.bitmapText(this.sys.game.config.width - 150, this.sys.game.config.height / 2 - 195, 'pixelfont', 'Moves until next wave:', 15).setOrigin(0.5, 0.5);
        this.movesUntilNextWaveText = this.add.bitmapText(this.sys.game.config.width - 150, this.sys.game.config.height / 2 - 165, 'pixelfont', `${this.movesUntilNextWave}`, 30).setOrigin(0.5, 0.5);

        this.spawnEnemies();
        this.changeRandomTileToMagical();

        this.gameOver = this.gameOver.bind(this); // Bind gameOver method to the scene

        // Listen for player move events
        this.events.on('playerMove', this.onPlayerMove, this);
    }

    update() {
        // Game logic goes here
    }

    spawnEnemies() {
        const enemies = getWaveEnemies(this.waveNumber, this);

        enemies.forEach((enemy, index) => {
            this.time.delayedCall(index * 100, () => {
                enemy.spawn();
                this.enemies.push(enemy);
                console.log(enemy);
            });
        });
    }

    onPlayerMove() {
        this.movesUntilNextWave--;
        this.movesUntilNextWaveText.setText(`${this.movesUntilNextWave}`);

        if (this.movesUntilNextWave <= 0) {
            this.waveNumber++;
            this.waveNumberText.setText(`${this.waveNumber}`);
            this.movesUntilNextWave = this.calculateMovesUntilNextWave(this.waveNumber);
            this.movesUntilNextWaveText.setText(`${this.movesUntilNextWave}`);
            this.spawnEnemies();
            this.orderEnemiesByDamage();
            this.changeRandomTileToMagical();
        }
    }

    calculateMovesUntilNextWave(waveNumber) {
        return Math.floor(6 + Math.pow(waveNumber, 1.25));
    }

    orderEnemiesByDamage() {
        this.enemies.sort((a, b) => b.damage - a.damage);
    }

    changeRandomTileToMagical() {
        const nonMagicalTiles = this.tiles.filter(tile => tile.type !== 4);
        if (nonMagicalTiles.length > 0) {
            const randomTile = nonMagicalTiles[Math.floor(Math.random() * nonMagicalTiles.length)];
            randomTile.setProperties(4);
            this.tweens.add({
                targets: randomTile.sprite,
                alpha: 0,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    randomTile.sprite.setTexture('magical');
                    this.tweens.add({
                        targets: randomTile.sprite,
                        alpha: 1,
                        duration: 100
                    });
                }
            });
            console.log(`Tile at (${randomTile.x}, ${randomTile.y}) changed to magical`);
        }
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
        const gameOverText = this.add.bitmapText(width / 2, height / 2, 'pixelfont', 'Game Over', 40);
        gameOverText.setOrigin(0.5, 0.5);
        gameOverText.alpha = 0;

        this.tweens.add({
            targets: gameOverText,
            alpha: 1,
            duration: 1000
        });

        // Add Retry button
        const retryButton = this.add.sprite(width / 2, height / 2 + 50, 'playButton', 3).setInteractive();
        const retryText = this.add.bitmapText(width / 2 - 23, height / 2 + 40, 'pixelfont', 'Retry', 20);
        retryButton.on('pointerdown', () => {
            this.scene.restart();
        });

        // Add Main Menu button
        const mainMenuButton = this.add.sprite(width / 2, height / 2 + 100, 'playButton', 1).setInteractive();
        const mainMenuText = this.add.bitmapText(width / 2 - 50, height / 2 + 90, 'pixelfont', 'Main Menu', 20);
        mainMenuButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        this.tweens.add({
            targets: [retryButton, retryText, mainMenuButton, mainMenuText],
            alpha: 1,
            duration: 1000
        });
    }
}

export default GameScene;