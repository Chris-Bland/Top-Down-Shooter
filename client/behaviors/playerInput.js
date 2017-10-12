behaviorsObj.prototype.playerInput = function(State){
    
        //no sliding
        State.player.body.velocity.x = 0;
        State.player.body.velocity.y = 0;
    
        //checking key press for sprite movement
        if (State.keyboardCursors.left.isDown || State.playerInteraction.left.isDown) State.moveSpeed.x = -State.player.MOVE_SPEED;
        else if (State.keyboardCursors.right.isDown || State.playerInteraction.right.isDown) State.moveSpeed.x = State.player.MOVE_SPEED;
        else State.moveSpeed.x = 0;
        if (State.keyboardCursors.up.isDown || State.playerInteraction.up.isDown) State.moveSpeed.y = -State.player.MOVE_SPEED;
        else if (State.keyboardCursors.down.isDown || State.playerInteraction.down.isDown) State.moveSpeed.y = State.player.MOVE_SPEED;
        else State.moveSpeed.y = 0;
        if (Math.abs(State.moveSpeed.x) > 0 || Math.abs(State.moveSpeed.y) > 0) {
            State.player.body.velocity.x = State.moveSpeed.x;
            State.player.body.velocity.y = State.moveSpeed.y;
        }
    
        //changes player to face mouse
        State.player.rotation = State.game.physics.arcade.angleToPointer(State.player);

        //add keys to switch the gun
        if (State.playerInteraction.pistol.isDown) {
            State.player.gun = State.player.pistol;
            State.player.bullets = State.player.pistolbullets;
            State.player.idle = pistolIdle(State);
            State.player.move = pistolMove(State);
            State.player.shoot = pistolShoot(State);
        };
        if (State.playerInteraction.rifle.isDown) {
            State.player.gun = State.player.rifle;
            State.player.bullets = State.player.riflebullets;
            State.player.idle = rifleIdle(State);
            State.player.move = rifleMove(State);
            State.player.shoot = rifleShoot(State);
        };
        if (State.playerInteraction.shotgun.isDown) {
            State.player.gun = State.player.shotgun;
            State.player.bullets = State.player.shotgunbullets;
            State.player.idle = shotgunIdle(State);
            State.player.move = shotgunMove(State);
            State.player.shoot = shotgunShoot(State);
        };
        if (State.playerInteraction.flash.isDown) {
            State.player.gun = State.player.flash;
            State.player.bullets = State.player.flashbullets;
            State.player.idle = flashlightIdle(State);
            State.player.move = flashlightMove(State);
            State.player.shoot = flashlightAttack(State);
        };
    
        //shoot on mouse click
        if (State.game.input.mousePointer.isDown) {
            State.player.shoot;
            State.player.gun.shoot(State, State.player, State.game.input.activePointer);
        }
    
        //update player sprite sheet
        if (Math.abs(State.player.body.velocity.x) > 0 || Math.abs(State.player.body.velocity.y) > 0) {
            State.player.move;
        } else {
            State.player.idle;
        }

        //Send to menu
        if (State.playerInteraction.menu.isDown) State.game.state.start('MainMenu');

        function pistolIdle(State){

            State.player.play('pistol-idle');

        };

        function pistolMove(State){
            
            State.player.play('pistol-move');            
            
        };

        function pistolShoot(State){
            
            State.player.play('pistol-shoot');            
            
        };

        function rifleIdle(State){

            State.player.play('rifle-idle');

        };

        function rifleMove(State){
            
            State.player.play('rifle-move');            
            
        };

        function rifleShoot(State){
            
            State.player.play('rifle-shoot');            
            
        };

        function shotgunIdle(State){
            
            State.player.play('shotgun-idle');

        };

        function shotgunMove(State){
            
            State.player.play('shotgun-move');            
            
        };

        function shotgunShoot(State){
            
            State.player.play('shotgun-shoot');            
            
        };

        function flashlightIdle(State){

            State.player.play('flashlight-idle');

        };

        function flashlightMove(State){
            
            State.player.play('flashlight-move');           
            
        };

        function flashlightAttack(State){
            
            State.player.play('flashlight-attack');           
            
        };

}