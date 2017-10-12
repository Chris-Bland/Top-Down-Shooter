

Preloader = function () {
    Preloader.preloadBar = null;
};

Preloader.prototype.preload = function () {
    var blackURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY6AzYGAAAAByAAHo7e7HAAAAAElFTkSuQmCC';

    this.load.tilemap('outside', './client/assets/maps/outside-beta.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('large-map', './client/assets/maps/large-map.png');

    this.load.tilemap('inside', './client/assets/maps/inside.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('inside-tileset', './client/assets/maps/outside-tileset.png');

    this.load.atlasJSONHash(
        'player',
        './client/assets/animations/player.png',
        './client/assets/animations/player.json'
    );
    this.load.atlas('merc', './client/assets/animations/player-rifle.png', './client/assets/animations/player-rifle.json');
    this.load.atlas('flashlight-enemy', './client/assets/sprites/flashlight-enemy.png', './client/assets/sprites/flashlight-enemy.json');
    this.load.atlas('shotgun-enemy', './client/assets/sprites/shotgun-enemy.png', './client/assets/sprites/shotgun-enemy.json');


    this.load.image('button', './client/assets/sprites/button.png');
    this.load.image('menu-image', './client/assets/sprites/menu-image.png');
    this.load.image('bullet', './client/assets/sprites/bullet.png');
    this.load.image('fog-of-war', blackURI);

    this.load.audio('pistol', './client/assets/audio/pistol.mp3');
    this.load.audio('rifle', './client/assets/audio/rifle.mp3');
    this.load.audio('rifle-echo', './client/assets/audio/rifle-echo.mp3');
    this.load.audio('shotgun', './client/assets/audio/shotgun.mp3');
    this.load.audio('laser', './client/assets/audio/laser.mp3');
    this.load.audio('boss-spawn', './client/assets/audio/bossSpawn.mp3');



};

Preloader.prototype.create = function () {
    game.state.start('MainMenu');
};
