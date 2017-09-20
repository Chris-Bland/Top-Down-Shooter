function Enemies (State, spawnPoints) { // Make based on player level and add boss based on wave

    let enemiesTotal = State.player.playerLevel * 15;
    let enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (let i = 0; i < enemiesTotal; i++) {
        let spawn = this.chooseSpawn(spawnPoints);
        let randomX = Math.random() * 300;
        let randomY = Math.random() * 300;
        let enemy = enemies.create(spawn.x + randomX, spawn.y + randomY, 'flashlight-enemy');
        enemy.animations.add('melee', [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 35, true);
        enemy.animations.add('move', [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], 46, true);
        enemy.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 14, true);
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
    }

    State.enemies = enemies;



    let shotgunEnemiesTotal = State.player.playerLevel * 10;
    let shotgunEnemies = game.add.group();
    shotgunEnemies.enableBody = true;
    shotgunEnemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (let i = 0; i < shotgunEnemiesTotal; i++) {
        let spawn = this.chooseSpawn(spawnPoints);
        let randomX = Math.random() * 300;
        let randomY = Math.random() * 300;
        let shotgunEnemy = shotgunEnemies.create(spawn.x + randomX, spawn.y + randomY, 'shotgun-enemy');
        shotgunEnemy.animations.add('shoot', [7, 15, 23], 7, true);
        shotgunEnemy.animations.add('move', [0, 4, 5, 6, 12, 13, 14, 19, 20, 21, 22], 0, true);
        shotgunEnemy.animations.add('idle', [0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18], 0, true);
        shotgunEnemy.play('idle');
        shotgunEnemy.anchor.setTo(0.5, 0.5);
        game.physics.enable(shotgunEnemy, Phaser.Physics.ARCADE);
        shotgunEnemy.body.immovable = false;
        shotgunEnemy.body.collideWorldBounds = true;
        shotgunEnemy.body.allowGravity = true;
        shotgunEnemy.scale.setTo(0.3);
        shotgunEnemy.body.velocity.x = 0;
        shotgunEnemy.body.velocity.y = 0;
        shotgunEnemy.health = 100;
    }
    shotgunEnemies.shootTime = 0;

    State.shotgunEnemies = shotgunEnemies;

    let shotgunEnemyBullets = game.add.group();
    shotgunEnemyBullets.enableBody = true;
    shotgunEnemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    shotgunEnemyBullets.createMultiple(100, 'bullet');
    shotgunEnemyBullets.setAll('anchor.x', -1);
    shotgunEnemyBullets.setAll('anchor.y', -1);
    shotgunEnemyBullets.setAll('scale.x', 0.5);
    shotgunEnemyBullets.setAll('scale.y', 0.5);
    shotgunEnemyBullets.setAll('tint', 0xff0000);
    shotgunEnemyBullets.setAll('outOfBoundsKill', true);
    shotgunEnemyBullets.setAll('checkWorldBounds', true);

    State.shotgunEnemyBullets = shotgunEnemyBullets;

    State.prototype.enemyShot = function (bullet, enemy) {
        enemy.damage(20);
        bullet.kill();
    };

    State.prototype.shotgunEnemyShot = function (bullet, shotgunEnemy) {
        shotgunEnemy.damage(20);
        bullet.kill();
    };

    State.prototype.meleePlayer = function () {
        game.camera.shake(0.005, 500);
        State.player.damage(1);
    };

    State.prototype.meleeMerc = function (merc, bullet) {
        game.camera.shake(0.005, 500);
        merc.damage(1);
    };

    State.prototype.enemyupdate = function (enemy) {
        enemy.body.collideWorldBounds = true;
        enemy.body.velocity.x = 0;
        enemy.body.velocity.y = 0;
        enemy.rotation = game.physics.arcade.angleToXY(enemies, State.player.x, State.player.y);
        chasePlayer(State, enemy);
    };

    State.prototype.shotgunEnemyUpdate = function (shotgunEnemy) {
        shotgunEnemy.body.collideWorldBounds = true;
        shotgunEnemy.body.velocity.x = 0;
        shotgunEnemy.body.velocity.y = 0;
        shotgunEnemy.rotation = game.physics.arcade.angleToXY(shotgunEnemy, State.player.x, State.player.y);
        shootPlayer(State, shotgunEnemy);
    };

};

//*******************************************************************************RANDOM SPAWN LOC SELECT*******************************
function chooseSpawn (spawnPoints) {
    return spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
};

function chasePlayer(State, enemy) {
    if (
        (State.player.alive && game.physics.arcade.distanceBetween(State.player, enemy) > 30) &&
        (State.player.alive && game.physics.arcade.distanceBetween(State.player, enemy) < 600)
    ) {
        game.physics.arcade.moveToObject(enemy, State.player, 300);
        enemy.animations.play('move');
    }
    else if (State.player.alive && game.physics.arcade.distanceBetween(State.player, enemy) <= 30) {
        enemy.animations.play('melee');
    }
    else {
        enemy.animations.play('idle');
    }
};

function shootPlayer(State, shotgunEnemy) {
    if (
        (State.player.alive && game.physics.arcade.distanceBetween(State.player, shotgunEnemy) > 30) &&
        (State.player.alive && game.physics.arcade.distanceBetween(State.player, shotgunEnemy) < 600)
    ) {
        game.physics.arcade.moveToObject(shotgunEnemy, State.player, 150);
        shotgunEnemy.animations.play('move');
    }
    if (State.player.alive && game.physics.arcade.distanceBetween(State.player, shotgunEnemy) <= 400) {
        shotgunEnemy.animations.play('shoot');
        fireBullets(shotgunEnemy, State.player, State);
    }
    else {
        shotgunEnemy.animations.play('idle');
    }
};

function fireBullets (shotgunEnemy, player, State) {
    if (game.time.now > State.shotgunEnemies.shootTime) {
        let bullet = State.shotgunEnemyBullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(shotgunEnemy.x, shotgunEnemy.y + 8);
            bullet.body.velocity.x = 100;
            State.shotgunEnemies.shootTime = game.time.now + 200;
            bullet.rotation = game.physics.arcade.moveToObject(bullet, player, 500);
            bullet.lifespan = 1000;
        }
    }
};