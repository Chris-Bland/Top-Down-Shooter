function keyConfig(State){

    State.keyboardCursors = State.game.input.keyboard.createCursorKeys();
    State.moveSpeed = { x: 0, y: 0 };
    State.playerInteraction = {
      up: State.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: State.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: State.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: State.game.input.keyboard.addKey(Phaser.Keyboard.D),
      shoot: State.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      pistol: State.game.input.keyboard.addKey(Phaser.Keyboard.ONE),
      rifle: State.game.input.keyboard.addKey(Phaser.Keyboard.TWO),
      shotgun: State.game.input.keyboard.addKey(Phaser.Keyboard.THREE),
      flash: State.game.input.keyboard.addKey(Phaser.Keyboard.FOUR),
      menu: State.game.input.keyboard.addKey(Phaser.Keyboard.M)
    };
    State.game.input.keyboard.addKey(Phaser.KeyCode.C).onDown.add(() => {
        State.map.collisionLayer.visible = !State.map.collisionLayer.visible;
    });
    State.showDebug = false;
    State.game.input.keyboard.addKey(Phaser.KeyCode.D).onDown.add(() => {
        State.showDebug = !State.showDebug;
    });

}