behaviorsObj.prototype.shoot = function(State, shooter, target, targets){
    
        var range = shooter.gun.range * 200;
    
        var found = false;

      
        if (target && target.alive && shooter.alive && State.game.physics.arcade.distanceBetween(shooter, target) <= range) {

            shooter.rotation = State.game.physics.arcade.angleToXY(shooter, target.worldPosition.x, target.worldPosition.y);
            shooter.gun.shoot(State, shooter, target);
        }
    
        else if(targets){
            for(var targetsIndex in targets){
    
                targets[targetsIndex].forEachAlive(
                    function(individual){
                      
                        if (!found && shooter.alive && State.game.physics.arcade.distanceBetween(shooter, individual) <= range) {
                            shooter.rotation = State.game.physics.arcade.angleToXY(shooter, individual.position.x, individual.position.y);
                            shooter.gun.shoot(State, shooter, individual);
                            found = true;
                            if(shooter.key === 'tower' || shooter.key === 'boss'){
                                shooter.play('shoot');
                            }
                        }
                    }
                );
            }
            
        }
    
    };