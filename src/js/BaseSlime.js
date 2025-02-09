class BaseSlime extends Enemy {
    constructor(scene, tiles) {
        super(15, 1, 1, 1);
        this.scene = scene;
        this.tiles = tiles;
        this.sprite = null;
        this.spawn();
    }

    spawn() {
        const validTiles = this.tiles.filter(tile => {
            const dx = Math.abs(tile.x - this.scene.player.tileOn.x);
            const dy = Math.abs(tile.y - this.scene.player.tileOn.y);
            const xoffset = 65;
            const yoffset = 54;
            const isTileOccupied = this.scene.enemies.some(enemy => enemy.tileOn === tile);
            return (dx > 3 * xoffset || dy > 3 * yoffset) && !isTileOccupied;
        });

        if (validTiles.length > 0) {
            const spawnTile = validTiles[Math.floor(Math.random() * validTiles.length)];
            this.moveToTile(spawnTile);
            this.sprite = this.scene.add.sprite(spawnTile.x, spawnTile.y + tileOffset + 10, 'slimeIdleFront');
            this.sprite.setScale(2); // Scale the slime sprite upwards
            this.sprite.play('slimeIdleFront');
            this.sprite.setDepth(1); // Ensure slime sprite is above the tiles
        } else {
            console.error('No valid spawn location for BaseSlime');
        }
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

        let attackAnimation;
        const dx = player.tileOn.x - this.tileOn.x;
        const dy = player.tileOn.y - this.tileOn.y;

        if (Math.abs(dy) > Math.abs(dx)) {
            if (dy > 0) {
                attackAnimation = 'slimeAttackDown';
            } else {
                attackAnimation = 'slimeAttackUp';
            }
        } else {
            if (dx > 0) {
                attackAnimation = 'slimeAttackRight';
            } else {
                attackAnimation = 'slimeAttackLeft';
            }
        }

        this.sprite.play(attackAnimation);

        this.scene.time.delayedCall(650, () => {
            player.takeDamage(this.damage);
        });

        this.sprite.once('animationcomplete', () => {
            let walkBackAnimation, idleAnimation;
            if (Math.abs(dy) > Math.abs(dx)) {
                if (dy > 0) {
                    walkBackAnimation = 'slimeWalkUp';
                    idleAnimation = 'slimeIdleFront';
                } else {
                    walkBackAnimation = 'slimeWalkDown';
                    idleAnimation = 'slimeIdleBack';
                }
            } else {
                if (dx > 0) {
                    walkBackAnimation = 'slimeWalkLeft';
                    idleAnimation = 'slimeIdleRight';
                } else {
                    walkBackAnimation = 'slimeWalkRight';
                    idleAnimation = 'slimeIdleLeft';
                }
            }

            this.sprite.play(walkBackAnimation);

            this.scene.tweens.add({
                targets: this.sprite,
                x: this.tileOn.x,
                y: this.tileOn.y + tileOffset,
                duration: 500,
                onComplete: () => {
                    this.sprite.play(idleAnimation);
                }
            });
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
                    this.scene.input.enabled = true; // Enable input
                }
            });
        }
    }

    kill() {
        console.log('Enemy killed');
        const dx = this.scene.player.tileOn.x - this.tileOn.x;
        const dy = this.scene.player.tileOn.y - this.tileOn.y;

        let deathAnimation;
        if (Math.abs(dy) > Math.abs(dx)) {
            if (dy > 0) {
                deathAnimation = 'slimeDeathDown';
            } else {
                deathAnimation = 'slimeDeathUp';
            }
        } else {
            if (dx > 0) {
                deathAnimation = 'slimeDeathRight';
            } else {
                deathAnimation = 'slimeDeathLeft';
            }
        }

        this.scene.input.enabled = false; // Disable input

        this.sprite.play(deathAnimation);
        this.sprite.once('animationcomplete', () => {
            this.scene.tweens.add({
                targets: this.sprite,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    this.sprite.destroy();
                    this.scene.enemies = this.scene.enemies.filter(enemy => enemy !== this);
                    this.scene.input.enabled = true; 
                }
            });
        });
    }
}
