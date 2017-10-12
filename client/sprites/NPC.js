var NPC = function() {};

NPC.prototype = {

    create: function(State){

        let npc = game.add.sprite( State.map.entrance.x, State.map.entrance.y - 200, 'flashlight-enemy');
        npc.tint = 0xffff00;
        npc.anchor.set(0.5);
        npc.scale.set(0.2);
        npc.animations.add('idle', [0, 1, 2, 3, 5, 6, 7, 8, 14, 19, 20], 20, true);
        npc.play('idle');
        game.physics.arcade.enable(npc);
        npc.body.setSize(200, 300, 100, 50);
        npc.body.collideWorldBounds = true;
    
        State.npc = npc;

    },

    update: function(State){

        State.npc.rotation = State.game.physics.arcade.angleToXY(State.npc, State.player.x, State.player.y);
        State.game.physics.arcade.overlap(State.npc, State.player, this.buyStuff());

    },

    buyStuff: function(npc, player){

        this.createButton(game,"Mercs: 5000 currency",game.world.centerX,game.world.centerY +32, 300, 100, function(){
            if(gameStatHandler.prototype.currency >= 5000){
                gameStatHandler.prototype.mercsAmount += 1;
                gameStatHandler.prototype.currency -= 5000;
            }
        });
        this.createButton(game,"Towers: 2500 currency",game.world.centerX,game.world.centerY +110, 300, 100, function(){
            if(gameStatHandler.prototype.currency >= 2500){
                gameStatHandler.prototype.towersAmount += 1;
                gameStatHandler.prototype.currency -= 2500;
            }
        });
        this.createButton(game,"Back to the fight!!!",game.world.centerX,game.world.centerY +182, 300, 100, function(){
            gameStatHandler.prototype.wave += 1;
            game.state.start('levelOutside');
        });

    },

    createButton: function(game,string,x,y,width,height,callback){
        var button1 = game.add.button(x,y,'button',callback,game,2,1,0);
        this.buttons = game.add.group();
        this.buttons.add(button1);
        button1.anchor.setTo(0.5,0.5);
        button1.width = width;
        button1.height = height;
        var text = game.add.text(button1.x,button1.y, string, {font:"12px Arial", fill:"#fff", align:"center"});
        text.anchor.setTo(0.5,0.5);
    }

};