var Enemy = function(){};

Enemy.prototype = {

    create: function(State){

        let spawn = spawnHandler(State.map.spawnPoints);
        let randomX = Math.random() * 50;
        let randomY = Math.random() * 50;
        let enemy = State.waveEnemies.create(spawn.x + randomX, spawn.y + randomY, 'npc');
        // enemy.animations.add('melee', [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 35, true);
        // enemy.animations.add('move', [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], 46, true);
        // enemy.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 14, true);
        // enemy.play('idle');
        enemy.animations.add('idle', Phaser.Animation.generateFrameNames('skeleton-idle_', 1, 16, '.png', 2), 16, true, false);
        enemy.animations.add('move', Phaser.Animation.generateFrameNames('skeleton-move_', 1, 16, '.png', 2), 16, true, false);
        enemy.animations.add('attack', Phaser.Animation.generateFrameNames('skeleton-attack_', 1, 8, '.png', 2), 8, true, false);
        enemy.play('idle');
        enemy.anchor.setTo(0.5, 0.5);
        game.physics.enable(enemy, Phaser.Physics.ARCADE);
        enemy.body.immovable = true;
        enemy.body.collideWorldBounds = true;
        enemy.body.allowGravity = true;
        enemy.scale.setTo(0.3);
        enemy.body.velocity.x = 0;
        enemy.body.velocity.y = 0;
        enemy.health = 100;
        enemy.hitPoints = 4;
        enemy.MOVE_SPEED = State.player.MOVE_SPEED * 1;
        behaviorsObj.prototype.findPathTo(State, 87, 6, enemy.x, enemy.y, enemy)

    }

};