var Dungeon = function (game) { };

Dungeon.prototype = {

    create: function () {
        this.wave = 5;
        music.stop();
        dungeonMusic.play();
        dungeonMap.prototype.create(this);
        Player.prototype.create(this);
        Merc.prototype.create(this);
        MercTank.prototype.create(this);
        MercHealer.prototype.create(this);
        this.dungeonBoss(this);

        dungeonMap.prototype.layForeground(this);
        keyConfig(this);

        dungeonEvents.prototype.openingTween(this);
        Ui.prototype.create(this);
        dungeonText.prototype.create(this);
        this.isDungeon = true;
    },

    update: function () {
        Player.prototype.update(this);
        Merc.prototype.update(this);
        MercTank.prototype.update(this);
        MercHealer.prototype.update(this);
        Ui.prototype.updateDungeon(this);
        dungeonText.prototype.update(this);
        this.boss.angle += 30;
        this.boss.gun.shootDungeon(this, this.boss);
        if (Phaser.Rectangle.containsPoint(this.map.exitRect, this.player.position)) {
            waveHandler.prototype.beenInHouse = true;
            this.game.state.start('levelOutside');
        }
    },


};
