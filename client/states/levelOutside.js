//*******************************************************************************INIT FUNC*******************************
LevelOutside = function () { };




//*******************************************************************************CREATE*******************************
LevelOutside.prototype.create = function () {

    //*******************************************************************************MAP*************************
    map = this.add.tilemap("outside");
    map.addTilesetImage('large-map', 'large-map');

    let layer = map.createLayer('Base');
    layer.resizeWorld();
    let collisionLayer = map.createLayer('Collision');
    LevelOutside.collisionLayer = collisionLayer;
    collisionLayer.visible = false;
    map.setCollisionByExclusion([], true, LevelOutside.collisionLayer);
    collisionLayer.resizeWorld();

    // map = game.add.tilemap("outside");
    // map.addTilesetImage('outside-tileset', 'outside-tileset');
    //
    // let layer = map.createLayer('Base');
    // layer.resizeWorld();
    //
    // let collisionLayer = map.createLayer('Collision');
    // LevelOutside.collisionLayer = collisionLayer;
    // collisionLayer.visible = true;
    // map.setCollisionByExclusion([], true, this.collisionLayer);
    // collisionLayer.resizeWorld();
    //
    // let foregroundCollisionLayer = map.createLayer('ForegroundObjects');
    // LevelOutside.foregroundCollisionLayer = foregroundCollisionLayer;
    // foregroundCollisionLayer.visible = true;
    // map.setCollisionByExclusion([], true, LevelOutside.foregroundCollisionLayer);
    // foregroundCollisionLayer.resizeWorld();
    //*******************************************************************************MAP*************************




    //*******************************************************************************SPRITES*******************************
    Player(LevelOutside);

    //*******************************************************************************OPENING TWEEN AND EVENT POINTS*******************************
    let exit = map.objects.meta.find(o => o.name == 'exit');
    LevelOutside.exitRectangle = new Phaser.Rectangle(exit.x, exit.y, exit.width, exit.height);
    let entrance = map.objects.meta.find(o => o.name == 'entrance');
    let start = map.objects.meta.find(o => o.name == 'start');
    LevelOutside.cutscene = true;
    LevelOutside.player.position.set(entrance.x, entrance.y + 30);
    LevelOutside.player.angle = 0;
    let tween = game.add.tween(LevelOutside.player).to({ x: start.x, y: start.y }, 1500);
    tween.onComplete.add(() => {
        LevelOutside.cutscene = false;
    });
    tween.start();
    //*******************************************************************************OPENING TWEEN AND EVENT POINTS*******************************

    Merc(LevelOutside);

    LevelOutside.spawnPoints = [];
    let spawn1 = map.objects.meta.find(o => o.name == 'spawn1');
    let spawn2 = map.objects.meta.find(o => o.name == 'spawn2');
    let spawn3 = map.objects.meta.find(o => o.name == 'spawn3');
    let spawn4 = map.objects.meta.find(o => o.name == 'spawn4');
    LevelOutside.spawnPoints.push(spawn1, spawn2, spawn3, spawn4);
    Boss (LevelOutside, LevelOutside.spawnPoints);
    Enemies(LevelOutside, LevelOutside.spawnPoints);
    //*******************************************************************************SPRITES*******************************


    //*******************************************************************************MAP*************************
    let layerForeground = map.createLayer('Foreground');
    layerForeground.resizeWorld();
    //*******************************************************************************MAP*************************


    //*******************************************************************************KEYBOARD SET UP*******************************
    LevelOutside.keyboardCursors = game.input.keyboard.createCursorKeys();
    LevelOutside.moveSpeed = { x: 0, y: 0 };
    LevelOutside.playerInteraction = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      shoot: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    };
    game.input.keyboard.addKey(Phaser.KeyCode.C).onDown.add(() => {
        LevelOutside.collisionLayer.visible = !LevelOutside.collisionLayer.visible;
    });
    LevelOutside.showDebug = false;
    game.input.keyboard.addKey(Phaser.KeyCode.D).onDown.add(() => {
        LevelOutside.showDebug = !LevelOutside.showDebug;
    });
    //*******************************************************************************KEYBOARD SET UP*******************************


    //*******************************************************************************CAMERA*******************************
    game.camera.x = game.world.centerX - game.width / 2;
    //*******************************************************************************CAMERA*******************************


    //*******************************************************************************STAT TEXT*******************************
    LevelOutside.healthText = this.add.text(0, 0, "health", { fontSize: '32px', fill: '#fff' });
    LevelOutside.healthText.fixedToCamera = true;
    LevelOutside.levelText = this.add.text(0, 30, "level", { fontSize: '32px', fill: '#fff' });
    LevelOutside.levelText.fixedToCamera = true;
    LevelOutside.XPText = this.add.text(0, 60, "XP", { fontSize: '32px', fill: '#fff' });
    LevelOutside.XPText.fixedToCamera = true;
    LevelOutside.wave = 1;
    LevelOutside.waveText = this.add.text(620, 0, "wave", { fontSize: '32px', fill: '#fff' });
    LevelOutside.waveText.fixedToCamera = true;
    LevelOutside.mercText = this.add.text(1200, 0, "merc", { fontSize: '32px', fill: '#fff' });
    LevelOutside.mercText.fixedToCamera = true;
    LevelOutside.bossText = this.add.text(620, 30, "boss", { fontSize: '32px', fill: '#fff' });
    LevelOutside.bossText.fixedToCamera = true;
    //Set text for house
    //Add some color??
    //*******************************************************************************STAT TEXT*******************************

};

//*******************************************************************************UPDATE*******************************
LevelOutside.prototype.update = function () {

    //*******************************************************************************SETTING STATS REANDER*******************************
    if (this.cutscene) return;
    LevelOutside.healthText.text = 'Player Health: ' + LevelOutside.player.health + "/" + LevelOutside.player.maxHealth;
    LevelOutside.levelText.text = 'Player Level: ' + LevelOutside.player.playerLevel;
    LevelOutside.XPText.text = 'Player XP: ' + LevelOutside.player.playerXP + "/" + Math.pow(2, (LevelOutside.player.playerLevel+1));
    LevelOutside.waveText.text = 'Wave: ' + LevelOutside.wave;
    LevelOutside.mercText.text = 'Mercs: ' + (LevelOutside.mercs.length - LevelOutside.mercs.countDead()) + "/" + LevelOutside.mercs.length;
    LevelOutside.bossText.text = 'Boss Health: ' + LevelOutside.boss.health + "/" + LevelOutside.boss.maxHealth;
    //Update text for house
    //*******************************************************************************SETTING STATS REANDER*******************************


    //*******************************************************************************TRIGGERS INSIDE DOOR*******************************
    if (Phaser.Rectangle.containsPoint(LevelOutside.exitRectangle, LevelOutside.player.position)) {
        game.state.start('levelHouse');
    }
    //*******************************************************************************TRIGGERS INSIDE DOOR*******************************


    //*******************************************************************************COLLIDERS SET*******************************
    game.physics.arcade.collide(LevelOutside.player, LevelOutside.collisionLayer);
    game.physics.arcade.collide(LevelOutside.enemies, LevelOutside.collisionLayer);
    game.physics.arcade.collide(LevelOutside.mercs, LevelOutside.collisionLayer);
    game.physics.arcade.collide(LevelOutside.shotgunEnemies, LevelOutside.collisionLayer);
    game.physics.arcade.collide(LevelOutside.boss, LevelOutside.collisionLayer);

    game.physics.arcade.collide(LevelOutside.playerBullets, LevelOutside.collisionLayer, function(bullet){bullet.kill();});
    game.physics.arcade.collide(LevelOutside.shotgunEnemyBullets, LevelOutside.collisionLayer, function(bullet){bullet.kill();});
    game.physics.arcade.collide(LevelOutside.mercBullets, LevelOutside.collisionLayer, function(bullet){bullet.kill();});
    game.physics.arcade.collide(LevelOutside.bossBullets, LevelOutside.collisionLayer, function(bullet){bullet.kill();});

    game.physics.arcade.collide(LevelOutside.enemies, LevelOutside.enemies);
    game.physics.arcade.collide(LevelOutside.enemies, LevelOutside.shotgunEnemies);
    game.physics.arcade.collide(LevelOutside.shotgunEnemies, LevelOutside.shotgunEnemies);
    game.physics.arcade.collide(LevelOutside.boss, LevelOutside.enemies);
    game.physics.arcade.collide(LevelOutside.boss, LevelOutside.shotgunEnemies);
    game.physics.arcade.collide(LevelOutside.mercs, LevelOutside.mercs);
    //SETTING COLLIDERS FOR TOWER BULLETS
    //ADD COLLISION FOR THE HOUSE
    //*******************************************************************************COLLIDERS SET*******************************


    //*******************************************************************************OVERLAP TRIGGERS SET*******************************
    //player
    game.physics.arcade.overlap(LevelOutside.playerBullets, LevelOutside.enemies, LevelOutside.prototype.enemyShot, null, LevelOutside);
    game.physics.arcade.overlap(LevelOutside.playerBullets, LevelOutside.shotgunEnemies, LevelOutside.prototype.shotgunEnemyShot, null, LevelOutside);
    game.physics.arcade.overlap(LevelOutside.enemies, LevelOutside.player, LevelOutside.prototype.meleePlayer, null, LevelOutside);
    game.physics.arcade.overlap(LevelOutside.shotgunEnemies, LevelOutside.player, LevelOutside.prototype.meleePlayer, null, LevelOutside);
    game.physics.arcade.overlap(LevelOutside.player, LevelOutside.shotgunEnemyBullets, LevelOutside.prototype.playerShot, null, LevelOutside);
    game.physics.arcade.overlap(LevelOutside.player, LevelOutside.bossBullets, LevelOutside.prototype.playerShot, null, LevelOutside);
    game.physics.arcade.overlap(LevelOutside.boss, LevelOutside.player, LevelOutside.prototype.bossMeleePlayer, null, LevelOutside);
    game.physics.arcade.overlap(LevelOutside.playerBullets, LevelOutside.boss, LevelOutside.prototype.bossShot, null, LevelOutside);
    //mercs
    game.physics.arcade.overlap(LevelOutside.mercs, LevelOutside.shotgunEnemyBullets, LevelOutside.prototype.mercShot, null, LevelOutside);
    game.physics.arcade.overlap(LevelOutside.mercs, LevelOutside.enemies, LevelOutside.prototype.meleeMerc, null, LevelOutside);
    game.physics.arcade.overlap(LevelOutside.mercBullets, LevelOutside.enemies, LevelOutside.prototype.enemyShot, null, LevelOutside);
    game.physics.arcade.overlap(LevelOutside.mercBullets, LevelOutside.shotgunEnemies, LevelOutside.prototype.shotgunEnemyShot, null, LevelOutside);
    game.physics.arcade.overlap(LevelOutside.mercs, LevelOutside.bossBullets, LevelOutside.prototype.mercShot, null, LevelOutside);
    game.physics.arcade.overlap(LevelOutside.boss, LevelOutside.mercs, LevelOutside.prototype.bossmeleeMerc, null, LevelOutside);
    game.physics.arcade.overlap(LevelOutside.mercBullets, LevelOutside.boss, LevelOutside.prototype.bossShot, null, LevelOutside);
    //WHEN BOSS AND MERCS ADDED SET OVERLAP FOR SPRITES AND BULLETS, AS WELL AS SETTING OVERLAPS FOR TOWER BULLETS
    //ADD OVERLAP FOR ENEMYBULLETS/ENEMIES AND THE HOUSE
    //*******************************************************************************OVERLAP TRIGGERS SET*******************************


    //*******************************************************************************MAKE SURE THEY DON'T SLIDE*******************************
    LevelOutside.player.body.velocity.x = 0;
    LevelOutside.player.body.velocity.y = 0;
    //*******************************************************************************MAKE SURE THEY DON'T SLIDE*******************************

    //*******************************************************************************CLICK TO MOVE*******************************
    if (LevelOutside.keyboardCursors.left.isDown || LevelOutside.playerInteraction.left.isDown) LevelOutside.moveSpeed.x = -LevelOutside.player.MOVE_SPEED;
    else if (LevelOutside.keyboardCursors.right.isDown || LevelOutside.playerInteraction.right.isDown) LevelOutside.moveSpeed.x = LevelOutside.player.MOVE_SPEED;
    else LevelOutside.moveSpeed.x = 0;
    if (LevelOutside.keyboardCursors.up.isDown || LevelOutside.playerInteraction.up.isDown) LevelOutside.moveSpeed.y = -LevelOutside.player.MOVE_SPEED;
    else if (LevelOutside.keyboardCursors.down.isDown || LevelOutside.playerInteraction.down.isDown) LevelOutside.moveSpeed.y = LevelOutside.player.MOVE_SPEED;
    else LevelOutside.moveSpeed.y = 0;
    if (Math.abs(LevelOutside.moveSpeed.x) > 0 || Math.abs(LevelOutside.moveSpeed.y) > 0) {
        LevelOutside.player.body.velocity.x = LevelOutside.moveSpeed.x;
        LevelOutside.player.body.velocity.y = LevelOutside.moveSpeed.y;
    }
    //*******************************************************************************CLICK TO MOVE*******************************

    //*******************************************************************************PLAYER FACES MOUSE*******************************
    LevelOutside.player.rotation = game.physics.arcade.angleToPointer(LevelOutside.player);
    //*******************************************************************************PLAYER FACES MOUSE*******************************

    //*******************************************************************************CLICK SET TO SHOOT*******************************
    if (game.input.mousePointer.isDown) {
        shootBullet(LevelOutside);
    }
    //*******************************************************************************CLICK SET TO SHOOT*******************************

    //*******************************************************************************SET SPRITE IMAGES*******************************
    if (Math.abs(LevelOutside.player.body.velocity.x) > 0 || Math.abs(LevelOutside.player.body.velocity.y) > 0) {
        LevelOutside.player.play('move');
    } else {
        LevelOutside.player.play('idle');
    }
    //*******************************************************************************SET SPRITE IMAGES*******************************


    //*******************************************************************************ANGLES PUNCHERS AND SENDS TO PLAYER*******************************
    LevelOutside.enemies.forEachAlive(LevelOutside.prototype.enemyupdate, LevelOutside);
    //*******************************************************************************ANGLES PUNCHERS AND SENDS TO PLAYER*******************************

    //*******************************************************************************ANGLES SHOOTERS AND SENDS TO PLAYER*******************************
    LevelOutside.shotgunEnemies.forEachAlive(LevelOutside.prototype.shotgunEnemyUpdate, LevelOutside);
    //*******************************************************************************ANGLES SHOOTERS AND SENDS TO PLAYER*******************************

    //*******************************************************************************BOSS UPDATE*******************************
    LevelOutside.prototype.bossUpdate(LevelOutside.boss);
    //*******************************************************************************BOSS UPDATE*******************************


    //*******************************************************************************MERC UPDATE*******************************
    LevelOutside.shotgunEnemies.forEachAlive(LevelOutside.prototype.mercsUpdate, LevelOutside);
    LevelOutside.enemies.forEachAlive(LevelOutside.prototype.mercsUpdate, LevelOutside);
    if(LevelOutside.boss.alive){LevelOutside.prototype.mercsUpdate(LevelOutside.boss);}
    //*******************************************************************************MERC UPDATE*******************************


    //*******************************************************************************XP/HEALTH/LEVEL HANDLERS*******************************
    calculateDeadEnemies(LevelOutside);

    healthHandler(LevelOutside);

    XPHandler(LevelOutside);

    playerLevelUpgrades(LevelOutside);
    //*******************************************************************************XP/HEALTH/LEVEL HANDLERS*******************************


    //*******************************************************************************WAVE REFRESHING*******************************
    LevelOutside.prototype.waveHandler();
    //*******************************************************************************WAVE REFRESHING*******************************

};

LevelOutside.prototype.waveHandler = function(){

    LevelOutside.waveEnemies = LevelOutside.enemies.length + LevelOutside.shotgunEnemies.length;

    if(LevelOutside.waveEnemies == LevelOutside.enemies.countDead() + LevelOutside.shotgunEnemies.countDead()){
        LevelOutside.wave += 1;
        LevelOutside.player.playerXPStart = LevelOutside.player.playerXP;
        //SET IF STATEMENT SO IF MOD 5 LEVELHOUSE STARTS AND PLAYER/TOWERS/MERCS/MONEY/WAVE/WEAPONS SAVED
        Boss (LevelOutside, LevelOutside.spawnPoints);
        Enemies(LevelOutside, LevelOutside.spawnPoints);
    }

};

