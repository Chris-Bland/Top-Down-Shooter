var ShotgunEnemy = function(){};

ShotgunEnemy.prototype = {

    create: function(State){


        var spawn = spawnHandler(State.map.spawnPoints);
        var randomX = Math.random() * 50;
        var randomY = Math.random() * 50;
        var shotgunEnemy = State.waveEnemies.create(spawn.x + randomX, spawn.y + randomY, 'shotgun-enemy');
        shotgunEnemy.animations.add('shoot', [7, 15, 23], 7, true);
        shotgunEnemy.animations.add('move', [0, 4, 5, 6, 12, 13, 14, 19, 20, 21, 22], 0, true);
        shotgunEnemy.animations.add('idle', [0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18], 0, true);
        shotgunEnemy.play('idle');
        shotgunEnemy.anchor.setTo(0.5, 0.5);
        State.game.physics.enable(shotgunEnemy, Phaser.Physics.ARCADE);
        shotgunEnemy.body.immovable = false;
        shotgunEnemy.body.collideWorldBounds = true;
        shotgunEnemy.body.allowGravity = true;
        shotgunEnemy.scale.setTo(0.3);
        shotgunEnemy.body.velocity.x = 0;
        shotgunEnemy.body.velocity.y = 0;
        shotgunEnemy.health = 100;
        shotgunEnemy.shootTime = 0;
        shotgunEnemy.hitPoints = 3;
        shotgunEnemy.gun = Shotgun.prototype;
        shotgunEnemy.bullets = shotgunEnemy.gun.create(State, 0x800080);
        shotgunEnemy.MOVE_SPEED = State.player.MOVE_SPEED * .8;
        behaviorsObj.prototype.findPathTo(State, 87, 6, shotgunEnemy.x, shotgunEnemy.y, shotgunEnemy)
    }

};