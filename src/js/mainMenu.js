class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.image('bg', 'assets/bg.png');
        this.load.image('title', 'assets/Icons/turnalogo.png');
        this.load.spritesheet('playButton', 'assets/Icons/buttons.png', { frameWidth: 190, frameHeight: 46 });
        this.load.bitmapFont('pixelfont', 'assets/fonts/minogram_6x10.png', 'assets/fonts/minogram_6x10.xml');
        this.load.spritesheet('slimeIdle', 'assets/Enemies/Slime1/Idle/Slime1_idle_full.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('magmaSlimeIdle', 'assets/Enemies/Slime3/Idle/Slime3_idle_full.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('skullSlimeIdle', 'assets/Enemies/Slime2/Idle/Slime2_idle_full.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);

        const title = this.add.image(width / 2, height / 2 - 300, 'title');
        title.setScale(0.3);
        
        const playButton = this.add.sprite(width / 2, height / 2, 'playButton', 1).setInteractive();
        const playText = this.add.bitmapText(width / 2 - 23, height / 2 - 10, 'pixelfont', 'Play', 20);
        playButton.on('pointerdown', () => {
            playButton.setFrame(0);
            this.tweens.add({
                targets: [playButton, playText],
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    playButton.destroy();
                    playText.destroy();
                    this.showDifficultyButtons();
                }
            });
        });

        this.loadAnimations();
    }

    loadAnimations() {
        this.anims.create({
            key: 'slimeIdleFront',
            frames: this.anims.generateFrameNumbers('slimeIdle', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: 'magmaSlimeIdleFront',
            frames: this.anims.generateFrameNumbers('magmaSlimeIdle', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: 'skullSlimeIdleFront',
            frames: this.anims.generateFrameNumbers('skullSlimeIdle', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1,
        });
    }

    showDifficultyButtons() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        const easyIcon = this.add.sprite(width / 2 - 125, height / 2 - 50, 'slimeIdle').setScale(2);
        easyIcon.play('slimeIdleFront');
        const easyButton = this.add.sprite(width / 2, height / 2 - 50, 'playButton', 1).setInteractive();
        const easyText = this.add.bitmapText(width / 2 - 23, height / 2 - 60, 'pixelfont', 'Easy', 20);
        easyButton.on('pointerdown', () => {
            this.fadeOutScene('easy');
        });

        const normalIcon = this.add.sprite(width / 2 - 125, height / 2, 'magmaSlimeIdle').setScale(2);
        normalIcon.play('magmaSlimeIdleFront');
        const normalButton = this.add.sprite(width / 2, height / 2, 'playButton', 1).setInteractive();
        const normalText = this.add.bitmapText(width / 2 - 23, height / 2 - 10, 'pixelfont', 'Normal', 20);
        normalButton.on('pointerdown', () => {
            this.fadeOutScene('normal');
        });

        const hardIcon = this.add.sprite(width / 2 - 125, height / 2 + 50, 'skullSlimeIdle').setScale(2);
        hardIcon.play('skullSlimeIdleFront');
        const hardButton = this.add.sprite(width / 2, height / 2 + 50, 'playButton', 1).setInteractive();
        const hardText = this.add.bitmapText(width / 2 - 23, height / 2 + 40, 'pixelfont', 'Hard', 20);
        hardButton.on('pointerdown', () => {
            this.fadeOutScene('hard');
        });
    }

    fadeOutScene(difficulty) {
        const children = this.children.getAll();
        this.tweens.add({
            targets: children,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                children.forEach(child => child.destroy());
                this.startGame(difficulty);
            }
        });
    }

    startGame(difficulty) {
        this.scene.start('GameScene', { difficulty });
    }
}

export default MainMenu;
