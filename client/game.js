var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, document.getElementById('game'));
game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
game.state.add('levelOutside', LevelOutside);
game.state.add('levelHouse', LevelHouse);
game.state.start('Boot');

// var gameSave = {
//
//     towers: [],
//
//     mercs: [],
//
//     wave: 0,
//
//     player: {},
//
//     weapons: [],
//
//     save: ,
//
//     load:
//
// };


//Socket.io should set the gameSave as this if there is not any gameSave on the user and load one if there is
//And these should be set as method to the gameSave object