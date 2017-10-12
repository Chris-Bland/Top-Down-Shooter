var Bullet = function() {};

Bullet.prototype = {

    create: function(State, size, tint, amount, hitPoints){

        let Bullets = State.game.add.group();
        Bullets.enableBody = true;
        Bullets.physicsBodyType = Phaser.Physics.ARCADE;
        Bullets.createMultiple(amount, 'bullet');
        Bullets.setAll('anchor.x', -1);
        Bullets.setAll('anchor.y', -1);
        Bullets.setAll('scale.x', size);
        Bullets.setAll('scale.y', size);
        Bullets.setAll('outOfBoundsKill', true);
        Bullets.setAll('checkWorldBounds', true);
        Bullets.setAll('hitPoints', hitPoints, false, false, 0, true);

        if(tint){
            Bullets.setAll('tint', tint);
        }

        return Bullets;

    }

}