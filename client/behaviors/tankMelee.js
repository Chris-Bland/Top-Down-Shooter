behaviorsObj.prototype.tankMeleeMove = function(State, tank, target, targets){
    tank.body.collideWorldBounds = true;
    tank.body.velocity.x = 0;
    tank.body.velocity.y = 0;
    tank.rotation = State.game.physics.arcade.angleToXY(tank, State.player.x, State.player.y);


    var found = false;
    var targetNear = false;
    var attacking = false;
    var enemyFocus = null;

    if(target && target.alive && tank.alive && State.game.physics.arcade.distanceBetween(tank, target) <= 1){
        tank.rotation = State.game.physics.arcade.angleToXY(tank, target.position.x, target.position.y);
        enemyFocus = target;
        attacking = true;
        found = true;
    }
    else if (target && target.alive && tank.alive && State.game.physics.arcade.distanceBetween(tank, target) <= 350) {
        tank.rotation = State.game.physics.arcade.angleToXY(tank, target.position.x, target.position.y);
        enemyFocus = target;
        targetNear = true;
        found = true;
    }

    if(targets && !found){ //&& not past the maximum distance from player
        for(var targetsIndex in targets){

            targets[targetsIndex].forEachAlive(
                function(individual){
                    if(!found && tank.alive && State.game.physics.arcade.distanceBetween(tank, individual) <= 1){
                        tank.rotation = State.game.physics.arcade.angleToXY(tank, individual.position.x, individual.position.y);
                        enemyFocus = individual;
                        attacking = true;
                        found = true;
                    }
                    else if(!found && tank.alive && State.game.physics.arcade.distanceBetween(tank, individual) <= 350) {
                        tank.rotation = State.game.physics.arcade.angleToXY(tank, individual.position.x, individual.position.y);
                        enemyFocus = individual;
                        targetNear = true;
                        found = true;
                    }
                }
            );
        }

    }

    if(State.game.physics.arcade.distanceBetween(tank, State.player) >= 500){
        tank.MOVE_SPEED = 500 + State.player.playerLevel * 5;
        behaviorsObj.prototype.mercMove(State, tank);
        State.game.physics.arcade.moveToObject(tank, State.player, tank.MOVE_SPEED);
        tank.animations.play('rifle-move');
    }
    else if(attacking){
        tank.MOVE_SPEED = 500 + State.player.playerLevel * 5;
        State.game.physics.arcade.moveToObject(tank, enemyFocus, tank.MOVE_SPEED);
        tank.animations.play('rifle-move');
    }
    else if(targetNear){
        tank.MOVE_SPEED = 750 + State.player.playerLevel * 5;
        State.game.physics.arcade.moveToObject(tank, enemyFocus, tank.MOVE_SPEED);
        tank.animations.play('rifle-move');
    }
    else if (game.physics.arcade.distanceBetween(State.player, tank) >= 50) {
        tank.MOVE_SPEED = 500 + State.player.playerLevel * 5;
        State.game.physics.arcade.moveToObject(tank, State.player, tank.MOVE_SPEED);
        tank.animations.play('rifle-move');
    }
    else{
        tank.animations.play('rifle-idle');
    }



};