var RocketBullet = function () { };

RocketBullet.prototype = {

    create: function (State, size, tint, amount, hitPoints) {
      
   
    
        // var rocket = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'rocket-single');
        // rocket.scale.set(.5);
        // rocket.animations.add('rocket-shoot', Phaser.Animation.generateFrameNames('rocket', 1, 13, '.png', 2), 13, true, false);
        // rocket.play('rocket-shoot');
        var RocketBullets = State.game.add.group();
        RocketBullets.enableBody = true;
        RocketBullets.physicsBodyType = Phaser.Physics.ARCADE;
        RocketBullets.createMultiple(amount, 'rocket-single');
        RocketBullets.setAll('anchor.x', 0);
        RocketBullets.setAll('anchor.y', 0);
        RocketBullets.setAll('scale.x', size);
        RocketBullets.setAll('scale.y', size);
        RocketBullets.setAll('outOfBoundsKill', true);
        RocketBullets.setAll('checkWorldBounds', true);
        if(tint){
            RocketBullets.setAll('hitPoints', hitPoints, false, false, 0, true);
        }
        else{
            RocketBullets.setAll('hitPoints', (hitPoints + (gameStatHandler.prototype.damagePoints * 5)), false, false, 0, true);
        }

        if (tint) {
            RocketBullets.setAll('tint', tint);
        }

        return RocketBullets;

    }

};


