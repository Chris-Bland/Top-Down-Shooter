behaviorsObj.prototype.bulletCollide = function (State, bullet){
    
        State.game.physics.arcade.collide(bullet, State.map.bulletCollisionLayer, function(bullet){bullet.kill();});
        
}