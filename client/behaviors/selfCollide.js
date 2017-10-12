behaviorsObj.prototype.selfCollide = function (State, body){
    
        State.game.physics.arcade.collide(body, body);
        
}