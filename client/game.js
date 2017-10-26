var game = new Phaser.Game(1200,700);
game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('levelOutside', LevelOutside);
game.state.add('levelHouse', LevelHouse);
game.state.add('GameMenu', GameMenu);
game.state.add('Controls', Controls);
game.state.add('Credits', Credits);
game.state.add('BossUi', BossUi);
game.state.add('InsideUi', InsideUi);
game.state.add('OutsideUi', OutsideUi);
game.state.start('Boot');



//Socket.io should set the gameSave as this if there is not any gameSave on the user and load one if there is
//And these should be set as method to the gameSave object
