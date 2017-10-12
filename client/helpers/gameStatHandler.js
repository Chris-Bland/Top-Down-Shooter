var gameStatHandler = function() {};

gameStatHandler.prototype = {

    newGame: true,

    create: function() {

        this.wave = 1;
        this.playerXP = 1;
        this.playerLevel = 1;
        this.mercsAmount = 1;
        this.currency = 1;
        this.towersAmount = 5;

    },

    save: function(State) {

        this.wave = State.wave;
        this.playerXP = State.player.playerXP;
        this.playerLevel = State.player.playerLevel;
        if(State.mercs){
            this.mercsAmount = State.mercs.countLiving();
        }
        else{
            this.mercsAmount = 0;
        }
        this.currency = State.player.currency;

    }

}