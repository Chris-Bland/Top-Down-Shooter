var outsideText = function (){};

outsideText.prototype = {

    create: function(State){

        State.text = {};
        State.text.healthText = State.game.add.text(0, 0, "health", { fontSize: '32px', fill: '#fff' });
        State.text.healthText.fixedToCamera = true;
        State.text.levelText = State.game.add.text(0, 30, "level", { fontSize: '32px', fill: '#fff' });
        State.text.levelText.fixedToCamera = true;
        State.text.XPText = State.game.add.text(0, 60, "XP", { fontSize: '32px', fill: '#fff' });
        State.text.XPText.fixedToCamera = true;
        State.text.waveText = State.game.add.text(1000, 0, "wave", { fontSize: '32px', fill: '#fff' });
        State.text.waveText.fixedToCamera = true;
        State.text.mercText = State.game.add.text(500, 30, "merc", { fontSize: '32px', fill: '#fff' });
        State.text.mercText.fixedToCamera = true;
        State.text.currencyText = State.game.add.text(500, 0, "currency", { fontSize: '32px', fill: '#fff' });
        State.text.currencyText.fixedToCamera = true;
        State.text.bossText = State.game.add.text(1000, 30, "boss", { fontSize: '32px', fill: '#fff' });
        State.text.bossText.fixedToCamera = true;
        //Set text for house
        //Add some color??

    },

    update: function(State){

        State.text.healthText.text = 'Player Health: ' + State.player.health + "/" + State.player.maxHealth;
        State.text.levelText.text = 'Player Level: ' + State.player.playerLevel;
        State.text.XPText.text = 'Player XP: ' + State.player.playerXP + "/" + Math.pow(2, (State.player.playerLevel+1));
        State.text.waveText.text = 'Wave: ' + State.wave;
        State.text.mercText.text = 'Mercs: ' + (State.mercs.length - State.mercs.countDead()) + "/" + State.mercs.length;
        State.text.currencyText.text = 'Currency: ' + State.player.currency;
        if((this.wave * 10) + (this.wave * 5) + Math.floor(this.wave * .35) + Math.floor(this.wave * .2) + 1 == State.waveEnemies.length){
            State.text.bossText.text = 'Boss Health: ' + State.boss.health + "/" + State.boss.maxHealth;
        }else{
            State.text.bossText.text = '';
        }
        //Update text for house

    }

};