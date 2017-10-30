
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
       

            outsideMap.prototype.layForeground(this);
            Tower.prototype.create(this);
            waveHandler.prototype.create(this);

            keyConfig(this);
            Ui.prototype.create(this);
            outsideText.prototype.create(this);
        
            outsideEvents.prototype.openingTween(this);

        },

        update: function () {
   
            outsideText.prototype.update(this);
            //sprite updates
            House.prototype.update(this);
            Player.prototype.update(this);
            Merc.prototype.update(this);
            Tower.prototype.update(this);
            Ui.prototype.update(this);
            waveHandler.prototype.update(this);

            if (Phaser.Rectangle.containsPoint(this.map.dungeonExitRectangle, this.player.position)) {
                this.game.state.start('Dungeon');
            }
        }

};


