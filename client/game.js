var game = new Phaser.Game(1200,700);
game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
game.state.add('levelOutside', LevelOutside);
game.state.add('levelHouse', LevelHouse);
game.state.start('Boot');



//Socket.io should set the gameSave as this if there is not any gameSave on the user and load one if there is
//And these should be set as method to the gameSave object
