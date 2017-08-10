
Game.Level1 = function (game) { };
var entrance;
var start;
var tavern = null;
Game.Level1.prototype = {
  create: function (game) {
    let map = this.add.tilemap("tavernTakeTwo");
    map.addTilesetImage('tavern-tileset', 'tiles');

    let layer = map.createLayer('Base');
    layer.resizeWorld();
    let collisionLayer = map.createLayer('Collision');
    this.collisionLayer = collisionLayer;
    collisionLayer.visible = false;
    map.setCollisionByExclusion([], true, this.collisionLayer);
    collisionLayer.resizeWorld();

    let player = game.add.sprite(100, 240, 'player');
    this.player = player;
    player.MOVE_SPEED = 400;
    player.anchor.set(0.5);
    player.scale.set(0.2);
    player.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
    player.animations.add('move', [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], 18, true);
    player.play('move');
    game.physics.arcade.enable(player);
    player.body.setSize(100, 100, 100, 50);
    game.camera.follow(player);

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


    //**** INVENTORY TEST */
    inventory = game.add.image(200, 0, 'inventory');
    inventory.visible = false;
    inventory.scale.set(0.5);
    var style = { font: "16px Courier", fill: "#000", tabs: [164, 120, 80] };
    var headings = ['Name', 'Damage', 'Speed'];
    text = game.add.text(232, 64, '', style);
    text.parseList(headings);
    text.visible = false;
    var swords = [
      ['Knife', '40', '1'],
      ['Flashlight', '5', '1'],
      ['Pistol', '15', '5'],
      ['Rifle', '55', '2'],
      ['Shotgun', '45', '4',]

    ];
    var text2 = game.add.text(232, 120, '', style);
    text2.parseList(swords);
    text2.visible = false;
    text2.fixedToCamera = true;
    text.fixedToCamera = true;
    inventory.fixedToCamera = true;
    //**** INVENTORY TEST */
    game.input.keyboard.addKey(Phaser.KeyCode.I).onDown.add(() => {
      text2.visible = !text2.visible;
      text.visible = !text.visible;
      inventory.visible = !inventory.visible;
    });

     //****** INVENTORY TEST */

  },
  update: function (game) {
    if (this.cutscene) return;

    let keyboardCursors = this.keyboardCursors;
    let wasd = this.wasd;
    let player = this.player;
    let moveSpeed = this.moveSpeed;
    let joystick = this.joystick;

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
      this.state.start('Outside');
    }

    game.physics.arcade.collide(this.player, this.collisionLayer);
    if (Math.abs(player.body.velocity.x) > 0 || Math.abs(player.body.velocity.y) > 0) {
      player.play('move');
    } else {
      player.play('idle');
    }

  },

  render(game) {
    if (this.collisionLayer.visible) {
      game.debug.body(this.player);
    }
    game.debug.text(game.time.fps, 5, 14, '#00ff00');
  },
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




//character display manager.
//observable pattern
