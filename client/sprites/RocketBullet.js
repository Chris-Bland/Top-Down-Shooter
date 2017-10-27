var RocketBullet = function() {};

RocketBullet.prototype = {

    create: function(State, size, tint, amount, hitPoints){

        let RocketBullets = State.game.add.group();
        RocketBullets.enableBody = true;
        RocketBullets.physicsBodyType = Phaser.Physics.ARCADE;
        RocketBullets.createMultiple(amount, 'rocket');
        RocketBullets.setAll('anchor.x', -1);
        RocketBullets.setAll('anchor.y', -1);
        RocketBullets.setAll('scale.x', size);
        RocketBullets.setAll('scale.y', size);
        RocketBullets.setAll('outOfBoundsKill', true);
        RocketBullets.setAll('checkWorldBounds', true);
        RocketBullets.setAll('hitPoints', hitPoints, false, false, 0, true);

        if(tint){
            RocketBullets.setAll('tint', tint);
        }

        return RocketBullets;

    }

};