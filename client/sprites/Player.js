function Player (State){ //add a method to change weapon in prototype

    let player = game.add.sprite( 100, 240, 'player');
    player.MOVE_SPEED = 500;
    player.anchor.set(0.5);
    player.scale.set(0.2);
    player.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
    player.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
    player.play('move');
    player.maxHealth = 100;
    player.health = player.maxHealth;
    game.physics.arcade.enable(player);
    player.body.setSize(100, 150, 100, 50);
    game.camera.follow(player);
    player.body.collideWorldBounds = true;
    player.playerLevel = 1;
    player.playerXP = 1;
    player.playerXPStart = player.playerXP;
    player.shootTime = 0;

    State.player = player;

    let playerBullets = game.add.group();
    playerBullets.enableBody = true;
    playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
    playerBullets.createMultiple(100, 'bullet');
    playerBullets.setAll('anchor.x', -1);
    playerBullets.setAll('anchor.y', -1);
    playerBullets.setAll('scale.x', 0.5);
    playerBullets.setAll('scale.y', 0.5);
    playerBullets.setAll('outOfBoundsKill', true);
    playerBullets.setAll('checkWorldBounds', true);

    State.playerBullets = playerBullets;

     State.prototype.playerShot = function (player, shotgunEnemyBullet) {
        State.player.damage(10);
        shotgunEnemyBullet.kill();
    }

};

function shootBullet (State) {
    if (game.time.now > State.player.shootTime) {
        let bullet = State.playerBullets.getFirstExists(false);
        if (bullet) {
            bullet.reset(State.player.x, State.player.y);
            bullet.body.velocity.x = 10000;
            State.player.shootTime = game.time.now + 100;
            bullet.rotation = game.physics.arcade.moveToPointer(bullet, 10000, game.input.activePointer, 100);
            bullet.lifespan = 1000;
        }
    }
};



function calculateDeadEnemies(State) {
    let XPBoost = (State.enemies.countDead() * 2) + (State.shotgunEnemies.countDead() * 4);
    if(!State.boss.alive){XPBoost += 20;}
    State.player.playerXP = State.player.playerXPStart + XPBoost;
}

function healthHandler(State){
    if (State.player.health <= 0) {
        game.state.start('levelHouse');
    }
    if (State.player.health <= 30) {
        State.player.tint = Math.random() * 0xffffff;
    }
};

function XPHandler(State){
    let currentLvl = State.player.playerLevel;
    State.player.playerLevel = Math.floor(Math.log2(State.player.playerXP));
    if(currentLvl < State.player.playerLevel){
        State.player.health = State.player.maxHealth;
    }
};

function playerLevelUpgrades(State) {
    if(State.player.playerLevel > 1) {
        State.player.MOVE_SPEED = 500 + State.player.playerLevel * 5;
        State.mercs.MOVE_SPEED = State.player.MOVE_SPEED;
        State.player.maxHealth = 100 + (10 * State.player.playerLevel);

    }
}