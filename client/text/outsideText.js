var outsideText = function (){};

outsideText.prototype = {

    create: function(State){
        State.text = {};

        State.text.healthText = State.game.add.text(125, 6, "health", { fontSize: '10px', fill: '#fff' });
        State.text.healthText.fixedToCamera = true;
        State.text.healthText.anchor.setTo(0.5,0);
        State.text.levelText = State.game.add.text(70,48, "level", { fontSize: '15px', fill: '#fff' });
        State.text.levelText.fixedToCamera = true;
        State.text.XPText = State.game.add.text(125, 26, "XP", { fontSize: '10px', fill: '#fff' });
        State.text.XPText.fixedToCamera = true;
        State.text.XPText.anchor.setTo(.5,0);
        State.text.waveText = State.game.add.text(12,75, "wave", { fontSize: '15px', fill: '#fff' });
        State.text.waveText.fixedToCamera = true;
        State.text.mercText = State.game.add.text(110, 65, "merc", { fontSize: '15px', fill: '#fff' });
        State.text.mercText.fixedToCamera = true;
        State.text.currencyText = State.game.add.text(540, 5, "currency", { fontSize: '32px', fill: '#fff' });
        State.text.currencyText.fixedToCamera = true;
        State.text.houseText = State.game.add.text(1000, 5, "house", { fontSize: '32px', fill: '#fff' });
        State.text.houseText.fixedToCamera = true;
       
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
        State.text.houseText.text = State.house.health + "/" + State.house.maxHealth;
        //Update text for house

    }

};