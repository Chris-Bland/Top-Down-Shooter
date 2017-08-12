

Game.Outside = function (game) { };
var entrance;
var start;
var tavern = null;
var player;
var bullets;
var enemyBullets;
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
var day = false;
var count = 0;
var shadowTexture;
var lightAngle = Math.PI / 4;
var numberOfRays = 20;
var rayLength = 100;


Game.Outside.prototype = {
  create: function (game) {
    map = this.add.tilemap("outside");
    // map.addTilesetImage('woodland', 'woodland');
    map.addTilesetImage('testingTile', 'woodland');

    let layer = map.createLayer('Base');
    layer.resizeWorld();
    let collisionLayer = map.createLayer('Collision');
    this.collisionLayer = collisionLayer;
    collisionLayer.visible = true;
    map.setCollisionByExclusion([], true, this.collisionLayer);
    collisionLayer.resizeWorld();
    //TEST
    let foregroundCollisionLayer = map.createLayer('ForegroundObjects');
    this.foregroundCollisionLayer = foregroundCollisionLayer;
    foregroundCollisionLayer.visible = true;
    map.setCollisionByExclusion([], true, this.foregroundCollisionLayer);
    foregroundCollisionLayer.resizeWorld();
    //TEST

    var player = game.add.sprite(100, 240, 'player');
    this.player = player;
    player.MOVE_SPEED = 200;
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

    enemiesTotal = 2;
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < enemiesTotal; i++) {
      var enemy = enemies.create(game.world.randomX, game.world.randomY, 'flashlightEnemy');
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
    enemies.setAll('health', 100);

    shotgunEnemiesTotal = 2;
    shotgunEnemies = game.add.group();
    shotgunEnemies.enableBody = true;
    shotgunEnemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < shotgunEnemiesTotal; i++) {
      var shotgunEnemy = shotgunEnemies.create(game.world.randomX, game.world.randomY, 'shotgunEnemy');
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

    let exit = map.objects.meta.find(o => o.name == 'exit');
    this.exitRect = new Phaser.Rectangle(exit.x, exit.y, exit.width, exit.height);

    this.keyboardCursors = game.input.keyboard.createCursorKeys();
    this.moveSpeed = { x: 0, y: 0 }
    this.wasd = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
      shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    };

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

    game.input.keyboard.addKey(Phaser.KeyCode.C).onDown.add(() => {
      this.collisionLayer.visible = !this.collisionLayer.visible;
    });
    this.showDebug = false;
    game.input.keyboard.addKey(Phaser.KeyCode.D).onDown.add(() => {
      this.showDebug = !this.showDebug;
    });
    game.camera.x = game.world.centerX - game.width / 2;

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(5, 'bullet');
    bullets.setAll('anchor.x', -1);
    bullets.setAll('anchor.y', -1);
    bullets.setAll('scale.x', 0.5);
    bullets.setAll('scale.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);


    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(100, 'bullet');
    enemyBullets.setAll('anchor.x', -1);
    enemyBullets.setAll('anchor.y', -1);
    enemyBullets.setAll('scale.x', 0.5);
    enemyBullets.setAll('scale.y', 0.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);
    this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);
    this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

    var barConfig = {x: 200, y: 100};
 
    healthText = this.add.text(0, 0, "health", { fontSize: '32px', fill: '#fff' });
    healthText.fixedToCamera = true;
    levelText = this.add.text(0, 30, "level", { fontSize: '32px', fill: '#fff' });
    levelText.fixedToCamera = true;
    // experienceText = this.add.text(0, 50, 'score: 0', { fontSize: '32px', fill: '#fff' });
    // experienceText.fixedToCamera = true;

    console.log('this.lightSprite: ', this.lightSprite);

  },
  //******************************UPDATE****************************** */
  //******************************UPDATE****************************** */
  //******************************UPDATE****************************** */
  //collisionHandler
  update: function (game) {
    this.lightSprite.reset(this.game.camera.x, this.game.camera.y);
    let player = this.player;
    health = player.health;
    maxHealth = player.maxHealth;
    healthText.text = 'Player Health: ' + health + "/" + maxHealth;
    levelText.text = 'Player Level: ' + playerLevel;



    // experienceText.text = ('Experience: ' + playerXP + "/" + Math.log(gameXPsteps));


    let keyboardCursors = this.keyboardCursors;
    let wasd = this.wasd;
    let moveSpeed = this.moveSpeed;
    

    if (this.cutscene) return;
    if (playerLevel >= 2) {
      player.MOVE_SPEED = 400;
    } else if (playerLevel >= 3) {
      player.MOVE_SPEED = 600;
      player.damage = player.damage += 10;
    }
    game.physics.arcade.overlap(bullets, enemies, this.enemyShot, null, this);
    game.physics.arcade.overlap(bullets, shotgunEnemies, this.enemyShot, null, this);
    game.physics.arcade.overlap(enemies, player, this.resetPlayer);
    game.physics.arcade.overlap(player, enemyBullets, this.playerShot, null, this);


    if (game.input.mousePointer.isDown) {
      shotgunEnemies.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 300);
      enemies.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 300);
      this.shootBullet(player);
      console.log("Player XP: ", playerXP);
      console.log("Player Level: ", playerLevel);
    }

    enemies.forEachAlive(function (enemies) {
      enemies.body.collideWorldBounds = true,
        enemies.body.velocity.x = 0,
        enemies.body.velocity.y = 0,
        enemies.rotation = game.physics.arcade.angleToXY(enemies, player.x, player.y);
        chasePlayer(enemies);

    });
 
    
    shotgunEnemies.forEachAlive(function (shotgunEnemies) {
      shotgunEnemies.body.collideWorldBounds = true,
        shotgunEnemies.body.velocity.x = 0;
      shotgunEnemies.body.velocity.y = 0;
      shotgunEnemies.rotation = game.physics.arcade.angleToXY(shotgunEnemies, player.x, player.y);
      shootPlayer(shotgunEnemies);

    });

    function chasePlayer(enemies) {
      if (
        (player.alive && game.physics.arcade.distanceBetween(player, enemies) > 30) &&
        (player.alive && game.physics.arcade.distanceBetween(player, enemies) < 400)
      ) {
        game.physics.arcade.moveToObject(enemies, player, 300);
        enemies.animations.play('move');
        console.log('FL enemy move');
      }
      else if (player.alive && game.physics.arcade.distanceBetween(player, enemies) <= 30) {
        enemies.animations.play('melee');
        console.log('FL enemy melee');
      }
      else {
        enemies.animations.play('idle');
      }
    }
    function shootPlayer(shotgunEnemies) {
      if (
        (player.alive && game.physics.arcade.distanceBetween(player, shotgunEnemies) > 200) &&
        (player.alive && game.physics.arcade.distanceBetween(player, shotgunEnemies) < 400)
      ) {
        game.physics.arcade.moveToObject(shotgunEnemies, player, 150);
        shotgunEnemies.animations.play('move');
        console.log('SG enemy move');
      }
      else if (player.alive && game.physics.arcade.distanceBetween(player, shotgunEnemies) <= 200) {
        shotgunEnemies.animations.play('shoot');
        fireBullets(shotgunEnemies, player);
        console.log('SG enemy shoot');
      }
      else {
        shotgunEnemies.animations.play('idle');
      }
    }
    function fireBullets(shotgunEnemies) {
      if (game.time.now > enemyShootTime) {
        bullet = enemyBullets.getFirstExists(false);
        if (bullet) {
          bullet.reset(shotgunEnemies.x, shotgunEnemies.y + 8);
          bullet.body.velocity.x = 100;
          enemyShootTime = game.time.now + 200;
          bullet.rotation = game.physics.arcade.moveToObject(bullet, player, 500);
        }
      }
    }
    if (deadEnemies < enemies.countDead()) {
      deadEnemies = enemies.countDead();
      playerXP += 5;
    }
    if (deadShotgunEnemies < shotgunEnemies.countDead()) {
      deadShotgunEnemies = shotgunEnemies.countDead();
      playerXP += 10;
    }
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (keyboardCursors.left.isDown || wasd.left.isDown) moveSpeed.x = -player.MOVE_SPEED;
    else if (keyboardCursors.right.isDown || wasd.right.isDown) moveSpeed.x = player.MOVE_SPEED;
    else moveSpeed.x = 0;

    if (keyboardCursors.up.isDown || wasd.up.isDown) moveSpeed.y = -player.MOVE_SPEED;
    else if (keyboardCursors.down.isDown || wasd.down.isDown) moveSpeed.y = player.MOVE_SPEED;
    else moveSpeed.y = 0;

    if (Math.abs(moveSpeed.x) > 0 || Math.abs(moveSpeed.y) > 0) {
      player.body.velocity.x = moveSpeed.x;
      player.body.velocity.y = moveSpeed.y;
    }

    player.rotation = game.physics.arcade.angleToPointer(player);

    if (Phaser.Rectangle.containsPoint(this.exitRect, player.position)) {
      this.state.start('Level1');
    }
    game.physics.arcade.collide(this.player, this.collisionLayer);
    game.physics.arcade.collide(this.player, this.foregroundCollisionLayer);

    if (Math.abs(player.body.velocity.x) > 0 || Math.abs(player.body.velocity.y) > 0) {

      player.play('move');
    } else {
      player.play('idle');
    }
    if (wasd.shoot.isDown) {
      this.shootBullet(player);
    }
    count += 1;
    console.log('count: ', count);
    if (count >= 500) {
      count = 0;
      day = !day;
    }

    if (day === false) {
    this.updateShadowTexture(player);
    enemies.moveSpeed = 1000;
    }
    else if (day === true) {
      this.lightSprite.kill();
      enemies.moveSpeed = 150
 
    }
    if (player.health <= 0) {
      this.state.start('Level1');
    }




    if(player.health <= 30){
      player.tint = Math.random() * 0xffffff;
    }
  
    
    playerLevel = Math.round(Math.log(playerXP, gameXPsteps));

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
  playerShot: function (player, enemyBullets) {
    console.log('PLAYER SHOT');
    player.damage(10);
    enemyBullets.kill();
  },
  shootBullet: function (player) {
    if (this.time.now > shootTime) {
      bullet = bullets.getFirstExists(false);
      if (bullet) {
        bullet.reset(player.x, player.y);
        bullet.body.velocity.x = 10000;
        shootTime = this.time.now + 100;
        bullet.rotation = this.physics.arcade.moveToPointer(bullet, 10000, this.input.activePointer, 100);
        bullet.lifespan = 3000;
      }
    }
  },
  shootPlayer: function (shotgunEnemies) {
    if (this.time.now > enemyShootTime) {
      enemyBullet = enemyBullets.getFirstExists(false);
      if (enemyBullet) {
        enemyBullet.reset(shotgunEnemies.x, shotgunEnemies.y);
        enemyBullet.body.velocity.x = 100;
        enemyShootTime = this.time.now + 2000;
        enemyBullet.lifespan = 1000;
      }
    }
  },

  updateShadowTexture: function (sprite) {
    this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
    this.shadowTexture.context.fillRect(0, 0, this.game.width + 500, this.game.height + 500);
    var radius = 200 + this.game.rnd.integerInRange(1, 20),
      heroX = this.player.x - this.game.camera.x,
      heroY = this.player.y - this.game.camera.y;
    var gradient = this.shadowTexture.context.createRadialGradient(
      heroX, heroY, 100 * 0.75,
      heroX, heroY, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = gradient;
    this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI * 2, false);
    this.shadowTexture.context.fill();
    this.shadowTexture.dirty = true;

  },

  resetPlayer: function (player) {
    // game.camera.shake(0.05, 500);
    player.health -= 1;
  },
}
function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}




//**** PUT IN CREATE */
//***** GAME PAD CODE */
// function createVirtualGamepad() {
//   // create virtual gamepad
//   let gamepad = game.plugins.add(Phaser.Plugin.VirtualGamepad)
//   this.joystick = gamepad.addJoystick(60, game.height - 60, 0.5, 'gamepad');

//   // plugin wants the creation of a button
//   // but there is no usage for it here so i'm just going to hide it
//   this.gamepadbutton = gamepad.addButton(game.width - 60, game.height - 60, 0.5, 'gamepad');
//   this.gamepadbutton.visible = false;
// } 


// function initVirtualGamepad() {
//   // create our virtual gamepad
//   let gamepad = game.plugins.add(Phaser.Plugin.VirtualGamepad)
//   this.joystick = gamepad.addJoystick(90, game.height - 90, 0.75, 'gamepad');

//   // plugin wants the creation of a button
//   // but there is no usage for it here so i'm just going to hide it
//   let button = gamepad.addButton(game.width - 90, game.height - 90, 0.75, 'gamepad');
//   button.visible = false;
// }


//**** PUT IN UPDATE */
//******************************************

// // virtual gamepad movement
// // check first if it's in use before we go through all the logic below
// if (joystick.properties.inUse) {
//   // set the sprite's angle from the plugin
//   player.angle = joystick.properties.angle;

//   // the plugin has a max of 99
//   // i'm just adding a bit more for faster movement
//   player.body.velocity.x = joystick.properties.x * 1.5;
//   player.body.velocity.y = joystick.properties.y * 1.5;
