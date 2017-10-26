behaviorsObj.prototype.shoot = function(State, shooter, target, targets){

    let range = shooter.gun.range * 200;

    if (target && target.alive && shooter.alive && State.game.physics.arcade.distanceBetween(shooter, target) <= range) {
        State.game.physics.arcade.angleToXY(shooter, target.worldPosition.x, target.worldPosition.y);
        shooter.gun.shoot(State, shooter, target);
    }

    else if(targets){
        for(let targetsIndex in targets){
            targets[targetsIndex].forEachAlive(
                function(individual){
                        shooter.rotation = State.game.physics.arcade.angleToXY(shooter, individual.position.x, individual.position.y);
                    if (shooter.alive && State.game.physics.arcade.distanceBetween(shooter, individual) <= range) {
                        shooter.gun.shoot(State, shooter, individual);
                    }
                }
            );
        }
        
    }

};