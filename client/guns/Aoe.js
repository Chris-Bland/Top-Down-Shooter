var Aoe = function() {};

Aoe.prototype = {

    create: function(State, gunHolder){
        //A
        //create if statement based on gunholder for the gun bullet tint

        //bullet creation based on type
        //damage set on type
        return Bullet.prototype.create(State, 0.4, null, 25, 10);

    },
    
    range: 3,

    shoot: function(State, shooter, target){
            if (State.game.time.now > shooter.shootTime) {  
                let bullet = shooter.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(shooter.x, shooter.y);
                    bullet.body.velocity.x = 1000;
                    shooter.shootTime = State.game.time.now + 100; //fire rate determinate
                    if(target == State.game.input.activePointer){bullet.rotation = State.game.physics.arcade.moveToPointer(bullet, 1000, State.game.input.activePointer);}
                    else{bullet.rotation = State.game.physics.arcade.moveToXY(bullet, target.x, target.y, 1000);} 
                    bullet.lifespan = this.range * 160;
                }
                bullet = shooter.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(shooter.x, shooter.y);
                    bullet.body.velocity.x = 1000;
                    if(target == State.game.input.activePointer){bullet.rotation = State.game.physics.arcade.moveToXY(bullet, -State.game.input.activePointer.x, State.game.input.activePointer.y, 1000);}
                    else{bullet.rotation = State.game.physics.arcade.moveToXY(bullet, -target.x, target.y, 1000);} 
                    bullet.lifespan = this.range * 160;
                }
                bullet = shooter.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(shooter.x, shooter.y);
                    bullet.body.velocity.x = 1000;
                    if(target == State.game.input.activePointer){bullet.rotation = State.game.physics.arcade.moveToXY(bullet, -State.game.input.activePointer.x, -State.game.input.activePointer.y, 1000);}
                    else{bullet.rotation = State.game.physics.arcade.moveToXY(bullet, -target.x, -target.y, 1000);} 
                    bullet.lifespan = this.range * 160;
                }
                bullet = shooter.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(shooter.x, shooter.y);
                    bullet.body.velocity.x = 1000;
                    if(target == State.game.input.activePointer){bullet.rotation = State.game.physics.arcade.moveToXY(bullet, State.game.input.activePointer.x, -State.game.input.activePointer.y, 1000);}
                    else{bullet.rotation = State.game.physics.arcade.moveToXY(bullet, target.x, -target.y, 1000);} 
                    bullet.lifespan = this.range * 160;
                }
            }
    }

};