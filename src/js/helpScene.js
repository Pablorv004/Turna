class HelpScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HelpScene' });
    }

    create() {
        // Create overlay
        this.overlay = this.add.graphics();
        this.overlay.fillStyle(0x000000, 0.4);
        this.overlay.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
        this.overlay.setDepth(1);

        // Create panel
        const panel = this.add.image(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            'panel_blue'
        ).setOrigin(0.5);
        panel.setScale(4).setDepth(2);

        // Create help text
        this.helpText = this.add.bitmapText(
            panel.x, 
            panel.y - 20, 
            'pixelfont', 
            'How to Play\n\nClick to move around spaces.\nThe enemies will always move\nat the same time as you.\nYou must defeat enemies in order\nto collect experience.\nIf you\'re lost on what\ntiles or enemies do,\ncheck the in-game manual\nfor further help.\n\n(Click anywhere to close)', 
            20
        ).setOrigin(0.5);
        this.helpText.setDepth(3);

        // Close the scene on pointer down
        this.input.once('pointerdown', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        });
    }
}

export default HelpScene;
