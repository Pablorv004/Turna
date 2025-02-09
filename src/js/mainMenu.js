class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.image('title', 'assets/title.png');
        this.load.image('playButton', 'assets/playButton.png');
    }

    create() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        const title = this.add.image(width / 2, height / 2 - 100, 'title');
        title.setScale(2);

        const playButton = this.add.image(width / 2, height / 2 + 100, 'playButton').setInteractive();
        playButton.setScale(2);

        playButton.on('pointerdown', () => {
            this.tweens.add({
                targets: [title, playButton],
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    this.scene.start('GameScene');
                }
            });
        });
    }
}
