

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

    this.load.atlasJSONHash(
        'npc',
        './client/assets/sprites/zombieSS.png',
        './client/assets/sprites/zombieSS.json'
    );

    this.load.atlasJSONHash(
        'tower',
        './client/assets/sprites/towerSS.png',
        './client/assets/sprites/towerSS.json'
    );

    this.load.atlasJSONHash(
        'helio',
        './client/assets/sprites/helioSS.png',
        './client/assets/sprites/helioSS.json'
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
    this.load.audio('rifle-echo', './client/assets/audio/rifle-short.mp3');
    this.load.audio('shotgun', './client/assets/audio/shotgun.mp3');
    this.load.audio('laser', './client/assets/audio/laser.mp3');
    this.load.audio('boss-spawn', './client/assets/audio/bossSpawn.mp3');
    

    this.load.image('hero-ui', './client/assets/ui/hud.png');
    this.load.image('hero-ui-xp-tic', './client/assets/ui/xp-ui.png');     
    this.load.image('hero-ui-health-tic', './client/assets/ui/health-ui.png');     

    this.load.image('level-ui', './client/assets/ui/level-ui.png'); 

    this.load.image('weapon-ui', './client/assets/ui/weaponHud.png');
    this.load.image('selected-ui', './client/assets/ui/selected.png');

    this.load.image('boss-ui', './client/assets/ui/boss.png');  
    this.load.image('boss-health-bar', './client/assets/ui/boss-health-ui.png');     
    this.load.image('boss-health-tic', './client/assets/ui/boss-ui-health.png');     
    
    this.load.image('wave-ui', './client/assets/ui/wave-ui.png');     
    
    this.load.image('merc-ui', './client/assets/ui/merc-ui.png');     
    this.load.image('merc-ui-red', './client/assets/ui/merc-ui-red.png');     
    this.load.image('merc-ui-green', './client/assets/ui/merc-ui-green.png');     
    
    this.load.image('currency-icon', './client/assets/ui/btc.png');

    this.load.image('store', './client/assets/ui/store.png');
    this.load.image('work-bench', './client/assets/sprites/workBench.png');



};

Preloader.prototype.create = function () {
    // game.state.start('MainMenu');
    game.state.start('levelOutside');
};
