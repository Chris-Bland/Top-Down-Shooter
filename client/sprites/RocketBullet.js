var RocketBullet = function () { };

RocketBullet.prototype = {

    create: function (State, size, tint, amount, hitPoints) {
        let rocket = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'rocket');
        rocket.scale.set(.5);
        rocket.animations.add('rocket-shoot', Phaser.Animation.generateFrameNames('rocket', 1, 13, '.png', 2), 13, true, false);
        rocket.play('rocket-shoot');
        let RocketBullets = State.game.add.group();
        RocketBullets.enableBody = true;
        RocketBullets.physicsBodyType = Phaser.Physics.ARCADE;
        RocketBullets.createMultiple(amount, rocket);
        RocketBullets.setAll('anchor.x', -1);
        RocketBullets.setAll('anchor.y', -1);
        RocketBullets.setAll('scale.x', size);
        RocketBullets.setAll('scale.y', size);
        RocketBullets.setAll('outOfBoundsKill', true);
        RocketBullets.setAll('checkWorldBounds', true);
        RocketBullets.setAll('hitPoints', hitPoints, false, false, 0, true);

        if (tint) {
            RocketBullets.setAll('tint', tint);
        }

        return RocketBullets;

    }

};


