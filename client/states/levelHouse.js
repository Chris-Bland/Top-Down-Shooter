LevelHouse = function (game) { };

LevelHouse.prototype = {
    
    create: function () {
        
        insideMap.prototype.create(this);
        Player.prototype.create(this);
        NPC.prototype.create(this);
        this.mercs = gameStatHandler.prototype.mercsAmount;
        this.mercTanks = gameStatHandler.prototype.mercTanksAmount;
        this.mercHealers = gameStatHandler.prototype.mercHealersAmount;
        insideMap.prototype.layForeground(this);
        shop.prototype.create(this);
        keyConfig(this);

        insideEvents.prototype.openingTween(this);

        Ui.prototype.create(this);
        insideText.prototype.create(this);

    },

    update: function () {
       Player.prototype.updateHouse(this);

       insideText.prototype.update(this);
       Ui.prototype.updateHouse(this);

       NPC.prototype.update(this);

        if (Phaser.Rectangle.containsPoint(this.map.exitRect, this.player.position)) {
            waveHandler.prototype.beenInHouse = true;
            this.game.state.start('levelOutside');
        }
    }

};
