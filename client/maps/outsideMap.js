var outsideMap = function (){};

outsideMap.prototype = {

    create: function(State){

        State.map = State.game.add.tilemap("outside");
        State.map.addTilesetImage('large-map', 'large-map');


        var layer = State.map.createLayer('Base');
        layer.resizeWorld();

        var collisionLayer = State.map.createLayer('Collision');
        State.map.collisionLayer = collisionLayer;
        collisionLayer.visible = false;
        State.map.setCollisionByExclusion([], true, State.map.collisionLayer);
        collisionLayer.resizeWorld();

        var bulletCollisionLayer = State.map.createLayer('BulletCollision');
        State.map.bulletCollisionLayer = bulletCollisionLayer;
        bulletCollisionLayer.visible = false;
        State.map.setCollisionByExclusion([], true, State.map.bulletCollisionLayer);
        bulletCollisionLayer.resizeWorld();

        var aStarCollisionLayer = State.map.createLayer('ACollision');
        State.map.aStarCollisionLayer = aStarCollisionLayer;
        aStarCollisionLayer.visible = false;
        State.map.setCollisionByExclusion([], true, State.map.aStarCollisionLayer);
        aStarCollisionLayer.resizeWorld();

        State.walkableTiles = [6669]
        State.pathfinder = State.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
    
        State.pathfinder.setGrid(State.map.layers[2].data, State.walkableTiles);


        State.map.exit = State.map.objects.meta.find(o => o.name == 'exit');
        State.map.exitRectangle = new Phaser.Rectangle(State.map.exit.x, State.map.exit.y, State.map.exit.width, State.map.exit.height);

        State.map.dungeonExit = State.map.objects.meta.find(o => o.name == 'exit');
        State.map.dungeonExitRectangle = new Phaser.Rectangle(69, 3039, 53, 22);


        State.map.entrance = State.map.objects.meta.find(o => o.name == 'entrance');
        State.map.start = State.map.objects.meta.find(o => o.name == 'start');

        State.map.spawnPoints = [];
        let spawn1 = State.map.objects.meta.find(o => o.name == 'spawn1');
        let spawn2 = State.map.objects.meta.find(o => o.name == 'spawn2');
        State.map.bossSpawn = State.map.objects.meta.find(o => o.name == 'spawn3');
        State.map.spawnPoints.push(spawn1, spawn2);

        State.map.towerPoints = [];
        for(var i = 1; i<75; i++){
            var spotName = "tower" + i;
            State.map.towerPoints.push(State.map.objects.meta.find(o => o.name == spotName));
        }

        State.map.house = State.map.objects.meta.find(o => o.name == 'house');
        State.map.houseRectangle = new Phaser.Rectangle(State.map.house.x, State.map.house.y, State.map.house.width, State.map.house.height);

    },

    layForeground: function(State){

        var layerForeground = State.map.createLayer('Foreground');
        State.map.layerForeground = layerForeground;
        layerForeground.resizeWorld();

    }

};