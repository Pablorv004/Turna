class Tile {
    constructor(scene, x, y, type) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.type = type;
        this.sprite = this.scene.add.sprite(x, y, this.getTexture(type));
        this.setProperties(type);
        this.sprite.setInteractive();
        this.sprite.on('pointerdown', () => this.applyEffect());
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
                        duration: 100,
                        yoyo: true,
                        onComplete: () => {
                            this.setProperties(0); // Revert to grass tile
                            this.sprite.setTexture('grass');
                            this.scene.tweens.add({
                                targets: this.sprite,
                                alpha: 1,
                                duration: 100
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
}

export default Tile;
