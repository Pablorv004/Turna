class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.image('bg', 'assets/bg.png');
        this.load.image('title', 'assets/Icons/turnalogo.png');
        this.load.spritesheet('playButton', 'assets/Icons/buttons.png', { frameWidth: 190, frameHeight: 46 });
        this.load.bitmapFont('pixelfont', 'assets/fonts/minogram_6x10.png', 'assets/fonts/minogram_6x10.xml');
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
                targets: [title, playButton, bg, playText],
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    this.scene.start('GameScene');
                }
            });
        });
    }
}

export default MainMenu;
