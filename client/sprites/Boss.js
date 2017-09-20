function Boss (State, spawnPoints) {

    let spawnPoint = chooseSpawn(spawnPoints);
    let boss = game.add.sprite( spawnPoint.x, spawnPoint.y, 'player');
    boss.MOVE_SPEED = 500;
    boss.tint = 0xff0000;
    boss.anchor.set(0.5);
    boss.scale.set(0.2);
    boss.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
    boss.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
    boss.play('move');
    boss.maxHealth = 500;
    boss.health = boss.maxHealth;
    game.physics.arcade.enable(boss);
    boss.body.setSize(200, 300, 100, 50);
    boss.body.collideWorldBounds = true;
    boss.shootTime = 0;

    State.boss = boss;

    let bossBullets = game.add.group();
    bossBullets.enableBody = true;
    bossBullets.physicsBodyType = Phaser.Physics.ARCADE;
    bossBullets.createMultiple(100, 'bullet');
    bossBullets.setAll('anchor.x', -1);
    bossBullets.setAll('anchor.y', -1);
    bossBullets.setAll('scale.x', 1);
    bossBullets.setAll('scale.y', 1);
    bossBullets.setAll('tint', 0xff0000);
    bossBullets.setAll('outOfBoundsKill', true);
    bossBullets.setAll('checkWorldBounds', true);

    State.bossBullets = bossBullets;

    State.prototype.bossShot = function (boss, playerbullet) {
        boss.damage(10);
        playerbullet.kill();
    };

    State.prototype.bossMeleePlayer = function () {
        game.camera.shake(0.005, 500);
        State.player.damage(5);
    };

    State.prototype.bossmeleeMerc = function (merc) {
        game.camera.shake(0.005, 500);
        merc.damage(5);
    };

    State.prototype.bossUpdate = function (boss) {
        if(boss.alive) {
            boss.body.collideWorldBounds = true;
            boss.body.velocity.x = 0;
            boss.body.velocity.y = 0;
            boss.rotation = game.physics.arcade.angleToXY(boss, State.player.x, State.player.y);
            bossShootPlayer(State, boss);
        }
    };

}

function chooseSpawn (spawnPoints) {
    return spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
};

function bossShootPlayer(State, boss) {
    if (
        (State.player.alive && game.physics.arcade.distanceBetween(State.player, boss) > 30) &&
        (State.player.alive && game.physics.arcade.distanceBetween(State.player, boss) < 600)
    ) {
        game.physics.arcade.moveToObject(boss, State.player, 150);
        boss.animations.play('move');
    }
    if (State.player.alive && game.physics.arcade.distanceBetween(State.player, boss) <= 400) {
        boss.animations.play('shoot');
        bossFireBullets(boss, State.player, State);
    }
    else {
        boss.animations.play('idle');
    }
};

function bossFireBullets (boss, player, State) {
    if (game.time.now > boss.shootTime) {
        let bullet = State.bossBullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(boss.x, boss.y + 8);
            bullet.body.velocity.x = 100;
            State.bossBullets.shootTime = game.time.now + 200;
            bullet.rotation = game.physics.arcade.moveToObject(bullet, player, 500);
            bullet.lifespan = 1000;
        }
    }
};
