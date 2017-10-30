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
        State.hasOpened = false;

    },
    update: function (State) {
        var npc = State.npc;
        if (Phaser.Rectangle.containsPoint(State.buyNpcRectangle, State.player.position)) {
            State.hasOpened = true;
            shop.prototype.buyStuff(State)
            npc.play('idle');
           
        } else {
          
            npc.play('attack');
            State.npc.rotation = State.game.physics.arcade.angleToXY(State.npc, 600, 330);
            if (State.hasOpened === true){
            shop.prototype.hideShop(State);
            }
           }
    },


};


