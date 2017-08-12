Game.Preloader = function (game) {
    this.preloadBar = null;
};
var blackURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY6AzYGAAAAByAAHo7e7HAAAAAElFTkSuQmCC';

Game.Preloader.prototype = {
    preload: function () {


        // Tiled exported tilemap
        this.load.tilemap('tavernTakeTwo', 'assets/tavernTakeTwo.json', null, Phaser.Tilemap.TILED_JSON);
        // this.load.tilemap('outside', 'assets/outsideTakeTwo.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('outside', 'assets/outsidev2.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.image('tiles', 'assets/tilesetHouse.png');
        // this.load.image('woodland', 'assets/woodland.png');
        this.load.image('woodland', 'assets/magecity.png')
     

        this.load.atlas('player', 'assets/Rifle-Man.png', './assets/Rifle-Man.json');
        this.load.atlas('flashlightEnemy', 'assets/enemy.png', 'assets/enemy.json');
        this.load.atlas('shotgunEnemy', 'assets/shotgunEnemy.png', 'assets/shotgunEnemy.json');
        

         this.load.image('button', 'assets/button.png');
         this.load.image('titlescreen', 'assets/titlescreen.png');
         this.load.image('bullet', 'assets/bullet.png');
         this.load.image('black', blackURI);
         this.load.image('inventory', 'assets/inventory.png');
         this.load.image('gamepad', 'assets/gamepad.png');

         this.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Fire.js');

         
    },
        

    create: function () {
        this.state.start('MainMenu');
    }
}
