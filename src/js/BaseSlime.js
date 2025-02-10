class BaseSlime extends Enemy {
    constructor(scene, tiles) {
        super(scene, tiles, {
            hp: 10,
            damage: 1,
            range: 1,
            jumpDistance: 1,
            idleFront: 'slimeIdleFront',
            idleBack: 'slimeIdleBack',
            idleLeft: 'slimeIdleLeft',
            idleRight: 'slimeIdleRight',
            walkDown: 'slimeWalkDown',
            walkUp: 'slimeWalkUp',
            walkLeft: 'slimeWalkLeft',
            walkRight: 'slimeWalkRight',
            attackDown: 'slimeAttackDown',
            attackUp: 'slimeAttackUp',
            attackLeft: 'slimeAttackLeft',
            attackRight: 'slimeAttackRight',
            hurtDown: 'slimeHurtDown',
            hurtUp: 'slimeHurtUp',
            hurtLeft: 'slimeHurtLeft',
            hurtRight: 'slimeHurtRight',
            deathDown: 'slimeDeathDown',
            deathUp: 'slimeDeathUp',
            deathLeft: 'slimeDeathLeft',
            deathRight: 'slimeDeathRight'
        });
    }
}
