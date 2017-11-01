var RifleEnemy = function(){};

RifleEnemy.prototype = {

    create: function(State){

    
        var spawn = spawnHandler(State.map.spawnPoints);
        var randomX = Math.random() * 50;
        var randomY = Math.random() * 50;
        var rifleEnemy = State.waveEnemies.create(spawn.x + randomX, spawn.y + randomY, 'shotgun-enemy');
        rifleEnemy.animations.add('shoot', [7, 15, 23], 7, true);
        rifleEnemy.animations.add('move', [0, 4, 5, 6, 12, 13, 14, 19, 20, 21, 22], 0, true);
        rifleEnemy.animations.add('idle', [0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18], 0, true);
        rifleEnemy.play('idle');
        rifleEnemy.anchor.setTo(0.5, 0.5);
        State.game.physics.enable(rifleEnemy, Phaser.Physics.ARCADE);
        rifleEnemy.body.immovable = false;
        rifleEnemy.body.collideWorldBounds = true;
        rifleEnemy.body.allowGravity = true;
        rifleEnemy.scale.setTo(0.3);
        rifleEnemy.body.velocity.x = 0;
        rifleEnemy.body.velocity.y = 0;
        rifleEnemy.health = 100;
        rifleEnemy.shootTime = 0;
        rifleEnemy.hitPoints = 3;
        rifleEnemy.gun = Shotgun.prototype;
        rifleEnemy.bullets = rifleEnemy.gun.create(State, 0x800080);
        rifleEnemy.MOVE_SPEED = State.player.MOVE_SPEED * .9;
        behaviorsObj.prototype.findPathTo(State, 87, 6, rifleEnemy.x, rifleEnemy.y, rifleEnemy)
        

    }

};