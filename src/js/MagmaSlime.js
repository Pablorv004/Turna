class MagmaSlime extends Enemy {
    constructor(scene, tiles) {
        super(scene, tiles, {
            hp: 20,
            damage: 2,
            range: 1,
            jumpDistance: 1,
            idleFront: 'magmaSlimeIdleFront',
            idleBack: 'magmaSlimeIdleBack',
            idleLeft: 'magmaSlimeIdleLeft',
            idleRight: 'magmaSlimeIdleRight',
            walkDown: 'magmaSlimeWalkDown',
            walkUp: 'magmaSlimeWalkUp',
            walkLeft: 'magmaSlimeWalkLeft',
            walkRight: 'magmaSlimeWalkRight',
            attackDown: 'magmaSlimeAttackDown',
            attackUp: 'magmaSlimeAttackUp',
            attackLeft: 'magmaSlimeAttackLeft',
            attackRight: 'magmaSlimeAttackRight',
            hurtDown: 'magmaSlimeHurtDown',
            hurtUp: 'magmaSlimeHurtUp',
            hurtLeft: 'magmaSlimeHurtLeft',
            hurtRight: 'magmaSlimeHurtRight',
            deathDown: 'magmaSlimeDeathDown',
            deathUp: 'magmaSlimeDeathUp',
            deathLeft: 'magmaSlimeDeathLeft',
            deathRight: 'magmaSlimeDeathRight'
        });
    }
}
