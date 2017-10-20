var outsideText = function (){};

outsideText.prototype = {

    create: function(State){
        State.text = {};

        State.text.healthText = State.game.add.text(140, 0, "health", { fontSize: '20px', fill: '#fff' });
        State.text.healthText.fixedToCamera = true;
        State.text.healthText.anchor.setTo(0.5,0);
        State.text.levelText = State.game.add.text(70,48, "level", { fontSize: '15px', fill: '#fff' });
        State.text.levelText.fixedToCamera = true;
        State.text.XPText = State.game.add.text(140, 20, "XP", { fontSize: '20px', fill: '#fff' });
        State.text.XPText.fixedToCamera = true;
        State.text.XPText.anchor.setTo(.5,0);
        State.text.waveText = State.game.add.text(12,75, "wave", { fontSize: '15px', fill: '#fff' });
        State.text.waveText.fixedToCamera = true;
        State.text.mercText = State.game.add.text(110, 65, "merc", { fontSize: '15px', fill: '#fff' });
        State.text.mercText.fixedToCamera = true;
        State.text.currencyText = State.game.add.text(540, 5, "currency", { fontSize: '32px', fill: '#fff' });
        State.text.currencyText.fixedToCamera = true;
        State.text.bossText = State.game.add.text(1000, 30, "boss", { fontSize: '32px', fill: '#fff' });
        State.text.bossText.fixedToCamera = true;
        //Set text for house

    },

    update: function(State){

        State.text.healthText.text = State.player.health + "/" + State.player.maxHealth;
        State.text.levelText.text =  State.player.playerLevel;
        State.text.XPText.text = State.player.playerXP + "/" + Math.pow(2, (State.player.playerLevel+1));
        State.text.waveText.text = 'Wave ' + State.wave;
        // State.text.mercText.text = 'Mercs: ' + (State.mercs.length - State.mercs.countDead()) + "/" + State.mercs.length;
        State.text.mercText.text = 'Mercs';        
        State.text.currencyText.text =State.player.currency;
        if((this.wave * 10) + (this.wave * 5) + Math.floor(this.wave * .35) + Math.floor(this.wave * .2) + 1 == State.waveEnemies.length){
            State.text.bossText.text = 'Boss Health: ' + State.boss.health + "/" + State.boss.maxHealth;
        }else{
            State.text.bossText.text = '';
        }
        //Update text for house

    }

};