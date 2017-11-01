function Tower() { }

Tower.prototype = {

    create: function (State) {

        var towers = game.add.group();
        for (var i = 0; i < gameStatHandler.prototype.towersAmount; i++) {
            var tower = towers.create(State.map.towerPoints[i].x, State.map.towerPoints[i].y, 'tower');
            tower.anchor.set(0.5, .5);
            tower.scale.set(.8);
            tower.animations.add('idle', Phaser.Animation.generateFrameNames('tower-', 1, '.png', 2), 1, true, false);
            tower.animations.add('shoot', Phaser.Animation.generateFrameNames('tower-', 1, 4, '.png', 2), 4, true, false);
            tower.play('idle');
            game.physics.arcade.enable(tower);
            tower.body.setSize(100, 150, 100, 50);
            tower.body.collideWorldBounds = true;
            tower.shootTime = 0;

            var level = State.player.playerLevel;


            if (level <= 10) {
                tower.gun = Rifle.prototype;
                tower.bullets = tower.gun.create(State, 0xff0000);
            }

            else if (level > 10 || level <= 20) {
                tower.gun = Aoe.prototype;
                tower.bullets = tower.gun.create(State, 0xff0000);
            }

            else if (level > 21 || level <= 30) {
                tower.gun = Sniper.prototype;
                tower.bullets = tower.gun.create(State, 0xff0000);
            }

            else {
                tower.gun = Laser.prototype;
                tower.bullets = tower.gun.create(State, 0xff0000);
            }
        }

        State.towers = towers;

    },

    update: function (State) {
        State.towers.forEachAlive(function (tower) {
            behaviorsObj.prototype.bulletCollide(State, tower.bullets);
            behaviorsObj.prototype.bulletOverlap(State, tower.bullets, [State.waveEnemies]);
            behaviorsObj.prototype.shoot(State, tower, State.boss, [State.waveEnemies]);

        });

    }

};
