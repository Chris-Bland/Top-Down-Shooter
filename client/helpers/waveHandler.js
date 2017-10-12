var waveHandler = function() {};


waveHandler.prototype = {

    incrementTime: 0,

    beenInHouse: false,

    create: function(State) {

        if(State.wave % 5 == 1 && State.wave > 1 && !this.beenInHouse){
            
            gameStatHandler.prototype.save(State);
            State.game.state.start('levelHouse');
    
        }
        else{

            beenInHouse = false;
            State.waveEnemies = null;
            State.waveEnemies = State.game.add.group();
            Enemy.prototype.create(State);
            State.waveEnemies.enableBody = true;
            State.waveEnemies.physicsBodyType = Phaser.Physics.ARCADE;

        }

    },

    update: function(State) {

            if (State.waveEnemies.length == State.waveEnemies.countDead()) {
        
               State.wave += 1;
               State.player.playerXPStart = State.player.playerXP;
               State.player.currencyStart = State.player.currency;
                this.create(State);
        
            }
            else{
        
                this.increment(State);
        
            }

            behaviorsObj.prototype.selfCollide(State, State.waveEnemies);
            
            State.waveEnemies.forEachAlive(function(enemy){
    
                behaviorsObj.prototype.bodyCollide(State, enemy);
                behaviorsObj.prototype.bodyOverlap(State, enemy, [State.player, State.mercs]);
                behaviorsObj.prototype.enemyMove(State, enemy);
                if(enemy.gun){
                    behaviorsObj.prototype.bulletCollide(State, enemy.bullets);
                    behaviorsObj.prototype.bulletOverlap(State, enemy.bullets, [State.player, State.mercs]);
                    behaviorsObj.prototype.shoot(State, enemy, State.player, [State.mercs]);
                }
            }); 
        

    },

    increment: function(State) {

        if(State.game.time.now > this.incrementTime){
            this.incrementTime = State.game.time.now + 400;
            if(State.wave * 5 > State.waveEnemies.length){
                Enemy.prototype.create(State);
            }
            else if((State.wave * 5) + (State.wave * 2) > State.waveEnemies.length){
                PistolEnemy.prototype.create(State);
            }
            else if((State.wave * 5) + (State.wave * 2) + Math.floor(State.wave * .2) > State.waveEnemies.length){
                ShotgunEnemy.prototype.create(State);
            }
            else if((State.wave * 5) + (State.wave * 2) + Math.floor(State.wave * .2) + Math.floor(State.wave * .1) > State.waveEnemies.length){
                RifleEnemy.prototype.create(State);
            }
            else if((State.wave * 5) + (State.wave * 2) + Math.floor(State.wave * .2) + Math.floor(State.wave * .1) == State.waveEnemies.length && State.wave % 5 == 0){
               
                Boss.prototype.create(State);
            }
        }

    }

};


