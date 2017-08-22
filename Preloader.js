Game.Preloader = function (game) {
    this.preloadBar = null;
};

var blackURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY6AzYGAAAAByAAHo7e7HAAAAAElFTkSuQmCC';
var fireFilter = 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Fire.js';
Game.Preloader.prototype = {
    preload: function () {
        // Tiled exported tilemap
        this.load.tilemap('outside', './assets/maps/level-outside.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('outside-tileset', './assets/maps/outside-tileset.png');
        this.load.tilemap('inside', './assets/maps/level-inside.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('inside-tileset', './assets/maps/inside-tileset.png');

        this.load.atlas('player', './assets/animations/player-rifle.png', './assets/animations/player-rifle.json');
        this.load.atlas('flashlight-enemy', './assets/sprites/flashlight-enemy.png', './assets/sprites/flashlight-enemy.json');
        this.load.atlas('shotgun-enemy', './assets/sprites/shotgun-enemy.png', './assets/sprites/shotgun-enemy.json');

         this.load.image('button', './assets/sprites/button.png');
         this.load.image('menu-image', './assets/sprites/menu-image.png');
         this.load.image('bullet', './assets/sprites/bullet.png');
         this.load.image('fog-of-war', blackURI);

         this.load.script('filter', fireFilter);
    },
        

    create: function () {
        this.state.start('MainMenu');
    }
}
