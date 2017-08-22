

Game.LevelOutside = function (game) { };
var entrance;
var start;
var spawn1;
var spawn2;
var spawn3;
var spawn4;
var tavern = null;
var player;
var playerBullets;
var shotgunEnemyBullets;
var shootTime = 0;
var enemyShootTime = 0;
var map;
var healthText;
var health;
var playerXP = 1;
var gameXPsteps = 15;
var playerLevel = 1;
var levelText;
var experienceText;
var totalEnemies;
var deadEnemies = 0;
var deadShotgunEnemies = 0;
var day = true;
var count = 0;
var fogOfWar;



Game.LevelOutside.prototype = {
  create: function (game) {
    map = this.add.tilemap("outside");
    // map.addTilesetImage('woodland', 'woodland');
    map.addTilesetImage('outside-tileset', 'outside-tileset');

    let layer = map.createLayer('Base');
    layer.resizeWorld();
    let collisionLayer = map.createLayer('Collision');
    this.collisionLayer = collisionLayer;
    collisionLayer.visible = true;
    map.setCollisionByExclusion([], true, this.collisionLayer);
    collisionLayer.resizeWorld();

    let foregroundCollisionLayer = map.createLayer('ForegroundObjects');
    this.foregroundCollisionLayer = foregroundCollisionLayer;
    foregroundCollisionLayer.visible = true;
    map.setCollisionByExclusion([], true, this.foregroundCollisionLayer);
    foregroundCollisionLayer.resizeWorld();


    var player = game.add.sprite(100, 240, 'player');
    this.player = player;
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

    spawn1 = map.objects.meta.find(o => o.name == 'spawn1');
    spawn2 = map.objects.meta.find(o => o.name == 'spawn2');
    spawn3 = map.objects.meta.find(o => o.name == 'spawn3');
    spawn4 = map.objects.meta.find(o => o.name == 'spawn4');

    enemiesTotal = 15;
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < enemiesTotal; i++) {
      var spawn = chooseSpawn(1, 4);
      var randomX = Math.random() * 300;
      var randomY = Math.random() * 300;
      var enemy = enemies.create(spawn.x + randomX, spawn.y + randomY, 'flashlight-enemy');
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
      enemy.body.velocity.x = 0,
        enemy.body.velocity.y = 0
    }
    console.log("enemies:", enemies);
    enemies.setAll('health', 100);

    shotgunEnemiesTotal = 10;
    shotgunEnemies = game.add.group();
    shotgunEnemies.enableBody = true;
    shotgunEnemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < shotgunEnemiesTotal; i++) {
      var spawn = chooseSpawn(1, 4);
      var randomX = Math.random() * 300;
      var randomY = Math.random() * 300;
      var shotgunEnemy = shotgunEnemies.create(spawn.x + randomX, spawn.y + randomY, 'shotgun-enemy');
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
      shotgunEnemy.body.velocity.x = 0,
        shotgunEnemy.body.velocity.y = 0
    }
    shotgunEnemies.setAll('health', 100);
    map.createLayer('Foreground');

    this.keyboardCursors = game.input.keyboard.createCursorKeys();
    this.moveSpeed = { x: 0, y: 0 }
    this.playerInteraction = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    };
    game.input.keyboard.addKey(Phaser.KeyCode.C).onDown.add(() => {
      this.collisionLayer.visible = !this.collisionLayer.visible;
    });
    this.showDebug = false;
    game.input.keyboard.addKey(Phaser.KeyCode.D).onDown.add(() => {
      this.showDebug = !this.showDebug;
    });

    let exit = map.objects.meta.find(o => o.name == 'exit');
    this.exitRectangle = new Phaser.Rectangle(exit.x, exit.y, exit.width, exit.height);
    entrance = map.objects.meta.find(o => o.name == 'entrance');
    start = map.objects.meta.find(o => o.name == 'start');
    this.cutscene = true;
    this.player.position.set(entrance.x, entrance.y + 30);
    this.player.angle = 0;
    let tween = game.add.tween(this.player).to({ x: start.x, y: start.y }, 1500);
    tween.onComplete.add(() => {
      this.cutscene = false;
    });
    tween.start();

    game.camera.x = game.world.centerX - game.width / 2;

    playerBullets = game.add.group();
    playerBullets.enableBody = true;
    playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
    playerBullets.createMultiple(5, 'bullet');
    playerBullets.setAll('anchor.x', -1);
    playerBullets.setAll('anchor.y', -1);
    playerBullets.setAll('scale.x', 0.5);
    playerBullets.setAll('scale.y', 0.5);
    playerBullets.setAll('outOfBoundsKill', true);
    playerBullets.setAll('checkWorldBounds', true);


    shotgunEnemyBullets = game.add.group();
    shotgunEnemyBullets.enableBody = true;
    shotgunEnemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    shotgunEnemyBullets.createMultiple(100, 'bullet');
    shotgunEnemyBullets.setAll('anchor.x', -1);
    shotgunEnemyBullets.setAll('anchor.y', -1);
    shotgunEnemyBullets.setAll('scale.x', 0.5);
    shotgunEnemyBullets.setAll('scale.y', 0.5);
    shotgunEnemyBullets.setAll('outOfBoundsKill', true);
    shotgunEnemyBullets.setAll('checkWorldBounds', true);

    this.fogOfWar = this.game.add.bitmapData(this.game.width, this.game.height);
    this.playerLight = this.game.add.image(this.game.camera.x, this.game.camera.y, this.fogOfWar);
    this.playerLight.blendMode = Phaser.blendModes.MULTIPLY;

    healthText = this.add.text(0, 0, "health", { fontSize: '32px', fill: '#fff' });
    healthText.fixedToCamera = true;
    levelText = this.add.text(0, 30, "level", { fontSize: '32px', fill: '#fff' });
    levelText.fixedToCamera = true;
  },

  update: function (game) {
   
    if (this.cutscene) return;
    let player = this.player;
    this.playerLight.reset(this.game.camera.x, this.game.camera.y);
    let keyboardCursors = this.keyboardCursors;
    let playerInteraction = this.playerInteraction;
    let moveSpeed = this.moveSpeed;
    // dayNightCycle(player, enemies);
    health = player.health;
    maxHealth = player.maxHealth;
    healthText.text = 'Player Health: ' + health + "/" + maxHealth;
    levelText.text = 'Player Level: ' + playerLevel;

    game.physics.arcade.collide(this.player, this.collisionLayer);
    game.physics.arcade.collide(this.player, this.foregroundCollisionLayer);


    playerLevelUpgrades(player);

    game.physics.arcade.overlap(playerBullets, enemies, this.enemyShot, null, this);
    game.physics.arcade.overlap(playerBullets, shotgunEnemies, this.enemyShot, null, this);
    game.physics.arcade.overlap(enemies, player, this.resetPlayer);
    game.physics.arcade.overlap(player, shotgunEnemyBullets, this.playerShot, null, this);

    if (game.input.mousePointer.isDown) {
      shotgunEnemies.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 300);
      enemies.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 300);
      this.shootBullet(player);
    }

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (keyboardCursors.left.isDown || playerInteraction.left.isDown) moveSpeed.x = -player.MOVE_SPEED;
    else if (keyboardCursors.right.isDown || playerInteraction.right.isDown) moveSpeed.x = player.MOVE_SPEED;
    else moveSpeed.x = 0;
    if (keyboardCursors.up.isDown || playerInteraction.up.isDown) moveSpeed.y = -player.MOVE_SPEED;
    else if (keyboardCursors.down.isDown || playerInteraction.down.isDown) moveSpeed.y = player.MOVE_SPEED;
    else moveSpeed.y = 0;
    if (Math.abs(moveSpeed.x) > 0 || Math.abs(moveSpeed.y) > 0) {
      player.body.velocity.x = moveSpeed.x;
      player.body.velocity.y = moveSpeed.y;
    }
    if (Math.abs(player.body.velocity.x) > 0 || Math.abs(player.body.velocity.y) > 0) {
      player.play('move');
    } else {
      player.play('idle');
    }
    if (playerInteraction.shoot.isDown) {
      this.shootBullet(player);
    }
    if (Phaser.Rectangle.containsPoint(this.exitRectangle, player.position)) {
      this.state.start('levelHouse');
    }
    player.rotation = game.physics.arcade.angleToPointer(player);

    enemies.forEachAlive(function (enemies) {
      enemies.body.collideWorldBounds = true,
        enemies.body.velocity.x = 0,
        enemies.body.velocity.y = 0,
        enemies.rotation = game.physics.arcade.angleToXY(enemies, player.x, player.y);
      chasePlayer(player, enemies, game);

    });
    shotgunEnemies.forEachAlive(function (shotgunEnemies) {
      shotgunEnemies.body.collideWorldBounds = true,
        shotgunEnemies.body.velocity.x = 0;
      shotgunEnemies.body.velocity.y = 0;
      shotgunEnemies.rotation = game.physics.arcade.angleToXY(shotgunEnemies, player.x, player.y);
      shootPlayer(player, shotgunEnemies, game);

    });

    calculateDeadEnemies(enemies);

    if (player.health <= 0) {
      this.state.start('levelHouse');
    }
    if (player.health <= 30) {
      player.tint = Math.random() * 0xffffff;
    }

    playerLevel = Math.round(Math.log(playerXP, gameXPsteps));

    function dayNightCycle() {
      count += 1;
      if (count >= 500) {
        count = 0;
        day = !day;
      }
      if (day === false) {
        updatefogOfWar(player, this.fogOfWar);
        enemies.moveSpeed = 1000;
      }
      else if (day === true) {
        this.playerLight.kill();
        enemies.moveSpeed = 150
      }
    }
    
    function updatefogOfWar() {
      console.log('fogofWar: ', this.fogOfWar);
      this.fogOfWar.context.fillStyle = 'rgb(10, 10, 10)';
      this.fogOfWar.context.fillRect(0, 0, this.game.width + 500, this.game.height + 500);
      var radius = 200 + this.game.rnd.integerInRange(1, 20),
        heroX = this.player.x - this.game.camera.x,
        heroY = this.player.y - this.game.camera.y;
      var gradient = this.fogOfWar.context.createRadialGradient(
        heroX, heroY, 100 * 0.75,
        heroX, heroY, radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      this.fogOfWar.context.beginPath();
      this.fogOfWar.context.fillStyle = gradient;
      this.fogOfWar.context.arc(heroX, heroY, radius, 0, Math.PI * 2, false);
      this.fogOfWar.context.fill();
      this.fogOfWar.dirty = true;
    
    }



  },
  render(game) {
    // if (this.collisionLayer.visible) {
    //   game.debug.body(this.player);
    // }
    // game.debug.text(game.time.fps, 5, 14, '#00ff00');
  },

  enemyShot: function (bullets, enemies) {
    enemies.damage(20);
    bullets.kill();
  },
  playerShot: function (player, shotgunEnemyBullets) {
    console.log('PLAYER SHOT');
    player.damage(10);
    shotgunEnemyBullets.kill();
  },
  shootBullet: function (player) {
    if (this.time.now > shootTime) {
      bullet = playerBullets.getFirstExists(false);
      if (bullet) {
        bullet.reset(player.x, player.y);
        bullet.body.velocity.x = 10000;
        shootTime = this.time.now + 100;
        bullet.rotation = this.physics.arcade.moveToPointer(bullet, 10000, this.input.activePointer, 100);
        bullet.lifespan = 3000;
      }
    }
  },
  shootPlayer: function (player, shotgunEnemies, game) {
    if (this.time.now > enemyShootTime) {
      enemyBullet = shotgunEnemyBullets.getFirstExists(false);
      if (enemyBullet) {
        enemyBullet.reset(shotgunEnemies.x, shotgunEnemies.y);
        enemyBullet.body.velocity.x = 100;
        enemyShootTime = this.time.now + 2000;
        enemyBullet.lifespan = 1000;
      }
    }
  },
  
  resetPlayer: function (player) {
    // game.camera.shake(0.05, 500);
    player.health -= 1;
  },
}


function playerLevelUpgrades(player) {
  if (playerLevel >= 2) {
    player.MOVE_SPEED = 400;
  } else if (playerLevel >= 3) {
    player.MOVE_SPEED = 600;
    player.damage = player.damage += 10;
  }
}

function chasePlayer(player, enemies, game) {
  if (
    (player.alive && game.physics.arcade.distanceBetween(player, enemies) > 30) &&
    (player.alive && game.physics.arcade.distanceBetween(player, enemies) < 400)
  ) {
    game.physics.arcade.moveToObject(enemies, player, 300);
    enemies.animations.play('move');
  }
  else if (player.alive && game.physics.arcade.distanceBetween(player, enemies) <= 30) {
    enemies.animations.play('melee');
  }
  else {
    enemies.animations.play('idle');
  }
}

function shootPlayer(player, shotgunEnemies, game) {
  if (
    (player.alive && game.physics.arcade.distanceBetween(player, shotgunEnemies) > 200) &&
    (player.alive && game.physics.arcade.distanceBetween(player, shotgunEnemies) < 400)
  ) {
    game.physics.arcade.moveToObject(shotgunEnemies, player, 150);
    shotgunEnemies.animations.play('move');
  }
  else if (player.alive && game.physics.arcade.distanceBetween(player, shotgunEnemies) <= 200) {
    shotgunEnemies.animations.play('shoot');
    fireBullets(shotgunEnemies, player, game);
  }
  else {
    shotgunEnemies.animations.play('idle');
  }
}

function fireBullets(shotgunEnemies, player, game) {
  if (game.time.now > enemyShootTime) {
    bullet = shotgunEnemyBullets.getFirstExists(false);
    if (bullet) {
      bullet.reset(shotgunEnemies.x, shotgunEnemies.y + 8);
      bullet.body.velocity.x = 100;
      enemyShootTime = game.time.now + 200;
      bullet.rotation = game.physics.arcade.moveToObject(bullet, player, 500);
    }
  }
}
function calculateDeadEnemies(enemies) {
  if (deadEnemies < enemies.countDead()) {
    deadEnemies = enemies.countDead();
    playerXP += 5;
  }
  if (deadShotgunEnemies < shotgunEnemies.countDead()) {
    deadShotgunEnemies = shotgunEnemies.countDead();
    playerXP += 10;
  }
}

function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
function chooseSpawn(minimum, maximum) {
  minimum = Math.ceil(minimum);
  maximum = Math.floor(maximum);
  let number = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  if (number === 1) {
    return spawn1;
  } else if (number === 2) {
    return spawn2;
  } else if (number === 3) {
    return spawn3;
  } else if (number == 4) {
    return spawn4;
  }

}
