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
        // Merc.prototype.update(this);


        Ui.prototype.updateDungeon(this);
        dungeonText.prototype.update(this);
        this.boss.angle += 15;
        this.boss.gun.shootDungeon(this, this.boss);
        if (Phaser.Rectangle.containsPoint(this.map.exitRect, this.player.position)) {
            waveHandler.prototype.beenInHouse = true;
            this.game.state.start('levelOutside');
        }
    },

    dungeonBoss: function (State) {
        State.boss = game.add.sprite(game.world.centerX - 300, game.world.centerY, 'flashlight-enemy');
       State.boss.enableBody = true;
    //    game.physics.p2.enable(State.boss);
    //    State.boss.body.velocity.x = 0;
    //    State.boss.body.velocity.x = 0;
      
        State.boss.MOVE_SPEED = State.player.Move_SPEED - 100;
        State.boss.tint = 0xff0000;
        State.boss.anchor.set(0.5);
        State.boss.scale.set(.75);
        State.boss.animations.add('melee', [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 35, true);
        State.boss.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
        State.boss.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
        State.boss.play('melee');
    //     boss.animations._anims.attack.speed = 20;
    //     boss.play('attack');
    //     boss.maxHealth = 1000 * (State.wave / 5);
    //     boss.health = boss.maxHealth;
    //     boss.health = boss.health;
    //     boss.maxHealth = boss.maxHealth;
        game.physics.arcade.enable(State.boss);
    //     boss.body.setSize(200, 300, 100, 50);
        State.boss.body.collideWorldBounds = true;
        State.boss.shootTime = 0;
        State.boss.gun = Laser.prototype;
        State.boss.bullets = State.boss.gun.create(State);
    }
};
