import { TILE_CONFIG } from './config.js';

class Enemy {
    constructor(scene, tiles, textures) {
        this.scene = scene;
        this.tiles = tiles;
        this.textures = textures;
        this.hp = textures.hp;
        this.damage = textures.damage;
        this.range = textures.range;
        this.tileOn = null;
        this.jumpDistance = textures.jumpDistance;
        this.isMovingToTile = null;
        this.sprite = null;
        this.experienceDropped = textures.experienceDropped;
    }

    spawn() {
        const validTiles = this.tiles.filter(tile => {
            const dx = Math.abs(tile.x - this.scene.player.tileOn.x);
            const dy = Math.abs(tile.y - this.scene.player.tileOn.y);
            const xoffset = TILE_CONFIG.xoffset;
            const yoffset = TILE_CONFIG.yoffset;
            const isTileOccupied = this.scene.enemies.some(enemy => enemy.tileOn === tile);
            return (dx > 1.5 * xoffset || dy > 1.5 * yoffset) && !isTileOccupied;
        });

        if (validTiles.length > 0) {
            const spawnTile = validTiles[Math.floor(Math.random() * validTiles.length)];
            this.sprite = this.scene.add.sprite(spawnTile.x, spawnTile.y + this.scene.tileOffset + 10, this.textures.idleFront);
            this.moveToTile(spawnTile);
            this.tileOn = spawnTile;
            this.sprite.setScale(2);
            this.sprite.play(this.textures.idleFront);
            this.sprite.setDepth(1);
            this.sprite.alpha = 0;

            this.scene.tweens.add({
                targets: this.sprite,
                alpha: 1,
                duration: 1000
            });
        } else {
            console.error('No valid spawn location for enemy');
        }
    }

    moveToTile(tile) {
        this.tileOn = tile;
        const occupyingEnemies = this.scene.enemies.filter(enemy => enemy.tileOn === tile);
        if (occupyingEnemies.length > 1) {
            const offset = 5 * (occupyingEnemies.length - 1);
            this.sprite.setPosition(tile.x + offset, tile.y + this.scene.tileOffset + offset);
        } else {
            this.sprite.setPosition(tile.x, tile.y + this.scene.tileOffset);
        }
        console.log(`Enemy moved to ${tile.type} tile`);
    }

    moveTowardsPlayer(playerTile, tiles) {
        if (this.hp <= 0) return;
        const xoffset = TILE_CONFIG.xoffset;
        const yoffset = TILE_CONFIG.yoffset;

        const visited = new Set();
        const queue = [{ x: this.tileOn.x, y: this.tileOn.y, path: [] }];

        while (queue.length > 0) {
            const { x, y, path } = queue.shift();

            if (x === playerTile.x && y === playerTile.y) {
                const nextMove = path[0];
                if (nextMove) {
                    const targetTile = tiles.find(t => t.x === nextMove.x && t.y === nextMove.y);
                    if (targetTile) {
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
                            y: targetTile.y + this.scene.tileOffset,
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

        this.scene.time.delayedCall(600, () => {
            player.takeDamage(this.damage);
        });

        this.sprite.once('animationcomplete', () => {
            if (this.hp > 0) {
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
                    y: this.tileOn.y + this.scene.tileOffset,
                    duration: 500,
                    onComplete: () => {
                        this.sprite.play(idleAnimation);
                    }
                });
            }
        });
    }

    takeDamage(amount) {
        if (this.hp <= 0) return;
        this.hp -= amount;
        console.log(`Enemy took ${amount} damage, ${this.hp} HP left`);

        // Display damage indicator
        const damageText = this.scene.add.bitmapText(this.sprite.x, this.sprite.y - 20, 'numbers_red', `-${amount}`, 24).setOrigin(0.5, 0.5);
        this.scene.tweens.add({
            targets: damageText,
            y: this.sprite.y - 40,
            alpha: 0,
            duration: 1000,
            onComplete: () => {
                damageText.destroy();
            }
        });

        if (this.hp <= 0) {
            this.kill();
        } else {
            this.hurt();
        }
        this.knockback();
    }

    hurt() {
        const playerTile = this.scene.player.tileOn;
        const dx = this.tileOn.x - playerTile.x;
        const dy = this.tileOn.y - playerTile.y;

        const getHurtAnimation = (dx, dy) => {
            if (Math.abs(dy) > Math.abs(dx)) {
                return dy > 0 ? this.textures.hurtDown : this.textures.hurtUp;
            } else {
                return dx > 0 ? this.textures.hurtRight : this.textures.hurtLeft;
            }
        };

        this.sprite.play(getHurtAnimation(dx, dy));
    }

    knockback() {
        const playerTile = this.scene.player.tileOn;
        const dx = this.tileOn.x - playerTile.x;
        const dy = this.tileOn.y - playerTile.y;

        const behindTileX = this.tileOn.x + dx;
        const behindTileY = this.tileOn.y + dy;

        const behindTile = this.tiles.find(tile => tile.x === behindTileX && tile.y === behindTileY);

        if (behindTile) {
            const occupyingEnemies = this.scene.enemies.filter(enemy => enemy.tileOn === behindTile);

            if (occupyingEnemies.length > 0) {
                const halfDamage = Math.floor(this.scene.player.damage / 2);
                const enemiesToDamage = [this, ...occupyingEnemies];

                this.scene.tweens.add({
                    targets: this.sprite,
                    x: behindTile.x,
                    y: behindTile.y + this.scene.tileOffset,
                    duration: 500,
                    onComplete: () => {
                        this.moveToTile(behindTile);
                        if (this.hp > 0) {
                            this.sprite.play(this.textures.idleFront);
                        }
                        this.scene.input.enabled = true;

                        enemiesToDamage.forEach(enemy => {
                            if (enemy.hp > 0) {
                                enemy.hp -= halfDamage;
                                console.log(`Enemy took ${halfDamage} damage, ${enemy.hp} HP left`);

                                const damageText = this.scene.add.bitmapText(enemy.sprite.x, enemy.sprite.y - 20, 'numbers_red', `-${halfDamage}`, 24).setOrigin(0.5, 0.5);
                                this.scene.tweens.add({
                                    targets: damageText,
                                    y: enemy.sprite.y - 40,
                                    alpha: 0,
                                    duration: 1000,
                                    onComplete: () => {
                                        damageText.destroy();
                                    }
                                });

                                if (enemy.hp <= 0) {
                                    enemy.kill();
                                } else {
                                    enemy.hurt();
                                    enemy.sprite.once('animationcomplete', () => {
                                        if (enemy.hp > 0) {
                                            enemy.sprite.play(enemy.textures.idleFront);
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            } else {
                this.scene.tweens.add({
                    targets: this.sprite,
                    x: behindTile.x,
                    y: behindTile.y + this.scene.tileOffset,
                    duration: 500,
                    onComplete: () => {
                        this.moveToTile(behindTile);
                        if (this.hp > 0) {
                            this.sprite.play(this.textures.idleFront);
                        }
                        this.scene.input.enabled = true;
                    }
                });
            }
        } else {
            console.log('No tile behind to knockback to');
            this.scene.input.enabled = true;
            this.sprite.once('animationcomplete', () => {
                if (this.hp > 0) {
                    this.sprite.play(this.textures.idleFront);
                }
            });
        }
    }

    kill() {
        if (this.hp > 0) return;

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

        this.scene.input.enabled = true;
        this.sprite.play(deathAnimation);
        this.sprite.once('animationcomplete', () => {
            this.scene.tweens.add({
                targets: this.sprite,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    this.sprite.destroy();
                    this.scene.enemies = this.scene.enemies.filter(enemy => enemy !== this);
                    this.scene.player.experience += this.experienceDropped;
                    
                }
            });
        });
    }
}

export default Enemy;
