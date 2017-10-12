var game = new Phaser.Game(1200,700);
game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
game.state.add('levelOutside', LevelOutside);
game.state.add('levelHouse', LevelHouse);
game.state.start('Boot');


