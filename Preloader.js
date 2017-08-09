Game.Preloader = function (game) {
    this.preloadBar = null;
};
var blackURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAIAAABvrngfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY6AzYGAAAAByAAHo7e7HAAAAAElFTkSuQmCC';

Game.Preloader.prototype = {
    preload: function () {

        // Tiled exported tilemap
        this.load.tilemap('tavernTakeTwo', 'assets/tavernTakeTwo.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('outside', 'assets/outsideTakeTwo.json', null, Phaser.Tilemap.TILED_JSON);


        // this.load.tilemap('tavernCSV', 'assets/tavern_Tile Layer 1.csv', null, Phaser.Tilemap.CSV);
        // this.load.tilemap('Collision', 'assets/tavern_Collision.csv', null, Phaser.Tilemap.CSV);
        // this.load.tilemap('Foreground', 'assets/tavern_Foreground.csv', null, Phaser.Tilemap.CSV);



        // and it's corresponding tileset files
        this.load.image('tiles', 'assets/tilesetHouse.png');
        this.load.image('woodland', 'assets/woodland.png')

        // our player sprite
        this.load.atlas('player', 'assets/Rifle-Man.png', './assets/Rifle-Man.json');
        this.load.atlas('enemy', 'assets/enemyMove.png', './assets/enemyMove.json');
        // this.load.onLoadStart.add(this.loadStart, this);
        // this.load.onFileComplete.add(this.fileComplete, this);
        // this.load.onLoadComplete.add(this.loadComplete, this);

         this.load.image('button', 'assets/button.png');
         this.load.image('titlescreen', 'assets/titlescreen.png');
         this.load.image('bullet', 'assets/bullet.png');
         this.load.image('black', blackURI);
         this.load.image('inventory', 'assets/inventory.png')
    },


    create: function () {

        this.state.start('MainMenu');

    }
}


function loadStart() {
    this.loadingText = this.add.text(20, this.world.height - 32, 'Loading...', { font: '20px Arial', fill: '#ffffff' });
}

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.loadingText.setText('File Complete: ' + progress + '% - ' + totalLoaded + ' out of ' + totalFiles);
}

function loadComplete() {
    game.world.remove(this.loadingText);

    this.time.advancedTiming = true;
}

