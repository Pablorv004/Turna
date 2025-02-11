import Enemy from './Enemy.js';

class SkullSlime extends Enemy {
    constructor(scene, tiles) {
        super(scene, tiles, {
            hp: 15,
            damage: 100,
            range: 1,
            jumpDistance: 1,
            idleFront: 'skullSlimeIdleFront',
            idleBack: 'skullSlimeIdleBack',
            idleLeft: 'skullSlimeIdleLeft',
            idleRight: 'skullSlimeIdleRight',
            walkDown: 'skullSlimeWalkDown',
            walkUp: 'skullSlimeWalkUp',
            walkLeft: 'skullSlimeWalkLeft',
            walkRight: 'skullSlimeWalkRight',
            attackDown: 'skullSlimeAttackDown',
            attackUp: 'skullSlimeAttackUp',
            attackLeft: 'skullSlimeAttackLeft',
            attackRight: 'skullSlimeAttackRight',
            hurtDown: 'skullSlimeHurtDown',
            hurtUp: 'skullSlimeHurtUp',
            hurtLeft: 'skullSlimeHurtLeft',
            hurtRight: 'skullSlimeHurtRight',
            deathDown: 'skullSlimeDeathDown',
            deathUp: 'skullSlimeDeathUp',
            deathLeft: 'skullSlimeDeathLeft',
            deathRight: 'skullSlimeDeathRight',
            experienceDropped: 15 // Experience dropped by SkullSlime
        });
    }
}

export default SkullSlime;
