behaviorsObj.prototype.bulletCollide = function (State, bullet){
    
        State.game.physics.arcade.collide(bullet, State.map.collisionLayer, function(bullet){bullet.kill();});
        
}