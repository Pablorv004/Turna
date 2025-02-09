const config = {
    type: Phaser.AUTO,
    width: 1247,
    height: 968,
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
const tileOffset = -25; // Constant to store the y value offset for the player and enemies

function preload() {
    this.load.image('bg', 'assets/bg.png');
    this.load.spritesheet('playerIdle', 'assets/player/sword_idle/sword_idle_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('slimeIdle', 'assets/Enemies/Slime1/Idle/Slime1_idle_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('swordWalk', 'assets/player/sword_walk/sword_walk_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('slimeWalk', 'assets/Enemies/Slime1/Walk/slime1_walk_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('grass', 'assets/Tiles/tileGrass.png');
    this.load.image('frozen', 'assets/Tiles/tileSnow.png');
    this.load.image('onFire', 'assets/Tiles/tileLava.png');
    this.load.image('obstructed', 'assets/Tiles/tileAutumn.png');
    this.load.image('magical', 'assets/Tiles/tileMagic.png');
    this.load.image('rock', 'assets/Tiles/tileRock.png');
    this.load.image('sandy', 'assets/Tiles/tileSand.png');
    this.load.image('water', 'assets/Tiles/tileWater.png');
    this.load.image('dirt', 'assets/Tiles/tileDirt.png');
    this.load.spritesheet('swordAttack', 'assets/player/sword_attack/sword_attack_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('slimeDeath', 'assets/Enemies/Slime1/Death/Slime1_Death_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('slimeHurt', 'assets/Enemies/Slime1/Hurt/Slime1_Hurt_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('slimeAttack', 'assets/Enemies/Slime1/Attack/Slime1_attack_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('playerHurt', 'assets/player/sword_hurt/sword_Hurt_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('playerDeath', 'assets/player/sword_death/sword_death_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('magmaSlimeIdle', 'assets/Enemies/Slime3/Idle/Slime3_idle_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('magmaSlimeWalk', 'assets/Enemies/Slime3/Walk/Slime3_walk_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('magmaSlimeAttack', 'assets/Enemies/Slime3/Attack/Slime3_attack_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('magmaSlimeHurt', 'assets/Enemies/Slime3/Hurt/Slime3_hurt_full.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('magmaSlimeDeath', 'assets/Enemies/Slime3/Death/Slime3_death_full.png', { frameWidth: 64, frameHeight: 64 });
}

function create() {
    const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
    bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

    this.enemies = []; // Initialize enemies array

    const player = new Player(this);
    this.player = player; // Make player accessible in the scene
    console.log(player);

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: this.textures.get('playerIdle').frameTotal - 10 }),
        frameRate: 5, // Reduced frame rate
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'idleDown',
        frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 11 }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'idleLeft',
        frames: this.anims.generateFrameNumbers('playerIdle', { start: 12, end: 23 }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'idleRight',
        frames: this.anims.generateFrameNumbers('playerIdle', { start: 24, end: 35 }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'idleUp',
        frames: this.anims.generateFrameNumbers('playerIdle', { start: 36, end: 39 }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'walkDown',
        frames: this.anims.generateFrameNumbers('swordWalk', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'walkLeft',
        frames: this.anims.generateFrameNumbers('swordWalk', { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'walkRight',
        frames: this.anims.generateFrameNumbers('swordWalk', { start: 12, end: 17 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'walkUp',
        frames: this.anims.generateFrameNumbers('swordWalk', { start: 18, end: 23 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'slimeWalkDown',
        frames: this.anims.generateFrameNumbers('slimeWalk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'slimeWalkUp',
        frames: this.anims.generateFrameNumbers('slimeWalk', { start: 8, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'slimeWalkLeft',
        frames: this.anims.generateFrameNumbers('slimeWalk', { start: 16, end: 23 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'slimeWalkRight',
        frames: this.anims.generateFrameNumbers('slimeWalk', { start: 24, end: 31 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'attackDown',
        frames: this.anims.generateFrameNumbers('swordAttack', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'attackLeft',
        frames: this.anims.generateFrameNumbers('swordAttack', { start: 8, end: 15 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'attackRight',
        frames: this.anims.generateFrameNumbers('swordAttack', { start: 16, end: 23 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'attackUp',
        frames: this.anims.generateFrameNumbers('swordAttack', { start: 24, end: 31 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'slimeDeathDown',
        frames: this.anims.generateFrameNumbers('slimeDeath', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'slimeDeathUp',
        frames: this.anims.generateFrameNumbers('slimeDeath', { start: 10, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'slimeDeathLeft',
        frames: this.anims.generateFrameNumbers('slimeDeath', { start: 20, end: 29 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'slimeDeathRight',
        frames: this.anims.generateFrameNumbers('slimeDeath', { start: 30, end: 39 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'slimeIdleFront',
        frames: this.anims.generateFrameNumbers('slimeIdle', { start: 0, end: 5 }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'slimeIdleBack',
        frames: this.anims.generateFrameNumbers('slimeIdle', { start: 6, end: 11 }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'slimeIdleLeft',
        frames: this.anims.generateFrameNumbers('slimeIdle', { start: 12, end: 17 }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'slimeIdleRight',
        frames: this.anims.generateFrameNumbers('slimeIdle', { start: 18, end: 23 }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'slimeHurtDown',
        frames: this.anims.generateFrameNumbers('slimeHurt', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'slimeHurtUp',
        frames: this.anims.generateFrameNumbers('slimeHurt', { start: 5, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'slimeHurtLeft',
        frames: this.anims.generateFrameNumbers('slimeHurt', { start: 10, end: 14 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'slimeHurtRight',
        frames: this.anims.generateFrameNumbers('slimeHurt', { start: 15, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'slimeAttackDown',
        frames: this.anims.generateFrameNumbers('slimeAttack', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'slimeAttackUp',
        frames: this.anims.generateFrameNumbers('slimeAttack', { start: 10, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'slimeAttackLeft',
        frames: this.anims.generateFrameNumbers('slimeAttack', { start: 20, end: 29 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'slimeAttackRight',
        frames: this.anims.generateFrameNumbers('slimeAttack', { start: 30, end: 39 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'hurtDown',
        frames: this.anims.generateFrameNumbers('playerHurt', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'hurtLeft',
        frames: this.anims.generateFrameNumbers('playerHurt', { start: 5, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'hurtRight',
        frames: this.anims.generateFrameNumbers('playerHurt', { start: 10, end: 14 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'hurtUp',
        frames: this.anims.generateFrameNumbers('playerHurt', { start: 15, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'deathDown',
        frames: this.anims.generateFrameNumbers('playerDeath', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'deathLeft',
        frames: this.anims.generateFrameNumbers('playerDeath', { start: 7, end: 13 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'deathRight',
        frames: this.anims.generateFrameNumbers('playerDeath', { start: 14, end: 20 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'deathUp',
        frames: this.anims.generateFrameNumbers('playerDeath', { start: 21, end: 27 }),
        frameRate: 10,
        repeat: 0
    });

    //Tiles will be initialized at a certain point. The offsets will be used to position the tiles relative to center tile.
    const centerx = 650;
    const centery = 400;
    const xoffset = 65;
    const yoffset = 54;

    const tiles = [
        //GAME TILES

        //Outer hexagon (top)
        //This will surround the branches with the same offsets with a hollow tile hexagon
        //Left-To-Top row
        new Tile(this, centerx - xoffset * 3, centery - yoffset * 4, 0),
        new Tile(this, centerx - xoffset * 3.5, centery - yoffset * 3, 0),
        new Tile(this, centerx - xoffset * 4, centery - yoffset * 2, 0),
        new Tile(this, centerx - xoffset * 4.5, centery - yoffset, 0),
        new Tile(this, centerx - xoffset * 5, centery, 0),

        // Top row (ltr)
        new Tile(this, centerx - xoffset * 2, centery - yoffset * 4, 0),
        new Tile(this, centerx - xoffset, centery - yoffset * 4, 0),
        new Tile(this, centerx, centery - yoffset * 4, 0),
        new Tile(this, centerx + xoffset, centery - yoffset * 4, 0),

        //Right-To-Top row
        new Tile(this, centerx + xoffset * 2, centery - yoffset * 4, 0),
        new Tile(this, centerx + xoffset * 2.5, centery - yoffset * 3, 0),
        new Tile(this, centerx + xoffset * 3, centery - yoffset * 2, 0),
        new Tile(this, centerx + xoffset * 3.5, centery - yoffset, 0),
        new Tile(this, centerx + xoffset * 4, centery, 0),
        
        //Top left branch
        new Tile(this, centerx - xoffset * 2.5, centery - yoffset * 3, 0),
        new Tile(this, centerx - xoffset * 2, centery - yoffset * 2, 0),
        new Tile(this, centerx - xoffset * 1.5, centery - yoffset, 0),

        //Top right branch
        new Tile(this, centerx + xoffset * 1.5, centery - yoffset * 3, 0),
        new Tile(this, centerx + xoffset, centery - yoffset * 2, 0),
        new Tile(this, centerx + xoffset * 0.5, centery - yoffset, 0),
        
        //Inner Hexagon
        new Tile(this, centerx, centery, 0), // Center tile
        new Tile(this, centerx - xoffset, centery, 0),
        new Tile(this, centerx - xoffset / 2, centery + yoffset, 0),
        new Tile(this, centerx - xoffset * 1.5, centery + yoffset, 0),
        new Tile(this, centerx + xoffset * 0.5, centery + yoffset, 0),
        new Tile(this, centerx, centery + yoffset * 2, 0),
        new Tile(this, centerx - xoffset, centery + yoffset * 2, 0),

        //Bottom left branch
        new Tile(this, centerx - xoffset * 1.5, centery + yoffset * 3, 0),
        new Tile(this, centerx - xoffset * 2, centery + yoffset * 4, 0),
        new Tile(this, centerx - xoffset * 2.5, centery + yoffset * 5, 0),

        //Bottom right branch
        new Tile(this, centerx + xoffset * 0.5, centery + yoffset * 3, 0),
        new Tile(this, centerx + xoffset, centery + yoffset * 4, 0),
        new Tile(this, centerx + xoffset * 1.5, centery + yoffset * 5, 0),

        //Left branch
        new Tile(this, centerx - xoffset * 2.5, centery + yoffset, 0),
        new Tile(this, centerx - xoffset * 3.5, centery + yoffset, 0),
        new Tile(this, centerx - xoffset * 4.5, centery + yoffset, 0),

        //Right branch
        new Tile(this, centerx + xoffset * 1.5, centery + yoffset, 0),
        new Tile(this, centerx + xoffset * 2.5, centery + yoffset, 0),
        new Tile(this, centerx + xoffset * 3.5, centery + yoffset, 0),

        //Outer hexagon (bottom)
        //This will surround the branches with the same offsets with a hollow tile hexagon
        //Right-To-Bottom row
        new Tile(this, centerx + xoffset * 4.5, centery + yoffset, 0),
        new Tile(this, centerx + xoffset * 4, centery + yoffset * 2, 0),
        new Tile(this, centerx + xoffset * 3.5, centery + yoffset * 3, 0),
        new Tile(this, centerx + xoffset * 3, centery + yoffset * 4, 0),
        new Tile(this, centerx + xoffset * 2.5, centery + yoffset * 5, 0),

        
        //Left-To-Bottom row
        new Tile(this, centerx - xoffset * 5.5, centery + yoffset, 0),
        new Tile(this, centerx - xoffset * 5, centery + yoffset * 2, 0),
        new Tile(this, centerx - xoffset * 4.5, centery + yoffset * 3, 0),
        new Tile(this, centerx - xoffset * 4, centery + yoffset * 4, 0),
        new Tile(this, centerx - xoffset * 3.5, centery + yoffset * 5, 0),

        //Bottom row (rtl)
        new Tile(this, centerx + xoffset * 2, centery + yoffset * 6, 0),
        new Tile(this, centerx + xoffset, centery + yoffset * 6, 0),
        new Tile(this, centerx, centery + yoffset * 6, 0),
        new Tile(this, centerx - xoffset, centery + yoffset * 6, 0),
        new Tile(this, centerx - xoffset * 2, centery + yoffset * 6, 0),
        new Tile(this, centerx - xoffset * 3, centery + yoffset * 6, 0),
        
        

        
    ];

    const debugTiles = [
        //DEBUG TILES
        new Tile(this, 1050, 200, 0),
        new Tile(this, 1150, 200, 1),
        new Tile(this, 1050, 300, 2),
        new Tile(this, 1150, 300, 3),
        new Tile(this, 1050, 400, 4),
        new Tile(this, 1150, 400, 5),
        new Tile(this, 1050, 500, 6),
        new Tile(this, 1150, 500, 7),
        new Tile(this, 1100, 600, 8),
    ]

    this.tiles = tiles; // Store tiles array in the scene

    const playerSprite = this.add.sprite(centerx - xoffset * 0.5, centery + yoffset + tileOffset, 'playerIdle'); // Spawn player on the center tile with offset
    playerSprite.setScale(2); // Scale the player sprite upwards
    playerSprite.play('idleDown'); // Set initial idle animation to looking down
    this.playerSprite = playerSprite; // Make player sprite accessible in the scene
    this.playerSprite.setDepth(1); // Ensure player sprite is above the tiles

    // Set the player's initial tile to the bottom left of the center tile
    const initialTile = tiles.find(tile => tile.x === centerx - xoffset / 2 && tile.y === centery + yoffset);
    this.player.moveToTile(initialTile);

    this.anims.create({
        key: 'slimeIdle',
        frames: this.anims.generateFrameNumbers('slimeIdle', { start: 0, end: this.textures.get('slimeIdle').frameTotal - 1 }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'magmaSlimeIdleFront',
        frames: this.anims.generateFrameNumbers('magmaSlimeIdle', { start: 0, end: 5 }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'magmaSlimeIdleBack',
        frames: this.anims.generateFrameNumbers('magmaSlimeIdle', { start: 6, end: 11 }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'magmaSlimeIdleLeft',
        frames: this.anims.generateFrameNumbers('magmaSlimeIdle', { start: 12, end: 17 }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'magmaSlimeIdleRight',
        frames: this.anims.generateFrameNumbers('magmaSlimeIdle', { start: 18, end: 23 }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
    });

    this.anims.create({
        key: 'magmaSlimeWalkDown',
        frames: this.anims.generateFrameNumbers('magmaSlimeWalk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'magmaSlimeWalkUp',
        frames: this.anims.generateFrameNumbers('magmaSlimeWalk', { start: 8, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'magmaSlimeWalkLeft',
        frames: this.anims.generateFrameNumbers('magmaSlimeWalk', { start: 16, end: 23 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'magmaSlimeWalkRight',
        frames: this.anims.generateFrameNumbers('magmaSlimeWalk', { start: 24, end: 31 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'magmaSlimeAttackDown',
        frames: this.anims.generateFrameNumbers('magmaSlimeAttack', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'magmaSlimeAttackUp',
        frames: this.anims.generateFrameNumbers('magmaSlimeAttack', { start: 10, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'magmaSlimeAttackLeft',
        frames: this.anims.generateFrameNumbers('magmaSlimeAttack', { start: 20, end: 29 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'magmaSlimeAttackRight',
        frames: this.anims.generateFrameNumbers('magmaSlimeAttack', { start: 30, end: 39 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'magmaSlimeHurtDown',
        frames: this.anims.generateFrameNumbers('magmaSlimeHurt', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'magmaSlimeHurtUp',
        frames: this.anims.generateFrameNumbers('magmaSlimeHurt', { start: 5, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'magmaSlimeHurtLeft',
        frames: this.anims.generateFrameNumbers('magmaSlimeHurt', { start: 10, end: 14 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'magmaSlimeHurtRight',
        frames: this.anims.generateFrameNumbers('magmaSlimeHurt', { start: 15, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'magmaSlimeDeathDown',
        frames: this.anims.generateFrameNumbers('magmaSlimeDeath', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'magmaSlimeDeathUp',
        frames: this.anims.generateFrameNumbers('magmaSlimeDeath', { start: 10, end: 19 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'magmaSlimeDeathLeft',
        frames: this.anims.generateFrameNumbers('magmaSlimeDeath', { start: 20, end: 29 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'magmaSlimeDeathRight',
        frames: this.anims.generateFrameNumbers('magmaSlimeDeath', { start: 30, end: 39 }),
        frameRate: 10,
        repeat: 0
    });

    const baseSlime1 = new BaseSlime(this, tiles);
    this.baseSlime1 = baseSlime1; // Make baseSlime1 accessible in the scene
    console.log(baseSlime1);

    const baseSlime2 = new BaseSlime(this, tiles);
    this.baseSlime2 = baseSlime2; // Make baseSlime2 accessible in the scene
    console.log(baseSlime2);

    const magmaSlime1 = new MagmaSlime(this, tiles);
    this.magmaSlime1 = magmaSlime1; // Make magmaSlime1 accessible in the scene
    console.log(magmaSlime1);

    this.enemies.push(baseSlime1); // Add baseSlime1 to the enemies array
    this.enemies.push(baseSlime2); // Add baseSlime2 to the enemies array
    this.enemies.push(magmaSlime1); // Add magmaSlime1 to the enemies array

    this.gameOver = gameOver.bind(this); // Bind gameOver method to the scene
}

function update() {
    // Game logic goes here
}

function gameOver() {
    const width = this.sys.game.config.width;
    const height = this.sys.game.config.height;

    // Fade out all enemies
    this.enemies.forEach(enemy => {
        this.tweens.add({
            targets: enemy.sprite,
            alpha: 0,
            duration: 1000,
            onComplete: () => {
                enemy.sprite.destroy();
            }
        });
    });

    // Fade out all tiles
    this.tiles.forEach(tile => {
        this.tweens.add({
            targets: tile.sprite,
            alpha: 0,
            duration: 1000,
            onComplete: () => {
                tile.sprite.destroy();
            }
        });
    });

    // Fade in game over screen
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, width, height);
    graphics.alpha = 0;

    this.tweens.add({
        targets: graphics,
        alpha: 1,
        duration: 1000
    });
    this.input.enabled = false;
    const gameOverText = this.add.text(width / 2, height / 2, 'Game Over', {
        fontSize: '64px',
        fill: '#ffffff'
    });
    gameOverText.setOrigin(0.5, 0.5);
    gameOverText.alpha = 0;

    this.tweens.add({
        targets: gameOverText,
        alpha: 1,
        duration: 1000
    });
}