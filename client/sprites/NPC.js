var NPC = function () { };

NPC.prototype = {

    create: function (State) {
        State.workBench = State.game.add.sprite(600, 390, 'work-bench');
        State.workBench.scale.setTo(0.09);
        State.workBench.angle = -90;

        var npc = game.add.sprite(600, 330, 'npc');
        npc.tint = 0xffff00;
        npc.anchor.set(0.5);
        npc.scale.set(0.2);

        npc.animations.add('idle', Phaser.Animation.generateFrameNames('skeleton-idle_', 1, 16, '.png', 2), 16, true, false);
        npc.animations.add('move', Phaser.Animation.generateFrameNames('skeleton-move_', 1, 16, '.png', 2), 16, true, false);
        npc.animations.add('attack', Phaser.Animation.generateFrameNames('skeleton-attack_', 1, 8, '.png', 2), 8, true, false);
        npc.play('idle');
        game.physics.arcade.enable(npc);
        npc.body.setSize(200, 300, 100, 50);
        npc.body.collideWorldBounds = true;
        State.npc = npc;
        State.buyNpcRectangle = new Phaser.Rectangle(State.npc.x - 40, State.npc.y - 40, State.npc.width + 40, State.npc.height + 40);
        State.store = State.game.add.sprite(State.game.camera.width / 3, State.game.camera.height/ 2, 'store');
        State.store.fixedToCamera = true;
        State.store.scale.setTo(1.5);
        State.store.visible = false;
    },
    update: function (State) {
        var npc = State.npc;
        if (Phaser.Rectangle.containsPoint(State.buyNpcRectangle, State.player.position)) {
            this.buyStuff(State)
            npc.play('idle');
           
        } else {
            State.store.visible = false;
            npc.play('attack');
            State.npc.rotation = State.game.physics.arcade.angleToXY(State.npc, 600, 330);
            
           }
    },

    buyStuff: function (State, npc, player) {
        State.store.visible = true;
        State.npc.rotation = State.game.physics.arcade.angleToXY(State.npc, State.player.x, State.player.y);

        this.createButton(game,"",game.world.centerX+43, game.world.centerY +28, 50, 52, function(){
            if(gameStatHandler.prototype.currency >= 500 && gameStatHandler.prototype.towersAmount < 72){
                gameStatHandler.prototype.towersAmount += 1;
                gameStatHandler.prototype.currency -= 500;
            }
        });
        this.createButton(game,"",game.world.centerX +98,game.world.centerY +28, 50, 52, function(){
            if(gameStatHandler.prototype.currency >= 250 && gameStatHandler.prototype.mercsAmount < 3){
                gameStatHandler.prototype.mercsAmount += 1;

                gameStatHandler.prototype.currency -= 250;
            }
        });
        this.createButton(game,"",game.world.centerX + 153,game.world.centerY +28, 50, 52, function(){
            if(gameStatHandler.prototype.currency >= 100){
                gameStatHandler.prototype.healthPoints += 1;
                State.player.maxHealth += 50;
                State.player.health = State.player.maxHealth;
                gameStatHandler.prototype.currency -= 100;
            }
        });
        this.createButton(game,"",game.world.centerX + 43,game.world.centerY +83, 50, 52, function(){
            
         });
         this.createButton(game,"",game.world.centerX + 98,game.world.centerY +83, 50, 52, function(){
            
         });
         this.createButton(game,"",game.world.centerX + 153,game.world.centerY +83, 50, 52, function(){
            
         });
         this.createButton(game,"",game.world.centerX + 43,game.world.centerY +138, 50, 52, function(){
            
         });
         this.createButton(game,"",game.world.centerX + 98,game.world.centerY +138, 50, 52, function(){
            
         });
         this.createButton(game,"",game.world.centerX + 153,game.world.centerY +138, 50, 52, function(){
            
         });
    },

    createButton: function (game, string, x, y, width, height, callback) {
        var button = game.add.button(x, y, 'button', callback, game, 2, 1, 0);
        this.buttons = game.add.group();
        this.buttons.add(button);
        button.anchor.setTo(0.5, 0.5);
        button.width = width;
        button.height = height;
        button.fixedToCamera = true;
        button.alpha = 0;
        var text = game.add.text(button.x, button.y, string, { font: "12px Arial", fill: "#fff", align: "center" });
        text.anchor.setTo(0.5, 0.5);
    }

};


