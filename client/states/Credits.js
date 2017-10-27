var Credits = function() {};
var cursors;
var starfield;
var bigShip;
Credits.prototype = {
   

    create: function(){
        starfield = game.add.tileSprite(0, 0, 1200, 700, 'stars');
        cursors = game.input.keyboard.createCursorKeys();
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

        game.add.tween(heroShip).from( { x: -300 }, 3000, Phaser.Easing.Bounce.Out, true);
        game.time.events.add(2500, this.planetTween);
        game.time.events.add(4000, this.linearTweenHero);
        game.time.events.add(5500, this.linearTween);
        game.time.events.add(7000, this.linearTweenOut);

        



    },
    planetTween: function(){
        game.add.tween(planet1).to( { x: -500 }, 6500, Phaser.Easing.Linear.None, true);
        game.add.tween(planet2).to( { x: -500 }, 11000, Phaser.Easing.Linear.None, true);
        game.add.tween(planet3).to( { x: -500 }, 20000, Phaser.Easing.Linear.None, true);
    },
    linearTween: function(){
        game.add.tween(bigShip).to( { x: 100 }, 3000, Phaser.Easing.Linear.None, true);
        game.add.tween(ship1).to( { x: 55 }, 3000, Phaser.Easing.Bounce.Out, true);
        game.add.tween(ship2).to( { x: 200 }, 3000, Phaser.Easing.Bounce.Out, true);
        game.add.tween(ship3).to( { x: 76 }, 3000, Phaser.Easing.Bounce.Out, true);
 
    },
    linearTweenOut: function(){
        game.add.tween(bigShip).to( { x: 1800 }, 6000, Phaser.Easing.Linear.None, true);
        game.add.tween(ship1).to( { x:1800 }, 5000, Phaser.Easing.Bounce.Out, true);
        game.add.tween(ship2).to( { x: 1800 }, 7000, Phaser.Easing.Bounce.Out, true);
        game.add.tween(ship3).to( { x: 1800 }, 3000, Phaser.Easing.Bounce.Out, true);
    },
    linearTweenHero: function(){
        game.add.tween(heroShip).to( { x: 1800 }, 6000, Phaser.Easing.Bounce.Out, true);
    },
    fadePicture: function(){
        // game.add.tween(bigShip).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    },

    update: function(){
        //3 seconds planets start coming
        //5 seconds tween for awhile
        //Ships come in
        //hero flees
        //last planet
        //ships follow
    
            starfield.tilePosition.x -= 10;

    },
   



};
