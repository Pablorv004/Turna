class Player {
    constructor(scene) {
        this.scene = scene;
        this.damage = 5;
        this.wisdom = 1;
        this.tileOn = null; // Property to track the tile the player is standing on
        this.range = 1; // Default jump distance
        this.isMoving = false; // Flag to track if the player is moving
        this.attackCount = 0; // Counter to track the number of attacks
        this.hp = 1; // Player's health points
        this.lastDirection = 'down'; // Track the last direction the player walked
    }

    takeDamage(amount) {
        this.hp -= amount;
        console.log(`Player took ${amount} damage, ${this.hp} HP left`);

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
        if (this.isMoving) return; // Do nothing if the player is already moving

        if (!this.tileOn) {
            this.tileOn = tile;
            this.scene.playerSprite.setPosition(tile.x + 2, tile.y + tileOffset);
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

        this.isMoving = true; // Set the moving flag to true
        this.scene.input.enabled = false; // Disable input

        this.scene.tweens.add({
            targets: this.scene.playerSprite,
            x: tile.x + 2,
            y: tile.y + tileOffset,
            duration: 500,
            onComplete: () => {
                this.setIdleAnimation();
                this.tileOn = tile;
                this.isMoving = false; // Reset the moving flag
                this.attackCount = 0; // Reset the attack counter
                this.scene.input.enabled = true; // Enable input
                console.log(`Player moved to ${tile.type} tile`);
                this.scene.enemies.forEach(enemy => enemy.moveTowardsPlayer(this.scene.player.tileOn, this.scene.tiles));
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
        if (this.isMoving || this.attackCount > 0) return; // Do nothing if the player is already moving or has attacked

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

        this.isMoving = true; // Set the moving flag to true
        this.scene.input.enabled = false; // Disable input

        this.scene.time.delayedCall(400, () => {
            const enemy = this.scene.enemies.find(enemy => enemy.tileOn === tile);
            if (enemy) {
                enemy.takeDamage(this.damage);
            }
        });

        this.scene.playerSprite.once('animationcomplete', () => {
            this.setIdleAnimation();
            this.isMoving = false; // Reset the moving flag
            this.attackCount++; // Increment the attack counter
        });
    }

    canMoveToTile(tile, tiles) {
        if (!this.tileOn) return true; // Allow initial move

        const xoffset = 65;
        const yoffset = 54;

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
