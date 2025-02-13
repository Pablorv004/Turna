class ManualScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ManualScene' });
    }

    create() {
        // Create overlay
        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x000000, 0.4);
        this.overlay.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.overlay.setDepth(1); // Set depth

        // Create manual animation
        this.manualSprite = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'manual_open').setScale(5);
        this.manualSprite.play('manual_open');
        this.manualSprite.setDepth(2); // Set depth

        // Create close button after manual animation is complete
        this.manualSprite.on('animationcomplete', () => {
            this.createCloseButton();
            this.createSlimeIcons();
            this.createTileIcons();
        });
    }

    createCloseButton() {
        // Create close button
        this.closeButton = this.add.text(this.sys.game.config.width / 2 + 260, this.sys.game.config.height / 2 - 150, '           ', { fontSize: '32px', fill: '#fff' }).setInteractive();
        this.closeButton.setDepth(3); // Set depth
        this.closeButton.setPadding({ left: 20, right: 20 }); // Make button wider
        this.closeButton.on('pointerdown', () => {
            this.closeManual();
        });
    }

    createSlimeIcons() {
        const slimes = [
            { key: 'slimeIdle', animation: 'slimeIdleFront', description: 'Base Slime\nDamage: 1\nHealth: 10\nRange: 1' },
            { key: 'magmaSlimeIdle', animation: 'magmaSlimeIdleFront', description: 'Magma Slime\nDamage: 2\nHealth: 20\nRange: 1' },
            { key: 'skullSlimeIdle', animation: 'skullSlimeIdleFront', description: 'Skull Slime\nDamage: 100\nHealth: 15\nRange: 1' }
        ];

        this.slimeIcons = [];
        var row = 1;
        var rowNum = 0;
        slimes.forEach((slime, index) => {
            if(index % 3=== 0){
                row = row + 1;
                rowNum = 0;
            }
            const icon = this.add.sprite(415 + rowNum * 71, 248 + row * 55, slime.key).setScale(1.5).setInteractive();
            rowNum = rowNum + 1;
            icon.play(slime.animation);
            icon.setDepth(3); // Set depth
            icon.on('pointerdown', () => {
                this.showSlimeDescription(slime);
            });
            this.slimeIcons.push(icon);
        });
    }

    createTileIcons() {
        const tiles = [
            { key: 'grass', image: 'grass', description: 'Grass Tile\nNo effect' },
            { key: 'frozen', image: 'frozen', description: 'Frozen Tile\nMakes any entity \nslide.' },
            { key: 'onFire', image: 'onFire', description: 'Lava Tile\nDamages \nany entity.' },
            { key: 'obstructed', image: 'obstructed', description: 'Obstructed Tile\nNo effect yet.' },
            { key: 'magical', image: 'magical', description: 'Magical Tile\nIncreases \nplayer damage.\nSpawns randomly.' },
            { key: 'rock', image: 'rock', description: 'Rock Tile\nNo effect yet.' },
            { key: 'sandy', image: 'sandy', description: 'Sandy Tile\nNo effect yet.' },
            { key: 'water', image: 'water', description: 'Water Tile\nNo effect yet.' },
            { key: 'dirt', image: 'dirt', description: 'Dirt Tile\nNo effect yet.' }
        ];

        this.tileIcons = [];
        var row = 1;
        var rowNum = 0;
        tiles.forEach((tile, index) => {
            if(index % 3=== 0){
                row = row + 1;
                rowNum = 0;
            }
            rowNum = rowNum + 1;
            const icon = this.add.image(620 + rowNum * 71, 245 + row * 55, tile.key).setScale(0.4).setInteractive();
            icon.setDepth(3); // Set depth
            icon.on('pointerdown', () => {
                this.showTileDescription(tile);
            });
            this.tileIcons.push(icon);
        });
    }

    showSlimeDescription(slime) {
        if (this.descriptionText) {
            this.descriptionText.destroy();
        }
        if (this.selectedEnemy) {
            this.selectedEnemy.destroy();
        }
        this.descriptionText = this.add.bitmapText(this.sys.game.config.width / 2 - 180, this.sys.game.config.height / 2 - 115, 'pixelfont', slime.description, 18);
        this.descriptionText.setOrigin(0.5);
        this.descriptionText.setDepth(3); // Set depth

        this.selectedEnemy = this.add.sprite(this.sys.game.config.width / 2 - 67, this.sys.game.config.height / 2 - 117, slime.key).setScale(2);
        this.selectedEnemy.play(slime.animation);
        this.selectedEnemy.setDepth(4); // Set depth
    }

    showTileDescription(tile) {
        if (this.tileDescriptionText) {
            this.tileDescriptionText.destroy();
        }
        if (this.selectedTile) {
            this.selectedTile.destroy();
        }
        this.tileDescriptionText = this.add.bitmapText(this.sys.game.config.width / 2 + 180, this.sys.game.config.height / 2 - 115, 'pixelfont', tile.description, 14);
        this.tileDescriptionText.setOrigin(0.5);
        this.tileDescriptionText.setDepth(3); // Set depth

        this.selectedTile = this.add.image(this.sys.game.config.width / 2 + 68, this.sys.game.config.height / 2 - 125, tile.image).setScale(0.6);
        this.selectedTile.setDepth(4); // Set depth
    }

    closeManual() {
        if (this.descriptionText) {
            this.descriptionText.destroy();
        }
        if (this.selectedEnemy) {
            this.selectedEnemy.destroy();
        }
        if (this.tileDescriptionText) {
            this.tileDescriptionText.destroy();
        }
        if (this.selectedTile) {
            this.selectedTile.destroy();
        }
        this.slimeIcons.forEach(icon => icon.destroy());
        this.tileIcons.forEach(icon => icon.destroy());
        this.manualSprite.anims.playReverse('manual_open'); // Play reverse animation
        this.manualSprite.on('animationcomplete', () => {
            this.overlay.destroy();
            this.manualSprite.destroy();
            this.closeButton.destroy();
            
            this.scene.stop(); // Stop the manual scene
            this.scene.resume('GameScene'); // Resume the game scene
        });
    }
}

export default ManualScene;
