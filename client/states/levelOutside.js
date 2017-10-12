
LevelOutside = function () { };

LevelOutside.prototype = {

        create: function () {

            

            outsideMap.prototype.create(this);

            if(gameStatHandler.prototype.newGame){
                gameStatHandler.prototype.create();
                gameStatHandler.prototype.newGame = false;
            }

            this.wave = gameStatHandler.prototype.wave;

            House.prototype.create(this);
            Player.prototype.create(this);
            Merc.prototype.create(this);
            Tower.prototype.create(this);
            waveHandler.prototype.create(this);

            outsideMap.prototype.layForeground(this);

            keyConfig(this);

            outsideText.prototype.create(this);

            outsideEvents.prototype.openingTween(this);
        },

        update: function () {

            // console.log(this.game.input.activePointer.x);
            // console.log(this.game.input.activePointer.y);

            outsideText.prototype.update(this);

            //sprite updates
            House.prototype.update(this);
            Player.prototype.update(this);
            Merc.prototype.update(this);
            Tower.prototype.update(this);
            waveHandler.prototype.update(this);

        }

};


