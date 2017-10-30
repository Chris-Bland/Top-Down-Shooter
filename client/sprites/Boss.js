function Boss() { }

Boss.prototype = {

    create: function (State) {
        
        let spawnPoint = State.map.bossSpawn;
        let boss = State.waveEnemies.create(spawnPoint.x, spawnPoint.y, 'helio');
        State.boss = boss;
        boss.MOVE_SPEED = State.player.Move_SPEED - 100;
        // boss.tint = 0xff0000;
        boss.anchor.set(0.5);
        boss.scale.set(1);

        // boss.animations.add('melee', [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 35, true);
        // boss.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
        // boss.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
        // boss.play('idle');
        boss.animations.add('move', Phaser.Animation.generateFrameNames('helio-', 1, 1, '.png', 2), 1, true, false);
        boss.animations.add('attack', Phaser.Animation.generateFrameNames('helio-', 1, 8, '.png', 2), 1, true, false);
        boss.animations._anims.attack.speed = 20;
        boss.play('attack');
        boss.maxHealth = 1000 * (State.wave / 5);
        boss.health = boss.maxHealth;
        State.boss.health = boss.health;
        State.boss.maxHealth = boss.maxHealth;
        State.boss.alpha = 0;
        game.physics.arcade.enable(boss);
        boss.body.setSize(200, 300, 100, 50);
        boss.body.collideWorldBounds = true;
        boss.shootTime = 0;
        boss.hitPoints = 5 * (State.wave / 5);
        bossSpawn.play();
        // behaviorsObj.prototype.findPathTo(State, 87, 6, boss.x, boss.y, boss)
        boss.rotation = State.game.physics.arcade.angleToXY(boss, State.player.x, State.player.y);

    
        if (State.wave % 35 == 0) {
            boss.gun = Laser.prototype;
            boss.bullets = boss.gun.create(State);
        }
        else if (State.wave % 30 == 0) {
            boss.gun = Laser.prototype;
            boss.bullets = boss.gun.create(State);
        }
        else if (State.wave % 25 == 0) {
            boss.gun = Sniper.prototype;
            boss.bullets = boss.gun.create(State);
        }
        else if (State.wave % 20 == 0) {
            boss.gun = Rifle.prototype;
            boss.bullets = boss.gun.create(State);
        }
        else if (State.wave % 15 == 0) {
            boss.gun = Shotgun.prototype;
            boss.bullets = boss.gun.create(State);
        }
        else if (State.wave % 10 == 0) {
            boss.gun = Aoe.prototype;
            boss.bullets = boss.gun.create(State);
        }
        else if (State.wave % 5 == 0) {
            boss.gun = Pistol.prototype;
            boss.bullets = boss.gun.create(State);
        }
        State.bossAlive = true;
    }

};