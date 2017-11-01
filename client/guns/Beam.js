var Beam = function() {};

Beam.prototype = {

    create: function (State, gunHolderTint) {
        return Bullet.prototype.create(State, 0.25, gunHolderTint, 500, 1);

    },

    range: 4,

    shoot: function (State, shooter, target) {

        if (State.game.time.now > shooter.shootTime) {
            var bullet = shooter.bullets.getFirstExists(false);
            if (bullet) {
                bullet.reset(shooter.x, shooter.y);
                bullet.body.velocity.x = 1000;
                shooter.shootTime = State.game.time.now + 20; //fire rate determinate
                if (target == State.game.input.activePointer) {
                    bullet.rotation = State.game.physics.arcade.moveToPointer(bullet, 1000, State.game.input.activePointer);
                }
                else {
                    bullet.rotation = State.game.physics.arcade.moveToXY(bullet, target.x, target.y, 1000);
                }
                bullet.lifespan = this.range * 160;

            }
        }
    }

};