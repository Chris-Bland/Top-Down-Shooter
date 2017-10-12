var Pistol = function() {};

Pistol.prototype = {

    create: function(State, gunHolder){

        //create if statement based on gunholder for the gun bullet tint

        //bullet creation based on type
        //damage set on type
        return Bullet.prototype.create(State, 0.5, null, 50, 10);

    },
    
    range: 2.4,

    shoot: function(State, shooter, target){
            if (State.game.time.now > shooter.shootTime) {  
                let bullet = shooter.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(shooter.x, shooter.y);
                    bullet.body.velocity.x = 1000;
                    shooter.shootTime = State.game.time.now + 500; //fire rate determinate
                    if(target == State.game.input.activePointer){bullet.rotation = State.game.physics.arcade.moveToPointer(bullet, 1000, State.game.input.activePointer);}
                    else{bullet.rotation = State.game.physics.arcade.moveToXY(bullet, target.x, target.y, 1000);} 
                    bullet.lifespan = this.range * 160;
                }
            }
    }

};