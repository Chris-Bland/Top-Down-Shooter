LevelHouse = function (game) { };

LevelHouse.prototype = {
    
    create: function () {
        
        insideMap.prototype.create(this);

        Player.prototype.create(this);

        NPC.prototype.create(this);

        insideMap.prototype.layForeground(this);

        insideText.prototype.create(this);

        keyConfig(this);

        insideEvents.prototype.openingTween(this);

    },

    update: function () {
       Player.prototype.updateHouse(this);

       insideText.prototype.update(this);

       NPC.prototype.update(this);

        if (Phaser.Rectangle.containsPoint(this.map.exitRect, this.player.position)) {
            waveHandler.prototype.beenInHouse = true;
            this.game.state.start('levelOutside');
        }
    }

};
