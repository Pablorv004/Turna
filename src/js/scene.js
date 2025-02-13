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
import HelpScene from './helpScene.js';
import { TILE_CONFIG } from './config.js';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.tileOffset = -25; // Constant to store the y value offset for the player and enemies
        this.tooltipText = {
            healthIdle: 'Health Points - Your remaining life',
            staminaIdle: 'Stamina - Attacks per turn',
            damage: 'Damage - Power of your attacks',
            range: 'Range - How far you can move or attack',
            speed: 'Speed - Additional moves per turn',
            experience: 'Experience - Points earned from kills'
        };
    }

    init(data) {
        this.difficulty = data.difficulty || 'normal';
    }

    preload() {
        loadImages(this);
    }

    create() {
        this.resetGame();
        const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        this.enemies = [];

        const player = new Player(this);
        this.player = player;
        console.log(player);

        loadAnimations(this);
        const tiles = loadTiles(this);

        const playerSprite = this.add.sprite(TILE_CONFIG.centerx - TILE_CONFIG.xoffset * 0.5, TILE_CONFIG.centery + TILE_CONFIG.yoffset + this.tileOffset, 'playerIdle'); // Spawn player on the center tile with offset
        playerSprite.setScale(2);
        playerSprite.play('idleDown');
        this.playerSprite = playerSprite;
        this.playerSprite.setDepth(1);

        // Set the player's initial tile to the bottom left of the center tile
        const initialTile = tiles.find(tile => tile.x === 650 - 65 / 2 && tile.y === 400 + 54);
        this.player.moveToTile(initialTile);

        this.add.image(this.sys.game.config.width - 110, 110, 'greyBox').setScale(1.5);

        this.add.image(this.sys.game.config.width - 110, 310, 'greyBox').setScale(1.5);

        this.waveText = this.add.bitmapText(this.sys.game.config.width - 110, 65, 'pixelfont', `Wave`, 28).setOrigin(0.5, 0.5);
        this.waveNumberText = this.add.bitmapText(this.sys.game.config.width - 110, 125, 'pixelfont', `${this.waveNumber}`, 72).setOrigin(0.5, 0.5);

        this.movesText = this.add.bitmapText(this.sys.game.config.width - 110, this.sys.game.config.height / 2 - 150, 'pixelfont', 'Next wave in', 20).setOrigin(0.5, 0.5);
        this.movesUntilNextWaveText = this.add.bitmapText(this.sys.game.config.width - 110, this.sys.game.config.height / 2 - 95, 'pixelfont', `${this.movesUntilNextWave}`, 60).setOrigin(0.5, 0.5);
        this.movesTextMoves = this.add.bitmapText(this.sys.game.config.width - 110, this.sys.game.config.height / 2 - 55, 'pixelfont', 'moves', 24).setOrigin(0.5, 0.5);

        this.add.image(110, 110, 'brownBox').setScale(1.5).setOrigin(0.5, 0.5);

        const icons = ['healthIdle', 'staminaIdle', 'damage', 'range', 'speed', 'experience'];
        const statTexts = [];
        for (let i = 0; i < 6; i++) {
            this.add.image(50, 270 + i * 70, 'roundDamagedBrown').setScale(0.5).setOrigin(0.5, 0.5);
            this.add.image(150, 270 + i * 70, 'brownButton').setScale(1).setOrigin(0.5, 0.5);
            const scale = (icons[i] === 'healthIdle' || icons[i] === 'staminaIdle') ? 2.25 : 0.5;
            const sprite = this.add.sprite(50, 270 + i * 70, icons[i])
                .setScale(scale)
                .setOrigin(0.5, 0.5)
                .setInteractive()
                .setData('tooltip', this.tooltipText[icons[i]]);

            sprite.on('pointerover', function () {
                const tooltipText = this.getData('tooltip');
                const tooltipBg = this.scene.add.graphics()
                    .setDepth(100)
                    .fillStyle(0x333333, 0.8)
                    .fillRoundedRect(
                        this.x + 25,
                        this.y - 10,
                        tooltipText.length * 9.5,
                        20, 
                        5  
                    );

                const tooltip = this.scene.add.bitmapText(
                    this.x + 30,
                    this.y,
                    'pixelfont',
                    tooltipText,
                    16
                ).setOrigin(0, 0.5).setDepth(101); // Set depth higher than background

                this.setData('tooltipObject', tooltip);
                this.setData('tooltipBg', tooltipBg);
            });

            sprite.on('pointerout', function () {
                const tooltip = this.getData('tooltipObject');
                const tooltipBg = this.getData('tooltipBg');
                if (tooltip) tooltip.destroy();
                if (tooltipBg) tooltipBg.destroy();
            });

            if (icons[i] === 'healthIdle') {
                this.healthSprite = sprite;
            } else if (icons[i] === 'staminaIdle') {
                this.staminaSprite = sprite;
            }

            let statValue;
            switch (icons[i]) {
                case 'healthIdle':
                    statValue = this.player.hp;
                    break;
                case 'staminaIdle':
                    statValue = this.player.attackCount;
                    break;
                case 'damage':
                    statValue = this.player.damage;
                    break;
                case 'range':
                    statValue = this.player.range;
                    break;
                case 'speed':
                    statValue = this.player.speed;
                    break;
                case 'experience':
                    statValue = this.player.experience;
                    break;
            }

            const statText = this.add.bitmapText(150, 270 + i * 70, 'pixelfont', `${statValue}`, 24).setOrigin(0.5, 0.5).setTint(0x000000);
            statTexts.push(statText);
        }

        this.statTexts = statTexts;

        this.add.image(this.sys.game.config.width / 2, 50, 'bannerHanging').setScale(0.6).setOrigin(0.5, 0.5);
        this.turnText = this.add.bitmapText(this.sys.game.config.width / 2, 56, 'pixelfont', 'Player\'s turn', 24).setOrigin(0.5, 0.5);

        const decorativePlayer = this.add.sprite(110, 110, 'playerIdle');
        decorativePlayer.setScale(3);
        decorativePlayer.play('idleDown');

        this.playerSprite.on('animationupdate', (animation, frame) => {
            decorativePlayer.play(animation.key, true);
        });

        this.spawnEnemies();
        this.changeRandomTileToMagical();

        this.gameOver = this.gameOver.bind(this);

        this.events.on('playerMove', this.onPlayerMove, this);

        this.manual = this.add.image(110, this.sys.game.config.height - 100, 'book').setScale(0.75).setInteractive();
        this.help = this.add.image(250, 50, 'help').setScale(1).setInteractive();

        this.manual.on('pointerdown', () => {
            this.showManual();
        });

        this.help.on('pointerdown', () => {
            this.showHelp();
        });

        this.skipTurnButton = this.add.sprite(this.sys.game.config.width - 130, this.sys.game.config.height - 100, 'whiteButton', 0).setInteractive();
        this.skipTurnText = this.add.bitmapText(this.sys.game.config.width - 130, this.sys.game.config.height - 100, 'pixelfont', 'Skip turn', 20).setOrigin(0.5, 0.5).setTint(0x000000);
        var canSkipTurn = true;
        this.skipTurnButton.on('pointerup', () => {
            if (canSkipTurn && this.player.hp > 0) {
                this.skipTurnButton.setFrame(1);
                this.events.emit('playerMove');
                this.enemies.forEach(enemy => enemy.moveTowardsPlayer(this.player.tileOn, this.tiles));
                canSkipTurn = false;
                this.player.attackCount = 1;
                this.time.delayedCall(1500, () => {
                    canSkipTurn = true;
                });
            }
        });
    }

    showManual() {
        this.scene.pause();
        this.scene.launch('ManualScene');
    }

    showHelp() {
        this.scene.pause();
        this.scene.launch('HelpScene');
    }

    resetGame() {
        this.waveNumber = 1; 
        this.movesUntilNextWave = 5; 
    }

    update() {
        // Game logic goes here
        if (!this.player.isMoving) {
            if (this.input.enabled) {
                this.skipTurnButton.setFrame(0);
            }
            this.turnText.setText(this.input.enabled ? 'Your turn' : 'Enemies turn');
        }
        // Update stat texts
        this.statTexts[0].setText(`${this.player.hp}`);
        this.statTexts[1].setText(`${this.player.attackCount}`);
        this.statTexts[2].setText(`${this.player.damage}`);
        this.statTexts[3].setText(`${this.player.range}`);
        this.statTexts[4].setText(`${this.player.speed}`);
        this.statTexts[5].setText(`${this.player.experience}`);
    }

    spawnEnemies() {
        const newEnemies = getWaveEnemies(this.waveNumber, this, this.difficulty);

        newEnemies.forEach((enemy, index) => {
            this.time.delayedCall(index * 100, () => {
                enemy.spawn();
                this.enemies.push(enemy);
                console.log(enemy);
            });
        });
        this.enemies.sort((a, b) => b.damage - a.damage);
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
            this.changeRandomTileToMagical();
        }
    }

    calculateMovesUntilNextWave(waveNumber) {
        return Math.floor(6 + Math.pow(waveNumber, 1.25));
    }

    changeRandomTileToMagical() {
        const nonMagicalTiles = this.tiles.filter(tile => tile.type !== 4 && tile !== this.player.tileOn);
        if (nonMagicalTiles.length > 0) {
            const randomTile = nonMagicalTiles[Math.floor(Math.random() * nonMagicalTiles.length)];
            randomTile.setProperties(4);
            this.tweens.add({
                targets: randomTile.sprite,
                alpha: 0,
                y: randomTile.sprite.y + 5,
                duration: 100,
                onComplete: () => {
                    randomTile.sprite.setTexture('magical');
                    this.tweens.add({
                        targets: randomTile.sprite,
                        alpha: 1,
                        y: randomTile.sprite.y - 5,
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
        this.input.enabled = true;
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

        this.player.experience = 0;
    }
}

export default GameScene;