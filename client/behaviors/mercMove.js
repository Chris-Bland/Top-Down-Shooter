behaviorsObj.prototype.mercMove = function(State, merc) {
    merc.body.collideWorldBounds = true;
    merc.body.velocity.x = 0;
    merc.body.velocity.y = 0;
    merc.rotation = State.game.physics.arcade.angleToXY(merc, State.player.x, State.player.y);
       
    if (State.player.alive && game.physics.arcade.distanceBetween(State.player, merc) >= 50) {
        State.game.physics.arcade.moveToObject(merc, State.player, merc.MOVE_SPEED);
        merc.animations.play('rifle-move');
    }
    else{
        merc.animations.play('rifle-idle');
    }
};