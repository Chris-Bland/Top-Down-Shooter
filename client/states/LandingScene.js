var LandingScene = function () { };
LandingScene.prototype = {

    create: function () {
        mountains = game.add.tileSprite(0, 0, 2048, 1028, 'mountains');
        game.world.setBounds(0, 0, 2048, 1028);
        game.physics.startSystem(Phaser.Physics.P2JS);

        heroShip = game.add.sprite(game.world.centerX/2, 0, 'hero-ship');
        game.physics.p2.enable(heroShip);
        heroShip.body.velocity.x = 0;
        heroShip.body.velocity.x = 0;
        game.physics.arcade.moveToXY(heroShip, game.world.centerX/2, game.world.centerY, 50);
        // ship1.fixedToCamera = true;

        GameMenu.prototype.addMenuOption('Menu', 10, 640, function () {
            game.state.start("GameMenu");
        });
       
        game.camera.follow(heroShip);

        emitter = game.add.emitter(game.world.centerX/2, 0, 600);
        emitter.width = 30;
        emitter.makeParticles('smoke');
        emitter.setXSpeed(0, 0);
        emitter.setYSpeed(0, 0);
        emitter.setRotation(0, 0);
        emitter.setAlpha(0.1, 1, 6000);
        emitter.setScale(0.1, .2, 0.1, .2, 6000, Phaser.Easing.Quintic.Out);
        emitter.gravity = -40;
        emitter.start(false, 4000, 20);
        emitter.emitX = game.world.centerX/2;
        emitter.emitY = 0;
        game.add.tween(emitter).to({ y: 780 }, 3000, Phaser.Easing.Linear.None, true);

        ship1 = game.add.sprite( 1700,-10, 'ship-1');
        ship2 = game.add.sprite(1900,-20, 'ship-2');
        ship3 = game.add.sprite(1300,-30, 'ship-3');
        troop1 = game.add.sprite(1560,630, 'troop1');
        troop2 = game.add.sprite(1580,650, 'troop2');
        // troop3 = game.add.sprite(1590,670, 'troop3');
        troop4 = game.add.sprite(1600,610, 'troop4');
        troop1.alpha = 0;
        troop2.alpha = 0;
        // troop3.alpha = 0;
        troop4.alpha = 0;
  
        beam = game.add.sprite(1560,700,'beam');
        beam.alpha = 0;
        bigShip = game.add.sprite(1400,-100, 'big-ship');

    
       

         game.time.events.add(8500, function(){
             game.camera.follow(bigShip)
             game.add.tween(bigShip).to( { x: 1400, y: 600 }, 6000, Phaser.Easing.Linear.None, true);
             game.add.tween(ship1).to( { x: 1700, y: 790 }, 6000, Phaser.Easing.Linear.None, true);
             game.add.tween(ship2).to( { x: 1900, y: 740 }, 6000, Phaser.Easing.Linear.None, true);
             game.add.tween(ship3).to( { x: 1300, y: 760 }, 6000, Phaser.Easing.Linear.None, true);
            });

        game.time.events.add((8500+5700), function(){
            bossSpawn.play();
            game.camera.shake(0.005, 500);
            game.add.tween(beam).to( { alpha: .5 }, 1500, Phaser.Easing.Bounce.In, true);
            game.add.tween(troop1).to( { y: 850 }, 6000, Phaser.Easing.Linear.None, true);
            game.add.tween(troop2).to( { y: 850 }, 6000, Phaser.Easing.Linear.None, true);
            // game.add.tween(troop3).to( { y: 850 }, 6000, Phaser.Easing.Linear.None, true);
            game.add.tween(troop4).to( { y: 850 }, 6000, Phaser.Easing.Linear.None, true);
            troop1.alpha =1;
            troop2.alpha = 1;
            // troop3.alpha = 1;
            troop4.alpha = 1;
            game.time.events.add((8000), function(){ game.state.start('GameMenu');});
        })
        

    },
    update: function () {
        if (heroShip.world.y >781 && heroShip.world.y < 785 ){
            heroShip.body.velocity.y = 0;
        };

        emitter.customSort(this.scaleSort, this);

    },

    scaleSort: function (a, b) {
        if (a.scale.x < b.scale.x) {
            return -1;
        }
        else if (a.scale.x > b.scale.x) {
            return 1;
        }
        else {
            return 0;
        }
    }
};