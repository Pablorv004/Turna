class Enemy {
    constructor(scene, tiles, textures) {
        this.scene = scene;
        this.tiles = tiles;
        this.textures = textures;
        this.hp = textures.hp;
        this.damage = textures.damage;
        this.range = textures.range;
        this.tileOn = null;
        this.previousTile = null;
        this.jumpDistance = textures.jumpDistance;
        this.isMovingToTile = null;
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
            this.sprite = this.scene.add.sprite(spawnTile.x, spawnTile.y + tileOffset + 10, this.textures.idleFront);
            this.sprite.setScale(2);
            this.sprite.play(this.textures.idleFront);
            this.sprite.setDepth(1);
        } else {
            console.error('No valid spawn location for enemy');
        }
    }

    moveToTile(tile) {
        this.previousTile = this.tileOn;
        this.tileOn = tile;
        console.log(`Enemy moved to ${tile.type} tile`);
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
                                walkAnimation = this.textures.walkDown;
                                idleAnimation = this.textures.idleFront;
                            } else {
                                walkAnimation = this.textures.walkUp;
                                idleAnimation = this.textures.idleBack;
                            }
                        } else {
                            if (dx > 0) {
                                walkAnimation = this.textures.walkRight;
                                idleAnimation = this.textures.idleRight;
                            } else {
                                walkAnimation = this.textures.walkLeft;
                                idleAnimation = this.textures.idleLeft;
                            }
                        }

                        this.sprite.play(walkAnimation);
                        this.isMovingToTile = targetTile;

                        this.scene.input.enabled = false;

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
                                this.isMovingToTile = null;
                                this.scene.input.enabled = true;
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
                attackAnimation = this.textures.attackDown;
            } else {
                attackAnimation = this.textures.attackUp;
            }
        } else {
            if (dx > 0) {
                attackAnimation = this.textures.attackRight;
            } else {
                attackAnimation = this.textures.attackLeft;
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
                    walkBackAnimation = this.textures.walkUp;
                    idleAnimation = this.textures.idleFront;
                } else {
                    walkBackAnimation = this.textures.walkDown;
                    idleAnimation = this.textures.idleBack;
                }
            } else {
                if (dx > 0) {
                    walkBackAnimation = this.textures.walkLeft;
                    idleAnimation = this.textures.idleRight;
                } else {
                    walkBackAnimation = this.textures.walkRight;
                    idleAnimation = this.textures.idleLeft;
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
                this.scene.input.enabled = true;
                return;
            }

            const dx = this.previousTile.x - this.tileOn.x;
            const dy = this.previousTile.y - this.tileOn.y;

            let hurtAnimation, idleAnimation;
            if (Math.abs(dy) > Math.abs(dx)) {
                if (dy > 0) {
                    hurtAnimation = this.textures.hurtDown;
                    idleAnimation = this.textures.idleFront;
                } else {
                    hurtAnimation = this.textures.hurtUp;
                    idleAnimation = this.textures.idleBack;
                }
            } else {
                if (dx > 0) {
                    hurtAnimation = this.textures.hurtRight;
                    idleAnimation = this.textures.idleRight;
                } else {
                    hurtAnimation = this.textures.hurtLeft;
                    idleAnimation = this.textures.idleLeft;
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
                    this.scene.input.enabled = true;
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
                deathAnimation = this.textures.deathDown;
            } else {
                deathAnimation = this.textures.deathUp;
            }
        } else {
            if (dx > 0) {
                deathAnimation = this.textures.deathRight;
            } else {
                deathAnimation = this.textures.deathLeft;
            }
        }

        this.scene.input.enabled = false;

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
