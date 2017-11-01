var Shotgun = function() {};

Shotgun.prototype = {

    create: function(State, gunHolderTint){
        return Bullet.prototype.create(State, 0.5, gunHolderTint, 25, 25);

    },
    
    range: 1.7,

    shoot: function(State, shooter, target){
   
            let shotRatio = State.game.physics.arcade.distanceToXY(shooter, target.x, target.y)/2;
            if (State.game.time.now > shooter.shootTime) {  
                let bullet = shooter.bullets.getFirstExists(false);
                // shotgunAudio.stop();
                rocketAudioNpc.play();
                if (bullet) {
                    bullet.reset(shooter.x, shooter.y);
                    bullet.body.velocity.x = 1000;
                    shooter.shootTime = State.game.time.now + 700; //fire rate determinate
                    if(target == State.game.input.activePointer){bullet.rotation = State.game.physics.arcade.moveToPointer(bullet, 1000, target);}
                    else{bullet.rotation = State.game.physics.arcade.moveToXY(bullet, target.x, target.y, 1000);} 
                    bullet.lifespan = this.range * 160;
                }
                bullet = shooter.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(shooter.x, shooter.y);
                    bullet.body.velocity.x = 1000;
                    if(target == State.game.input.activePointer){bullet.rotation = State.game.physics.arcade.moveToXY(bullet, (target.x), (target.y), 1000);}
                    else{bullet.rotation = State.game.physics.arcade.moveToXY(bullet, (target.x+shotRatio), (target.y-shotRatio), 1000);} 
                    bullet.lifespan = this.range * 160;
                }
                bullet = shooter.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(shooter.x, shooter.y);
                    bullet.body.velocity.x = 1000;
                    if(target == State.game.input.activePointer){bullet.rotation = State.game.physics.arcade.moveToXY(bullet, (target.x), (target.y), 1000);}
                    else{bullet.rotation = State.game.physics.arcade.moveToXY(bullet, (target.x-shotRatio), (target.y+shotRatio), 1000);} 
                    bullet.lifespan = this.range * 160;
                }
            }
    }

};