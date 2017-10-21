behaviorsObj.prototype.findPathTo = function (State, tilex, tiley, enemyx, enemyy, enemy) {
    enemyy = Math.floor(enemyy / 32);
    enemyx = Math.floor(enemyx / 32);
    State.pathfinder.setCallbackFunction(function (path) {
        path = path || [];
        // uncomment for visual path. Kills performance
        // for (var i = 0, ilen = path.length; i < ilen; i++) {
        //   map.putTile(46, path[i].x, path[i].y);
        // }
        let tweenChain = { x: [], y: [] }
        for (var i = 0; i < path.length; i++) {
            tweenChain.x.push(path[i].x * 32);
            tweenChain.y.push(path[i].y * 32);
        }
        enemy.tween = game.add.tween(enemy);
        enemy.tween.to({ x: tweenChain.x, y: tweenChain.y }, (150 * path.length), "Linear");
        enemy.tween.start();
    });
    State.pathfinder.preparePathCalculation([enemyx, enemyy], [tilex, tiley]);
    State.pathfinder.calculatePath();
};
