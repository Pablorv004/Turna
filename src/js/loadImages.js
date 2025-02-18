export function loadImages(scene) {
    scene.load.image('bg', 'assets/bg.png');

    //PLAYER
    scene.load.spritesheet('playerIdle', 'assets/player/sword_idle/sword_idle_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('slimeIdle', 'assets/Enemies/Slime1/Idle/Slime1_idle_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('swordWalk', 'assets/player/sword_walk/sword_walk_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('slimeWalk', 'assets/Enemies/Slime1/Walk/slime1_walk_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('playerHurt', 'assets/player/sword_hurt/sword_Hurt_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('playerDeath', 'assets/player/sword_death/sword_death_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('swordAttack', 'assets/player/sword_attack/sword_attack_full.png', { frameWidth: 64, frameHeight: 64 });
    
    //TILES
    scene.load.image('grass', 'assets/Tiles/tileGrass.png');
    scene.load.image('frozen', 'assets/Tiles/tileSnow.png');
    scene.load.image('onFire', 'assets/Tiles/tileLava.png');
    scene.load.image('obstructed', 'assets/Tiles/tileAutumn.png');
    scene.load.image('magical', 'assets/Tiles/tileMagic.png');
    scene.load.image('rock', 'assets/Tiles/tileRock.png');
    scene.load.image('sandy', 'assets/Tiles/tileSand.png');
    scene.load.image('water', 'assets/Tiles/tileWater.png');
    scene.load.image('dirt', 'assets/Tiles/tileDirt.png');

    // Bushes
    scene.load.image('bushGrass', 'assets/Tiles/bushGrass.png');
    scene.load.image('bushMagic', 'assets/Tiles/bushMagic.png');
    scene.load.image('bushSnow', 'assets/Tiles/bushSnow.png');
    scene.load.image('bushSand', 'assets/Tiles/bushSand.png');
    scene.load.image('bushDirt', 'assets/Tiles/bushDirt.png');

    // Flowers
    scene.load.image('flowerBlue', 'assets/Tiles/flowerBlue.png');
    scene.load.image('flowerGreen', 'assets/Tiles/flowerGreen.png');
    scene.load.image('flowerRed', 'assets/Tiles/flowerRed.png');
    scene.load.image('flowerWhite', 'assets/Tiles/flowerWhite.png');
    scene.load.image('flowerYellow', 'assets/Tiles/flowerYellow.png');

    // Hills
    scene.load.image('hillGrass', 'assets/Tiles/hillGrass.png');
    scene.load.image('hillSnow', 'assets/Tiles/hillSnow.png');
    scene.load.image('hillMagic', 'assets/Tiles/hillMagic.png');
    scene.load.image('hillSand', 'assets/Tiles/hillSand.png');
    scene.load.image('hillDirt', 'assets/Tiles/hillDirt.png');

    // Waves
    scene.load.spritesheet('waveLava', 'assets/Tiles/waveLava.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('waveWater', 'assets/Tiles/waveWater.png', { frameWidth: 64, frameHeight: 64 });

    //UI
    scene.load.spritesheet('playButton', 'assets/Icons/buttons.png', { frameWidth: 190, frameHeight: 45 });
    scene.load.spritesheet('whiteButton', 'assets/Icons/white_button.png', { frameWidth: 190, frameHeight: 45 });
    scene.load.image('greyBox', 'assets/Icons/greybox.png');
    scene.load.image('brownBox', 'assets/Icons/panel_brown_dark_corners_b.png');
    scene.load.image('brownButton', 'assets/Icons/button_brown.png');
    scene.load.image('bannerHanging', 'assets/Icons/banner_hanging.png');
    scene.load.image('experience', 'assets/Icons/xp.png');
    scene.load.spritesheet('healthIdle', 'assets/Icons/health_idle.png', { frameWidth: 15, frameHeight: 14 });
    scene.load.spritesheet('healthAdd', 'assets/Icons/health_add.png', { frameWidth: 15, frameHeight: 14 });
    scene.load.spritesheet('staminaIdle', 'assets/Icons/stamina_idle.png', { frameWidth: 13, frameHeight: 14 });
    scene.load.spritesheet('staminaAdd', 'assets/Icons/stamina_add.png', { frameWidth: 13, frameHeight: 14 });
    scene.load.image('damage', 'assets/Icons/damage.png');
    scene.load.image('range', 'assets/Icons/range.png');
    scene.load.image('speed', 'assets/Icons/speed.png');
    scene.load.image('book', 'assets/Icons/book.png');
    scene.load.spritesheet('manual_open', 'assets/Icons/manual_open.png', { frameWidth: 640/4, frameHeight: 90 });
    scene.load.image('help', 'assets/Icons/help.png');
    scene.load.image('roundDamagedBrown', 'assets/Icons/round_damaged_brown.png');
    scene.load.image('panel_blue', 'assets/Icons/panel_blue.png');

    //FONTS
    scene.load.bitmapFont('pixelfont', 'assets/fonts/minogram_6x10.png', 'assets/fonts/minogram_6x10.xml');
    scene.load.bitmapFont('numbers_green', 'assets/fonts/numbers_green.png', 'assets/fonts/numbers_green.xml');
    scene.load.bitmapFont('numbers_red', 'assets/fonts/numbers_red.png', 'assets/fonts/numbers_red.xml');
    scene.load.spritesheet('buttons', 'assets/buttonGray.png', { frameWidth: 190, frameHeight: 49 });

    //ENEMIES
    scene.load.spritesheet('slimeDeath', 'assets/Enemies/Slime1/Death/Slime1_Death_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('slimeHurt', 'assets/Enemies/Slime1/Hurt/Slime1_Hurt_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('slimeAttack', 'assets/Enemies/Slime1/Attack/Slime1_attack_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('magmaSlimeIdle', 'assets/Enemies/Slime3/Idle/Slime3_idle_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('magmaSlimeWalk', 'assets/Enemies/Slime3/Walk/Slime3_walk_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('magmaSlimeAttack', 'assets/Enemies/Slime3/Attack/Slime3_attack_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('magmaSlimeHurt', 'assets/Enemies/Slime3/Hurt/Slime3_hurt_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('magmaSlimeDeath', 'assets/Enemies/Slime3/Death/Slime3_death_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('skullSlimeIdle', 'assets/Enemies/Slime2/Idle/Slime2_idle_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('skullSlimeWalk', 'assets/Enemies/Slime2/Walk/Slime2_walk_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('skullSlimeAttack', 'assets/Enemies/Slime2/Attack/Slime2_attack_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('skullSlimeHurt', 'assets/Enemies/Slime2/Hurt/Slime2_hurt_full.png', { frameWidth: 64, frameHeight: 64 });
    scene.load.spritesheet('skullSlimeDeath', 'assets/Enemies/Slime2/Death/Slime2_death_full.png', { frameWidth: 64, frameHeight: 64 });
}
