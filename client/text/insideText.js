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

       
        State.text.currencyText = State.game.add.text(540, 5, "currency", { fontSize: '32px', fill: '#fff' });
        State.text.currencyText.fixedToCamera = true;

        State.text.towerText = State.game.add.text(12,75, "wave", { fontSize: '15px', fill: '#fff' });
        State.text.towerText.fixedToCamera = true;
        //Set text for house
        //Add some color??

    },

    update: function(State){
        State.text.healthText.text = State.player.health + "/" + State.player.maxHealth;
        State.text.levelText.text =  State.player.playerLevel;
        State.text.XPText.text = State.player.playerXP + "/" + Math.pow(2, (State.player.playerLevel+1));
        State.text.currencyText.text = gameStatHandler.prototype.currency;
        State.text.towerText.text = 'Towers: ' + gameStatHandler.prototype.towersAmount;
        //Update text for house

    }

};