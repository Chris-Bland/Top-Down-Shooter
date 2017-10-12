var insideMap = function (){};

insideMap.prototype = {

    create: function(State){

        State.map = State.game.add.tilemap("inside");
        State.map.addTilesetImage('inside-tileset', 'inside-tileset');

        let layer = State.map.createLayer('Base');
        layer.resizeWorld();
        let collisionLayer = State.map.createLayer('Collision');
        State.collisionLayer = collisionLayer;
        collisionLayer.visible = false;
        State.map.setCollisionByExclusion([], true, State.collisionLayer);
        collisionLayer.resizeWorld();

        State.map.exit = State.map.objects.meta.find(o => o.name == 'exit');
        State.map.exitRect = new Phaser.Rectangle(State.map.exit.x, State.map.exit.y, State.map.exit.width, State.map.exit.height);
        State.map.entrance = State.map.objects.meta.find(o => o.name == 'entrance');
        State.map.start = State.map.objects.meta.find(o => o.name == 'start');

    },

    layForeground: function(State){

        State.map.createLayer('Foreground');

    }

};