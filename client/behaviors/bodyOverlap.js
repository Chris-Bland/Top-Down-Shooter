behaviorsObj.prototype.bodyOverlap = function(State, body, targets){
    
        for(target in targets){
            State.game.physics.arcade.overlap(body, targets[target], function(body, individual){
                game.camera.shake(0.005, 500);
                individual.damage(body.hitPoints);
            });
        }
        
}