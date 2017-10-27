var Credits = function() {};
Credits.prototype = {
    create: function(){
        starfield = game.add.tileSprite(0, 0, 1920, 1080, 'stars');
        GameMenu.prototype.addMenuOption('Back', 10 ,640, function () {
            game.state.start("GameMenu");
        });
        ship1 = game.add.sprite(-200 ,260, 'ship-1');
        ship1.fixedToCamera = false;

        ship2 = game.add.sprite(-200,200, 'ship-2');
        ship2.fixedToCamera = false;

        ship3 = game.add.sprite(-200,550, 'ship-3');
        ship3.fixedToCamera = false;

        planet1 = game.add.sprite(1300,450, 'planet-1');
        planet1.fixedToCamera = false;

        planet2 = game.add.sprite(1300,100, 'planet-2');
        planet2.fixedToCamera = false;

        planet3 = game.add.sprite(1300,game.camera.height/2, 'planet-3');
        planet3.fixedToCamera = false;

        heroShip = game.add.sprite(game.camera.width / 2 -300,300, 'hero-ship');
        heroShip.fixedToCamera=false;

        bigShip = game.add.sprite(-400,300, 'big-ship');
        bigShip.fixedToCamera = false;

        phaserImage = game.add.sprite(game.camera.width/2,game.camera.height/2, 'phaser');
        phaserImage.fixedToCamera = true;
        phaserImage.alpha = 0;
        phaserImage.anchor.setTo(.5);

        austin =game.add.sprite(game.camera.width/3,game.camera.height/2,'austin');
        austin.fixedToCamera = true;
        austin.anchor.setTo(.5);
        austin.scale.setTo(.7);
        austin.alpha = 0;

        chris = game.add.sprite((game.camera.width/3)*2,game.camera.height/2, 'chris');
        chris.fixedToCamera = true;
        chris.anchor.setTo(.5);
        chris.scale.setTo(.7);
        chris.alpha = 0;

        titleText1 = game.add.text(game.camera.width/2 ,150, "Created By", {
            font: 'bold 70pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
          });
          titleText1.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        titleText1.anchor.set(0.5);
        titleText1.fixedToCamera = true;
        titleText1.alpha=0;

        titleText2 = game.add.text(game.camera.width/3 ,550, "Austin Hughes", {
            font: 'bold 30pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
          });
          titleText2.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        titleText2.anchor.set(0.5);
        titleText2.fixedToCamera = true;
        titleText2.alpha=0;

        titleText3 = game.add.text((game.camera.width/3)*2,550, "Chris Bland", {
            font: 'bold 30pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
          });
          titleText3.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        titleText3.anchor.set(0.5);
        titleText3.fixedToCamera = true;
            titleText3.alpha = 0;

        game.add.tween(heroShip).from( { x: -300 }, 5000, Phaser.Easing.Bounce.Out, true);
        game.add.tween(phaserImage).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);
        game.time.events.add(2500, this.planetTween);
        game.time.events.add(3000, this.fadeTween);
        game.time.events.add(4000, this.linearTweenHero);
        game.time.events.add(4500, this.fadeIn);
        game.time.events.add(8500, this.fadeOut);
        game.time.events.add(9500, this.linearTween);
        game.time.events.add(10000, this.linearTweenOut);
        game.time.events.add(16000, this.nextState);
    },
    planetTween: function(){
        game.add.tween(planet1).to( { x: -500 }, 6500, Phaser.Easing.Linear.None, true);
        game.add.tween(planet2).to( { x: -500 }, 11000, Phaser.Easing.Linear.None, true);
        game.add.tween(planet3).to( { x: -500 }, 20000, Phaser.Easing.Linear.None, true);
    },
    linearTween: function(){
        game.add.tween(bigShip).to( { x: 100 }, 3000, Phaser.Easing.Linear.None, true);
        game.add.tween(ship1).to( { x: 55 }, 3000, Phaser.Easing.Linear.None, true);
        game.add.tween(ship2).to( { x: 200 }, 3000, Phaser.Easing.Linear.None, true);
        game.add.tween(ship3).to( { x: 76 }, 3000, Phaser.Easing.Linear.None, true);
    },
    linearTweenOut: function(){
        game.add.tween(bigShip).to( { x: 1800 }, 6000, Phaser.Easing.Linear.None, true);
        game.add.tween(ship1).to( { x:1800 }, 5000, Phaser.Easing.Linear.None, true);
        game.add.tween(ship2).to( { x: 1800 }, 7000, Phaser.Easing.Linear.None, true);
        game.add.tween(ship3).to( { x: 1800 }, 3000, Phaser.Easing.Linear.None, true);
    },
    linearTweenHero: function(){
        game.add.tween(heroShip).to( { x: 1800 }, 6000, Phaser.Easing.Bounce.Out, true);
    },
    fadeTween: function(){
        game.add.tween(phaserImage).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    },
    fadeIn: function(){
        game.add.tween(chris).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);
        game.add.tween(austin).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);
        game.add.tween(titleText1).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);
        game.add.tween(titleText2).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);
        game.add.tween(titleText3).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);
    },
    fadeOut: function(){
        game.add.tween(chris).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(austin).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(titleText1).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(titleText2).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(titleText3).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    },
    nextState: function(){
        game.state.start('LandingScene');
    },
    update: function(){
            starfield.tilePosition.x -= 10;
    },
};
