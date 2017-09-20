

Preloader = function () {
    Preloader.preloadBar = null;
};

Preloader.prototype.preload = function () {
    var blackURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY6AzYGAAAAByAAHo7e7HAAAAAElFTkSuQmCC';
    var fireFilter = 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Fire.js';


    this.load.tilemap('outside', './client/assets/TMX/BETA-MAP/outside-beta.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('large-map', './client/assets/TMX/BETA-MAP/large-map.png');


    this.load.tilemap('inside', './client/assets/maps/level-inside.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('inside-tileset', './client/assets/maps/inside-tileset.png');


    this.load.atlas('player', './client/assets/animations/player-rifle.png', './client/assets/animations/player-rifle.json');
    this.load.atlas('flashlight-enemy', './client/assets/sprites/flashlight-enemy.png', './client/assets/sprites/flashlight-enemy.json');
    this.load.atlas('shotgun-enemy', './client/assets/sprites/shotgun-enemy.png', './client/assets/sprites/shotgun-enemy.json');


    this.load.image('button', './client/assets/sprites/button.png');
    this.load.image('menu-image', './client/assets/sprites/menu-image.png');
    this.load.image('bullet', './client/assets/sprites/bullet.png');
    this.load.image('fog-of-war', blackURI);


    // Tiled exported tilemap
    // this.load.tilemap('outside', './client/assets/maps/level-outside.json', null, Phaser.Tilemap.TILED_JSON);
    // this.load.image('outside-tileset', './client/assets/maps/outside-tileset.png');
    // this.load.tilemap('inside', './client/assets/maps/level-inside.json', null, Phaser.Tilemap.TILED_JSON);
    // this.load.image('inside-tileset', './client/assets/maps/inside-tileset.png');
    //
    // this.load.atlas('player', './client/assets/animations/player-rifle.png', './client/assets/animations/player-rifle.json');
    // this.load.atlas('flashlight-enemy', './client/assets/sprites/flashlight-enemy.png', './client/assets/sprites/flashlight-enemy.json');
    // this.load.atlas('shotgun-enemy', './client/assets/sprites/shotgun-enemy.png', './client/assets/sprites/shotgun-enemy.json');
    //
    // this.load.image('button', './client/assets/sprites/button.png');
    // this.load.image('menu-image', './client/assets/sprites/menu-image.png');
    // this.load.image('bullet', './client/assets/sprites/bullet.png');
    // this.load.image('fog-of-war', blackURI);


    this.load.script('filter', fireFilter);
};

Preloader.prototype.create = function () {
    game.state.start('MainMenu');
};
