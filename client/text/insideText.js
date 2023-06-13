var insideText = function (){};

insideText.prototype = {

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

       
        State.text.currencyText = State.game.add.text(540, 42, "currency", { fontSize: '20px', fill: '#fff' });
        State.text.currencyText.fixedToCamera = true;

        State.text.towerText = State.game.add.text(12,75, "wave", { fontSize: '15px', fill: '#fff' });
        State.text.towerText.fixedToCamera = true;
        
        State.text.houseText = State.game.add.text(100,25, "house", { fontSize: '15px', fill: '#fff' });
        State.text.houseText.fixedToCamera = true;

    },

    update: function(State){
        State.text.healthText.text = State.player.health + "/" + State.player.maxHealth;
        State.text.levelText.text =  State.player.playerLevel;
        State.text.XPText.text = State.player.playerXP + "/" + Math.pow(2, (State.player.playerLevel+1));
        State.text.currencyText.text = gameStatHandler.prototype.currency;
        State.text.towerText.text = 'TTC: ' + gameStatHandler.prototype.towersAmount;
        State.text.houseText.text = 'House: ' + gameStatHandler.prototype.houseLevel;

    }

};
