function Merc (State) {

    let mercs = game.add.group();
    let mercsTotal = 1;
    for(let i = 0; i < mercsTotal; i++){
        let merc = mercs.create(2977 + i, 1060 + i, 'player');
        merc.tint = 0x00ff00;
        merc.MOVE_SPEED = 500;
        merc.anchor.set(0.5);
        merc.scale.set(0.2);
        merc.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
        merc.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
        merc.play('move');
        merc.maxHealth = 100;
        merc.health = merc.maxHealth;
        game.physics.arcade.enable(merc);
        merc.body.setSize(100, 150, 100, 50);
        merc.body.collideWorldBounds = true;
    }

    mercs.shootTime = 0;

    State.mercs = mercs;

    let mercBullets = game.add.group();
    mercBullets.enableBody = true;
    mercBullets.physicsBodyType = Phaser.Physics.ARCADE;
    mercBullets.createMultiple(100, 'bullet');
    mercBullets.setAll('anchor.x', -1);
    mercBullets.setAll('anchor.y', -1);
    mercBullets.setAll('scale.x', 0.5);
    mercBullets.setAll('scale.y', 0.5);
    mercBullets.setAll('tint', 0x00ff00);
    mercBullets.setAll('outOfBoundsKill', true);
    mercBullets.setAll('checkWorldBounds', true);

    State.mercBullets = mercBullets;

    State.prototype.mercShot = function (merc, shotgunEnemyBullet) {
        merc.damage(10);
        shotgunEnemyBullet.kill();
    };

    State.prototype.mercsUpdate = function (enemy) {
        State.mercs.forEachAlive(function(merc){
            merc.body.collideWorldBounds = true;
            merc.body.velocity.x = 0;
            merc.body.velocity.y = 0;
            followPlayerShootEnemy(State, enemy, merc);
        });
    };


}

function followPlayerShootEnemy(State, enemy, merc) {
    if (
        (merc.alive && game.physics.arcade.distanceBetween(merc, State.player) > 50)
    ) {
        merc.rotation = game.physics.arcade.angleToXY(merc, State.player.x, State.player.y);
        game.physics.arcade.moveToObject(merc, State.player, merc.MOVE_SPEED);
        merc.animations.play('move');
    }
    if (
        (merc.alive && game.physics.arcade.distanceBetween(merc, enemy) <= 400)

    ) {
        merc.rotation = game.physics.arcade.angleToXY(merc, enemy.x, enemy.y);
        merc.animations.play('move');
        mercShoot(State, enemy, merc);
    }
    else {
        merc.rotation = game.physics.arcade.angleToXY(merc, State.player.x, State.player.y);
        merc.animations.play('idle');
    }
};

function mercShoot (State, enemy, merc) {
    if (game.time.now > State.mercs.shootTime) {
        let bullet = State.mercBullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(merc.x, merc.y + 8);
            bullet.body.velocity.x = 100;
            merc.shootTime = game.time.now + 200;
            bullet.rotation = game.physics.arcade.moveToObject(bullet, enemy, 500);
            bullet.lifespan = 1000;
        }
    }
};
