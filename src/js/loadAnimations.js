export function loadAnimations(scene) {

    scene.anims.create({
        key: 'healthIdle',
        frames: scene.anims.generateFrameNumbers('healthIdle', { start: 0, end: 1 }),
        frameRate: 2,
        repeat: -1
    });

    scene.anims.create({
        key: 'healthAdd',
        frames: scene.anims.generateFrameNumbers('healthAdd', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'staminaIdle',
        frames: scene.anims.generateFrameNumbers('staminaIdle', { start: 0, end: 1 }),
        frameRate: 2,
        repeat: -1
    });

    scene.anims.create({
        key: 'staminaAdd',
        frames: scene.anims.generateFrameNumbers('staminaAdd', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });
    
    scene.anims.create({
        key: 'idle',
        frames: scene.anims.generateFrameNumbers('playerIdle', { start: 0, end: scene.textures.get('playerIdle').frameTotal - 10 }),
        frameRate: 5, // Reduced frame rate
        repeat: -1,
        yoyo: true
    });

    scene.anims.create({
        key: 'idleDown',
        frames: scene.anims.generateFrameNumbers('playerIdle', { start: 0, end: 11 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'idleLeft',
        frames: scene.anims.generateFrameNumbers('playerIdle', { start: 12, end: 23 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'idleRight',
        frames: scene.anims.generateFrameNumbers('playerIdle', { start: 24, end: 35 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'idleUp',
        frames: scene.anims.generateFrameNumbers('playerIdle', { start: 36, end: 39 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'walkDown',
        frames: scene.anims.generateFrameNumbers('swordWalk', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'walkLeft',
        frames: scene.anims.generateFrameNumbers('swordWalk', { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'walkRight',
        frames: scene.anims.generateFrameNumbers('swordWalk', { start: 12, end: 17 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'walkUp',
        frames: scene.anims.generateFrameNumbers('swordWalk', { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'slimeWalkDown',
        frames: scene.anims.generateFrameNumbers('slimeWalk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'slimeWalkUp',
        frames: scene.anims.generateFrameNumbers('slimeWalk', { start: 8, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'slimeWalkLeft',
        frames: scene.anims.generateFrameNumbers('slimeWalk', { start: 16, end: 23 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'slimeWalkRight',
        frames: scene.anims.generateFrameNumbers('slimeWalk', { start: 24, end: 31 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'attackDown',
        frames: scene.anims.generateFrameNumbers('swordAttack', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'attackLeft',
        frames: scene.anims.generateFrameNumbers('swordAttack', { start: 8, end: 15 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'attackRight',
        frames: scene.anims.generateFrameNumbers('swordAttack', { start: 16, end: 23 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'attackUp',
        frames: scene.anims.generateFrameNumbers('swordAttack', { start: 24, end: 31 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'slimeDeathDown',
        frames: scene.anims.generateFrameNumbers('slimeDeath', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'slimeDeathUp',
        frames: scene.anims.generateFrameNumbers('slimeDeath', { start: 10, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'slimeDeathLeft',
        frames: scene.anims.generateFrameNumbers('slimeDeath', { start: 20, end: 29 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'slimeDeathRight',
        frames: scene.anims.generateFrameNumbers('slimeDeath', { start: 30, end: 39 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'slimeIdleFront',
        frames: scene.anims.generateFrameNumbers('slimeIdle', { start: 0, end: 5 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'slimeIdleBack',
        frames: scene.anims.generateFrameNumbers('slimeIdle', { start: 6, end: 11 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'slimeIdleLeft',
        frames: scene.anims.generateFrameNumbers('slimeIdle', { start: 12, end: 17 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'slimeIdleRight',
        frames: scene.anims.generateFrameNumbers('slimeIdle', { start: 18, end: 23 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'slimeHurtDown',
        frames: scene.anims.generateFrameNumbers('slimeHurt', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'slimeHurtUp',
        frames: scene.anims.generateFrameNumbers('slimeHurt', { start: 5, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'slimeHurtLeft',
        frames: scene.anims.generateFrameNumbers('slimeHurt', { start: 10, end: 14 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'slimeHurtRight',
        frames: scene.anims.generateFrameNumbers('slimeHurt', { start: 15, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'slimeAttackDown',
        frames: scene.anims.generateFrameNumbers('slimeAttack', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'slimeAttackUp',
        frames: scene.anims.generateFrameNumbers('slimeAttack', { start: 10, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'slimeAttackLeft',
        frames: scene.anims.generateFrameNumbers('slimeAttack', { start: 20, end: 29 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'slimeAttackRight',
        frames: scene.anims.generateFrameNumbers('slimeAttack', { start: 30, end: 39 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'hurtDown',
        frames: scene.anims.generateFrameNumbers('playerHurt', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'hurtLeft',
        frames: scene.anims.generateFrameNumbers('playerHurt', { start: 5, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'hurtRight',
        frames: scene.anims.generateFrameNumbers('playerHurt', { start: 10, end: 14 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'hurtUp',
        frames: scene.anims.generateFrameNumbers('playerHurt', { start: 15, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'deathDown',
        frames: scene.anims.generateFrameNumbers('playerDeath', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'deathLeft',
        frames: scene.anims.generateFrameNumbers('playerDeath', { start: 7, end: 13 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'deathRight',
        frames: scene.anims.generateFrameNumbers('playerDeath', { start: 14, end: 20 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'deathUp',
        frames: scene.anims.generateFrameNumbers('playerDeath', { start: 21, end: 27 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'manual_open',
        frames: scene.anims.generateFrameNumbers('manual_open', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: 0
    })

    scene.anims.create({
        key: 'magmaSlimeIdleFront',
        frames: scene.anims.generateFrameNumbers('magmaSlimeIdle', { start: 0, end: 5 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'magmaSlimeIdleBack',
        frames: scene.anims.generateFrameNumbers('magmaSlimeIdle', { start: 6, end: 11 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'magmaSlimeIdleLeft',
        frames: scene.anims.generateFrameNumbers('magmaSlimeIdle', { start: 12, end: 17 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'magmaSlimeIdleRight',
        frames: scene.anims.generateFrameNumbers('magmaSlimeIdle', { start: 18, end: 23 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'magmaSlimeWalkDown',
        frames: scene.anims.generateFrameNumbers('magmaSlimeWalk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'magmaSlimeWalkUp',
        frames: scene.anims.generateFrameNumbers('magmaSlimeWalk', { start: 8, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'magmaSlimeWalkLeft',
        frames: scene.anims.generateFrameNumbers('magmaSlimeWalk', { start: 16, end: 23 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'magmaSlimeWalkRight',
        frames: scene.anims.generateFrameNumbers('magmaSlimeWalk', { start: 24, end: 31 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'magmaSlimeAttackDown',
        frames: scene.anims.generateFrameNumbers('magmaSlimeAttack', { start: 0, end: 8 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'magmaSlimeAttackUp',
        frames: scene.anims.generateFrameNumbers('magmaSlimeAttack', { start: 9, end: 17 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'magmaSlimeAttackLeft',
        frames: scene.anims.generateFrameNumbers('magmaSlimeAttack', { start: 18, end: 26 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'magmaSlimeAttackRight',
        frames: scene.anims.generateFrameNumbers('magmaSlimeAttack', { start: 27, end: 35 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'magmaSlimeHurtDown',
        frames: scene.anims.generateFrameNumbers('magmaSlimeHurt', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'magmaSlimeHurtUp',
        frames: scene.anims.generateFrameNumbers('magmaSlimeHurt', { start: 5, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'magmaSlimeHurtLeft',
        frames: scene.anims.generateFrameNumbers('magmaSlimeHurt', { start: 10, end: 14 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'magmaSlimeHurtRight',
        frames: scene.anims.generateFrameNumbers('magmaSlimeHurt', { start: 15, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'magmaSlimeDeathDown',
        frames: scene.anims.generateFrameNumbers('magmaSlimeDeath', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'magmaSlimeDeathUp',
        frames: scene.anims.generateFrameNumbers('magmaSlimeDeath', { start: 10, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'magmaSlimeDeathLeft',
        frames: scene.anims.generateFrameNumbers('magmaSlimeDeath', { start: 20, end: 29 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'magmaSlimeDeathRight',
        frames: scene.anims.generateFrameNumbers('magmaSlimeDeath', { start: 30, end: 39 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'skullSlimeIdleFront',
        frames: scene.anims.generateFrameNumbers('skullSlimeIdle', { start: 0, end: 5 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'skullSlimeIdleBack',
        frames: scene.anims.generateFrameNumbers('skullSlimeIdle', { start: 6, end: 11 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'skullSlimeIdleLeft',
        frames: scene.anims.generateFrameNumbers('skullSlimeIdle', { start: 12, end: 17 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'skullSlimeIdleRight',
        frames: scene.anims.generateFrameNumbers('skullSlimeIdle', { start: 18, end: 23 }),
        frameRate: 5,
        repeat: -1,
    });

    scene.anims.create({
        key: 'skullSlimeWalkDown',
        frames: scene.anims.generateFrameNumbers('skullSlimeWalk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'skullSlimeWalkUp',
        frames: scene.anims.generateFrameNumbers('skullSlimeWalk', { start: 8, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'skullSlimeWalkLeft',
        frames: scene.anims.generateFrameNumbers('skullSlimeWalk', { start: 16, end: 23 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'skullSlimeWalkRight',
        frames: scene.anims.generateFrameNumbers('skullSlimeWalk', { start: 24, end: 31 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'skullSlimeAttackDown',
        frames: scene.anims.generateFrameNumbers('skullSlimeAttack', { start: 0, end: 10 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'skullSlimeAttackUp',
        frames: scene.anims.generateFrameNumbers('skullSlimeAttack', { start: 11, end: 21 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'skullSlimeAttackLeft',
        frames: scene.anims.generateFrameNumbers('skullSlimeAttack', { start: 22, end: 32 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'skullSlimeAttackRight',
        frames: scene.anims.generateFrameNumbers('skullSlimeAttack', { start: 33, end: 43 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'skullSlimeHurtDown',
        frames: scene.anims.generateFrameNumbers('skullSlimeHurt', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'skullSlimeHurtUp',
        frames: scene.anims.generateFrameNumbers('skullSlimeHurt', { start: 5, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'skullSlimeHurtLeft',
        frames: scene.anims.generateFrameNumbers('skullSlimeHurt', { start: 10, end: 14 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'skullSlimeHurtRight',
        frames: scene.anims.generateFrameNumbers('skullSlimeHurt', { start: 15, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'skullSlimeDeathDown',
        frames: scene.anims.generateFrameNumbers('skullSlimeDeath', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'skullSlimeDeathUp',
        frames: scene.anims.generateFrameNumbers('skullSlimeDeath', { start: 10, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'skullSlimeDeathLeft',
        frames: scene.anims.generateFrameNumbers('skullSlimeDeath', { start: 20, end: 29 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'skullSlimeDeathRight',
        frames: scene.anims.generateFrameNumbers('skullSlimeDeath', { start: 30, end: 39 }),
        frameRate: 10,
        repeat: 0
    });
}