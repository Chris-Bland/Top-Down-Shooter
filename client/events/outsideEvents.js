
outsideEvents = function () { };

outsideEvents.prototype = {

    openingTween: function(State){

        State.cutscene = true;
        State.player.position.set(State.map.entrance.x, State.map.entrance.y + 30);
        State.player.angle = 0;
        let tween = State.game.add.tween(State.player).to({ x: State.map.start.x, y: State.map.start.y }, 1500);
        tween.onComplete.add(() => {
            State.cutscene = false;
        });
        tween.start();

    },
    bossSpawnTween: function(State){
        State.bossTweenSprite = game.add.sprite(game.world.centerX + game.world.centerX, 40, 'helio');
        State.bossTweenSprite.scale.setTo(3);
        State.bossTweenSprite.angle = -105;
        State.cutscene = true;
        State.player.angle = 0;
        let tween = State.game.add.tween(State.bossTweenSprite).to({ x: State.map.bossSpawn.x-200, y: State.map.bossSpawn.y }, 6500);
        State.game.camera.follow(State.bossTweenSprite);
        tween.onComplete.add(() => {
            State.cutscene = false;
            State.game.camera.follow(State.player);
            State.boss.alpha = 1;
        });
        tween.start();




    }

};