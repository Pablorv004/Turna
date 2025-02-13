import { TILE_CONFIG } from './config.js';

class Player {
    constructor(scene) {
        this.scene = scene;
        this._damage = 5; // Default damage points
        this.tileOn = null; // Property to track the tile the player is standing on
        this._range = 1; // Default jump distance
        this.isMoving = false; // Flag to track if the player is moving
        this._attackCount = 1; // Counter to track the number of attacks
        this._hp = 10; // Player's health points
        this.lastDirection = 'down'; // Track the last direction the player walked
        this._experience = 0; // Player's experience points
        this._speed = 1; // Player's speed
    }

    set hp(value) {
        const diff = value - this._hp;
        this._hp = Math.max(value, 0); // Ensure HP does not go below 0
        this.updateStatText(0, diff);
        if (diff > 0) {
            this.scene.healthSprite.play('healthAdd');
            this.scene.healthSprite.once('animationcomplete', () => {
                this.scene.healthSprite.play('healthIdle');
            });
        }
    }

    get hp() {
        return this._hp;
    }

    set attackCount(value) {
        const diff = value - this._attackCount;
        this._attackCount = value;
        this.updateStatText(1, diff);
        if (diff > 0) {
            this.scene.staminaSprite.play('staminaAdd');
            this.scene.staminaSprite.once('animationcomplete', () => {
                this.scene.staminaSprite.play('staminaIdle');
            });
        }
    }

    get attackCount() {
        return this._attackCount;
    }

    set damage(value) {
        const diff = value - this._damage;
        this._damage = value;
        this.updateStatText(2, diff);
    }

    get damage() {
        return this._damage;
    }

    set range(value) {
        const diff = value - this._range;
        this._range = value;
        this.updateStatText(3, diff);
    }

    get range() {
        return this._range;
    }

    set speed(value) {
        const diff = value - this._speed;
        this._speed = value;
        this.updateStatText(4, diff);
    }

    get speed() {
        return this._speed;
    }

    set experience(value) {
        const diff = value - this._experience;
        this._experience = value;
        this.updateStatText(5, diff);
    }

    get experience() {
        return this._experience;
    }

    updateStatText(index, diff) {
        if (diff !== 0) {
            const sign = diff > 0 ? '+' : '';
            const font = diff > 0 ? 'numbers_green' : 'numbers_red';
            const statText = this.scene.statTexts[index];
            const indicator = this.scene.add.bitmapText(statText.x + 30, statText.y, font, `${sign}${diff}`, 24).setOrigin(0.5, 0.5);
            this.scene.tweens.add({
                targets: indicator,
                y: statText.y - 20,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    indicator.destroy();
                }
            });
        }
    }

    takeDamage(amount) {
        this.hp -= amount;
        console.log(`Player took ${amount} damage, ${this.hp} HP left`);

        const damageText = this.scene.add.bitmapText(this.scene.playerSprite.x, this.scene.playerSprite.y - 20, 'numbers_red', `-${amount}`, 24).setOrigin(0.5, 0.5);
        this.scene.tweens.add({
            targets: damageText,
            y: this.scene.playerSprite.y - 40,
            alpha: 0,
            duration: 1000,
            onComplete: () => {
                damageText.destroy();
            }
        });

        let hurtAnimation, deathAnimation;
        switch (this.lastDirection) {
            case 'down':
                hurtAnimation = 'hurtDown';
                deathAnimation = 'deathDown';
                break;
            case 'up':
                hurtAnimation = 'hurtUp';
                deathAnimation = 'deathUp';
                break;
            case 'left':
                hurtAnimation = 'hurtLeft';
                deathAnimation = 'deathLeft';
                break;
            case 'right':
                hurtAnimation = 'hurtRight';
                deathAnimation = 'deathRight';
                break;
        }

        if (this.hp > 0) {
            this.scene.playerSprite.play(hurtAnimation);
            this.scene.playerSprite.once('animationcomplete', () => {
                this.setIdleAnimation();
            });
        } else {
            this.scene.playerSprite.play(deathAnimation);
            this.scene.playerSprite.once('animationcomplete', () => {
                this.scene.gameOver();
            });
        }
    }

    moveToTile(tile) {
        if (this.isMoving) return;

        if (!this.tileOn) {
            this.tileOn = tile;
            this.scene.playerSprite.setPosition(tile.x + 2, tile.y + this.scene.tileOffset);
            this.setIdleAnimation();
            console.log(`Player moved to ${tile.type} tile`);
            return;
        }

        const dx = tile.x - this.tileOn.x;
        const dy = tile.y - this.tileOn.y;

        if (Math.abs(dy) > Math.abs(dx)) {
            if (dy > 0) {
                this.scene.playerSprite.play('walkDown');
                this.lastDirection = 'down';
            } else {
                this.scene.playerSprite.play('walkUp');
                this.lastDirection = 'up';
            }
        } else {
            if (dx > 0) {
                this.scene.playerSprite.play('walkRight');
                this.lastDirection = 'right';
            } else {
                this.scene.playerSprite.play('walkLeft');
                this.lastDirection = 'left';
            }
        }

        this.isMoving = true;
        this.scene.input.enabled = false; 

        this.scene.tweens.add({
            targets: this.scene.playerSprite,
            x: tile.x + 2,
            y: tile.y + this.scene.tileOffset,
            duration: 500,
            onComplete: () => {
                this.setIdleAnimation();
                this.tileOn = tile;
                this.isMoving = false; 
                this.attackCount = 1; 
                this.scene.input.enabled = true;
                console.log(`Player moved to ${tile.type} tile`);
                this.scene.events.emit('playerMove');
                this.scene.enemies.forEach(enemy => enemy.moveTowardsPlayer(this.scene.player.tileOn, this.scene.tiles));
                this.tileOn.effect();
            }
        });
        
    }

    setIdleAnimation() {
        switch (this.lastDirection) {
            case 'down':
                this.scene.playerSprite.play('idleDown');
                break;
            case 'up':
                this.scene.playerSprite.play('idleUp');
                break;
            case 'left':
                this.scene.playerSprite.play('idleLeft');
                break;
            case 'right':
                this.scene.playerSprite.play('idleRight');
                break;
        }
    }

    attackTile(tile) {
        if (this.isMoving || this.attackCount < 1) return;
        if(!this.canInteractWithTile(tile, this.scene.tiles)) return;
        const dx = tile.x - this.tileOn.x;
        const dy = tile.y - this.tileOn.y;

        if (Math.abs(dy) > Math.abs(dx)) {
            if (dy > 0) {
                this.scene.playerSprite.play('attackDown');
                this.lastDirection = 'down';
            } else {
                this.scene.playerSprite.play('attackUp');
                this.lastDirection = 'up';
            }
        } else {
            if (dx > 0) {
                this.scene.playerSprite.play('attackRight');
                this.lastDirection = 'right';
            } else {
                this.scene.playerSprite.play('attackLeft');
                this.lastDirection = 'left';
            }
        }

        this.isMoving = true;

        this.scene.time.delayedCall(400, () => {
            const enemies = this.scene.enemies.filter(enemy => enemy.tileOn === tile);
            enemies.forEach(enemy => {
                enemy.takeDamage(this.damage);
            });
        });

        this.scene.playerSprite.once('animationcomplete', () => {
            this.setIdleAnimation();
            this.isMoving = false;
            this.attackCount--;

            
            const canMove = this.scene.tiles.some(tile => this.canInteractWithTile(tile, this.scene.tiles));
            if (!canMove) {
                this.scene.events.emit('playerMove');
            }
        });
    }

    canInteractWithTile(tile, tiles) {
        if (!this.tileOn) return true;

        const xoffset = TILE_CONFIG.xoffset;
        const yoffset = TILE_CONFIG.yoffset;

        const visited = new Set();
        const queue = [{ x: this.tileOn.x, y: this.tileOn.y, distance: 0 }];

        while (queue.length > 0) {
            const { x, y, distance } = queue.shift();
            if (distance > this.range) continue;

            if (x === tile.x && y === tile.y) return true;

            const neighbors = [
                { x: x + xoffset, y: y },
                { x: x - xoffset, y: y },
                { x: x + xoffset / 2, y: y + yoffset },
                { x: x - xoffset / 2, y: y + yoffset },
                { x: x + xoffset / 2, y: y - yoffset },
                { x: x - xoffset / 2, y: y - yoffset }
            ];

            for (const neighbor of neighbors) {
                const key = `${neighbor.x},${neighbor.y}`;
                if (!visited.has(key) && tiles.some(t => t.x === neighbor.x && t.y === neighbor.y)) {
                    visited.add(key);
                    queue.push({ x: neighbor.x, y: neighbor.y, distance: distance + 1 });
                }
            }
        }

        return false;
    }
}

export default Player;
