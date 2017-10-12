behaviorsObj.prototype.shoot = function(State, shooter, target, targets){


    let range = shooter.gun.range * 200;

    if (target && target.alive && shooter.alive && State.game.physics.arcade.distanceBetween(shooter, target) <= range) {
        shooter.gun.shoot(State, shooter, target);
    }

    else if(targets){
        
        for(let targetsIndex in targets){

            targets[targetsIndex].forEachAlive(
                function(individual){
                    if (shooter.alive && State.game.physics.arcade.distanceBetween(shooter, individual) <= range) {
                        shooter.gun.shoot(State, shooter, individual);
                    }
                }
            );
        }
        
    }

};