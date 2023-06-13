behaviorsObj.prototype.slowShoot = function(State, shooter, target, targets){

    let range = shooter.gun.range * 200;

    let found = false;

    if (target && target.alive && target.health < target.maxHealth && shooter.alive && State.game.physics.arcade.distanceBetween(shooter, target) <= range) {

        shooter.rotation = State.game.physics.arcade.angleToXY(shooter, target.worldPosition.x, target.worldPosition.y);
        shooter.gun.shoot(State, shooter, target);
    }

    else if(targets){
        for(let targetsIndex in targets){

            targets[targetsIndex].forEachAlive(
                function(individual){
                    if (!found && shooter.alive && target.health < target.maxHealth && State.game.physics.arcade.distanceBetween(shooter, individual) <= range) {
                        shooter.rotation = State.game.physics.arcade.angleToXY(shooter, individual.position.x, individual.position.y);
                        shooter.gun.shoot(State, shooter, individual);
                         //Applies shot duration slow based on shop purchase
                        shooter.gun.slow(State,shooter,individual);
                        found = true;
                    }
                }
            );
        }

    }

};
