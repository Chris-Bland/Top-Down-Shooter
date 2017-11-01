var Rifle = function() {};

Rifle.prototype = {

    create: function(State, gunHolderTint){
        return Bullet.prototype.create(State, 0.4, gunHolderTint, 20, 10);

    },
    
    range: 3,

    shoot: function(State, shooter, target){
    
            if (State.game.time.now > shooter.shootTime) {  
                let bullet = shooter.bullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(shooter.x, (shooter.y + State.game.rnd.between(-10, 10)));
                    bullet.body.velocity.x = 1000;
                    shooter.shootTime = State.game.time.now + 100; //fire rate determinate
                    if(target == State.game.input.activePointer){bullet.rotation = State.game.physics.arcade.moveToPointer(bullet, 1000, State.game.input.activePointer);}
                    else{bullet.rotation = State.game.physics.arcade.moveToXY(bullet, target.x, target.y, 1000);} 
                    bullet.lifespan = this.range * 160;
         
                    if(shooter != State.player){
                        if (shooter != 'tower'){
                            rifleAudioNpc.play();
                        }
                         rifleAudioTower.play();
                    }else {
                        rifleAudioPlayer.play();
                    }
          

                }
            }
    }

};