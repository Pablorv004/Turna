class Tile {
    constructor(scene, x, y, type) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.type = type;
        this.sprite = this.scene.add.sprite(x, y, this.getTexture(type));
        this.decorations = []; // Initialize decorations array
        this.setProperties(type);
        this.sprite.setInteractive();
        this.sprite.on('pointerdown', () => this.applyEffect());
        this.spawnRandomDecoration();
    }

    getTexture(type) {
        switch (type) {
            case 0: return 'grass';
            case 1: return 'frozen';
            case 2: return 'onFire';
            case 3: return 'obstructed';
            case 4: return 'magical';
            case 5: return 'rock';
            case 6: return 'sandy';
            case 7: return 'water';
            case 8: return 'dirt';
            default: return 'grass';
        }
    }

    setProperties(type) {
        this.type = type;
        this.removeDecorations();
        switch (type) {
            case 0: this.effect = () => console.log('Grass tile'); break;
            case 1: this.effect = () => console.log('Frozen tile'); break;
            case 2: this.effect = () => console.log('On fire tile'); break;
            case 3: this.effect = () => console.log('Obstructed tile'); break;
            case 4:
                this.effect = () => {
                    console.log('Magical tile');
                    this.scene.player.damage += 3;
                    this.scene.tweens.add({
                        targets: this.sprite,
                        alpha: 0,
                        y: this.sprite.y + 5,
                        duration: 100,
                        onComplete: () => {
                            this.setProperties(0); // Revert to grass tile
                            this.sprite.setTexture('grass');
                            this.scene.tweens.add({
                                targets: this.sprite,
                                alpha: 1,
                                y: this.sprite.y - 5,
                                duration: 100,
                                onComplete: () => {
                                    this.showBuffIndicators();
                                }
                            });
                        }
                    });
                };
                break;
            case 5: this.effect = () => console.log('Rock tile'); break;
            case 6: this.effect = () => console.log('Sandy tile'); break;
            case 7: this.effect = () => console.log('Water tile'); break;
            case 8: this.effect = () => console.log('Dirt tile'); break;
            default: this.effect = () => console.log('Grass tile'); break;
        }
        this.spawnRandomDecoration();
    }

    showBuffIndicators() {
        const playerSprite = this.scene.playerSprite;
        const offsets = [
            { x: 0, y: 10 },
            { x: -20, y: 20 },
            { x: 20, y: 20 }
        ];

        offsets.forEach(offset => {
            const indicator = this.scene.add.bitmapText(
                playerSprite.x + offset.x,
                playerSprite.y + offset.y,
                'numbers_red',
                '+',
                24
            ).setOrigin(0.5, 0.5);

            this.scene.tweens.add({
                targets: indicator,
                y: indicator.y - 10,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    indicator.destroy();
                }
            });
        });
    }

    applyEffect() {
        if (this.scene.player.isMoving) return; // Do nothing if the player is moving

        if (this.scene.player.tileOn === this) return; // Do nothing if the player is already on this tile

        const enemy = this.scene.enemies.find(enemy => enemy.tileOn === this);
        if (enemy) {
            this.scene.player.attackTile(this);
            return;
        }

        if (this.scene.player.canInteractWithTile(this, this.scene.tiles)) {
            this.effect();
            this.scene.player.moveToTile(this);
        } else {
            console.log('Cannot move to this tile');
        }
    }

    removeDecorations() {
        this.decorations.forEach(decoration => decoration.destroy());
        this.decorations = [];
    }

    spawnRandomDecoration() {
        if (Math.random() < 0.5) { // 50% chance to spawn decorations
            const decorations = this.getDecorationsForType(this.type);
            const numDecorations = Phaser.Math.Between(0, 2); // Randomly choose between 1 and 2 decorations
            for (let i = 0; i < numDecorations; i++) {
                const decoration = decorations[Phaser.Math.Between(0, decorations.length - 1)];
                const offsetX = Phaser.Math.Between(-10, 10);
                const offsetY = Phaser.Math.Between(-8, 8);
                const sprite = this.scene.add.sprite(this.x + offsetX, this.y + offsetY, decoration);
                sprite.setDepth(0); // Ensure decoration is below the player and enemies
                this.decorations.push(sprite);
                if (decoration.startsWith('wave')) {
                    this.scene.tweens.add({
                        targets: sprite,
                        alpha: { from: 1, to: 0.5 },
                        yoyo: true,
                        repeat: -1,
                        duration: 1000
                    });
                }
            }
        }
    }

    getDecorationsForType(type) {
        switch (type) {
            case 0: return ['bushGrass', 'hillGrass', 'flowerBlue', 'flowerGreen', 'flowerRed', 'flowerWhite', 'flowerYellow'];
            case 1: return ['bushSnow', 'hillSnow'];
            case 2: return ['waveLava'];
            case 4: return ['bushMagic', 'hillMagic'];
            case 7: return ['waveWater'];
            default: return [];
        }
    }
}

export default Tile;
