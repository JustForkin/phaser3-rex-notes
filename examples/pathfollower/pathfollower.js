import PathFollowerPlugin from '../../plugins/pathfollower-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.clock;
        this.text;
    }

    preload() {}

    create() {
        var path = this.add.path(100, 100)
            .lineTo(300, 100)
            .lineTo(100, 300)
            .lineTo(300, 300)
            .lineTo(100, 100);
        var graphics = this.add.graphics({
            lineStyle: {
                width: 3,
                color: 0xffff00,
                alpha: 1
            }
        })
        path.draw(graphics);

        var gameObject = this.add.graphics()
            .fillStyle(0xffffff, 1)
            .fillPoint(0, 0, 40);
        gameObject.pathFollower = this.plugins.get('rexPathFollower').add(gameObject, {
            path: path,
            t: 0,
            rotateToPath: true
        });

        this.tweens.add({
            targets: gameObject.pathFollower,
            t: 1,
            ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 3000,
            repeat: -1,
            yoyo: false
        });

    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexPathFollower',
            plugin: PathFollowerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);