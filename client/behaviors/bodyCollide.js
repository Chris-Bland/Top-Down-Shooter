behaviorsObj.prototype.bodyCollide = function (State, body){
    
        State.game.physics.arcade.collide(body, State.map.collisionLayer);
        
}