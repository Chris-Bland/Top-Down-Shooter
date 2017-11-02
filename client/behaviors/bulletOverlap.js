behaviorsObj.prototype.bulletOverlap = function(State, bullets, targets){

        for(let target in targets){
            State.game.physics.arcade.overlap(targets[target], bullets, function(individual, bullet){
                individual.damage(bullet.hitPoints);
                bullet.kill();
            });
        }
        
}