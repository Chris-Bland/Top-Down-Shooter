var Credits = function() {};
var cursors;
var starfield;
Credits.prototype = {
   

    create: function(){
        starfield = game.add.tileSprite(0, 0, 1200, 700, 'stars');
        cursors = game.input.keyboard.createCursorKeys();
        GameMenu.prototype.addMenuOption('Back', 10 ,640, function () {
            game.state.start("GameMenu");
        });
        ship1 = game.add.sprite(game.camera.width / 2 +20 ,10, 'ship-1');
        ship1.fixedToCamera = true;

        ship2 = game.add.sprite(game.camera.width / 2+ 100,10, 'ship-2');
        ship2.fixedToCamera = true;

        ship3 = game.add.sprite(game.camera.width / 2 +300,10, 'ship-3');
        ship3.fixedToCamera = true;

        planet1 = game.add.sprite(game.camera.width / 2 -100,10, 'planet1');
        planet1.fixedToCamera = true;

        planet2 = game.add.sprite(game.camera.width / 2-300,10, 'planet-2');
        planet2.fixedToCamera = true;

        planet3 = game.add.sprite(game.camera.width / 2 -500,10, 'planet-3');
        planet3.fixedToCamera = true;

        heroShip = game.add.sprite(game.camera.width / 2 -300,300, 'hero-ship');
        heroShip.fixedToCamera = true;

        bigShip = game.add.sprite(game.camera.width / 2 -500,500, 'big-ship');
        bigShip.fixedToCamera = true;
    },

    update: function(){

       
    
        if (cursors.up.isDown)
        {
            starfield.tilePosition.y += 4;
        }
        else if (cursors.down.isDown)
        {
            starfield.tilePosition.y -= 4;
        }
    
        if (cursors.left.isDown)
        {
            starfield.tilePosition.x += 4;
        }
        else if (cursors.right.isDown)
        {
            starfield.tilePosition.x -= 4;
        }
    },
    // render: function() {
    //         game.debug.cameraInfo(game.camera, 32, 32); 
    //     }



};
