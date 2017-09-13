

Game.LevelOutside = function (game) { };
var entrance;
var start;
var spawn1;
var spawn2;
var spawn3;
var spawn4;
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
var count1 = 0;
var count2 = 0;
var count3 = 0
var count4 = 0;

var pathfinder;
var marker;
var blocked = false;
var path;
var walkables;

var SCALE = 1;
var TILE_WIDTH = 32 * SCALE;
var TILE_HEIGHT = 32 * SCALE;
var BOARD_PADDING = 5;

var resizeInterval;


//UI Vars
var preferGrass = false;
var iterationsPerCalculation = 100;
var diagonalsAllowed = true;

var displayWidth = 800;
var displayHeight = 800;

var board;
var boardWidth;
var boardHeight;

var boardObjectSprites = [];
var side = 0;
var easystar;
var intervals = {};


Game.LevelOutside.prototype = {
  create: function (game) {
    map = this.add.tilemap("outside");
    map.addTilesetImage('large-map', 'large-map');



    let layer = map.createLayer('Base');
    layer.resizeWorld();
    let collisionLayer = map.createLayer('Collision');
    this.collisionLayer = collisionLayer;
    collisionLayer.visible = false;
    map.setCollisionByExclusion([], true, this.collisionLayer);
    collisionLayer.resizeWorld();






    // var player = game.add.sprite(100, 240, 'player');
    var player = game.add.sprite(100, 240, 'player', 'handgun/idle/01.png');
    this.player = player;
    player.MOVE_SPEED = 500;
    player.anchor.set(0.5);
    player.scale.set(0.2);
    player.animations.add('pistol-idle', Phaser.Animation.generateFrameNames('handgun/idle/', 1, 20, '.png', 2), 20, true, false);
    player.animations.add('pistol-move', Phaser.Animation.generateFrameNames('handgun/move/', 1, 20, '.png', 2), 20, true, false);
    player.animations.add('pistol-shoot', Phaser.Animation.generateFrameNames('handgun/idle/', 1, 3, '.png', 2), 3, true, false);

    player.animations.add('flashlight-idle', Phaser.Animation.generateFrameNames('flashlight/idle/', 1, 20, '.png', 2), 20, true, false);
    player.animations.add('flashlight-move', Phaser.Animation.generateFrameNames('flashlight/move/', 1, 20, '.png', 2), 20, true, false);
    player.animations.add('flashlight-attack', Phaser.Animation.generateFrameNames('flashlight/meleeattack/', 1, 15, '.png', 2), 15, true, false);

    player.animations.add('rifle-idle', Phaser.Animation.generateFrameNames('rifle/idle/', 1, 20, '.png', 2), 20, true, false);
    player.animations.add('rifle-move', Phaser.Animation.generateFrameNames('rifle/move/', 1, 20, '.png', 2), 20, true, false);
    player.animations.add('rifle-shoot', Phaser.Animation.generateFrameNames('rifle/shoot/', 1, 3, '.png', 2), 3, true, false);

    player.animations.add('shotgun-idle', Phaser.Animation.generateFrameNames('shotgun/idle/', 1, 20, '.png', 2), 20, true, false);
    player.animations.add('shotgun-move', Phaser.Animation.generateFrameNames('shotgun/move/', 1, 20, '.png', 2), 20, true, false);
    player.animations.add('shotgun-shoot', Phaser.Animation.generateFrameNames('shotgun/shoot/', 1, 3, '.png', 2), 3, true, false);


    player.play('pistol-idle');
    player.maxHealth = 100;
    player.health = player.maxHealth;
    game.physics.arcade.enable(player);
    player.body.setSize(100, 150, 100, 50);
    game.camera.follow(player);
    player.body.collideWorldBounds = true;

    // ******************************* EASYSTAR ******************************//
// ******************************* EASYSTAR ******************************//


easystar = new EasyStar.js();
easystar.setGrid(collisionLayer);
easystar.setAcceptableTiles([540]);
easystar.setIterationsPerCalculation(iterationsPerCalculation);
if (diagonalsAllowed) {
  easystar.enableDiagonals();
}
if (preferGrass) {
  easystar.setTileCost(2,99999999999);
}

startPathfinding(player);

// ******************************* EASYSTAR ******************************//
// ******************************* EASYSTAR ******************************//


    spawn1 = map.objects.meta.find(o => o.name == 'spawn1');
    spawn2 = map.objects.meta.find(o => o.name == 'spawn2');
    spawn3 = map.objects.meta.find(o => o.name == 'spawn3');

    enemiesTotal = 15;
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < enemiesTotal; i++) {
      var spawn = chooseSpawn(1, 3);
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

    shotgunEnemiesTotal = 15;
    shotgunEnemies = game.add.group();
    shotgunEnemies.enableBody = true;
    shotgunEnemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < shotgunEnemiesTotal; i++) {
      var spawn = chooseSpawn(1, 3);
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

    let layerForeground = map.createLayer('Foreground');
    layerForeground.resizeWorld();


    this.keyboardCursors = game.input.keyboard.createCursorKeys();
    this.moveSpeed = { x: 0, y: 0 }
    this.playerInteraction = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      pistol: game.input.keyboard.addKey(Phaser.Keyboard.U),
      rifle: game.input.keyboard.addKey(Phaser.Keyboard.I),
      shotgun: game.input.keyboard.addKey(Phaser.Keyboard.O),
      flashlight: game.input.keyboard.addKey(Phaser.Keyboard.P)
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
    playerBullets.createMultiple(10, 'bullet');
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
    console.log('here');
  },

  update: function (game) {

    if (this.cutscene) return;

    let player = this.player;
    // let playerLight = this.playerLight;
    // let fogOfWar = this.fogOfWar;
    // this.playerLight.reset(this.game.camera.x, this.game.camera.y);
    // dayNightCycle(playerLight, fogOfWar, player);
    let keyboardCursors = this.keyboardCursors;
    let playerInteraction = this.playerInteraction;
    let moveSpeed = this.moveSpeed;
    let collisionLayer = this.collisionLayer;

// ******************************* EASYSTAR ******************************//
    // ******************************* EASYSTAR ******************************//

			easystar.calculate();


    // ******************************* EASYSTAR ******************************//
// ******************************* EASYSTAR ******************************//

    health = player.health;
    maxHealth = player.maxHealth;
    healthText.text = 'Player Health: ' + health + "/" + maxHealth;
    levelText.text = 'Player Level: ' + playerLevel;
    game.physics.arcade.collide(this.player, this.collisionLayer);
    game.physics.arcade.collide(this.player, this.foregroundStacked);

    playerLevelUpgrades(player);

    game.physics.arcade.overlap(playerBullets, enemies, this.enemyShot, null, this);
    game.physics.arcade.overlap(playerBullets, shotgunEnemies, this.enemyShot, null, this);
    game.physics.arcade.overlap(enemies, player, meleePlayer);
    game.physics.arcade.overlap(player, shotgunEnemyBullets, this.playerShot, null, this);

    function meleePlayer() {
      game.camera.shake(0.005, 500);
      player.health -= 1;
    }
    if (game.input.mousePointer.isDown) {
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

    if (playerInteraction.pistol.isDown) {
      if (count1 === 0) {
        count1 = count1 + 1;
        player.play('pistol-idle');
        console.log('pistol idle')

      } else if (count1 === 1) {

        player.play('pistol-move');
        console.log('pistol move')

        count1 = count1 + 1;
      }
      else if (count1 === 2) {
        count1 = 0;
        player.play('pistol-shoot');
        console.log('pistol shoot')

      }

    }

    if (playerInteraction.shotgun.isDown) {
      if (count2 === 0) {
        count2 = count2 + 1;
        player.play('shotgun-idle');
        console.log('shotgun-idle');

      } else if (count2 === 1) {

        player.play('shotgun-move');
        console.log('shotgun-move');
        count2 = count2 + 1;
      }
      else if (count2 === 2) {
        count2 = 0;
        player.play('shotgun-shoot');
        console.log('shotgun-shoot');
      }

    }

    if (playerInteraction.rifle.isDown) {
      if (count3 === 0) {
        count3 = count3 + 1;
        player.play('rifle-idle');
        console.log('rifle-idle');

      } else if (count3 === 1) {

        player.play('rifle-move');
        console.log('rifle-move');
        count3 = count3 + 1;
      }
      else if (count3 === 2) {
        count3 = 0;
        player.play('rifle-shoot');
        console.log('rifle-shoot');
      }

    }

    if (playerInteraction.flashlight.isDown) {

      if (count4 === 0) {
        count4 = count4 + 1;
        player.play('flashlight-idle');
        console.log('flashlight-idle');

      } else if (count4 === 1) {

        player.play('flashlight-move');
        console.log('flashlight-move');
        count4 = count4 + 1;
      }
      else if (count4 === 2) {
        count4 = 0;
        player.play('flashlight-attack');
        console.log('flashlight-attack');
      }
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



    // function dayNightCycle(playerLight, fogOfWar, player) {
    //   console.log('count:', count);
    //   count += 1;
    //   if (count >= 500) {
    //     count = 0;
    //     day = !day;
    //   }
    //   if (day === false) {
    // updatefogOfWar(playerLight, fogOfWar, player);

    //     enemies.moveSpeed = 1000;
    //   }
    //   else if (day === true) {
    //     playerLight.kill();
    //     enemies.moveSpeed = 150
    //   }
    // }

    function updatefogOfWar(playerLight, fogOfWar, player) {
      fogOfWar.context.fillStyle = 'rgb(10, 10, 10)';
      fogOfWar.context.fillRect(0, 0, game.width + 500, game.height + 500);
      var radius = 200 + game.rnd.integerInRange(1, 20),
        heroX = player.x - game.camera.x,
        heroY = player.y - game.camera.y;
      var gradient = fogOfWar.context.createRadialGradient(
        heroX, heroY, 100 * 0.75,
        heroX, heroY, radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      fogOfWar.context.beginPath();
      fogOfWar.context.fillStyle = gradient;
      fogOfWar.context.arc(heroX, heroY, radius, 0, Math.PI * 2, false);
      fogOfWar.context.fill();
      fogOfWar.dirty = true;
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

  bulletCollide: function (playerBullets) {

    playerBullets.kill();
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
  }
}

// ******************************* EASYSTAR ******************************//
// ******************************* EASYSTAR ******************************//

function startPathfinding(player) {
  console.log("HERE START", player);
  var closures = [];
  var finished = 0;

    
    findPathForHero(player, function() {
      finished++;
      if (finished == player.length) {
        if (side == 0) {
          side = 1 ;
        } else {
          side = 0;
        }
        board = createGrid(boardWidth, boardHeight);
        console.log("BOARD: ", board)
        populateBoardWithObjects(board);
        easystar.setGrid(board);
        startPathfinding();
      }
    });
};

function findPathForHero(hero, callback) {
  console.log('HERE FIND PATH FOR HERO')
  easystar.findPath(hero.x, hero.y, 10, 10, function(path) {
    if (!path) {
      var id = setTimeout(function() {
        findPathForHero(hero, callback);
        delete intervals[id];
      },10);
      intervals[id] = true;
      return;
    }
    
    path.splice(0,1);

    if (path.length == 0) {
      delete intervals[id];
      clearInterval(id);
      callback();
      return;
    }

    var id = setInterval(function() {
      hero.x = path[0].x;
      hero.y = path[0].y;
      var offsetX = TILE_WIDTH - hero.sprite.width;
      var offsetY = TILE_HEIGHT - hero.sprite.height;
      var destinationX = hero.x * TILE_WIDTH + offsetX/2;
      var destinationY = hero.y * TILE_HEIGHT + offsetY/2;
      createjs.Tween.get(hero.sprite.position).to({x:destinationX, y:destinationY}, 100); //.call(handleComplete);
      path.splice(0,1);

      if (path.length == 0) {
        delete intervals[id];
        clearInterval(id);
        callback();
      }
    },100);
    intervals[id] = true;
  });
}

// ******************************* EASYSTAR ******************************//
// ******************************* EASYSTAR ******************************//




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
  }

}
