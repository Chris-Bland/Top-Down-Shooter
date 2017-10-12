var PistolEnemy = function(){};

PistolEnemy.prototype = {

    create: function(State){

        let spawn = spawnHandler(State.map.spawnPoints);
        let randomX = Math.random() * 50;
        let randomY = Math.random() * 50;
        let pistolEnemy = State.waveEnemies.create(spawn.x + randomX, spawn.y + randomY, 'shotgun-enemy');
        pistolEnemy.animations.add('shoot', [7, 15, 23], 7, true);
        pistolEnemy.animations.add('move', [0, 4, 5, 6, 12, 13, 14, 19, 20, 21, 22], 0, true);
        pistolEnemy.animations.add('idle', [0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18], 0, true);
        pistolEnemy.play('idle');
        pistolEnemy.anchor.setTo(0.5, 0.5);
        State.game.physics.enable(pistolEnemy, Phaser.Physics.ARCADE);
        pistolEnemy.body.immovable = false;
        pistolEnemy.body.collideWorldBounds = true;
        pistolEnemy.body.allowGravity = true;
        pistolEnemy.scale.setTo(0.3);
        pistolEnemy.body.velocity.x = 0;
        pistolEnemy.body.velocity.y = 0;
        pistolEnemy.health = 100;
        pistolEnemy.shootTime = 0;
        pistolEnemy.hitPoints = 3;
        pistolEnemy.gun = Pistol.prototype;
        pistolEnemy.bullets = pistolEnemy.gun.create(State);
        pistolEnemy.MOVE_SPEED = State.player.MOVE_SPEED * .9;
        behaviorsObj.prototype.findPathTo(State, 87, 6, pistolEnemy.x, pistolEnemy.y, pistolEnemy)
        

    }

};
