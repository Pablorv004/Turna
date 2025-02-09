class Enemy {
    constructor(hp, damage, range, jumpDistance) {
        this.hp = hp;
        this.damage = damage;
        this.range = range;
        this.tileOn = null; // Property to track the tile the enemy is standing on
        this.previousTile = null; // Property to track the previous tile the enemy was on
        this.jumpDistance = jumpDistance; // Default jump distance
        this.isMovingToTile = null; // Property to track the tile the enemy is moving to
    }

    moveToTile(tile) {
        this.previousTile = this.tileOn;
        this.tileOn = tile;
        console.log(`Enemy moved to ${tile.type} tile`);
    }

    canMoveToTile(tile, tiles) {
        if (!this.tileOn) return true; // Allow initial move

        const xoffset = 65;
        const yoffset = 54;

        const visited = new Set();
        const queue = [{ x: this.tileOn.x, y: this.tileOn.y, distance: 0 }];

        while (queue.length > 0) {
            const { x, y, distance } = queue.shift();
            if (distance > this.jumpDistance) continue;

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

    moveTowardsPlayer(playerTile, tiles) {
        const xoffset = 65;
        const yoffset = 54;

        const visited = new Set();
        const queue = [{ x: this.tileOn.x, y: this.tileOn.y, path: [] }];

        while (queue.length > 0) {
            const { x, y, path } = queue.shift();

            if (x === playerTile.x && y === playerTile.y) {
                const nextMove = path[0];
                if (nextMove) {
                    const targetTile = tiles.find(t => t.x === nextMove.x && t.y === nextMove.y);
                    const isTileOccupied = this.scene.enemies.some(enemy => enemy.tileOn === targetTile || enemy.isMovingToTile === targetTile);
                    if (targetTile && !isTileOccupied) {
                        const dx = targetTile.x - this.tileOn.x;
                        const dy = targetTile.y - this.tileOn.y;

                        let walkAnimation, idleAnimation;
                        if (Math.abs(dy) > Math.abs(dx)) {
                            if (dy > 0) {
                                walkAnimation = 'slimeWalkDown';
                                idleAnimation = 'slimeIdleFront';
                            } else {
                                walkAnimation = 'slimeWalkUp';
                                idleAnimation = 'slimeIdleBack';
                            }
                        } else {
                            if (dx > 0) {
                                walkAnimation = 'slimeWalkRight';
                                idleAnimation = 'slimeIdleRight';
                            } else {
                                walkAnimation = 'slimeWalkLeft';
                                idleAnimation = 'slimeIdleLeft';
                            }
                        }

                        this.sprite.play(walkAnimation);
                        this.isMovingToTile = targetTile; // Mark the target tile as the destination

                        this.scene.input.enabled = false; // Disable input

                        this.scene.tweens.add({
                            targets: this.sprite,
                            x: targetTile.x,
                            y: targetTile.y + tileOffset,
                            duration: 500,
                            onComplete: () => {
                                this.sprite.play(idleAnimation);
                                if (targetTile === playerTile) {
                                    this.attackPlayer();
                                } else {
                                    this.moveToTile(targetTile);
                                }
                                this.isMovingToTile = null; // Clear the destination mark
                                this.scene.input.enabled = true; // Enable input
                            }
                        });
                    }
                }
                return;
            }

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
                    queue.push({ x: neighbor.x, y: neighbor.y, path: [...path, neighbor] });
                }
            }
        }
    }

    attackPlayer() {
        const player = this.scene.player;
        player.takeDamage(this.damage);

        this.scene.tweens.add({
            targets: this.sprite,
            x: this.tileOn.x,
            y: this.tileOn.y + tileOffset,
            duration: 500,
            onComplete: () => {
            }
        });
    }

    takeDamage(amount) {
        this.hp -= amount;
        console.log(`Enemy took ${amount} damage, ${this.hp} HP left`);
        if (this.hp <= 0) {
            this.kill();
        } else {
            this.knockback();
        }
    }

    knockback() {
        if (this.previousTile) {
            const isTileOccupied = this.scene.enemies.some(enemy => enemy.tileOn === this.previousTile);
            if (isTileOccupied) {
                console.log('Cannot knockback, tile is occupied');
                return;
            }

            const dx = this.previousTile.x - this.tileOn.x;
            const dy = this.previousTile.y - this.tileOn.y;

            let hurtAnimation, idleAnimation;
            if (Math.abs(dy) > Math.abs(dx)) {
                if (dy > 0) {
                    hurtAnimation = 'slimeHurtDown';
                    idleAnimation = 'slimeIdleFront';
                } else {
                    hurtAnimation = 'slimeHurtUp';
                    idleAnimation = 'slimeIdleBack';
                }
            } else {
                if (dx > 0) {
                    hurtAnimation = 'slimeHurtRight';
                    idleAnimation = 'slimeIdleRight';
                } else {
                    hurtAnimation = 'slimeHurtLeft';
                    idleAnimation = 'slimeIdleLeft';
                }
            }

            this.sprite.play(hurtAnimation);
            this.scene.tweens.add({
                targets: this.sprite,
                x: this.previousTile.x,
                y: this.previousTile.y + tileOffset,
                duration: 500,
                onComplete: () => {
                    this.moveToTile(this.previousTile);
                    this.sprite.play(idleAnimation);
                }
            });
        }
    }

    kill() {
        console.log('Enemy killed');
        this.sprite.destroy();
        this.scene.enemies = this.scene.enemies.filter(enemy => enemy !== this);
    }
}
