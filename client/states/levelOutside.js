
LevelOutside = function () { };

LevelOutside.prototype = {

        create: function () {

            dungeonMusic.stop();
            music.play();
            outsideMap.prototype.create(this);

            if(gameStatHandler.prototype.newGame){
                gameStatHandler.prototype.create();
                gameStatHandler.prototype.newGame = false;
            }

            this.wave = gameStatHandler.prototype.wave;
            Player.prototype.create(this);
            Merc.prototype.create(this);
            MercTank.prototype.create(this);
            MercHealer.prototype.create(this);
       

            outsideMap.prototype.layForeground(this);
            Tower.prototype.create(this);
            waveHandler.prototype.create(this);

            keyConfig(this);
            Ui.prototype.create(this);
            outsideText.prototype.create(this);
        
            outsideEvents.prototype.openingTween(this);
            House.prototype.create(this);

        },

        update: function () {
           
            outsideText.prototype.update(this);
            House.prototype.update(this);
            Player.prototype.update(this);
            Merc.prototype.update(this);
            MercTank.prototype.update(this);
            MercHealer.prototype.update(this);
            Tower.prototype.update(this);
            Ui.prototype.updateOutside(this);
            waveHandler.prototype.update(this);

            if (Phaser.Rectangle.containsPoint(this.map.dungeonExitRectangle, this.player.position) ) {
                this.game.state.start('Dungeon');
            }
        }

};


// && gameStatHandler.prototype.dungeonKey === true