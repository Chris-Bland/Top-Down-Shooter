

Game.Outside = function (game) { };
var entrance;
var start;
var tavern = null;
var player;
var bullets;
var shootTime = 0;
var map;
var healthText;
var health;
var playerXP = 1;
var gameXPsteps = 15;
var playerLevel = 1;
var levelText;
var totalEnemies;
var deadEnemies = 0;
var day = false;
var count =0;


Game.Outside.prototype = {
  create: function (game) {
    map = this.add.tilemap("outside");
    map.addTilesetImage('woodland', 'woodland');

    let layer = map.createLayer('Base');
    layer.resizeWorld();
    let collisionLayer = map.createLayer('Collision');
    this.collisionLayer = collisionLayer;
    collisionLayer.visible = true;
    map.setCollisionByExclusion([], true, this.collisionLayer);
    collisionLayer.resizeWorld();

    var player = game.add.sprite(100, 240, 'player');
    this.player = player;
    player.MOVE_SPEED = 200;
    player.anchor.set(0.5);
    player.scale.set(0.2);
    player.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
    player.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
    player.play('move');
    player.maxHealth = 100;
    console.log('maxhealth:', player.maxHealth);
    player.health = player.maxHealth;
    console.log('player health:', player.health);
    game.physics.arcade.enable(player);
    player.body.setSize(100, 150, 100, 50);
    game.camera.follow(player);


    enemiesTotal = 20;
    // **** Test enemy spawn
    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < enemiesTotal; i++) {
      var enemy = enemies.create(game.world.randomX, game.world.randomY, 'enemy');
      enemy.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 19, true);
      enemy.play('move');
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

    //************** BULLETS */
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    //how many bullets
    bullets.createMultiple(100, 'bullet');


    bullets.setAll('anchor.x', -1);
    bullets.setAll('anchor.y', -1);

    //size of bullets
    bullets.setAll('scale.x', 0.5);
    bullets.setAll('scale.y', 0.5);


    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);


    this.shadowTexture = this.game.add.bitmapData(this.game.width+500, this.game.height+500);

    this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);

    this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

    healthText = this.add.text(232, 120, 'score: 0', { fontSize: '32px', fill: '#fff' });
    healthText.fixedToCamera = true;
    levelText = this.add.text(240, 150, 'score: 0', { fontSize: '32px', fill: '#fff' });
    levelText.fixedToCamera = true;




  },
  //******************************UPDATE****************************** */
  //******************************UPDATE****************************** */
  //******************************UPDATE****************************** */
  //collisionHandler
  update: function (game) {
    let player = this.player;
    health = player.health;
    healthText.text = 'Player Health: ' + health;
    levelText.text = 'Player Level: ' + playerLevel;

    if(playerLevel >= 2){
      player.MOVE_SPEED = 400;
    }else if( playerLevel >= 3){
      player.MOVE_SPEED = 600;
    }

    game.physics.arcade.overlap(bullets, enemies, this.enemyShot, null, this);
    game.physics.arcade.overlap(enemies, player, this.resetPlayer);
    if (this.cutscene) return;

    if (game.input.mousePointer.isDown) {
      enemies.forEach(game.physics.arcade.moveToPointer, game.physics.arcade, false, 300);
      this.shootBullet(player);
    console.log("Player XP: ", playerXP);
    console.log("Player Level: ", playerLevel);
    }
    enemies.forEachAlive(function (enemies) {
      enemies.body.collideWorldBounds = true,
        enemies.body.velocity.x = 0,
        enemies.body.velocity.y = 0,
        chasePlayer(enemies);
    });

    if (deadEnemies < enemies.countDead()) {
      deadEnemies = enemies.countDead();
      playerXP += 5;
    }

    function chasePlayer(enemies) {
      if (day = true){
      if (player.alive && game.physics.arcade.distanceBetween(player, enemies) <= 400) {
        game.physics.arcade.moveToObject(enemies, player, 150);
      }
      }
    else {
      if (player.alive && game.physics.arcade.distanceBetween(player, enemies) <= 400) {
        game.physics.arcade.moveToObject(enemies, player, 450);

    }
    }
    }
    let keyboardCursors = this.keyboardCursors;
    let wasd = this.wasd;
    let moveSpeed = this.moveSpeed;
    let joystick = this.joystick;

    // set our player's velocity to 0
    // so the sprite doesn't move when there is no input from our player
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    // keyboard movement
    // left and right keyboard movement
    if (keyboardCursors.left.isDown || wasd.left.isDown) moveSpeed.x = -player.MOVE_SPEED;
    else if (keyboardCursors.right.isDown || wasd.right.isDown) moveSpeed.x = player.MOVE_SPEED;
    else moveSpeed.x = 0;

    // up and down keyboard movement
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
    // // let phaser handle our player collision with the collision layer
    game.physics.arcade.collide(this.player, this.collisionLayer);

    game.physics.arcade.collide(this.enemies, this.collisionLayer);
    if (Math.abs(player.body.velocity.x) > 0 || Math.abs(player.body.velocity.y) > 0) {
      // play the animation, phaser just returns when it's currently animating
      // so it's fine to call it on every frame
      player.play('move');
    } else {
      player.play('idle');
    }

    if (wasd.shoot.isDown) {
      this.shootBullet(player);
    }

    
     


    count +=1;
    console.log('count: ', count);
    if (count >= 100){
      count = 0;
      day = !day;
    }
 this.lightSprite.reset(this.game.camera.x, this.game.camera.y);
    if (day === false){
      this.updateShadowTexture();
      
    }
    if (day === true) {
      this.disableShadowTexture();
    }

    if (player.health <= 0) {
      this.state.start('Level1');

    }

    // Experience 
    playerLevel = Math.round(Math.log(playerXP, gameXPsteps));



  },

  render(game) {
    // if (this.collisionLayer.visible) {
    //   game.debug.body(this.player);
    // }
    game.debug.text(game.time.fps, 5, 14, '#00ff00');
  },


  enemyShot: function (bullets, enemies) {
    enemies.damage(20);
    bullets.kill();
  },


  shootBullet: function (player) {
    if (this.time.now > shootTime) {
      console.log('shootTime', shootTime);
      bullet = bullets.getFirstExists(false);
      if (bullet) {
        bullet.reset(player.x, player.y);
        bullet.body.velocity.x = 10000;
        shootTime = this.time.now + 100;
        bullet.rotation = this.physics.arcade.moveToPointer(bullet, 10000, this.input.activePointer, 100);
        bullet.lifespan = 3000;
        //alt bullet.destroy(3000);
      }
    }
  },
  updateShadowTexture: function () {

    this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
    this.shadowTexture.context.fillRect(0, 0, this.game.width+500, this.game.height+500);

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
  disableShadowTexture: function () {

    this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

    var radius = 900 + this.game.rnd.integerInRange(1, 20),
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
  }

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




// game.world.forEach(function (enemies) {
//   if ((game.physics.arcade.distanceBetween(this.player, this.enemies)) > 200) {
//     if (this.enemies.x == this.player.x) {
//       this.enemies.velocity.x = 0;
//     } else {
//       if (this.enemies.x > (this.player.x + 100)) {
//         this.enemies.x -= 2;
//       }
//       if (this.enemies.x < (this.player.x + 100)) {

//         this.enemies.x += 2;
//       }
//       if (this.enemies.y > this.player.y) {
//         this.enemies.y -= 2;
//       }
//       if (this.player.y > this.enemies.y) {
//         this.enemies.y += 2;
//       }
//     }
//   } else {
//     this.enemies.setAll('body.velocity.x', -200);
//     this.enemies.setAll('body.velocity.y', 0);

//   }
// });
