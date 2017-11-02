

Preloader = function () {
    Preloader.preloadBar = null;
};

Preloader.prototype.preload = function () {
    var blackURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY6AzYGAAAAByAAHo7e7HAAAAAElFTkSuQmCC';

    this.load.tilemap('outside', './client/assets/maps/outside-beta.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('large-map', './client/assets/maps/large-map.png');

    this.load.tilemap('inside', './client/assets/maps/inside.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('inside-tileset', './client/assets/maps/outside-tileset.png');

    this.load.tilemap('dungeon', './client/assets/maps/dungeon.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('dungeon-tileset', './client/assets/maps/dungeon-tileset.png');

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
    this.load.image('menu-bg', './client/assets/ui/menu-bg-new.jpg');
    this.load.image('bullet', './client/assets/sprites/bullet.png');
    this.load.image('fog-of-war', blackURI);

    this.load.image('logo', './client/assets/ui/gameLogo.png')

    this.load.audio('pistol', './client/assets/audio/pistol.mp3');
    this.load.audio('rifle', './client/assets/audio/rifle.mp3');
    this.load.audio('rifle-echo', './client/assets/audio/rifle-short.mp3');
    this.load.audio('rocket', './client/assets/audio/rocket.mp3');
    this.load.audio('laser', './client/assets/audio/laser.mp3');
    this.load.audio('boss-spawn', './client/assets/audio/bossSpawn.mp3');


    this.load.image('hero-ui', './client/assets/ui/hud.png');
    this.load.image('hero-ui-xp-tic', './client/assets/ui/xp-ui.png');
    this.load.image('hero-ui-health-tic', './client/assets/ui/health-ui.png');

    this.load.image('level-ui', './client/assets/ui/level-ui.png');

    this.load.image('weapon-ui', './client/assets/ui/weaponHud.png');
    this.load.image('selected-ui', './client/assets/ui/selected.png');

    this.load.image('house-health-bar', './client/assets/ui/house-health.png');
    this.load.image('house-health-tic', './client/assets/ui/house-health-tic.png');

    this.load.image('boss-ui', './client/assets/ui/boss.png');
    this.load.image('boss-health-bar', './client/assets/ui/boss-health-ui.png');
    this.load.image('boss-health-tic', './client/assets/ui/boss-ui-health.png');

    this.load.image('wave-ui', './client/assets/ui/wave-ui.png');

    this.load.image('merc-ui', './client/assets/ui/merc-ui.png');
    this.load.image('merc-ui-red', './client/assets/ui/merc-ui-red.png');
    this.load.image('merc-ui-green', './client/assets/ui/merc-ui-green.png');

    this.load.image('currency-icon', './client/assets/ui/btc.png');

    this.load.image('work-bench', './client/assets/sprites/workBench.png');

    game.load.audio('music', './client/assets/audio/music.mp3');
    game.load.audio('dungeon-music', './client/assets/audio/dungeon-music.mp3');

    this.load.image('boss-slide', './client/assets/ui/bossSlide.png');
    this.load.image('outside-ui-slide', './client/assets/ui/outsideUi.png');
    this.load.image('inside-ui-slide', './client/assets/ui/insideUi.png');
    this.load.image('controls-slide', './client/assets/ui/controls.png');

    this.load.image('mountains', './client/assets/animations/mountains.png');

    this.load.image('stars', './client/assets/animations/stars.jpg');
    this.load.image('ship-1', './client/assets/animations/ship1.png');
    this.load.image('ship-2', './client/assets/animations/ship2.png');
    this.load.image('ship-3', './client/assets/animations/ship3.png');
    this.load.image('planet-1', './client/assets/animations/planet1.png');
    this.load.image('planet-2', './client/assets/animations/planet2.png');
    this.load.image('planet-3', './client/assets/animations/planet3.png');
    this.load.image('hero-ship', './client/assets/animations/heroShip.png');
    this.load.image('big-ship', './client/assets/animations/bigShip.png');

    this.load.image('smoke', './client/assets/animations/smoke-puff.png');

    this.load.image('chris', './client/assets/animations/chris.jpg');
    this.load.image('austin', './client/assets/animations/austin.jpg');
    this.load.image('phaser', './client/assets/animations/phaser.png');
    
    this.load.image('beam', './client/assets/animations/beam.png');

    this.load.image('troop1', './client/assets/animations/troop1.png');
    this.load.image('troop2', './client/assets/animations/troop2.png');
    this.load.image('troop3', './client/assets/animations/troop3.png');
    this.load.image('troop4', './client/assets/animations/troop4.png');

    this.load.atlasJSONHash(
        'rocket',
        './client/assets/animations/rocket.png',
        './client/assets/animations/rocket.json'
    );
    
    this.load.image('store', './client/assets/shop/store.png');
    this.load.image('beer-shop', './client/assets/shop/beerShop.png');
    this.load.image('dungeon-shop', './client/assets/shop/dungeonShop.png');
    this.load.image('heal-shop', './client/assets/shop/healShop.png');
    this.load.image('health-shop', './client/assets/shop/healthShop.png');
    this.load.image('laser-shop', './client/assets/shop/laserShop.png');
    this.load.image('melee-shop', './client/assets/shop/meleeShop.png');
    this.load.image('merc-shop', './client/assets/shop/mercShop.png');
    this.load.image('speed-shop', './client/assets/shop/speedShop.png');
    this.load.image('tower-shop', './client/assets/shop/towerShop.png');

    this.load.image('question-mark', './client/assets/ui/questionMark.png');
    this.load.image('rocket-single', './client/assets/animations/rocketSingle.png');
};

Preloader.prototype.create = function () {


    laserAudioPlayer = game.add.audio('laser');
    laserAudioNpc = game.add.audio('laser');
    rifleAudioPlayer = game.add.audio('rifle-echo');
    rifleAudioNpc = game.add.audio('rifle-echo');
    rifleAudioTower = game.add.audio('rifle');
    pistolAudioPlayer = game.add.audio('pistol');
    pistolAudioNpc = game.add.audio('pistol');
    rocketAudioPlayer = game.add.audio('rocket');
    rocketAudioNpc= game.add.audio('rocket')

    laserAudioPlayer.volume = .6;
    laserAudioPlayer.fadeOut = true;
    laserAudioNpc.volume = .08;
    laserAudioNpc.fadeOut = true;
    rifleAudioPlayer.volumePlayer = .15;
    rifleAudioPlayer.fadeOutPlayer = true;
    rifleAudioNpc.volume = .08;
    rifleAudioNpc.fadeOut = true;
    rifleAudioTower.volume = .06;
    rifleAudioTower.fadeOut = true;
    pistolAudioPlayer.volume = .6;
    pistolAudioPlayer.fadeOut = true;
    pistolAudioNpc.volume = .08;
    pistolAudioNpc.fadeOut = true;
    rocketAudioPlayer.volume = .6;
    rocketAudioPlayer.fadeOut = true;
    rocketAudioNpc.volume = .08;
    rocketAudioNpc.fadeOut = true;

    bossSpawn = game.add.audio('boss-spawn');

    dungeonMusic = game.add.audio('dungeon-music');
    dungeonMusic.loop = true;
    dungeonMusic.volume = .5;
    dungeonMusic.fadeOut = true;
    dungeonMusic.fadeIn = true;

    music = game.add.audio('music');
    music.loop = true;
    music.volume = .5;
    music.fadeOut = true;
    music.fadeIn= true;
    music.play();


    game.state.start('OutsideUi');
};
