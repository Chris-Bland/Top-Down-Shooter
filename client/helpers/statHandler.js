function statHandler(State){

        updateCurrency(State);
        updateXP(State);
        updateHealth(State);
        updateLvl(State);
        updateUpgrades(State);

    }

    function updateCurrency(State) {
        let currencyBoost = (State.waveEnemies.countDead() * 5 * State.wave); 
        State.player.currency = State.player.currencyStart + currencyBoost;
    }
    
    
    function updateXP(State) {
        let XPBoost = (State.waveEnemies.countDead() * 2 * State.wave); 
        State.player.playerXP = State.player.playerXPStart + XPBoost;
    }
    
    function updateHealth(State){
        if (State.player.health <= 0) {
            gameStatHandler.prototype.save(State);
            State.game.state.start('levelHouse');
        }
        if (State.player.health <= 30) {
            State.player.tint = Math.random() * 0xffffff;
        }
    };
    
    function updateLvl(State){
        let currentLvl = State.player.playerLevel;
        State.player.playerLevel = Math.floor(Math.log2(State.player.playerXP));
        if(currentLvl < State.player.playerLevel){
            updateUpgrades(State);
            State.player.health = State.player.maxHealth;
        }
    };
    
    function updateUpgrades(State) {
        if(State.player.playerLevel > 1) {
            State.player.MOVE_SPEED = 500 + State.player.playerLevel * 5;
            State.mercs.MOVE_SPEED = State.player.MOVE_SPEED;
            State.player.maxHealth = 100 + (10 * State.player.playerLevel);
        }
    };